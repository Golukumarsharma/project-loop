"use client";

import { useState } from "react";

export default function SignupPage() {
  const [workspace, setWorkspace] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignup() {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        workspace,
        name,
        email,
        password,
      }),
    });

    const data = await res.json();

    alert(data.message);
  }

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "400px",
          padding: "30px",
          border: "1px solid #ddd",
          borderRadius: "10px",
        }}
      >
        <h2>Signup</h2>

        <input
          placeholder="Workspace Name"
          value={workspace}
          onChange={(e) => setWorkspace(e.target.value)}
          style={{ width: "100%", padding: 10, marginTop: 20 }}
        />

        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: "100%", padding: 10, marginTop: 20 }}
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: 10, marginTop: 20 }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: 10, marginTop: 20 }}
        />

        <button
          onClick={handleSignup}
          style={{
            width: "100%",
            padding: 10,
            marginTop: 20,
            cursor: "pointer",
          }}
        >
          Create Account
        </button>
      </div>
    </div>
  );
}