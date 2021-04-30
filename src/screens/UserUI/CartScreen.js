import React, { Component, useState, useEffect, useRef, useContext } from 'react';
import { Image, StyleSheet, FlatList, LogBox } from 'react-native';
import { AuthContext } from '../../navigation/AuthProvider';
import { Container, FooterTab, Badge, InputGroup, Header, Content, List, Item, Input, ListItem, Thumbnail, Text, Left, Body, Right, Button, Icon, View } from 'native-base';
import { Entypo, Ionicons } from '@expo/vector-icons';
import firestore from "@react-native-firebase/firestore";


const CartScreen = ({ navigation, route }) => {

    // const { user } = useContext(AuthContext);

     const [items, setItems] = useState([]); // Initial empty array of users

    // useEffect(() => {
    //     try {
    //         console.log("Da array el items: ");
    //         LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    //         const subscriber = () =>{ 
    //             firestore().collection('users').doc(user.uid).get().then((User_Data) => {
    //             let temp_items = [];      
    //             User_Data.data().cart.array.forEach(element => {
    //                 temp_items.push(element)
    //             });
    //             // temp_items.array.forEach(element => {
    //             //     firestore().collection('CarStuff').doc(element).get().then((Car_Staff_Data)=> temp_item_names.push(Car_Staff_Data.data().Name));
    //             // });
    //             setItems(temp_items);
    //             console.log("Da array el items: " + items);
    //             console.log("Da array el tempitems: " + temp_items);
    //             console.log("W da array el UserData.carts: " + User_Data.data().cart[0]);
    //         });}
    //         // Unsubscribe from events when no longer in use
    //         return () => subscriber();
    //     } catch (error) {
    //         alert(error);
    //     }

    // }, []);

    return (
        <Container >

            {/* Text with drawer */}
            <View searchBar style={{ flexDirection: 'row', paddingTop: 25, marginBottom: 0, paddingBottom: 6, alignContent: "center", backgroundColor: "darkred", top: 0 }}>
                <Button transparent onPress={() => navigation.goBack()}>
                    <Ionicons
                        name='arrow-back-outline'
                        style={{ fontSize: 30, marginTop: 4, marginRight: 12, marginLeft: 12, color: 'white' }}
                    />
                </Button>
                <Text style={{ color: "white", height: 50, fontSize: 20, textAlign: 'center', paddingLeft: '27%', paddingTop: 12, fontWeight: 'bold' }}>My Cart</Text>
            </View>
            {/* End Text with drawer */}

            <Content>
                <FlatList
                    data={items}
                    renderItem={({ item }) => {
                        return (
                            <ListItem>
                                <Body>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ fontWeight: '500', marginLeft: 2, marginRight: 50 }}>Mirror</Text>
                                    </View>
                                </Body>
                                <Right>
                                    <View style={{ flexDirection: 'row', justifyContent: "flex-start" }}>
                                        <Button transparent onPress={() => navigation.navigate('ItemDetails')}>
                                            <Text style={{ color: 'blue', fontWeight: 'bold' }}>View</Text>
                                        </Button>
                                        <Button transparent>
                                            <Text style={{ color: 'darkred', fontWeight: 'bold', width: 90 }}>Remove</Text>
                                        </Button>
                                    </View>
                                </Right>
                            </ListItem>
                        );
                    }}
                />
            </Content>

            {/* Footer */}
            <View style={{ flexDirection: 'row', alignContent: "center" }}>
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
    IconStyle: {
        color: 'darkblue',
        marginLeft: -30
    },
    textStyles: {
        fontWeight: '500'
    }
});

export default CartScreen;
