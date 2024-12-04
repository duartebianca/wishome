import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  Text,
  SimpleGrid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../utils/apiRequests";

interface User {
  id: number;
  name: string;
  phone: string;
}

const ValidateUsersPage = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure(); // Controla o modal de confirmação
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [modalType, setModalType] = useState<"accept" | "reject">(); // Controla se o modal é de aceitar ou rejeitar
  const toast = useToast();

  useEffect(() => {
    // Função para buscar os usuários pendentes de validação
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");

      const response = await fetch(`${BASE_URL}/pending-users`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        toast({
          title: "Erro",
          description: "Falha ao buscar usuários pendentes",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };

    fetchUsers();
  }, [toast]);

  const handleBackToDashboard = () => {
    navigate("/wisher-dashboard");
  };

  const handleConfirmAction = async () => {
    if (!selectedUser) return;
  
    const token = localStorage.getItem("token");
  
    // Define URL e método conforme o tipo de ação
    const url = `${BASE_URL}/users/${selectedUser.id}/${
      modalType === "accept" ? "validate" : "reject"
    }`;
    const method = modalType === "accept" ? "PATCH" : "DELETE";  // Usa DELETE para rejeitar
  
    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        toast({
          title:
            modalType === "accept"
              ? "Usuário validado!"
              : "Usuário rejeitado!",
          description:
            modalType === "accept"
              ? "Essa pessoa agora pode visualizar o seu endereço."
              : "Esse usuário deverá recriar o cadastro.",
          status: modalType === "accept" ? "success" : "error",
          duration: 3000,
          isClosable: true,
        });
  
        // Remove o usuário da lista de pendentes
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user.id !== selectedUser.id)
        );
      } else {
        throw new Error("Erro na operação com o usuário");
      }
    } catch (error) {
      toast({
        title: "Erro",
        description:
          modalType === "accept"
            ? "Falha ao validar usuário."
            : "Falha ao rejeitar usuário.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    onClose();
  };
  
  const openModal = (type: "accept" | "reject", user: User) => {
    setModalType(type);
    setSelectedUser(user);
    onOpen();
  };
  
  return (
    <Box
      backgroundImage="url('/background.png')"
      backgroundSize="cover"
      backgroundPosition="center"
      minHeight="100vh"
    >
      <Flex direction="column" alignItems="center" justifyContent="center" padding="2rem">
        <Text fontSize="4xl" fontFamily="'Higuen Elegant Serif', serif" color="#6d1716" mb="1rem">
          Validar Usuários
        </Text>

        <Text fontSize="lg" fontFamily="'Lato', sans-serif" color="#6d1716" mb="2rem">
          Para segurança do seu endereço, valide somente os usuários que você realmente conhece! <br />
          Quando terminar, volte para o{" "}
          <Text as="span" color="black" fontWeight="bold" cursor="pointer" onClick={handleBackToDashboard}>
            painel do wisher.
          </Text>
        </Text>

        <Box bg="white" borderRadius="lg" boxShadow="md" padding="2rem" width="100%" maxWidth="800px">
        <SimpleGrid columns={3} spacing={4} mb="1rem">
        <Text color="white" bg="#6d1716" textAlign="center" py="1rem" fontFamily="'Higuen Elegant Serif', serif">
          Nome
        </Text>
        <Text color="white" bg="#6d1716" textAlign="center" py="1rem" fontFamily="'Higuen Elegant Serif', serif">
          Telefone
        </Text>
        <Text color="white" bg="#6d1716" textAlign="center" py="1rem" fontFamily="'Higuen Elegant Serif', serif">
          Validar
        </Text>
      </SimpleGrid>


          {users.map((user) => (
            <SimpleGrid columns={3} spacing={4} key={user.id} marginY="0.3rem">
              <Text textAlign="center" p="0.5rem" bg="#b16831" color="white">
                {user.name}
              </Text>
              <Text textAlign="center" p="0.5rem" bg="#b16831" color="white">
                {user.phone}
              </Text>
              <Flex justify="center" align="center">
                <IconButton
                  aria-label="Confirmar"
                  icon={<CheckIcon />}
                  colorScheme="green"
                  onClick={() => openModal("accept", user)}
                  mr="0.5rem"
                />
                <IconButton
                  aria-label="Rejeitar"
                  icon={<CloseIcon />}
                  colorScheme="red"
                  onClick={() => openModal("reject", user)}
                />
              </Flex>
            </SimpleGrid>
          ))}
        </Box>
      </Flex>

      {/* Modal de Confirmação */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {modalType === "accept" ? "Confirmar Validação" : "Rejeitar Usuário"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {modalType === "accept"
              ? "Você deseja confirmar que conhece essa pessoa? Ela terá acesso ao seu endereço."
              : "Você tem certeza de que não conhece esse usuário? Caso confirme, ele deverá recriar o cadastro."}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button colorScheme="green" onClick={handleConfirmAction}>
              Confirmar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ValidateUsersPage;
