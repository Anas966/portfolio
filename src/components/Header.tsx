// src/components/Header.tsx
"use client";

const Header = () => {
  return (
    <header className="aura-header">
      {/* The buggy aura container has been removed */}
      <div className="header-content">
        {/* Left Side */}
        <div className="flex items-center gap-4">
          <h1 className="header-name">Anas</h1>
          <div className="line-group w-32">
            <div className="radiating-line line-left"></div>
            <div className="radiating-line line-left ml-4"></div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <div className="line-group w-32 items-end">
            <div className="radiating-line line-right"></div>
            <div className="radiating-line line-right mr-4"></div>
          </div>
          <h1 className="header-name">Allahim</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
