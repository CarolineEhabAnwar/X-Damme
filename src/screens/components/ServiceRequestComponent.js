import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Card, CardItem, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { MaterialIcons, AntDesign, FontAwesome5,FontAwesome } from '@expo/vector-icons';
import { AuthContext } from '../../navigation/AuthProvider';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const ServiceRequestComponent = (props) => {

    const navigation = useNavigation();

    const { user } = useContext(AuthContext);

    return (
        <Card>
            <CardItem style={{borderWidth:2,borderColor:'darkgreen'}}>
                <Body>

                    <View style={styles.cardViewStyles}>
                        <MaterialIcons name="miscellaneous-services" size={25} color="darkgreen" style={styles.IconsStyle} />
                        <Text style={styles.textStyles}>Service Type: </Text>
                        <Text style={styles.propsStyle}>{props.service_type}</Text>
                    </View>


                    <View style={styles.cardViewStyles}>
                        <AntDesign name="calendar" size={19} color="darkgreen" style={[styles.IconsStyle,{marginTop:2}]} />
                        <Text style={styles.textStyles}>Requested Day: </Text>
                        <Text style={styles.propsStyle}>{props.reserved_day}</Text>
                    </View>

                    <View style={styles.cardViewStyles}>
                        <AntDesign name="clockcircleo" size={19} color="darkgreen" style={[styles.IconsStyle,{marginTop:2}]} />
                        <Text style={styles.textStyles}>Requested Time: </Text>
                        <Text style={styles.propsStyle}>{props.requested_time}</Text>
                    </View>

                    <View style={styles.cardViewStyles}>
                        <AntDesign name="user" size={20} color="darkgreen" style={styles.IconsStyle} />
                        <Text style={styles.textStyles}>Requested By: </Text>
                        <Text style={styles.propsStyle}>{props.requested_by}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 17, alignSelf: 'center', marginRight: 20 }}>
                        {/* Accept */}
                        <Button style={{ marginLeft: 13, backgroundColor: 'green' }} onPress= { async () =>  {
                            try {
                                await firestore().collection('Service Requests').doc(props.requestID)
                                    .update({
                                        Status: 'Accepted'
                                    })
                                    .then(() => {
                                       alert('Request has been accepted!');
                                    });
                            } catch (error) {
                                alert(error);
                            }
                        }}>
                            <Text style={styles.buttonTextStyle}>Accept</Text>
                        </Button>

                        {/* Decline */}
                        <Button style={{ marginLeft: 30, backgroundColor: '#eb1c1c' }} onPress={() => {
                            try {
                                firestore().collection('Service Requests').doc(props.requestID)
                                    .update({
                                        Status: 'Declined'
                                    })
                                    .then(() => {
                                       alert('Request has been declined!');
                                    });
                            } catch (error) {
                                alert(error);
                            }
                        }}>
                            <Text style={styles.buttonTextStyle}>Decline</Text>
                        </Button>
                    </View>
                </Body>
            </CardItem>
        </Card>
    );
}

const styles = StyleSheet.create({
    cardViewStyles:{
        flexDirection:'row',
        marginBottom:5
    },
    textStyles: {
        fontSize: 16,
        marginBottom: 4,
        fontWeight: 'bold',
        color: 'black',
        textShadowColor: 'darkgreen',
        textShadowRadius: 1.5,
        textShadowOffset: {
            width: 0,
            height: 0
        },
        marginBottom: 10

    },

    buttonStyle: {
        marginTop: 7,
        marginLeft: 'auto',
        backgroundColor: 'darkgreen',
    },

    buttonTextStyle: {
        fontWeight: 'bold'
    },
    propsStyle: {
        fontWeight: 'bold',
        color: 'black'
    },
    IconsStyle: {
        marginRight: 3
    }
})

export default ServiceRequestComponent;
