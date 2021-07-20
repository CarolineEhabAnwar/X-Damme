import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, FlatList} from 'react-native';
import { Container,FooterTab ,Text, Button, Icon } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import firestore from "@react-native-firebase/firestore";
import { AuthContext } from '../../navigation/AuthProvider';
import MapView, { Marker } from 'react-native-maps';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import * as firebase from "firebase";
import GetLocation from 'react-native-get-location';
import { useTranslation } from 'react-i18next';



const PingMapScreen = ({ navigation }) => {

    const { user } = useContext(AuthContext);
    const { t, i18n } = useTranslation();
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

    const [markers, setMarkers] = useState([]);

    function requestLocation() {
        setloading(true);
        GetLocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 150000,
        }).then(location => {
            setRegion({
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.045,
                longitudeDelta: 0.045,
                accuracy: location.accuracy
            })
            setloading(false);
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
      }

    useEffect(() => {
        try {
            requestLocation()
        } catch (error) {
            alert(error);
        }
    }, []);


    async function Ping_Users() {

        try {
            await firestore().collection('Pings').where('Pinger', '==', user.uid)
                .get()
                .then(documentSnapshot => {
                    if (documentSnapshot.docs.length != 0) {
                        documentSnapshot.forEach(document => {
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
                <Text style={{ color: "white", height: 50, fontSize: 20, textAlign: 'center', paddingLeft: '18%', paddingTop: 12, fontWeight: 'bold' }}>{t('UserPingMapScreenText1')}</Text>
            </View>
            <Container >
                {loading ? <Text style={styles.loadingStyle}>{t('UserPingMapScreenText2')}</Text> :
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

                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignSelf: 'center', marginTop: 10, marginLeft: 10 }}>
                                <Button style={styles.buttonStyle} >
                                    <Text style={styles.buttonTextStyle} onPress={() => { Ping_Users() }}>{t('UserPingMapScreenText11')}</Text>
                                </Button>
                                <Button style={styles.buttonStyle} onPress={() => { navigation.navigate("PingRequests") }} >
                                    <Text style={styles.buttonTextStyle}>{t('UserPingMapScreenText3')}</Text>
                                </Button>
                            </View>
                            <View style={{ alignContent: "center", marginLeft:10, alignItems: "center", flexDirection: "row", justifyContent: "center" }}>
                                <Button style={styles.buttonStyle}>
                                    <Text style={styles.buttonTextStyle} onPress={() => { Check_Who_Is_Coming() }}>{t('UserPingMapScreenText4')}</Text>
                                </Button>
                                <Button style={styles.buttonStyle}>
                                    <Text style={styles.buttonTextStyle} onPress={() => { Cancel_Ping() }}>{t('UserPingMapScreenText5')}</Text>
                                </Button>
                            </View>
                        </View>

                        <Container>
                            {loadingUsers ?
                                <Container>
                                    <Text style={{ color: "darkred", alignContent: "center", margin: 5, fontWeight: "bold" }}>{t('UserPingMapScreenText6')}</Text>
                                    <FlatList
                                        data={ComingUsers}
                                        renderItem={({ item }) => {
                                            var coming_users = item.split("/")
                                            return (
                                                <Text style={{ color: "darkred", alignContent: "center", margin: 5 }}>
                                                    {t('UserPingMapScreenText7')} {coming_users[0]} {'\n'}{t('UserPingMapScreenText8')} {coming_users[3]}{t('UserPingMapScreenText9')}  {'\n'}{t('UserPingMapScreenText10')} {coming_users[4]} {'\n'}{'\n'}
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
                        <Text style={{ color: 'white' }}>{t('UserHomeScreenHome')}</Text>
                    </Button>

                    <Button style={{ marginTop: 5 }} onPress={() => navigation.navigate('Profile')}>
                        <Icon name="person" style={{ color: 'white' }} />
                        <Text style={{ color: 'white' }}>{t('UserHomeScreenProfile')}</Text>
                    </Button>

                    <Button style={{ marginTop: 5 }} onPress={() => navigation.navigate('ContactUs')}>
                        <Icon style={{ color: 'white' }} name="call" />
                        <Text style={{ color: 'white' }} >{t('UserHomeScreenContactUs')}</Text>
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
        marginRight: 10,
        width: 190,
        justifyContent: "center"
    },

    buttonTextStyle: {
        fontWeight: 'bold',
        alignSelf: "center"
    },
});

export default PingMapScreen;
