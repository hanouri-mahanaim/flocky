import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
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
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="mx-auto max-w-3xl space-y-8 p-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Small Groups</h1>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Create New Group</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="group-name" className="text-sm font-semibold">
                  Group Name
                </Label>
                <input
                  id="group-name"
                  type="text"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  placeholder="Enter group name"
                  className="border-input bg-background focus:ring-ring w-full rounded-lg border px-4 py-3 text-sm transition-all focus:border-transparent focus:ring-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={createGroup.isPending}
                />
              </div>
              <Button
                type="submit"
                disabled={createGroup.isPending || !groupName.trim()}
                size="lg"
                className="w-full sm:w-auto"
              >
                {createGroup.isPending ? "Creating..." : "Create Group"}
              </Button>
            </form>
            {createGroup.isError && (
              <div className="bg-destructive/10 border-destructive/20 mt-4 rounded-lg border p-3">
                <p className="text-destructive text-sm font-medium">
                  Error: {createGroup.error.message}
                </p>
              </div>
            )}
            {createGroup.isSuccess && (
              <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-3 dark:border-green-900 dark:bg-green-950/20">
                <p className="text-sm font-medium text-green-700 dark:text-green-400">
                  Group created successfully!
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Most Recent Group</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading && (
              <div className="text-muted-foreground flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                <p className="text-sm">Loading...</p>
              </div>
            )}
            {error && (
              <div className="bg-destructive/10 border-destructive/20 rounded-lg border p-3">
                <p className="text-destructive text-sm font-medium">Error: {error.message}</p>
              </div>
            )}
            {recentGroup && (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label className="text-muted-foreground text-xs tracking-wide uppercase">
                    Name
                  </Label>
                  <p className="text-lg font-semibold">{recentGroup.name}</p>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-muted-foreground text-xs tracking-wide uppercase">
                    Created
                  </Label>
                  <p className="text-sm">{new Date(recentGroup.createdAt).toLocaleString()}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
