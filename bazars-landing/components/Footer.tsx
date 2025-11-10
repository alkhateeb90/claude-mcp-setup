"use client";

import { motion } from "framer-motion";

export default function Footer() {
  const contacts = [
    {
      title: "For Manufacturers",
      email: "suppliers@bazars.io",
      icon: "🏭",
    },
    {
      title: "For Governments",
      email: "partnerships@bazars.io",
      icon: "🏛️",
    },
    {
      title: "For Investors",
      email: "investors@bazars.io",
      icon: "💼",
    },
  ];

  return (
    <footer className="w-full bg-navy text-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {contacts.map((contact, index) => (
            <motion.div
              key={contact.title}
              className="text-center p-6 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="text-4xl mb-4">{contact.icon}</div>
              <h3 className="text-lg font-heading font-bold mb-2">
                {contact.title}
              </h3>
              <a
                href={`mailto:${contact.email}`}
                className="text-primary hover:text-accent-gold transition-colors text-sm md:text-base"
              >
                {contact.email}
              </a>
            </motion.div>
          ))}
        </div>

        {/* Copyright */}
        <motion.div
          className="text-center pt-8 border-t border-white/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-gray-400 text-sm font-body">
            © 2025 Bazars.io. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
