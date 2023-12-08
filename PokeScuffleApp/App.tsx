import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { StackNavigator } from "./src/navigations/StackNavigators";
import { StateProvider } from "./src/context/store";

export default function App() {
  return (
    <StateProvider>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </StateProvider>
  );
}
