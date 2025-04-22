import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Activation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, password, name } = location.state || {};

  const [code, setCode] = useState("");
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes

  useEffect(() => {
   

    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [email, password, name, navigate]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Send code verification request
    console.log("Verify code:", code);

    // Example: navigate("/dashboard");
  };

  const handleResend = async () => {
    console.log("Resend with credentials:", { email, password, name });

    try {
      // Call API to resend code using existing credentials
      const res = await fetch("/api/resend-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });

      if (res.ok) {
        alert("Activation code resent.");
        setTimeLeft(900); // Reset timer
      } else {
        alert("Failed to resend activation code.");
      }
    } catch (err) {
      console.error("Error:", err);
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
