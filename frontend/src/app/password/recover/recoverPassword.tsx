import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";

const PasswordRecoveryPage = () => {
  return (
    <Box
      backgroundImage="url('/background.png')" // O mesmo background que você mencionou
      backgroundSize="cover"
      backgroundPosition="center"
      minHeight="100vh"
    >

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
          width={{ base: "90%", md: "500px" }}
        >
          <Text
            as="h2"
            fontSize="2xl"
            fontFamily="'Higuen Elegant Serif', serif"
            color="#6d1716"
            textAlign="center"
            mb="1.5rem"
          >
            Recuperação de Senha
          </Text>

          {/* Formulário */}
          <FormControl mb="1.5rem">
            <FormLabel
              color="#b16831"
              fontFamily="'Higuen Elegant Serif', serif"
            >
              Digite o e-mail cadastrado
            </FormLabel>
            <Input
              type="email"
              borderColor="#b16831"
              focusBorderColor="#b16831"
            />
          </FormControl>

          <Flex justify="center" mt="1.5rem">
            <Button
              bg="#6d1716"
              color="white"
              fontFamily="'Higuen Elegant Serif', serif"
              _hover={{ bg: "#b16831" }}
            >
              ENVIAR
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default PasswordRecoveryPage;
