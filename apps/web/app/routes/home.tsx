import { useState } from "react";

import { useCreateSmallGroup, useRecentSmallGroup } from "@/hooks/use-small-groups";

export function meta() {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const [groupName, setGroupName] = useState("");
  const { data: recentGroup, isLoading, error } = useRecentSmallGroup();
  const createGroup = useCreateSmallGroup();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (groupName.trim()) {
      createGroup.mutate(
        { name: groupName },
        {
          onSuccess: () => {
            setGroupName("");
          },
        },
      );
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Small Groups</h1>

      {/* Create Small Group Form */}
      <div className="mb-8 p-6 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Create New Group</h2>
        <form onSubmit={handleSubmit} className="flex gap-4">
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="Enter group name"
            className="flex-1 px-4 py-2 border rounded"
            disabled={createGroup.isPending}
          />
          <button
            type="submit"
            disabled={createGroup.isPending || !groupName.trim()}
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {createGroup.isPending ? "Creating..." : "Create"}
          </button>
        </form>
        {createGroup.isError && (
          <p className="mt-2 text-red-500">Error: {createGroup.error.message}</p>
        )}
        {createGroup.isSuccess && (
          <p className="mt-2 text-green-500">Group created successfully!</p>
        )}
      </div>

      {/* Recent Small Group Display */}
      <div className="p-6 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Most Recent Group</h2>
        {isLoading && <p className="text-gray-500">Loading...</p>}
        {error && <p className="text-red-500">Error: {error.message}</p>}
        {recentGroup && (
          <div className="space-y-2">
            <p>
              <span className="font-semibold">Name:</span> {recentGroup.name}
            </p>
            <p>
              <span className="font-semibold">Created:</span>{" "}
              {new Date(recentGroup.createdAt).toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
