'use client';

import React, { useState, useEffect, JSX } from 'react';

export default function BackgroundBubbles() {
  const [bubbles, setBubbles] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const generated = [...Array(100)].map((_, i) => (
      <div
        key={i}
        className="absolute bg-white rounded-full animate-pulse"
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          width: `${Math.random() * 10}px`,
          height: `${Math.random() * 10}px`
        }}
      />
    ));
    setBubbles(generated);
  }, []);

  return (
    <div className="absolute inset-0 z-0">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 opacity-90"></div>
      {bubbles}
    </div>
  );
}
