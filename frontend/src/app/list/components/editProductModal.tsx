import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    useToast,
  } from "@chakra-ui/react";
  import { useState, useEffect } from "react";
  
  interface EditProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    item: {
      id: number;
      title: string;
      product_link?: string;
      image_link?: string;
      price: string | number;
    };
    onSave: (updatedItem: {
      id: number;
      title: string;
      product_link?: string;
      image_link?: string;
      price: string | number;
    }) => void;
  }
  
  const EditProductModal: React.FC<EditProductModalProps> = ({
    isOpen,
    onClose,
    item,
    onSave,
  }) => {
    const toast = useToast();
  
    // Estados para os valores dos campos do formulário
    const [title, setTitle] = useState(item.title || "");
    const [productLink, setProductLink] = useState(item.product_link || "");
    const [imageLink, setImageLink] = useState(item.image_link || "");
    const [price, setPrice] = useState(item.price.toString() || "");
  
    useEffect(() => {
      // Atualiza os estados quando o item muda
      setTitle(item.title || "");
      setProductLink(item.product_link || "");
      setImageLink(item.image_link || "");
      setPrice(item.price.toString() || "");
    }, [item]);
  
    // Função para salvar as alterações
    const handleSaveChanges = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast({
          title: "Erro",
          description: "Usuário não autenticado",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }
  
      try {
        const response = await fetch(`https://wishome.onrender.com/products/${item.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title,
            product_link: productLink,
            image_link: imageLink,
            price,
          }),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Erro ao editar produto");
        }
  
        const updatedItem = { ...item, title, product_link: productLink, image_link: imageLink, price };
        onSave(updatedItem); // Chama a função onSave do parent para atualizar o item na lista
        onClose(); // Fecha o modal
  
        toast({
          title: "Produto atualizado",
          description: "O produto foi atualizado com sucesso.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } catch (error: any) {
        toast({
          title: "Erro",
          description: error.message || "Erro ao atualizar produto",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };
  
    return (
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontFamily="'Higuen Elegant Serif', serif">Editar Produto</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb="1rem">
              <FormLabel color="#b16831" fontFamily="'Higuen Elegant Serif', serif">
                Título
              </FormLabel>
              <Input
                type="text"
                borderColor="#b16831"
                focusBorderColor="#b16831"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormControl>
  
            <FormControl mb="1rem">
              <FormLabel color="#b16831" fontFamily="'Higuen Elegant Serif', serif">
                Link do Produto
              </FormLabel>
              <Input
                type="url"
                borderColor="#b16831"
                focusBorderColor="#b16831"
                value={productLink}
                onChange={(e) => setProductLink(e.target.value)}
              />
            </FormControl>
  
            <FormControl mb="1rem">
              <FormLabel color="#b16831" fontFamily="'Higuen Elegant Serif', serif">
                Link da Imagem
              </FormLabel>
              <Input
                type="url"
                borderColor="#b16831"
                focusBorderColor="#b16831"
                value={imageLink}
                onChange={(e) => setImageLink(e.target.value)}
              />
            </FormControl>
  
            <FormControl mb="1rem">
              <FormLabel color="#b16831" fontFamily="'Higuen Elegant Serif', serif">
                Preço
              </FormLabel>
              <Input
                type="text"
                borderColor="#b16831"
                focusBorderColor="#b16831"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              bg="#6d1716"
              color="white"
              fontFamily="'Higuen Elegant Serif', serif"
              _hover={{ bg: "#b16831" }}
              onClick={handleSaveChanges} // Salva as alterações
            >
              SALVAR
            </Button>
            <Button
              colorScheme="red"
              onClick={onClose}
              ml={3}
              fontFamily="'Higuen Elegant Serif', serif"
            >
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };
  
  export default EditProductModal;
  