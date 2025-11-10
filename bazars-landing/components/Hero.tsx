"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative w-full py-20 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto text-center">
        {/* Logo */}
        <motion.h1
          className="font-heading text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8"
          style={{
            background: "linear-gradient(135deg, #FF5722 0%, #FFC107 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          BAZARS
        </motion.h1>

        {/* Tagline */}
        <motion.h2
          className="text-2xl md:text-3xl lg:text-4xl font-body font-semibold text-navy mb-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          The Infrastructure Layer for Cross-Border B2B Trade
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          className="text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        >
          Trusted partner for governments and economic zones to deploy scalable,
          compliant trade hubs
        </motion.p>
      </div>

      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-10 left-10 w-32 h-32 rounded-full bg-accent-blue opacity-10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-primary opacity-10 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>
    </section>
  );
}
