import responsive from "src/global/utils/responsive";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.white};
  padding-top: 50px;
  padding-bottom: 40px;
`;

export const Title = styled.Text`
  color: ${(props) => props.theme.colors.black};
  font-size: ${responsive(30)}px;
  margin-left: ${responsive(15)}px;
`;

export const GoBackButton = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.primary};
  padding: 20px;
  border-radius: 50px;
`;

export const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding-top: ${responsive(15)}px;
  padding-left: ${responsive(15)}px;
`;

export const MapContainer = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.white};
`;

export const IconOnMiddleOfMap = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -${responsive(20)}px;
  margin-top: -${responsive(40)}px;
`;

export const CreateGameButton = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.primary};
  padding: 10px;
  border-radius: 10px;
  margin-top: 20px;
  margin: ${responsive(20)}px;
`;

export const CreateGameButtonText = styled.Text`
  color: ${(props) => props.theme.colors.white};
  font-size: ${responsive(20)}px;
  text-align: center;
`;

export const InputLabel = styled.Text`
  color: ${(props) => props.theme.colors.black};
  font-size: ${responsive(16)}px;
  font-weight: bold;
  margin-top: ${responsive(20)}px;
`;

export const FormContainer = styled.View`
  padding: ${responsive(15)}px;
`;
