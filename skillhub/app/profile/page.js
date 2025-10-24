"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import toast from "react-hot-toast";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/users/profile");
        setUser(res.data);
      } catch {
        toast.error("Failed to load profile");
      }
    };
    fetchProfile();
  }, []);

  const handleUpdate = async () => {
    try {
      await api.put("/users/profile", user);
      toast.success("Profile updated!");
      setEdit(false);
    } catch {
      toast.error("Update failed");
    }
  };

  if (!user) return <div className="p-8">Loading...</div>;

  return (
    <ProtectedRoute>
      <div className="p-8 max-w-lg mx-auto bg-white rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4">My Profile</h1>
        <label className="block mb-2">Name</label>
        <input
          className="border w-full p-2 mb-3 rounded"
          value={user.name}
          disabled={!edit}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <label className="block mb-2">Email</label>
        <input
          className="border w-full p-2 mb-3 rounded"
          value={user.email}
          disabled
        />
        {edit ? (
          <button
            onClick={handleUpdate}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Save Changes
          </button>
        ) : (
          <button
            onClick={() => setEdit(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Edit Profile
          </button>
        )}
      </div>
    </ProtectedRoute>
  );
}
