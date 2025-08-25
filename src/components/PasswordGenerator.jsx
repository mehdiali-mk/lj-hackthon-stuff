import { useState, useRef, useEffect, useContext } from "react";
import { gsap } from "gsap";
import { ThemeContext } from "../contexts/ThemeContext";
import generatePassword from "../utils/generatePassword";
import StrengthMeter from "./StrengthMeter";
import PasswordHistory from "./PasswordHistory";
import { FaCopy, FaMoon, FaSun } from "react-icons/fa";

const PasswordGenerator = () => {
  const [length, setLength] = useState(12);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [password, setPassword] = useState("");
  const [history, setHistory] = useState(
    () => JSON.parse(localStorage.getItem("passwordHistory")) || []
  );
  const [copySuccess, setCopySuccess] = useState(false);
  const passwordRef = useRef(null);
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  const handleGenerate = () => {
    if (!includeUpper && !includeLower && !includeNumbers && !includeSymbols) {
      alert("Please select at least one character type.");
      return;
    }
    const newPassword = generatePassword(
      length,
      includeUpper,
      includeLower,
      includeNumbers,
      includeSymbols
    );
    setPassword(newPassword);
    const newHistory = [newPassword, ...history.slice(0, 4)]; // Keep last 5
    setHistory(newHistory);
    localStorage.setItem("passwordHistory", JSON.stringify(newHistory));

    // GSAP animation for password reveal
    gsap.fromTo(
      passwordRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    );
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password).then(() => {
      setCopySuccess(true);
      gsap.to(passwordRef.current, {
        scale: 1.05,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
      });
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  return (
    <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Password Generator</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Length: {length}</label>
        <input
          type="range"
          min="4"
          max="32"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <label>
          <input
            type="checkbox"
            checked={includeUpper}
            onChange={(e) => setIncludeUpper(e.target.checked)}
          />
          Uppercase
        </label>
        <label>
          <input
            type="checkbox"
            checked={includeLower}
            onChange={(e) => setIncludeLower(e.target.checked)}
          />
          Lowercase
        </label>
        <label>
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={(e) => setIncludeNumbers(e.target.checked)}
          />
          Numbers
        </label>
        <label>
          <input
            type="checkbox"
            checked={includeSymbols}
            onChange={(e) => setIncludeSymbols(e.target.checked)}
          />
          Symbols
        </label>
      </div>

      <button
        onClick={handleGenerate}
        className="w-full bg-blue-500 text-white py-2 rounded mb-4 hover:bg-blue-600 transition"
      >
        Generate
      </button>

      {password && (
        <div className="mb-4">
          <div
            ref={passwordRef}
            className="bg-gray-100 dark:bg-gray-700 p-4 rounded font-mono break-all"
          >
            {password}
          </div>
          <button
            onClick={handleCopy}
            className="mt-2 flex items-center gap-2 text-blue-500 hover:underline"
          >
            <FaCopy /> Copy to Clipboard
          </button>
          {copySuccess && <p className="text-green-500 mt-1">Copied!</p>}
          <StrengthMeter password={password} />
        </div>
      )}

      <PasswordHistory history={history} />
    </div>
  );
};

export default PasswordGenerator;
