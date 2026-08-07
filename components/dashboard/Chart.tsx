"use client";

type Props = {
  title: string;
  value: number;
  color: string;
};

export default function StatCard({
  title,
  value,
  color,
}: Props) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "16px",
        padding: "24px",
        boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
        borderLeft: `8px solid ${color}`,
        transition: "0.3s",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0px)";
      }}
    >
      <h3
        style={{
          color: "#6b7280",
          marginBottom: "12px",
          fontSize: "18px",
          fontWeight: "600",
        }}
      >
        {title}
      </h3>

      <h1
        style={{
          margin: 0,
          fontSize: "42px",
          color: "#111827",
          fontWeight: "bold",
        }}
      >
        {value}
      </h1>
    </div>
  );
}