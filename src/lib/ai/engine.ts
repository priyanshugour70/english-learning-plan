import "server-only";

/**
 * Lightweight, dependency-free AI feedback engine.
 *
 * Runs entirely server-side with rule-based heuristics — no external API calls.
 * This keeps the app self-contained and free from API key requirements while
 * still providing genuinely useful grammar, fluency, and pronunciation feedback.
 */

// ─── Grammar checker ────────────────────────────────────────────────────────

interface GrammarIssue {
  text: string;
  suggestion: string;
  rule: string;
  severity: "error" | "warning" | "info";
  offset: number;
  length: number;
}

interface GrammarResult {
  issues: GrammarIssue[];
  correctedText: string;
  score: number;
}

const GRAMMAR_RULES: {
  pattern: RegExp;
  fix: (match: RegExpMatchArray) => string;
  rule: string;
  severity: GrammarIssue["severity"];
}[] = [
  { pattern: /\bi am\b/gi, fix: () => "I am", rule: "Capitalize 'I'", severity: "error" },
  { pattern: /\bi'm\b/gi, fix: () => "I'm", rule: "Capitalize 'I'", severity: "error" },
  { pattern: /\bi\b(?=[^'A-Z])/g, fix: () => "I", rule: "Capitalize 'I'", severity: "error" },
  { pattern: /\btheir\s+(is|was|are|were)\b/gi, fix: (m) => `there ${m[1]}`, rule: "their→there before verb", severity: "error" },
  { pattern: /\bthere\s+(car|house|dog|cat|book|phone|name)\b/gi, fix: (m) => `their ${m[1]}`, rule: "there→their (possessive)", severity: "error" },
  { pattern: /\byour\s+(welcome|right|wrong|correct)\b/gi, fix: (m) => `you're ${m[1]}`, rule: "your→you're", severity: "error" },
  { pattern: /\byou're\s+(car|house|dog|book|phone|name)\b/gi, fix: (m) => `your ${m[1]}`, rule: "you're→your (possessive)", severity: "error" },
  { pattern: /\bits\s+(a|an|the|very|not|been)\b/gi, fix: (m) => `it's ${m[1]}`, rule: "its→it's (it is)", severity: "warning" },
  { pattern: /\bhe\s+don't\b/gi, fix: () => "he doesn't", rule: "Subject-verb agreement", severity: "error" },
  { pattern: /\bshe\s+don't\b/gi, fix: () => "she doesn't", rule: "Subject-verb agreement", severity: "error" },
  { pattern: /\bit\s+don't\b/gi, fix: () => "it doesn't", rule: "Subject-verb agreement", severity: "error" },
  { pattern: /\bhe\s+have\b/gi, fix: () => "he has", rule: "Subject-verb agreement", severity: "error" },
  { pattern: /\bshe\s+have\b/gi, fix: () => "she has", rule: "Subject-verb agreement", severity: "error" },
  { pattern: /\bI\s+has\b/gi, fix: () => "I have", rule: "Subject-verb agreement", severity: "error" },
  { pattern: /\bthey\s+has\b/gi, fix: () => "they have", rule: "Subject-verb agreement", severity: "error" },
  { pattern: /\bwe\s+has\b/gi, fix: () => "we have", rule: "Subject-verb agreement", severity: "error" },
  { pattern: /\bmore\s+better\b/gi, fix: () => "better", rule: "Double comparative", severity: "warning" },
  { pattern: /\bmore\s+faster\b/gi, fix: () => "faster", rule: "Double comparative", severity: "warning" },
  { pattern: /\bmore\s+bigger\b/gi, fix: () => "bigger", rule: "Double comparative", severity: "warning" },
  { pattern: /\bcould\s+of\b/gi, fix: () => "could have", rule: "of→have after modal", severity: "error" },
  { pattern: /\bwould\s+of\b/gi, fix: () => "would have", rule: "of→have after modal", severity: "error" },
  { pattern: /\bshould\s+of\b/gi, fix: () => "should have", rule: "of→have after modal", severity: "error" },
  { pattern: /\balot\b/gi, fix: () => "a lot", rule: "alot→a lot", severity: "error" },
  { pattern: /\buntill\b/gi, fix: () => "until", rule: "Spelling: until", severity: "error" },
  { pattern: /\brecieve\b/gi, fix: () => "receive", rule: "Spelling: receive", severity: "error" },
  { pattern: /\boccured\b/gi, fix: () => "occurred", rule: "Spelling: occurred", severity: "error" },
  { pattern: /\bseperate\b/gi, fix: () => "separate", rule: "Spelling: separate", severity: "error" },
  { pattern: /\bdefinately\b/gi, fix: () => "definitely", rule: "Spelling: definitely", severity: "error" },
  { pattern: /\boccasionally\b/gi, fix: () => "occasionally", rule: "Spelling check", severity: "info" },
  { pattern: /\b(don't|doesn't|didn't|won't|can't|shouldn't|wouldn't)\s+\1\b/gi, fix: (m) => m[1], rule: "Duplicate word", severity: "warning" },
  { pattern: /([.!?])\s*([a-z])/g, fix: (m) => `${m[1]} ${m[2].toUpperCase()}`, rule: "Capitalize after period", severity: "warning" },
  { pattern: /\s{2,}/g, fix: () => " ", rule: "Extra spaces", severity: "info" },
];

export function checkGrammar(text: string): GrammarResult {
  const issues: GrammarIssue[] = [];
  let corrected = text;

  for (const rule of GRAMMAR_RULES) {
    let match: RegExpExecArray | null;
    const regex = new RegExp(rule.pattern.source, rule.pattern.flags);
    while ((match = regex.exec(text)) !== null) {
      const fixed = rule.fix(match);
      if (fixed !== match[0]) {
        issues.push({
          text: match[0],
          suggestion: fixed,
          rule: rule.rule,
          severity: rule.severity,
          offset: match.index,
          length: match[0].length,
        });
      }
    }
    corrected = corrected.replace(rule.pattern, (full, ...groups) => {
      const m = [full, ...groups] as unknown as RegExpMatchArray;
      return rule.fix(m);
    });
  }

  const errorCount = issues.filter((i) => i.severity === "error").length;
  const warningCount = issues.filter((i) => i.severity === "warning").length;
  const rawScore = Math.max(0, 100 - errorCount * 15 - warningCount * 5);
  const score = Math.round(Math.max(20, Math.min(100, rawScore)));

  return { issues, correctedText: corrected, score };
}

// ─── Fluency scorer ─────────────────────────────────────────────────────────

export interface FluencyResult {
  score: number;
  level: "beginner" | "intermediate" | "advanced" | "fluent";
  metrics: {
    avgWordLength: number;
    avgSentenceLength: number;
    vocabularyRichness: number;
    sentenceVariety: number;
    fillerWordCount: number;
    transitionWordCount: number;
  };
  feedback: string[];
}

const FILLER_WORDS = new Set([
  "um", "uh", "like", "you know", "basically", "actually", "literally",
  "just", "so", "well", "right", "okay", "yeah", "kind of", "sort of",
  "i mean", "you see",
]);

const TRANSITION_WORDS = new Set([
  "however", "therefore", "moreover", "furthermore", "additionally",
  "consequently", "nevertheless", "meanwhile", "although", "despite",
  "whereas", "similarly", "likewise", "indeed", "specifically",
  "for example", "for instance", "in contrast", "on the other hand",
  "in conclusion", "as a result", "in addition", "first", "second",
  "finally", "next", "then", "after", "before", "because", "since",
]);

export function scoreFluency(text: string): FluencyResult {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  if (wordCount === 0) {
    return {
      score: 0,
      level: "beginner",
      metrics: {
        avgWordLength: 0,
        avgSentenceLength: 0,
        vocabularyRichness: 0,
        sentenceVariety: 0,
        fillerWordCount: 0,
        transitionWordCount: 0,
      },
      feedback: ["Write at least a few sentences to get feedback."],
    };
  }

  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  const sentenceCount = Math.max(1, sentences.length);
  const avgWordLen = words.reduce((a, w) => a + w.length, 0) / wordCount;
  const avgSentLen = wordCount / sentenceCount;
  const uniqueWords = new Set(words.map((w) => w.toLowerCase().replace(/[^a-z']/g, "")));
  const vocabRichness = uniqueWords.size / wordCount;
  const sentLengths = sentences.map((s) => s.trim().split(/\s+/).length);
  const sentStdev = Math.sqrt(
    sentLengths.reduce((a, l) => a + Math.pow(l - avgSentLen, 2), 0) / sentenceCount,
  );
  const sentenceVariety = Math.min(1, sentStdev / 10);

  const lowerText = text.toLowerCase();
  let fillerCount = 0;
  for (const f of FILLER_WORDS) {
    const re = new RegExp(`\\b${f}\\b`, "gi");
    const matches = lowerText.match(re);
    if (matches) fillerCount += matches.length;
  }

  let transitionCount = 0;
  for (const t of TRANSITION_WORDS) {
    const re = new RegExp(`\\b${t}\\b`, "gi");
    const matches = lowerText.match(re);
    if (matches) transitionCount += matches.length;
  }

  let score = 50;
  score += Math.min(15, vocabRichness * 30);
  score += Math.min(10, sentenceVariety * 20);
  score += Math.min(10, transitionCount * 3);
  score -= Math.min(20, fillerCount * 3);
  if (avgSentLen > 5 && avgSentLen < 25) score += 5;
  if (avgWordLen > 4) score += 5;
  if (wordCount > 50) score += 5;
  score = Math.round(Math.max(10, Math.min(100, score)));

  const level: FluencyResult["level"] =
    score >= 85 ? "fluent" : score >= 70 ? "advanced" : score >= 50 ? "intermediate" : "beginner";

  const feedback: string[] = [];
  if (fillerCount > 2) feedback.push(`Reduce filler words (found ${fillerCount}). Replace "like," "basically," "just" with precise language.`);
  if (vocabRichness < 0.5) feedback.push("Try using more varied vocabulary. Avoid repeating the same words.");
  if (avgSentLen > 25) feedback.push("Some sentences are very long. Break them into shorter, clearer sentences.");
  if (avgSentLen < 5 && sentenceCount > 2) feedback.push("Your sentences are very short. Try combining ideas with connectors.");
  if (transitionCount === 0 && sentenceCount > 2) feedback.push("Use transition words (however, therefore, meanwhile) to connect your ideas.");
  if (sentenceVariety < 0.2 && sentenceCount > 2) feedback.push("Vary your sentence length for more natural rhythm.");
  if (score >= 80) feedback.push("Excellent writing! Your English reads naturally and fluently.");
  if (feedback.length === 0) feedback.push("Good work! Keep practicing to improve further.");

  return {
    score,
    level,
    metrics: {
      avgWordLength: Math.round(avgWordLen * 10) / 10,
      avgSentenceLength: Math.round(avgSentLen * 10) / 10,
      vocabularyRichness: Math.round(vocabRichness * 100) / 100,
      sentenceVariety: Math.round(sentenceVariety * 100) / 100,
      fillerWordCount: fillerCount,
      transitionWordCount: transitionCount,
    },
    feedback,
  };
}

// ─── Writing improvement ────────────────────────────────────────────────────

export interface WritingImprovement {
  original: string;
  improved: string;
  grammarResult: GrammarResult;
  fluencyResult: FluencyResult;
  tips: string[];
}

export function improveWriting(text: string): WritingImprovement {
  const grammarResult = checkGrammar(text);
  const fluencyResult = scoreFluency(text);

  const improved = grammarResult.correctedText;

  const tips: string[] = [];
  if (grammarResult.issues.length > 0) {
    const errorCount = grammarResult.issues.filter((i) => i.severity === "error").length;
    if (errorCount > 0) tips.push(`Fixed ${errorCount} grammar error${errorCount > 1 ? "s" : ""}.`);
  }
  tips.push(...fluencyResult.feedback);

  return { original: text, improved, grammarResult, fluencyResult, tips };
}

// ─── Pronunciation tips ─────────────────────────────────────────────────────

export interface PronunciationTip {
  word: string;
  ipa: string;
  tip: string;
  commonMistake: string;
}

const PRONUNCIATION_DB: PronunciationTip[] = [
  { word: "schedule", ipa: "/ˈskedʒuːl/", tip: "Start with 'SK' not 'SH'. American: SKED-jool.", commonMistake: "Saying 'SHED-yool'" },
  { word: "comfortable", ipa: "/ˈkʌmftəbl/", tip: "Only 3 syllables: KUMF-ter-bul. Drop the 'or'.", commonMistake: "Saying all 4 syllables: com-FOR-ta-ble" },
  { word: "vegetable", ipa: "/ˈvedʒtəbl/", tip: "3 syllables: VEJ-tuh-bul.", commonMistake: "Saying 4 syllables: ve-GE-ta-ble" },
  { word: "interesting", ipa: "/ˈɪntrəstɪŋ/", tip: "3 syllables: IN-tres-ting. Not 4.", commonMistake: "Saying IN-ter-ES-ting" },
  { word: "temperature", ipa: "/ˈtemprətʃər/", tip: "3 syllables: TEM-pra-cher.", commonMistake: "Saying TEM-per-a-ture" },
  { word: "probably", ipa: "/ˈprɑːbəbli/", tip: "3 syllables: PROB-ab-lee.", commonMistake: "Saying PROB-lee (dropping middle)" },
  { word: "entrepreneur", ipa: "/ˌɑːntrəprəˈnɜːr/", tip: "ON-truh-pruh-NUR. Stress on last syllable.", commonMistake: "Stressing wrong syllable" },
  { word: "queue", ipa: "/kjuː/", tip: "Sounds like 'CUE'. Just one syllable.", commonMistake: "Saying 'KWE-WE'" },
  { word: "colonel", ipa: "/ˈkɜːrnl/", tip: "Sounds like 'KERNEL'. The 'olo' is silent.", commonMistake: "Saying 'KOL-oh-nel'" },
  { word: "wednesday", ipa: "/ˈwenzdeɪ/", tip: "WENZ-day. The first 'd' is silent.", commonMistake: "Saying 'WED-nes-day'" },
  { word: "february", ipa: "/ˈfebrueri/", tip: "FEB-roo-air-ee. Don't skip the first 'r'.", commonMistake: "Saying 'FEB-yoo-air-ee'" },
  { word: "library", ipa: "/ˈlaɪbreri/", tip: "LY-brer-ee. Keep both 'r' sounds.", commonMistake: "Saying 'LY-berry'" },
  { word: "pronunciation", ipa: "/prəˌnʌnsiˈeɪʃn/", tip: "pro-NUN-see-AY-shun. NOT 'pro-NOUN-see-AY-shun'.", commonMistake: "Saying 'pronounciation'" },
  { word: "specific", ipa: "/spəˈsɪfɪk/", tip: "spuh-SIF-ik. Start with 'sp' not 'p'.", commonMistake: "Saying 'pacific' instead" },
  { word: "clothes", ipa: "/kloʊðz/", tip: "KLOHZ. One syllable, rhymes with 'close'.", commonMistake: "Saying 'KLOH-thes' (2 syllables)" },
  { word: "asked", ipa: "/æskt/", tip: "ASKT. One syllable. The -ed is just a 't' sound.", commonMistake: "Saying 'ASK-ed'" },
  { word: "world", ipa: "/wɜːrld/", tip: "Curl your tongue for the 'rl'. WURLD.", commonMistake: "Saying 'WORD' without the 'l'" },
  { word: "develop", ipa: "/dɪˈveləp/", tip: "dih-VEL-up. Stress on the second syllable.", commonMistake: "Saying 'DEV-lop'" },
  { word: "determine", ipa: "/dɪˈtɜːrmɪn/", tip: "dih-TUR-min. Stress on second syllable.", commonMistake: "Saying 'DEE-ter-mine'" },
  { word: "presentation", ipa: "/ˌpreznˈteɪʃn/", tip: "prez-en-TAY-shun. Stress on third syllable.", commonMistake: "Stressing the first syllable" },
];

export function getPronunciationTips(text?: string): PronunciationTip[] {
  if (!text) {
    return PRONUNCIATION_DB.slice(0, 5);
  }
  const lower = text.toLowerCase();
  const found = PRONUNCIATION_DB.filter((p) =>
    lower.includes(p.word.toLowerCase()),
  );
  if (found.length > 0) return found;
  // Return random selection if none found in text
  const shuffled = [...PRONUNCIATION_DB].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 5);
}
