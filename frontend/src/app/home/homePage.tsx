import { Box, Flex, Text, Image, Heading } from "@chakra-ui/react";

const HomePage = () => {
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
          height={"380px"}
          width={"auto"}
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
            nome, email, telefone e que você escolha uma senha ;)
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
          <Box
            display="flex"
            gap={6}
            justifyContent={{ base: "center", md: "flex-start" }}
          >
            <Image src="duda.png" height={20} width={"auto"} />
            <Image src="gustavo.png" height={20} width={"auto"} />
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default HomePage;
