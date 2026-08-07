"use client";

import EmptyState from "@/components/ui/EmptyState";
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";

type Report = {
  id: number;
  title: string;
  date: string;
};

function exportCSV(reports: Report[]) {
  const csv =
    "Title,Date\n" +
    reports.map((r) => `${r.title},${r.date}`).join("\n");

  const blob = new Blob([csv], {
    type: "text/csv",
  });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "reports.csv";
  a.click();

  URL.revokeObjectURL(url);
}

export default function ReportsPage() {
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");

  const [reports, setReports] = useState<Report[]>([
    {
      id: 1,
      title: "Monthly Feedback Report",
      date: "06 Aug 2026",
    },
  ]);

  function handleGenerateReport() {
    if (!title.trim()) {
      alert("Please enter report title");
      return;
    }

    const newReport: Report = {
      id: Date.now(),
      title,
      date: new Date().toLocaleDateString(),
    };

    setReports([newReport, ...reports]);
    setTitle("");
  }

  function handleDelete(id: number) {
    setReports(reports.filter((r) => r.id !== id));
  }

  const filteredReports = reports.filter((report) =>
    report.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div
        style={{
          maxWidth: "1100px",
          margin: "30px auto",
          background: "#ffffff",
          padding: "25px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        }}
      >
        <h1
          style={{
            color: "#2563eb",
            marginBottom: "25px",
          }}
        >
          Reports
        </h1>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          <h3>Total Reports: {reports.length}</h3>

          <button
            onClick={() => exportCSV(reports)}
            style={{
              background: "#16a34a",
              color: "#fff",
              padding: "10px 18px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Export CSV
          </button>
        </div>

        <input
          type="text"
          placeholder="Search Report..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ddd",
            marginBottom: "20px",
          }}
        />

        <input
          type="text"
          placeholder="Report Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ddd",
            marginBottom: "20px",
          }}
        />

        <button
          onClick={handleGenerateReport}
          style={{
            background: "#2563eb",
            color: "#fff",
            padding: "12px 20px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Generate Report
        </button>

        <hr style={{ margin: "30px 0" }} />

        <h2>Generated Reports</h2>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  borderBottom: "1px solid #ddd",
                  padding: "12px",
                }}
              >
                Title
              </th>

              <th
                style={{
                  borderBottom: "1px solid #ddd",
                  padding: "12px",
                }}
              >
                Date
              </th>

              <th
                style={{
                  borderBottom: "1px solid #ddd",
                  padding: "12px",
                }}
              >
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredReports.length === 0 ? (
              <tr>
                <td colSpan={3}>
                  <EmptyState
                    title="No Reports Found"
                    description="No reports have been generated yet."
                  />
                </td>
              </tr>
            ) : (
              filteredReports.map((report) => (
                <tr key={report.id}>
                  <td style={{ padding: "12px" }}>{report.title}</td>

                  <td style={{ padding: "12px" }}>{report.date}</td>

                  <td style={{ padding: "12px" }}>
                    <button
                      onClick={() => handleDelete(report.id)}
                      style={{
                        background: "#ef4444",
                        color: "white",
                        border: "none",
                        padding: "8px 15px",
                        borderRadius: "6px",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
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