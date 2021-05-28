import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Card, CardItem, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { MaterialIcons, AntDesign, FontAwesome5,FontAwesome } from '@expo/vector-icons';
import { AuthContext } from '../../navigation/AuthProvider';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const ServiceRequestViewComponent = (props) => {

    const navigation = useNavigation();

    const { user } = useContext(AuthContext);

    return (
        <Card style={{ borderColor: 'darkgreen'}}>
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

                    <View style={styles.cardViewStyles}>
                        <FontAwesome5 name="user-clock" size={18} color="darkgreen" style={styles.IconsStyle}/>
                        <Text style={styles.textStyles}>Status: </Text>
                        <Text style={styles.propsStyle}>{props.status}</Text>
                    </View>

                    <View style={styles.cardViewStyles}>
                        <FontAwesome name="key" size={18} color="darkgreen" style={styles.IconsStyle}/>
                        <Text style={styles.textStyles}>Request ID: </Text>
                        <Text style={styles.propsStyle}>{props.requestID}</Text>
                    </View>

                </Body>
            </CardItem>
            {/* <Right> */}
            {/* onPress={() => navigation.navigate('MechViewRequest')} */}
            {/* <Button transparent>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', marginRight: -15, color: 'darkgreen' }}> See Service Details </Text>
                    <Icon active style={{ fontSize: 25, color: 'darkgreen' }} name="arrow-forward" />
                </Button>
            </Right> */}
        </Card>
    );
}

const styles = StyleSheet.create({
    cardViewStyles:{
        flexDirection:'row',
        marginBottom:5
    },
    textStyles: {
        fontSize: 18,
        marginBottom: 4,
        fontWeight: 'bold',
        color: 'darkgreen',

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
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black'
    },
    IconsStyle: {
        marginRight: 3
    }
})

export default ServiceRequestViewComponent;
