import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, FlatList, Modal, LogBox } from 'react-native';
import { Container, Picker, Form, Item, InputGroup, FooterTab, Input, Content, Text, Button, Icon } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import firestore from "@react-native-firebase/firestore";
import HospitalComponent from '../components/HospitalComponent';
import { AuthContext } from '../../navigation/AuthProvider';
import GetLocation from 'react-native-get-location';

const NearbyHospitalsScreen = ({ navigation }) => {

    //Setting the Model Visible
    const { user } = useContext(AuthContext);
    const [loading, setloading] = useState(true);
    const [AllHospitalsList, setAllHospitalsList] = useState([]);
    const [NearbyHospitalsList, setNearbyHospitalsList] = useState([]);
    const [ForCurrent, setForCurrent] = useState(false);
    const [Address, setAddress] = useState([])
    const [location, setCurrentLocation] = useState(null);

    const LoadUP = async () => {
        setloading(true);

        let temp = [];
        await firestore().collection("Hospitals").get().then((Docs) => {
            for (let i = 0; i < Docs.docs.length; i++) {
                temp.push({ ...Docs.docs[i].data(), key: Docs.docs[i].id, distance: -1 });
            }
            setAllHospitalsList(temp);
            setNearbyHospitalsList(temp);
        });

        let temp_address
        await firestore().collection("users").doc(user.uid).get().then((Data) => {
            if (Data.exists) {
                temp_address = { lat: Data.data().address[3].split(":")[1], lon: Data.data().address[4].split(":")[1] };
                setAddress(temp_address);
            }
        })

        Calulate_Distance_For_Each(temp, temp_address);

        setloading(false);
    }

    const Calulate_Distance_For_Each = (hospitals, address) => {
        for (let i = 0; i < hospitals.length; i++) {
            let lat1 = address.lat;
            let lon1 = address.lon;
            let lat2 = hospitals[i].Location[0];
            let lon2 = hospitals[i].Location[1];
            const R = 6371e3; // metres
            const φ1 = lat1 * Math.PI / 180; // φ, λ in radians
            const φ2 = lat2 * Math.PI / 180;
            const Δφ = (lat2 - lat1) * Math.PI / 180;
            const Δλ = (lon2 - lon1) * Math.PI / 180;

            const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

            hospitals[i].distance = R * c; // in metres
        }

        Show_Near_Hospitals(hospitals, address);
    }

    const requestLocation = async () => {
        setCurrentLocation(null);
        setloading(true);

        await GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 150000,
        }).then(location => {
            setCurrentLocation(Process_Location(location));
            Calulate_Distance_For_Each(AllHospitalsList, Process_Location(location))
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
            setCurrentLocation(null);
        });

        setloading(false);
    }

    const Process_Location = (location) => {
        return { lat: location.latitude, lon: location.longitude };
    }

    const Show_Near_Hospitals = (hospitals) => {
        let temp_All_H = hospitals;
        var len = temp_All_H.length;
        for (var i = len-1; i>=0; i--){
          for(var j = 1; j<=i; j++){
            if(temp_All_H[j-1].distance>temp_All_H[j].distance){
                var temp = temp_All_H[j-1];
                temp_All_H[j-1] = temp_All_H[j];
                temp_All_H[j] = temp;
             }
          }
        }
        setNearbyHospitalsList(temp_All_H);
    }

    useEffect(() => {
        try {
            LoadUP()
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <Container>
            {/* Text with navback */}
            <View searchBar style={{ flexDirection: 'row', paddingTop: 25, marginBottom: 12, paddingBottom: 6, alignContent: "center", backgroundColor: "darkred", top: 0 }}>
                <Button transparent onPress={() => navigation.goBack()} >
                    <Ionicons
                        name='arrow-back-outline'
                        style={{ fontSize: 30, marginTop: 4, marginRight: 12, marginLeft: 12, color: 'white' }}
                    />
                </Button>
                <Text style={{ color: "white", height: 50, fontSize: 20, textAlign: 'center', paddingLeft: '20%', paddingTop: 12, fontWeight: 'bold' }}>Nearby Hospitals</Text>
            </View>
            {/* End Text with navback */}

            <Content>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginRight: 4 }}>
                    {/* Filter Button */}
                    <Button rounded disabled={!ForCurrent} style={{ marginLeft: 5, marginBottom: 5, backgroundColor: 'darkred' }} onPress={() => {
                        setForCurrent(false);
                        Calulate_Distance_For_Each(AllHospitalsList, Address);
                    }}>
                        <Icon name='filter' />
                        <Text style={{ marginLeft: -27 }}> For Address </Text>
                    </Button>
                    {/* End filter button */}
                    {/* Filter Button */}
                    <Button rounded disabled={ForCurrent} style={{ marginLeft: 5, marginBottom: 5, backgroundColor: 'darkred' }} onPress={() => {
                        setForCurrent(true);
                        requestLocation();
                    }}>
                        <Icon name='filter' />
                        <Text style={{ marginLeft: -27 }}> For Current Location </Text>
                    </Button>
                    {/* End filter button */}
                </View>



                {loading ?
                    <Text style={styles.loadingStyle}> Loading Hospitals Details... </Text>
                    :
                    <View>
                        {NearbyHospitalsList.length == 0 ?
                            <Text style={styles.loadingStyle}> Sorry No Nearby Hospitals... </Text>
                            :
                            <View style={{ marginLeft: 8 }}>
                                {NearbyHospitalsList.map((item) => {
                                    return (
                                        <HospitalComponent key={item.key} Hospital={item} />
                                    )
                                })}
                            </View>
                        }
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
        </Container >
    );
}

export default NearbyHospitalsScreen;

const styles = StyleSheet.create({
    textStyle: {
        marginTop: 16,
        fontSize: 15,
        marginLeft: 8,
        fontWeight: 'bold',
        color: 'black'
    },

    InputStyle: {
        marginBottom: 10,
        borderColor: 'darkred',
        borderRadius: 6,
        justifyContent: 'space-between'
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
    loadingStyle: {
        color: 'darkred',
        alignSelf: 'center',
        fontSize: 22,
        textAlignVertical: 'center',
        fontWeight: 'bold',
        marginTop: 180
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        alignSelf: 'center'
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "darkred",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        color: 'darkred',
        fontWeight: 'bold',
        fontSize: 17
    },
    textStyle2: {
        fontWeight: 'bold',
        fontSize: 17,
        color: 'darkred',
        marginBottom: 7

    }
})