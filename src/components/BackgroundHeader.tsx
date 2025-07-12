// src/components/BackgroundHeader.tsx
"use client";

const BackgroundHeader = () => {
  return (
    <div className="background-header">
      {/* Radiating Lines */}
      <div
        className="background-line"
        style={{
          width: "40%",
          left: "-10%",
          top: "50%",
          transform: "rotate(5deg)",
        }}></div>
      <div
        className="background-line"
        style={{
          width: "40%",
          right: "-10%",
          top: "50%",
          transform: "rotate(-5deg)",
        }}></div>
      <div
        className="background-line"
        style={{
          width: "30%",
          left: "0%",
          top: "40%",
          transform: "rotate(-15deg)",
        }}></div>
      <div
        className="background-line"
        style={{
          width: "30%",
          right: "0%",
          top: "40%",
          transform: "rotate(15deg)",
        }}></div>

      {/* Central Orb */}
      <div className="background-orb"></div>
    </div>
  );
};

export default BackgroundHeader;
