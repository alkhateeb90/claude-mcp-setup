"use client";

import { motion } from "framer-motion";

// City coordinates on the SVG map (1000x600 viewBox)
const cities = [
  { name: "Beijing", x: 780, y: 180, region: "asia" },
  { name: "Shanghai", x: 800, y: 200, region: "asia" },
  { name: "Ho Chi Minh", x: 820, y: 280, region: "asia" },
  { name: "Istanbul", x: 550, y: 220, region: "europe" },
  { name: "London", x: 480, y: 170, region: "europe" },
  { name: "Berlin", x: 520, y: 160, region: "europe" },
  { name: "Italy", x: 530, y: 210, region: "europe" },
  { name: "UAE", x: 620, y: 260, region: "middleeast" },
  { name: "Saudi Arabia", x: 600, y: 270, region: "middleeast" },
];

// Trade routes connecting the cities
const tradeRoutes = [
  { from: "Beijing", to: "Shanghai" },
  { from: "Shanghai", to: "Ho Chi Minh" },
  { from: "Beijing", to: "Istanbul" },
  { from: "Istanbul", to: "London" },
  { from: "Istanbul", to: "Berlin" },
  { from: "Berlin", to: "London" },
  { from: "Istanbul", to: "Italy" },
  { from: "UAE", to: "Saudi Arabia" },
  { from: "Istanbul", to: "UAE" },
];

// Helper function to calculate line path
const getLineCoordinates = (fromName: string, toName: string) => {
  const from = cities.find((c) => c.name === fromName);
  const to = cities.find((c) => c.name === toName);
  if (!from || !to) return null;
  return { x1: from.x, y1: from.y, x2: to.x, y2: to.y };
};

// Helper to calculate line length for stroke-dasharray
const getLineLength = (x1: number, y1: number, x2: number, y2: number) => {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};

export default function WorldMap() {
  return (
    <div className="w-full flex justify-center items-center py-8 px-4">
      <svg
        viewBox="0 0 1000 600"
        className="w-full max-w-6xl h-auto"
        style={{ minHeight: "400px", maxHeight: "600px" }}
      >
        {/* Background world map outline (simplified) */}
        <g opacity="0.1" stroke="#1E0E2E" strokeWidth="1" fill="none">
          {/* Simplified world continents - decorative only */}
          <ellipse cx="500" cy="300" rx="450" ry="250" />
          <path d="M 100 250 Q 150 200 250 220 T 400 250" />
          <path d="M 600 180 Q 700 160 800 200" />
        </g>

        {/* Trade route lines */}
        {tradeRoutes.map((route, index) => {
          const coords = getLineCoordinates(route.from, route.to);
          if (!coords) return null;
          const length = getLineLength(coords.x1, coords.y1, coords.x2, coords.y2);

          return (
            <motion.line
              key={`line-${index}`}
              x1={coords.x1}
              y1={coords.y1}
              x2={coords.x2}
              y2={coords.y2}
              stroke="#FF5722"
              strokeWidth="2"
              strokeDasharray={length}
              strokeDashoffset={length}
              initial={{ strokeDashoffset: length }}
              animate={{ strokeDashoffset: 0 }}
              transition={{
                duration: 3,
                delay: index * 0.5,
                ease: "easeOut",
              }}
              opacity="0.4"
            />
          );
        })}

        {/* Particle effects along the lines */}
        {tradeRoutes.map((route, routeIndex) => {
          const coords = getLineCoordinates(route.from, route.to);
          if (!coords) return null;

          return (
            <g key={`particles-${routeIndex}`}>
              {[0, 1, 2].map((particleIndex) => (
                <motion.circle
                  key={`particle-${routeIndex}-${particleIndex}`}
                  r="3"
                  fill="#5B6EF5"
                  initial={{
                    cx: coords.x1,
                    cy: coords.y1,
                    opacity: 0,
                  }}
                  animate={{
                    cx: [coords.x1, coords.x2],
                    cy: [coords.y1, coords.y2],
                    opacity: [0, 0.8, 0],
                  }}
                  transition={{
                    duration: 4,
                    delay: routeIndex * 0.8 + particleIndex * 1.3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              ))}
            </g>
          );
        })}

        {/* City dots with pulsing animation */}
        {cities.map((city, index) => (
          <g key={`city-${city.name}`}>
            {/* Outer pulsing ring */}
            <motion.circle
              cx={city.x}
              cy={city.y}
              r="8"
              fill="none"
              stroke="#FF5722"
              strokeWidth="2"
              initial={{ scale: 1, opacity: 1 }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [1, 0, 1],
              }}
              transition={{
                duration: 2,
                delay: index * 0.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ transformOrigin: `${city.x}px ${city.y}px` }}
            />

            {/* Inner solid dot */}
            <motion.circle
              cx={city.x}
              cy={city.y}
              r="6"
              fill="#FF5722"
              initial={{ scale: 0.8 }}
              animate={{ scale: [0.8, 1, 0.8] }}
              transition={{
                duration: 2,
                delay: index * 0.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ transformOrigin: `${city.x}px ${city.y}px` }}
            />

            {/* City label */}
            <text
              x={city.x}
              y={city.y - 15}
              textAnchor="middle"
              className="text-xs font-body fill-navy"
              style={{ fontSize: "12px" }}
            >
              {city.name}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
