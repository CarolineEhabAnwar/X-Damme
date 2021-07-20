import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Container, Content, Item, Input, Text, Form, Button } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import FooterComponent from '../components/FooterComponent'
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../navigation/AuthProvider';


const GoPremiumScreen = ({ navigation, route }) => {

    const { user } = useContext(AuthContext);
    const [Status, setStatus] = useState(null);
    const [RemainingDuration, setRemainingDuration] = useState(null);
    const [loading, setLoading] = useState(true);

    async function Subscribe(Duration, Text) {
        try {
            var state = "null";
            var Already_Subscribed_Start_Date;
            var Already_Subscribed_Duration;
            await firestore().collection("users").doc(user.uid).get().then((Data) => {
                if (Data.exists) {
                    if (Data.data().IsPremium == null) {
                        state = "null";
                    }
                    else if (Data.data().IsPremium == true) {
                        state = "Already Subscribed";
                        Already_Subscribed_Start_Date = Data.data().PremiumStartDate;
                        Already_Subscribed_Duration = Data.data().PremiumDur;
                    }
                    else {
                        state = "Not Subscribed";
                    }
                }
            });

            if (state == "null" || state == "Not Subscribed") {
                await firestore().collection("users").doc(user.uid).update({
                    IsPremium: true,
                    PremiumStartDate: firestore.Timestamp.fromDate(new Date()),
                    PremiumDur: Duration,
                })
                LoadUp();
                alert("Subscribed Succesfully for " + Duration + " " + Text);
            }
            else if (state == "Already Subscribed") {
                Alert.alert(
                    "You are already Subscribed.",
                    "If you want to add another duration press update.",
                    [
                        {
                            text: "Cancel",
                            style: "cancel"
                        },
                        {
                            text: "Update", onPress: async () => {
                                await firestore().collection("users").doc(user.uid).update({
                                    PremiumDur: (Duration + Already_Subscribed_Duration),
                                })
                                var Day = new Date().getDate(Already_Subscribed_Start_Date.toMillis());
                                var Month = (new Date().getMonth(Already_Subscribed_Start_Date.toMillis()) + 1);
                                var Year = new Date().getFullYear(Already_Subscribed_Start_Date.toMillis());
                                var Full_Date = Day + "/" + Month + "/" + Year;
                                LoadUp();
                                alert("Subscription updated to be " + (Duration + Already_Subscribed_Duration) + " " + Text + " Started at " + Full_Date);
                            }
                        }
                    ]
                );
            }

        } catch (error) {
            alert(error);
        }

    }

    async function Unsubscribe() {
        try {
            Alert.alert(
                "You are sure you want to Unsubscribe ?",
                "",
                [
                    {
                        text: "No",
                        style: "cancel"
                    },
                    {
                        text: "Yes", onPress: async () => {
                            await firestore().collection("users").doc(user.uid).update({
                                IsPremium: false,
                                PremiumStartDate: null,
                                PremiumDur: 0,
                            });
                            LoadUp();
                            alert("Unsubscribed Succesfully...")
                        }
                    }
                ]
            );
        } catch (error) {
            alert("Something gone wrong please try again later.")
        }

    }

    async function LoadUp() {
        setLoading(true);
        await firestore().collection("users").doc(user.uid).get().then((Data) => {
            if (Data.exists) {
                if (Data.data().IsPremium == null || Data.data().IsPremium == false)
                    setStatus("Unsubscribed");
                else {
                    setStatus("Subscribed");
                    var due_date_temp = Data.data().PremiumStartDate.toMillis() + (Data.data().PremiumDur * 2629800000);
                    var time_now = firestore.Timestamp.fromDate(new Date()).toMillis();
                    var remaining_months_temp = Math.round((due_date_temp - time_now) / 2629800000);
                    if (remaining_months_temp == 1)
                        setRemainingDuration(remaining_months_temp + " Month");
                    else
                        setRemainingDuration(remaining_months_temp + " Months");
                }
            }
        });
        setLoading(false);
    }

    useEffect(() => {
        try {
            LoadUp();
        } catch (error) {
            alert("Something gone wrong please try again later.")
        }
    }, []);

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
                <Text style={{ color: "white", height: 50, fontSize: 20, textAlign: 'center', paddingLeft: '23%', paddingTop: 12, fontWeight: 'bold' }}>Go Premium</Text>
            </View>
            {/* End Search bar with drawer */}

            <Content style={{ marginHorizontal: 15, paddingVertical: 10 }}>

                {!loading ?
                    <Form>
                        <View style={{ borderBottomWidth: 1, borderColor: route.params.Color, width: "auto" }}>
                            <Text style={{ fontSize: 25, marginBottom: 10 }}>Status: <Text style={{ color: route.params.Color, fontSize: 20 }}>{Status}</Text></Text>
                            {Status == "Subscribed" ?
                                <Text style={{ fontSize: 25, marginBottom: 10 }}>Remaning <Text style={{ color: route.params.Color, fontSize: 20 }}>{RemainingDuration}</Text></Text>
                                :
                                null}
                        </View>

                        <View style={{ width: "70%", marginTop: 10, flexDirection: "row", justifyContent: "space-between", marginBottom: 20 }}>
                            <Text style={{ flex: 1, fontSize: 30, color: route.params.Color }}>Price</Text>
                            <Text style={{ flex: 0.9, fontSize: 30, color: route.params.Color }}>Duration</Text>
                        </View>

                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
                            <Text style={{ flex: 1, fontSize: 25, alignSelf: "center", color: route.params.Color }}>29.99 EGP</Text>
                            <Text style={{ flex: 0.8, fontSize: 25, alignSelf: "center", color: route.params.Color }}>1 Month</Text>
                            <Button style={{ borderRadius: 20, backgroundColor: route.params.Color }} onPress={() => { Subscribe(1, "Month") }}><Text>Subscribe</Text></Button>
                        </View>

                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
                            <Text style={{ flex: 1, fontSize: 25, alignSelf: "center", color: route.params.Color }}>79.99 EGP</Text>
                            <Text style={{ flex: 0.8, fontSize: 25, alignSelf: "center", color: route.params.Color }}>3 Month</Text>
                            <Button style={{ borderRadius: 20, backgroundColor: route.params.Color }} onPress={() => { Subscribe(3, "Month") }}><Text>Subscribe</Text></Button>
                        </View>

                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
                            <Text style={{ flex: 1, fontSize: 25, alignSelf: "center", color: route.params.Color }}>149.99 EGP</Text>
                            <Text style={{ flex: 0.8, fontSize: 25, alignSelf: "center", color: route.params.Color }}>6 Month</Text>
                            <Button style={{ borderRadius: 20, backgroundColor: route.params.Color }} onPress={() => { Subscribe(6, "Month") }}><Text>Subscribe</Text></Button>
                        </View>

                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
                            <Text style={{ flex: 1, fontSize: 25, alignSelf: "center", color: route.params.Color }}>289.99 EGP</Text>
                            <Text style={{ flex: 0.8, fontSize: 25, alignSelf: "center", color: route.params.Color }}>1 Year</Text>
                            <Button style={{ borderRadius: 20, backgroundColor: route.params.Color }} onPress={() => { Subscribe(12, "Month") }}><Text>Subscribe</Text></Button>
                        </View>

                        {Status == "Subscribed" ?
                            <Button style={{ borderRadius: 20, backgroundColor: route.params.Color, alignSelf: "center", marginTop: 40 }} onPress={() => { Unsubscribe() }}><Text>Unsubscribe</Text></Button>
                            :
                            null
                        }

                    </Form>
                    :
                    <Text style={{
                        color: route.params.Color,
                        alignSelf: 'center',
                        fontSize: 22,
                        textAlignVertical: 'center',
                        fontWeight: 'bold',
                        marginTop: 180
                    }}>
                        Loading... </Text>
                }

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

export default GoPremiumScreen;

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
    },
})