
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Details from '../screens/Details';
import Menu from '../screens/Menu';
import MenuFilter from '../screens/MenuFilter';




export default function MenuStack() {
  const Stack = createNativeStackNavigator()
  return (
    <Stack.Navigator screenOptions={{
          headerShown:false
        }}>
        <Stack.Screen name="MenuStack" component={Menu} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="MenuFilter" component={MenuFilter} />
    </Stack.Navigator>
  );
}


