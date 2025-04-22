import { useNavigate } from "react-router-dom";
import { Lock, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion"; 



const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (email && password) {
      navigate("/dashboard");
    }
  }

  return (
    <div className="min-h-screen  flex items-center justify-center">
      {/* Animation container */}
      <motion.form
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        exit={{ opacity: 0, y: -50 }} 
        transition={{ duration: 0.6, ease: "easeOut" }}
        onSubmit={handleLogin}
        className="w-full max-w-md space-y-6 bg-white/90 p-8 rounded-2xl shadow-xl"
      >
        <div className="flex flex-col items-center">
          <Lock size={36} className="text-blue-700 mb-2" />
          <h2 className="text-2xl font-bold text-blue-800">Login to Your Account</h2>
        </div>
        <div>
          <label className="block font-semibold text-blue-900 mb-1">Email</label>
          <input
            className="w-full px-4 py-2 border border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="hello@example.com"
          />
        </div>
        <div>
          <label className="block font-semibold text-blue-900 mb-1">Password</label>
          <input
            className="w-full px-4 py-2 border border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>
        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl transition mt-4"
          type="submit"
        >
          Login
        </button>
        <p className="text-center mt-4 text-blue-800">
          Don&apos;t have an account?{" "}
          <button type="button" className="underline" onClick={() => navigate("/register")}>
            Register
          </button>
        </p>

        <button
          type="button"
          onClick={() => navigate('/')}
          className="flex items-center justify-center gap-2 text-blue-700 hover:text-blue-900 mt-2 font-semibold"
        >
          <ArrowLeft size={20} />
          Go Back
        </button>
      </motion.form>
    </div>
  );
};

export default Login;
