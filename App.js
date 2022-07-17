import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import app from './firebasSetup';
import {
  getAuth,
  signInWithCredential,
  FacebookAuthProvider,
} from 'firebase/auth';

export default function App() {

  const signInWithFB = async () => {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }
    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();
    if (!data) {
      throw 'Something went wrong obtaining access token';
    }
    
    const auth = getAuth(app);

    // Create a Firebase credential with the AccessToken
    const facebookAuthProvider = FacebookAuthProvider.credential(data.accessToken);
    // console.log("provider ",facebookAuthProvider);
    // const credential = facebookAuthProvider.credential(data.accessToken);
    // Sign-in with credential from the Facebook user.
    signInWithCredential(auth, facebookAuthProvider)
    .then(() => {

    })
    .catch(error => {
      // Handle Errors here.]
      console.log(error);
    });


  }

  return (
    <View style={styles.container}>
        <Button title="Sign In With FB" onPress={signInWithFB}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
