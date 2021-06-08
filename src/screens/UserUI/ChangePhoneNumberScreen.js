import React, { useState , useContext} from 'react';
import { StyleSheet, View, Alert , ToastAndroid} from 'react-native';
import { Container, Content, Item, Input, Text, Form, Button } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import FooterComponent from '../components/FooterComponent'
import firestore from "@react-native-firebase/firestore";
import SendSMS from 'react-native-sms';
import { AuthContext } from '../../navigation/AuthProvider';


const ChangePhoneNumberScreen = ({ navigation, route }) => {

    const { user } = useContext(AuthContext);
    const [PhoneNumber, setPhoneNumber] = useState("+201276605225");
    // const [message, setMessage] = useState('1888');
    
    // const [SentCode, setSentCode] = useState(false);
    // const [PhoneValid, setPhoneValid] = useState(false);

    const Save = async () =>{
        await firestore().collection("users").doc(user.uid).update({
            phoneNumber:PhoneNumber
        })
        ToastAndroid.show(
            'Uploaded Successfully.',
            ToastAndroid.SHORT
        );
        navigation.goBack();
    }

    // const initiateSMS = async () => {
    //     // // Check for perfect 10 digit length
    //     // if (PhoneNumber.length != 10) {
    //     //   alert('Please insert correct contact number');
    //     //   return;
    //     // }
    
    //     await SendSMS.send(
    //       {
    //         // Message body
    //         body: message,
    //         // Recipients Number
    //         recipients: [PhoneNumber],
    //         // An array of types 
    //         // "completed" response when using android
    //         successTypes: ['sent', 'queued'],
    //       },
    //       (completed, cancelled, error) => {
    //         if (completed) {
    //           console.log('SMS Sent Completed');
    //         } else if (cancelled) {
    //           console.log('SMS Sent Cancelled');
    //         } else if (error) {
    //           console.log('Some error occured');
    //         }else{
    //             console.log("wala 7aga ")
    //         }
    //       },
    //     );
    //     console.log("elmafrod ba3at")
    //   };

    // const CheckVerification = () => {
    //     console.log("Checking");
    //     console.log(PhoneNumber);
    // }

    // <Button style={{ backgroundColor: route.params.Color, marginVertical: 20, alignSelf: 'center' }} onPress={() => {
    //     console.log("no")
    //     //initiateSMS();
    // }}>
    //     <Text>Send Verification Code</Text>
    // </Button>

    // <Item regular style={styles.InputStyle}>
    //     <Input placeholder="Verification Code" onChangeText={CheckVerification} />
    // </Item>

    const CheckFormate = () => {
        if(PhoneNumber.length != 11){
            alert("Please insert correct contact number")
            return false;
        }
        return true
    }

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
                <Text style={{ color: "white", height: 50, fontSize: 20, textAlign: 'center', paddingLeft: '12%', paddingTop: 12, fontWeight: 'bold' }}>Change Phone Number</Text>
            </View>
            {/* End Search bar with drawer */}

            <Content style={{ marginHorizontal: 15, paddingVertical: 10 }}>
                <Form>
                    <Item regular style={styles.InputStyle}>
                        <Input placeholder="New Phone Number ex:01000000000" keyboardType='number-pad' onChangeText={setPhoneNumber} />
                    </Item>

                    <Button style={{ backgroundColor: route.params.Color, marginVertical: 20, alignSelf: 'center' }} onPress={() => {
                        if (CheckFormate()) {
                            Save()
                        }
                    }}>
                        <Text>Save</Text>
                    </Button>

                </Form>
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

export default ChangePhoneNumberScreen;

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
    }
})