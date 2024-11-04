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

interface NavBarProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  role?: string | null; // role agora está incluído como opcional
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
    localStorage.removeItem("role");
    setIsAuthenticated(false);
    navigate("/");
    onClose();
  };

  return (
    <Flex
      as="nav"
      justifyContent="space-between"
      alignItems="center"
      padding={{ base: "1rem", md: "1.5rem 2rem" }}
      backgroundColor="#fff"
      boxShadow="sm"
      position="relative"
    >
      <Image
        src="wishome.png"
        alt="Wishome Logo"
        height={{ base: "60px", md: "100px" }}
        width="auto"
        onClick={() => navigate("/")}
        cursor="pointer"
      />

      {/* Botão de Menu para dispositivos menores */}
      <IconButton
        display={{ base: "flex", md: "none" }}
        aria-label="Open menu"
        icon={<FaBars />}
        onClick={onOpen}
        variant="outline"
        position="absolute"
        right="1rem"
        top="50%"
        transform="translateY(-50%)"
      />

      {/* Links de navegação para dispositivos maiores */}
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

      {/* Drawer para menu mobile */}
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
