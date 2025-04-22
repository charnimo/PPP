// BackgroundWrapper.tsx
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { PropsWithChildren } from "react";

const gradientMap: Record<string, string> = {
  "/": "bg-gradient-to-br from-blue-100 to-blue-200",
  "/login": "bg-gradient-to-br from-blue-200 to-blue-500",
  "/register": "bg-gradient-to-br from-blue-300 to-blue-600",
};

const BackgroundWrapper = ({ children }: PropsWithChildren) => {
  const location = useLocation();
  const bg = gradientMap[location.pathname] || "bg-white";

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={`min-h-screen ${bg} transition-colors duration-700 ease-in-out`}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default BackgroundWrapper;
