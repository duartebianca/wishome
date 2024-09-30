import React from "react";
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
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../../shared/components/nav-bar";

const AddProductPage = () => {
  const navigate = useNavigate();

  const handleBackToDashboard = () => {
    navigate("/wisher-dashboard");
  };

  return (
    <Box
      backgroundImage="url('/background.png')"
      backgroundSize="cover"
      backgroundPosition="center"
      minHeight="100vh"
    >
      {/* NavBar */}
      <NavBar />

      {/* Conteúdo da Página */}
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        padding="2rem"
      >
        {/* Título */}
        <Text
          fontSize="4xl"
          fontFamily="'Higuen Elegant Serif', serif"
          color="#6d1716"
          mb="1rem"
        >
          Adicionar novos produtos
        </Text>

        {/* Subtítulo com link para o painel */}
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

        {/* Formulário de Adicionar Produto */}
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
              />
            </FormControl>

            <FormControl>
              <FormLabel
                color="#b16831"
                fontFamily="'Higuen Elegant Serif', serif"
              >
                Preço (com o frete)
              </FormLabel>
              <Input
                type="text"
                borderColor="#b16831"
                focusBorderColor="#b16831"
              />
            </FormControl>
          </SimpleGrid>

          {/* Botão Salvar */}
          <Flex justify="flex-end" mt="1.5rem">
            <Button
              bg="#6d1716"
              color="white"
              fontFamily="'Higuen Elegant Serif', serif"
              _hover={{ bg: "#b16831" }}
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
