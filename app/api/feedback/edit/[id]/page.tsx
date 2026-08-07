"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditFeedbackPage() {
  const router = useRouter();
  const params = useParams();

  const id = params.id as string;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("NEW");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeedback();
  }, []);

  async function loadFeedback() {
    try {
      const res = await fetch(`/api/feedback/${id}`);
      const data = await res.json();

      setTitle(data.title);
      setDescription(data.description);
      setStatus(data.status);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleUpdate() {
    const res = await fetch(`/api/feedback/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        status,
      }),
    });

    const data = await res.json();

    alert(data.message);

    router.push("/feedback");
  }

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "30px auto",
        padding: "20px",
      }}
    >
      <h1>Edit Feedback</h1>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginTop: "20px",
        }}
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{
          width: "100%",
          height: "150px",
          padding: "10px",
          marginTop: "20px",
        }}
      >
      </textarea>      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginTop: "20px",
        }}
      >
        <option value="NEW">NEW</option>
        <option value="IN_PROGRESS">IN PROGRESS</option>
        <option value="RESOLVED">RESOLVED</option>
      </select>

      <button
        onClick={handleUpdate}
        style={{
          marginTop: "20px",
          padding: "12px 20px",
          background: "#2563eb",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Update Feedback
      </button>

      <button
        onClick={() => router.push("/feedback")}
        style={{
          marginTop: "20px",
          marginLeft: "10px",
          padding: "12px 20px",
          background: "#6b7280",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Cancel
      </button>    </div>
  );
}