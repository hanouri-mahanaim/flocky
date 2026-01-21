import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { env } from "@/env";

export interface SmallGroup {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string | null;
}

export interface CreateSmallGroupInput {
  name: string;
}

const fetchRecentSmallGroup = async (): Promise<SmallGroup> => {
  const response = await fetch(`${env.VITE_API_URL}/small-groups/recent`);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("No small groups found");
    }
    throw new Error("Failed to fetch recent small group");
  }

  return response.json();
};

const createSmallGroup = async (data: CreateSmallGroupInput): Promise<SmallGroup> => {
  const response = await fetch(`${env.VITE_API_URL}/small-groups`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create small group");
  }

  return response.json();
};

export const useRecentSmallGroup = () => {
  return useQuery({
    queryKey: ["small-groups"],
    queryFn: fetchRecentSmallGroup,
    retry: 1,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useCreateSmallGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSmallGroup,
    onSuccess: (newGroup) => {
      queryClient.setQueryData(["small-groups"], newGroup);

      queryClient.invalidateQueries({
        queryKey: ["small-groups", "recent"],
      });
    },
  });
};
