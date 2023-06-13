import { useContext } from "react";
import { StyleSheet, View, Button } from "react-native";
import { UserContext } from "../../contexts/userContext";
import stylesTheme from "../../styles";

const ThemeScreen = () => {

  const { theme, ButtonChangeTheme, languages } = useContext(UserContext)

  const componentStyle = theme ? stylesTheme[theme] : null;

  if (!componentStyle) {
    return null; 
  }
  return (
    <>
      <View style={[componentStyle.theme.mainView, styles.checkBoxComponent]}>
        <Button color={componentStyle.buttonColor} onPress={() => ButtonChangeTheme()} title={languages == true ? 'Tema da página' : 'Theme page'} />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
    checkBoxComponent:{
    marginTop: 10,
  }
})


export default ThemeScreen