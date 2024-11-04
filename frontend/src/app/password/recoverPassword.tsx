import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { FaWhatsapp } from "react-icons/fa";

const PasswordRecoveryPage = () => {
  const [email, setEmail] = useState("");

  const handleWhatsAppLink = () => {
    // Substitui o e-mail de exemplo pelo e-mail digitado
    const whatsappMessage = `Oi, suporte! Eu esqueci minha senha, troca pra mim? Meu email é ${encodeURIComponent(email)}`;
    const whatsappLink = `https://wa.me/number?text=${whatsappMessage}`;

    // Abre o link em uma nova aba
    window.open(whatsappLink, "_blank");
  };

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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          <Flex justify="center" mt="1.5rem">
            <Button
              leftIcon={<FaWhatsapp />}
              colorScheme="green"
              fontFamily="'Higuen Elegant Serif', serif"
              onClick={handleWhatsAppLink}
              isDisabled={!email} // Desativa o botão se o e-mail estiver vazio
            >
              ENVIAR MENSAGEM PARA O SUPORTE
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default PasswordRecoveryPage;
