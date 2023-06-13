import { StatusBar, TouchableOpacity, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import DetailScreen from './src/screens/detailScreen'
import { UserProvider } from './src/contexts/userContext'
import SearchScreen from './src/screens/searchScreen'
import FavoriteScreen from './src/screens/favoritesScreen'
import SettingScreen from './src/screens/settingsScreen'
import HomeScreen from './src/screens/homeScreen'
import { GearSix, Heart, MagnifyingGlass } from '@phosphor-icons/react'

const Stack = createNativeStackNavigator()



export default function App() {
  
  const HeaderRight = () => {
    const navigation = useNavigation();
  
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          style={{ marginRight: 20 }}
          onPress={() => navigation.navigate('favoriteScreen')}
        >
          <Heart name="settings" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginRight: 20 }}
          onPress={() => navigation.navigate('searchScreen')}
        >
          <MagnifyingGlass name="heart" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginRight: 100 }}
          onPress={() => navigation.navigate('settingScreen')}
        >
          <GearSix name="search" size={24} color="black" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <UserProvider>
    <NavigationContainer>
    <Stack.Navigator
          screenOptions={{
            headerRight: () => <HeaderRight />,
          }}
          initialRouteName="homeScreen"
        >
        <Stack.Screen name="homeScreen" component={HomeScreen} />
        <Stack.Screen name="detailScreen" component={DetailScreen} />
        <Stack.Screen name="searchScreen" component={SearchScreen} />
        <Stack.Screen name="favoriteScreen" component={FavoriteScreen} />
        <Stack.Screen name="settingScreen" component={SettingScreen}  />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
    </UserProvider>
  )
}