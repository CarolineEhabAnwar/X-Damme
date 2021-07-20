import React, { useState, useEffect, useContext } from 'react';
import firestore from '@react-native-firebase/firestore';
import { StyleSheet, View, TouchableOpacity, Animated, LogBox, Modal, FlatList, Alert } from 'react-native';
import { Content, Card, Icon, CardItem, Text, Button, Item, Body } from 'native-base';
import { FontAwesome5, AntDesign } from '@expo/vector-icons';
import DatePicker from 'react-native-date-picker'
import { RadioButton } from 'react-native-paper';
import { AuthContext } from '../../navigation/AuthProvider';
import { useNavigation } from '@react-navigation/native';
import { Rating } from 'react-native-ratings';
import { useTranslation } from 'react-i18next';




const ServiceComponent = (props) => {

    const { t, i18n } = useTranslation();

    const PercentageBar = ({ starText, percentage }) => {

        const [animation] = useState(new Animated.Value(0));
        useEffect(() => {
            Animated.timing(animation, {
                toValue: percentage,
                duration: 500,
            }).start();
        }, [percentage]);

        return (
            <View
                style={{
                    flexDirection: "row",
                }}
            >
                <Text style={styles.progressText}>{starText}</Text>
                <View style={styles.progressMiddle}>
                    <View style={styles.progressWrap}>
                        <Animated.View
                            style={[
                                styles.progressBar,
                                {
                                    width: animation.interpolate({
                                        inputRange: [0, 100],
                                        outputRange: ["0.0%", "100.0%"],
                                    }),
                                },
                            ]}
                        />
                    </View>
                </View>
                <Text style={styles.progressPercentText}>{percentage}%</Text>
            </View>
        );
    };

    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    LogBox.ignoreLogs(['VirtualizedList: missing keys for items']);

    const navigation = useNavigation();

    LogBox.ignoreLogs(['Animated: `useNativeDriver` was not specified.']);

    const [TotalItemReviewsCount, setTotalItemReviewsCount] = useState(0);
    const [TotalShopReviewsCount, setTotalShopReviewsCount] = useState(0);
    const [FinalItemRating, setFinalItemRating] = useState(0);
    const [FinalShopRating, setFinalShopRating] = useState(0);
    const [starsPerc, setStarsPerc] = useState([]);
    const [loading, setloading] = useState(true);


    async function Get_Item_Rating() {
        setloading(true);

        let itemvalue = 0;
        let shopvalue = 0;
        let final_item_rating = 0;
        let final_shop_rating = 0;

        let itemCount = 0;
        let shopCount = 0;

        let temp_Stars = [0, 0, 0, 0, 0, 0];
        let temp_Stars_Perc = [0, 0, 0, 0, 0, 0];

        try {
            await firestore().collection('Reviews').where('ItemID', '==', props.serviceID)
                .get()
                .then(querySnapshot => {
                    itemCount = querySnapshot.docs.length;
                    setTotalItemReviewsCount(itemCount);
                    querySnapshot.forEach(documentSnapshot => {
                        itemvalue += documentSnapshot.data().ItemStarRating;
                        switch (Math.round(documentSnapshot.data().ItemStarRating)) {

                            case 1:
                                temp_Stars[0]++
                                break;
                            case 2:
                                temp_Stars[1]++
                                break;
                            case 3:
                                temp_Stars[2]++
                                break;
                            case 4:
                                temp_Stars[3]++
                                break;
                            case 5:
                                temp_Stars[4]++
                                break;
                            case 0:
                                temp_Stars[5]++
                                break;

                        }

                    });


                    for (let i = 0; i < temp_Stars.length; i++) {
                        if (itemCount == 0) {
                            temp_Stars_Perc[i] = 0;
                        }
                        else {
                            temp_Stars_Perc[i] = (temp_Stars[i] / itemCount) * 100;
                        }
                    }

                    setStarsPerc(temp_Stars_Perc);


                });

            await firestore().collection('Reviews').where('ShopOwnerID', '==', props.mechID)
                .get()
                .then(querySnapshot => {

                    shopCount = querySnapshot.docs.length
                    setTotalShopReviewsCount(shopCount);
                    querySnapshot.forEach(documentSnapshot => {
                        shopvalue += documentSnapshot.data().ShopStarRating;
                    });

                });

            if (itemCount == 0) {
                final_item_rating = 0;
            }
            else {
                final_item_rating = itemvalue / itemCount;
            }
            if (shopCount == 0) {
                final_shop_rating = 0;
            }
            else {
                final_shop_rating = shopvalue / shopCount;
            }

            setFinalItemRating(final_item_rating);
            setFinalShopRating(final_shop_rating);

            await firestore().collection('users').doc(user.uid).get().then((User_data) => {
                set_user_name(User_data.data().fname + " " + User_data.data().lname)
            });

            await firestore().collection('users').doc(props.mechID).get().then((User_data) => {
                set_mech_name(User_data.data().fname + " " + User_data.data().lname)
            });

            if (loading)
                setloading(false);
        }
        catch (error) {
            alert(error);
        }

    }



    const { user } = useContext(AuthContext);
    const [reserve_modalVisible, set_reserve_ModalVisible] = useState(false);

    const [checked, setChecked] = useState('');

    const [requestedTime, setRequestedTime] = useState(new Date())
    const [user_name, set_user_name] = useState("");
    const [mech_name, set_mech_name] = useState("");

    let startTime_hour;
    let requestedTime_hour;
    let end_time_hour;
    let requestedTime_full;

    let startTime_min;
    let requestedTime_min;
    let end_time_min;

    useEffect(() => {
        Get_Item_Rating();
    }, []);

    const add_service_request = () => {
        try {
            Alert.alert(
                "Warning",
                "Are you sure you want to reserve this service?",
                [
                    {
                        text: "No"
                    },
                    {
                        text: "Yes", onPress: async () => {
                            await firestore().collection("Service Requests").add({
                                Service_Type: props.type,
                                Reserved_Day: checked,
                                Requested_Time: requestedTime_full,
                                User_Name: user_name,
                                Mech_ID: props.mechID,
                                User_ID: user.uid,
                                Mech_Name: mech_name,
                                Status: "Pending"
                            });
                            alert('Request has been sent successfully!')
                            set_reserve_ModalVisible(false)
                        }
                    }
                ]
            )


        }
        catch (error) {
            alert(error);
        }
    }


    return (

        <Content padder>
            <View>
                {/* Start Reserve Service Modal */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={reserve_modalVisible}
                    onRequestClose={() => {
                        set_reserve_ModalVisible(!reserve_modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Please select suitable date</Text>

                            <Item>
                                <FlatList
                                    data={props.days}
                                    renderItem={({ item }) => {
                                        switch (item) {
                                            case 'Monday':
                                                return (
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <RadioButton
                                                            value="Monday"
                                                            status={checked === 'Monday' ? 'checked' : 'unchecked'}
                                                            onPress={() => setChecked('Monday')}
                                                        />
                                                        <Text style={styles.label}>Monday</Text>
                                                    </View>
                                                );
                                            case 'Tuesday':
                                                return (
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <RadioButton
                                                            value="Tuesday"
                                                            status={checked === 'Tuesday' ? 'checked' : 'unchecked'}
                                                            onPress={() => setChecked('Tuesday')}
                                                        />
                                                        <Text style={styles.label}>Tuesday</Text>
                                                    </View>
                                                );
                                            case 'Wednesday':
                                                return (
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <RadioButton
                                                            value="Wednesday"
                                                            status={checked === 'Wednesday' ? 'checked' : 'unchecked'}
                                                            onPress={() => setChecked('Wednesday')}
                                                        />
                                                        <Text style={styles.label}>Wednesday</Text>
                                                    </View>
                                                );

                                            case 'Thursday':
                                                return (
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <RadioButton
                                                            value="Thursday"
                                                            status={checked === 'Thursday' ? 'checked' : 'unchecked'}
                                                            onPress={() => setChecked('Thursday')}
                                                        />
                                                        <Text style={styles.label}>Thursday</Text>
                                                    </View>
                                                );
                                            case 'Friday':
                                                return (
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <RadioButton
                                                            value="Friday"
                                                            status={checked === 'Friday' ? 'checked' : 'unchecked'}
                                                            onPress={() => setChecked('Friday')}
                                                        />
                                                        <Text style={styles.label}>Friday</Text>
                                                    </View>
                                                );
                                            case 'Saturday':
                                                return (
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <RadioButton
                                                            value="Saturday"
                                                            status={checked === 'Saturday' ? 'checked' : 'unchecked'}
                                                            onPress={() => setChecked('Saturday')}
                                                        />
                                                        <Text style={styles.label}>Saturday</Text>
                                                    </View>
                                                );
                                            case 'Sunday':
                                                return (
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <RadioButton
                                                            value="Sunday"
                                                            status={checked === 'Sunday' ? 'checked' : 'unchecked'}
                                                            onPress={() => setChecked('Sunday')}
                                                        />
                                                        <Text style={styles.label}>Sunday</Text>
                                                    </View>
                                                );
                                        }
                                    }}
                                />
                            </Item>



                            <Item style={styles.InputStyle}>
                                <Text style={[styles.textStyle, { color: 'darkred', fontWeight: 'bold', fontSize: 15 }]}>At: </Text>
                                <DatePicker
                                    date={requestedTime}
                                    mode="time"
                                    onDateChange={(time) => setRequestedTime(time)}
                                    androidVariant='nativeAndroid'
                                />
                            </Item>


                            <View style={{ flexDirection: 'row' }}>
                                <Button
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => {
                                        startTime_hour = parseInt(props.start_time)
                                        requestedTime_hour = parseInt(requestedTime.toString().substring(15, 18))
                                        end_time_hour = parseInt(props.end_time)

                                        requestedTime_full = requestedTime.toString().substring(15, 21)

                                        startTime_min = parseInt(((props.start_time).toString()).substring(4, 6));
                                        requestedTime_min = parseInt(requestedTime.toString().substring(19, 21))
                                        end_time_min = parseInt(((props.end_time).toString()).substring(4, 6));

                                        if (checked == '') {
                                            alert('Please select a suitable day')
                                        }

                                        else if ((startTime_hour > end_time_hour)) {
                                            if ((startTime_hour <= requestedTime_hour) && (requestedTime_hour >= end_time_hour)) {
                                                add_service_request()
                                            }
                                            else if ((startTime_hour == requestedTime_hour) && (startTime_min < requestedTime_min)) {
                                                add_service_request()
                                            }
                                            else if ((end_time_hour == requestedTime_hour) && (end_time_min > requestedTime_min)) {
                                                add_service_request()
                                            }
                                            else {
                                                alert('Please select a time within the provided ones')
                                            }
                                        }

                                        else if ((startTime_hour < end_time_hour) && (startTime_hour <= requestedTime_hour) && (requestedTime_hour <= end_time_hour)) {
                                            if ((startTime_hour == requestedTime_hour) && (startTime_min > requestedTime_min)) { //Handling minutes errors
                                                alert('Please select a time within the provided ones')
                                            }
                                            else if ((end_time_hour == requestedTime_hour) && (end_time_min < requestedTime_min)) {
                                                alert('Please select a time within the provided ones')
                                            }
                                            else {
                                                add_service_request();
                                            }
                                        }

                                        else {
                                            alert('Please select a time within the provided ones')
                                        }



                                    }
                                    }
                                >
                                    <Text style={styles.textStyle}>Reserve</Text>
                                </Button>

                                <Button
                                    style={[styles.button, styles.buttonClose, { backgroundColor: 'white', borderColor: 'darkred', borderWidth: 1, marginLeft: 20 }]}
                                    onPress={() => {
                                        set_reserve_ModalVisible(!reserve_modalVisible)
                                    }
                                    }
                                >
                                    <Text style={[styles.textStyle, { color: 'darkred' }]}>Cancel</Text>
                                </Button>
                            </View>

                        </View>

                    </View>
                </Modal>
            </View>

            {/* End Reserve Service Modal */}

            <Card style={{ borderWidth: 9, borderColor: 'darkred' }}>
                <CardItem style={{ justifyContent: 'center', marginBottom: -10 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{props.type}</Text>
                </CardItem>
                <CardItem>
                    <Body>
                        <View style={{ flexDirection: 'row' }}>
                            <FontAwesome5 style={styles.IconStyles} name="money-bill-wave" size={18} color="black" />

                            {props.InOffer == "true" ?
                                <View>
                                    <Text style={styles.textStyles}>Service Price:  </Text>
                                    <Text style={{
                                        marginVertical: 7, fontWeight: 'bold', textDecorationLine: 'line-through'
                                    }}>{props.price} EGP</Text>
                                    <Text style={styles.propsStyle}>{props.after_Price} EGP </Text>
                                </View>
                                :
                                <View>
                                    <Text style={styles.textStyles}>Service Price:  </Text>
                                    <Text style={styles.propsStyle}>{props.price} EGP </Text>
                                </View>
                            }

                        </View>



                        <View style={{ flexDirection: 'row' }}>
                            <AntDesign name="calendar" style={styles.IconStyles} size={20} color="black" />
                            <Text style={styles.textStyles}>Service Availability: </Text>
                        </View>

                        <FlatList
                            data={props.days}
                            renderItem={({ item }) => {
                                return (
                                    <Text style={styles.daysflatlistStyle}>{item}</Text>
                                )
                            }}
                        />

                        {/* From */}
                        <View style={{ flexDirection: 'row' }}>
                            <AntDesign name="clockcircleo" style={styles.IconStyles} size={21} color="black" />
                            <Text style={styles.textStyles}>From:  </Text>
                            <Text style={styles.propsStyle}>{props.start_time}</Text>
                        </View>

                        {/* TO */}
                        <View style={{ flexDirection: 'row' }}>
                            <AntDesign name="clockcircleo" style={styles.IconStyles} size={21} color="black" />
                            <Text style={styles.textStyles}>To:  </Text>
                            <Text style={styles.propsStyle}>{props.end_time}</Text>
                        </View>

                        {/* Duration */}
                        <View style={{ flexDirection: 'row' }}>
                            <AntDesign name="clockcircleo" style={styles.IconStyles} size={21} color="black" />
                            <Text style={styles.textStyles}>Service Duration:  </Text>
                            <Text style={styles.propsStyle}>{props.duration} Hours </Text>
                        </View>

                        {/* Rating */}
                        <View style={{ flexDirection: 'row' }}>
                            <AntDesign name="edit" style={styles.IconStyles} size={21} color="black" />
                            <Text style={styles.textStyles}>Ratings:  </Text>
                        </View>
                    </Body>
                </CardItem>
                <CardItem style={{ flexDirection: "column", alignItems: "flex-start" }}>
                    <View style={styles.reviewContainer}>
                        <Text style={{ color: "darkred", fontWeight: 'bold', left: 70 }}>Service Rating</Text>
                        <View style={styles.totalWrap}>
                            <View
                                style={{
                                    flexDirection: "row",
                                }}
                            >
                                <Rating
                                    showRating fractions={1}
                                    startingValue={FinalItemRating}
                                    readonly={true}
                                    style={{ paddingVertical: 10 }}
                                />
                            </View>
                        </View>
                        <Text style={styles.amountText}>{TotalItemReviewsCount} customer ratings</Text>

                        <View style={{ marginTop: 15, left: 13 }}>
                            <View style={styles.spacer}>
                                <PercentageBar starText="5 star" percentage={Math.round(starsPerc[4])} />
                            </View>
                            <View style={styles.spacer}>
                                <PercentageBar starText="4 star" percentage={Math.round(starsPerc[3])} />
                            </View>
                            <View style={styles.spacer}>
                                <PercentageBar starText="3 star" percentage={Math.round(starsPerc[2])} />
                            </View>
                            <View style={styles.spacer}>
                                <PercentageBar starText="2 star" percentage={Math.round(starsPerc[1])} />
                            </View>
                            <View style={styles.spacer}>
                                <PercentageBar starText="1 star" percentage={Math.round(starsPerc[0])} />
                            </View>
                            <View style={styles.spacer}>
                                <PercentageBar starText="0 star" percentage={Math.round(starsPerc[5])} />
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => {
                            navigation.navigate("CustomersReviews", {
                                itemID: props.serviceID
                            })
                        }}>
                            <Text style={styles.howWeCalculate}>See Customer Reviews</Text>
                        </TouchableOpacity>
                        <Text style={{ color: "darkred", fontWeight: 'bold', left: 50 }}>Mechanic Rating</Text>
                        <View style={styles.totalWrap}>
                            <View
                                style={{
                                    flexDirection: "row",
                                }}
                            >
                                <Rating
                                    showRating fractions={1}
                                    startingValue={FinalShopRating}
                                    readonly={true}
                                    style={{ paddingVertical: 10 }}
                                />
                            </View>
                        </View>
                        <Text style={styles.amountText}>{TotalShopReviewsCount} customer ratings</Text>

                    </View>

                </CardItem>
                <CardItem footer style={{ justifyContent: 'center', alignContent: "space-around", alignSelf: "stretch" }}>
                    <Button style={styles.btnStyle} onPress={() => {
                        set_reserve_ModalVisible(!reserve_modalVisible)
                    }}>
                        <Text style={styles.buttontextStyles}>Reserve Service</Text>
                    </Button>
                    <Button style={styles.btnStyle}
                        onPress={() => {
                            navigation.navigate("ServiceReview", {
                                ItemID: props.serviceID,
                                shopownerID: props.mechID,

                            })
                        }}>
                        <Icon style={{ marginRight: -6 }} name="pencil-outline"></Icon>
                        <Text style={styles.buttonTextStyle}>Review</Text>
                    </Button>
                </CardItem>
            </Card>
        </Content>
    );
}

const styles = StyleSheet.create({
    textStyles: {
        marginVertical: 7,
        fontWeight: 'bold',
        color: 'darkred'
    },
    propsStyle: {
        marginVertical: 7,
        fontWeight: 'bold',
    },
    daysflatlistStyle: {
        marginVertical: 3,
        fontWeight: 'bold',
    },
    InputStyle: {
        marginBottom: 10,
        borderColor: 'darkred',
        borderRadius: 6,
        justifyContent: 'space-between',
    },
    checkbox: {
        alignSelf: "center",
    },
    IconStyles: {
        marginVertical: 9,
        marginRight: 5,
        color: 'darkred'
    },
    label: {
        margin: 8,
        marginLeft: 3
    },
    buttontextStyles: {
        color: 'white',
        fontSize: 13
    },
    btnStyle: {
        backgroundColor: 'darkred',
        marginBottom: 2,
        margin: 2
    },
    centeredView: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 150,
    },
    modalView: {
        marginHorizontal: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 25,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,

    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        color: 'darkred',
        fontWeight: 'bold',
        fontSize: 17
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        alignSelf: 'center'
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "darkred",
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
    loadingStyle: {
        color: 'darkred',
        alignSelf: 'center',
        fontSize: 22,
        textAlignVertical: 'center',
        fontWeight: 'bold',
        marginTop: 220
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
        marginBottom: 10

    },
    howWeCalculate: {
        fontSize: 18,
        color: "darkcyan",
        textAlign: "center",
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 5,
        fontStyle: 'italic'

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

export default ServiceComponent;
