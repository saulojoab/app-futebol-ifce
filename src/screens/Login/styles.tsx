import responsive from "src/global/utils/responsive";
import styled from "styled-components/native";

interface ButtonProps {
  disabled: boolean;
}

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
  align-items: center;
  padding: ${responsive(20)}px;
`;

export const Logo = styled.Image`
  width: 215px;
  height: 215px;
  margin-top: ${responsive(60)}px;
  margin-bottom: ${responsive(40)}px;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: ${(props) => props.theme.colors.white};
  margin-bottom: ${responsive(10)}px;
`;

export const OutlinedButton = styled.TouchableOpacity<ButtonProps>`
  height: ${responsive(45)}px;
  width: 75%;
  background-color: ${(props) =>
    props.disabled
      ? props.theme.colors.background
      : props.theme.colors.secondary};
  border: 1.4px solid
    ${(props) =>
      props.disabled ? props.theme.colors.primary : props.theme.colors.primary};
  border-radius: 7.5px;
  padding: ${responsive(10)}px;
  margin-top: ${responsive(20)}px;
  align-items: center;
  justify-content: center;
`;

export const ForgotPassword = styled.TouchableOpacity<ButtonProps>`
  margin-left: auto;
  margin-bottom: ${responsive(20)}px;
  color: ${(props) => props.theme.colors.white};
`;

export const ButtonText = styled.Text`
  font-size: ${responsive(16)}px;
  color: ${(props) => props.theme.colors.white};
`;

export const ForgotText = styled.Text`
  font-size: ${responsive(16)}px;
  color: ${(props) => props.theme.colors.white};
  margin-top: ${responsive(20)}px;
`;

export const SignupText = styled.Text`
  font-size: ${responsive(16)}px;
  color: ${(props) => props.theme.colors.white};
  margin-top: ${responsive(20)}px;
`;
