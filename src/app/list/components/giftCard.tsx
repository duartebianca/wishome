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
  useToast,
} from "@chakra-ui/react";
import {LinkIcon} from "@chakra-ui/icons";
import { MdPix } from "react-icons/md";

interface Item {
  image: string;
  name: string;
  price: number;
  purchaseLink: string;
  qrCodeImage: string;
}

const GiftCard = ({ item }: { item: Item }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const chavePix = "81995115978";
  
  const handleCopy = () => {
      navigator.clipboard.writeText(chavePix);
      toast({
        title: "Chave PIX copiada.",
        description: "A chave PIX foi copiada para a área de transferência.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
  };
  

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

      
    {/* Botões (com Símbolos e Texto) */}
    <Flex justify="space-around" mt="1rem" gap="0.3rem">
      {/* Botão Chave PIX que abre um Modal */}
      <Button
        variant="ghost"
        bg="#6d1716"
        height="30px"
        width="auto"
        color="white"
        fontFamily="'Higuen Elegant Serif', serif"
        _hover={{ bg: "#b16831" }}
        onClick={onOpen}
        leftIcon={<MdPix />}
        >
        PIX
      </Button>

      {/* Redirecionamento para página de compra */}
      <Button
        as="a"
        href={item.purchaseLink}
        target="_blank"
        _hover={{ bg: "#b16831" }}
        rel="noopener noreferrer"
        variant="ghost"
        bg="#6d1716"
        color="white"
        fontFamily="'Higuen Elegant Serif', serif"
        leftIcon={<LinkIcon />} // Ícone de link
        height="30px"
        width="auto"
      >
        Compre na Loja
      </Button>
    </Flex>

      {/* Modal para exibir o QR Code */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Chave PIX</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text> Você pode escanear o QR Code ou utilizar a chave pix 81995115978. </Text>
            {/* Botão de copiar a chave PIX */}
            <Button mt={4} colorScheme="blue" onClick={handleCopy}>
              Copiar a chave PIX
            </Button>
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
