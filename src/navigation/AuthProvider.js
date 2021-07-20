import React, { createContext, useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import { AppState } from "react-native";
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-community/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import messaging from '@react-native-firebase/messaging';
import AppStateListener from "react-native-appstate-listener";
import { Notifications } from 'react-native-notifications';
import * as firebase from "firebase";
import { useTranslation } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import GetLocation from 'react-native-get-location';
import AsyncStorage from '@react-native-async-storage/async-storage';



export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  async function Get_Lang() {
    await AsyncStorage.getItem('Language').then((value) => {
      if (value == null) {
        let default_lang = RNLocalize.getLocales()[0].langaugeCode;
        AsyncStorage.setItem('Language', default_lang);
        return default_lang;
      } else {
        return value;
      }
    });
  }

  const { t, i18n } = useTranslation();
  const [token, setToken] = useState("");

  const [notification, setNotification] = useState({
    title: undefined,
    body: undefined,
    image: undefined,
  });

  const GetToken = async () => {

    messaging().hasPermission()
      .then(() => {

        messaging().getToken()
          .then((currentToken) => {
            if (currentToken) {
              setToken(currentToken);
            }

          })
          .catch(error => {
            alert(t('ApproveNotificationPermission'));
            messaging().requestPermission();
            // If user allow Push Notification
            messaging().getToken().then((currentToken) => {
              if (currentToken) {
                setToken(currentToken);
              };
            });

          }
          ).catch((err) => {
            alert(err);
          });

      })
  };


  const [pings, setPings] = useState([]); // Initial empty array of Reviews


  async function requestLocation() {
    var addr = null;
    await GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 150000,
    }).then(location => {
      addr = location;
    }).catch(ex => {
      const { code, message } = ex;
      console.warn(code, message);
      if (code === 'CANCELLED') {
        alert('Location cancelled by user or by another request');
      }
      if (code === 'UNAVAILABLE') {
        alert('Location service is disabled or unavailable');
      }
      if (code === 'TIMEOUT') {
        alert('Location request timed out');
      }
      if (code === 'UNAUTHORIZED') {
        alert('Authorization denied');
      }
    });
    return addr;
  }

  const Check_Date = (Date_To_Check) => {
    let Duration_In_Millisecond = 3600000;
    let Due_Date = Date_To_Check.toMillis() + Duration_In_Millisecond;
    var dateNow = firestore.Timestamp.fromDate(new Date());

    if (dateNow.toMillis() < Due_Date)
      return true;
    else
      return false;
  }

  const Check_Seen = (ID) => {
    for (let i = 0; i < pings.length; i++) {
      if (pings[i] == ID)
        return true;
    }
    return false;
  }

  async function getMyAddress() {

    if (auth().currentUser != null) {

      Notifications.registerRemoteNotifications();

      Notifications.events().registerNotificationReceivedForeground((completion) => {
        completion({ alert: false, sound: true, badge: false });
      });

      Notifications.events().registerNotificationOpened((completion) => {
        completion();
      });

      AppState.addEventListener('change', async (state) => {
        if (state === 'active' || state === 'background' || state === "inactive" || "") {

          try {
            var User_Type = "Default";
            await firestore().collection("users").doc(auth().currentUser.uid).get().then((Data) => {
              if (Data.exists) {
                User_Type = Data.data().type;
              }
            });
            if (User_Type == "User") {
              const subscriber = firestore()
                .collection('Pings')
                .onSnapshot(async (querySnapshot) => {
                  const temp_pings = [];

                  querySnapshot.forEach(documentSnapshot => {
                    if (documentSnapshot.data()) {
                      temp_pings.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                      });
                    }

                  });

                  let temp_pings_seen = [];
                  var location = await requestLocation();
                  if (location != null) {
                    temp_pings.forEach(singleping => {
                      if (Check_Date(singleping.PingTime) && !(singleping.Pinger == auth().currentUser.uid)) {
                        let lat1 = location.latitude;
                        let lon1 = location.longitude;
                        let lat2 = singleping.PingerLocation.latitude;
                        let lon2 = singleping.PingerLocation.longitude;

                        const R = 6371e3; // metres
                        const φ1 = lat1 * Math.PI / 180; // φ, λ in radians
                        const φ2 = lat2 * Math.PI / 180;
                        const Δφ = (lat2 - lat1) * Math.PI / 180;
                        const Δλ = (lon2 - lon1) * Math.PI / 180;

                        const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
                          Math.cos(φ1) * Math.cos(φ2) *
                          Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
                        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

                        let Distance = parseFloat((R * c) / 1000).toFixed(3); // in km

                        if (Distance < 10) {
                          temp_pings_seen.push(singleping.key);
                          Notifications.postLocalNotification({
                            body: t('PingNotificationBody'),
                            title: t('PingNotificationTitle'),
                            sound: 'chime.aiff',
                            category: 'SOME_CATEGORY',
                            link: 'localNotificationLink',
                          });
                        }
                      }
                      else {
                        firestore().collection('Pings').doc(singleping.key).delete();
                      }
                    });
                    setPings(temp_pings_seen);
                  }
                });

              // Unsubscribe from events when no longer in use
              return () => subscriber();
            }
          } catch (error) {
            alert(error);
          }

        }
      });

    }
  }

  useEffect(() => {

    getMyAddress();


    GetToken();
    messaging().onMessage(async remoteMessage => {
      setNotification({
        title: remoteMessage.notification.title,
        body: remoteMessage.notification.body,
        image: remoteMessage.notification.android.imageUrl,
      });
    });

    messaging().onNotificationOpenedApp(remoteMessage => {
      setNotification({
        title: remoteMessage.notification.title,
        body: remoteMessage.notification.body,
        image: remoteMessage.notification.android.imageUrl,
      });
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          setNotification({
            title: remoteMessage.notification.title,
            body: remoteMessage.notification.body,
            image: remoteMessage.notification.android.imageUrl,
          });
        }
      });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
    });

  }, []);



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
            await setType("Waiting");
            await auth().signInWithEmailAndPassword(email, password).then(async () => {
              const TypeReturned = await firestore().collection('users').doc(auth().currentUser.uid).get();
              setType(TypeReturned.data().type);
            })
          } catch (err) {
            if (err == "Error: [auth/invalid-email] The email address is badly formatted.")
              alert(t('EmailBadFormat'));
            else if (err == "Error: [auth/user-not-found] There is no user record corresponding to this identifier. The user may have been deleted.") {
              alert(t('EmailNotFound'));
            }
            else if (err == "Error: [auth/wrong-password] The password is invalid or the user does not have a password.") {
              alert(t('InvalidPassword'));
            }
            else
              alert(err);
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
                alert(t('SomethingWrongwithSignUp'), error);
              });
          } catch (error) {
            alert({ error });
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
                alert(t('SomethingWrongwithSignUp'), error);
              });
          } catch (error) {
            alert({ error });
          }
        },
        register: async (fname, lname, address, email, password, type, cart, requests) => {
          try {
            let empty_arr = [];
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
                    cart: cart,
                    requests: requests,
                    requestHistory: empty_arr,
                    Token: token
                  })
                  //ensure we catch any errors at this stage to advise us if something does go wrong
                  .catch(error => {
                    alert(t('FirebaseSomethingWrongWithSignUp'), error);
                  })
              })
              //we need to catch the whole sign up process if it fails too.
              .catch(error => {
                if (error == "Error: [auth/invalid-email] The email address is badly formatted.")
                  alert(t('EmailBadFormat'));
                else if (error == "Error: [auth/weak-password] The given password is invalid. [ Password should be at least 6 characters ]")
                  alert(t('ShortPassword'));
                else if (error == "Error: [auth/email-already-in-use] The email address is already in use by another account.")
                  alert(t('EmailAlreadyExists'));
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
        forget: async (forgot_email) => {
          try {
            await auth().sendPasswordResetEmail(forgot_email);
            alert(t('ResetPasswordEmail'));
          } catch (err) {
            if (err == "Error: [auth/invalid-email] The email address is badly formatted.")
              alert(t('EmailBadFormat'));
            else if (err == "Error: [auth/user-not-found] There is no user record corresponding to this identifier. The user may have been deleted.")
              alert(t('EmailNotFound'));
            else
              alert(t('SomethingWentWrong'));
          }
        },
        getType: async () => {
          try {
            var TypeReturned = firestore().collection('users').doc(auth().currentUser.uid).get('type').catch(error => {
              alert(t('FirebaseSomethingWrongWithSignUp'), error)
            });
            setType(TypeReturned);
          } catch (err) {
            alert(err);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};