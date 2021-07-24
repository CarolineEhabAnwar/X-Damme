import React, { useContext, useState, useEffect } from 'react';
import { Container, Icon, Content, Button, Text } from 'native-base';
import { StyleSheet, View, Image } from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';
import { AuthContext } from '../../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import FooterComponent from '../components/FooterComponent'
import { Ionicons, FontAwesome5, FontAwesome } from '@expo/vector-icons';
import GetProfileIMGComponent from "../components/GetProfileIMGComponent";
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MechHomeScreen = ({ navigation }) => {

    const { user } = useContext(AuthContext);

    const [mech_name, set_mech_name] = useState("");
    const { t, i18n } = useTranslation();

    async function Get_Lang() {
        await AsyncStorage.getItem('Language').then((value) => {
          if (value == null) {
            AsyncStorage.setItem('Language', "en");
            i18n.changeLanguage("en");
          }
          else {
            i18n.changeLanguage(value);
          }
        });
      }

    useEffect(async () => {
        try {
            await Get_Lang();
            firestore().collection('users').doc(user.uid).get().then((User_data) => {
                set_mech_name(User_data.data().fname + " " + User_data.data().lname)
            });

        } catch (error) {
            alert(error);
        }
    },[]);


    let name = mech_name;

    return (
        <Container>
            {/* Search bar with drawer */}
            <View searchBar style={{ flexDirection: 'row', paddingTop: 26, marginBottom: 12, paddingBottom: 6,justifyContent:"center", alignContent: "center", backgroundColor: "darkgreen", top: 0 }}>
                <Text style={{ color: "white", height: 50, fontSize: 20, textAlign: 'center', paddingTop: 12, fontWeight: 'bold' }}>{t('SOHomeScreenText2')}</Text>
            </View>
            {/* End Search bar with drawer */}
            <Content>
                <GetProfileIMGComponent Color={"darkgreen"} />
                <View style={{ flexDirection: "column", justifyContent: "space-evenly" }}>
                    <View style={{ flexDirection: "column", alignItems: "center" }}>
                        <Image source={require("../../../assets/logo.png")} style={styles.logoStyle} />

                        <Text style={styles.title}>{t('SOHomeScreenText1')}</Text>
                        <Text style={styles.title}>{name}</Text>

                        <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 20 }}>
                            <Button rounded info style={{ backgroundColor: 'darkgreen', width: 150, justifyContent: "center", top: 40, marginHorizontal: 10 }}
                                onPress={() => navigation.navigate('MechAddService')}
                            >
                                <Ionicons name="add-circle-outline" style={styles.IconsStyle} size={25} color="white" />
                                <Text style={{ fontWeight: 'bold' }}> {t('MechHomeScreenText1')} </Text>
                            </Button>
                            <Button rounded style={{ backgroundColor: 'darkgreen', width: 150, justifyContent: "center", top: 40, marginHorizontal: 10 }}
                                onPress={() => navigation.navigate('MechServiceList')}>
                                <FontAwesome5 name="list" size={17} style={styles.IconsStyle} color="white" />
                                <Text style={{ fontWeight: 'bold' }}> {t('MechHomeScreenText2')} </Text>
                            </Button>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-around", marginBottom: 60, marginTop: 35 }}>
                            <Button rounded info style={{ backgroundColor: 'darkgreen', width: 150, justifyContent: "center", top: 40, marginHorizontal: 10 }}
                                onPress={() => navigation.navigate('MechRequests')}>
                                <FontAwesome5 name="buffer" size={24} style={styles.IconsStyle} color="white" />
                                <Text style={{ fontWeight: 'bold' }}> {t('SORequestsScreenText3')} </Text>
                            </Button>
                            <Button rounded info style={{ backgroundColor: 'darkgreen', width: 150, justifyContent: "center", top: 40, marginHorizontal: 10 }}
                                onPress={() => navigation.navigate('MechAddOffer')}
                            >
                                <FontAwesome name="percent" size={22} style={styles.IconsStyle} color="white" />
                                <Text style={{ fontWeight: 'bold' }}> {t('SOAddOfferScreenText4')} </Text>
                            </Button>
                        </View>
                    </View>
                </View>
            </Content>

            <FooterComponent
                home="MechHome"
                profile="MechProfile"
                contactus="MechContactUs"
                bkcolor="darkgreen"
            />

        </Container>
    );

}

const styles = StyleSheet.create({

    subtitle: {
        fontSize: 36,
        justifyContent: "center",
        alignSelf: "center"
    },
    logoStyle: {
        marginTop: 40,
        marginVertical: 20,
        width: 160,
        height: 120
    },
    title: {
        fontSize: 40,
        marginBottom: -2,
        color: 'darkgreen',
        textShadowColor: 'black',
        textShadowRadius: 2,
        textShadowOffset: {
            width: 2,
            height: 2
        }
    },
    IconsStyle: {
        marginLeft: 15,
        marginRight: -15
    }
});

export default MechHomeScreen;