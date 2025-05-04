import { useNavigate } from "react-router-dom";
import { Lock, User,ArrowLeft } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion"; 

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setName] = useState("");
  const navigate = useNavigate();
  
  async function handleRegister(e) {
    e.preventDefault();
    if (email && password && username) {
      try {
        const response = await window.electron.ipcRenderer.invoke('api-request', {
          path: '/register',
          method: 'POST',
          body: { email, password, username }
        });
  
        if (response.statusCode === 200 || response.statusCode === 201) {
          navigate("/activate", {
            state: { email, password, username }
          });
        } else {
          alert("Registration failed: " + response.data);
        }
      } catch (err) {
        console.error(err);
        alert("Error occurred");
      }
    }
  }
  
  

  return (
    <div className="min-h-screen  flex items-center justify-center">
      <motion.form
      initial={{ opacity: 0, y: 50 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: -50 }} 
      transition={{ duration: 0.6, ease: "easeOut" }}
        onSubmit={handleRegister}
        className="w-full max-w-md space-y-6 bg-white/90 p-8 rounded-2xl shadow-xl"
      >
        <div className="flex flex-col items-center">
          <User size={36} className="text-blue-700 mb-2" />
          <h2 className="text-2xl font-bold text-blue-800">Create an Account</h2>
        </div>
        <div>
          <label className="block font-semibold text-blue-900 mb-1">Name</label>
          <input
            className="w-full px-4 py-2 border border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            required
            value={username}
            onChange={e => setName(e.target.value)}
            placeholder="Your Name"
          />
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
          Register
        </button>
        <p className="text-center mt-4 text-blue-800">
          Already have an account?{" "}
          <button type="button" className="underline" onClick={() => navigate("/login")}>
            Login
          </button>
        </p>
        <button
  type="button"
  onClick={() => navigate('/')} // navigates back in history
  className="flex items-center gap-2 text-blue-800 hover:underline"
>
  <ArrowLeft size={20} />
  Back
</button>
</motion.form>
    </div>
  );
};

export default Register;
