import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'
import stylesTheme from '../../styles';
import { UserContext } from '../../contexts/userContext';
import axios from 'axios';

const DetailScreen = (props) => {

  const navigation = props.navigation

  const { theme, character, HandleFavorite, favorite, person, SearchPerson, languages } = useContext(UserContext)

  const componentStyle = theme ? stylesTheme[theme] : null;

  const [films, setFilms] = useState([])
  const [homeWorld, setHomeWorld] = useState([])
  const [starShips, setStarShips] = useState([])
  const [species, setSpecies] = useState([])
  
  if (!componentStyle) {
    return null; 
  }

  async function CharacterLoad() {
    axios.get(`${character}`)
    .then((response) => {
      const results = response.data;
      SearchPerson(results);
      })
      .catch((error) => {
        console.error(error);
      });
}

async function FilmsLoad() {
  try {
    const filmPromises = person.films.map(filmUrl => axios.get(filmUrl));
    const filmResponses = await Promise.all(filmPromises);
    const films = filmResponses.map(response => response.data);
    setFilms(films);
  } catch (error) {
    console.error(error);
  }
}

async function HomeWorldLoad() {
  try {
    const response = await axios.get(person.homeworld);
    const homeWorldData = response.data;
    setHomeWorld(homeWorldData);
  } catch (error) {
    console.error(error);
  }
}

async function StarShipsLoad() {
  try {
    const starShipsPromises = person.starships.map(startShipsUrl => axios.get(startShipsUrl));
    const starShipsResponses = await Promise.all(starShipsPromises);
    const starShips = starShipsResponses.map(response => response.data);
    setStarShips(starShips);
  } catch (error) {
    console.error(error);
  }
}

async function SpeciesLoad() {
  try {
    if (person.species && person.species.length > 0) {
      const response = await axios.get(person.species[0]);
      const speciesData = response.data;
      setSpecies(speciesData);
    }
  } catch (error) {
    console.error(error);
  }
}

useEffect(() => {
  CharacterLoad()
},[character])

useEffect(() => {
  if (person.films) {
    FilmsLoad();
    HomeWorldLoad();
    StarShipsLoad();
    SpeciesLoad();
  }
}, [person]);


const isActive = favorite.some((fav) => fav.name === person.name);
const activeState = isActive ? false : true;

  return (
    <View style={[styles.mainView, componentStyle.theme.mainView]}>
      <Text style={[styles.textTittle, componentStyle.theme.text]}>
       {languages == true ? "Detalhes do personagem" : "Details personage"}
      </Text>
      {person.name ? (
      <View>
        <Text 
          style={[styles.textDescription, componentStyle.theme.text]}> 
          {languages == true ? "Nome" : "Name"}: {person.name} 
        </Text>
        <Text 
          style={[styles.textDescription, componentStyle.theme.text]}> 
          {languages == true ? "Nasceu" : "Born"}: {homeWorld == '' ? null : homeWorld.name} 
        </Text>
        {starShips.length == 0 ? null : 
        <Text  
          style={[styles.textDescription, componentStyle.theme.text]}> 
          {languages == true ? "Naves Estelares" : "StarShips"}: 
          {starShips.map((ship) => ship.name).join(', ')} 
        </Text>}
        <Text 
          style={[styles.textDescription, componentStyle.theme.text]}> 
          {languages == true ? "Filmes" : "Films"}: {films.map((film) => film.title).join(', ')} 
        </Text>
        {species.name == 'Droid' ? 
        <Text style={[styles.textDescription, componentStyle.theme.text]}> 
          {languages == true ? "Espécie" : "Species"}: 
          {species.name} 
        </Text> 
        : 
        null } 
        <View style={styles.viewButton}> 
        {languages == true ? 
          <Button 
            onPress={() => HandleFavorite(person)} 
            color={componentStyle.buttonColor} 
            title={activeState ? 'Adicionar aos favoritos' : 'Remover dos favoritos'} 
          /> 
        :
        <Button onPress={() => HandleFavorite(person)} color={componentStyle.buttonColor} title={activeState ? 'Add favorite' : 'Remove favorite'} />
        }
        <Button color={componentStyle.buttonColor} style={styles.containerCard} key={person.url} onPress={() => {return (navigation.navigate('favoriteScreen'))}} title={languages == true ? "Ver pagina" : "See Pages"} />
        </View>
      </View>
    ) : (
      <Text>Loading...</Text> 
    )}
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
  viewButton: {
    gap: 10,
  }
})

export default DetailScreen