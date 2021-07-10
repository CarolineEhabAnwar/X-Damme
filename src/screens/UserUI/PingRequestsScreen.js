import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, FlatList, SafeAreaView, LogBox } from 'react-native';
import { Container, InputGroup, FooterTab, Input, Content, Text, Button, Icon } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import firestore from "@react-native-firebase/firestore";
import PingRequestComponent from '../components/PingRequestComponent'
import { AuthContext } from '../../navigation/AuthProvider';


const PingRequestsScreen = ({ navigation, route }) => {

    const [pings, setPings] = useState([]); // Initial empty array of Reviews
    const [loading, setloading] = useState(true);

    const { user } = useContext(AuthContext);

    useEffect(() => {
        try {
            const subscriber = firestore()
                .collection('Pings')
                .onSnapshot(querySnapshot => {
                    const temp_pings = [];

                    querySnapshot.forEach(documentSnapshot => {
                        if (documentSnapshot) {
                            temp_pings.push({
                                ...documentSnapshot.data(),
                                key: documentSnapshot.id,
                            });
                        }

                    });
                    setPings(temp_pings);
                    if (loading)
                        setloading(false);
                });

            // Unsubscribe from events when no longer in use
            return () => subscriber();
        } catch (error) {
            alert(error);
        }

    }, []);

    return (
        <Container>
            {/* Item Card */}
            {/* Search bar with nav back */}
            <View searchBar style={{ flexDirection: 'row', paddingTop: 25, marginBottom: 12, paddingBottom: 6, alignContent: "center", backgroundColor: "darkred", top: 0 }}>
                <Button transparent onPress={() => navigation.goBack()} >
                    <Ionicons
                        name='arrow-back-outline'
                        style={{ fontSize: 30, marginTop: 4, marginRight: 12, marginLeft: 12, color: 'white' }}
                    />
                </Button>
                <InputGroup rounded style={{ flex: 1, backgroundColor: '#fff', height: 35, marginTop: 7, paddingLeft: 10, paddingRight: 10 }}>
                    <Icon name="ios-search" style={{ color: "darkred" }} />
                    <Input style={{ height: 40, marginTop: 5, color: "darkred" }} placeholder="Search" />
                </InputGroup>
                <Button transparent style={{ height: 50 }} onPress={() => null}>
                    <Text style={{ color: "white", fontWeight: 'bold' }}>Search</Text>
                </Button>
            </View>
            {/* End Search bar with nav back */}
            <Container>
                {loading ? <Text style={styles.loadingStyle}> Loading Ping Requests... </Text> :
                    <FlatList
                        data={pings}
                        renderItem={({ item }) => {
                            return (
                                <PingRequestComponent
                                    pingerID={item.Pinger}
                                    pingerLat={item.PingerLocation.latitude}
                                    pingerLng={item.PingerLocation.longitude}
                                    pingTime={item.PingTime.toDate().toString()}
                                    acceptedBy={item.AcceptedBy}
                                    pingID={item.key}
                                />);
                        }}
                    />
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
    loadingStyle: {
        color: 'darkred',
        alignSelf: 'center',
        fontSize: 22,
        textAlignVertical: 'center',
        fontWeight: 'bold',
        marginTop: 220
    }
})

export default PingRequestsScreen;