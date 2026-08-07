"use client";

type EmptyStateProps = {
  title: string;
  description: string;
};

export default function EmptyState({
  title,
  description,
}: EmptyStateProps) {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "60px 20px",
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,.08)",
      }}
    >
      <div
        style={{
          fontSize: "60px",
          marginBottom: "20px",
        }}
      >
        📭
      </div>

      <h2
        style={{
          color: "#2563eb",
          marginBottom: "10px",
        }}
      >
        {title}
      </h2>

      <p
        style={{
          color: "#64748b",
        }}
      >
        {description}
      </p>
    </div>
  );
}