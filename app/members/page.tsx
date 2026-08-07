"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import DashboardLayout from "@/components/layout/DashboardLayout";
import EmptyState from "@/components/ui/EmptyState";
import ConfirmModal from "@/components/ui/ConfirmModal";

export default function MembersPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("ADMIN");

  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [openModal, setOpenModal] = useState(false);

  const [members, setMembers] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      role: "ADMIN",
    },
    {
      id: 2,
      name: "Amit Kumar",
      email: "amit@gmail.com",
      role: "ANALYST",
    },
  ]);

  function addMember() {
    if (!name || !email) {
      toast.error("Please fill all fields");
      return;
    }

    const newMember = {
      id: Date.now(),
      name,
      email,
      role,
    };

    setMembers([newMember, ...members]);

    toast.success("Member Added");

    setName("");
    setEmail("");
    setRole("ADMIN");
  }

  return (
    <DashboardLayout>
      <div
        style={{
          maxWidth: "1100px",
          margin: "30px auto",
          background: "#fff",
          padding: "25px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,.08)",
        }}
      >
        <h1
          style={{
            color: "#2563eb",
            marginBottom: "20px",
          }}
        >
          Members Management
        </h1>        <input
          type="text"
          placeholder="Member Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            marginBottom: "15px",
          }}
        />

        <input
          type="email"
          placeholder="Member Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            marginBottom: "15px",
          }}
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        >
          <option value="ADMIN">Admin</option>
          <option value="ANALYST">Analyst</option>
          <option value="VIEWER">Viewer</option>
        </select>

        <button
          onClick={addMember}
          style={{
            padding: "12px 20px",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
            marginBottom: "25px",
          }}
        >
          Add Member
        </button>

        <input
          type="text"
          placeholder="🔍 Search Member..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        />

        <h2 style={{ marginBottom: "15px" }}>
          Members List
        </h2>        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  background: "#2563eb",
                  color: "white",
                  padding: "12px",
                }}
              >
                Name
              </th>

              <th
                style={{
                  background: "#2563eb",
                  color: "white",
                  padding: "12px",
                }}
              >
                Email
              </th>

              <th
                style={{
                  background: "#2563eb",
                  color: "white",
                  padding: "12px",
                }}
              >
                Role
              </th>

              <th
                style={{
                  background: "#2563eb",
                  color: "white",
                  padding: "12px",
                }}
              >
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {members
              .filter((member) =>
                member.name
                  .toLowerCase()
                  .includes(search.toLowerCase())
              )
              .map((member) => (
                <tr key={member.id}>
                  <td
                    style={{
                      padding: "12px",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    {member.name}
                  </td>

                  <td
                    style={{
                      padding: "12px",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    {member.email}
                  </td>

                  <td
                    style={{
                      padding: "12px",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    {member.role}
                  </td>

                  <td
                    style={{
                      padding: "12px",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    <button
                       onClick={() => {
                       setDeleteId(member.id);
                        setOpenModal(true);
                      }}
                      style={{
                        background: "#ef4444",
                        color: "white",
                        border: "none",
                        padding: "8px 14px",
                        borderRadius: "6px",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

           {members.filter((member) =>
  member.name
    .toLowerCase()
    .includes(search.toLowerCase())
).length === 0 && (
  <tr>
    <td colSpan={4}>
      <EmptyState
        title="No Members Found"
        description="There are no members available."
      />
    </td>
  </tr>
)}
          </tbody>
        </table>
      </div>
      <ConfirmModal
  open={openModal}
  title="Delete Member?"
  message="This action cannot be undone."

  onCancel={() => {
    setOpenModal(false);
    setDeleteId(null);
  }}

  onConfirm={() => {
    setMembers(
      members.filter((m) => m.id !== deleteId)
    );

    toast.success("Member Deleted");

    setOpenModal(false);
    setDeleteId(null);
  }}
/>
    </DashboardLayout>
  );
}