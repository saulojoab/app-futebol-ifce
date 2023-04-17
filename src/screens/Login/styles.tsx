import responsive from "src/global/utils/responsive";
import styled from "styled-components/native";

interface ButtonProps {
  disabled: boolean;
}

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.primary};
  align-items: center;
  justify-content: center;
  padding: ${responsive(20)}px;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: ${(props) => props.theme.colors.black};
`;

export const OutlinedButton = styled.TouchableOpacity<ButtonProps>`
  height: ${responsive(40)}px;
  width: 60%;
  background-color: ${(props) =>
    props.disabled ? props.theme.colors.gray : props.theme.colors.white};
  border-radius: 5px;
  padding: ${responsive(10)}px;
  margin-top: ${responsive(20)}px;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  font-size: ${responsive(16)}px;
  color: ${(props) => props.theme.colors.primary};
`;

export const SignupText = styled.Text`
  font-size: ${responsive(16)}px;
  color: ${(props) => props.theme.colors.white};
  margin-top: ${responsive(20)}px;
`;
