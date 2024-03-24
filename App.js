import { StyleSheet, View, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import YtPlay from "./src/screens/YtPlay";
import YtHome from "./src/screens/YtHome";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#0f0f0f'}/>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Home" component={YtHome} />
          <Stack.Screen name="Video" component={YtPlay} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
