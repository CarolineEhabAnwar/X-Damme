import React, { Component, useState, useEffect, useRef, useContext } from 'react';
import { Image, StyleSheet, FlatList, LogBox } from 'react-native';
import { AuthContext } from '../../navigation/AuthProvider';
import { Container, FooterTab, Badge, InputGroup, Header, Content, List, Item, Input, ListItem, Thumbnail, Text, Left, Body, Right, Button, Icon, View } from 'native-base';
import { Entypo, Ionicons } from '@expo/vector-icons';
import firestore from "@react-native-firebase/firestore";


const CartScreen = ({ navigation, route }) => {

    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

    const { user } = useContext(AuthContext);
    const [items, setItems] = useState([]);
    const [items_ID, setItems_ID] = useState([]);


    function Get_Item_ID() {
        useEffect(() => {
            try {
                if (user.uid != null) {
                    const subscriber = firestore()
                        .collection('users')
                        .doc(user.uid)
                        .onSnapshot(documentSnapshot => {
                            if (documentSnapshot.exists) {
                                let temp_arr = [];
                                documentSnapshot.data().cart.forEach(element => {
                                    temp_arr.push(element);
                                });
                                setItems_ID(temp_arr);
                            }
                        });
                    // Stop listening for updates when no longer required
                    return () => subscriber();
                }
            } catch (error) {
                alert(error);
            }
        }, []);
    }

    function Get_Item_Name(items_ID) {
        useEffect(() => {
            try {
                if (items_ID.length != 0) {
                    let temp_arr = [];
                    let Counter = 0;
                    items_ID.forEach(element => {
                        const subscriber = firestore()
                            .collection('CarStuff')
                            .doc(element)
                            .onSnapshot(documentSnapshot => {
                                if (documentSnapshot.exists) {
                                    let temp_temp_arr = [];
                                    temp_temp_arr.push(element, documentSnapshot.data(), Counter.toString());
                                    Counter = Counter + 1;
                                    temp_arr.push(temp_temp_arr);
                                    setItems(temp_arr);
                                }
                            });
                        // Stop listening for updates when no longer required
                        return () => subscriber();
                    });
                }
            } catch (error) {
                alert(error);
            }
        }, [items_ID]);
    }

    Get_Item_ID();
    Get_Item_Name(items_ID);

    return (
        <Container>

            {/* Text with drawer */}
            <View style={{ flexDirection: 'row', paddingTop: 25, justifyContent:'space-between', paddingBottom: 6, alignContent: "center", backgroundColor: "darkred", top: 0 }}>
                <Button transparent onPress={() => navigation.goBack()}>
                    <Ionicons
                        name='arrow-back-outline'
                        style={{ fontSize: 30, marginTop: 4, marginRight: 12, marginLeft: 12, color: 'white' }}
                    />
                </Button>
                {/* <Text style={{ color: "white", height: 50, fontSize: 20, textAlign: 'center', paddingLeft: '27%', paddingTop: 12, fontWeight: 'bold' }}>My Cart</Text> */}
                <Button transparent style={{ height: 50 }}>
                    <Icon name='cash' style={{ fontSize: 24, marginRight: -6, color: 'white' }}></Icon>
                    <Text style={{ color: "white", fontSize: 16, fontWeight: 'bold' }}>Check Out</Text>
                </Button>
            </View>
            {/* End Text with drawer */}

            <Content>
                <FlatList
                    style={{}}
                    data={items}
                    keyExtractor={item => item[2]}
                    renderItem={({ item }) => {
                        return (
                            <ListItem>
                                <Body>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ fontWeight: '500', marginLeft: 2, marginRight: 50 }}>{item[1].Name}</Text>
                                    </View>
                                </Body>
                                <Right>
                                    <View style={{ flexDirection: 'row', justifyContent: "flex-start" }}>
                                        <Button transparent onPress={() => navigation.navigate('CartViewItem', {
                                            ItemName: item[1].Name,
                                            CarBrand: item[1].Car_Brand,
                                            CarModel: item[1].Car_Model,
                                            Price: item[1].Price,
                                            MadeIn: item[1].Made_In,
                                            Manufacture_Date: item[1].Manufacture_Date,
                                            Quality: item[1].Quality,
                                            Shop_Owner_ID: item[1].Shop_Owner_ID,
                                            ItemIMG: item[1].Image_Path,
                                            Item_ID: item[0]
                                        })}>
                                            <Text style={{ color: 'blue', fontWeight: 'bold' }}>View</Text>
                                        </Button>
                                        <Button transparent onPress={async () => {
                                            try {
                                                await firestore().collection('users').doc(user.uid).get().then((User_Data) => {
                                                    let temp_cart = [];
                                                    temp_cart = User_Data.data().cart;
                                                    var index = temp_cart.indexOf(item[0]);
                                                    temp_cart.splice(index, 1);
                                                    firestore().collection('users').doc(user.uid).update({
                                                        cart: temp_cart
                                                    }).then(() => {
                                                        alert("Removed from Cart.");
                                                    });
                                                });
                                            }
                                            catch (error) {
                                                alert(error);
                                            }
                                        }}
                                        >
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
