import responsive from "src/global/utils/responsive";
import styled from "styled-components/native";

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const StarButton = styled.TouchableOpacity`
  margin-right: ${responsive(5)}px;
`;
