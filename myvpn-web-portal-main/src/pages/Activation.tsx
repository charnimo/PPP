import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Activation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, password, username } = location.state || {};

  const [code, setCode] = useState("");
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await window.electron.ipcRenderer.invoke("api-request", {
        path: "/validate",
        method: "POST",
        body: { email, code }
      });

      const { statusCode } = response;
      if (statusCode === 200) {
        navigate("/login", {
          state: { email, password, username }
        });
      } else {
        alert("Invalid code. Please try again.");
      }
    } catch (err) {
      console.error("Activation error:", err);
      alert("An error occurred while verifying your code.");
    }
  };

  const handleResend = async () => {
    console.log("Resend with credentials:", { email, password, username });

    try {
      const response = await window.electron.ipcRenderer.invoke("api-request", {
        path: "/resend-code", // adjust if your actual endpoint is different
        method: "POST",
        body: { email, password, username }
      });

      if (response.statusCode === 200) {
        alert("Activation code resent.");
        setTimeLeft(900); // Reset timer
      } else {
        alert("Failed to resend activation code.");
      }
    } catch (err) {
      console.error("Resend error:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.form
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-6 bg-white/90 p-8 rounded-2xl shadow-xl"
      >
        <h2 className="text-2xl font-bold text-center text-blue-800">Activate Your Account</h2>
        <p className="text-center text-sm text-blue-700">Enter the code sent to <strong>{email}</strong></p>

        <input
          type="text"
          required
          value={code}
          onChange={e => setCode(e.target.value)}
          placeholder="Enter activation code"
          className="w-full px-4 py-2 border border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <div className="flex items-center justify-between text-blue-800 text-sm">
          <span>Token expires in: {minutes}:{seconds.toString().padStart(2, "0")}</span>
          <button
            type="button"
            onClick={handleResend}
            className="underline hover:text-blue-600"
            disabled={timeLeft === 0}
          >
            Resend Code
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl transition"
        >
          Submit Code
        </button>
      </motion.form>
    </div>
  );
};

export default Activation;
