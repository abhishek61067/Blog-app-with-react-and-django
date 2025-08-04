import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosInstance } from "../AxiosInstance";

// Fetch posts with pagination
const fetchPosts = async (page = 1) => {
  const { data } = await AxiosInstance.get(`/posts/?page=${page}`);
  return data;
};

// Fetch single post by id
const fetchPostById = async (id) => {
  const { data } = await AxiosInstance.get(`/posts/${id}/`);
  return data;
};

// Create or update post
const savePost = async (post) => {
  if (post.id) {
    // Edit
    const { data } = await AxiosInstance.put(`/posts/${post.id}/update/`, post);
    return data;
  } else {
    // Create
    const { data } = await AxiosInstance.post(`/posts/create/`, post);
    return data;
  }
};

// Delete post
const deletePost = async (id) => {
  const { data } = await AxiosInstance.delete(`/posts/${id}/delete/`);
  return data;
};

export const usePosts = (page) =>
  useQuery({
    queryKey: ["posts", page],
    queryFn: () => fetchPosts(page),
    keepPreviousData: true,
  });

export const usePost = (id) =>
  useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPostById(id),
    enabled: !!id,
  });

export const useSavePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: savePost,
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });
};
