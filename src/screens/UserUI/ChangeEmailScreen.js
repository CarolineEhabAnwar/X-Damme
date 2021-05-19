import React, { Component, useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Alert, TextInput } from 'react-native';
import { Container, FooterTab, Badge, Header, Content, Item, Input, Icon, DatePicker, Text, Radio, Picker, Form, Button, Image } from 'native-base';
import { AuthContext } from '../../navigation/AuthProvider';
import { Fontisto, Ionicons } from '@expo/vector-icons';
import FooterComponent from '../components/FooterComponent'
import firebase from "@react-native-firebase/app";
import firestore from '@react-native-firebase/firestore';



const ChangeEmailScreen = ({ navigation,route }) => {

    const [pass, set_pass] = useState('')
    const [email, set_email] = useState('')
    const [conf_email, set_conf_email] = useState('')

    const reauthenticate = (currentPassword) => {
        var user = firebase.auth().currentUser;
        var cred = firebase.auth.EmailAuthProvider.credential(
            user.email, currentPassword);
        return user.reauthenticateWithCredential(cred);
    }

    const changeEmail = (currentPassword, newEmail) => {
        reauthenticate(currentPassword).then(() => {
            var user = firebase.auth().currentUser;
            user.updateEmail(newEmail).then(() => {               
                firestore()
                .collection('users')
                .doc(user.uid)
                .update({
                    email: newEmail
                })
                alert("Email Address has been changed!");
                navigation.goBack()
            }).catch((error) => { alert(error); });
        }).catch((error) => { alert(error); });
    }

    return (
        <Container >
            {/* Search bar with drawer */}
            <View searchBar style={{ flexDirection: 'row', paddingTop: 26, marginBottom: 12, paddingBottom: 6, alignContent: "center", backgroundColor: route.params.Color, top: 0 }}>
                <Button transparent onPress={() => navigation.goBack()} >
                    <Ionicons
                        name='arrow-back-outline'
                        style={{ fontSize: 30, marginTop: 4, marginRight: 12, marginLeft: 12, color: 'white' }}
                    />
                </Button>
                <Text style={{ color: "white", height: 50, fontSize: 20, textAlign: 'center', paddingLeft: '13%', paddingTop: 12, fontWeight: 'bold' }}>Change Email Address</Text>
            </View>
            {/* End Search bar with drawer */}

            <Content style={{ marginHorizontal: 15, paddingVertical: 10 }}>
                <Form>
                    <Item regular style={styles.InputStyle}>
                        <Input placeholder="Please enter your password" secureTextEntry={true} onChangeText={ password => set_pass(password)} />
                    </Item>

                    <Item regular style={styles.InputStyle}>
                        <Input placeholder="Enter your new email" onChangeText={email => set_email(email)} />
                    </Item>

                    <Item regular style={styles.InputStyle}>
                        <Input placeholder="Confirm new email" onChangeText={conf_email => set_conf_email(conf_email)} />
                    </Item>

                    <Button style={{ backgroundColor: route.params.Color, marginVertical: 20, alignSelf: 'center' }} onPress={() => {
                        if (email != conf_email) {
                            alert('Email Address mismatch!')
                        }
                        else {
                            Alert.alert(
                                "Warning",
                                "Are you sure you want to change your email address?",
                                [
                                    {
                                        text: "No",
                                        style: "cancel"
                                    },
                                    {
                                        text: "Yes", onPress: () => {
                                            try {
                                                changeEmail(pass, email)
                                            } catch (error) {
                                                alert(error)
                                            }
                                        }
                                    }
                                ]
                            );

                        }
                    }}>
                        <Text>Change Email Address</Text>
                    </Button>
                </Form>

            </Content>

            <FooterComponent 
                home={route.params.Home} 
                profile={route.params.Profile} 
                contactus={route.params.ContactUs} 
                bkcolor={route.params.Color}
            />
        </Container>
    );
}

export default ChangeEmailScreen;

const styles = StyleSheet.create({
    InputStyle: {
        marginBottom: 10,
        borderColor: 'black',
        borderRadius: 6,
        justifyContent: 'space-between'
    },

    ViewStyle: {
        marginBottom: 10,
        flexDirection: 'row',
    }
})