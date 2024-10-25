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
} from "@chakra-ui/react";
import NavBar from "../../shared/components/nav-bar";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormInputs, LoginSchema } from "./forms/login-form";
const LoginPage = () => {
  const navigate = useNavigate();

  // Função para lidar com esqueci a senha
  const handleForgotPassword = () => {
    navigate("/password-recovery");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(LoginSchema),
  });

  // Função para tratar o envio do formulário
  const onSubmit = (data: LoginFormInputs) => {
    console.log("Dados enviados: ", data);
    // Lógica para fazer o login
  };

  return (
    <Box
      backgroundImage="url('/background.png')"
      backgroundPosition="center"
      minHeight="100vh"
    >
      <NavBar />

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

          {/* Formulário de Login */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Campo de E-mail */}
            <FormControl mb="1rem" isInvalid={!!errors.email}>
              <FormLabel
                color="#b16831"
                fontFamily="'Higuen Elegant Serif', serif"
              >
                e-mail
              </FormLabel>
              <Input
                type="email"
                {...register("email")} // Registra o campo de e-mail
                borderColor="#b16831"
                focusBorderColor="#b16831"
              />
              {/* Exibe a mensagem de erro para o e-mail */}
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>

            {/* Campo de Senha */}
            <FormControl mb="1rem" isInvalid={!!errors.password}>
              <FormLabel
                color="#b16831"
                fontFamily="'Higuen Elegant Serif', serif"
              >
                senha
              </FormLabel>
              <Input
                type="password"
                {...register("password")} // Registra o campo de senha
                borderColor="#b16831"
                focusBorderColor="#b16831"
              />
              {/* Exibe a mensagem de erro para a senha */}
              <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
            </FormControl>

            {/* Botões */}
            <Flex justify="space-between" align="center" mt="1.5rem">
              <Button
                type="submit" // Tipo de botão de envio
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
          </form>

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
