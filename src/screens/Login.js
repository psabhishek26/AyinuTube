import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { googleAuth, auth } from "../services/Firebase";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../services/UserContext";

const Login = () => {
  const navigation = useNavigation();
  const { setUser } = useUser();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        setUser(user);
        setLoading(false);
        navigation.replace("Home");
      }
    });

    return unsubscribe;
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      await auth.signInWithPopup(googleAuth);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AyinuTube</Text>
      {loading ? (
        <ActivityIndicator size="large" color={"#f80204"} />
      ) : (
        <Pressable onPress={handleGoogleSignIn}>
          <View style={{ backgroundColor: "#f80204", borderRadius: 50 }}>
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
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
    marginBottom: 50,
  },
  buttonTitle: {
    color: "white",
    padding: 10,
    fontSize: 20,
  },
});

export default Login;
