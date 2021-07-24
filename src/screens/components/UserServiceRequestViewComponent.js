import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Card, CardItem, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { MaterialIcons, AntDesign, FontAwesome5,FontAwesome } from '@expo/vector-icons';
import { AuthContext } from '../../navigation/AuthProvider';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { useTranslation } from 'react-i18next';

const UserServiceRequestViewComponent = (props) => {

    const navigation = useNavigation();
    const { t, i18n } = useTranslation();

    const { user } = useContext(AuthContext);

    return (
        <Card style={{  borderColor: 'darkred' }}>
            <CardItem>
                <Body>

                    <View style={{ flexDirection: 'row' }}>
                        <MaterialIcons name="miscellaneous-services" size={25} color="darkred" style={styles.IconsStyle} />
                        <Text style={styles.textStyles}>{t("MechAddServiceScreenText1")}: </Text>
                        <Text style={styles.propsStyle}>{props.service_type}</Text>
                    </View>


                    <View style={{ flexDirection: 'row' }}>
                        <AntDesign name="calendar" size={19} color="darkred" style={[styles.IconsStyle,{marginTop:2}]} />
                        <Text style={styles.textStyles}>{t("RequestedDay")}: </Text>
                        <Text style={styles.propsStyle}>{props.reserved_day}</Text>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <AntDesign name="clockcircleo" size={19} color="darkred" style={[styles.IconsStyle,{marginTop:2}]} />
                        <Text style={styles.textStyles}>{t("RequestedTime")}: </Text>
                        <Text style={styles.propsStyle}>{props.requested_time}</Text>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <AntDesign name="user" size={20} color="darkred" style={styles.IconsStyle} />
                        <Text style={styles.textStyles}>{t("RequestedTo")}: </Text>
                        <Text style={styles.propsStyle}>{props.mech_name}</Text>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <FontAwesome5 name="user-clock" size={18} color="darkred" style={styles.IconsStyle}/>
                        <Text style={styles.textStyles}>{t("RequestCardComponentText8")}: </Text>
                        <Text style={styles.propsStyle}>{props.status}</Text>
                    </View>

                </Body>
            </CardItem>
        </Card>
    );
}

const styles = StyleSheet.create({
    textStyles: {
        fontSize: 16,
        marginBottom: 4,
        fontWeight: 'bold',
        color: 'darkred',
        marginBottom: 10

    },

    buttonStyle: {
        marginTop: 7,
        marginLeft: 'auto',
        backgroundColor: 'darkred',
    },

    buttonTextStyle: {
        fontWeight: 'bold'
    },
    propsStyle: {
        fontWeight: 'bold',
        color: 'black'
    },
    IconsStyle: {
        marginRight: 3
    }
})

export default UserServiceRequestViewComponent;
