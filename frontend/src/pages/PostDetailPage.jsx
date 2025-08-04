import { useParams } from "react-router";
import { Box, Heading, Text, Spinner } from "@chakra-ui/react";
import { usePost } from "../services/auth/posts/posts";

export default function PostDetailPage() {
  const { id } = useParams();
  const { data, isLoading, isError } = usePost(id);

  if (isLoading) return <Spinner size="xl" />;
  if (isError) return <Text color="red.500">Failed to load post</Text>;

  return (
    <Box
      p={8}
      shadow={"lg"}
      borderColor={"gray.700"}
      borderWidth={1}
      rounded="md"
      maxWidth={"2xl"}
    >
      <Heading color={"gray.200"}>{data.title}</Heading>
      <Text color={"gray.400"} mt={4}>
        {data.content}
      </Text>
      <Text mt={4} fontSize="sm" color="gray.500">
        By {data.author} on {new Date(data.created_at).toLocaleString()}
      </Text>
    </Box>
  );
}
