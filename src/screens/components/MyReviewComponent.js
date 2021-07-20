import React, { Component, useState, useEffect, useContext } from 'react';
import firestore from '@react-native-firebase/firestore';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Card, CardItem, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import { AuthContext } from '../../navigation/AuthProvider';
import { useNavigation } from '@react-navigation/native';
import { Rating } from 'react-native-ratings';
import Moment from 'moment';
import { useTranslation } from 'react-i18next';



const MyReviewComponent = (props) => {
    const navigation = useNavigation();
    const { t, i18n } = useTranslation();
    const [loading, setLoading] = useState(true);
    const [Shop_Owner_Name, setShopOwner_name] = useState("");
    const [items, setItems] = useState([]);

    async function Fetch_Data() {
        setLoading(true);
        await firestore()
            .collection('CarStuff')
            .doc(props.item).get().then((Data) => {
                if (Data.exists) {
                    setItems(Data.data());
                }
            })
        setLoading(false);
    }

    function Get_ShopOwner_Name() {
        useEffect(() => {
            try {
                if (props.shopowner != null) {
                    const subscriber = firestore()
                        .collection('users')
                        .doc(props.shopowner)
                        .onSnapshot(documentSnapshot => {
                            if (documentSnapshot.exists) {
                                setShopOwner_name(documentSnapshot.data().fname + " " + documentSnapshot.data().lname);
                            }
                        });
                    // Stop listening for updates when no longer required
                    return () => subscriber();
                }
            } catch (error) {
                alert(error);
            }
        }, []);
    }

    Get_ShopOwner_Name();


    useEffect(() => {
        Fetch_Data();
    }, []);





    return (
        <View style={{ borderColor: "darkred", borderWidth: 2, marginVertical: 5 }}>
            {loading ?
                null
                :
                <View>
                    <Text style={styles.title}>{t('MyReviewComponentText1')}  </Text>

                    <TouchableOpacity onPress={() => navigation.navigate('ItemDetails', {
                        ItemName: items.Name,
                        CarBrand: items.Car_Brand,
                        CarModel: items.Car_Model,
                        Price: items.Price,
                        MadeIn: items.Made_In,
                        Manufacture_Date: items.Manufacture_Date,
                        Quality: items.Quality,
                        Shop_Owner: Shop_Owner_Name,
                        ItemIMG: items.Image_Path,
                        ItemID: props.item,
                        ShopOwnerID: items.Shop_Owner_ID
                    })}>
                        <Text style={styles.howWeCalculate}>{items.Name}</Text>
                    </TouchableOpacity>
                    <Text style={styles.title}>{t('MyReviewComponentText2')} <Text style={styles.writing}>{Moment(props.dateofreview).format('d MMM yyyy')} </Text></Text>

                    <Text style={styles.title}>{t('MyReviewComponentText3')} </Text>
                    <Rating
                        showRating fractions={1}
                        startingValue={props.itemrating}
                        readonly
                        style={{ paddingVertical: 10 }}
                    />
                    <Text style={styles.title}>{t('MyReviewComponentText4')} </Text>

                    <Text
                        style={styles.writing}
                        multiline
                        textAlignVertical={'top'}
                    >
                        {props.writtenreview}
                    </Text>
                    <Text style={styles.title}>{t('MyReviewComponentText5')} <Text style={styles.writing}>{Shop_Owner_Name} </Text></Text>


                    <Text style={styles.title}>{t('MyReviewComponentText6')} </Text>
                    <Rating
                        showRating fractions={1}
                        startingValue={props.shoprating}
                        readonly
                        style={{ paddingVertical: 10 }}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignSelf: 'center', marginVertical: 10 }}>
                        <Button style={styles.buttonStyle}
                            onPress={() => navigation.navigate("Review", {
                                ItemID: props.item,
                                shopownerID: props.shopowner,

                            })
                            }>
                            <Text style={styles.buttonTextStyle}>{t('MyReviewComponentText7')}</Text>
                        </Button>
                        <Button style={styles.buttonStyle} onPress={() => {
                            firestore()
                                .collection('Reviews')
                                .doc(props.reviewID)
                                .delete()
                                .then(() => {
                                    alert(t('MyReviewComponentText9'));
                                });
                        }}>
                            <Text style={styles.buttonTextStyle}>{t('MyReviewComponentText8')}</Text>
                        </Button>
                    </View>
                </View>
            }
        </View>
    );
}

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
    writing: {
        marginHorizontal: 15,
        marginVertical: 10,
        fontSize: 18,
        fontWeight: "bold"
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
        fontSize: 19,
        color: "darkcyan",
        textAlign: "left",
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 5,
        fontStyle: 'italic',
        marginLeft: 20

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

export default MyReviewComponent;
