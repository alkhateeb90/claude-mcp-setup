"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function TrustBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("trust-bar");
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <motion.section
      id="trust-bar"
      className="w-full bg-cream py-8 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-sm md:text-base text-gray-700 font-body">
          In partnership discussions with:{" "}
          <span className="font-semibold text-navy">
            CBBC | DP World | SGS | UK Trade Authorities
          </span>
        </p>
      </div>
    </motion.section>
  );
}
