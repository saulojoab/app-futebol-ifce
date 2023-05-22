import responsive from "src/global/utils/responsive";
import styled from "styled-components/native";

interface ButtonProps {
  isLast?: boolean;
}

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.white};
  padding: ${responsive(30)}px;
  padding-top: ${responsive(60)}px;
`;

export const ProfileName = styled.Text`
  color: ${(props) => props.theme.colors.primary};
  font-size: ${responsive(20)}px;
  text-align: left;
  font-weight: bold;
`;

export const ProfileEmail = styled.Text`
  color: ${(props) => props.theme.colors.primary};
  font-size: ${responsive(16)}px;
  text-align: left;
  font-weight: 200;
  margin-bottom: ${responsive(16)}px;
`;

export const ProfileCard = styled.View`
  width: ${responsive(360)}px;
  margin-bottom: ${responsive(48)}px;
  border-radius: ${responsive(16)}px;
  justify-content: space-between;
  background-color: ${(props) => props.theme.colors.white};
  box-shadow: 1px 5px 5px ${(props) => props.theme.colors.black};
  elevation: 15;
`;

export const ProfileCardTitle = styled.Text`
  color: ${(props) => props.theme.colors.primary};
  font-size: ${responsive(20)}px;
  text-align: left;
  font-weight: bold;
`;

export const TitleContainer = styled.View`
  margin-bottom: ${responsive(16)}px;
`;

export const ActionSectionCard = styled.View`
  width: 100%;
  padding: ${responsive(10)}px;
  border-radius: ${responsive(16)}px;
  justify-content: space-between;
  background-color: ${(props) => props.theme.colors.white};
  box-shadow: 1px 5px 5px ${(props) => props.theme.colors.black};
  elevation: 15;
`;

export const ActionSectionCardItem = styled.TouchableOpacity<ButtonProps>`
  flex-direction: row;
  align-items: center;
  border-bottom-width: ${(props) => (props.isLast ? 0 : 1)}px;
  border-bottom-color: ${(props) => props.theme.colors.primary};
  padding: ${responsive(16)}px 0;
`;

export const ActionSectionCardItemIcon = styled.View`
  width: ${responsive(40)}px;
  height: ${responsive(40)}px;
  border-radius: ${responsive(20)}px;
  align-items: center;
  justify-content: center;
`;

export const ActionSectionCardItemText = styled.Text`
  color: ${(props) => props.theme.colors.primary};
  font-size: ${responsive(16)}px;
  text-align: left;
  font-weight: bold;
`;
