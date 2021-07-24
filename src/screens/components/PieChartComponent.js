import React, { Component, useState, useEffect, useContext } from 'react';
import { Image, StyleSheet, View, Modal, TextInput, ToastAndroid } from 'react-native';
import { Container, FooterTab, Content, Icon, Text, Button, Item, Input, List, ListItem, Card, CardItem, Body, Picker } from 'native-base';
import { DrawerActions } from 'react-navigation-drawer';
import { FontAwesome5, Ionicons, Foundation, MaterialCommunityIcons, Entypo, SimpleLineIcons, AntDesign } from '@expo/vector-icons';
import { AuthContext } from '../../navigation/AuthProvider';
import firestore from "@react-native-firebase/firestore";
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import { useTranslation } from 'react-i18next';

const PieChartComponent = (props) => {

    const [Show, setShow] = useState(false);
    const [loading, setLoading] = useState(true);
    const [Caption, setCaption] = useState("");
    const [Show_data,setData] = useState([]);

    let data = [];

    const { t, i18n } = useTranslation();

    const Generate_Random_Color = () => {
        let Color = "rgb(" + (Math.floor(Math.random() * 255)) + "," + (Math.floor(Math.random() * 255)) + "," + (Math.floor(Math.random() * 255)) + ")"
        return Color;
    }

    const Add_Items = () => {
        let temp = []
        for (let i = 0; i < props.Items.length; i++) {
            temp.push({
                name: props.Items[i].Name,
                items: props.Items[i].Number,
                color: Generate_Random_Color(),
                legendFontColor: "#7F7F7F",
                legendFontSize: 15
            })
        }
        setData(temp);
        data = temp;
    }

    const Get_Caption = () => {
        let temp = data[0];
        let counter = data[0].items;
        for (let i = 1; i < data.length; i++) {
            if (data[i].items > data[i - 1].items) {
                temp = data[i]
            }
            counter += data[i].items;
        }
        if (counter > 0) {
            setShow(true);
        }
        let names = [];
        names.push(temp.name);
        for (let i = 0; i < data.length; i++) {
            if (data[i].items >= temp.items) {
                if (data[i].name !== temp.name) {
                    names.push(data[i].name)
                }
            }
        }
        let written_names = "";
        written_names += names[0];
        for (let i = 1; i < names.length; i++) {
            if (i == (names.length - 1))
                written_names += t('PieChartComponentText1') + names[i];
            else
                written_names += ", " + names[i];
        }
        let string_to_return = t('PieChartComponentText2') + written_names + t('PieChartComponentText3') + temp.items + t('PieChartComponentText4') + counter;
        setCaption(string_to_return);
    }

    useState(async () => {
        setLoading(true);
        await Add_Items();
        await Get_Caption();
        setLoading(false);
    }, []);



    return (
        <View>
            {loading ?
                null
                :
                <View>
                    {Show ?
                        <View style={{ borderWidth: 2, borderColor: "darkred", margin: 2, width: "auto", height: "auto" }}>
                            <View style={{ borderBottomWidth: 2, borderColor: "gray" }}>
                                <PieChart
                                    data={Show_data}
                                    width={400}
                                    height={220}
                                    chartConfig={{
                                        backgroundColor: "#e26a00",
                                        backgroundGradientFrom: "#fb8c00",
                                        backgroundGradientTo: "#ffa726",
                                        decimalPlaces: 2, // optional, defaults to 2dp
                                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                        style: {
                                            borderRadius: 16
                                        },
                                        propsForDots: {
                                            r: "6",
                                            strokeWidth: "2",
                                            stroke: "#ffa726"
                                        }
                                    }}
                                    accessor={"items"}
                                    backgroundColor={"transparent"}
                                    paddingLeft={"0"}
                                    center={[0, 0]}
                                    absolute
                                />
                            </View>
                            <Text style={{ marginHorizontal: 4, fontSize: 20, fontWeight: "bold" }}>{Caption}</Text>
                        </View>
                        :
                        null
                    }
                </View>
            }
        </View>
    );
}

export default PieChartComponent;

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