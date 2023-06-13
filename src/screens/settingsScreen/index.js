import React, { useContext, useState } from 'react'
import { StyleSheet, Text, View, Button} from 'react-native'
import ThemeScreen from '../../component/theme'
import stylesTheme from '../../styles'
import { UserContext } from '../../contexts/userContext'

const settingScreen = () => {

  const { theme, languages, ButtonChangeLanguage } = useContext(UserContext)

  const componentStyle = theme ? stylesTheme[theme] : null;

  if (!componentStyle) {
    return null; 
  }

  return (
    <View style={[styles.mainView, componentStyle.theme.mainView]}>
      <Text style={[styles.textTittle, componentStyle.theme.text]}>{languages == true ? 'Configurações' : 'Settings'}</Text>
      <View style={styles.buttonsContainer}>
      <ThemeScreen />
        <Button
          title={languages == true ? 'Inglês' : 'Português'}
          color={componentStyle.buttonColor}
          onPress={() => ButtonChangeLanguage()}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainView: {
    justifyContent: 'center',
    padding: 50
  },
  textTittle: {
    fontSize: 35,
    marginBottom: 20,
  },
  buttonsContainer: {
    gap: 10,
  },
})

export default settingScreen