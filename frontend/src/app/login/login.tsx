import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Link,
  Text,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormInputs, LoginSchema } from "./forms/login-form";

interface LoginPageProps {
  setIsAuthenticated: (value: boolean) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(LoginSchema),
  });

  // Função para tratar o envio do formulário
  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao fazer login");
      }

      const result = await response.json();
      localStorage.setItem("token", result.token); // Armazena o token JWT no localStorage
      localStorage.setItem("role", result.role);
      setIsAuthenticated(true); // Atualiza o estado de autenticação

      // Exibe Toast de sucesso
      toast({
        title: "Login realizado com sucesso!",
        description: "Você será redirecionado.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // Redireciona com base no papel do usuário
      if (result.role === "wisher") {
        navigate("/wisher-dashboard"); // Redireciona para o painel de Wishers
      } else {
        navigate("/list"); // Redireciona para a lista para usuários Gifter
      }
    } catch (error: any) {
      console.error(error);

      // Exibe Toast de erro
      toast({
        title: "Erro ao fazer login",
        description: error.message || "Tente novamente.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      backgroundImage="url('/background.png')"
      backgroundPosition="center"
      minHeight="100vh"
    >
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

          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl mb="1rem" isInvalid={!!errors.email}>
              <FormLabel color="#b16831" fontFamily="'Higuen Elegant Serif', serif">
                e-mail
              </FormLabel>
              <Input
                type="email"
                {...register("email")}
                borderColor="#b16831"
                focusBorderColor="#b16831"
              />
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>

            <FormControl mb="1rem" isInvalid={!!errors.password}>
              <FormLabel color="#b16831" fontFamily="'Higuen Elegant Serif', serif">
                senha
              </FormLabel>
              <Input
                type="password"
                {...register("password")}
                borderColor="#b16831"
                focusBorderColor="#b16831"
              />
              <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
            </FormControl>

            <Flex justify="space-between" align="center" mt="1.5rem">
              <Button
                type="submit"
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
                fontFamily="'Lato', sans-serif"
                _hover={{ textDecoration: "underline" }}
              >
                Esqueci a Senha
              </Link>
            </Flex>
          </form>

          <Text mt="2rem" textAlign="center" color="#6d1716" fontFamily="'Lato', sans-serif">
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
