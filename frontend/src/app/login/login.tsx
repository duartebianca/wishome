import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Link,
  Text,
} from "@chakra-ui/react";
import NavBar from "../../shared/components/nav-bar"; // Supondo que você já tenha a NavBar importada
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const handleForgotPassword = () => {
    navigate("/password-recovery");
  };
  return (
    <Box
      backgroundImage="url('/background.png')"
      backgroundPosition="center"
      minHeight="100vh"
    >
      {/* NavBar */}
      <NavBar />

      {/* Conteúdo da Página */}
      <Flex
        justify="center"
        align="center"
        minHeight="calc(100vh - 80px)"
        padding="1rem"
      >
        <Box
          bg="white"
          p="2rem"
          borderRadius="lg"
          boxShadow="md"
          width={{ base: "90%", md: "400px" }}
        >
          <Text
            as="h2"
            fontSize="2xl"
            fontFamily="'Higuen Elegant Serif', serif"
            color="#6d1716"
            textAlign="center"
            mb="1.5rem"
          >
            Login
          </Text>

          <FormControl mb="1rem">
            <FormLabel
              color="#b16831"
              fontFamily="'Higuen Elegant Serif', serif"
            >
              e-mail
            </FormLabel>
            <Input
              type="email"
              borderColor="#b16831"
              focusBorderColor="#b16831"
            />
          </FormControl>

          <FormControl mb="1rem">
            <FormLabel
              color="#b16831"
              fontFamily="'Higuen Elegant Serif', serif"
            >
              senha
            </FormLabel>
            <Input
              type="password"
              borderColor="#b16831"
              focusBorderColor="#b16831"
            />
          </FormControl>

          <Flex justify="space-between" align="center" mt="1.5rem">
            <Button
              bg="#6d1716"
              color="white"
              fontFamily="'Higuen Elegant Serif', serif"
              _hover={{ bg: "#b16831" }}
            >
              Entrar
            </Button>
            <Link
              href="#"
              color="#6d1716"
              fontFamily="'Higuen Elegant Serif', serif"
              _hover={{ textDecoration: "underline" }}
              onClick={handleForgotPassword}
            >
              Esqueci a Senha
            </Link>
          </Flex>

          <Text
            mt="2rem"
            textAlign="center"
            color="#6d1716"
            fontFamily="'Lato', sans-serif"
          >
            Não tem conta?{" "}
            <Link href="/register" color="#b16831" fontWeight="bold">
              Cadastre-se
            </Link>
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default LoginPage;
