import React, { Component, useState, useEffect, useRef } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Container, FooterTab, FlatList, Badge, InputGroup, Header, Content, List, Item, Input, ListItem, Thumbnail, Text, Left, Body, Right, Button, Icon, View } from 'native-base';
import { Entypo, Ionicons } from '@expo/vector-icons';


const CartScreen = ({navigation}) => {
    return (
        <Container >
        
        {/* Text with drawer */}
        <View searchBar style={{flexDirection: 'row', paddingTop:25 , marginBottom: 0, paddingBottom: 6, alignContent:"center", backgroundColor: "darkred", top: 0}}>
            <Button transparent onPress={() => navigation.goBack()}>
                <Ionicons
                    name='arrow-back-outline'
                    style={{ fontSize: 30, marginTop:4,marginRight:12,marginLeft:12 ,color: 'white'}}
                />
            </Button>
            <Text style={{color: "white",height:50,fontSize:20, textAlign:'center',paddingLeft:'27%',paddingTop:12, fontWeight:'bold'}}>My Cart</Text> 
        </View>
        {/* End Text with drawer */}

            <Content>
                <ListItem>
                    <Body>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontWeight: '500', marginLeft: 2, marginRight: 50 }}>Verna door</Text>
                        </View>
                    </Body>
                    <Right>
                        <View style={{ flexDirection: 'row', justifyContent: "flex-start" }}>
                            <Button transparent onPress={() => navigation.navigate('ItemDetails')}>
                                <Text style={{ color: 'darkred',fontWeight:'bold' }}>View</Text>
                            </Button>
                        </View>
                    </Right>
                </ListItem>

            </Content>

            {/* Footer */}
            <View style={{ flexDirection: 'row', alignContent: "center"}}>
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
