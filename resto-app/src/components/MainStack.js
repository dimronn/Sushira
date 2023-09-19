
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Details from '../screens/Details';
import Menu from '../screens/Menu';
import MenuFilter from '../screens/MenuFilter';
import Delivery from '../screens/Delivery';




export default function MainStack() {
  const Stack = createNativeStackNavigator()
  return (
    <Stack.Navigator screenOptions={{
          headerShown:false
        }}>
      <Stack.Screen name="Main" component={Home} />
      <Stack.Screen name="MenuMain" component={Menu} />
      <Stack.Screen name="MenuStack" component={Menu} />
      <Stack.Screen name="Details" component={Details} />
      <Stack.Screen name="MenuFilter" component={MenuFilter} />
      <Stack.Screen name="Delivery" component={Delivery} />

    </Stack.Navigator>
  );
}


