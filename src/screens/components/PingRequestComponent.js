import React, { Component, useState, useEffect, useContext } from 'react';
import firestore from '@react-native-firebase/firestore';
import { StyleSheet, View, Image, Linking } from 'react-native';
import { Card, CardItem, Text, Button, Icon, Left, Content, Body, Right } from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import { AuthContext } from '../../navigation/AuthProvider';
import { useNavigation } from '@react-navigation/native';
import { Rating } from 'react-native-ratings';
import Moment from 'moment';
import { useReducer } from 'react';
import * as firebase from "firebase";



const PingRequestComponent = (props) => {

    const navigation = useNavigation();

    const [Pinger_Name, setPinger_name] = useState("");
    const [My_Name, setMy_name] = useState("");
    const [locationURL, setlocationURL] = useState("");
    const [address, setMy_Address] = useState("");
    const [distance, set_Distance] = useState("");
    const { user } = useContext(AuthContext);

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

    useEffect(() => {
        get_Pinger_Name();
        Get_Location();
    }, []);


    async function Get_Location() {
        let Myaddress;
        let Myname;
        try {
            if (user.uid != null) {
                firestore()
                    .collection('users')
                    .doc(user.uid)
                    .onSnapshot(documentSnapshot => {
                        if (documentSnapshot.exists) {
                            setMy_name(documentSnapshot.data().fname + " " + documentSnapshot.data().lname);
                            Myname = documentSnapshot.data().fname + " " + documentSnapshot.data().lname;
                        }
                    });
                const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
                const latLng = `${props.pingerLat}, ${props.pingerLng}`;
                const label = 'Custom Label';
                const url = Platform.select({
                    ios: `${scheme}${label}@${latLng}`,
                    android: `${scheme} ${latLng} (${label})`
                });
                setlocationURL(url);
                Myaddress = await geoFireInstance.get(user.uid);
                setMy_Address(Myaddress);
                let lat1 = Myaddress[0];
                let lon1 = Myaddress[1];
                let lat2 = props.pingerLat;
                let lon2 = props.pingerLng;
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
                set_Distance(Distance);
            }
        } catch (error) {
            alert(error);
        }

    }

    async function get_Pinger_Name() {
        try {
            if (props.pingerID != null) {
                const subscriber = firestore()
                    .collection('users')
                    .doc(props.pingerID)
                    .onSnapshot(documentSnapshot => {
                        if (documentSnapshot.exists) {
                            setPinger_name(documentSnapshot.data().fname + " " + documentSnapshot.data().lname);
                        }
                    });
                // Stop listening for updates when no longer required
                return () => subscriber();
            }
        } catch (error) {
            alert(error);
        }
    }

    return (
        <Content>
            <View style={{ borderColor: "darkred", borderWidth: 2, marginVertical: 5 }}>
                <Text style={styles.title}>Pinger:  </Text>
                <Text style={styles.writing}> {Pinger_Name} </Text>
                <Text style={styles.title}>Pinger Distance From You:  </Text>
                <Text style={styles.writing}> {distance} Kilometers </Text>
                <Text style={styles.title}>Ping Time: </Text>
                <Text style={styles.writing}> {props.pingTime} </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignSelf: 'center', marginVertical: 10 }}>
                    <Button style={styles.buttonStyle}
                        onPress={async () => {
                            var accept = My_Name + "/" + address[0] + "/" + address[1] + "/" + distance + "/" + firestore.Timestamp.fromDate(new Date()).toDate().toString();
                            var temp_acceptedBy = props.acceptedBy;
                            var index = 0;
                            temp_acceptedBy.forEach(function callback(item, i) {
                                info = item.split("/");
                                info2 = accept.split("/");
                                if (info[0] == info2[0] && info[1] == info2[1] && info[2] == info2[2]) {
                                    index = i
                                }
                            })
                            temp_acceptedBy.splice(index, 1);
                            temp_acceptedBy.push(accept);
                            await firestore().collection("Pings").doc(props.pingID).update({
                                AcceptedBy: temp_acceptedBy
                            });
                            Linking.openURL(locationURL);
                        }}>
                        <Text style={styles.buttonTextStyle}>Accept</Text>
                    </Button>
                </View>
            </View>
        </Content >
    );
}

const styles = StyleSheet.create({
    textStyle: {
        marginTop: 16,
        fontSize: 15,
        marginLeft: 8,
        fontWeight: 'bold',
        color: 'black'
    },

    cartItemStyle: {
        marginTop: -23,
        marginBottom: -10,
        marginRight: 3
    },
    rateStyle: {
        marginTop: -23,
        marginBottom: -9,
        marginRight: 3,
        fontSize: 16,
        marginLeft: 0,
        fontWeight: 'bold',
        color: 'black'
    },
    writing: {
        marginHorizontal: 15,
        marginVertical: 10,
        fontSize: 17,
        fontWeight: "bold"
    },

    textStyles: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        textShadowColor: 'red',
        textShadowRadius: 1.5,
        textShadowOffset: {
            width: 0.5,
            height: 0.5
        },
    },

    itemsTextStyle: {
        fontSize: 19,
        marginBottom: 10,
        fontWeight: 'bold',
    },

    buttonStyle: {
        marginTop: 7,
        backgroundColor: 'darkred',
        marginRight: 10
    },

    buttonTextStyle: {
        fontWeight: 'bold'
    },
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",
    },
    reviewContainer: {
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        paddingHorizontal: 50,
        left: 20,
        paddingVertical: 0,
        minWidth: "80%",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 1.0,
        shadowRadius: 2,
        shadowColor: "rgba(193, 211, 251, 0.5)",
        elevation: 5,
    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
        color: "darkred",
        textAlign: "left",
        fontWeight: 'bold',
        marginLeft: 10
    },
    totalWrap: {
        marginTop: 2,
        marginBottom: 5,
        backgroundColor: "#FFFFFF",
        borderRadius: 40,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    amountText: {
        fontSize: 16,
        color: "darkred",
        textAlign: "center",
        fontWeight: 'bold',

    },
    howWeCalculate: {
        fontSize: 18,
        color: "darkred",
        textAlign: "center",
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 5,

    },
    spacer: {
        marginBottom: 14,
    },
    progressText: {
        width: 50,
        fontSize: 14,
        fontWeight: 'bold',
        color: "darkred",
    },
    progressPercentText: {
        width: 40, fontSize: 14, color: "darkred", fontWeight: 'bold',
    },
    progressMiddle: {
        height: 15,
        flex: 1,
        marginHorizontal: 10,
    },
    progressWrap: {
        backgroundColor: "#F5F8FF",
        borderRadius: 18,
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        padding: 2,
    },
    progressBar: {
        flex: 1,
        shadowOffset: { width: 0, height: 0 },
        shadowColor: "#ffcc48",
        shadowOpacity: 1.0,
        shadowRadius: 4,
        backgroundColor: "#FFCC48",
        borderRadius: 18,
        minWidth: 5,
    },
})

export default PingRequestComponent;
