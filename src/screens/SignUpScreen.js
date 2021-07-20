import React, { useContext, useState } from 'react';
import { FlatList, SafeAreaView, View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { Button } from 'native-base';
import FormInput from '../screens/components/FormInput';
import FormButton from '../screens/components/FormButton';
import { AuthContext } from '../navigation/AuthProvider';
import { ScrollView } from 'react-native-gesture-handler';
import GetLocation from 'react-native-get-location';
import { windowHeight, windowWidth } from '../utils/Dimentions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Fontisto, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';





const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const { register } = useContext(AuthContext);
  const [selectedId, setSelectedId] = useState(null);
  const [type, setType] = useState("");
  const [cart, setCart] = useState([]);
  const [requests, setRequests] = useState([]);
  const [location, setCurrentLocation] = useState(null);

  const { t, i18n } = useTranslation();

  const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: t('SignUPUser'),
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: t('SignUPShopOwner'),
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: t('SignUPMechanic'),
    },
  ];
  
  const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <Text style={[styles.title, textColor]}>{item.title}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#ab0000" : "white";
    const color = item.id === selectedId ? 'white' : '#ab0000';

    return (
      <Item
        item={item}
        onPress={() => {
          setSelectedId(item.id);
          setType(item.title);
        }}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  const requestLocation = () => {
    setCurrentLocation(null);

    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 150000,
    }).then(location => {
      setCurrentLocation(location);
    }).catch(ex => {
      const { code, message } = ex;
      console.warn(code, message);
      if (code === 'CANCELLED') {
        alert('Location cancelled by user or by another request');
      }
      if (code === 'UNAVAILABLE') {
        alert('Location service is disabled or unavailable');
      }
      if (code === 'TIMEOUT') {
        alert('Location request timed out');
      }
      if (code === 'UNAUTHORIZED') {
        alert('Authorization denied');
      }
      setCurrentLocation(null);
    });
  }

  const Process_Location = (location) => {
    let temp = [];
    temp.push("accuracy:" + location.accuracy);
    temp.push("altitude:" + location.altitude);
    temp.push("bearing:" + location.bearing);
    temp.push("latitude:" + location.latitude);
    temp.push("longitude:" + location.longitude);
    temp.push("provider:" + location.provider);
    temp.push("speed:" + location.speed);
    temp.push("time:" + location.time);
    return temp;
  }

  return (

    <ScrollView contentContainerStyle={styles.container}>

      <Text style={styles.text}>{t('SignUPCreateAccountTitle')}</Text>

      <FormInput
        labelValue={fname}
        onChangeText={(FirstName) => setFname(FirstName)}
        placeholderText={t('SignUPFirstName')}
        iconType="user"
        autoCorrect={false}
      />


      <FormInput
        labelValue={lname}
        onChangeText={(LastName) => setLname(LastName)}
        placeholderText={t('SignUPLastName')}
        iconType="user"
        autoCorrect={false}
      />

      <View style={styles.inputContainer}>
        <View style={styles.iconStyle}>
          <MaterialCommunityIcons
            name='home-city-outline'
            style={{ fontSize: 25, color: 'darkred' }}
          />
        </View>
        {location ?
          (<Text style={{ padding: 10, fontSize: 14, fontFamily: 'Lato-Regular', color: '#333', flex: 3 }}>
            {location.latitude + "," + location.longitude}
          </Text>)
          :
          <Text style={{ padding: 10, fontSize: 16, fontFamily: 'Lato-Regular', color: '#333', flex: 3 }}>
            {t('SignUPNoLocationStatment')}
          </Text>
        }
        <Button style={{
          width: 250, height: 43, backgroundColor: '#ab0000', padding: 10,
          alignItems: 'center', justifyContent: 'center', borderRadius: 3, flex: 2
        }}
          onPress={requestLocation} >
          <Text style={styles.buttonText}>{t('SignUPGetLocationStatement')}</Text>
        </Button>
      </View>

      <FormInput
        labelValue={email}
        onChangeText={(userEmail) => setEmail(userEmail)}
        placeholderText={t('SignUPEmailAddress')}
        iconType="mail"
        keyboardType="email-address"
        autoCorrect={false}
      />

      <FormInput
        labelValue={password}
        onChangeText={(userPassword) => setPassword(userPassword)}
        placeholderText={t('SignUPPassword')}
        iconType="lock"
        secureTextEntry={true}
      />

      <FormInput
        labelValue={confirmPassword}
        onChangeText={(userPassword) => setConfirmPassword(userPassword)}
        placeholderText={t('SignUPConfirmPassword')}
        iconType="lock"
        secureTextEntry={true}
      />

      <View style={{ flexDirection: 'row' }}>
        <SafeAreaView style={{ flexDirection: 'row' }}>
          <FlatList
            data={DATA}
            scrollEnabled={false}
            horizontal
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            extraData={selectedId}
          />
        </SafeAreaView>
      </View>

      <FormButton
        buttonTitle={t('SignUpButtonText')}
        onPress={() => {
          if (fname === "")
            alert(t('SignUPAlert1'));
          else if (lname === "")
            alert(t('SignUPAlert2'));
          else if (location == null)
            alert(t('SignUPAlert3'));
          else if (email === "")
            alert(t('SignUPAlert4'));
          else if (email === "")
            alert(t('SignUPAlert5'));
          else if (password !== confirmPassword)
            alert(t('SignUPAlert6'));
          else if (type === "")
            alert(t('SignUPAlert7'));
          else {
            register(fname, lname, Process_Location(location), email, password, type, cart, requests);
          }
        }}
      />

      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.navButtonText}>{t('SignUPHaveAnAccount')}</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={styles.language}
          onPress={() => {
            i18n.changeLanguage('en');
            AsyncStorage.setItem('Language', "en");
          }}>
          <Text style={styles.langText}>
            English
          </Text>
        </TouchableOpacity>
        <Text style={styles.language}> | </Text>
        <TouchableOpacity
          style={styles.langauge}
          onPress={() => {
            i18n.changeLanguage('ar');
            AsyncStorage.setItem('Language', "ar");
          }}>
          <Text style={styles.langText}>
            العربية
          </Text>
        </TouchableOpacity>
      </View>
      
    </ScrollView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafd',
    alignItems: 'center',
    padding: 22,
  },
  text: {
    fontSize: 28,
    marginBottom: 40,
    color: '#ab0000',
    fontWeight: 'bold'
  },
  navButton: {
    marginTop: 10,
  },
  navButtonText: {
    fontSize: 18,
    marginTop: 20,
    fontWeight: 'bold',
    color: '#ab0000',
    fontFamily: 'Lato-Regular',
  },
  menuBox: {
    backgroundColor: "#ab0000",
    justifyContent: 'center',
    width: 80,
    height: 80,
    margin: 15,
    shadowColor: 'black',
    shadowOpacity: .2,
    shadowOffset: {
      height: 2,
      width: -2
    },
    borderRadius: 13,
    elevation: 4,
    flexDirection: 'column'
  },
  icon: {
    width: 60,
    height: 60,
  },
  info: {
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 10,
    color: "white",
  },
  item: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 8,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#ab0000'
  },
  title: {
    fontSize: 20,
  },
  inputContainer: {
    marginTop: 5,
    marginBottom: 15,
    width: '100%',
    height: windowHeight / 15,
    borderColor: '#ccc',
    borderRadius: 3,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#b30000'
  },
  iconStyle: {
    padding: 10,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: '#ab0000',
    borderRightWidth: 1,
    width: 50,
  },
  input: {
    padding: 10,
    flex: 1,
    fontSize: 16,
    fontFamily: 'Lato-Regular',
    color: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    fontFamily: 'Lato-Regular',
  },
  langText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ab0000',
  },
});