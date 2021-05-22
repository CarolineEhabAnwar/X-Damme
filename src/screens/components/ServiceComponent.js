import React, { useState, useEffect, useContext } from 'react';
import firestore from '@react-native-firebase/firestore';
import { StyleSheet, View, LogBox } from 'react-native';
import { Content, Card, CardItem, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { FontAwesome5, AntDesign } from '@expo/vector-icons';
import { AuthContext } from '../../navigation/AuthProvider';
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';


const ServiceComponent = (props) => {

    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    LogBox.ignoreLogs(['VirtualizedList: missing keys for items']);

    const daysArr = props.days;

    return (
        <Content padder>
            <Card style={{ borderWidth: 9, borderColor: 'darkred' }}>
                <CardItem header style={{ justifyContent: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{props.type}</Text>
                </CardItem>
                <CardItem>
                    <Body>
                        <View style={{ flexDirection: 'row' }}>
                            <FontAwesome5 style={styles.IconStyles} name="money-bill-wave" size={18} color="black" />
                            <Text style={styles.textStyles}>Service Price:  </Text>
                            <Text style={styles.propsStyle}>{props.price} EGP </Text>
                        </View>



                        <View style={{ flexDirection: 'row' }}>
                            <AntDesign name="calendar" style={styles.IconStyles} size={20} color="black" />
                            <Text style={styles.textStyles}>Service Availability: </Text>
                        </View>
                        <FlatList
                            data={daysArr}
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

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.textStyles}>Rate: - </Text>
                        </View>

                    </Body>
                </CardItem>
                {/* <CardItem footer button style={{ justifyContent: 'center' }}>
                    <Button transparent>
                        <Text style={styles.buttontextStyles}>Reserve Service</Text>
                    </Button>
                </CardItem> */}
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
    IconStyles: {
        marginVertical: 9,
        marginRight: 5,
        color: 'darkred'
    },
    buttontextStyles: {
        color: 'darkred',
        fontWeight: 'bold',
        fontSize: 15
    }
})

export default ServiceComponent;
