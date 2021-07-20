import React, { Component, useState, useEffect, useContext } from 'react';
import { Image, StyleSheet, View, Modal, TextInput, ToastAndroid } from 'react-native';
import { Container, FooterTab, Content, Icon, Text, Button, Item, Input, List, ListItem, Card, CardItem, Body, Picker } from 'native-base';
import { DrawerActions } from 'react-navigation-drawer';
import { FontAwesome5, Ionicons, Foundation, MaterialCommunityIcons, Entypo, SimpleLineIcons, AntDesign } from '@expo/vector-icons';
import { AuthContext } from '../../navigation/AuthProvider';
import firestore from "@react-native-firebase/firestore";
import PieChartComponent from '../components/PieChartComponent';
import { useTranslation } from 'react-i18next';

const BestCarsScreen = ({ navigation }) => {

    const { t, i18n } = useTranslation();
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [Brands, setBrands] = useState([]);
    const [Models, setModels] = useState([]);

    async function LoadUP() {
        setLoading(true)

        let All_Items = [];
        await firestore().collection("CarStuff").get().then((Docs) => {
            if (Docs.docs.length != 0) {
                for (let i = 0; i < Docs.docs.length; i++) {
                    All_Items.push(Docs.docs[i].data());
                }
            }
        })
        let All_Brands = [];
        let All_Models = [];
        await firestore().collection("Car Brands and Models").get().then((BrandsAndModels) => {
            if (BrandsAndModels.docs.length != 0) {
                for (let i = 0; i < BrandsAndModels.docs.length; i++) {
                    All_Brands.push(BrandsAndModels.docs[i].data().Brand);
                    let temp = []
                    for (let j = 1; j < BrandsAndModels.docs[i].data().Models.length; j++) {
                        temp.push(BrandsAndModels.docs[i].data().Models[j])
                    }
                    All_Models.push(temp);
                }
            }
        })

        let Brand_Percentages = [];
        let Items_Per_Brand = [];

        for (let i = 0; i < All_Brands.length; i++) {
            let counter_Brand = 0;
            let temp_brands_per_models = [];
            for (let j = 0; j < All_Items.length; j++) {
                if (All_Items[j].Car_Brand == All_Brands[i]) {
                    counter_Brand++;
                    temp_brands_per_models.push(All_Items[j])
                }
            }
            Brand_Percentages.push({ Number: counter_Brand, Name: All_Brands[i], key: i })
            Items_Per_Brand.push(temp_brands_per_models);
        }
        let Model_Percentages = [];
        for (let i = 0; i < All_Brands.length; i++) {
            let temp_models_for_brand = [];
            for (let x = 0; x < All_Models[i].length; x++) {
                let counter_Model = 0;
                for (let j = 0; j < Items_Per_Brand[i].length; j++) {
                    if (Items_Per_Brand[i][j].Car_Model == All_Models[i][x]) {
                        counter_Model++;
                    }
                }
                temp_models_for_brand.push({ Number: counter_Model, Name: All_Brands[i] + " " + All_Models[i][x], key: i })
            }
            Model_Percentages.push(temp_models_for_brand);
        }

        setBrands(Brand_Percentages);
        setModels(Model_Percentages);

        // console.log("Brands Percentages: ");
        // for (let i = 0; i < Brand_Percentages.length; i++) {
        //     console.log("For: " + Brand_Percentages[i].Name + " has Percentage:" + Brand_Percentages[i].Number)
        // }
        // console.log("Models Percentages: ")
        // for (let j = 0; j < Brand_Percentages.length; j++) {
        //     for (let i = 0; i < Model_Percentages[j].length; i++) {
        //         console.log("For "+ Model_Percentages[j][i].Name + " Models Percentages: " + Model_Percentages[j][i].Number);
        //     }
        // }

        setLoading(false)
    }

    useEffect(() => {
        try {
            LoadUP();
        } catch (error) {
            console.log(error)
        }
    }, []);

    return (
        <Container>

            {/* Text with drawer */}
            <View searchBar style={{ flexDirection: 'row', paddingTop: 25, marginBottom: 0, paddingBottom: 6, alignContent: "center", backgroundColor: "darkred", top: 0 }}>
                <Button transparent onPress={() => navigation.push('Recommendation')} >
                    <Ionicons
                        name='arrow-back-outline'
                        style={{ fontSize: 30, marginTop: 4, marginRight: 12, marginLeft: 12, color: 'white' }}
                    />
                </Button>
                <Text style={{ color: "white", height: 50, fontSize: 20, textAlign: 'center', paddingLeft: '22%', paddingTop: 12, fontWeight: 'bold' }}>{t('UserBestCarsScreenTitle')}</Text>
            </View>
            {/* End Text with drawer */}

            {loading ?
                <Content>
                    <Text style={styles.loadingStyle}>{t('UserBestCarsScreenLoading')}</Text>
                </Content>
                :
                <Content>
                    <PieChartComponent
                        Items={Brands}
                    />
                    {Models.map((item, index) => {
                        return (
                            <PieChartComponent
                                Items={item}
                                key={index}
                            />)
                    })}
                </Content>
            }

            {/* Footer */}
            <View style={{ flexDirection: 'row', alignContent: "center", backgroundColor: "darkred" }}>
                <FooterTab transparent style={{ backgroundColor: "darkred" }}>
                    <Button style={{ marginTop: 5 }} onPress={() => navigation.navigate('Home')}>
                        <Icon style={{ color: 'white' }} name="home" />
                        <Text style={{ color: 'white' }}> {t('UserHomeScreenHome')}</Text>
                    </Button>

                    <Button style={{ marginTop: 5 }} onPress={() => navigation.navigate('Profile')}>
                        <Icon name="person" style={{ color: 'white' }} />
                        <Text style={{ color: 'white' }}>{t('UserHomeScreenHome')}</Text>
                    </Button>

                    <Button style={{ marginTop: 5 }} onPress={() => navigation.navigate('ContactUs')}>
                        <Icon style={{ color: 'white' }} name="call" />
                        <Text style={{ color: 'white' }} >{t('UserHomeScreenHome')}</Text>
                    </Button>
                </FooterTab>
            </View>
            {/* End Footer */}
        </Container>
    );
}

export default BestCarsScreen;

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
        borderColor: "darkred",
        borderWidth: 3,
        maxWidth: 500,
        marginLeft: "auto",
        marginRight: "auto"
    },
    InputStyle: {
        marginBottom: 10,
        borderColor: 'black',
        borderRadius: 6,
        justifyContent: 'space-between',
        width: 390
    },
    loadingStyle: {
        color: 'darkred',
        alignSelf: 'center',
        fontSize: 22,
        textAlignVertical: 'center',
        fontWeight: 'bold',
        marginTop: 180
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        paddingHorizontal: 35,
        paddingTop: 35,
        height: 160,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    container: { alignItems: 'center', justifyContent: 'center', height: 1050 },
    gauge: {
        position: 'absolute',
        width: 100,
        height: 160,
        alignItems: 'center',
        justifyContent: 'center',
    },
    gaugeText: {
        backgroundColor: 'transparent',
        color: '#000',
        fontSize: 24,
    },
})