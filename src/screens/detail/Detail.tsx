import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";

const DetailContainer = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70vw;
  height: 50vh;
  background-color: red;
  z-index: 10;
`;

const Backdrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 5;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Detail = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();

  const closeModal = () => {
    navigate(-1);
  };

  return (
    <AnimatePresence>
      <Backdrop onClick={closeModal}>
        <DetailContainer
          layoutId={movieId + ""}
          onClick={(e) => e.stopPropagation()}
        ></DetailContainer>
      </Backdrop>
    </AnimatePresence>
  );
};
