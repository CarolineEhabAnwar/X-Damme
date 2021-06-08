import React, { useState, useEffect, useContext } from 'react';
import firestore from '@react-native-firebase/firestore';
import { StyleSheet, View, Image } from 'react-native';
import { Content, Card, CardItem, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import { AuthContext } from '../../navigation/AuthProvider';
import { useNavigation } from '@react-navigation/native';

const MechanicComponent = (props) => {

    const navigation = useNavigation();

    const { user } = useContext(AuthContext);

    return (
        
            <Card style={{ borderRadius: 3 }}>
                <CardItem>
                    <Left>
                        <Body style={{ marginBottom: 8 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 18.5 }}>{props.mech.fname} {props.mech.lname}</Text>
                            <Text note>Rate</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem cardBody>
                    {props.mech.profileIMG == null || props.mech.profileIMG == ""? 
                    <Image source={require("../../../assets/mechanic.png")} style={{ height: 200, width: null, flex: 1 }} />
                    :                 
                    <Image source={{ uri: props.mech.profileIMG }} style={{ height: 200, width: null, flex: 1 }} />
                    }
                </CardItem>
                <CardItem style={{ marginLeft: 'auto' }}>
                    <Right>
                        <Button style={styles.cartItemStyle} transparent onPress={() => navigation.navigate('MechanicDetails', {
                            mech: props.mech,
                        })}>
                            <Text style={{ fontSize: 15, marginRight: -15, color: 'darkred', fontWeight: 'bold' }} > See Mechanic Details </Text>
                            <Icon active style={{ fontSize: 25, color: 'darkred' }} name="arrow-forward" />
                        </Button>
                    </Right>
                </CardItem>
            </Card>
    );
}

const styles = StyleSheet.create({
    textStyle: {
        marginTop: 13,
        fontSize: 15,
        marginLeft: 10,
        fontWeight: 'bold'
    },
    cartItemStyle: {
        marginTop: -4,
        marginRight: 3
    }
})

export default MechanicComponent;
