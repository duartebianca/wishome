import { Box, Flex, Text, SimpleGrid, Tag, TagLabel } from "@chakra-ui/react";
import NavBar from "../../shared/components/nav-bar"; // Supondo que você já tenha a NavBar importada
import GiftCard from "./components/giftCard";

const GiftListPage = () => {
  // Lista de presentes (exemplo)
  const items = [
    {
      name: "Chave Pix",
      price: "Valor Livre",
      image: "https://psverso.com.br/wp-content/uploads/2022/09/simbolo-pix-nick-bio-free-fire.webp",
      qrCodeImage: "/qrcode.png", // Imagem do QR Code
    },
    {
      name: "Kit de 6 copos",
      price: 27.54,
      image: "https://static.paodeacucar.com/img/uploads/1/798/19755798.png",
      qrCodeImage: "/qrcode.png", // Imagem do QR Code
      purchaseLink: "https://www.lebiscuit.com.br/jg-copo-nadir-oca-c-6-300ml-7729-5083647/p?idsku=1950371492&utm_source=google&utm_medium=cpc&utm_campaign=GOOGLE-PMAX_GERAL_NORDESTE_CONV&utm_content=NA_&utm_term=GERAL&utm_source_platform=&utm_creative_format=NA&utm_marketing_tatic=NA&gad_source=4&gclid=Cj0KCQjwyL24BhCtARIsALo0fSAhNEX1bfGStyw8j_g10aOcOPqf0VSjGDea9CYjuBPulWPQVknRMjQaApEmEALw_wcB", // Link da loja
    },
  ];

  return (
    <Box
      backgroundImage="url('/background.png')"
      backgroundSize="cover"
      backgroundPosition="center"
      minHeight="100vh"
    >
      {/* NavBar */}
      <NavBar />

      {/* Conteúdo da Página */}
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        padding="2rem"
      >
        {/* Título */}
        <Text
          fontSize="4xl"
          fontFamily="'Higuen Elegant Serif', serif"
          color="#6d1716"
          mb="2rem"
        >
          Lista de Presentes
        </Text>

        {/* Legenda de Status */}
        <Flex mb="2rem" gap={4}>
          <Tag size="lg" colorScheme="green">
            <TagLabel>DISPONÍVEL</TagLabel>
          </Tag>
          <Tag size="lg" colorScheme="orange">
            <TagLabel>PENSANDO</TagLabel>
          </Tag>
          <Tag size="lg" colorScheme="red">
            <TagLabel>COMPRADO</TagLabel>
          </Tag>
        </Flex>

        {/* Cards em Grid */}
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing="1.5rem" width="100%">
          {items.map((item, index) => (
            <GiftCard key={index} item={item} />
          ))}
        </SimpleGrid>
      </Flex>
    </Box>
  );
};

export default GiftListPage;
