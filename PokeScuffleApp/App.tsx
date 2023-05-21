import Atlas from './src/components/screens/AtlasScreen';
import { createStackNavigator } from '@react-navigation/stack';

// Create a stack navigator
const Stack = createStackNavigator();

export default function App() {
  return (
    <Atlas />
  );
}

