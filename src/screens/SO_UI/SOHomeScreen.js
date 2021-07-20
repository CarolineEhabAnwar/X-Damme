import React, { Component, useState, useEffect, useContext } from 'react';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../navigation/AuthProvider';
import { Container, InputGroup, Input, Badge, Icon, FooterTab, Header, Content, Button, Text } from 'native-base';
import { StyleSheet, View, Image, FlatList, TouchableOpacity } from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';
import { Ionicons, FontAwesome5, FontAwesome } from '@expo/vector-icons';
import FooterComponent from '../components/FooterComponent';
import GetProfileIMGComponent from "../components/GetProfileIMGComponent";

const SOHomeScreen = ({ navigation }) => {

    const { user } = useContext(AuthContext);

    const [shop_Owner_Name, setShop_Owner_name] = useState("");

    useEffect(() => {
        try {

            firestore().collection('users').doc(user.uid).get().then((User_data) => {
                setShop_Owner_name(User_data.data().fname + " " + User_data.data().lname)
            });

        } catch (error) {
            alert(error);
        }
    });


    let name = shop_Owner_Name;

    return (
        <Container style={{}}>
            {/* Search bar with drawer */}
            <View style={{ flexDirection: 'row', paddingTop: 26,justifyContent: "center", backgroundColor: "darkblue", top: 0 }}>
                <Text style={{ color: "white", height: 50, fontSize: 20, textAlign: 'center', paddingTop: 12, fontWeight: 'bold' }}> Home</Text>
            </View>
            {/* End Search bar with drawer */}
            <Content>
                <GetProfileIMGComponent Color={"darkblue"} />
                <View style={{ flexDirection: "column", justifyContent: "space-evenly" }}>
                    <View style={{ flexDirection: "column", alignItems: "center", justifyContent: "space-around" }}>
                        <Image source={require("../../../assets/logo.png")} style={styles.logoStyle} />
                        <Text style={styles.title}>Welcome</Text>
                        <Text style={styles.title}>{name}</Text>
                        <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 20 }}>
                            <Button rounded info style={{ backgroundColor: 'darkblue', width: 150, justifyContent: "center", top: 40, marginHorizontal: 10 }}
                                onPress={() => navigation.navigate('SOAddItem')}
                            >
                                <Ionicons name="add-circle-outline" style={styles.IconsStyle} size={25} color="white" />
                                <Text style={{ fontWeight: 'bold' }}> Add Item </Text>
                            </Button>
                            <Button rounded style={{ backgroundColor: 'darkblue', width: 150, justifyContent: "center", top: 40, marginHorizontal: 10 }}
                                onPress={() => navigation.navigate('SOItemList')}>
                                <FontAwesome5 name="list-alt" size={21} style={styles.IconsStyle} color="white" />
                                <Text style={{ fontWeight: 'bold' }}> Items List </Text>
                            </Button>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-around", marginBottom: 50, marginTop: 30 }}>
                            <Button rounded info style={{ backgroundColor: 'darkblue', width: 150, justifyContent: "center", top: 40, marginHorizontal: 10 }}
                                onPress={() => navigation.navigate('SORequests', {
                                    Editing: true
                                })}>
                                <FontAwesome5 name="buffer" size={24} style={styles.IconsStyle} color="white" />
                                <Text style={{ fontWeight: 'bold' }}> Requests </Text>
                            </Button>
                            <Button rounded info style={{ backgroundColor: 'darkblue', width: 150, justifyContent: "center", top: 40, marginHorizontal: 10 }}
                                onPress={() => navigation.navigate('SOAddOffer')}
                            >
                                <FontAwesome name="percent" size={22} style={styles.IconsStyle} color="white" />
                                <Text style={{ fontWeight: 'bold' }}> Add offer </Text>
                            </Button>
                        </View>
                    </View>
                </View>
            </Content>

            <FooterComponent home="SOHome" profile="SOProfile" contactus="SOContactUs" bkcolor="darkblue" />

        </Container>
    );
}

const styles = StyleSheet.create({

    title: {
        fontSize: 60,
        justifyContent: "center",
        alignSelf: "center"
    },
    subtitle: {
        fontSize: 36,
        justifyContent: "center",
        alignSelf: "center"
    },
    logoStyle: {
        marginTop: 40,
        marginVertical: 20,
        width: 160,
        height: 120
    },
    title: {
        fontSize: 40,
        fontWeight: '500',
        justifyContent: "center",
        alignSelf: "center",
        marginBottom: -2,
        color: 'darkblue',
        textShadowColor: 'black',
        textShadowRadius: 2,
        textShadowOffset: {
            width: 2,
            height: 2
        }
    },
    IconsStyle: {
        marginLeft: 5,
        marginRight: -8
    }
});

export default SOHomeScreen;