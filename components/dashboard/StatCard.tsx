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
        borderRadius: "14px",
        padding: "25px",
        borderTop: `6px solid ${color}`,
        boxShadow: "0 6px 18px rgba(0,0,0,.08)",
        transition: "all .3s ease",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow =
          "0 12px 25px rgba(0,0,0,.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow =
          "0 6px 18px rgba(0,0,0,.08)";
      }}
    >
      <h3
        style={{
          color: "#64748b",
          fontSize: "18px",
          fontWeight: "600",
          marginBottom: "15px",
        }}
      >
        {title}
      </h3>

      <h1
        style={{
          margin: 0,
          fontSize: "42px",
          color: color,
          fontWeight: "700",
        }}
      >
        {value}
      </h1>
    </div>
  );
}