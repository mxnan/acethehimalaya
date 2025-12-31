"use client";
import { motion, useScroll } from "framer-motion";

const ProgressBar = () => {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className="fixed bottom-0 left-0 right-0 origin-left z-50 h-1 bg-brand-color/80"
    ></motion.div>
  );
};

export default ProgressBar;