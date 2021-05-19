import React, {useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Container, Content, Item, Input, Text, Form, Button } from 'native-base';
import {Ionicons } from '@expo/vector-icons';
import FooterComponent from '../components/FooterComponent'
import firebase from "@react-native-firebase/app";


const ChangePasswordScreen = ({ navigation,route }) => {

    const [old_pass,set_old_pass] = useState('')
    const [new_pass,set_new_pass] = useState('')
    const [conf_new_pass,set_conf_new_pass] = useState('')

    const reauthenticate = (currentPassword) => {
        var user = firebase.auth().currentUser;
        var cred = firebase.auth.EmailAuthProvider.credential(
            user.email, currentPassword);
        return user.reauthenticateWithCredential(cred);
    }
    
    const changePassword = (currentPassword, newPassword) => {
        reauthenticate(currentPassword).then(() => {
          var user = firebase.auth().currentUser;
          user.updatePassword(newPassword).then(() => {
            alert('Password has been updated!')
            navigation.goBack()
          }).catch((error) => { alert(error); });
        }).catch((error) => { alert('Old Password is invalid!'); });
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
                <Text style={{ color: "white", height: 50, fontSize: 20, textAlign: 'center', paddingLeft: '16%', paddingTop: 12, fontWeight: 'bold' }}>Change Password</Text>
            </View>
            {/* End Search bar with drawer */}

            <Content style={{ marginHorizontal: 15, paddingVertical: 10 }}>
                <Form>
                    <Item regular style={styles.InputStyle}>
                        <Input placeholder="Old Password" secureTextEntry={true} onChangeText={oldpass => set_old_pass(oldpass)} />
                    </Item>

                    <Item regular style={styles.InputStyle}>
                        <Input placeholder="New Password" secureTextEntry={true} onChangeText={newpass => set_new_pass(newpass)} />
                    </Item>

                    <Item regular style={styles.InputStyle}>
                        <Input placeholder="Confirm New Password" secureTextEntry={true} onChangeText={confnewpass => set_conf_new_pass(confnewpass)} />
                    </Item>

                    <Button style={{ backgroundColor: route.params.Color, marginVertical: 20, alignSelf: 'center' }} onPress={() => {
                        if(new_pass != conf_new_pass){
                            alert('New password mismatch!')
                        }
                        else{
                            Alert.alert(
                                "Warning",
                                "Are you sure you want to change your password?",
                                [
                                    {
                                        text: "No",
                                        style: "cancel"
                                    },
                                    {
                                        text: "Yes", onPress: () => {
                                            try {
                                                changePassword(old_pass,new_pass)
                                            } catch (error) {
                                                alert(error)
                                            }
                                        }
                                    }
                                ]
                            );
                            
                        }
                    }}>
                        <Text>Change Password</Text>
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

export default ChangePasswordScreen;

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