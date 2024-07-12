import { StyleSheet, View, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { UserProvider } from "./src/services/UserContext";
import { AppProvider } from "./src/services/AppContext";
import YtPlay from "./src/screens/YtPlay";
import YtHome from "./src/screens/YtHome";
import Login from "./src/screens/Login";
import About from "./src/screens/About";
import Search from "./src/screens/Search";
import Upload from "./src/screens/Upload";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <AppProvider>
        <View style={styles.container}>
          <StatusBar backgroundColor={"#0f0f0f"} />
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Login"
              screenOptions={{
                headerShown: false,
                headerStyle: {
                  backgroundColor: "#1a1a1a",
                },
                headerTintColor: "#fff",
              }}
            >
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Home" component={YtHome} />
              <Stack.Screen name="Video" component={YtPlay} />
              <Stack.Screen
                name="About"
                component={About}
                options={{ headerShown: true }}
              />
              <Stack.Screen name="Search" component={Search} />
              <Stack.Screen
                name="Upload"
                component={Upload}
                options={{ headerShown: true }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </AppProvider>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
