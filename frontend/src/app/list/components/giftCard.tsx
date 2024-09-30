import {
  Box,
  Flex,
  Text,
  Image,
  Tag,
  TagLabel,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";

interface Item {
  image: string;
  name: string;
  price: number;
  purchaseLink: string;
  qrCodeImage: string;
}

const GiftCard = ({ item }: { item: Item }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      bg="white"
      borderRadius="lg"
      boxShadow="md"
      p="1.5rem"
      textAlign="center"
      width={{ base: "90%", md: "auto" }}
      maxWidth="300px"
    >
      {/* Imagem do Presente */}
      <Image
        src={item.image}
        alt={item.name}
        borderRadius="lg"
        mb="1rem"
        height="200px"
        objectFit="cover"
      />

      {/* Nome do Item */}
      <Text
        fontFamily="'Higuen Elegant Serif', serif"
        fontSize="xl"
        color="#6d1716"
        mb="0.5rem"
      >
        {item.name}
      </Text>

      {/* Preço do Item */}
      <Text
        fontFamily="'Higuen Elegant Serif', serif"
        fontSize="2xl"
        color="#b16831"
        mb="0.5rem"
      >
        R$ {item.price}
      </Text>

      {/* Status do Item */}
      <Flex align="center" justify="center" mb="1rem">
        <Tag size="lg" colorScheme="green" borderRadius="full">
          <Box
            as="span"
            bg="green.500"
            borderRadius="full"
            width="10px"
            height="10px"
            mr="0.5rem"
          ></Box>
          <TagLabel fontFamily="'Lato', sans-serif">DISPONÍVEL</TagLabel>
        </Tag>
      </Flex>

      {/* Botões (Imagens) */}
      <Flex justify="space-around" mt="1rem">
        {/* Botão Chave PIX que abre um Modal */}
        <Button variant="ghost" onClick={onOpen}>
          <Image
            src="/pix-button.png"
            alt="Chave PIX"
            width="300px"
            cursor="pointer"
          />
        </Button>

        {/* Redirecionamento para página de compra */}
        <Button
          as="a"
          href={item.purchaseLink}
          target="_blank"
          rel="noopener noreferrer"
          variant="ghost"
        >
          <Image
            src="/buy-button.png"
            alt="Compre na Loja"
            width="500px"
            cursor="pointer"
          />
        </Button>
      </Flex>

      {/* Modal para exibir o QR Code */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Chave PIX</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image src={item.qrCodeImage} alt="QR Code" width="100%" />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default GiftCard;
