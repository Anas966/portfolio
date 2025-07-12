// src/app/layout.tsx
"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import FloatingNav from "@/components/FloatingNav";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isOrbDocked, setIsOrbDocked] = useState(true);

  return (
    <html lang="en">
      <head>
        <title>Anas Allahim - Interactive Portfolio</title>
      </head>
      <body className={`${inter.className} bg-gray-950 text-white`}>
        {/*
          This is the main change. The div with className="dotted-aura"
          has been completely removed from inside this container.
        */}
        <div
          className="docking-header"
          style={{ opacity: isOrbDocked ? 1 : 0 }}>
          <Header />
        </div>

        <main className="relative z-10 container mx-auto px-4 pt-48 pb-12">
          {children}
        </main>

        <FloatingNav
          onDragStart={() => setIsOrbDocked(false)}
          onDragEnd={(event, info) => {
            const homeX = window.innerWidth / 2;
            const homeY = 39 + 36;
            const distance = Math.sqrt(
              Math.pow(info.point.x - homeX, 2) +
                Math.pow(info.point.y - homeY, 2)
            );

            if (distance < 50) {
              setIsOrbDocked(true);
            }
          }}
        />
      </body>
    </html>
  );
}
