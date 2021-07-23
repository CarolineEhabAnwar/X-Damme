import React, { Component, useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Alert, TextInput, ToastAndroid } from 'react-native';
import { Container, FooterTab, Badge, Header, Content, Item, Input, Icon, DatePicker, Text, Radio, Picker, Form, Button, Image } from 'native-base';
import { AuthContext } from '../../navigation/AuthProvider';
import { Fontisto, Ionicons } from '@expo/vector-icons';
import FooterComponent from '../components/FooterComponent'
import firebase from "@react-native-firebase/app";
import firestore from '@react-native-firebase/firestore';
import GetLocation from 'react-native-get-location';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useTranslation } from 'react-i18next';



const ChangeAddressScreen = ({ navigation, route }) => {

    const { user } = useContext(AuthContext);
    const [IsLocationLoading,setIsLocationLoading] = useState(false);
    const [location, setCurrentLocation] = useState(null);
    const { t, i18n } = useTranslation();

    const requestLocation = () => {
        setIsLocationLoading(true);
        try {
            GetLocation.getCurrentPosition({
                enableHighAccuracy: true,
                timeout: 150000,
            }).then(location => {
                setCurrentLocation(location);
                setIsLocationLoading(false);
            }).catch(ex => {
                const { code, message } = ex;
                console.warn(code, message);
                if (code === 'CANCELLED') {
                    alert('Location cancelled by user or by another request');
                }
                if (code === 'UNAVAILABLE') {
                    alert('Location service is disabled or unavailable');
                }
                if (code === 'TIMEOUT') {
                    alert('Location request timed out');
                }
                if (code === 'UNAUTHORIZED') {
                    alert('Authorization denied');
                }
                setIsLocationLoading(false);
            });
        } catch (error) {
            setIsLocationLoading(false);
        }
    }

    const Process_Location = (location) => {
        let temp = [];
        temp.push("accuracy:" + location.accuracy);
        temp.push("altitude:" + location.altitude);
        temp.push("bearing:" + location.bearing);
        temp.push("latitude:" + location.latitude);
        temp.push("longitude:" + location.longitude);
        temp.push("provider:" + location.provider);
        temp.push("speed:" + location.speed);
        temp.push("time:" + location.time);
        return temp;
    }

    const Save = async () => {
        try {
            if (location != null) {
                await firestore().collection("users").doc(user.uid).update({
                    address: Process_Location(location)
                })
                ToastAndroid.show(
                    'Uploaded Successfully.',
                    ToastAndroid.SHORT
                );
                navigation.goBack();
            } else {
                alert("Please Get Your Location.")
            }
        } catch (error) {
            console.log(error);
        }
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
                <Text style={{ color: "white", height: 50, fontSize: 20, textAlign: 'center', paddingLeft: '19%', paddingTop: 12, fontWeight: 'bold' }}>{t('UserChangeAddressScreenTitle')}</Text>
            </View>
            {/* End Search bar with drawer */}

            <Content style={{ marginHorizontal: 15, paddingVertical: 10 }}>

                <View style={{
                    marginTop: 5, marginBottom: 15, width: '100%', height: 45,
                    borderColor: route.params.Color, borderRadius: 5, borderWidth: 1, flexDirection: 'row',
                    alignItems: 'center', backgroundColor: '#fff', borderWidth: 1,
                    justifyContent: 'space-between'
                }}>
                    <View style={{
                        padding: 10, height: '100%', justifyContent: 'center',
                        alignItems: 'center', borderRightColor: route.params.Color, borderRightWidth: 1, width: 50,
                    }}>
                        <AntDesign name={"enviromento"} size={25} color={route.params.Color} />
                    </View>
                    {location ?
                        (<Text style={{ padding: 10, fontSize: 14, fontFamily: 'Lato-Regular', color: '#333', flex: 3 }}>
                            {location.latitude + "," + location.longitude}
                        </Text>)
                        :
                        <Text style={{ padding: 10, fontSize: 16, fontFamily: 'Lato-Regular', color: '#333', flex: 3 }}>
                            {t('UserChangeAddressScreenNoLocation')}
                        </Text>
                    }
                    <Button disabled={IsLocationLoading} style={{
                        width: '30%', height: 44, backgroundColor: route.params.Color, padding: 10,
                        alignItems: 'center', justifyContent: 'center', borderRadius: 3, flex: 2
                    }}
                        onPress={requestLocation} >
                        <Text style={{ fontSize: 12 }}>{t('UserChangeAddressScreenGetLocation')}</Text>
                    </Button>
                </View>
                <View style={{ flexDirection: "row", justifyContent: 'center' }}>
                    <Button style={{ height: 43, backgroundColor: route.params.Color, padding: 10, borderRadius: 3 }}
                        onPress={Save} >
                        <Text style={styles.buttonText}>{t('UserChangeAddressScreenSave')}</Text>
                    </Button>
                </View>

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

export default ChangeAddressScreen;

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