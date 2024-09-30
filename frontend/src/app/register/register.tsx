import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  SimpleGrid,
  List,
  ListItem,
} from "@chakra-ui/react";
import NavBar from "../../shared/components/nav-bar";
import { RegisterFormInputs, RegisterSchema } from "./forms/register-form";

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(RegisterSchema),
    mode: "onChange", // Validações ocorrerão conforme o campo muda
  });

  const password = watch("password", "");

  const [requirements, setRequirements] = useState({
    minLength: false,
    hasNumber: false,
    hasSpecialChar: false,
  });

  // Atualiza os requisitos conforme a senha é digitada
  const updateRequirements = (password: string) => {
    setRequirements({
      minLength: password.length >= 6,
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  };

  const handleFieldChange = async (field: keyof RegisterFormInputs) => {
    await trigger(field); // Dispara a validação do campo específico
  };

  const onSubmit = (data: RegisterFormInputs) => {
    console.log(data);
    // Lógica de envio do formulário aqui
  };

  return (
    <Box
      backgroundImage="url('/background.png')"
      backgroundSize="cover"
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
          width={{ base: "90%", md: "600px" }}
        >
          <Text
            as="h2"
            fontSize="2xl"
            fontFamily="'Higuen Elegant Serif', serif"
            color="#6d1716"
            textAlign="center"
            mb="1.5rem"
          >
            Criar Conta
          </Text>

          {/* Formulário */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              <FormControl isInvalid={!!errors.name}>
                <FormLabel
                  color="#b16831"
                  fontFamily="'Higuen Elegant Serif', serif"
                >
                  Nome
                </FormLabel>
                <Input
                  type="text"
                  borderColor="#b16831"
                  focusBorderColor="#b16831"
                  {...register("name")}
                  onChange={() => handleFieldChange("name")}
                />
                {errors.name && (
                  <Text color="red.500">{errors.name.message}</Text>
                )}
              </FormControl>

              <FormControl isInvalid={!!errors.email}>
                <FormLabel
                  color="#b16831"
                  fontFamily="'Higuen Elegant Serif', serif"
                >
                  Email
                </FormLabel>
                <Input
                  type="email"
                  borderColor="#b16831"
                  focusBorderColor="#b16831"
                  {...register("email")}
                  onChange={() => handleFieldChange("email")}
                />
                {errors.email && (
                  <Text color="red.500">{errors.email.message}</Text>
                )}
              </FormControl>

              <FormControl isInvalid={!!errors.password}>
                <FormLabel
                  color="#b16831"
                  fontFamily="'Higuen Elegant Serif', serif"
                >
                  Senha
                </FormLabel>
                <Input
                  type="password"
                  borderColor="#b16831"
                  focusBorderColor="#b16831"
                  {...register("password")}
                  onChange={(e) => {
                    updateRequirements(e.target.value);
                    handleFieldChange("password");
                  }} // Monitora mudanças
                />
                {errors.password && (
                  <Text color="red.500">{errors.password.message}</Text>
                )}
                {/* Requisitos de Senha */}
                <Box mt="2">
                  <Text fontWeight="bold">A senha deve conter:</Text>
                  <List spacing={2} mt="2">
                    <ListItem
                      color={requirements.minLength ? "green.500" : "red.500"}
                    >
                      Pelo menos 6 caracteres
                    </ListItem>
                    <ListItem
                      color={requirements.hasNumber ? "green.500" : "red.500"}
                    >
                      Pelo menos 1 número
                    </ListItem>
                    <ListItem
                      color={
                        requirements.hasSpecialChar ? "green.500" : "red.500"
                      }
                    >
                      Pelo menos 1 caractere especial
                    </ListItem>
                  </List>
                </Box>
              </FormControl>

              <FormControl isInvalid={!!errors.confirmPassword}>
                <FormLabel
                  color="#b16831"
                  fontFamily="'Higuen Elegant Serif', serif"
                >
                  Confirme a Senha
                </FormLabel>
                <Input
                  type="password"
                  borderColor="#b16831"
                  focusBorderColor="#b16831"
                  {...register("confirmPassword")}
                  onChange={() => handleFieldChange("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <Text color="red.500">{errors.confirmPassword.message}</Text>
                )}
              </FormControl>

              <FormControl isInvalid={!!errors.phone}>
                <FormLabel
                  color="#b16831"
                  fontFamily="'Higuen Elegant Serif', serif"
                >
                  Telefone
                </FormLabel>
                <Input
                  type="tel"
                  borderColor="#b16831"
                  focusBorderColor="#b16831"
                  {...register("phone")}
                  onChange={() => handleFieldChange("phone")}
                />
                {errors.phone && (
                  <Text color="red.500">{errors.phone.message}</Text>
                )}
              </FormControl>
            </SimpleGrid>

            <Text
              mt="1.5rem"
              color="#6d1716"
              fontFamily="'Lato', sans-serif"
              textAlign="center"
            >
              Prontinho! Só criar &lt;3
            </Text>

            <Flex justify="center" mt="1.5rem">
              <Button
                bg="#6d1716"
                color="white"
                _hover={{ bg: "#b16831" }}
                type="submit"
                fontFamily="'Higuen Elegant Serif', serif"
              >
                CRIAR CONTA
              </Button>
            </Flex>
          </form>
        </Box>
      </Flex>
    </Box>
  );
};

export default SignUpPage;
