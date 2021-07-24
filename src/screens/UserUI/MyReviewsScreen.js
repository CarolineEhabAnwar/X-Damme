import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView, LogBox } from 'react-native';
import { Container, InputGroup, FooterTab, Input, Content, Text, Button, Icon } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import firestore from "@react-native-firebase/firestore";
import MyReviewComponent from '../components/MyReviewComponent'
import { AuthContext } from '../../navigation/AuthProvider';
import { useTranslation } from 'react-i18next';


const MyReviewsScreen = ({ navigation, route }) => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver` was not specified.']);
    const { t, i18n } = useTranslation();
    const [reviews, setReviews] = useState([]); // Initial empty array of Reviews
    const [loading, setloading] = useState(true);

    const { user } = useContext(AuthContext);

    useEffect(() => {
        try {
            const subscriber = firestore()
                .collection('Reviews')
                .onSnapshot(querySnapshot => {
                    const temp_reviews = [];

                    querySnapshot.forEach(documentSnapshot => {
                        if (documentSnapshot.data().UserID == user.uid) {
                            temp_reviews.push({
                                ...documentSnapshot.data(),
                                key: documentSnapshot.id,
                            });
                        }

                    });
                    setReviews(temp_reviews);
                    if (loading)
                        setloading(false);
                });

            // Unsubscribe from events when no longer in use
            return () => subscriber();
        } catch (error) {
            alert(error);
        }

    }, []);

    return (
        <Container>
            {/* Item Card */}
            {/* Text with drawer */}
            <View searchBar style={{ flexDirection: 'row', paddingTop: 25, marginBottom: 0, paddingBottom: 6, alignContent: "center", backgroundColor: "darkred", top: 0 }}>
                <Button transparent onPress={() => navigation.goBack()} >
                    <Ionicons
                        name='arrow-back-outline'
                        style={{ fontSize: 30, marginTop: 4, marginRight: 12, marginLeft: 12, color: 'white' }}
                    />
                </Button>
                <Text style={{ color: "white", height: 50, fontSize: 20, textAlign: 'center', paddingLeft: '24%', paddingTop: 12, fontWeight: 'bold' }}>{t('UserMyReviewsScreenText1')}</Text>
            </View>
            {/* End Text with drawer */}
            <Container>

                {loading ? <Text style={styles.loadingStyle}>{t('UserMyReviewsScreenText1')}</Text> :
                    <ScrollView >
                        {reviews.map((item, index) => {
                            return (
                                <MyReviewComponent
                                    key={index}
                                    item={item.ItemID}
                                    dateofreview={item.ReviewDate}
                                    itemrating={item.ItemStarRating}
                                    writtenreview={item.Review}
                                    shoprating={item.ShopStarRating}
                                    shopowner={item.ShopOwnerID}
                                    reviewID={item.key}
                                />);
                        })
                        }
                    </ScrollView>
                }

            </Container>
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
    loadingStyle: {
        color: 'darkred',
        alignSelf: 'center',
        fontSize: 22,
        textAlignVertical: 'center',
        fontWeight: 'bold',
        marginTop: 220
    }
})

export default MyReviewsScreen;