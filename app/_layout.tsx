import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider
} from "@react-navigation/native";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChoiceScreen from "./screens/Choice";
import HomeScreen from "./screens/Home";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  
  const Stack = createNativeStackNavigator();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" options={{headerShown:false}} component={HomeScreen}/>
          <Stack.Screen name="Choice" options={{headerShown:false}} component={ChoiceScreen}/>
        </Stack.Navigator>
    </ThemeProvider>
  );
}
