import { useState } from "react";
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
const ValidateUsersPage = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure(); // Controla o modal de confirmação
  const [modalType, setModalType] = useState<"accept" | "reject">(); // Controla se o modal é de aceitar ou rejeitar
  const toast = useToast();

  const handleBackToDashboard = () => {
    navigate("/wisher-dashboard");
  };

  const handleConfirmAction = () => {
    // Lógica de confirmação de ação (aceitar ou rejeitar usuário)
    if (modalType === "accept") {
      toast({
        title: "Usuário validado!",
        description: "Essa pessoa agora pode visualizar o seu endereço.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Usuário rejeitado!",
        description: "Esse usuário deverá recriar o cadastro.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    onClose();
  };

  const openModal = (type: "accept" | "reject") => {
    setModalType(type);
    onOpen();
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
          Validar Usuários
        </Text>

        {/* Subtítulo com link para o painel */}
        <Text
          fontSize="lg"
          fontFamily="'Lato', sans-serif"
          color="#6d1716"
          mb="2rem"
        >
          Para segurança do seu endereço, valide somente os usuários que você
          realmente conhece! <br />
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

        {/* Tabela de Usuários */}
        <Box
          bg="white"
          borderRadius="lg"
          boxShadow="md"
          padding="2rem"
          width="100%"
          maxWidth="800px"
        >
          <SimpleGrid columns={4} spacing={4} mb="1rem">
            <Text
              color="white"
              bg="#6d1716"
              textAlign="center"
              p="0.5rem"
              fontFamily="'Higuen Elegant Serif', serif"
            >
              Nome
            </Text>
            <Text
              color="white"
              bg="#6d1716"
              textAlign="center"
              p="0.5rem"
              fontFamily="'Higuen Elegant Serif', serif"
            >
              E-mail
            </Text>
            <Text
              color="white"
              bg="#6d1716"
              textAlign="center"
              fontFamily="'Higuen Elegant Serif', serif"
              p="0.5rem"
            >
              Telefone
            </Text>
            <Text
              color="white"
              bg="#6d1716"
              textAlign="center"
              p="0.5rem"
              fontFamily="'Higuen Elegant Serif', serif"
            >
              Validar
            </Text>
          </SimpleGrid>

          {/* Exemplo de linha de usuário */}
          <SimpleGrid columns={4} spacing={4}>
            <Text textAlign="center" p="0.5rem" bg="#b16831" color="white">
              Vovó Juju
            </Text>
            <Text textAlign="center" p="0.5rem" bg="#b16831" color="white">
              juju@mail.com
            </Text>
            <Text textAlign="center" p="0.5rem" bg="#b16831" color="white">
              87234919424
            </Text>
            <Flex justify="center" align="center">
              <IconButton
                aria-label="Confirmar"
                icon={<CheckIcon />}
                colorScheme="green"
                onClick={() => openModal("accept")}
                mr="0.5rem"
              />
              <IconButton
                aria-label="Rejeitar"
                icon={<CloseIcon />}
                colorScheme="red"
                onClick={() => openModal("reject")}
              />
            </Flex>
          </SimpleGrid>
        </Box>
      </Flex>

      {/* Modal de Confirmação */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {modalType === "accept"
              ? "Confirmar Validação"
              : "Rejeitar Usuário"}
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
