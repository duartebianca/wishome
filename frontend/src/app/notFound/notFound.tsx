import React from 'react';
import { Box, Text, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <Box
      backgroundColor="#f5f0eb"
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      padding="2rem"
    >
      <Text fontSize="6xl" fontFamily="'Higuen Elegant Serif', serif" color="#b16831" mb="1rem">
        ERRO 404
      </Text>
      <Text fontSize="2xl" fontFamily="'Higuen Elegant Serif', serif" color="#6d1716" mb="1.5rem">
        Oops! Essa página não existe.
      </Text>
      <Text fontSize="lg" fontFamily="'Lato', sans-serif" color="#6d1716">
        Talvez seja melhor voltar ao{' '}
        <Link as={RouterLink} to="/" color="#b16831" fontWeight="bold">
          início
        </Link>.
      </Text>
    </Box>
  );
};

export default NotFound;
