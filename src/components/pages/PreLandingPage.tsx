import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function PreLandingPage() {
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
      navigate('/home');
    }, 3500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-background via-white to-soft-gold flex items-center justify-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="text-center"
      >
        <motion.h1
          className="font-heading text-8xl md:text-9xl text-primary mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          Boho Boho
        </motion.h1>
        <motion.div
          className="h-1 w-32 bg-soft-gold mx-auto"
          initial={{ width: 0 }}
          animate={{ width: 128 }}
          transition={{ delay: 1, duration: 0.8 }}
        />
        <motion.p
          className="font-paragraph text-xl text-secondary mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          A Taste of Elegance
        </motion.p>
      </motion.div>
    </div>
  );
}
