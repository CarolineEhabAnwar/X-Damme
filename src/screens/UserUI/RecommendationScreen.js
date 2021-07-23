import React, { Component, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Container, FooterTab, Content, Icon, Text, Button, List, ListItem, Card, CardItem, Body } from 'native-base';
import { DrawerActions } from 'react-navigation-drawer';
import { FontAwesome5, Ionicons, Foundation, MaterialCommunityIcons, Entypo, SimpleLineIcons, AntDesign } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import { useTranslation } from 'react-i18next';

const RecommendationScreen = ({ navigation }) => {

    const { t, i18n } = useTranslation();

    return (
        <Container>

            {/* Text with drawer */}
            <View searchBar style={{ flexDirection: 'row', paddingTop: 25, marginBottom: 0, paddingBottom: 6, alignContent: "center", backgroundColor: "darkred", top: 0 }}>
                <Button transparent onPress={() => navigation.navigate('Home')} >
                    <Ionicons
                        name='arrow-back-outline'
                        style={{ fontSize: 30, marginTop: 4, marginRight: 12, marginLeft: 12, color: 'white' }}
                    />
                </Button>
                <Text style={{ color: "white", height: 50, fontSize: 20, textAlign: 'center', paddingLeft: '22%', paddingTop: 12, fontWeight: 'bold' }}>{t('UserRecommendationScreenText1')}</Text>
            </View>
            {/* End Text with drawer */}
            <Content>
                <View style={styles.container}>
                    <Button style={{ height: 150,  backgroundColor: 'red' }}
                        onPress={() => navigation.push("HotOffers")}
                    >
                        <SimpleLineIcons style={{ marginLeft: 30, flex: 3, fontSize: 100 }} name='fire' />
                        <Text style={{ flex: 8, fontWeight: 'bold', fontSize: 40 }}>{t('UserRecommendationScreenText2')}</Text>
                    </Button>
                </View>
                <View style={styles.container}>
                    <Button style={{ height: 150,  backgroundColor: "#00FF00" }}
                        onPress={() => navigation.push("Reminder")}
                    >
                        <AntDesign style={{ marginLeft: 30, flex: 3, fontSize: 100 }} name='calendar' />
                        <Text style={{ flex: 8, fontWeight: 'bold', fontSize: 40 }}>{t('UserRecommendationScreenText3')}</Text>
                    </Button>
                </View>
                <View style={styles.container}>
                    <Button style={{ height: 150,  backgroundColor: 'blue' }}
                        onPress={() => navigation.push("BestCars")}
                    >
                        <AntDesign style={{ marginLeft: 30, flex: 3, fontSize: 90 }} name='car' />
                        <Text style={{ flex: 8, fontWeight: 'bold', fontSize: 40 }}>{t('UserRecommendationScreenText4')}</Text>
                    </Button>
                </View>
            </Content>
            {/* Footer */}
            <View style={{ flexDirection: 'row', alignContent: "center", backgroundColor: "darkred" }}>
                <FooterTab transparent style={{ backgroundColor: "darkred" }}>
                    <Button style={{ marginTop: 5 }} onPress={() => navigation.navigate('Home')}>
                        <Icon style={{ color: 'white' }} name="home" />
                        <Text style={{ color: 'white' }}>{t('UserHomeScreenHome')}</Text>
                    </Button>

                    <Button style={{ marginTop: 5 }} onPress={() => navigation.navigate('Profile')}>
                        <Icon name="person" style={{ color: 'white' }} />
                        <Text style={{ color: 'white' }}>{t('UserHomeScreenProfile')}</Text>
                    </Button>

                    <Button style={{ marginTop: 5 }} onPress={() => navigation.navigate('ContactUs')}>
                        <Icon style={{ color: 'white' }} name="call" />
                        <Text style={{ color: 'white' }} >{t('UserHomeScreenContactUs')}</Text>
                    </Button>
                </FooterTab>
            </View>
            {/* End Footer */}
        </Container>
    );
}

export default RecommendationScreen;

const styles = StyleSheet.create({
    textStyles: {
        fontSize: 20,
        marginBottom: 4,
        fontWeight: 'bold',
        color: 'black',
        textShadowColor: 'darkred',
        textShadowRadius: 1.5,
        textShadowOffset: {
            width: 0.5,
            height: 0.5
        },
        marginBottom: 10

    },

    buttonStyle: {
        marginTop: 7,
        backgroundColor: 'darkred',
        marginRight: 10,
        alignSelf: 'center'
    },

    buttonTextStyle: {
        fontWeight: 'bold'
    },
    container: {
        marginTop: 10,
        margin:2,
        borderColor: "darkred",
        borderWidth: 3,
        maxWidth: 500
    }
})