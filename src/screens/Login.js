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
import database from "@react-native-firebase/database";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../services/UserContext";

const Login = () => {
  const navigation = useNavigation();
  const { setUser, setGoogleId } = useUser();
  const [loading, setLoading] = useState(true);

  GoogleSignin.configure({
    webClientId: process.env.EXPO_PUBLIC_FIREBASE_WEB_CLIENT_ID,
  });

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      setLoading(false);
      if (user) {
        setGoogleId(user);
        setUser(fetchUserData(user));
        navigation.replace("Home");
      }
    });

    return unsubscribe;
  }, []);

  const userIdGen = (user) => {
    const emailPrefix = user.email.split("@")[0].replace(/[^a-zA-Z0-9]/g, "");
    return emailPrefix + user.uid;
  };

  const fetchUserData = async (user) => {
    const userId = userIdGen(user);
    const userRef = database().ref(`/users/${userId}`);
    const snapshot = await userRef.once("value");
    return snapshot.val();
  };

  const insertUserData = async (user) => {
    const fetchedData = await fetchUserData(user);
    let userData;
    if (!fetchedData) {
      userData = {
        email: user.email,
        displayName: user.displayName,
        uid: user.uid,
        totalViews: 0,
        totalLikes: 0,
        totalDislikes: 0,
        totalShares: 0,
        totalVideos: 0,
        subscribeCount: 0,
      };
      setUser(userData);
      await database().ref(`/users/${userId}`).set(userData);
    } else {
      setUser(fetchedData);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      const userCredential = await auth().signInWithCredential(
        googleCredential
      );
      const user = userCredential.user;
      await insertUserData(user);
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
