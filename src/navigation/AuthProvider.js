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
import * as RNLocalize from 'react-native-localize'



export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const { t, i18n } = useTranslation();


  i18n.language = RNLocalize.getLocales()[0].languageCode;


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
  const [loading, setloading] = useState(true);
  const [Myaddress, setAddress] = useState();


  var firebaseRef;

  if (!firebase.apps.length) {
    firebaseRef = firebase.initializeApp({
      apiKey: "AIzaSyAId_oCMqFC-0de24uB002T4TUOnKcLylY",                             // Auth / General Use
      appId: "1:717529296732:android:47a522935d497997b95b99",              // General Use
      projectId: "x-damme",               // General Use
      authDomain: "x-damme.firebaseapp.com",         // Auth with popup/redirect
      databaseURL: "https://x-damme-default-rtdb.europe-west1.firebasedatabase.app/", // Realtime Database
      storageBucket: "x-damme.appspot.com",          // Storage
      messagingSenderId: "717529296732",                 // Cloud Messaging
      measurementId: "G-12345"                        // Analytics      
    });
  } else {
    firebaseRef = firebase.app(); // if already initialized, use that one
  }

  const geofire = require('geofire');

  const geoFireInstance = new geofire.GeoFire(firebaseRef.database().ref());


  async function getMyAddress() {

    if (auth().currentUser.uid != null) {

      let addr = await geoFireInstance.get(auth().currentUser.uid);
      setAddress(addr);
      Notifications.registerRemoteNotifications();

      Notifications.events().registerNotificationReceivedForeground((notification: Notification, completion) => {
        completion({ alert: false, sound: false, badge: false });
      });

      Notifications.events().registerNotificationOpened((notification: Notification, completion) => {
        completion();
      });

      AppState.addEventListener('change', state => {
        if (state === 'active' || state === 'background' || state === "inactive" || "") {

          try {
            const subscriber = firestore()
              .collection('Pings')
              .onSnapshot(querySnapshot => {
                const temp_pings = [];

                querySnapshot.forEach(documentSnapshot => {
                  if (documentSnapshot.data()) {
                    temp_pings.push({
                      ...documentSnapshot.data(),
                      key: documentSnapshot.id,
                    });
                  }

                });
                var dateNow = firestore.Timestamp.fromDate(new Date());

                temp_pings.forEach(singleping => {
                  if (0 < dateNow.seconds - singleping.PingTime.seconds < 3601) {

                    let lat1 = addr[0];
                    let lon1 = addr[1];
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

                      Notifications.postLocalNotification({
                        body: t('PingNotificationBody'),
                        title: t('PingNotificationTitle'),
                        sound: 'chime.aiff',
                        category: 'SOME_CATEGORY',
                        link: 'localNotificationLink',
                      });
                      setPings(temp_pings);
                      if (loading)
                        setloading(false);
                    }
                  }

                });
              });

            // Unsubscribe from events when no longer in use
            return () => subscriber();


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
            setType("Waiting");
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