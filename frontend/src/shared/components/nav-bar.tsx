import {
  Button,
  Flex,
  Image,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
} from "@chakra-ui/react";
import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface NavBarProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  role: string | null; // Novo campo adicionado
}

const NavBar: React.FC<NavBarProps> = ({ isAuthenticated, setIsAuthenticated, role }) => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLoginClick = () => {
    navigate("/login");
    onClose();
  };

  const handleListClick = () => {
    navigate("/list");
    onClose();
  };

  const handleDashboardClick = () => {
    navigate("/wisher-dashboard");
    onClose();
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/");
    onClose();
  };

  return (
    <Flex
      as="nav"
      justifyContent="space-between"
      alignItems="center"
      padding="1.5rem 2rem"
      backgroundColor="#fff"
      boxShadow="sm"
    >
      <Image
        src="wishome.png"
        alt="Wishome Logo"
        height={"100px"}
        width={"auto"}
        onClick={() => navigate("/")}
      />

      <Flex display={{ base: "none", md: "flex" }} gap={10} fontSize="lg">
        {isAuthenticated && role === "wisher" && (
          <Button
            variant="link"
            color="#6d1716"
            fontFamily="'Lato', sans-serif"
            onClick={handleDashboardClick}
          >
            PAINEL
          </Button>
        )}
        {isAuthenticated && (
          <Button
            variant="link"
            color="#6d1716"
            fontFamily="'Lato', sans-serif"
            onClick={handleListClick}
          >
            LISTA
          </Button>
        )}
        {isAuthenticated ? (
          <Button
            variant="link"
            color="#6d1716"
            fontFamily="'Lato', sans-serif"
            onClick={handleLogoutClick}
          >
            SAIR
          </Button>
        ) : (
          <Button
            variant="link"
            color="#6d1716"
            fontFamily="'Lato', sans-serif"
            onClick={handleLoginClick}
          >
            LOGIN
          </Button>
        )}
      </Flex>

      <IconButton
        display={{ base: "flex", md: "none" }}
        aria-label="Open menu"
        icon={<FaBars />}
        onClick={onOpen}
        variant="outline"
      />

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <VStack spacing="24px">
              {isAuthenticated && role === "wisher" && (
                <Button
                  variant="link"
                  color="#6d1716"
                  fontFamily="'Lato', sans-serif"
                  onClick={handleDashboardClick}
                >
                  PAINEL
                </Button>
              )}
              {isAuthenticated && (
                <Button
                  variant="link"
                  color="#6d1716"
                  fontFamily="'Lato', sans-serif"
                  onClick={handleListClick}
                >
                  LISTA
                </Button>
              )}
              {isAuthenticated ? (
                <Button
                  variant="link"
                  color="#6d1716"
                  fontFamily="'Lato', sans-serif"
                  onClick={handleLogoutClick}
                >
                  SAIR
                </Button>
              ) : (
                <Button
                  variant="link"
                  color="#6d1716"
                  fontFamily="'Lato', sans-serif"
                  onClick={handleLoginClick}
                >
                  LOGIN
                </Button>
              )}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export default NavBar;
