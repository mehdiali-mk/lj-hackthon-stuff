import { useState } from "react";
import PasswordGenerator from "./components/PasswordGenerator";
import { ThemeProvider } from "./contexts/ThemeContext"; // Simple context for dark mode

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex items-center justify-center p-4">
        <PasswordGenerator />
      </div>
    </ThemeProvider>
  );
}

export default App;
