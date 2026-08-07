"use client";

import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div
        style={{
          marginLeft: "250px",
          width: "100%",
          background: "#f5f7fb",
          minHeight: "100vh",
        }}
      >
        <Navbar />

        <div
          style={{
            padding: "30px",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}