import { useEffect, useState } from "react";
import { Box, Flex, Text, SimpleGrid, Tag, TagLabel } from "@chakra-ui/react";
import GiftCard from "./components/giftCard";

interface GiftItem {
  id?: number;
  title: string;
  price: string | number;
  image: string;
  qrCodeImage: string;
  product_link?: string;
  status?: string;
  gifter_id?: number;
}

const GiftListPage = () => {
  const [items, setItems] = useState<GiftItem[]>([]);

  useEffect(() => {
    const fetchGiftItems = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:5000/products", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Falha ao buscar a lista de presentes");
        }

        const data = await response.json();

        const fixedPixItem: GiftItem = {
          title: "Chave Pix",
          price: "Valor Livre",
          image: "https://psverso.com.br/wp-content/uploads/2022/09/simbolo-pix-nick-bio-free-fire.webp",
          qrCodeImage: "/qrcode.png",
        };

        const itemsWithQrCode = data.map((item: any) => ({
          ...item,
          image: item.image_link || "",
          qrCodeImage: "/qrcode.png",
        }));

        setItems([fixedPixItem, ...itemsWithQrCode]);
      } catch (error) {
        console.error("Erro ao buscar a lista de presentes:", error);
      }
    };

    fetchGiftItems();
  }, []);

  return (
    <Box
      backgroundImage="url('/background.png')"
      backgroundSize="cover"
      backgroundPosition="center"
      minHeight="100vh"
    >
      <Flex direction="column" alignItems="center" justifyContent="center" padding="2rem">
        <Text fontSize="4xl" fontFamily="'Higuen Elegant Serif', serif" color="#6d1716" mb="2rem">
          Lista de Presentes
        </Text>
        <Flex mb="2rem" gap={4}>
          <Tag size="lg" colorScheme="green"><TagLabel>DISPONÍVEL</TagLabel></Tag>
          <Tag size="lg" colorScheme="orange"><TagLabel>PENSANDO</TagLabel></Tag>
          <Tag size="lg" colorScheme="red"><TagLabel>COMPRADO</TagLabel></Tag>
        </Flex>
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
