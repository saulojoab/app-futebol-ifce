import React from "react";
import { TextInputProps } from "react-native";
import styled, { useTheme } from "styled-components/native";
import responsive from "src/global/utils/responsive";

interface Props extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  icon?: React.ReactNode;
}

export default function MinimalisticTextInpu({
  value,
  onChangeText,
  icon,
  ...rest
}: Props) {
  const theme = useTheme();

  return (
    <Container>
      {icon && <IconContainer>{icon}</IconContainer>}
      <TextInput
        hasIcon={!!icon}
        placeholderTextColor={theme.colors.seaBlue}
        value={value}
        onChangeText={onChangeText}
        {...rest}
      />
    </Container>
  );
}

const TextInput = styled.TextInput<{ hasIcon: boolean }>`
  color: ${(props) => props.theme.colors.black};
  font-family: ${(props) => props.theme.fonts.regular};
  font-size: ${responsive(16)}px;
  padding-left: ${(props) => (props.hasIcon ? `${responsive(25)}px` : 0)};
`;

const Container = styled.View`
  width: 100%;
  border-bottom-width: 1px;
  border-color: ${(props) => props.theme.colors.seaBlue};
  background-color: transparent;
  padding: ${responsive(10)}px;
  margin-top: ${responsive(10)}px;
  min-height: 40px;
`;

const IconContainer = styled.View`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
  padding: ${responsive(10)}px;
`;
