import React from 'react';
import {View} from 'react-native';
import {FooterTab, Icon, Text, Button } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';


const FooterComponent = (props) => { 
    const navigation = useNavigation();
    const { t, i18n } = useTranslation();

    return( 
    <View style={{ flexDirection: 'row', alignContent: "center", backgroundColor: props.backgroundColor }}>
        <FooterTab transparent style={{ backgroundColor: props.bkcolor }}>
            <Button style={{ marginTop: 5 }} onPress={() => navigation.navigate(props.home)}>
                <Icon style={{ color: 'white' }} name="home" />
                <Text style={{ color: 'white' }}>{t('UserHomeScreenHome')}</Text>
            </Button>

            <Button style={{ marginTop: 5 }} onPress={() => navigation.push(props.profile)}>
                <Icon name="person" style={{ color: 'white' }} />
                <Text style={{ color: 'white' }}>{t('UserHomeScreenProfile')}</Text>
            </Button>

            <Button style={{ marginTop: 5 }} onPress={() => navigation.navigate(props.contactus)}>
                <Icon style={{ color: 'white' }} name="call" />
                <Text style={{ color: 'white' }} >{t('UserHomeScreenContactUs')}</Text>
            </Button>
        </FooterTab>
    </View>
    );
}

export default FooterComponent;