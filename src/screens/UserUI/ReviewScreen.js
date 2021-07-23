import React, { useContext, useState, useEffect } from 'react';
import firestore, { firebase } from '@react-native-firebase/firestore';
import { AuthContext } from '../../navigation/AuthProvider';
import { SafeAreaView, TextInput, Image, StyleSheet, View, TouchableOpacity, Animated } from 'react-native';
import { Container, FooterTab, Footer, Badge, InputGroup, Input, Header, Content, Card, Icon, CardItem, Thumbnail, Text, Button, Left, Body, Right } from 'native-base';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { Rating } from 'react-native-ratings';
import { useTranslation } from 'react-i18next';


const ReviewScreen = ({ navigation, route }) => {

    const { user } = useContext(AuthContext);
    const [review, setReview] = useState("");
    const [itemrating, setItemRating] = useState("");
    const [shoprating, setShopRating] = useState("");
    const [approved, setApproval] = useState(true);
    const [reviewID, setReviewID] = useState("");
    const [item, setItem] = useState([]);
    const { t, i18n } = useTranslation();

    async function Get_User_Review() {

        await firestore().collection("CarStuff").doc(route.params.ItemID).get().then((Data) => {
            if (Data.exists) {
                setItem({...Data.data(),key:Data.id});
            }
        })

        await firestore().collection('Reviews').where('UserID', '==', user.uid)
            .where("ItemID", "==", route.params.ItemID)
            .get()
            .then(querySnapshot => {
                if (querySnapshot.docs.length == 0) {
                    setApproval(true)
                }
                else {
                    querySnapshot.forEach(documentSnapshot => {
                        setReviewID(documentSnapshot.id);
                        setItemRating(documentSnapshot.data().ItemStarRating);
                        setShopRating(documentSnapshot.data().ShopStarRating);
                        setReview(documentSnapshot.data().Review)
                    });

                    setApproval(false)
                }

            });

    }

    useEffect(() => { Get_User_Review() }, []);

    return (
        <Container>
            {/* Text with drawer */}
            <View searchBar style={{ flexDirection: 'row', paddingTop: 25, marginBottom: 12, paddingBottom: 6, alignContent: "center", backgroundColor: "darkred", top: 0 }}>
                <Button transparent onPress={() => navigation.goBack()} >
                    <Ionicons
                        name='arrow-back-outline'
                        style={{ fontSize: 30, marginTop: 4, marginRight: 12, marginLeft: 12, color: 'white' }}
                    />
                </Button>
                <Text style={{ color: "white", height: 50, fontSize: 20, textAlign: 'center', paddingLeft: '30%', paddingTop: 12, fontWeight: 'bold' }}>{t('UserReviewScreenText1')}</Text>
            </View>
            {/* End Text with drawer */}
            <Content>
                <View>
                    <Text style={styles.title}>{t('UserReviewScreenText2')}</Text>
                    <Text style={styles.title}>{t('UserReviewScreenText3')}</Text>
                    <Rating
                        showRating fractions={1}
                        startingValue={itemrating}
                        onFinishRating={setItemRating}
                        style={{ paddingVertical: 10 }}
                    />
                    <Text style={styles.title}>{t('UserReviewScreenText4')}</Text>
                    <Rating
                        showRating fractions={1}
                        startingValue={shoprating}
                        onFinishRating={setShopRating}
                        style={{ paddingVertical: 10 }}
                    />
                    <TextInput
                        style={{ height: 180, marginHorizontal: 15, marginVertical: 10, borderColor: "darkred", borderWidth: 1, fontSize: 16 }}
                        onChangeText={setReview}
                        value={review}
                        placeholder={t('UserReviewScreenText5')}
                        textAlignVertical={'top'}
                        multiline
                        numberOfLines={5}
                    />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignSelf: 'center' }}>
                    <Button style={styles.buttonStyle}
                        onPress={
                            async () => {
                                try {
                                    if (approved) {
                                        await firestore().collection("Reviews").add({
                                            ItemID: route.params.ItemID,
                                            ShopOwnerID: route.params.shopownerID,
                                            ItemStarRating: itemrating,
                                            ShopStarRating: shoprating,
                                            Review: review,
                                            UserID: user.uid,
                                            ReviewDate: firestore.Timestamp.fromDate(new Date()),
                                        })

                                        alert(t('UserReviewScreenText6'));
                                    }

                                    else {
                                        await firestore().collection("Reviews").doc(reviewID).update({
                                            ItemStarRating: itemrating,
                                            ShopStarRating: shoprating,
                                            Review: review,
                                        })
                                        alert(t('UserReviewScreenText7'));

                                    }

                                    navigation.push('ItemDetails', {
                                        Item: item
                                    })
                                }
                                catch (error) {
                                    alert(error);
                                }
                            }}>
                        <Text style={styles.buttonTextStyle}>{t('UserReviewScreenText8')}</Text>
                    </Button>
                    <Button style={styles.buttonStyle} onPress={() => navigation.navigate("ItemDetails")}>
                        <Text style={styles.buttonTextStyle}>{t('UserReviewScreenText9')}</Text>
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
        </Container >
    );
}

export default ReviewScreen;

const styles = StyleSheet.create({
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
        textAlign: "center",
        fontWeight: 'bold',
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