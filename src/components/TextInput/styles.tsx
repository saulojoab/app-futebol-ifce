import styled from "styled-components/native";
import { TextInputProps } from "react-native";
import responsive from "src/global/utils/responsive";

export const TextInput = styled.TextInput<TextInputProps>`
  height: ${responsive(40)}px;
  width: 100%;
  border-width: 1px;
  border-color: #ccc;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 5px;
  padding: ${responsive(10)}px;
  font-size: ${responsive(16)}px;
  margin-top: ${responsive(10)}px;
`;
