"use client";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    newCount: 0,
    progressCount: 0,
    resolvedCount: 0,
  });

  const [recentFeedbacks, setRecentFeedbacks] = useState<any[]>([]);

  useEffect(() => {
  async function loadDashboard() {
    try {
      const res = await fetch("/api/dashboard");
      const data = await res.json();

      setStats(data);
      setRecentFeedbacks(data.recentFeedbacks || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  loadDashboard();
}, []);

  const pieData = [
    {
      name: "New",
      value: stats.newCount,
    },
    {
      name: "In Progress",
      value: stats.progressCount,
    },
    {
      name: "Resolved",
      value: stats.resolvedCount,
    },
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

  const COLORS = [
    "#22c55e",
    "#f59e0b",
    "#2563eb",
  ];

  function exportCSV() {
    window.location.href = "/api/export";
  }
if (loading) {
  return (
    <DashboardLayout>
      <LoadingSpinner />
    </DashboardLayout>
  );
}
  return (
    <DashboardLayout>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h1>Dashboard</h1>

        <button
          onClick={exportCSV}
          style={{
            padding: "10px 18px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Export CSV
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "20px",
        }}
      >
        <StatCard
          title="Total Feedback"
          value={stats.total}
          color="#2563eb"
        />

        <StatCard
          title="New"
          value={stats.newCount}
          color="#22c55e"
        />

        <StatCard
          title="In Progress"
          value={stats.progressCount}
          color="#f59e0b"
        />

        <StatCard
          title="Resolved"
          value={stats.resolvedCount}
          color="#ef4444"
        />
      </div>      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h3>Status Breakdown</h3>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                outerRadius={100}
                label
              >
                {pieData.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h3>Feedback Status</h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="count"
                fill="#2563eb"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div
        style={{
          background: "#fff",
          marginTop: "30px",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <h3>Recent Feedback</h3>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "15px",
          }}
        >
          <thead>
            <tr>
              <th style={{ padding: "10px" }}>
                Title
              </th>

              <th style={{ padding: "10px" }}>
                Status
              </th>

              <th style={{ padding: "10px" }}>
                Date
              </th>
            </tr>
          </thead>

          <tbody>            {recentFeedbacks.length === 0 ? (
              <tr>
                <td
                  colSpan={3}
                  style={{
                    textAlign: "center",
                    padding: "20px",
                  }}
                >
                  No Feedback Found
                </td>
              </tr>
            ) : (
              recentFeedbacks.map((item: any) => (
                <tr key={item.id}>
                  <td style={{ padding: "10px" }}>
                    {item.title}
                  </td>

                  <td style={{ padding: "10px" }}>
                    <span
                      style={{
                        padding: "4px 10px",
                        borderRadius: "20px",
                        color: "white",
                        background:
                          item.status === "NEW"
                            ? "#22c55e"
                            : item.status === "IN_PROGRESS"
                            ? "#f59e0b"
                            : "#2563eb",
                      }}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td style={{ padding: "10px" }}>
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}