import React, { useState, useEffect, useContext } from 'react';
import firestore from '@react-native-firebase/firestore';
import { StyleSheet, View, Image, Linking } from 'react-native';
import { Card, CardItem, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import { AuthContext } from '../../navigation/AuthProvider';
import { useNavigation } from '@react-navigation/native';

const HospitalComponent = (props) => {

    const { user } = useContext(AuthContext);
    const [locationURL, setlocationURL] = useState("");

    const Get_Location = () => {
        const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
        const latLng = `${props.Hospital.Location[0]},${props.Hospital.Location[1]}`;
        const label = 'Custom Label';
        const url = Platform.select({
            ios: `${scheme}${label}@${latLng}`,
            android: `${scheme}${latLng}(${label})`
        });
        setlocationURL(url)
    }

    useEffect(() => {
        try {
            Get_Location();
        } catch (error) {
            console.log(error);
        }
    }, [])

    const Check_Location = () => {
        Linking.openURL(locationURL);
    }

    return (
        <Card style={{ borderRadius: 3 }}>
            <CardItem>
                <Left>
                    <Body style={{ marginBottom: 8 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{props.Hospital.Name}</Text>
                        <Text style={{ fontSize: 18, color: "gray" }} note>{props.Hospital.Abbreviation}</Text>
                    </Body>
                </Left>
                <Right>
                    <Body style={{ marginBottom: 8 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Distance:</Text>
                        <Text style={{ fontSize: 18, color: "gray" }} note>{Math.round(props.Hospital.distance/10)/100} Km</Text>
                    </Body>
                </Right>
            </CardItem>
            <CardItem cardBody>
                {props.Hospital.image_path == null || props.Hospital.image_path == "" ?
                    <Image source={require("../../../assets/Hospital.png")} style={{ height: 210, width: null, flex: 1 }} />
                    :
                    <Image source={{ uri: props.Hospital.image_path }} style={{ height: 210, width: null, flex: 1 }} />
                }
            </CardItem>
            <CardItem>
                <View style={{ width: "94%", flexDirection: "row", justifyContent: "space-between" }}>
                    <View>
                        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Branch: </Text>
                        <Text style={{ fontSize: 18, color: "gray" }}>{props.Hospital.Branch}</Text>
                    </View>
                    <Button style={styles.buttonStyle} onPress={() => Check_Location()}>
                        <Text style={styles.buttonTextStyle}>Check Location</Text>
                    </Button>
                    <Button style={styles.buttonStyle} onPress={() => Linking.openURL(`tel:${props.Hospital.Phone_Number}`)}>
                        <Text style={styles.buttonTextStyle}>Call</Text>
                    </Button>
                </View>
            </CardItem>
        </Card>
    );
}

const styles = StyleSheet.create({
    textStyle: {
        marginTop: 16,
        fontSize: 15,
        marginLeft: 8,
        fontWeight: 'bold',
        color: 'black',
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
    buttonStyle: {
        borderRadius: 25,
        backgroundColor: 'darkred',
    },

    buttonTextStyle: {
        fontWeight: 'bold'
    },
})

export default HospitalComponent;
