import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-community/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [typeUsed, setType] = useState("Default");
  const [from_SignUp, setFrom_SignUp] = useState(false); 
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        typeUsed,
        setType,
        from_SignUp,
        setFrom_SignUp,
        login: async (email, password) => {
          try {
            await auth().signInWithEmailAndPassword(email, password);
          } catch (err){
            if(err == "Error: [auth/invalid-email] The email address is badly formatted.")
              alert("The email address is badly formatted.");
            else if(err == "Error: [auth/user-not-found] There is no user record corresponding to this identifier. The user may have been deleted."){
              alert("Email not found.");
            }
            else if(err == "Error: [auth/wrong-password] The password is invalid or the user does not have a password."){
              alert("Invalid password.");
            }
            else
              alert("Something went wrong.");
          }
        },
        googleLogin: async () => {
          try {
            // Get the users ID token
            const { idToken } = await GoogleSignin.signIn();

            // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);

            // Sign-in the user with the credential
            await auth().signInWithCredential(googleCredential)

            .catch(error => {
              alert('Something went wrong with sign up: ', error);
            });
          } catch(error) {
            alert({error});
          }
        },
        fbLogin: async () => {
          try {
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

            // Create a Firebase credential with the AccessToken
            const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

            // Sign-in the user with the credential
            await auth().signInWithCredential(facebookCredential)
            
            .catch(error => {
              alert('Something went wrong with sign up: ', error);
            });
          } catch(error) {
            alert({error});
          }
        },
        register: async (fname, lname, address, email, password, type) => {
          try {
            await auth().createUserWithEmailAndPassword(email, password)
            .then(() => {             
              //Once the user creation has happened successfully, we can add the currentUser into firestore
              //with the appropriate details.
              firestore().collection('users').doc(auth().currentUser.uid)
              .set({
                  fname: fname,
                  lname: lname,
                  address: address,
                  email: email,
                  type: type,
                  createdAt: firestore.Timestamp.fromDate(new Date()),
                  userImg: null,
                  
              })
              //ensure we catch any errors at this stage to advise us if something does go wrong
              .catch(error => {
                  alert('Something went wrong with added user to firestore: ', error);
              })
            })
            //we need to catch the whole sign up process if it fails too.
            .catch(error => {
              console.log(error);
              if(error == "Error: [auth/invalid-email] The email address is badly formatted.")
                alert("The email address is badly formatted.");
              else if(error == "Error: [auth/weak-password] The given password is invalid. [ Password should be at least 6 characters ]")
                alert("Password should be at least 6 characters");
              else if(error == "Error: [auth/email-already-in-use] The email address is already in use by another account.")
                alert("The email address is already in use by another account.");
            });
            setType(type);
            setFrom_SignUp(true);
          } catch (e) {
            alert(e);
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (err) {
            alert(err);
          }
        },
        forget: async (forgot_email) =>{
          try{
            await auth().sendPasswordResetEmail(forgot_email);
            alert("Email with reset password was sent.");
          } catch (err) {
            if(err == "Error: [auth/invalid-email] The email address is badly formatted.")
              alert("The email address is badly formatted.");
            else if(err == "Error: [auth/user-not-found] There is no user record corresponding to this identifier. The user may have been deleted.")
              alert("Email not found.");
            else
              alert("Something went wrong.");
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};