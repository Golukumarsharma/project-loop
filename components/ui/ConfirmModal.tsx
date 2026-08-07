"use client";

type ConfirmModalProps = {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmModal({
  open,
  title,
  message,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.45)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          width: "420px",
          background: "#fff",
          borderRadius: "12px",
          padding: "25px",
          boxShadow: "0 10px 30px rgba(0,0,0,.2)",
        }}
      >
        <h2
          style={{
            color: "#dc2626",
            marginBottom: "12px",
          }}
        >
          {title}
        </h2>

        <p
          style={{
            color: "#475569",
            marginBottom: "25px",
          }}
        >
          {message}
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "12px",
          }}
        >
          <button
            onClick={onCancel}
            style={{
              padding: "10px 18px",
              border: "1px solid #cbd5e1",
              background: "#fff",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            style={{
              padding: "10px 18px",
              background: "#dc2626",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}