import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// screen components
import Login from '../screens/Login/Login';
import Dashboard from '../screens/Dashboard/Dashboard';
import TransactionDetails from '../screens/TransactionDetails';

const screens = [
  {
    name: 'Login',
    component: Login,
  },
  {
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    name: 'TransactionDetails',
    component: TransactionDetails,
  },
];

const Stack = createStackNavigator();

export default function MainStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {screens.map((s) => (
          <Stack.Screen
            name={s.name}
            component={s.component}
            key={s.name}
            options={{
              header: () => null,
            }}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
