import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../services/UserContext";

const Login = () => {
  const navigation = useNavigation();
  const { setUser } = useUser();
  const [loading, setLoading] = useState(true);

  GoogleSignin.configure({
    webClientId: process.env.EXPO_PUBLIC_FIREBASE_WEB_CLIENT_ID,
  });

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      setLoading(false);
      if (user) {
        setUser(user);
        navigation.replace("Home");
      }
    });

    return unsubscribe;
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.title}>Ayinu</Text>
        <Text style={styles.hubTheme}>Tube</Text>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color={"#f7971d"} />
      ) : (
        <Pressable onPress={handleGoogleSignIn}>
          <View style={{ backgroundColor: "#f7971d", borderRadius: 5 }}>
            <Text style={styles.buttonTitle}>Sign in with Google</Text>
          </View>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0f0f0f",
  },
  title: {
    fontSize: 60,
    fontWeight: "bold",
    color: "white",
    marginBottom: 50,
  },
  hubTheme: {
    color: "black",
    backgroundColor: "#f7971d",
    fontSize: 60,
    borderRadius: 5,
    padding: 3,
    fontWeight: "600",
    marginTop: 3,
    height: 90,
  },
  buttonTitle: {
    color: "black",
    padding: 10,
    fontSize: 20,
  },
});

export default Login;
