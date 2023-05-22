import React from "react";
import {
  ActionSectionCard,
  ActionSectionCardItem,
  ActionSectionCardItemIcon,
  ActionSectionCardItemText,
  Container,
  ProfileCard,
  ProfileCardTitle,
  ProfileEmail,
  ProfileName,
  TitleContainer,
} from "./styles";
import { useAppSelector } from "src/hooks/redux";
import { useTheme } from "styled-components";
import Icon from "react-native-vector-icons/FontAwesome";
import responsive from "src/global/utils/responsive";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

export default function Profile() {
  const { user } = useAppSelector((state) => state.auth);

  const theme = useTheme();
  const navigation = useNavigation<StackNavigationProp<any>>();

  return (
    <Container>
      <ProfileName>Bem vindo de volta, {user.fullName}!</ProfileName>
      <ProfileEmail>{user.email}</ProfileEmail>
      <ActionSectionCard>
        <ActionItem
          icon="pencil"
          text="Editar Dados"
          onPress={() => navigation.navigate("EditProfile")}
        />
        <ActionItem
          icon="futbol-o"
          text="Meus Jogos"
          isLast
          onPress={() => navigation.navigate("UserGames")}
        />
      </ActionSectionCard>
    </Container>
  );
}

function ActionItem({
  icon,
  text,
  isLast,
  onPress,
}: {
  icon: string;
  text: string;
  isLast?: boolean;
  onPress?: () => void;
}) {
  const theme = useTheme();

  return (
    <ActionSectionCardItem onPress={onPress} isLast={isLast}>
      <ActionSectionCardItemIcon>
        <Icon name={icon} size={responsive(18)} color={theme.colors.primary} />
      </ActionSectionCardItemIcon>
      <ActionSectionCardItemText>{text}</ActionSectionCardItemText>
    </ActionSectionCardItem>
  );
}
