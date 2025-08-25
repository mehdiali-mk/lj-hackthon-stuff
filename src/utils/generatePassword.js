const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWER = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()_+-=[]{}|;:,.<>?";

function generatePassword(length, upper, lower, numbers, symbols) {
  let charset = "";
  if (upper) charset += UPPER;
  if (lower) charset += LOWER;
  if (numbers) charset += NUMBERS;
  if (symbols) charset += SYMBOLS;

  if (!charset) return "";

  const values = new Uint32Array(length);
  window.crypto.getRandomValues(values);

  return Array.from(values)
    .map((x) => charset[x % charset.length])
    .join("");
}

export default generatePassword;
