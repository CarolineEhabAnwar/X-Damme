import React, {useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Container, Content, Item, Input, Text, Form, Button } from 'native-base';
import {Ionicons } from '@expo/vector-icons';
import FooterComponent from '../components/FooterComponent'
import firebase from "@react-native-firebase/app";
import { useTranslation } from 'react-i18next';


const ChangePasswordScreen = ({ navigation,route }) => {

    const [old_pass,set_old_pass] = useState('');
    const [new_pass,set_new_pass] = useState('');
    const [conf_new_pass,set_conf_new_pass] = useState('');
    const { t, i18n } = useTranslation();

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
                <Text style={{ color: "white", height: 50, fontSize: 20, textAlign: 'center', paddingLeft: '16%', paddingTop: 12, fontWeight: 'bold' }}>{t('UserChangePasswordScreenTitle')}</Text>
            </View>
            {/* End Search bar with drawer */}

            <Content style={{ marginHorizontal: 15, paddingVertical: 10 }}>
                <Form>
                    <Item regular style={styles.InputStyle}>
                        <Input placeholder={t('UserChangePasswordScreenInput1')} secureTextEntry={true} onChangeText={oldpass => set_old_pass(oldpass)} />
                    </Item>

                    <Item regular style={styles.InputStyle}>
                        <Input placeholder={t('UserChangePasswordScreenInput2')} secureTextEntry={true} onChangeText={newpass => set_new_pass(newpass)} />
                    </Item>

                    <Item regular style={styles.InputStyle}>
                        <Input placeholder={t('UserChangePasswordScreenInput3')} secureTextEntry={true} onChangeText={confnewpass => set_conf_new_pass(confnewpass)} />
                    </Item>

                    <Button style={{ backgroundColor: route.params.Color, marginVertical: 20, alignSelf: 'center' }} onPress={() => {
                        if(new_pass != conf_new_pass){
                            alert(t('UserChangePasswordScreenAlert1'))
                        }
                        else{
                            Alert.alert(
                                t('UserChangePasswordScreenAlert2'),
                                t('UserChangePasswordScreenAlert3'),
                                [
                                    {
                                        text: t('UserChangePasswordScreenAlert4'),
                                        style: "cancel"
                                    },
                                    {
                                        text: t('UserChangePasswordScreenAlert5'), onPress: () => {
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
                        <Text>{t('UserChangePasswordScreenButton1')}</Text>
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