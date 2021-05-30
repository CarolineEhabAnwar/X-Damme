import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, FlatList, SafeAreaView, LogBox } from 'react-native';
import { Container, InputGroup, FooterTab, Input, Content, Text, Button, Icon } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import firestore from "@react-native-firebase/firestore";
import { AuthContext } from '../../navigation/AuthProvider';
import MapView from 'react-native-maps';
// import { usePermissions } from 'react-native-use-permissions';
import * as Permissions from 'expo-permissions';
import usePermissions from 'expo-permissions-hooks';
import * as Location from 'expo-location';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import { Circle } from 'react-native-maps';
import * as firebase from "firebase";
import * as GeoFire from 'geofire';


const PingMapScreen = ({ navigation, route }) => {

    const { user } = useContext(AuthContext);

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

    // var geoQuery = geoFireInstance.query({
    //     center: [region.latitude, region.longitude],
    //     radius: 5
    // });

    useEffect(() => {
        Get_Location();
        Get_GeoFire();
        Get_Nearby_Users();
    }, []);

    async function Get_GeoFire() {

        geoFireInstance.get("royXPeuIu0hoz7mD3eRJsXZc1Zq2")
            .then(function (location) {
                if (location === null) {
                    console.log("Provided key is not in GeoFire");
                }
                else {
                    console.log("Provided key has a location of ")
                    console.log(location);
                }
            }, function (error) {
                console.log("Error: " + error);
            });
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
                    geoFireInstance.set(user.uid, [region2.latitude, region2.longitude]).then(function () {
                        console.log("Provided key has been added to GeoFire");
                    }, function (error) {
                        console.log("Error: " + error);
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
                    })
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


    // geoQuery.on("key_moved", function (key, location, distance) {
    //     console.log(key + " moved within query to " + location + " (" + distance + " km from center)");
    //     geoFireInstance.set(user.uid, [location.latitude, location.longitude]).then(function () {
    //         console.log("Location Updated !");
    //     }, function (error) {
    //         console.log("Error: " + error);
    //     });
    // });

    function Get_Nearby_Users() {

        try {

            var geoQuery = geoFire.query({
                center: [region.latitude, region.longitude],
                radius: 10.5
            });

            console.log("These are the nearby user:")
            console.log(geoQuery);

        }
        catch (error) {
            alert(error);
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
            <Content>
                {loading ? <Text style={styles.loadingStyle}> Loading Map... </Text> :
                    <View>
                        <MapView
                            initialRegion={region}
                            showsCompass={true}
                            rotateEnabled={true}
                            showsUserLocation={true}
                            zoomEnabled={true}
                            scrollEnabled={true}
                            zoomTapEnabled={true}
                            showsMyLocationButton={true}
                            style={{ flex: 1, height: 520, margin: 1 }}
                        />
                    </View>

                }
            </Content>
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
    }
});

export default PingMapScreen;
