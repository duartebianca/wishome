import { useState } from "react";
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
  useToast,
} from "@chakra-ui/react";
import { RegisterFormInputs, RegisterSchema } from "./forms/register-form";
import { useNavigate } from "react-router-dom"; // Importando o hook de navegação
import { BASE_URL } from "../../utils/apiRequests";

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(RegisterSchema),
    mode: "onChange",
  });

  const toast = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: RegisterFormInputs) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao criar conta");
      }
  
      const result = await response.json();
      console.log(result);
  
      toast({
        title: "Conta criada com sucesso!",
        description: "Você já pode fazer login.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
  
      navigate("/login");
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Erro ao criar conta",
        description: error.message || "Tente novamente.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
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
          maxWidth="800px"
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
          <SimpleGrid columns={1} spacing={4}>
          <FormControl isInvalid={!!errors.name}>
            <FormLabel
              color="#b16831"
              fontFamily="'Higuen Elegant Serif', serif"
            >
              Nome e sobrenome
            </FormLabel>
            <Input
              type="text"
              borderColor="#b16831"
              focusBorderColor="#b16831"
              {...register("name")}
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
            />
            {errors.email && (
              <Text color="red.500">{errors.email.message}</Text>
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
            />
            {errors.phone && (
              <Text color="red.500">{errors.phone.message}</Text>
            )}
          </FormControl>
        </SimpleGrid>



            <Flex mt="4" justify="center">
              <Box textAlign="center">
                <Text
                  mt="1.5rem"
                  color="#6d1716"
                  fontFamily="'Lato', sans-serif"
                >
                  Prontinho! Só criar &lt;3
                </Text>
                <Button
                  mt="4"
                  bg="#6d1716"
                  color="white"
                  fontFamily="'Higuen Elegant Serif', serif"
                  _hover={{ bg: "#b16831" }}
                  type="submit"
                  isLoading={isLoading}
                  loadingText="Criando..."
                >
                  CRIAR CONTA
                </Button>
              </Box>
            </Flex>
          </form>
        </Box>
      </Flex>
    </Box>
  );
};

export default SignUpPage;