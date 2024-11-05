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
  InputGroup,
  InputRightElement,
  Text,
  SimpleGrid,
  List,
  ListItem,
  HStack,
  useToast,
} from "@chakra-ui/react";
import { RegisterFormInputs, RegisterSchema } from "./forms/register-form";
import { CheckCircleIcon, SmallCloseIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom"; // Importando o hook de navegação

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(RegisterSchema),
    mode: "onChange",
  });

  const [requirements, setRequirements] = useState({
    minLength: false,
    hasNumber: false,
    hasSpecialChar: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toast = useToast();
  const navigate = useNavigate(); // Hook de navegação
  const [isLoading, setIsLoading] = useState(false);


  // Atualiza os requisitos conforme a senha é digitada
  const updateRequirements = (password: string) => {
    setRequirements({
      minLength: password.length >= 6,
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  };

  const onSubmit = async (data: RegisterFormInputs) => {
    setIsLoading(true); // Ativa o carregamento
    try {
      const response = await fetch("http://localhost:5000/register", {
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
      setIsLoading(false); // Desativa o carregamento
    }
  };
  

  const renderRequirement = (isMet: boolean, label: string) => (
    <HStack>
      {isMet ? (
        <CheckCircleIcon color="green.500" />
      ) : (
        <SmallCloseIcon color="red.500" />
      )}
      <Text>{label}</Text>
    </HStack>
  );

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
            <SimpleGrid columns={2} spacing={4}>
              <FormControl isInvalid={!!errors.name} gridColumn="span 2">
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

              <FormControl isInvalid={!!errors.password}>
                <FormLabel
                  color="#b16831"
                  fontFamily="'Higuen Elegant Serif', serif"
                >
                  Senha
                </FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    borderColor="#b16831"
                    focusBorderColor="#b16831"
                    {...register("password")}
                    onChange={(e) => {
                      updateRequirements(e.target.value);
                    }}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={() => setShowPassword(!showPassword)}
                      variant="ghost"
                    >
                      {showPassword ?<ViewOffIcon color="#b16831"/> : <ViewIcon color="#b16831" />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {errors.password && (
                  <Text color="red.500">{errors.password.message}</Text>
                )}
              </FormControl>

              <FormControl isInvalid={!!errors.confirmPassword}>
                <FormLabel
                  color="#b16831"
                  fontFamily="'Higuen Elegant Serif', serif"
                >
                  Repetir senha
                </FormLabel>
                <InputGroup>
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    borderColor="#b16831"
                    focusBorderColor="#b16831"
                    {...register("confirmPassword")}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      variant="ghost"
                    >
                      {showConfirmPassword ? <ViewOffIcon color="#b16831"/> : <ViewIcon color="#b16831" />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {errors.confirmPassword && (
                  <Text color="red.500">{errors.confirmPassword.message}</Text>
                )}
              </FormControl>
            </SimpleGrid>

            <Flex mt="4" justify="space-between">
              {/* Requisitos de Senha */}
              <Box>
                <Text fontWeight="bold" color="#b16831">
                  A senha deve conter:
                </Text>
                <List spacing={2} mt="2">
                  <ListItem>
                    {renderRequirement(
                      requirements.minLength,
                      "Pelo menos 6 caracteres"
                    )}
                  </ListItem>
                  <ListItem>
                    {renderRequirement(
                      requirements.hasNumber,
                      "Pelo menos 1 número"
                    )}
                  </ListItem>
                  <ListItem>
                    {renderRequirement(
                      requirements.hasSpecialChar,
                      "Pelo menos 1 caractere especial"
                    )}
                  </ListItem>
                </List>
              </Box>

              {/* Texto e Botão */}
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
                  isLoading={isLoading} // Adiciona o carregamento
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