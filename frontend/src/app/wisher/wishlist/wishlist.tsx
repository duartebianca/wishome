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

const ListStatusPage = () => {
  const navigate = useNavigate();

  const handleBackToDashboard = () => {
    navigate("/wisher-dashboard");
  };

  return (
    <Box
      backgroundImage="url('/background.png')"
      backgroundSize="cover"
      backgroundPosition="center"
      minHeight="100vh"
    >
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
          mb="1rem"
        >
          Status da Lista
        </Text>

        {/* Subtítulo */}
        <Text
          fontSize="lg"
          fontFamily="'Lato', sans-serif"
          color="#6d1716"
          mb="2rem"
        >
          Veja quem já comprou e quem está indeciso com os itens da sua lista!
          <br />
          Quando terminar, volte para o{" "}
          <Text
            as="span"
            color="black"
            fontWeight="bold"
            cursor="pointer"
            onClick={handleBackToDashboard}
          >
            painel do wisher.
          </Text>
        </Text>

        {/* Tabelas */}
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} width="100%">
          {/* Tabela Geral */}
          <Box>
            <Text
              fontSize="2xl"
              fontFamily="'Higuen Elegant Serif', serif"
              color="#6d1716"
              mb="1rem"
            >
              GERAL
            </Text>

            <Table variant="simple" size="md" bg="white" borderRadius="lg">
              <Thead>
                <Tr>
                  <Th
                    textAlign="center"
                    fontFamily="'Higuen Elegant Serif', serif"
                    color="#6d1716"
                  >
                    Item
                  </Th>
                  <Th
                    textAlign="center"
                    fontFamily="'Higuen Elegant Serif', serif"
                    color="#6d1716"
                  >
                    Status
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {/* Exemplo de linha */}
                <Tr>
                  <Td textAlign="center">NOME DO ITEM</Td>
                  <Td textAlign="center">
                    <Tag colorScheme="green">DISPONÍVEL</Tag>
                  </Td>
                </Tr>
                <Tr>
                  <Td textAlign="center">NOME DO ITEM</Td>
                  <Td textAlign="center">
                    <Tag colorScheme="red">COMPRADO</Tag>
                  </Td>
                </Tr>
                <Tr>
                  <Td textAlign="center">NOME DO ITEM</Td>
                  <Td textAlign="center">
                    <Tag colorScheme="red">COMPRADO</Tag>
                  </Td>
                </Tr>
                <Tr>
                  <Td textAlign="center">NOME DO ITEM</Td>
                  <Td textAlign="center">
                    <Tag colorScheme="green">DISPONÍVEL</Tag>
                  </Td>
                </Tr>
                {/* Adicione mais linhas conforme necessário */}
              </Tbody>
            </Table>
          </Box>

          {/* Tabela de Quem Comprou */}
          <Box>
            <Text
              fontSize="2xl"
              fontFamily="'Higuen Elegant Serif', serif"
              color="#6d1716"
              mb="1rem"
            >
              QUEM COMPROU
            </Text>

            <Table variant="simple" size="md" bg="white" borderRadius="lg">
              <Thead>
                <Tr>
                  <Th
                    textAlign="center"
                    fontFamily="'Higuen Elegant Serif', serif"
                    color="#6d1716"
                  >
                    Item
                  </Th>
                  <Th
                    textAlign="center"
                    fontFamily="'Higuen Elegant Serif', serif"
                    color="#6d1716"
                  >
                    Nome
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {/* Exemplo de linha */}
                <Tr>
                  <Td textAlign="center">NOME DO ITEM</Td>
                  <Td textAlign="center">MARIA SILVA</Td>
                </Tr>
                <Tr>
                  <Td textAlign="center">NOME DO ITEM</Td>
                  <Td textAlign="center">MARIA SILVA</Td>
                </Tr>
                <Tr>
                  <Td textAlign="center">NOME DO ITEM</Td>
                  <Td textAlign="center">MARIA SILVA</Td>
                </Tr>
                {/* Adicione mais linhas conforme necessário */}
              </Tbody>
            </Table>
          </Box>
        </SimpleGrid>
      </Flex>
    </Box>
  );
};

export default ListStatusPage;
