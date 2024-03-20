import styled from "styled-components";
import { motion } from "framer-motion";

const Container = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 5rem;
  font-weight: bold;
  background-color: black;
`;

const Text = styled(motion.div)`
  color: white;
`;

const textVariants = {
  initial: {
    opacity: 0,
  },
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  },
};

export const Error404 = () => {
  return (
    <Container>
      <Text
        initial="initial"
        animate="in"
        exit="out"
        transition={{ duration: 1 }}
        variants={textVariants}
      >
        404 Not Found
      </Text>
    </Container>
  );
};
