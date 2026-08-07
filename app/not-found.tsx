"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f7fb",
      }}
    >
      <div
        style={{
          textAlign: "center",
          background: "#fff",
          padding: "50px",
          borderRadius: "15px",
          boxShadow: "0 5px 20px rgba(0,0,0,.1)",
          width: "500px",
        }}
      >
        <h1
          style={{
            fontSize: "90px",
            color: "#2563eb",
            margin: 0,
          }}
        >
          404
        </h1>

        <h2
          style={{
            marginTop: "10px",
          }}
        >
          Page Not Found
        </h2>

        <p
          style={{
            color: "#64748b",
            marginBottom: "30px",
          }}
        >
          The page you are looking for does not exist.
        </p>

        <Link href="/dashboard">
          <button
            style={{
              background: "#2563eb",
              color: "#fff",
              border: "none",
              padding: "12px 20px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Go to Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
}