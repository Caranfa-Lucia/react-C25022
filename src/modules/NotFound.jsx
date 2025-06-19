import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NotFound = () => {
  return (
    <Container>
      <Content>
        <Title>404</Title>
        <Subtitle>Ups... Página no encontrada</Subtitle>
        <Text>
          La URL ingresada no existe. Por favor, verifica la dirección e intenta de nuevo.
        </Text>
        <Button to="/home">Ir al inicio</Button>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  background-color: #1e1e1e;
  color: #fff;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  text-align: center;
`;

const Content = styled.div`
  max-width: 600px;
`;

const Title = styled.h1`
  font-size: 8rem;
  margin-bottom: 0.5rem;
  color: #f2b632;
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const Text = styled.p`
  font-size: 1rem;
  margin-bottom: 2rem;
  color: #cccccc;
`;

const Button = styled(Link)`
  background-color: #4ca996;
  color: white;
  padding: 12px 24px;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #3a8678;
  }
`;

export default NotFound;