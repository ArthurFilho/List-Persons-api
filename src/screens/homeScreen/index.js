import { Button, StyleSheet, Text, View } from 'react-native';
import React, { useContext, useEffect } from "react"
import stylesTheme from '../../styles';
import { UserContext } from '../../contexts/userContext';

const HomeScreen  = (props) => {

  const navigation = props.navigation

  const { theme, HandleSearch, characters, languages } = useContext(UserContext)

  const componentStyle = theme ? stylesTheme[theme] : null;

  if (!componentStyle) {
    return null; 
  }

    return (
        <View style={[styles.mainView, componentStyle.theme.mainView]}>
          <Text 
            style={[styles.textStyle, componentStyle.theme.text]}>
            {languages == true ? "Personagens de star wars" : "personage Star Wars"}
          </Text>
          {characters ? (
            characters.map((person) => {
              return (
                <View key={person.created} style={styles.viewButton}>
                  <Button 
                    color={componentStyle.buttonColor} 
                    style={styles.containerCard} 
                    onPress={() => {return (HandleSearch(person.url), navigation.navigate('detailScreen'))}} 
                    title={person.name}
                  />
                </View>
              );
            })
          ) : (
            <Text>Loading...</Text>
          )}
          </View>
        )
}

const styles = StyleSheet.create({
  mainView: {
    padding: 50,
    gap: 10,
  },
  textStyle: {
    fontSize: 35,
    color: 'black',
    marginBottom: 100,
  },
    containerCard: {
    cursor: 'pointer',
    padding: 20,
  },
  viewButton: {
    flex: 1,
    gap: 10,
  },
})


  export default HomeScreen