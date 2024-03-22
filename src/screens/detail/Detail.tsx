import { motion } from "framer-motion";
import styled from "styled-components";
import { useParams } from "react-router-dom";

const DetailContainer = styled(motion.div)`
  width: 100%;
  height: 100%;

  background-color: black;
`;

export const Detail = () => {
  const { movieId } = useParams();

  return <DetailContainer layoutId={movieId} />;
};
