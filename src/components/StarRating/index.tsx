import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { Container, StarButton } from "./styles";
import responsive from "src/global/utils/responsive";
import { useTheme } from "styled-components";

interface StarRatingProps {
  rating: number;
  size?: number;
  color?: string;
  onPress: (rating: number) => void;
}

export default function StarRating({
  rating,
  size = 30,
  color,
  onPress,
}: StarRatingProps) {
  const theme = useTheme();
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    stars.push(
      <StarButton onPress={() => onPress(i)}>
        <Icon
          key={i}
          name={"star"}
          size={responsive(size)}
          color={i > rating ? theme.colors.gray : theme.colors.primary}
        />
      </StarButton>
    );
  }

  return <Container>{stars}</Container>;
}
