import React, { Component, useState , useEffect } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Container, FooterTab, Badge, InputGroup, Header, Content, List, Item, Input, ListItem, Thumbnail, Text, Left, Body, Right, Button, Icon, View } from 'native-base';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { DrawerActions } from 'react-navigation-drawer';
import { useTranslation } from 'react-i18next';


const MechItemOfferComponent = (props) => {

    const { t, i18n } = useTranslation();
    const [Added, setAdded] = useState(false);
    const [Btn_Title, setBtn_Title] = useState(t('SOItemOfferComponent2'));
    const [Btn_Color, setBtn_Color] = useState("green");

    const Check=()=>{
        if(props.Item_Details.InOffer == "true"){
            setBtn_Title(t('SOItemOfferComponent1'));
            setBtn_Color("black");
        }
    }
    useEffect(()=>{
        Check();
    },[])

    return (
        <View style={{ alignContent: "flex-start", borderColor: 'darkblue', borderWidth: 0.5, flexDirection: "row" }}>
            <Left>
                <Text style={{ fontWeight: '500' , marginLeft:4}}> {props.Item_Details.Type}</Text>
            </Left>
            <Right>
                <View>
                    {/* View Item Button */}
                    <Button transparent onPress={() => {
                        if (props.Item_Details.InOffer == "true"){
                            return;
                        }
                        else{
                            if (Added) {
                                //console.log(props.Item_Details.key + " Removed");
                                props.Remove_Me(props.Item_Details)
                                setAdded(false);
                                setBtn_Title(t('SOItemOfferComponent2'));
                                setBtn_Color("green");
                            }
                            else {
                                //console.log(props.Item_Details.key + " Added");
                                props.Add_Me(props.Item_Details)
                                setAdded(true);
                                setBtn_Title(t('SOItemOfferComponent3'));
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

export default MechItemOfferComponent;