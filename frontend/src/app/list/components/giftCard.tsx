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
  Checkbox,
  Input,
} from "@chakra-ui/react";
import { LinkIcon } from "@chakra-ui/icons";
import { MdPix, MdDeleteForever } from "react-icons/md";
import { HiPencilAlt } from "react-icons/hi";
import { useState } from "react";

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
  onUpdateStatus: (id: number, status: string) => void;
}

const GiftCard = ({ item, role, onDelete, onEdit, onUpdateStatus }: GiftCardProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isPixKeyOpen, onOpen: onPixKeyOpen, onClose: onPixKeyClose } = useDisclosure();
  const { isOpen: isConfirmOpen, onOpen: onConfirmOpen, onClose: onConfirmClose } = useDisclosure();
  const toast = useToast();
  const chavePix = "81995115978";
  const [isPurchasedChecked, setIsPurchasedChecked] = useState(false);
  const [isPixChecked, setIsPixChecked] = useState(false);
  const [trackingCode, setTrackingCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  const handlePixConfirmation = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://wishome.onrender.com/products/pix", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: "Chave PIX",
          gifter_id: localStorage.getItem("user_id"),
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao registrar o envio do PIX");
      }

      toast({
        title: "Obrigado por confirmar!",
        description: "O envio do PIX foi registrado.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      onPixKeyClose();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível registrar o envio do PIX.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleTrackingCodeSubmit = async () => {
    if (trackingCode) {
      try {
        const response = await fetch("https://wishome.onrender.com/tracking-code", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ tracking_code: trackingCode }),
        });

        if (!response.ok) {
          throw new Error("Falha ao enviar o código de rastreio");
        }

        toast({
          title: "Código de rastreio enviado",
          description: "O código de rastreio foi enviado por e-mail.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: "Erro",
          description: "Não foi possível enviar o código de rastreio.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  const handleConfirmPurchase = async () => {
    setIsLoading(true); // Ativa o estado de carregamento
    if (isPurchasedChecked) {
      if (trackingCode) {
        await handleTrackingCodeSubmit();
      }
      handleStatusUpdate("purchased");
    }
    setIsLoading(false); // Desativa o estado de carregamento
  };
  

  const handleStatusUpdate = (status: string) => {
    if (item.id) {
      onUpdateStatus(item.id, status);
      if (item.title === "Chave Pix" && status === "purchased") {
        toast({
          title: "Compra registrada",
          description: "O Wisher poderá ver que a chave PIX foi comprada.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    }
    onClose();
    onConfirmClose();
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

      <Image src={item.image} alt={item.title} borderRadius="lg" mb="1rem" height="200px" objectFit="cover" />

      <Text fontFamily="'Higuen Elegant Serif', serif" fontSize="xl" color="#6d1716" mb="0.5rem">
        {item.title}
      </Text>

      <Text fontFamily="'Higuen Elegant Serif', serif" fontSize="2xl" color="#b16831" mb="0.5rem">
        R$ {item.price}
      </Text>

      <Flex align="center" justify="center" mb="1rem">
        <Tag size="lg" colorScheme={item.status === "purchased" ? "red" : "green"} borderRadius="full">
          <TagLabel fontFamily="'Lato', sans-serif">
            {item.status === "purchased" ? "COMPRADO" : "DISPONÍVEL"}
          </TagLabel>
        </Tag>
      </Flex>

      {item.status !== "purchased" && (
        <Flex justify="space-around" mt="1rem" gap="0.3rem">
          {item.title === "Chave Pix" ? (
            <Button
              variant="ghost"
              bg="#6d1716"
              height="30px"
              width="auto"
              color="white"
              fontFamily="'Higuen Elegant Serif', serif"
              _hover={{ bg: "#b16831" }}
              onClick={onPixKeyOpen}
            >
              Mostrar chave
            </Button>
          ) : (
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
          )}

          {item.product_link && (
            <Button
              onClick={onConfirmOpen}
              _hover={{ bg: "#b16831" }}
              variant="ghost"
              bg="#6d1716"
              color="white"
              fontFamily="'Higuen Elegant Serif', serif"
              leftIcon={<LinkIcon />}
              height="30px"
              width="auto"
            >
              Loja
            </Button>
          )}
        </Flex>
      )}

      <Modal isOpen={isConfirmOpen} onClose={onConfirmClose} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontFamily="'Higuen Elegant Serif', serif">Confirmação de Redirecionamento</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontFamily="'Lato', sans-serif">
              Você está prestes a sair de nossa lista! Não esqueça de voltar aqui e marcar se comprou ou não o produto quando acabar.
            </Text>
            <Checkbox
              mt={4}
              fontFamily="'Higuen Elegant Serif', serif"
              colorScheme="green"
              isChecked={isPurchasedChecked}
              onChange={(e) => setIsPurchasedChecked(e.target.checked)}
            >
              Sim, comprei!
            </Checkbox>
            <Input
              placeholder="Código de rastreio (se houver)"
              mt={4}
              value={trackingCode}
              onChange={(e) => setTrackingCode(e.target.value)}
              fontFamily="'Lato', sans-serif"
            />
          </ModalBody>
          <ModalFooter>
            <Flex width="100%" direction="column" gap="0.5rem">
              <Button
                as="a"
                href={item.product_link}
                target="_blank"
                rel="noopener noreferrer"
                colorScheme="blue"
                fontFamily="'Higuen Elegant Serif', serif"
              >
                Continuar para Loja
              </Button>
              <Button
                colorScheme="green"
                onClick={handleConfirmPurchase}
                fontFamily="'Higuen Elegant Serif', serif"
                isDisabled={!isPurchasedChecked}
                isLoading={isLoading} // Adiciona o carregamento
                loadingText="Confirmando..."
              >
                Confirmar Compra
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>

       {/* Modal para mostrar a chave PIX */}
       <Modal isOpen={isPixKeyOpen} onClose={onPixKeyClose} closeOnOverlayClick={false} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontFamily="'Higuen Elegant Serif', serif">Chave PIX</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontFamily={"Lato"}>
              Você pode escanear o QR Code ou utilizar a chave pix {chavePix}.
            </Text>
            <Button
              mt={4}
              colorScheme="blue"
              onClick={handleCopy}
              fontFamily="'Higuen Elegant Serif', serif"
              bg="#6d1716"
              _hover={{ bg: "#b16831" }}
            >
              Copiar a chave PIX
            </Button>
            <Image src={item.qrCodeImage} alt="QR Code" width="100%" />

            <Checkbox
              mt={4}
              isChecked={isPixChecked}
              onChange={(e) => setIsPixChecked(e.target.checked)}
              fontFamily="'Lato', sans-serif"
            >
              Sim, fiz um PIX
            </Checkbox>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="green"
              onClick={handlePixConfirmation}
              fontFamily="'Higuen Elegant Serif', serif"
              isDisabled={!isPixChecked}
            >
              Confirmar
            </Button>
            <Button onClick={onPixKeyClose} fontFamily="'Higuen Elegant Serif', serif">
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

       {/* Modal para exibir o QR Code e opção de compra para os outros cards */}
       <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontFamily="'Higuen Elegant Serif', serif">Detalhes do PIX</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontFamily={"Lato"}>Você pode escanear o QR Code ou utilizar a chave pix {chavePix}.</Text>
            <Button
              mt={4}
              colorScheme="blue"
              onClick={handleCopy}
              fontFamily="'Higuen Elegant Serif', serif"
              bg="#6d1716"
              _hover={{ bg: "#b16831" }}
            >
              Copiar a chave PIX
            </Button>
            <Image src={item.qrCodeImage} alt="QR Code" width="100%" />
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="green"
              onClick={() => handleStatusUpdate("purchased")}
              mr={3}
              fontFamily="'Higuen Elegant Serif', serif"
            >
              Sim, comprei!
            </Button>
            <Button onClick={onClose} fontFamily="'Higuen Elegant Serif', serif">
              Não, vou escolher outro
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default GiftCard;
