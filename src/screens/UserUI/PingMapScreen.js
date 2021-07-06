import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, FlatList, SafeAreaView, LogBox } from 'react-native';
import { Container, InputGroup, FooterTab, Input, Content, Text, Button, Icon } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import firestore from "@react-native-firebase/firestore";
import { AuthContext } from '../../navigation/AuthProvider';
import MapView, { Marker } from 'react-native-maps';
// import { usePermissions } from 'react-native-use-permissions';
import * as Permissions from 'expo-permissions';
import usePermissions from 'expo-permissions-hooks';
import * as Location from 'expo-location';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import { Circle } from 'react-native-maps';
import * as firebase from "firebase";
import * as GeoFire from 'geofire';
import PushNotification from "react-native-push-notification";
import messaging from '@react-native-firebase/messaging';



const PingMapScreen = ({ navigation, route }) => {

    const { user } = useContext(AuthContext);

    const FIREBASE_API_KEY = "AIzaSyAId_oCMqFC-0de24uB002T4TUOnKcLylY";


    const [region, setRegion] = useState({
        region: {
            latitude: 0,
            longitude: 0,
            latitudeDelta: 0.45,
            longitudeDelta: 0.45,
            accuracy: 0
        }
    });
    const [loading, setloading] = useState(true);
    const [ComingUsers, setComingUsers] = useState([]);

    const [loadingUsers, setloadingUsers] = useState(false);
    const [loadingUsers2, setloadingUsers2] = useState(false);

    const [markers, setMarkers] = useState(true);



    var firebaseRef;

    var Tokens = [];

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

    useEffect(() => {
        Call_All_Functions();
    }, []);

    async function Call_All_Functions() {
        await Get_Location();

    }


    async function Get_Location() {
        try {

            const { status, permissions } = await Permissions.askAsync(Permissions.LOCATION);
            let gpsServiceStatus = await Location.hasServicesEnabledAsync();
            if (status === 'granted' && gpsServiceStatus) {
                let location2 = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });

                let region2 = {
                    latitude: location2.coords.latitude,
                    longitude: location2.coords.longitude,
                    latitudeDelta: 0.045,
                    longitudeDelta: 0.045,
                    accuracy: location2.coords.accuracy
                }
                if (region2 != undefined) {
                    setRegion({ ...region, ...region2 });
                    await geoFireInstance.set(user.uid, [region2.latitude, region2.longitude]).then(function () {
                        console.log("Current User Location has been added to GeoFire");
                    }, function (error) {
                        console.log(error);
                    });

                    if (loading)
                        setloading(false);

                }
                else {
                    alert("Region is undefined !")
                }

            }
            else if (gpsServiceStatus != true) {
                RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
                    interval: 10000,
                    fastInterval: 5000,
                })
                    .then((data) => {
                        gpsServiceStatus = true;
                        Location.requestBackgroundPermissionsAsync();
                    }
                    )
                    .catch((err) => {
                        alert("Location is Not Enabled. Please Enable ")

                    });
            }
            else {
                alert("Location Permission is Not Granted !")
            }

        }
        catch (error) {
            alert(error);
        }
    }


    async function Ping_Users() {

        try {
            await firestore().collection('Pings').where('Pinger', '==', user.uid)
                .get()
                .then(documentSnapshot => {
                    if (documentSnapshot.docs.length != 0) {
                        documentSnapshot.forEach(document => {
                            console.log("This is the id of the ping: " + document.id);
                            firestore().collection("Pings").doc(document.id).update({
                                PingerLocation: region,
                                PingTime: firestore.Timestamp.fromDate(new Date()),
                                AcceptedBy: [],
                            });
                            alert("Ping has been updated and Resent successfully.");
                        })
                    }
                    else {
                        firestore().collection("Pings").add({
                            Pinger: user.uid,
                            PingerLocation: region,
                            PingTime: firestore.Timestamp.fromDate(new Date()),
                            AcceptedBy: [],
                        });
                        alert("Ping has been sent successfully.");

                    }
                });
        }

        catch (error) {
            alert(error);
        }
    }

    async function Check_Who_Is_Coming() {
        setloadingUsers(false);
        setloadingUsers2(false);

        try {
            var PingAcceptedBy = [];
            await firestore().collection('Pings').where('Pinger', '==', user.uid)
                .get()
                .then(querySnapshot => {
                    if (querySnapshot.docs.length != 0) {
                        querySnapshot.forEach(documentSnapshot => {
                            PingAcceptedBy = documentSnapshot.data().AcceptedBy;

                        });
                        console.log("Accepted By: ")
                        console.log(PingAcceptedBy)
                    }
                });
            if (PingAcceptedBy.length != 0) {
                setComingUsers(PingAcceptedBy);

                let m = [];

                PingAcceptedBy.forEach(accepter => {
                    let info = accepter.split("/");
                    m.push({
                        latitude: info[1],
                        longitude: info[2],
                        title: info[0],
                        subtitle: info[3] + " Km Away"
                    })
                })
                setMarkers(m);
                console.log("Markers: ")
                console.log(m);
                setloadingUsers(true);
                setloadingUsers2(true);
            }
            else {
                alert("Sorry, no one is coming yet")
            }

        } catch (err) {
            alert(err);
        }
    }

    async function Cancel_Ping() {
        try {
            await firestore()
                .collection('Pings')
                .where('Pinger', '==', user.uid)
                .get()
                .then(function (querySnapshot) {

                    querySnapshot.forEach(function (doc) {
                        doc.ref.delete();
                    });
                    alert('Ping Request Cancelled Successfully !');
                    setloadingUsers(false);
                    setloadingUsers2(false);
                });
        }
        catch (err) {
            alert(err);
        }
    }

    return (
        <Container>
            {/* Text with drawer */}
            <View searchBar style={{ flexDirection: 'row', paddingTop: 25, marginBottom: 0, paddingBottom: 6, alignContent: "center", backgroundColor: "darkred", top: 0 }}>
                <Button transparent onPress={() => navigation.goBack()} >
                    <Ionicons
                        name='arrow-back-outline'
                        style={{ fontSize: 30, marginTop: 4, marginRight: 12, marginLeft: 12, color: 'white' }}
                    />
                </Button>
                <Text style={{ color: "white", height: 50, fontSize: 20, textAlign: 'center', paddingLeft: '18%', paddingTop: 12, fontWeight: 'bold' }}>Ping Nearest Users</Text>
            </View>
            <Container >
                {loading ? <Text style={styles.loadingStyle}> Loading Map... </Text> :
                    <Container >
                        <View style={{ height: 400 }}>
                            <MapView
                                initialRegion={region}
                                showsCompass={true}
                                rotateEnabled={true}
                                showsUserLocation={true}
                                zoomEnabled={true}
                                scrollEnabled={true}
                                zoomTapEnabled={true}
                                showsMyLocationButton={true}
                                style={{ flex: 1, height: 400, margin: 1 }}
                                annotations={markers} >
                                {
                                    loadingUsers2 ? markers.map((mark) => (<Marker coordinate={{
                                        latitude: parseFloat(mark.latitude),
                                        longitude: parseFloat(mark.longitude)
                                    }}
                                        title={mark.title}
                                        description={mark.subtitle}
                                    >

                                    </Marker>)) : null
                                }

                            </MapView>

                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignSelf: 'center', marginTop: 10, marginLeft: 25 }}>
                                <Button style={styles.buttonStyle} >
                                    <Text style={styles.buttonTextStyle} onPress={() => { Ping_Users() }}>Ping Users</Text>
                                </Button>
                                <Button style={styles.buttonStyle} onPress={() => { navigation.navigate("PingRequests") }} >
                                    <Text style={styles.buttonTextStyle}>Ping Requests</Text>
                                </Button>
                            </View>
                            <View style={{ alignContent: "center", margin: 5, alignItems: "center", flexDirection: "row", justifyContent: "center" }}>
                                <Button style={styles.buttonStyle}>
                                    <Text style={styles.buttonTextStyle} onPress={() => { Check_Who_Is_Coming() }}>Check Who's Coming</Text>
                                </Button>
                                <Button style={styles.buttonStyle}>
                                    <Text style={styles.buttonTextStyle} onPress={() => { Cancel_Ping() }}>Cancel Ping Request</Text>
                                </Button>
                            </View>
                        </View>

                        <Container>
                            {loadingUsers ?
                                <Container>
                                    <Text style={{ color: "darkred", alignContent: "center", margin: 5, fontWeight: "bold" }}> Users Coming to Help:  </Text>
                                    <FlatList
                                        data={ComingUsers}
                                        renderItem={({ item }) => {
                                            var coming_users = item.split("/")
                                            return (
                                                <Text style={{ color: "darkred", alignContent: "center", margin: 5 }}>
                                                    User Name: {coming_users[0]} {'\n'}Distance: {coming_users[3]} Km {'\n'}Accepted At: {coming_users[4]} {'\n'}{'\n'}
                                                </Text>);
                                        }}
                                        keyExtractor={(item, index) => index.toString()}
                                    />
                                </Container> : null
                            }
                        </Container>
                    </Container>

                }
            </Container>

            {/* Footer */}
            <View style={{ flexDirection: 'row', alignContent: "center", backgroundColor: "darkred" }}>
                <FooterTab transparent style={{ backgroundColor: "darkred" }}>
                    <Button style={{ marginTop: 5 }} onPress={() => navigation.navigate('Home')}>
                        <Icon style={{ color: 'white' }} name="home" />
                        <Text style={{ color: 'white' }}> Home</Text>
                    </Button>

                    <Button style={{ marginTop: 5 }} onPress={() => navigation.navigate('Profile')}>
                        <Icon name="person" style={{ color: 'white' }} />
                        <Text style={{ color: 'white' }}>Profile</Text>
                    </Button>

                    <Button style={{ marginTop: 5 }} onPress={() => navigation.navigate('ContactUs')}>
                        <Icon style={{ color: 'white' }} name="call" />
                        <Text style={{ color: 'white' }} >Contact Us</Text>
                    </Button>
                </FooterTab>
            </View>
            {/* End Footer */}
        </Container>


    );


}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    loadingStyle: {
        color: 'darkred',
        alignSelf: 'center',
        fontSize: 22,
        textAlignVertical: 'center',
        fontWeight: 'bold',
        marginTop: 220
    },
    buttonStyle: {
        marginTop: 7,
        backgroundColor: 'darkred',
        marginRight: 10
    },

    buttonTextStyle: {
        fontWeight: 'bold'
    },
});

export default PingMapScreen;
