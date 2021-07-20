import React, { useState, useEffect, useContext } from 'react';
import firestore from '@react-native-firebase/firestore';
import { StyleSheet, View, Image } from 'react-native';
import { Content, Card, CardItem, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import { AuthContext } from '../../navigation/AuthProvider';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const MechanicComponent = (props) => {

    const navigation = useNavigation();
    const { t, i18n } = useTranslation();
    const { user } = useContext(AuthContext);
    const [loading, setloading] = useState(true);
    const [FinalShopRating, setFinalShopRating] = useState(0);
    const [TotalShopReviewsCount, setTotalShopReviewsCount] = useState(0);



    async function Get_Mech_Rating() {
        setloading(true);

        let shopvalue = 0;
        let final_shop_rating = 0;

        let shopCount = 0;


        try {

            await firestore().collection('Reviews').where('ShopOwnerID', '==', props.mechID)
                .get()
                .then(querySnapshot => {

                    shopCount = querySnapshot.docs.length
                    setTotalShopReviewsCount(shopCount);
                    querySnapshot.forEach(documentSnapshot => {
                        shopvalue += documentSnapshot.data().ShopStarRating;
                    });

                });

            if (shopCount == 0) {
                final_shop_rating = 0;
            }
            else {
                final_shop_rating = shopvalue / shopCount;
            }

            setFinalShopRating(final_shop_rating);
            if (loading)
                setloading(false);
        }
        catch (error) {
            alert(error);
        }

    }

    useEffect(() => {

        Get_Mech_Rating();

    }, []);


    return (
        <Content>
            {loading ? null :

                <Card style={{ borderRadius: 3 }}>
                    <CardItem>
                        <Left>
                            <Body style={{ marginBottom: 8 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 18.5 }}>{props.fname} {props.lname}</Text>
                                <Text note>{t('MechanicComponentText1')} {FinalShopRating}</Text>
                            </Body>
                        </Left>
                        {props.mech.Distance == null ? null :
                            <Right>
                                <Body style={{ marginBottom: 8 }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{t('MechanicComponentText2')}</Text>
                                    <Text style={{ fontSize: 18, color: "gray" }} note>{Math.round(props.mech.Distance * 1000 / 10) / 100} Km</Text>
                                </Body>
                            </Right>
                        }
                    </CardItem>
                    <CardItem cardBody>
                        {props.mech.profileIMG == null || props.mech.profileIMG == "" ?
                            <Image source={require("../../../assets/mechanic.png")} style={{ height: 200, width: null, flex: 1 }} />
                            :
                            <Image source={{ uri: props.mech.profileIMG }} style={{ height: 200, width: null, flex: 1 }} />
                        }
                    </CardItem>
                    <CardItem style={{ marginLeft: 'auto' }}>
                        <Right>
                            <Button style={styles.cartItemStyle} transparent onPress={() => navigation.navigate('MechanicDetails', {
                                fname: props.fname,
                                lname: props.lname,
                                address: props.address,
                                mechID: props.mechID,
                                mech: props.mech

                            })}>
                                <Text style={{ fontSize: 15, marginRight: -15, color: 'darkred', fontWeight: 'bold' }} >{t('MechanicComponentText3')} </Text>
                                <Icon active style={{ fontSize: 25, color: 'darkred' }} name="arrow-forward" />
                            </Button>
                        </Right>
                    </CardItem>
                </Card>
            }
        </Content>

    );
}

const styles = StyleSheet.create({
    textStyle: {
        marginTop: 13,
        fontSize: 15,
        marginLeft: 10,
        fontWeight: 'bold'
    },
    cartItemStyle: {
        marginTop: -4,
        marginRight: 3
    },
    loadingStyle: {
        color: 'darkred',
        alignSelf: 'center',
        fontSize: 22,
        textAlignVertical: 'center',
        fontWeight: 'bold',
        marginTop: 220
    },
})

export default MechanicComponent;
