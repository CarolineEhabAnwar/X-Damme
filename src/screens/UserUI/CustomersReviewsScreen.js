import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, LogBox } from 'react-native';
import { Container, InputGroup, FooterTab, Input, Content, Text, Button, Icon } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import firestore from "@react-native-firebase/firestore";
import ReviewComponent from '../components/ReviewComponent';
import { useTranslation } from 'react-i18next';

const CustomersReviewsScreen = ({ navigation, route }) => {

    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    LogBox.ignoreLogs(['Animated: `useNativeDriver` was not specified.']);

    const [reviews, setReviews] = useState([]); // Initial empty array of Reviews
    const [loading, setloading] = useState(true);
    const { t, i18n } = useTranslation();

    async function Get_Reviews() {
        try {
            const subscriber = await firestore()
                .collection('Reviews')
                .onSnapshot(querySnapshot => {
                    const temp_reviews = [];

                    querySnapshot.forEach(documentSnapshot => {
                        if (documentSnapshot.data().ItemID == route.params.itemID) {
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

    }

    useEffect(() => {
        Get_Reviews();
    }, []);

    return (
        <Container>
            {/* Item Card */}
            {/* Search bar with nav back */}
            <View searchBar style={{ flexDirection: 'row', paddingTop: 25, marginBottom: 12, paddingBottom: 6, alignContent: "center", backgroundColor: "darkred", top: 0 }}>
                <Button transparent onPress={() => navigation.goBack()} >
                    <Ionicons
                        name='arrow-back-outline'
                        style={{ fontSize: 30, marginTop: 4, marginRight: 12, marginLeft: 12, color: 'white' }}
                    />
                </Button>
            </View>
            {/* End Search bar with nav back */}
            <Container>

                {loading ? <Text style={styles.loadingStyle}>{t('UserCustomersReviewScreenLoading')} </Text> :
                    <FlatList
                        data={reviews}
                        renderItem={({ item }) => {
                            return (
                                <ReviewComponent
                                    reviewer={item.UserID}
                                    dateofreview={item.ReviewDate}
                                    itemrating={item.ItemStarRating}
                                    writtenreview={item.Review}
                                    shoprating={item.ShopStarRating}
                                />);
                        }}
                    />
                }

            </Container>
            {/* Footer */}
            <View style={{ flexDirection: 'row', alignContent: "center", backgroundColor: "darkred" }}>
                <FooterTab transparent style={{ backgroundColor: "darkred" }}>
                    <Button style={{ marginTop: 5 }} onPress={() => navigation.navigate('Home')}>
                        <Icon style={{ color: 'white' }} name="home" />
                        <Text style={{ color: 'white' }}> {t('UserHomeScreenHome')}</Text>
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

export default CustomersReviewsScreen;