"use client";

import ProfileDropdown from "./ProfileDropdown";

export default function Navbar() {
  return (
    <header
      style={{
        height: "70px",
        background: "white",
        borderBottom: "1px solid #ddd",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 30px",
      }}
    >
      {/* Left Side */}
      <div>
        <h2
          style={{
            color: "#2563eb",
            fontSize: "24px",
            fontWeight: "bold",
            margin: 0,
          }}
        >
          AI Feedback Dashboard
        </h2>
      </div>

      {/* Right Side */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <strong
          style={{
            color: "#374151",
          }}
        >
          Welcome 👋
        </strong>

        <ProfileDropdown />
      </div>
    </header>
  );
}