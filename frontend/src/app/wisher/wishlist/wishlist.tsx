import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  SimpleGrid,
  Tag,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../utils/apiRequests";

interface Product {
  id: number;
  title: string;
  status: string;
  gifter_name?: string | null; // Nome do gifter se o item estiver "comprado"
  gifter_id?: number | null; // ID do gifter se o item estiver "comprado"
}

const ListStatusPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [purchasedProducts, setPurchasedProducts] = useState<Product[]>([]);

  const handleBackToDashboard = () => {
    navigate("/wisher-dashboard");
  };

  // Função para buscar os dados do backend
  const fetchProductStatus = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${BASE_URL}/products`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Falha ao buscar o status dos produtos");
      }

      const data = await response.json();

      // Filtra os produtos de acordo com o status
      const purchasedItems = data.filter((item: Product) => item.status === "purchased"&& item.gifter_id);
      setProducts(data);
      try {
        const new_response = await fetch(`${BASE_URL}/gifters`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Falha ao buscar o status dos produtos");
        }
        const new_data = await new_response.json();
        purchasedItems.forEach((item) => {
          const gifter = new_data.find((gifter: any) => gifter.id === item.gifter_id);
          if (gifter) {
            item.gifter_name = gifter.name;
          }
        });
        setPurchasedProducts(purchasedItems);
        
      } catch (error) {
        console.error("Erro ao buscar os dados dos gifters:", error);
      }
    } catch (error) {
      console.error("Erro ao buscar o status dos produtos:", error);
    }
  };

  useEffect(() => {
    fetchProductStatus();
  }, []);

  return (
    <Box
      backgroundImage="url('/background.png')"
      backgroundSize="cover"
      backgroundPosition="center"
      minHeight="100vh"
    >
      <Flex direction="column" alignItems="center" justifyContent="center" padding="2rem">
        <Text fontSize="4xl" fontFamily="'Higuen Elegant Serif', serif" color="#6d1716" mb="1rem">
          Status da Lista
        </Text>

        <Text fontSize="lg" fontFamily="'Lato', sans-serif" color="#6d1716" mb="2rem">
          Veja quem já comprou os itens da sua lista!
          <br />
          Quando terminar, volte para o{" "}
          <Text as="span" color="black" fontWeight="bold" cursor="pointer" onClick={handleBackToDashboard}>
            painel do wisher.
          </Text>
        </Text>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} width="100%">
          {/* Tabela Geral */}
          <Box>
            <Text fontSize="2xl" fontFamily="'Higuen Elegant Serif', serif" color="#6d1716" mb="1rem">
              GERAL
            </Text>

            <Table variant="simple" size="md" bg="white" borderRadius="lg">
              <Thead>
                <Tr>
                  <Th textAlign="center" fontFamily="'Higuen Elegant Serif', serif" color="#6d1716">
                    Item
                  </Th>
                  <Th textAlign="center" fontFamily="'Higuen Elegant Serif', serif" color="#6d1716">
                    Status
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {products.map((product) => (
                  <Tr key={product.id}>
                    <Td textAlign="center">{product.title}</Td>
                    <Td textAlign="center">
                      <Tag colorScheme={product.status === "available" ? "green" : product.status === "thinking" ? "orange" : "red"}>
                        {product.status === "available"
                          ? "DISPONÍVEL"
                          : product.status === "thinking"
                          ? "PENSANDO"
                          : "COMPRADO"}
                      </Tag>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>

          {/* Tabela de Quem Comprou */}
          <Box>
            <Text fontSize="2xl" fontFamily="'Higuen Elegant Serif', serif" color="#6d1716" mb="1rem">
              QUEM COMPROU
            </Text>

            <Table variant="simple" size="md" bg="white" borderRadius="lg">
              <Thead>
                <Tr>
                  <Th textAlign="center" fontFamily="'Higuen Elegant Serif', serif" color="#6d1716">
                    Item
                  </Th>
                  <Th textAlign="center" fontFamily="'Higuen Elegant Serif', serif" color="#6d1716">
                    Nome
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {purchasedProducts.map((product) => (
                  <Tr key={product.id}>
                    <Td textAlign="center">{product.title}</Td>
                    <Td textAlign="center">{product.gifter_name || "Anônimo"}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </SimpleGrid>
      </Flex>
    </Box>
  );
};

export default ListStatusPage;
