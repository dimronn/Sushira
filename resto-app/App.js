import { NavigationContainer } from "@react-navigation/native";
import { ApolloProvider } from "@apollo/client";
import client from "./apolloconfig";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MainStack from "./src/components/MainStack";
import MenuStack from "./src/components/MenuStack";
import { Entypo } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 

export default function App() {
  const Tab = createBottomTabNavigator();
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Tab.Navigator screenOptions={{
          headerShown:false
        }}>
          <Tab.Screen name="Home" component={MainStack}   options={{
          tabBarIcon: () => (
            <Entypo name="home" color={'black'} size={26} />
          ),
        }}  />
          <Tab.Screen name="Menu" component={MenuStack}  options={{
          tabBarIcon: () => (
           <MaterialIcons name="restaurant-menu" size={26} color="black" />
          ),
        }} />
        </Tab.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
