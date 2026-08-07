"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  MessageSquare,
  Users,
  Settings,
  LogOut,
  BarChart3,
  FileText,
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside
      style={{
        width: "250px",
        height: "100vh",
        background: "#2563eb",
        color: "white",
        padding: "20px",
        position: "fixed",
        left: 0,
        top: 0,
      }}
    >
      <h2 style={{ marginBottom: "40px" }}>LOOP</h2>

      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <Link href="/dashboard" style={linkStyle}>
          <LayoutDashboard size={20} />
          Dashboard
        </Link>

        <Link href="/feedback" style={linkStyle}>
          <MessageSquare size={20} />
          Feedback
        </Link>

        <Link href="/members" style={linkStyle}>
          <Users size={20} />
          Members
        </Link>
        <Link href="/analytics" style={linkStyle}>
        <BarChart3 size={20} />
         Analytics
         </Link>
         <Link href="/reports" style={linkStyle}>
         <FileText size={20} />
         Reports
        </Link>

        <Link href="/settings" style={linkStyle}>
          <Settings size={20} />
          Settings
        </Link>

        <Link
          href="/login"
          style={{
            ...linkStyle,
            marginTop: "40px",
          }}
        >
          <LogOut size={20} />
          Logout
        </Link>
      </nav>
    </aside>
  );
}

const linkStyle = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  color: "white",
  textDecoration: "none",
  padding: "10px",
  borderRadius: "8px",
};