import { useNavigate } from "react-router-dom";
import { Lock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion"; 

const Index = () => {
  const navigate = useNavigate();
  return (
    <motion.div
    initial={{ opacity: 0, y: 50 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: -50 }} 
      transition={{ duration: 0.4, ease: "easeOut" }}
    className="min-h-screen overflow-hidden bg-gradient-to-br from-blue-100 via-white to-blue-200 flex flex-col items-center justify-center">
      <div className="max-w-xl py-14 px-8 bg-white/80 rounded-3xl shadow-xl flex flex-col items-center gap-6">
        <Lock size={48} className="text-blue-700" />
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-700 via-blue-500 to-blue-400 text-transparent bg-clip-text mb-2 text-center">
          Blue Horizon VPN
        </h1>
        <p className="text-lg text-gray-700 text-center">
          Secure, fast, and private VPN at your fingertips. Log in or sign up and surf the horizon!
        </p>
        <div className="flex gap-4 mt-4">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white transition font-semibold rounded-full px-6 py-2 text-lg shadow"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          <button
            className="bg-blue-100 hover:bg-blue-200 border border-blue-400 text-blue-800 transition font-semibold rounded-full px-6 py-2 text-lg shadow"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
      </div>
      <div className="mt-12 text-gray-400 flex flex-col items-center gap-2">
        <span>Looking for your Dashboard?</span>
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-blue-600 hover:underline mt-1"
        >
          Go to Dashboard
          <ArrowRight />
        </button>
      </div>
    </motion.div>
  );
};

export default Index;
