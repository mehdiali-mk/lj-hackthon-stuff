import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const StrengthMeter = ({ password }) => {
  const strengthRef = useRef(null);

  const calculateStrength = (pw) => {
    let score = 0;
    if (pw.length >= 12) score += 2;
    if (pw.length >= 8) score += 1;
    if (/[A-Z]/.test(pw)) score += 1;
    if (/[a-z]/.test(pw)) score += 1;
    if (/[0-9]/.test(pw)) score += 1;
    if (/[^A-Za-z0-9]/.test(pw)) score += 1;
    return Math.min((score / 7) * 100, 100); // Percentage
  };

  const strength = calculateStrength(password);
  const color = strength < 40 ? "red" : strength < 70 ? "yellow" : "green";

  useEffect(() => {
    gsap.to(strengthRef.current, {
      width: `${strength}%`,
      duration: 0.5,
      ease: "power2.out",
    });
  }, [strength]);

  return (
    <div className="mt-4">
      <p>Strength:</p>
      <div className="h-2 bg-gray-200 rounded">
        <div
          ref={strengthRef}
          className={`h-full rounded bg-${color}-500`}
          style={{ width: "90%" }}
        ></div>
      </div>
    </div>
  );
};

export default StrengthMeter;
