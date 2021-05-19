import React, { Component, useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Alert, TextInput } from 'react-native';
import { Container, FooterTab, Badge, Header, Content, Item, Input, Icon, DatePicker, Text, Radio, Picker, Form, Button, Image } from 'native-base';
import { AuthContext } from '../../navigation/AuthProvider';
import { Fontisto, Ionicons } from '@expo/vector-icons';
import FooterComponent from '../components/FooterComponent'
import firestore from "@react-native-firebase/firestore";
import { useNavigation } from '@react-navigation/native';

const ChangeNameScreen = ({route}) => {
    const { user } = useContext(AuthContext);
    const navigation = useNavigation();
    let [newfname, setnewfname] = useState('');
    let [newlname, setnewlname] = useState('');
    let [fname, setfname] = useState('');
    let [lname, setlname] = useState('')

    firestore().collection('users').doc(user.uid).onSnapshot(documentSnapshot => {
        setfname(documentSnapshot.data().fname);
        setlname(documentSnapshot.data().lname);
    });

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
                <Text style={{ color: "white", height: 50, fontSize: 20, textAlign: 'center', paddingLeft: '17%', paddingTop: 12, fontWeight: 'bold' }}>Change Name</Text>
            </View>
            {/* End Search bar with drawer */}

            <Content style={{ marginHorizontal: 15, paddingVertical: 10 }}>
                <Form>
                    <Item regular style={styles.InputStyle}>
                        <Input defaultValue={fname} onChangeText={fname => setnewfname(fname)} />
                    </Item>

                    <Item regular style={styles.InputStyle}>
                        <Input defaultValue={lname} onChangeText={lname => setnewlname(lname)} />
                    </Item>

                    <Button style={{ backgroundColor: route.params.Color, marginVertical: 20, alignSelf: 'center' }} onPress={() => {

                        if ((newfname == '') && (newlname == '')) {
                            alert('You did not change you name!')
                        }
                        else {
                            {
                                if (newfname == '') {
                                    newfname = fname
                                }
                                else if (newlname == '') {
                                    newlname = lname
                                }
                                Alert.alert(
                                    "Warning",
                                    "Are you sure you want to change your name?",
                                    [
                                        {
                                            text: "No",
                                            style: "cancel"
                                        },
                                        {
                                            text: "Yes", onPress: () => {
                                                try {
                                                    firestore()
                                                        .collection('users')
                                                        .doc(user.uid)
                                                        .update({
                                                            fname: newfname,
                                                            lname: newlname,
                                                        })
                                                    navigation.goBack();
                                                    alert('You name has been changed successfully!')
                                                } catch (error) {
                                                    alert(error)
                                                }
                                            }
                                        }
                                    ]
                                );
                            }
                        }
                    }}>
                        <Text>Change Name</Text>
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

export default ChangeNameScreen;

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