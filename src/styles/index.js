import { StyleSheet } from "react-native" 

const stylesTheme = StyleSheet.create({
  dark: {
    theme: {
      mainView: {
        flex: 1,
        backgroundColor: 'black',
      },
      text: {
        color: 'white',
      },
    },
    buttonColor: 'gray',
  },
  light: {
    theme: {
      mainView: {
        flex: 1,
        backgroundColor: 'white',
      },
      text: {
        color: 'black',
      },
    },
    buttonColor: 'black',
  },
});

export default stylesTheme;