import React, { useContext } from 'react'
import { StyleSheet, View, TextInput, Button, Text } from 'react-native';
import stylesTheme from '../../styles';
import { UserContext } from '../../contexts/userContext';
import { useState } from 'react';

const SearchScreen = (props) => {

  const navigation = props.navigation

  const { theme, characters, HandleSearch, languages } = useContext(UserContext)

  const [searchValue, setSearchValue] = useState();
  const [searchResult, setSearchResult] = useState([]);

  const componentStyle = theme ? stylesTheme[theme] : null;

  if (!componentStyle) {
    return null; 
  }

  const getCharacterByName = (name) => {
    const lowercaseName = name.toLowerCase();
    const results = characters.filter((character) =>
      character.name.toLowerCase().includes(lowercaseName)
    );
    setSearchResult(results);
  };

  return (
    <View style={[styles.mainView, componentStyle.theme.mainView]}>
      <TextInput 
        onChangeText={(text) => setSearchValue(text)} 
        style={[styles.textInput, componentStyle.theme.text]} 
        placeholder={languages == true ? "O que voce quer encontrar?" : "What do you want find?"} 
      />
    
      <Button
        color={componentStyle.buttonColor} 
        title={languages == true ? "Buscar" : "Search"} onPress={() => getCharacterByName(searchValue)} 
      />

      {searchResult.length > 0 ? (
        searchResult.map((character) => (
          <View style={styles.resultMain} key={character.name}>
            <Text style={componentStyle.theme.text}>{languages == true ? "Personagem encontrado" : "Personage found"}:</Text>
            <Text style={componentStyle.theme.text}>{languages == true ? "Nome" : "Name"}: {character.name}</Text>
            <Text style={componentStyle.theme.text}>{languages == true ? "Idade" : "old"}: {character.birth_year}</Text>
            <Button 
              color={componentStyle.buttonColor} 
              style={styles.containerCard} 
              onPress={() => {return (HandleSearch(character.url), navigation.navigate('detailScreen'))}} 
              title={languages == true ? "Detalhes do personagem" : "Details personage"} 
            />
          </View>
        ))
      ) : (
        <Text>{languages == true ? "Nenhum personagem encontrado." : "None personage found."}</Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    height: 35,
    padding: 5,
    marginBottom: 30,
  },
  mainView: {
    padding: 50,
  },
  resultMain: {
    marginTop: 100,
    padding: 50,
  },
})

export default SearchScreen