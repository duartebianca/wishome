import React from "react";
import { Box, Button, Flex, Text, Image, SimpleGrid } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../../shared/components/nav-bar";
const WisherDashboard = () => {
  const navigate = useNavigate();

  const handleAddProduct = () => {
    navigate("/wisher-new-product");
  };

  const handleValidateUsers = () => {
    navigate("/wisher-confirm-users");
  };

  const handleViewWishlistStatus = () => {
    navigate("/wisher-wishlist-status");
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
      {/* Saudação */}
      <Text
        fontSize="6xl"
        fontFamily="'Higuen Elegant Serif', serif"
        color="#6d1716"
        mb="2rem"
        ml={10}
        mr={10}
      >
        Olá, Wisher!
      </Text>

      {/* Conteúdo da Página */}
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        padding="2rem"
      >
        {/* Grid com Cards */}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing="2rem" width="100%">
          {/* Card Adicionar Produtos */}
          <Box
            bg="white"
            borderRadius="lg"
            boxShadow="md"
            textAlign="center"
            padding="2rem"
            width={{ base: "100%", md: "300px" }}
          >
            <Image
              src="https://i.imgur.com/WSri4wI.png"
              alt="Adicionar novos produtos"
              boxSize="120px"
              mx="auto"
              mb="1rem"
            />
            <Text
              fontSize="xl"
              fontFamily="'Higuen Elegant Serif', serif"
              color="#6d1716"
              mb="1rem"
            >
              Adicionar novos produtos
            </Text>
            <Button
              bg="#6d1716"
              color="white"
              fontFamily="'Higuen Elegant Serif', serif"
              _hover={{ bg: "#b16831" }}
              onClick={handleAddProduct}
            >
              ADICIONAR
            </Button>
          </Box>

          {/* Card Validar Usuários */}
          <Box
            bg="white"
            borderRadius="lg"
            boxShadow="md"
            textAlign="center"
            padding="2rem"
            width={{ base: "100%", md: "300px" }}
          >
            <Image
              src="https://i.imgur.com/I7e6SdA.png"
              alt="Validar usuários"
              boxSize="120px"
              mx="auto"
              mb="1rem"
            />
            <Text
              fontSize="xl"
              fontFamily="'Higuen Elegant Serif', serif"
              color="#6d1716"
              mb="1rem"
            >
              Validar Usuários
            </Text>
            <Button
              bg="#6d1716"
              color="white"
              fontFamily="'Higuen Elegant Serif', serif"
              _hover={{ bg: "#b16831" }}
              onClick={handleValidateUsers}
            >
              VALIDAR
            </Button>
          </Box>

          {/* Card Status da Lista */}
          <Box
            bg="white"
            borderRadius="lg"
            boxShadow="md"
            textAlign="center"
            padding="2rem"
            width={{ base: "100%", md: "300px" }}
          >
            <Image
              src="https://i.imgur.com/zK3gldR.png"
              alt="Status da lista"
              boxSize="120px"
              mx="auto"
              mb="1rem"
            />
            <Text
              fontSize="xl"
              fontFamily="'Higuen Elegant Serif', serif"
              color="#6d1716"
              mb="1rem"
            >
              Status da Lista
            </Text>
            <Button
              bg="#6d1716"
              color="white"
              fontFamily="'Higuen Elegant Serif', serif"
              _hover={{ bg: "#b16831" }}
              onClick={handleViewWishlistStatus}
            >
              VISUALIZAR
            </Button>
          </Box>
        </SimpleGrid>
      </Flex>
    </Box>
  );
};

export default WisherDashboard;
