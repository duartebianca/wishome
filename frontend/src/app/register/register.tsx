import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  SimpleGrid,
} from "@chakra-ui/react";
import NavBar from "../../shared/components/nav-bar"; // Supondo que você já tenha a NavBar importada

const SignUpPage = () => {
  return (
    <Box
      backgroundImage="url('/background.png')" // O mesmo background que você mencionou
      backgroundSize="cover"
      backgroundPosition="center"
      minHeight="100vh"
    >
      {/* NavBar */}
      <NavBar />

      {/* Conteúdo da Página */}
      <Flex
        justify="center"
        align="center"
        minHeight="calc(100vh - 80px)" // Calcula a altura, excluindo a navbar
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
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            <FormControl>
              <FormLabel
                color="#b16831"
                fontFamily="'Higuen Elegant Serif', serif"
              >
                nome
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
                senha
              </FormLabel>
              <Input
                type="password"
                borderColor="#b16831"
                focusBorderColor="#b16831"
              />
            </FormControl>

            <FormControl>
              <FormLabel
                color="#b16831"
                fontFamily="'Higuen Elegant Serif', serif"
              >
                email
              </FormLabel>
              <Input
                type="email"
                borderColor="#b16831"
                focusBorderColor="#b16831"
              />
            </FormControl>

            <FormControl>
              <FormLabel
                color="#b16831"
                fontFamily="'Higuen Elegant Serif', serif"
              >
                confirme a senha
              </FormLabel>
              <Input
                type="password"
                borderColor="#b16831"
                focusBorderColor="#b16831"
              />
            </FormControl>

            <FormControl>
              <FormLabel
                color="#b16831"
                fontFamily="'Higuen Elegant Serif', serif"
              >
                telefone
              </FormLabel>
              <Input
                type="tel"
                borderColor="#b16831"
                focusBorderColor="#b16831"
              />
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
              fontFamily="'Lato', sans-serif"
              _hover={{ bg: "#b16831" }}
            >
              CRIAR CONTA
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default SignUpPage;
