"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  LineChart,
  Line,
  Legend,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function AnalyticsPage() {
  const [stats, setStats] = useState({
    total: 0,
    newCount: 0,
    progressCount: 0,
    resolvedCount: 0,
  });

  useEffect(() => {
    async function loadData() {
      const res = await fetch("/api/dashboard");
      const data = await res.json();

      setStats(data);
    }

    loadData();
  }, []);

  const pieData = [
    { name: "New", value: stats.newCount },
    { name: "In Progress", value: stats.progressCount },
    { name: "Resolved", value: stats.resolvedCount },
  ];

  const COLORS = [
    "#22c55e",
    "#f59e0b",
    "#2563eb",
  ];

  const barData = [
    {
      name: "New",
      count: stats.newCount,
    },
    {
      name: "Progress",
      count: stats.progressCount,
    },
    {
      name: "Resolved",
      count: stats.resolvedCount,
    },
  ];

  const lineData = [
    { month: "Jan", feedback: 5 },
    { month: "Feb", feedback: 8 },
    { month: "Mar", feedback: 12 },
    { month: "Apr", feedback: 10 },
    { month: "May", feedback: 16 },
    { month: "Jun", feedback: 18 },
  ];

  return (
    <DashboardLayout>
      <div
        style={{
          maxWidth: "1200px",
          margin: "30px auto",
        }}
      >
        <h1
          style={{
            fontSize: "30px",
            color: "#2563eb",
            marginBottom: "10px",
          }}
        >
          Analytics Dashboard
        </h1>

        <p
          style={{
            color: "#64748b",
            marginBottom: "25px",
          }}
        >
          Visual insights of customer feedback and system performance.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              background: "#2563eb",
              color: "white",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <h3>Total Feedback</h3>
            <h2>{stats.total}</h2>
          </div>

          <div
            style={{
              background: "#22c55e",
              color: "white",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <h3>New</h3>
            <h2>{stats.newCount}</h2>
          </div>

          <div
            style={{
              background: "#f59e0b",
              color: "white",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <h3>In Progress</h3>
            <h2>{stats.progressCount}</h2>
          </div>

          <div
            style={{
              background: "#ef4444",
              color: "white",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <h3>Resolved</h3>
            <h2>{stats.resolvedCount}</h2>
          </div>
        </div>        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,.08)",
            }}
          >
            <h3
              style={{
                marginBottom: "20px",
              }}
            >
              Status Distribution
            </h3>

            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  outerRadius={110}
                  label
                >
                  {pieData.map((_, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index]}
                    />
                  ))}
                </Pie>

                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,.08)",
            }}
          >
            <h3
              style={{
                marginBottom: "20px",
              }}
            >
              Feedback Overview
            </h3>

            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Legend />

                <Bar
                  dataKey="count"
                  fill="#2563eb"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,.08)",
            marginBottom: "30px",
          }}
        >
          <h3 style={{ marginBottom: "20px" }}>
            Monthly Feedback Trend
          </h3>

          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Legend />

              <Line
                type="monotone"
                dataKey="feedback"
                stroke="#2563eb"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: "20px",
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,.08)",
            }}
          >
            <h4>Total Feedback</h4>
            <h2>{stats.total}</h2>
          </div>

          <div
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,.08)",
            }}
          >
            <h4>Success Rate</h4>
            <h2>
              {stats.total === 0
                ? "0%"
                : Math.round(
                    (stats.resolvedCount / stats.total) * 100
                  ) + "%"}
            </h2>
          </div>

          <div
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,.08)",
            }}
          >
            <h4>Pending</h4>
            <h2>
              {stats.newCount + stats.progressCount}
            </h2>
          </div>

          <div
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,.08)",
            }}
          >
            <h4>Resolved</h4>
            <h2>{stats.resolvedCount}</h2>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}