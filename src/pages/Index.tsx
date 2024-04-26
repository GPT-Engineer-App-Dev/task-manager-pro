import { useState } from "react";
import { Box, Input, List, ListItem, IconButton, Text, useToast } from "@chakra-ui/react";
import { FaPlus, FaTrash } from "react-icons/fa";

const Index = () => {
  const [todos, setTodos] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const toast = useToast();

  const handleAddTodo = () => {
    if (input.trim() === "") {
      toast({
        title: "No content",
        description: "You can't add an empty todo.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTodos([...todos, input]);
    setInput("");
  };

  const handleDeleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleAddTodo();
    }
  };

  return (
    <Box maxW="md" mx="auto" mt="10">
      <Text fontSize="2xl" mb="4" textAlign="center">
        Todo List
      </Text>
      <Box display="flex" mb="4">
        <Input placeholder="Add new todo" value={input} onChange={handleInputChange} onKeyPress={handleKeyPress} />
        <IconButton colorScheme="blue" aria-label="Add todo" icon={<FaPlus />} onClick={handleAddTodo} ml="2" />
      </Box>
      <List spacing={3}>
        {todos.map((todo, index) => (
          <ListItem key={index} display="flex" justifyContent="space-between" alignItems="center">
            <Text>{todo}</Text>
            <IconButton colorScheme="red" aria-label="Delete todo" icon={<FaTrash />} onClick={() => handleDeleteTodo(index)} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Index;
