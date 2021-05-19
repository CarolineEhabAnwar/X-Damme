import React, { Component, useState, useEffect, useContext } from 'react';
import firestore from '@react-native-firebase/firestore';
import { StyleSheet, View, Image, FlatList, LogBox } from 'react-native';
import { Card, CardItem, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import { AuthContext } from '../../navigation/AuthProvider';
import Moment from 'moment';

const RequestCardComponent = (props) => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    LogBox.ignoreLogs(['VirtualizedList: missing keys for items']);

    let Date_Of_Request = new Date((props.Data.Request_Made_In_Date.nanoseconds/1000)+(props.Data.Request_Made_In_Date.seconds*1000));
    let S_Date_Of_Request = Date_Of_Request.getDate() + "/" + (Date_Of_Request.getMonth() +1) + "/" +Date_Of_Request.getFullYear();

    let Date_Of_Due = new Date((props.Data.Request_Expected_Due_Date.nanoseconds/1000)+(props.Data.Request_Expected_Due_Date.seconds*1000));
    let S_Date_Of_Due = Date_Of_Due.getDate() + "/" + (Date_Of_Due.getMonth() +1) + "/" +Date_Of_Due.getFullYear();

    return (
        <View style={{ borderColor: "darkred", borderWidth: 2, marginVertical: 5 }}>
            <Text style={styles.title}> Shop Owner:  </Text>
            <Text style={styles.writing}> {props.Data.Shop_Owner_Name} </Text>
            <Text style={styles.title}> Items:  </Text>
            <FlatList
                data={props.Data.Items_And_Quantites}
                renderItem={({ item }) => {
                    return (
                        <Text style={styles.writing}> Name: {item.split("/")[0]} ,Quantity: {item.split("/")[1]} ,Price: {item.split("/")[2]} </Text>
                    )
                }}
            />
            <Text style={styles.title}> Total Price: </Text>
            <Text style={styles.writing}> {props.Data.Total_Price} L.E </Text>
            <Text style={styles.title}> Status: </Text>
            <Text style={styles.writing}> {props.Data.Status} </Text>
            <Text style={styles.title}> Order Date: </Text>
            <Text style={styles.writing}> {S_Date_Of_Request} </Text>
            <Text style={styles.title}> Due Date: </Text>
            <Text style={styles.writing}> {S_Date_Of_Due} </Text>
        </View>
    );
}

export default RequestCardComponent;

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
    },
    writing: {
        marginHorizontal: 15,
        marginVertical: 10,
        fontSize: 17,
        fontWeight: "bold"
    },

    textStyles: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        textShadowColor: 'red',
        textShadowRadius: 1.5,
        textShadowOffset: {
            width: 0.5,
            height: 0.5
        },
    },

    itemsTextStyle: {
        fontSize: 19,
        marginBottom: 10,
        fontWeight: 'bold',
    },

    buttonStyle: {
        marginTop: 7,
        backgroundColor: 'darkred',
        marginRight: 10
    },

    buttonTextStyle: {
        fontWeight: 'bold'
    },
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",
    },
    reviewContainer: {
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        paddingHorizontal: 50,
        left: 20,
        paddingVertical: 0,
        minWidth: "80%",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 1.0,
        shadowRadius: 2,
        shadowColor: "rgba(193, 211, 251, 0.5)",
        elevation: 5,
    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
        color: "darkred",
        textAlign: "left",
        fontWeight: 'bold',
        marginLeft: 10
    },
    totalWrap: {
        marginTop: 2,
        marginBottom: 5,
        backgroundColor: "#FFFFFF",
        borderRadius: 40,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    amountText: {
        fontSize: 16,
        color: "darkred",
        textAlign: "center",
        fontWeight: 'bold',

    },
    howWeCalculate: {
        fontSize: 18,
        color: "darkred",
        textAlign: "center",
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 5,

    },
    spacer: {
        marginBottom: 14,
    },
    progressText: {
        width: 50,
        fontSize: 14,
        fontWeight: 'bold',
        color: "darkred",
    },
    progressPercentText: {
        width: 40, fontSize: 14, color: "darkred", fontWeight: 'bold',
    },
    progressMiddle: {
        height: 15,
        flex: 1,
        marginHorizontal: 10,
    },
    progressWrap: {
        backgroundColor: "#F5F8FF",
        borderRadius: 18,
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        padding: 2,
    },
    progressBar: {
        flex: 1,
        shadowOffset: { width: 0, height: 0 },
        shadowColor: "#ffcc48",
        shadowOpacity: 1.0,
        shadowRadius: 4,
        backgroundColor: "#FFCC48",
        borderRadius: 18,
        minWidth: 5,
    },
})


