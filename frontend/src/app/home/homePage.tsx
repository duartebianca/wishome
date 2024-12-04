import { Box, Flex, Text, Image, Heading, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleCreateAccount = () => {
    navigate("/register"); // Redireciona para a página de criação de conta
  };

  return (
    <Box
      backgroundImage="url('/background.png')"
      backgroundSize="cover"
      backgroundPosition="center"
      minHeight="100vh"
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        alignItems="center"
        justifyContent="center"
        gap="6rem"
        padding="3rem"
      >
        {/* Imagem à esquerda */}
        <Image
          src="/house3d.png"
          alt="3D House"
          height={{ base: "auto", md: "380px" }}
          maxHeight="380px"
          width="100%"
          objectFit="contain"
        />

        {/* Texto à direita */}
        <Box textAlign={{ base: "center", md: "left" }} maxWidth="600px">
          <Heading
            fontFamily="'Higuen Elegant Serif', serif"
            color="#6d1716"
            fontSize={70}
            mb={5}
          >
            Boas-vindas!
          </Heading>
          <Text
            fontSize="xl"
            fontFamily="'LWSato', sans-serif"
            fontWeight={"bold"}
            marginBottom="1rem"
            color="#b16831"
          >
            Agradecemos o seu interesse em nos presentear! Para sua comodidade,
            vamos pedir que crie uma conta rapidinho! Só vamos precisar do seu
            nome, email e telefone ;)
          </Text>
          <Text
            fontSize="xl"
            fontFamily="'Lato', sans-serif"
            fontWeight={400}
            marginBottom="2rem"
            color="#b16831"
          >
            Você pode comprar na loja da sua preferência ou nos enviar um pix
            (no valor do presente ou da sua escolha).
            <br />
            Qualquer dúvida, só falar com a gente!
          </Text>

          {/* Assinaturas */}
          <Box
            display="flex"
            gap={6}
            justifyContent={{ base: "center", md: "flex-start" }}
            mb={4}
          >
            <Image src="duda.png" height={"40px"} width={"auto"} />
            <Image src="gustavo.png" height={"40px"} width={"auto"} />
          </Box>

          {/* Botão Criar Conta */}
          <Text
            fontSize="xl"
            fontFamily="'Higuen Elegant Serif', serif"
            color="#6d1716"
            textAlign={{ base: "center", md: "left" }}
            mb={2}
          >
            Agora, vamos começar!
          </Text>
          <Button
            mt="1rem"
            colorScheme="blue"
            size="lg"
            fontFamily="'Higuen Elegant Serif', serif"
            bg="#6d1716"
            color="white"
            _hover={{ bg: "#b16831" }}
            onClick={handleCreateAccount}
            display="block"
            mx={{ base: "auto", md: "0" }}
          >
            CRIAR CONTA
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default HomePage;
