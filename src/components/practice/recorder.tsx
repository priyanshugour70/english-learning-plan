"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { Mic, Pause, Play, Square, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRecordings } from "@/contexts/recordings-context";
import { useToast } from "@/contexts/toast-context";

function subscribeNoop() {
  return () => {};
}

function getSupportedSnapshot(): boolean {
  if (typeof window === "undefined") return false;
  return (
    !!navigator.mediaDevices?.getUserMedia &&
    typeof MediaRecorder !== "undefined"
  );
}

function getSupportedServerSnapshot(): boolean | null {
  return null;
}

interface RecorderProps {
  prompt: string;
}

function fmtTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

export function Recorder({ prompt }: RecorderProps) {
  const supported = useSyncExternalStore<boolean | null>(
    subscribeNoop,
    getSupportedSnapshot,
    getSupportedServerSnapshot,
  );
  const [state, setState] = useState<
    "idle" | "recording" | "paused" | "stopped"
  >("idle");
  const [elapsed, setElapsed] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const stream = useRef<MediaStream | null>(null);
  const chunks = useRef<BlobPart[]>([]);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const { log } = useRecordings();
  const { toast } = useToast();

  const stopTimer = useCallback(() => {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
  }, []);

  const cleanup = useCallback(() => {
    stopTimer();
    stream.current?.getTracks().forEach((t) => t.stop());
    stream.current = null;
    mediaRecorder.current = null;
  }, [stopTimer]);

  useEffect(() => cleanup, [cleanup]);

  async function start() {
    try {
      const s = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.current = s;
      const rec = new MediaRecorder(s);
      chunks.current = [];
      rec.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.current.push(e.data);
      };
      rec.onstop = () => {
        const blob = new Blob(chunks.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        if (audioUrl) URL.revokeObjectURL(audioUrl);
        setAudioUrl(url);
      };
      rec.start();
      mediaRecorder.current = rec;
      setState("recording");
      setElapsed(0);
      timer.current = setInterval(() => setElapsed((x) => x + 1), 1000);
    } catch {
      toast({
        title: "Microphone unavailable",
        description: "Please allow microphone access in your browser.",
        variant: "info",
      });
    }
  }

  function pause() {
    if (!mediaRecorder.current) return;
    if (state === "recording") {
      mediaRecorder.current.pause();
      stopTimer();
      setState("paused");
    } else if (state === "paused") {
      mediaRecorder.current.resume();
      setState("recording");
      timer.current = setInterval(() => setElapsed((x) => x + 1), 1000);
    }
  }

  function stop() {
    if (!mediaRecorder.current) return;
    mediaRecorder.current.stop();
    stream.current?.getTracks().forEach((t) => t.stop());
    setState("stopped");
    stopTimer();
  }

  function clear() {
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioUrl(null);
    setElapsed(0);
    setState("idle");
    cleanup();
  }

  function save() {
    log({ prompt, duration: elapsed });
    toast({ title: "Session logged", description: `${fmtTime(elapsed)} on "${prompt}"`, variant: "success" });
    clear();
  }

  if (supported === false) {
    return (
      <div className="rounded-[var(--radius-lg)] border border-border bg-surface p-5 text-sm text-muted-foreground">
        Recording isn&apos;t supported in this browser. Try Chrome, Safari, or
        Firefox on desktop.
      </div>
    );
  }

  return (
    <div className="rounded-[var(--radius-lg)] border border-border bg-surface p-5 sm:p-6">
      <div className="flex flex-col items-center gap-4">
        <div
          className={`relative h-20 w-20 rounded-full bg-primary-soft flex items-center justify-center ${
            state === "recording" ? "pulse-ring" : ""
          }`}
        >
          <Mic className="h-9 w-9 text-primary" />
        </div>
        <div className="text-3xl font-mono tabular-nums text-foreground">
          {fmtTime(elapsed)}
        </div>
        <div className="flex items-center gap-2">
          {state === "idle" ? (
            <Button onClick={start} size="lg">
              <Mic className="h-4 w-4" /> Start recording
            </Button>
          ) : null}
          {state === "recording" || state === "paused" ? (
            <>
              <Button variant="outline" onClick={pause}>
                {state === "paused" ? (
                  <>
                    <Play className="h-4 w-4" /> Resume
                  </>
                ) : (
                  <>
                    <Pause className="h-4 w-4" /> Pause
                  </>
                )}
              </Button>
              <Button variant="danger" onClick={stop}>
                <Square className="h-4 w-4" /> Stop
              </Button>
            </>
          ) : null}
          {state === "stopped" ? (
            <>
              <Button variant="outline" onClick={clear}>
                <Trash2 className="h-4 w-4" /> Discard
              </Button>
              <Button onClick={save}>Log session</Button>
            </>
          ) : null}
        </div>

        {audioUrl ? (
          <audio src={audioUrl} controls className="w-full mt-2" />
        ) : null}

        <p className="text-[11px] text-muted-foreground text-center max-w-sm">
          Recordings stay in your browser memory for this session. Log sessions to track minutes and prompts in your history.
        </p>
      </div>
    </div>
  );
}
