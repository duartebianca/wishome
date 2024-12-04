import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Link,
  Text,
  SimpleGrid,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../utils/apiRequests";

const AddProductPage = () => {
  const navigate = useNavigate();
  const toast = useToast();

  // Estados para os valores dos campos do formulário
  const [title, setTitle] = useState("");
  const [productLink, setProductLink] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [price, setPrice] = useState("");

  const handleBackToDashboard = () => {
    navigate("/wisher-dashboard");
  };

  // Função para enviar o produto ao backend
  const handleSaveProduct = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast({
        title: "Erro",
        description: "Usuário não autenticado",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    // Envia os dados para o backend
    try {
      const response = await fetch(`${BASE_URL}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          product_link: productLink,
          image_link: imageLink,
          price,
        }),
      });

      if (response.ok) {
        toast({
          title: "Produto adicionado",
          description: "O produto foi adicionado com sucesso.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      
        // Limpa os campos do formulário
        setTitle("");
        setProductLink("");
        setImageLink("");
        setPrice("");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao adicionar produto");
      }
      
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Erro ao adicionar produto",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      backgroundImage="url('/background.png')"
      backgroundSize="cover"
      backgroundPosition="center"
      minHeight="100vh"
    >
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        padding="2rem"
      >
        <Text
          fontSize="4xl"
          fontFamily="'Higuen Elegant Serif', serif"
          color="#6d1716"
          mb="1rem"
        >
          Adicionar novos produtos
        </Text>

        <Text
          fontSize="lg"
          fontFamily="'Lato', sans-serif"
          color="#6d1716"
          mb="2rem"
        >
          Quando terminar, volte para o{" "}
          <Link color="black" fontWeight="bold" onClick={handleBackToDashboard}>
            painel do wisher
          </Link>
          .
        </Text>

        <Box
          bg="white"
          borderRadius="lg"
          boxShadow="md"
          padding="2rem"
          width={{ base: "100%", md: "600px" }}
        >
          <SimpleGrid columns={2} spacing={4}>
            <FormControl>
              <FormLabel
                color="#b16831"
                fontFamily="'Higuen Elegant Serif', serif"
              >
                Título
              </FormLabel>
              <Input
                type="text"
                borderColor="#b16831"
                focusBorderColor="#b16831"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel
                color="#b16831"
                fontFamily="'Higuen Elegant Serif', serif"
              >
                Link do Produto
              </FormLabel>
              <Input
                type="url"
                borderColor="#b16831"
                focusBorderColor="#b16831"
                value={productLink}
                onChange={(e) => setProductLink(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel
                color="#b16831"
                fontFamily="'Higuen Elegant Serif', serif"
              >
                Link da Imagem
              </FormLabel>
              <Input
                type="url"
                borderColor="#b16831"
                focusBorderColor="#b16831"
                value={imageLink}
                onChange={(e) => setImageLink(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel
                color="#b16831"
                fontFamily="'Higuen Elegant Serif', serif"
              >
                Preço
              </FormLabel>
              <Input
                type="text"
                borderColor="#b16831"
                focusBorderColor="#b16831"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </FormControl>
          </SimpleGrid>

          <Flex justify="flex-end" mt="1.5rem">
            <Button
              bg="#6d1716"
              color="white"
              fontFamily="'Higuen Elegant Serif', serif"
              _hover={{ bg: "#b16831" }}
              onClick={handleSaveProduct} // Chama a função para salvar o produto
            >
              SALVAR
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default AddProductPage;
