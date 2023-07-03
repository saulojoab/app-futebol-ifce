import React from "react";
import { useAppDispatch, useAppSelector } from "src/hooks/redux";
import { useTheme } from "styled-components";
import Icon from "react-native-vector-icons/FontAwesome";
import responsive from "src/global/utils/responsive";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { logout } from "src/redux/features/authSlice";

export default function Profile() {
  const { user } = useAppSelector((state) => state.auth);

  const navigation = useNavigation<StackNavigationProp<any>>();
  const dispatch = useAppDispatch();

  function handleLogout() {
    dispatch(logout());
    navigation.navigate("Login");
  }

  return (
    <Container>
      <Title>Perfil</Title>
      <ProfileCard>
        <ProfileName>{user.fullName}</ProfileName>
        <ProfileEmail>{user.email}</ProfileEmail>
      </ProfileCard>
      <ActionSectionCard>
        <ActionItem
          icon="pencil"
          title="Editar Dados"
          description="Atualize os dados da sua conta"
          onPress={() => navigation.navigate("EditProfile")}
        />
        <ActionItem
          icon="futbol-o"
          title="Meus Jogos"
          description="Veja os jogos que você criou"
          isLast
          onPress={() => navigation.navigate("UserGames")}
        />
        <ActionItem
          icon="sign-out"
          title="Sair"
          description="Sair da sua conta"
          isLast
          onPress={handleLogout}
        />
      </ActionSectionCard>
    </Container>
  );
}

function ActionItem({
  icon,
  title,
  description,
  isLast,
  onPress,
}: {
  icon: string;
  title: string;
  description: string;
  isLast?: boolean;
  onPress?: () => void;
}) {
  const theme = useTheme();

  return (
    <ActionSectionCardItem onPress={onPress} isLast={isLast}>
      <ActionSectionCardItemIconContainer>
        <ActionSectionCardItemIcon>
          <Icon name={icon} size={responsive(18)} color={theme.colors.white} />
        </ActionSectionCardItemIcon>
      </ActionSectionCardItemIconContainer>
      <ActionSectionCardItemInfoContainer>
        <ActionSectionCardItemTitle>{title}</ActionSectionCardItemTitle>
        <ActionSectionCardItemDescription>
          {description}
        </ActionSectionCardItemDescription>
      </ActionSectionCardItemInfoContainer>
    </ActionSectionCardItem>
  );
}

interface ButtonProps {
  isLast?: boolean;
}

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.white};
  padding: ${responsive(30)}px;
  padding-top: ${responsive(60)}px;
`;

const Title = styled.Text`
  color: ${(props) => props.theme.colors.seaBlue};
  font-size: ${responsive(30)}px;
  text-align: left;
  font-weight: bold;
`;

const ProfileName = styled.Text`
  color: ${(props) => props.theme.colors.white};
  font-size: ${responsive(20)}px;
  text-align: left;
  font-family: ${(props) => props.theme.fonts.bold};
`;

const ProfileEmail = styled.Text`
  color: ${(props) => props.theme.colors.white};
  font-size: ${responsive(14)}px;
  text-align: left;
  font-family: ${(props) => props.theme.fonts.regular};
`;

const ProfileCard = styled.View`
  width: 100%;
  margin-bottom: ${responsive(40)}px;
  margin-top: ${responsive(40)}px;
  border-radius: ${responsive(16)}px;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.seaBlue};
  box-shadow: 1px 5px 5px rgba(0, 0, 0, 0.25);
  elevation: 15;
  padding: ${responsive(30)}px;
`;

const ActionSectionCard = styled.View`
  width: 100%;
  padding: ${responsive(20)}px;
  border-radius: ${responsive(16)}px;
  justify-content: space-between;
  background-color: ${(props) => props.theme.colors.white};
  box-shadow: 1px 5px 5px rgba(0, 0, 0, 0.25);
  elevation: 15;
`;

const ActionSectionCardItem = styled.TouchableOpacity<ButtonProps>`
  flex-direction: row;
  align-items: center;
  padding: ${responsive(16)}px 0;
`;

const ActionSectionCardItemIcon = styled.View`
  width: ${responsive(40)}px;
  height: ${responsive(40)}px;
  border-radius: ${responsive(20)}px;
  align-items: center;
  justify-content: center;
`;

const ActionSectionCardItemIconContainer = styled.View`
  width: ${responsive(60)}px;
  height: ${responsive(60)}px;
  border-radius: ${responsive(40)}px;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.seaBlue};
`;

const ActionSectionCardItemTitle = styled.Text`
  color: ${(props) => props.theme.colors.black};
  font-size: ${responsive(16)}px;
  text-align: left;
  font-family: ${(props) => props.theme.fonts.bold};
`;

const ActionSectionCardItemDescription = styled.Text`
  color: ${(props) => props.theme.colors.seaBlue};
  font-size: ${responsive(14)}px;
  text-align: left;
  font-family: ${(props) => props.theme.fonts.regular};
`;

const ActionSectionCardItemInfoContainer = styled.View`
  flex-direction: column;
  margin-left: ${responsive(16)}px;
`;
