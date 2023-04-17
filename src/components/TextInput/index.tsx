import React, { useState } from "react";
import { TextInputProps } from "react-native";
import { TextInput } from "./styles";

interface Props extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
}

const MinimalisticTextInput: React.FC<Props> = ({
  value,
  onChangeText,
  ...rest
}) => {
  return <TextInput value={value} onChangeText={onChangeText} {...rest} />;
};

export default MinimalisticTextInput;
