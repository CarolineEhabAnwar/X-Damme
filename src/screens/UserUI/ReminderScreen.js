import React, { Component, useState, useEffect, useContext } from 'react';
import { Image, StyleSheet, View, Modal, TextInput } from 'react-native';
import { Container, FooterTab, Content, Icon, Text, Button, Item, Input, List, ListItem, Card, CardItem, Body, Picker } from 'native-base';
import { DrawerActions } from 'react-navigation-drawer';
import { FontAwesome5, Ionicons, Foundation, MaterialCommunityIcons, Entypo, SimpleLineIcons, AntDesign } from '@expo/vector-icons';
import { AuthContext } from '../../navigation/AuthProvider';
import firestore from "@react-native-firebase/firestore";

const ReminderScreen = ({ navigation }) => {

    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [MyCars, setMyCars] = useState([]);
    const [Questions, setQuestions] = useState([]);
    const [Questions_To_Show, setQuestions_To_Show] = useState([]);
    const [SelectedCar, setSelectedCar] = useState(0);
    const [New_Question_Title, setNew_Question_Title] = useState("");
    const [modalVisible, setModalVisible] = useState(false);

    async function Save_Questions() {
        for (let i = 0; i < MyCars.length; i++) {
            let temp = [];
            for (let j = 0; j < Questions[i].length; j++) {
                temp.push(Questions[i][j].Title + "!" + Questions[i][j].Answer)
            }
            await firestore().collection("User's Cars").doc(MyCars[i].key).update({
                Questions: temp
            })
        }
        alert("Saved Succesfully...");
        navigation.navigate('Recommendation')
    }

    async function Delele_Question(key, Questions_Index) {
        setLoading(true);
        await firestore().collection("User's Cars").doc(key).get().then(async (Data) => {
            if (Data.exists) {
                let temp = Data.data().Questions;
                temp.splice(Questions_Index, 1);
                await firestore().collection("User's Cars").doc(key).update({
                    Questions: temp
                })
            }
        })
        LoadUP();
    }

    async function Add_Question(key, Title) {
        setLoading(true);
        let temp = [];
        await firestore().collection("User's Cars").doc(key).get().then((Data) => {
            temp = Data.data().Questions
        })
        temp.push(Title + "! ");
        await firestore().collection("User's Cars").doc(key).update({
            Questions: temp
        })
        setModalVisible(false);
        LoadUP();
    }

    async function LoadUP() {
        setLoading(true)

        let temp = [];
        let temp_Questions = [];
        await firestore().collection("User's Cars").get().then((Data) => {
            if (Data.docs.length != 0) {
                for (let i = 0; i < Data.docs.length; i++) {
                    if (Data.docs[i].data().Owner_ID == user.uid) {
                        temp.push({
                            Brand: Data.docs[i].data().Brand,
                            Model: Data.docs[i].data().Model,
                            key: Data.docs[i].id,
                        });
                        let temp_Questions_per_car = [];
                        for (let j = 0; j < Data.docs[i].data().Questions.length; j++) {
                            temp_Questions_per_car.push({
                                Title: Data.docs[i].data().Questions[j].split("!")[0],
                                Answer: Data.docs[i].data().Questions[j].split("!")[1],
                                key: j
                            });
                        }
                        temp_Questions.push(temp_Questions_per_car);
                    }
                }
                if (temp.length != 0) {
                    setMyCars(temp);
                    setQuestions(temp_Questions);
                    setQuestions_To_Show(temp_Questions[SelectedCar])
                }
            }
        });

        setLoading(false)
    }

    useEffect(() => {
        try {
            LoadUP();
        } catch (error) {
            console.log(error)
        }
    }, []);

    useEffect(() => {
        try {
            setQuestions_To_Show(Questions[SelectedCar]);
        } catch (error) {
            console.log(error)
        }
    }, [SelectedCar]);

    return (
        <Container>
            {/* Start Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={{ marginLeft: 3, marginBottom: 2, fontSize: 20, fontWeight: 'bold' }}>Question Title</Text>
                        <TextInput style={{ width: 300, height: 50, borderWidth: 3, borderColor: "darkred" }} onChangeText={Value => { setNew_Question_Title(Value) }} />
                        <View style={{ flexDirection: 'row' }}>
                            <Button transparent style={{ marginRight: 10, marginTop: 2, backgroundColor: "white" }} onPress={() => { setModalVisible(false) }}>
                                <Text>Cancel</Text>
                            </Button>
                            <Button transparent style={{ marginRight: 10, marginTop: 2, backgroundColor: "white" }} onPress={() => {
                                if (New_Question_Title == "") {
                                    setModalVisible(false);
                                } else {
                                    setModalVisible(false);
                                    Add_Question(MyCars[SelectedCar].key, New_Question_Title)
                                }
                            }}>
                                <Text>Add</Text>
                            </Button>

                        </View>
                    </View>
                </View>
            </Modal>
            {/* End Modal */}

            {/* Text with drawer */}
            <View searchBar style={{ flexDirection: 'row', paddingTop: 25, marginBottom: 0, paddingBottom: 6, alignContent: "center", backgroundColor: "darkred", top: 0 }}>
                <Button transparent onPress={() => navigation.push('Recommendation')} >
                    <Ionicons
                        name='arrow-back-outline'
                        style={{ fontSize: 30, marginTop: 4, marginRight: 12, marginLeft: 12, color: 'white' }}
                    />
                </Button>
                <Text style={{ color: "white", height: 50, fontSize: 20, textAlign: 'center', paddingLeft: '22%', paddingTop: 12, fontWeight: 'bold' }}>Reminder</Text>
                <Button style={{ marginLeft: 'auto', alignSelf: 'center' }} transparent onPress={() => {
                    setModalVisible(true);
                }}>
                    <Ionicons name='add' size={30} color='white' style={{ paddingRight: 10 }} />
                </Button>
            </View>
            {/* End Text with drawer */}

            {loading ?
                <Content>
                    <Text style={styles.loadingStyle}> Loading Reminder... </Text>
                </Content>
                :
                <Content>
                    <Item regular style={{
                        marginBottom: 10,
                        borderWidth: 3,
                        borderColor: 'darkred',
                        borderRadius: 6,
                        alignSelf: 'flex-start'
                    }}>

                        <Picker
                            mode="dialog"
                            iosIcon={<Icon name="arrow-down" style={{ marginLeft: -5 }} />}
                            placeholderStyle={{ color: "darkred" }}
                            selectedValue={SelectedCar}
                            onValueChange={(Selected_Car) => setSelectedCar(Selected_Car)}
                        >
                            {MyCars.map((item, index) => {
                                return (<Picker.Item label={item.Brand + " " + item.Model} value={index} key={index} />)
                            })}
                        </Picker>
                    </Item>
                    <View style={{ marginLeft: 8 }}>
                        {Questions_To_Show.map((item) => {
                            return (
                                <Item regular style={styles.InputStyle}>
                                    <Text style={{ marginLeft: 3 }}>{item.Title}</Text>
                                    <Input defaultValue={item.Answer} placeholder="" onChangeText={Value => { item.Answer = Value }} />
                                    <Button transparent style={{ marginRight: 10, marginTop: 2, backgroundColor: "white" }} onPress={() => { Delele_Question(MyCars[SelectedCar].key, item.key) }}>
                                        <MaterialCommunityIcons name="window-minimize" style={{ backgroundColor: "white", color: 'blue', fontSize: 30 }} />
                                    </Button>
                                </Item>
                            )
                        })}
                    </View>
                    <View style={{ MaxWidth: "auto", flex: 1, justifyContent: "center", alignItems: "center", }}>
                        <Button style={{ alignSelf: 'center', backgroundColor: "darkred" }}
                            onPress={() => {
                                Save_Questions()
                            }}
                        >
                            <Text>Save</Text>
                        </Button>
                    </View>
                </Content>

            }

            {/* Footer */}
            <View style={{ flexDirection: 'row', alignContent: "center", backgroundColor: "darkred" }}>
                <FooterTab transparent style={{ backgroundColor: "darkred" }}>
                    <Button style={{ marginTop: 5 }} onPress={() => navigation.navigate('Home')}>
                        <Icon style={{ color: 'white' }} name="home" />
                        <Text style={{ color: 'white' }}> Home</Text>
                    </Button>

                    <Button style={{ marginTop: 5 }} onPress={() => navigation.navigate('Profile')}>
                        <Icon name="person" style={{ color: 'white' }} />
                        <Text style={{ color: 'white' }}>Profile</Text>
                    </Button>

                    <Button style={{ marginTop: 5 }} onPress={() => navigation.navigate('ContactUs')}>
                        <Icon style={{ color: 'white' }} name="call" />
                        <Text style={{ color: 'white' }} >Contact Us</Text>
                    </Button>
                </FooterTab>
            </View>
            {/* End Footer */}
        </Container>
    );
}

export default ReminderScreen;

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
    }
})