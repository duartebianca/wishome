import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Text,
  SimpleGrid,
  useDisclosure,
  useToast,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { FaTruck } from "react-icons/fa";
import GiftCard from "./components/giftCard";
import EditProductModal from "./components/editProductModal";
import { BASE_URL } from "../../utils/apiRequests";

interface GiftItem {
  id: number;
  title: string;
  price: string | number;
  image: string;
  qrCodeImage: string;
  product_link?: string;
  status?: string;
  gifter_id?: number;
}

interface Address {
  cep: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  reference_point?: string;
}

const GiftListPage = () => {
  const [items, setItems] = useState<GiftItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<GiftItem | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isAddressOpen, onOpen: onOpenAddress, onClose: onCloseAddress } = useDisclosure();
  const [address, setAddress] = useState<Address | null>(null);
  const toast = useToast();

  useEffect(() => {
    fetchGiftItems();
  }, []);

  const fetchGiftItems = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${BASE_URL}/products`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Falha ao buscar a lista de presentes");
      }

      const data = await response.json();
      const filteredItems = data.filter((item: any) => !(item.title === "Chave PIX" && item.status === "purchased"));
      const sortedItems = filteredItems.sort((a: any, b: any) => {
        if (a.status === "available" && b.status !== "available") return -1;
        if (a.status !== "available" && b.status === "available") return 1;
        return 0;
      });
      const fixedPixItem: GiftItem = {
        id: 0,
        title: "Chave Pix",
        price: "Valor Livre",
        image: "https://psverso.com.br/wp-content/uploads/2022/09/simbolo-pix-nick-bio-free-fire.webp",
        qrCodeImage: "/qrcode.png",
      };

      const itemsWithQrCode = sortedItems.map((item: any) => ({
        ...item,
        image: item.image_link || "",
        qrCodeImage: "/qrcode.png",
      }));

      setItems([fixedPixItem, ...itemsWithQrCode]);
    } catch (error) {
      console.error("Erro ao buscar a lista de presentes:", error);
    }
  };

  const fetchAddress = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${BASE_URL}/address`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        if (response.status === 403) {
          toast({
            title: "Acesso negado",
            description: "Para acessar o endereço, Duda ou Gustavo devem validar que te conhecem.",
            status: "info",
            duration: 5000,
            isClosable: true,
          });
        } else {
          throw new Error("Erro ao buscar endereço");
        }
        return;
      }
      const data = await response.json();
      setAddress(data);
      onOpenAddress();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível buscar o endereço.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleShowAddress = () => {
    fetchAddress();
  };

  const handleCopyAddress = () => {
    if (address) {
      const formattedAddress = `CEP: ${address.cep}. ${address.street}, ${address.number}, ${address.complement || ""}, ${address.neighborhood}, ${address.city}, ${address.state}. Ponto de referência: ${address.reference_point || ""}`;
      navigator.clipboard.writeText(formattedAddress);
      toast({
        title: "Endereço copiado",
        description: "O endereço foi copiado para a área de transferência.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleEdit = (item: GiftItem) => {
    setSelectedItem(item);
    onOpen();
  };

  const handleDelete = async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${BASE_URL}/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao deletar o produto");
      }

      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
      toast({
        title: "Item deletado com sucesso",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Erro ao deletar item",
        description: error instanceof Error ? error.message : "Erro desconhecido",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleUpdateItem = (updatedItem: GiftItem) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
    setSelectedItem(null);
    onClose();
  };

  const handleUpdateStatus = async (id: number, status: string) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${BASE_URL}/products/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) {
        console.log(response);
        throw new Error("Erro ao atualizar status do produto");
      }

      const updatedItems = items.map((item) =>
        item.id === id ? { ...item, status } : item
      );
      setItems(updatedItems);
      toast({
        title: "Status atualizado",
        description: status === "purchased" ? "O produto foi comprado!" : "O produto continuará disponível.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      
    } catch (error) {
      toast({
        title: "Erro ao atualizar status",
        description: error instanceof Error ? error.message : "Erro desconhecido",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box backgroundImage="url('/background.png')" backgroundSize="cover" backgroundPosition="center" minHeight="100vh">
      <Flex direction="column" alignItems="center" justifyContent="center" padding="2rem">
        <Text fontSize="4xl" fontFamily="'Higuen Elegant Serif', serif" color="#6d1716" mb="2rem">
          Lista de Presentes
        </Text>

        <Button leftIcon={<FaTruck />} colorScheme="blue" mb="1.5rem" fontFamily="'Higuen Elegant Serif', serif" onClick={handleShowAddress} bg="#6d1716" color="white" _hover={{ bg: "#b16831" }}>
          Ver Endereço de Entrega
        </Button>

        <SimpleGrid columns={{ base: 1, md: 4 }} spacing="1.5rem" width="100%">
          {items.map((item) => (
            <GiftCard
              key={item.id}
              item={item}
              role={localStorage.getItem("role")}
              onDelete={handleDelete}
              onEdit={handleEdit}
              onUpdateStatus={handleUpdateStatus} // Passando a função para o GiftCard
            />
          ))}
        </SimpleGrid>
      </Flex>

      {/* Modal de Endereço */}
      <Modal isOpen={isAddressOpen} onClose={onCloseAddress}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontFamily="'Higuen Elegant Serif', serif">Endereço de Entrega</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {address ? (
              <>
                <Text fontFamily="'Lato', sans-serif">{`CEP: ${address.cep}`}</Text>
                <Text fontFamily="'Lato', sans-serif">{`${address.street}, ${address.number}, ${address.complement}`}</Text>
                <Text fontFamily="'Lato', sans-serif">{`${address.neighborhood}, ${address.city}, ${address.state}`}</Text>
                {address.reference_point && <Text fontFamily="'Lato', sans-serif">{`Ponto de referência: ${address.reference_point}`}</Text>}
                <Button mt={4} onClick={handleCopyAddress} variant="ghost" bg="#6d1716" color="white" _hover={{ bg: "#b16831" }} fontFamily="'Higuen Elegant Serif', serif">
                  Copiar Endereço Completo
                </Button>
              </>
            ) : (
              <Text>Carregando...</Text>
            )}
          </ModalBody>
          <ModalFooter>
            <Button fontFamily="'Higuen Elegant Serif', serif" variant="outline" onClick={onCloseAddress}>
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal de Edição */}
      {selectedItem && (
        <EditProductModal
          isOpen={isOpen}
          onClose={onClose}
          item={selectedItem}
          onSave={handleUpdateItem}
        />
      )}
    </Box>
  );
};

export default GiftListPage;
