"use client";

import { useState } from "react";

export default function ProfileDropdown() {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          padding: "10px 16px",
          border: "none",
          borderRadius: "8px",
          background: "#2563eb",
          color: "white",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        👤 Admin ▼
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            right: 0,
            top: "50px",
            width: "180px",
            background: "#fff",
            borderRadius: "10px",
            boxShadow: "0 4px 15px rgba(0,0,0,.15)",
            overflow: "hidden",
            zIndex: 100,
          }}
        >
          <a
            href="/settings"
            style={{
              display: "block",
              padding: "12px 16px",
              textDecoration: "none",
              color: "#111827",
            }}
          >
            ⚙️ Settings
          </a>

          <a
  href="#"
  onClick={(e) => {
    e.preventDefault();

    document.cookie =
      "isLoggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    window.location.href = "/login";
  }}
  style={{
    display: "block",
    padding: "12px 16px",
    textDecoration: "none",
    color: "#dc2626",
  }}
>
  🚪 Logout
</a>
        </div>
      )}
    </div>
  );
}