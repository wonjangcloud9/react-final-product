import useWindowWidth from "../../../hooks/useWindowWidth";
import { DisplayBoard } from "./DisplayBoard";
import styled from "styled-components";
import { CiSearch } from "react-icons/ci";
import { CiMenuBurger } from "react-icons/ci";

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 20px;
  background-color: black;
`;

const MenuLogo = styled.img`
  width: 50px;
  border-radius: 30px;
  cursor: pointer;
`;

const MenuContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const MenuButton = styled.div`
  color: white;
  cursor: pointer;
`;

export const Header = () => {
  const width = useWindowWidth();

  return (
    <>
      <Menu>
        <MenuLogo src="/logo3.png" />
        <MenuContainer>
          <MenuButton onClick={() => console.log("Hi")}>
            {width >= 530 ? (
              "검색"
            ) : (
              <CiSearch
                style={{
                  fontSize: "1.5rem",
                  color: "white",
                  cursor: "pointer",
                }}
              />
            )}
          </MenuButton>
          <MenuButton onClick={() => console.log("Hi")}>
            {width >= 530 ? (
              "로그인"
            ) : (
              <CiMenuBurger
                style={{
                  fontSize: "1.5rem",
                  color: "white",
                  cursor: "pointer",
                }}
              />
            )}
          </MenuButton>
        </MenuContainer>
      </Menu>
      {width >= 530 && <DisplayBoard />}
    </>
  );
};
