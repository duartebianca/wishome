import {
  Box,
  Flex,
  Text,
  Image,
  Tag,
  TagLabel,
  Button,
  IconButton,
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
import { LinkIcon } from "@chakra-ui/icons";
import { MdPix, MdDeleteForever } from "react-icons/md";
import { HiPencilAlt } from "react-icons/hi";

interface Item {
  id?: number;
  title: string;
  price: string | number;
  image: string;
  qrCodeImage: string;
  product_link?: string;
  status?: string;
}

interface GiftCardProps {
  item: Item;
  role: string | null;
  onDelete: (id: number) => void;
  onEdit: (item: Item) => void;
}

const GiftCard = ({ item, role, onDelete, onEdit }: GiftCardProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const chavePix = "81995115978";
  
  const handleCopy = () => {
    navigator.clipboard.writeText(chavePix);
    toast({
      title: "Chave PIX copiada.",
      description: "Você pode colar a chave PIX no aplicativo de sua preferência.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleDelete = () => {
    if (item.id) onDelete(item.id);
  };

  const handleEdit = () => {
    onEdit(item);
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
      position="relative"
    >
      {/* Condicional para mostrar ícones de edição/exclusão somente para o wisher e excluir o card de Pix */}
      {role === "wisher" && item.title !== "Chave Pix" && (
        <Flex position="absolute" top="1rem" right="1rem" gap="0.5rem">
          <IconButton
            aria-label="Editar"
            icon={<HiPencilAlt />}
            size="sm"
            onClick={handleEdit}
            variant="ghost"
            colorScheme="blue"
          />
          <IconButton
            aria-label="Deletar"
            icon={<MdDeleteForever />}
            size="sm"
            onClick={handleDelete}
            variant="ghost"
            colorScheme="red"
          />
        </Flex>
      )}

      {/* Imagem do Presente */}
      <Image
        src={item.image}
        alt={item.title}
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
        {item.title}
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

        {/* Condicional: Redirecionamento para página de compra apenas se purchaseLink estiver setado */}
        {item.product_link && (
          <Button
            as="a"
            href={item.product_link}
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
            Loja
          </Button>
        )}
      </Flex>

      {/* Modal para exibir o QR Code */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontFamily="'Higuen Elegant Serif', serif">Chave PIX</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontFamily={"Lato"}> Você pode escanear o QR Code ou utilizar a chave pix 81995115978. </Text>
            {/* Botão de copiar a chave PIX */}
            <Button mt={4} colorScheme="blue" onClick={handleCopy} fontFamily="'Higuen Elegant Serif', serif" bg="#6d1716" _hover={{ bg: "#b16831" }}>
              Copiar a chave PIX
            </Button>
            <Image src={item.qrCodeImage} alt="QR Code" width="100%" />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose} fontFamily="'Higuen Elegant Serif', serif" bg="#6d1716" _hover={{ bg: "#b16831" }} >
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default GiftCard;
