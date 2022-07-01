import { loadingState } from "@/state/loading/atoms";
import { CgSpinnerTwo } from "react-icons/cg";
import { useRecoilState } from "recoil";
import { Container, Content } from "./styles";

export const Loading = () => {
  const [isLoading] = useRecoilState(loadingState);

  return (
    <Container style={{ display: isLoading ? "flex" : "none" }}>
      <Content>
        <CgSpinnerTwo />
      </Content>
    </Container>
  );
};
