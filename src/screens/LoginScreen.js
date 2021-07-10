import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
  ScrollView
} from 'react-native';
import FormInput from '../screens/components/FormInput';
import FormButton from '../screens/components/FormButton';
import SocialButton from '../screens/components/SocialButton';
import { AuthContext } from '../navigation/AuthProvider';
import * as RNLocalize from "react-native-localize";
import { useTranslation } from 'react-i18next';



const LoginScreen = ({ navigation }) => {

  const { t, i18n } = useTranslation();


  i18n.language = RNLocalize.getLocales()[0].languageCode;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, googleLogin, fbLogin, forget } = useContext(AuthContext);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require('../../assets/logo2.png')}
        style={styles.logo}
      />

      <FormInput
        labelValue={email}
        onChangeText={(userEmail) => setEmail(userEmail)}
        placeholderText={t('EmailText')}
        iconType="user"
        keyboardType="email-address"
        autoCorrect={false}
      />

      <FormInput
        labelValue={password}
        onChangeText={(userPassword) => setPassword(userPassword)}
        placeholderText={t('PasswordText')}
        iconType="lock"
        secureTextEntry={true}
      />

      <FormButton
        buttonTitle={t('SignIn')}
        onPress={() => {
          if (email === "" || password === "")
            alert(t('fillSlots'))
          else {
            login(email, password);
          }
        }}
      />

      <TouchableOpacity style={styles.forgotButton} onPress={() => {
        if (email === "")
          alert(t('writeEmail'));
        else
          forget(email);
      }}>
        <Text style={styles.navButtonText}>{t('forgotPass')}</Text>
      </TouchableOpacity>

      {Platform.OS === 'android' ? (
        <View>
          <SocialButton
            buttonTitle={t('FBSignIn')}
            btnType="facebook"
            color="#4867aa"
            backgroundColor="#e6eaf4"
            onPress={() => fbLogin()}
          />

          <SocialButton
            buttonTitle={t('GSignIn')}
            btnType="google"
            color="#de4d41"
            backgroundColor="#f5e7ea"
            onPress={() => googleLogin()}
          />
        </View>
      ) : null}

      <TouchableOpacity
        style={{ marginTop: 15, marginBottom: 5 }}
        onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.navButtonText}>
          {t('NoAccount')}
        </Text>
      </TouchableOpacity>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={styles.language}
          onPress={() => i18n.changeLanguage('en')}>
          <Text style={styles.langText}>
            English
          </Text>
        </TouchableOpacity>
        <Text style={styles.language}> | </Text>
        <TouchableOpacity
          style={styles.langauge}
          onPress={() => i18n.changeLanguage('ar')}>
          <Text style={styles.langText}>
            العربية
          </Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 0
  },
  logo: {
    height: 230,
    width: 270,
    marginLeft: 20,
    resizeMode: 'cover'
  },
  text: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 15,
  },
  language: {
    marginLeft: 10,
    marginRight: 10
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ab0000',
  },
  langText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ab0000',
  },
});