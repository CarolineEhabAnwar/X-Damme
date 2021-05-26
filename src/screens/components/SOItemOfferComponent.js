import React, { Component, useState , useEffect } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Container, FooterTab, Badge, InputGroup, Header, Content, List, Item, Input, ListItem, Thumbnail, Text, Left, Body, Right, Button, Icon, View } from 'native-base';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { DrawerActions } from 'react-navigation-drawer';


const SOItemOfferComponent = (props) => {

    const [Added, setAdded] = useState(false);
    const [Btn_Title, setBtn_Title] = useState("Add");
    const [Btn_Color, setBtn_Color] = useState("green");

    const Check=()=>{
        if(props.Item_Details.item.InOffer == "true"){
            setBtn_Title("Already In Offer");
            setBtn_Color("black");
        }
    }
    useEffect(()=>{
        Check();
    },[])

    return (
        <View style={{ alignContent: "flex-start", borderColor: 'darkblue', borderWidth: 0.5, flexDirection: "row" }}>
            <Left>
                <Text style={{ fontWeight: '500' , marginLeft:4}}> {props.Item_Details.item.Name}</Text>
            </Left>
            <Right>
                <View>
                    {/* View Item Button */}
                    <Button transparent onPress={() => {
                        if (props.Item_Details.item.InOffer == "true"){
                            return;
                        }
                        else{
                            if (Added) {
                                //console.log(props.Item_Details.item.key + " Removed");
                                props.Remove_Me(props.Item_Details.item)
                                setAdded(false);
                                setBtn_Title("Add");
                                setBtn_Color("green");
                            }
                            else {
                                //console.log(props.Item_Details.item.key + " Added");
                                props.Add_Me(props.Item_Details.item)
                                setAdded(true);
                                setBtn_Title("Added");
                                setBtn_Color("darkblue");
                            }
                        }
                    }}>
                        <Text style={{ color: Btn_Color }}>{Btn_Title}</Text>
                    </Button>
                </View>
            </Right>
        </View>
    )
}

export default SOItemOfferComponent;