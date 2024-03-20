import useWindowWidth from "../../../hooks/useWindowWidth";
import { DisplayBoard } from "./DisplayBoard";

export const Header = () => {
  const width = useWindowWidth();

  return width >= 530 && <DisplayBoard />;
};
