import React, { useContext, useEffect } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import stylesTheme from '../../styles';
import { UserContext } from '../../contexts/userContext';
import { Clipboard } from '@phosphor-icons/react';


const favoriteScreen = () => {

  const { theme, favorite, languages } = useContext(UserContext)

  const componentStyle = theme ? stylesTheme[theme] : null;

  if (!componentStyle) {
    return null; 
  }

  return (
    <View style={[componentStyle.theme.mainView, styles.mainView]}>
      <Text 
        style={[componentStyle.theme.text, styles.textTittle]}> 
        {languages == true ? "Personagens Favorito" : "Personage Favorite"} 
      </Text>

      {favorite.length == 0 ? 
        <View style={styles.favView}>
          <Text 
            style={[componentStyle.theme.text, styles.textDescription]}> 
            {languages == true ? "Nenhum favorito encontrado" : "Not found none personage"} 
          </Text>
          <Clipboard size={100} style={componentStyle.theme.text} />
        </View>
        :
        favorite.map((fav)=> { return(
          <View key={fav.name}>
            <Text style={[componentStyle.theme.text, styles.textDescription]}> {fav.name} </Text>
          </View>)})
        }
    </View>
  )
}

const styles = StyleSheet.create({
  mainView: {
    alignItems: 'center',
    padding: 50,
  },
  textTittle: {
    fontSize: 35,
    marginBottom: 20,
  },
  textDescription: {
    fontSize: 20,
  },
  favView: {
    flexDirection: 'column',
    alignItems: 'center'
  }
})

export default favoriteScreen