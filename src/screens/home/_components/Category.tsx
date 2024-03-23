import { useState } from "react";
import { MAIN_COLOR } from "../../../color";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Container = styled(motion.div)`
  display: flex;
  justify-content: start;
  background-color: black;
  padding: 1.5rem;
  gap: 1rem;
`;

const CategoryItem = styled(motion.div)`
  padding: 0.7rem 1.2rem;
  color: white;
  cursor: pointer;
  background-color: ${(props: { selected: boolean }) =>
    props.selected ? MAIN_COLOR : "black"};
  border: ${(props: { selected: boolean }) =>
    props.selected ? "none" : "1px solid grey"};
  border-radius: 40px;
`;

const Ghost = styled(motion.div)`
  height: 1px;
  width: 20px;
  background-color: ${MAIN_COLOR};
  border-radius: 20px;
  transform: translateY(20-px);
  font-size: 1.5rem;
`;

export const Category = () => {
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState([
    { name: "인기 영화", selected: true },
    { name: "상영 예정", selected: false },
    { name: "현재 상영중", selected: false },
  ]);

  const handleCategoryClick = (category: string) => {
    const selectedCategoryNow = selectedCategory.find(
      (item) => item.selected
    )?.name;
    if (category === selectedCategoryNow) return;
    const newCategory = selectedCategory.map((item) => {
      if (item.name === category) return { ...item, selected: true };
      return { ...item, selected: false };
    });
    setSelectedCategory(newCategory);
    if (category === "인기 영화") {
      navigate("/");
    } else if (category === "상영 예정") {
      navigate("/coming-soon");
    } else if (category === "현재 상영중") {
      navigate("/now-playing");
    }
  };

  return (
    <>
      <Container>
        {selectedCategory.map((category) => (
          <CategoryItem
            key={category.name}
            selected={category.selected}
            onClick={() => handleCategoryClick(category.name)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            layout
          >
            {category.name}
            {category.selected && (
              <Ghost layoutId="underline" transition={{ duration: 0.5 }}>
                👻
              </Ghost>
            )}
          </CategoryItem>
        ))}
      </Container>
    </>
  );
};
