import { Box, Flex, Text, SimpleGrid, Tag, TagLabel } from "@chakra-ui/react";
import NavBar from "../../shared/components/nav-bar"; // Supondo que você já tenha a NavBar importada
import GiftCard from "./components/giftCard";

const GiftListPage = () => {
  // Lista de presentes (exemplo)
  const items = [
    {
      name: "Copo d'água",
      price: 199.0,
      image: "https://static.paodeacucar.com/img/uploads/1/798/19755798.png",
      qrCodeImage: "/qr-code-example.png", // Imagem do QR Code
      purchaseLink: "https://loja-exemplo.com/compre-item", // Link da loja
    },
    {
      name: "Livro Exemplo",
      price: 59.9,
      image:
        "https://dialogosviagenspedagogicas.com.br/wp-content/uploads/2023/06/image-507-1024x512.png",
      qrCodeImage: "/qr-code-book.png",
      purchaseLink: "https://loja-exemplo.com/livro",
    },
    {
      name: "Produto Exemplo 2",
      price: 499.0,
      image:
        "https://s2-techtudo.glbimg.com/BmK7QAm-GBwe7lPABA782aUjlFE=/0x0:1920x1080/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2024/W/O/oDtPWgRfG5r9A2rdaYWA/fogao-cooktop-5-bocas.jpg",
      qrCodeImage: "/qr-code-product.png",
      purchaseLink: "https://loja-exemplo.com/produto-2",
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
