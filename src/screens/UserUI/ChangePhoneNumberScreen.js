import React, { useState , useContext} from 'react';
import { StyleSheet, View, Alert , ToastAndroid} from 'react-native';
import { Container, Content, Item, Input, Text, Form, Button } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import FooterComponent from '../components/FooterComponent'
import firestore from "@react-native-firebase/firestore";
import SendSMS from 'react-native-sms';
import { AuthContext } from '../../navigation/AuthProvider';
import { useTranslation } from 'react-i18next';


const ChangePhoneNumberScreen = ({ navigation, route }) => {

    const { user } = useContext(AuthContext);
    const [PhoneNumber, setPhoneNumber] = useState("+201276605225");
    const { t, i18n } = useTranslation();

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

    const CheckFormate = () => {
        if(PhoneNumber.length != 11){
            alert(t('UserChangePhoneNumberScreenAlert1'))
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
                <Text style={{ color: "white", height: 50, fontSize: 20, textAlign: 'center', paddingLeft: '12%', paddingTop: 12, fontWeight: 'bold' }}>{t('UserChangePhoneNumberScreenTitle')}</Text>
            </View>
            {/* End Search bar with drawer */}

            <Content style={{ marginHorizontal: 15, paddingVertical: 10 }}>
                <Form>
                    <Item regular style={styles.InputStyle}>
                        <Input placeholder={t('UserChangePhoneNumberScreenInput1')} keyboardType='number-pad' onChangeText={setPhoneNumber} />
                    </Item>

                    <Button style={{ backgroundColor: route.params.Color, marginVertical: 20, alignSelf: 'center' }} onPress={() => {
                        if (CheckFormate()) {
                            Save()
                        }
                    }}>
                        <Text>{t('UserChangePhoneNumberScreenButton2')}</Text>
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