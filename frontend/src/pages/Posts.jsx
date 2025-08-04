import { useState } from "react";
import { Box, Heading, Text, Button, Spinner } from "@chakra-ui/react";
import { usePosts, useDeletePost } from "../services/auth/posts/posts";
import { useNavigate } from "react-router";
import { useToast } from "@chakra-ui/react";

export default function BlogListPage() {
  const toast = useToast();
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = usePosts(page);
  const { mutateAsync: deletePostMutation } = useDeletePost();
  const navigate = useNavigate();

  if (isLoading) return <Spinner size="xl" />;
  if (isError) return <Text color="red.500">Failed to load posts</Text>;

  return (
    <Box p={8} minWidth={"xl"} maxWidth={"2xl"}>
      <Heading color={"gray.200"} mb={4}>
        All Posts
      </Heading>
      {data.posts.map((post) => (
        <Box
          key={post.id}
          p={4}
          mb={4}
          borderWidth="1px"
          rounded="md"
          borderColor={"gray.700"}
        >
          <Heading mb={2} color={"gray.300"} size="md">
            {post.title}
          </Heading>
          <Text color={"gray.400"} noOfLines={1}>
            {post.content}
          </Text>
          <Text mt={2} fontSize="sm" color="gray.500">
            By {post.author} on {new Date(post.created_at).toLocaleString()}
          </Text>
          <Button mt={4} colorScheme="cyan" as="a" href={`/posts/${post.id}`}>
            View Details
          </Button>
          <Button
            mt={4}
            ml={2}
            colorScheme="cyan"
            onClick={() => navigate(`/create-post/${post.id}`)}
            variant={"outline"}
          >
            Edit
          </Button>
          <Button
            mt={4}
            ml={2}
            colorScheme="red"
            isLoading={deletePostMutation.isLoading}
            onClick={() =>
              deletePostMutation(post.id)
                .then()
                .catch((error) => {
                  toast({
                    title: "Error deleting post",
                    description:
                      error.response?.data?.message || "An error occurred",
                    status: "error",
                  });
                })
            }
          >
            Delete
          </Button>
        </Box>
      ))}

      <Box mt={6} display="flex" justifyContent="space-between">
        <Button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          isDisabled={!data.has_previous}
        >
          Previous
        </Button>
        <Text color="gray.400">
          Page {data.page} of {data.total_pages}
        </Text>
        <Button
          onClick={() => setPage((p) => p + 1)}
          isDisabled={!data.has_next}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
}
