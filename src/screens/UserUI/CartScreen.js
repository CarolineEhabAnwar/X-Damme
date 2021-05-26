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
    const [loading, setLoading] = useState(true);
    const [totalPrice, setTotalPrice] = useState(0);

    const [MyName, setMyName] = useState(0);
    const [MyAddress, setMyAddress] = useState(0);
    const [MyID, setMyID] = useState(0);

    async function Get_Requests() {
        //Making the request
        let Requests = [];
        //for loop to check how many shop owners thier is.
        let Shop_Owners_list = [];
        let U = true;
        for (let i = 0; i < items.length; i++) {
            for (let j = 0; j < Shop_Owners_list.length; j++) {
                if (items[i][1][1].Shop_Owner_ID == Shop_Owners_list[j]) {
                    U = false
                }
            }
            if (U) {
                Shop_Owners_list.push(items[i][1][1].Shop_Owner_ID);
                U = true;
            }
        }
        //Getting all of the items of that shop owner
        for (let i = 0; i < Shop_Owners_list.length; i++) {
            let Same_Shop_Owner_Item_list = [];
            let totalPrice = 0;
            for (let j = 0; j < items.length; j++) {
                if (items[j][1][1].Shop_Owner_ID == Shop_Owners_list[i]) {
                    if (items[j][1][1].InOffer == "true") {
                        let S = items[j][1][1].Name + "/" + items[j][0] + "/" + items[j][1][1].After_Price + "/" + (items[j][0] * items[j][1][1].After_Price);
                        Same_Shop_Owner_Item_list.push(S);
                        totalPrice += (items[j][0] * items[j][1][1].After_Price);
                    }
                    else {
                        let S = items[j][1][1].Name + "/" + items[j][0] + "/" + items[j][1][1].Price + "/" + (items[j][0] * items[j][1][1].Price);
                        Same_Shop_Owner_Item_list.push(S);
                        totalPrice += (items[j][0] * items[j][1][1].Price);
                    }
                }
            }
            let Shop_Owner_Name = "";
            await firestore().collection('users').doc(Shop_Owners_list[i]).get().then(Shop_Owner_Data => {
                if (Shop_Owner_Data.exists) {
                    Shop_Owner_Name = Shop_Owner_Data.data().fname + " " + Shop_Owner_Data.data().lname;
                }
            });

            Requests.push({
                User_Name: MyName,
                User_ID: MyID,
                User_Address: MyAddress,
                Items_And_Quantites: Same_Shop_Owner_Item_list,
                Total_Price: totalPrice,
                Shop_Owner_ID: Shop_Owners_list[i],
                Shop_Owner_Name: Shop_Owner_Name,
                Request_Made_In_Date: firestore.Timestamp.fromDate(new Date()),
                Request_Expected_Due_Date: "Waiting Approval",
                Status: "Pending"
            });
        }
        return Requests;
    }

    async function Send_Request(Request) {
        await firestore().collection('Requests').add({
            User_Name: Request.User_Name,
            User_ID: Request.User_ID,
            User_Address: Request.User_Address,
            Items_And_Quantites: Request.Items_And_Quantites,
            Total_Price: Request.Total_Price,
            Shop_Owner_ID: Request.Shop_Owner_ID,
            Shop_Owner_Name: Request.Shop_Owner_Name,
            Request_Made_In_Date: Request.Request_Made_In_Date,
            Request_Expected_Due_Date: Request.Request_Expected_Due_Date,
            Status: Request.Status
        });
    }

    async function CheckOut() {
        try {
            const Requests = await Get_Requests();
            //Sending The Requests
            for (let i = 0; i < Requests.length; i++) {
                await Send_Request(Requests[i]);
            }
            Remove_All();
            alert("Request Sent.");
        }
        catch (error) {
            alert(error);
        }
    }

    async function Remove_All() {
        try {
            setLoading(true);
            await firestore().collection('users').doc(user.uid).get().then((User_Data) => {
                let temp_cart = [];
                firestore().collection('users').doc(user.uid).update({
                    cart: temp_cart
                }).catch(error => alert(error));
            });
            if (user.uid != null)
                LoadUp(user.uid);
        }
        catch (error) {
            alert(error);
            setLoading(false);
        }
    }

    async function Remove(Data) {//Eba2a bos hena basa kda
        try {
            setLoading(true);
            await firestore().collection('users').doc(user.uid).get().then((User_Data) => {
                let temp_cart = [];
                temp_cart = User_Data.data().cart;
                var index = temp_cart.indexOf(Data);
                temp_cart.splice(index, 1);
                firestore().collection('users').doc(user.uid).update({
                    cart: temp_cart
                }).catch(error => alert(error));
            });
            if (user.uid != null)
                LoadUp();
        }
        catch (error) {
            alert(error);
            setLoading(false);
        }
    }

    async function Get_Data_From_User() {
        let temp_ID_Array = [];
        await firestore().collection('users').doc(user.uid).get().then(documentSnapshot => {
            if (documentSnapshot.exists) {

                setMyName(documentSnapshot.data().fname + " " + documentSnapshot.data().lname);
                setMyID(user.uid);
                setMyAddress(documentSnapshot.data().address);

                documentSnapshot.data().cart.forEach(element => {
                    temp_ID_Array.push(element);

                });
            }
        })
        return temp_ID_Array;
    }

    async function Get_Data_From_ID(ID, Counter) {
        let temp_Items_Array = [];
        await firestore().collection('CarStuff').doc(ID).get().then(documentSnapshot => {
            if (documentSnapshot.exists)
                temp_Items_Array.push(ID, documentSnapshot.data(), Counter);
        })
        return temp_Items_Array;
    }

    async function LoadUp() {
        setLoading(true);
        try {
            //Getting  Item ID array from the User Tabel
            let ID_Array = await Get_Data_From_User();
            //Getting Each Item Details from the Car Staff Tabel
            let Item_Array = [];
            for (let i = 0; i < ID_Array.length; i++) {
                let Element_Array = await Get_Data_From_ID(ID_Array[i], i.toString());
                Item_Array.push(Element_Array);
            }
            //Finalizing the list of Items
            let Q = 1;
            let U = true;
            let temp_Unique_List = [];
            for (let i = 0; i < Item_Array.length; i++) {
                for (let j = i + 1; j < Item_Array.length; j++) {
                    if (Item_Array[i][1].Name == Item_Array[j][1].Name) {
                        Q++;
                    }
                }
                for (let j = 0; j < temp_Unique_List.length; j++) {
                    if (temp_Unique_List[j][1][1].Name == Item_Array[i][1].Name && temp_Unique_List[j][1][1].Shop_Owner_ID == Item_Array[i][1].Shop_Owner_ID) {
                        U = false
                    }
                }
                if (U) {
                    let temp_element = []
                    temp_element.push(Q, Item_Array[i])
                    temp_Unique_List.push(temp_element)
                }
                Q = 1;
                U = true;
            }
            //Calculating Total Price
            let total_Price = 0;
            for (let i = 0; i < temp_Unique_List.length; i++) {
                if (temp_Unique_List[i][1][1].InOffer == "true") {
                    total_Price += (temp_Unique_List[i][1][1].After_Price * temp_Unique_List[i][0]);
                }
                else {
                    total_Price += (temp_Unique_List[i][1][1].Price * temp_Unique_List[i][0]);
                }
            }
            //Setting The need variables
            setTotalPrice(total_Price);
            if (temp_Unique_List.length == 0) {
                setItems([]);
            }
            else
                setItems(temp_Unique_List);

        } catch (error) {
            alert(error);
        }
        setLoading(false);
    }

    useEffect(() => {
        try {
            if (user.uid != null)
                LoadUp();
        } catch (error) {
            alert(error);
        }
    }, []);

    return (
        <Container>

            {/* Text with drawer */}
            <View style={{ flexDirection: 'row', paddingTop: 25, justifyContent: 'space-between', paddingBottom: 6, alignContent: "center", backgroundColor: "darkred", top: 0 }}>
                <Button transparent onPress={() => navigation.goBack()}>
                    <Ionicons
                        name='arrow-back-outline'
                        style={{ fontSize: 30, marginTop: 4, marginRight: 12, marginLeft: 12, color: 'white' }}
                    />
                </Button>
                {/* <Text style={{ color: "white", height: 50, fontSize: 20, textAlign: 'center', paddingLeft: '27%', paddingTop: 12, fontWeight: 'bold' }}>My Cart</Text> */}
                <Button transparent style={{ height: 50 }} onPress={() => {
                    if (loading)
                        return alert("Please wait untill loaded.");
                    else if (items.length == 0)
                        return alert("Please add items to the cart first.");
                    CheckOut()
                    //alert("Ana edast hanshof han3ml eh ba2a");
                    //Hanktb hena matensash
                }}>
                    <Icon name='cash' style={{ fontSize: 24, marginRight: -6, color: 'white' }}></Icon>
                    <Text style={{ color: "white", fontSize: 16, fontWeight: 'bold' }}>Check Out</Text>
                </Button>
            </View>
            {/* End Text with drawer */}

            <View style={{ width: 230, flexDirection: 'row', paddingTop: 25, justifyContent: 'space-between', paddingBottom: 6, alignContent: "center", top: 0 }}>
                <Left><Text style={{ fontWeight: '500' }}> Quantity</Text></Left>
                <Body><Text style={{ fontWeight: '500' }}> Name</Text></Body>
                <Right><Text style={{ fontWeight: '500' }}> Price/Unit</Text></Right>
            </View>

            {loading ? <Content><Text style={styles.loadingStyle}> Loading Items... </Text></Content> :
                <Content>
                    <FlatList
                        style={{}}
                        data={items}
                        keyExtractor={item => item[1][2]}
                        renderItem={({ item }) => {
                            return (
                                <ListItem>
                                    <Body>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ fontWeight: '500' }}>({item[0]}) </Text>
                                            <Text style={{ fontWeight: '500', marginLeft: 2, marginRight: 50 }}>{item[1][1].Name}</Text>
                                        </View>
                                    </Body>
                                    <Right>
                                        <View style={{ flexDirection: 'row', justifyContent: "flex-start" }}>
                                            {item[1][1].InOffer == "true" ?
                                                <Text style={{ fontWeight: '400', marginTop: 12 }}>{parseFloat(item[1][1].After_Price)} EGP</Text>
                                                :
                                                <Text style={{ fontWeight: '400', marginTop: 12 }}>{parseFloat(item[1][1].Price)} EGP</Text>
                                            }
                                            <Button transparent onPress={() => navigation.navigate('CartViewItem', {
                                                ItemName: item[1][1].Name,
                                                CarBrand: item[1][1].Car_Brand,
                                                CarModel: item[1][1].Car_Model,
                                                Price: item[1][1].Price,
                                                After_Price: item[1][1].After_Price,
                                                MadeIn: item[1][1].Made_In,
                                                Manufacture_Date: item[1][1].Manufacture_Date,
                                                Quality: item[1][1].Quality,
                                                Shop_Owner_ID: item[1][1].Shop_Owner_ID,
                                                ItemIMG: item[1][1].Image_Path,
                                                Item_ID: item[1][0],
                                                InOffer: item[1][1].InOffer
                                            })}>
                                                <Text style={{ color: 'blue', fontWeight: 'bold' }}>View</Text>
                                            </Button>
                                            <Button transparent onPress={() => Remove(item[0])}
                                            >
                                                <Text style={{ color: 'darkred', fontWeight: 'bold', width: 90 }}>Remove</Text>
                                            </Button>
                                        </View>
                                    </Right>
                                </ListItem>
                            );
                        }}
                    />
                    {items.length == 0 ? <Content>
                        <Text style={styles.loadingStyle}> Cart is Empty.</Text>
                    </Content> :
                        <Text style={{ fontWeight: '400', marginLeft: 100, marginTop: 20, marginBottom: 10 }}>Total Price: {totalPrice} EGP</Text>}
                </Content>}

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
    },
    loadingStyle: {
        color: 'darkred',
        alignSelf: 'center',
        fontSize: 22,
        textAlignVertical: 'center',
        fontWeight: 'bold',
        marginTop: 180
    }
});

export default CartScreen;
