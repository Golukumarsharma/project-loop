"use client";
import EmptyState from "@/components/ui/EmptyState";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";

export default function FeedbackPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [channel, setChannel] = useState("Website");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [editingId, setEditingId] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(feedbacks.length / itemsPerPage);

const paginatedFeedbacks = feedbacks
  .filter((item: any) => {
    const matchSearch = item.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchStatus =
      statusFilter === "ALL" || item.status === statusFilter;

    return matchSearch && matchStatus;
  })
  .slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const workspaceId = "cmse8qkbg0000vrf0nkfjds23";

  async function loadFeedbacks() {
    try {
      const res = await fetch("/api/feedback");
      const data = await res.json();
      setFeedbacks(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadFeedbacks();
  }, []);

  async function handleSubmit() {
    setLoading(true);
    if (!title || !description) {
      toast.error("Please fill all fields");
      return;
    }

    if (isEditing) {
      const res = await fetch(`/api/feedback/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
        }),
      });

      const data = await res.json();
      toast.success(data.message);

      setIsEditing(false);
      setEditingId("");
    } else {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          channel,
          workspaceId,
        }),
      });

      const data = await res.json();
    toast.success(data.message);
    }

    setTitle("");
    setDescription("");
    loadFeedbacks();
    setLoading(false);
  }

  async function handleDelete(id: string) {
    const ok = confirm("Are you sure?");
    if (!ok) return;

    const res = await fetch(`/api/feedback/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();
   toast.success(data.message);

    loadFeedbacks();
  }

  async function handleStatus(id: string, currentStatus: string) {
    let newStatus = "NEW";

    if (currentStatus === "NEW") {
      newStatus = "IN_PROGRESS";
    } else if (currentStatus === "IN_PROGRESS") {
      newStatus = "RESOLVED";
    } else {
     toast.error("Already Resolved");
      return;
    }

    const res = await fetch(`/api/feedback/${id}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: newStatus,
      }),
    });

    const data = await res.json();
    alert(data.message);

    loadFeedbacks();
  }

  function handleEdit(item: any) {
    setTitle(item.title);
    setDescription(item.description);
    setEditingId(item.id);
    setIsEditing(true);
  }

  return (
    <DashboardLayout>      <div
        style={{
          maxWidth: "1000px",
          margin: "30px auto",
          padding: "25px",
          background: "#ffffff",
          borderRadius: "12px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
        }}
      >
        <h1
          style={{
            fontSize: "28px",
            marginBottom: "25px",
            color: "#1e3a8a",
          }}
        >
          Feedback Management
        </h1>

        <input
  type="text"
  placeholder="Feedback Title"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
  style={{
    width: "100%",
    padding: "12px",
    marginTop: "20px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    outline: "none",
    fontSize: "15px",
  }}
/>

        <textarea
          placeholder="Feedback Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{
            width: "100%",
            height: "150px",
            padding: "10px",
            marginTop: "20px",
          }}
        />
        <select
  value={channel}
  onChange={(e) => setChannel(e.target.value)}
  style={{
    width: "100%",
    padding: "10px",
    marginTop: "20px",
  }}
>
  <option value="Website">Website</option>
  <option value="Email">Email</option>
  <option value="WhatsApp">WhatsApp</option>
  <option value="Call">Call</option>
  <option value="Mobile App">Mobile App</option>
</select>

      <button
  onClick={handleSubmit}
  disabled={loading}
  style={{
    marginTop: "20px",
    padding: "12px 20px",
    background: loading ? "#94a3b8" : "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: loading ? "not-allowed" : "pointer",
    fontWeight: "bold",
    transition: "0.3s",
  }}
  onMouseEnter={(e) => {
    if (!loading) e.currentTarget.style.opacity = "0.85";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.opacity = "1";
  }}
>
  {loading
    ? "Please Wait..."
    : isEditing
    ? "Update Feedback"
    : "Submit Feedback"}
</button>

       <input
  type="text"
  placeholder="🔍 Search Feedback..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  style={{
    width: "100%",
    padding: "12px",
    marginTop: "20px",
    marginBottom: "20px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    outline: "none",
    fontSize: "15px",
  }}
/>

        <select
  value={statusFilter}
  onChange={(e) => setStatusFilter(e.target.value)}
  style={{
    width: "100%",
    padding: "12px",
    marginBottom: "20px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    outline: "none",
    fontSize: "15px",
    cursor: "pointer",
  }}
>
  <option value="ALL">All</option>
  <option value="NEW">New</option>
  <option value="IN_PROGRESS">In Progress</option>
  <option value="RESOLVED">Resolved</option>
</select>

        <div
          style={{
            marginTop: "40px",
            background: "#fff",
            borderRadius: "12px",
            padding: "20px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <h2 style={{ marginBottom: "20px" }}>All Feedback</h2>

          <table
            cellPadding={12}
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Channel</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
  {feedbacks.length === 0 ? (
    <tr>
      <td colSpan={5}>
        <EmptyState
          title="No Feedback Found"
          description="There is no feedback available yet."
        />
      </td>
    </tr>
  ) : (
               paginatedFeedbacks.map((item: any) => (
                    <tr key={item.id}>
                      <td>{item.title}</td>
                      <td>{item.description}</td>
                      <td>{item.channel}</td>

                      <td>
                        <span
                          style={{
                            padding: "6px 12px",
                            borderRadius: "20px",
                            color: "white",
                            fontWeight: "bold",
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

                      <td>                        <button
                          onClick={() => handleEdit(item)}
                          style={{
                            background: "green",
                            color: "white",
                            border: "none",
                            padding: "8px 12px",
                            borderRadius: "5px",
                            cursor: "pointer",
                            marginRight: "10px",
                          }}
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            handleStatus(item.id, item.status)
                          }
                          style={{
                            background: "#2563eb",
                            color: "white",
                            border: "none",
                            padding: "8px 12px",
                            borderRadius: "5px",
                            cursor: "pointer",
                            marginRight: "10px",
                          }}
                        >
                          Update
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(item.id)
                          }
                          style={{
                            background: "red",
                            color: "white",
                            border: "none",
                            padding: "8px 12px",
                            borderRadius: "5px",
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

👇 YAHAN PASTE KARNA HAI

<div
  style={{
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginTop: "20px",
  }}
>
  <button
    disabled={currentPage === 1}
    onClick={() => setCurrentPage(currentPage - 1)}
  >
    Previous
  </button>

  <span>
    Page {currentPage} of {totalPages}
  </span>

  <button
    disabled={currentPage === totalPages}
    onClick={() => setCurrentPage(currentPage + 1)}
  >
    Next
  </button>
</div>

</div>
      </div>
    </DashboardLayout>
  );
}
