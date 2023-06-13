import axios from "axios";
import { useEffect, useState } from "react";
import { createContext } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = createContext({setUser: null})

export const UserProvider = ({ children }) => {

  const [theme, setThemeStyle] = useState('light')

  const [languages, SetLanguage] = useState(true)

  const [character, setCharacter] = useState();

  const [favorite, setFavorite] = useState([]);

  const [active, setActive] = useState({});

  const [characters, setCharacters] = useState([]);

  const [person, setPerson] = useState({});

  async function PersoLoad() {
    axios.get(`https://swapi.dev/api/people/`)
      .then((response) => {
        const results = response.data.results;
        setCharacters(results);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function SearchPerson(url) {
    setPerson(url)
  } 

  function HandleSearch (url) {
    setCharacter(url)
  }

  function ButtonChangeTheme () {
    setThemeStyle((currentTheme) => {
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      handleThemeSettingsAsyncStorage(newTheme);
      return newTheme;
    });
  }

  function ButtonChangeLanguage () {
    SetLanguage(l => !l)
    handleLanguageSettingsAsyncStorage()
  }

  async function handleLanguageSettingsAsyncStorage() {
    try {
      await AsyncStorage.setItem("@Language", languages);
    } catch (error) {
      console.error(error);
    }
  }
  
  async function getDataLanguageSettings() {
    try {
      const response = await AsyncStorage.getItem("@Language");
      if (response) {
        SetLanguage(response);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleThemeSettingsAsyncStorage(newTheme) {
    try {
      await AsyncStorage.setItem("@Theme", newTheme);
    } catch (error) {
      console.error(error);
    }
  }
  
  async function getDataThemeSettings() {
    try {
      const response = await AsyncStorage.getItem("@Theme");
      if (response) {
        setThemeStyle(response);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleFavoriteAsyncStorage(newFavorite) {
    try {
      await AsyncStorage.setItem("@Favorite1", JSON.stringify(newFavorite));
    } catch (error) {
      console.error(error);
    }
  }
  
  async function getDataFavorite() {
    try {
      const response = await AsyncStorage.getItem("@Favorite1");
      if (response) {
        setFavorite(JSON.parse(response));
      }
    } catch (error) {
      console.error(error);
    }
  }

  function HandleFavorite(fav) {
    const index = favorite.findIndex((item) => item.name === fav.name);
  
    if (index === -1) {
      const newFavorite = [...favorite, fav];
      setFavorite(newFavorite);
      setActive((prevState) => ({ ...prevState, [fav.name]: true }));
      handleFavoriteAsyncStorage(newFavorite);
    } else {
      const updatedFavorites = [...favorite];
      updatedFavorites.splice(index, 1);
      setFavorite(updatedFavorites);
      setActive((prevState) => {
        const updatedActive = { ...prevState };
        delete updatedActive[fav.name];
        return updatedActive;
      });
      handleFavoriteAsyncStorage(updatedFavorites);
    }
  }

  useEffect(() => {
    PersoLoad();
    getDataThemeSettings();
    getDataFavorite();
    getDataLanguageSettings();
  },[]);

  const userContextValue = {
    character,
    theme,
    ButtonChangeTheme,
    HandleSearch,
    favorite,
    HandleFavorite,
    active,
    characters,
    person,
    SearchPerson,
    ButtonChangeLanguage,
    languages,
  };

  return (
    <UserContext.Provider  value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
};