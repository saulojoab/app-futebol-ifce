import responsive from "src/global/utils/responsive";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.white};
  padding: 30px;
  padding-top: 50px;
`;

export const Title = styled.Text`
  color: ${(props) => props.theme.colors.black};
  font-size: ${responsive(30)}px;
`;

export const GameListingContainer = styled.ScrollView`
  margin-top: 20px;
`;

export const CreateGameButton = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.primary};
  padding: 10px;
  border-radius: 10px;
  margin-top: 20px;
`;

export const CreateGameButtonText = styled.Text`
  color: ${(props) => props.theme.colors.white};
  font-size: ${responsive(20)}px;
  text-align: center;
`;

export const GameContainer = styled.TouchableOpacity`
  padding: ${responsive(10)}px;
  border-radius: ${responsive(20)}px;
  margin-top: ${responsive(10)}px;
  display: flex;
  flex-direction: row;
  shadow-color: ${(props) => props.theme.colors.black};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  elevation: 5;
`;

export const GameTitle = styled.Text`
  color: ${(props) => props.theme.colors.primary};
  font-size: ${responsive(20)}px;
  text-align: left;
  font-weight: bold;
`;

export const GameDescription = styled.Text`
  color: ${(props) => props.theme.colors.primary};
  font-size: ${responsive(14)}px;
  text-align: left;
  margin-top: ${responsive(5)}px;
`;

export const MapContainer = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.white};
`;

export const GameInformationContainer = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.white};
  padding: ${responsive(10)}px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;
