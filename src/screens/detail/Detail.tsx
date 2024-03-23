import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchMovie } from "../../hooks/useQueryMovie";
import { makeBgPath, makeImagePath } from "../../api";

const DetailContainer = styled(motion.div)`
  position: fixed;
  width: 70vw;
  height: 80vh;
  background-color: black;
  z-index: 10;
  border-radius: 20px;
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

export const Detail = ({ layoutId }: { layoutId: string }) => {
  const { id: movieId } = useParams();
  const navigate = useNavigate();

  const { isLoading, hasError, hasData, data } = useFetchMovie(
    movieId as string
  );

  if (isLoading || !hasData || hasError || !data) {
    return (
      <DetailSkeleton layoutId={layoutId} closeModal={() => navigate(-1)} />
    );
  }

  const closeModal = () => {
    navigate(-1);
  };

  return (
    <AnimatePresence>
      <Backdrop onClick={closeModal}>
        <DetailContainer
          layoutId={layoutId}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            style={{
              position: "relative",
              zIndex: 1,
            }}
            onClick={closeModal}
          >
            <button
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                color: "white",
                backgroundColor: "transparent",
                border: "none",
                fontSize: "1.5rem",
                cursor: "pointer",
              }}
            >
              X
            </button>
          </div>
          <div
            style={{
              width: "100%",
              height: "50%",
              overflow: "hidden",
              borderRadius: "20px",
            }}
          >
            <img
              src={makeBgPath(data.backdrop_path)}
              style={{
                width: "100%",
                objectFit: "cover",
                borderRadius: "20px",
                opacity: 0.5,
              }}
              alt={data.title}
            />
          </div>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              padding: "1rem",
              overflow: "hidden",
              borderRadius: "20px",
            }}
          >
            <img
              src={makeImagePath(data.poster_path)}
              style={{
                width: "100px",
                height: "150px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
              alt={data.title}
            />
            <div
              style={{
                padding: "1rem",
                color: "white",
                overflowY: "auto",
              }}
            >
              <h1
                style={{
                  fontSize: "2rem",
                  marginBottom: "1rem",
                }}
              >
                {data.title}
              </h1>
              <p
                style={{
                  fontSize: "1rem",
                  marginBottom: "1rem",
                  color: "grey",
                }}
              >
                {data.overview}
              </p>
            </div>
          </div>

          <div
            style={{
              padding: "1rem",
              color: "white",
              overflowY: "auto",
              height: "50%",
            }}
          >
            <h2
              style={{
                fontSize: "1.5rem",
                marginBottom: "1rem",
              }}
            >
              Genres
            </h2>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
              }}
            >
              {data.genres.map((genre) => (
                <li
                  key={genre.id}
                  style={{
                    fontSize: "1rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  {genre.name}
                </li>
              ))}
            </ul>
          </div>
        </DetailContainer>
      </Backdrop>
    </AnimatePresence>
  );
};

const DetailSkeleton = ({
  layoutId,
  closeModal,
}: {
  layoutId: string;
  closeModal: () => void;
}) => {
  return (
    <Backdrop onClick={closeModal}>
      <DetailContainer layoutId={layoutId}></DetailContainer>
    </Backdrop>
  );
};
