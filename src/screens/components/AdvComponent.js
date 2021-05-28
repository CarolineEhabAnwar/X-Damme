import React, { useState, useEffect, useContext } from 'react';
import firestore from '@react-native-firebase/firestore';
import { StyleSheet, View, Image } from 'react-native';
import { Card, CardItem, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import { AuthContext } from '../../navigation/AuthProvider';
import { useNavigation } from '@react-navigation/native';

const AdvComponent = (props) => {

    const navigation = useNavigation();

    return (
        <Card style={{ borderRadius: 2, borderColor:'darkred' }}>
            <CardItem>
                <Left>
                    <Body style={{ marginBottom: 8 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{props.AD.Title}</Text>
                        <Text style={{ fontWeight: 'bold' }} note>{props.carBrand} Discount: {props.AD.Percentage}%</Text>
                    </Body>
                </Left>
            </CardItem>
            <CardItem cardBody >
                <Image source={{ uri: props.AD.Image_Path }} style={{ height: 210, width: null, flex: 1 }} />
            </CardItem>
            <CardItem style={{ marginTop:10 }}>
                <Right>
                    <Button style={styles.cartItemStyle} transparent onPress={() => navigation.navigate('AdvView', {
                        AD: props.AD,
                    })}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', marginRight: -15, color: 'darkred' }}> See Offer Details </Text>
                        <Icon active style={{ fontSize: 25, color: 'darkred' }} name="arrow-forward" />
                    </Button>
                </Right>
            </CardItem>
        </Card>
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
    }
})

export default AdvComponent;
