import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './screens/Home';
import Menu from './screens/Menu';
import { Provider } from 'react-redux';
import store from './store';
export default function App() {
  const Tab = createBottomTabNavigator()
  return (
    <Provider store={ store}>


    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Menu" component={Menu} />
        
    </Tab.Navigator>
    </NavigationContainer>
    </Provider>
  );
}


