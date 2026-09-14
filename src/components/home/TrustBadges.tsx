"use client";

import { ShieldCheck, Flame, Leaf, Award } from "lucide-react";
import { motion } from "framer-motion";

export default function TrustBadges() {
  const badges = [
    { icon: ShieldCheck, title: "ISI Certified", desc: "Highest quality & safety standards" },
    { icon: Award, title: "Make in India", desc: "Proudly manufactured locally" },
    { icon: Flame, title: "Safe Cooking", desc: "Advanced safety pressure valves" },
    { icon: Leaf, title: "BPA Free", desc: "Food grade premium materials" },
  ];

  return (
    <section className="py-12 bg-primary/10 border-y border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {badges.map((badge, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col items-center text-center gap-3"
            >
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <badge.icon size={24} />
              </div>
              <div>
                <h4 className="font-bold text-foreground mb-1">{badge.title}</h4>
                <p className="text-sm text-muted-foreground">{badge.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
