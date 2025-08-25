const PasswordHistory = ({ history }) => {
  if (!history.length) return null;

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-2">Recent Passwords</h2>
      <ul className="list-disc pl-5">
        {history.map((pw, idx) => (
          <li key={idx} className="font-mono">
            {pw}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PasswordHistory;
