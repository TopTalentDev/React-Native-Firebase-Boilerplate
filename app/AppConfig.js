import { StyleSheet } from 'react-native';
import NativeTachyons from 'react-native-style-tachyons';
import colors from './theme/colors';
import fonts from './theme/fonts';

export const runAppConfiguration = () => {
  NativeTachyons.build(
    {
      colors: {
        palette: colors
      },
      fonts: fonts
    },
    StyleSheet
  );
};
