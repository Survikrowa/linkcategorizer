import { Dimensions, StatusBar } from 'react-native';

export const getDimensionsProps = () => {
  const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');
  const { width: windowWidth, height: windowHeight } = Dimensions.get('window');
  const currentStatusHeight = StatusBar?.currentHeight ?? 0;
  const navbarHeight = screenHeight - windowHeight + currentStatusHeight;

  return {
    screenWidth,
    screenHeight,
    windowWidth,
    windowHeight,
    navbarHeight,
  };
};
