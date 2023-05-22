import responsive from "src/global/utils/responsive";
import styled from "styled-components/native";
import { TextInput } from "src/components";

interface ButtonProps {
  disabled: boolean;
}

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.white};
  align-items: center;
  padding: ${responsive(20)}px;
  padding-top: ${responsive(60)}px;
`;

export const Logo = styled.Image`
  width: 132px;
  height: 132px;
  margin-bottom: ${responsive(40)}px;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: ${(props) => props.theme.colors.primary};
  font-weight: bold;
  margin-left: ${responsive(10)}px;
`;

export const PasswordError = styled.Text`
  margin-top: ${responsive(10)}px;
  color: ${(props) => props.theme.colors.white};
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

export const FlexView = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

export const RowInput = styled(TextInput)`
  width: 47.5%;
`;

export const ButtonText = styled.Text`
  font-size: ${responsive(16)}px;
  color: ${(props) => props.theme.colors.white};
`;

export const SignupText = styled.Text`
  font-size: ${responsive(16)}px;
  color: ${(props) => props.theme.colors.white};
  margin-top: ${responsive(20)}px;
`;

export const GoBackContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-bottom: ${responsive(20)}px;
`;
