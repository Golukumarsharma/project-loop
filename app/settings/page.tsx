"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div
        style={{
          maxWidth: "800px",
          margin: "30px auto",
          background: "#fff",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        }}
      >
        <h1
          style={{
            color: "#2563eb",
            marginBottom: "20px",
          }}
        >
          Settings
        </h1>

        <div style={{ marginBottom: "20px" }}>
          <label>Name</label>
          <input
            type="text"
            value="Admin"
            readOnly
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "8px",
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label>Email</label>
          <input
            type="email"
            value="admin@gmail.com"
            readOnly
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "8px",
            }}
          />
        </div>

        <button
          style={{
            background: "#2563eb",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Save Settings
        </button>
      </div>
    </DashboardLayout>
  );
}