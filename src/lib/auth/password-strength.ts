export interface PasswordStrength {
  score: number;
  label: "Very Weak" | "Weak" | "Fair" | "Strong" | "Very Strong";
  suggestions: string[];
}

export function checkPasswordStrength(password: string): PasswordStrength {
  const suggestions: string[] = [];
  let score = 0;

  if (password.length >= 8) score++;
  else suggestions.push("Use at least 8 characters");

  if (password.length >= 12) score++;

  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  else suggestions.push("Mix uppercase and lowercase letters");

  if (/\d/.test(password)) score++;
  else suggestions.push("Add at least one number");

  if (/[^a-zA-Z0-9]/.test(password)) score++;
  else suggestions.push("Add a special character (!@#$...)");

  score = Math.min(4, score);

  const labels: PasswordStrength["label"][] = [
    "Very Weak", "Weak", "Fair", "Strong", "Very Strong",
  ];

  return { score, label: labels[score], suggestions };
}
