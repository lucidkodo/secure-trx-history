import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// screen components
import Login from '../screens/Login/Login';
import Dashboard from '../screens/Dashboard/Dashboard';
import TransactionDetails from '../screens/TransactionDetails';

const Stack = createStackNavigator();

export default function MainStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="TransactionDetails"
          component={TransactionDetails}
          options={{ headerTitle: '', headerBackTitleVisible: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
