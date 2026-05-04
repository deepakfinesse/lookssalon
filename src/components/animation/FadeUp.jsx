"use client";
import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "@/lib/animations";

const FadeUp = ({ children, delay = 0, className = "" }) => {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      custom={delay}
    >
      {children}
    </motion.div>
  );
};

export default FadeUp;
