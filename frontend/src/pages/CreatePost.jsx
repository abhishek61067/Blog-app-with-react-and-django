import { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Input,
  Textarea,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router";
import { usePost, useSavePost } from "../services/auth/posts/posts";

export default function CreatePost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const { data: post, isLoading } = usePost(id);
  const { mutateAsync: savePostMutation } = useSavePost();

  const [form, setForm] = useState({ title: "", content: "" });

  useEffect(() => {
    if (post) {
      setForm({ title: post.title, content: post.content });
    }
  }, [post]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    savePostMutation({ id, ...form })
      .then(() => {
        toast({
          title: id ? "Post updated" : "Post created",
          status: "success",
        });
        navigate("/posts");
      })
      .catch((error) => {
        toast({
          title: "Error saving post",
          description: error.response?.data?.message || "An error occurred",
          status: "error",
        });
      });
  };

  if (isLoading && id) return <p>Loading...</p>;

  return (
    <Box p={8}>
      <Heading color={"white"} mb={4}>
        {id ? "Edit Post" : "Create Post"}
      </Heading>
      <form onSubmit={handleSubmit}>
        <Input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          mb={4}
          color={"white"}
        />
        <Textarea
          color={"white"}
          name="content"
          placeholder="Content"
          value={form.content}
          onChange={handleChange}
          mb={4}
        />
        <Button
          colorScheme="blue"
          type="submit"
          isLoading={savePostMutation.isLoading}
        >
          {id ? "Update" : "Create"}
        </Button>
      </form>
    </Box>
  );
}
