import styled from "styled-components/native";
import responsive from "../../global/utils/responsive";

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.white};
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const TopMapContainer = styled.View`
  width: 100%;
  height: ${responsive(300)}px;
`;

export const Title = styled.Text`
  font-size: ${responsive(36)}px;
  color: ${(props) => props.theme.colors.black};
  margin-bottom: ${responsive(10)}px;
  font-weight: bold;
  margin-left: ${responsive(20)}px;
  margin-top: ${responsive(20)}px;
`;

export const DateAndTime = styled.Text`
  font-size: ${responsive(20)}px;
  color: ${(props) => props.theme.colors.black};
  margin-bottom: ${responsive(10)}px;
  margin-left: ${responsive(20)}px;
  font-weight: 300;
`;

export const Description = styled.Text`
  font-size: ${responsive(20)}px;
  color: ${(props) => props.theme.colors.black};
  margin-bottom: ${responsive(10)}px;
  margin-left: ${responsive(20)}px;
  margin-top: ${responsive(20)}px;
  font-weight: 200;
`;

export const GoBackButton = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.primary};
  padding: 20px;
  border-radius: 50px;
  position: absolute;
  top: ${responsive(40)}px;
  left: ${responsive(10)}px;
  shadow-color: ${(props) => props.theme.colors.black};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  elevation: 5;
`;

export const JoinGameButton = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.primary};
  padding: 20px;
  border-radius: 50px;
  position: absolute;
  bottom: ${responsive(20)}px;
  left: ${responsive(20)}px;
  right: ${responsive(20)}px;
  shadow-color: ${(props) => props.theme.colors.black};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  elevation: 5;
`;

export const JoinGameButtonText = styled.Text`
  color: ${(props) => props.theme.colors.white};
  font-size: ${responsive(20)}px;
  text-align: center;
`;

export const JoinedGameButton = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.success};
  padding: ${responsive(20)}px;
  border-radius: ${responsive(50)}px;
  position: absolute;
  bottom: ${responsive(20)}px;
  left: ${responsive(20)}px;
  right: ${responsive(20)}px;
  shadow-color: ${(props) => props.theme.colors.black};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  elevation: 5;
`;

export const StarRatingContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: ${responsive(20)}px;
`;

export const StarRatingLabel = styled.Text`
  font-size: ${responsive(20)}px;
  color: ${(props) => props.theme.colors.black};
  margin-left: ${responsive(10)}px;
  font-weight: 200;
`;

export const DeleteGameButton = styled.TouchableOpacity`
  background-color: red;
  padding: ${responsive(20)}px;
  border-radius: ${responsive(50)}px;
  shadow-color: ${(props) => props.theme.colors.black};
  position: absolute;
  bottom: ${responsive(20)}px;
  left: 50%;
  right: ${responsive(20)}px;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  elevation: 5;
  align-self: center;
`;

export const DeleteGameButtonText = styled.Text`
  color: ${(props) => props.theme.colors.white};
  font-size: ${responsive(16)}px;
  text-align: center;
`;

export const EditGameButton = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.primary};
  padding: ${responsive(20)}px;
  border-radius: ${responsive(50)}px;
  shadow-color: ${(props) => props.theme.colors.black};
  position: absolute;
  bottom: ${responsive(20)}px;
  left: ${responsive(10)}px;
  right: 51%;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  elevation: 5;
  align-self: center;
`;

export const EditGameButtonText = styled.Text`
  color: ${(props) => props.theme.colors.white};
  font-size: ${responsive(16)}px;
  text-align: center;
`;
