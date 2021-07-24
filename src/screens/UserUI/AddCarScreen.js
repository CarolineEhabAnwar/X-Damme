import React, { Component, useEffect, useState, useContext } from 'react';
import { StyleSheet, View , ToastAndroid} from 'react-native';
import { Container, FooterTab, Badge, Header, Content, Item, Input, Icon, DatePicker, Text, Radio, Picker, Form, Button, Image } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { Fontisto, Ionicons } from '@expo/vector-icons';
import ImagePicker from "react-native-image-picker"
import firestore from "@react-native-firebase/firestore";
import { AuthContext } from '../../navigation/AuthProvider';
import { useTranslation } from 'react-i18next';

const AddCarScreen = ({ navigation }) => {

  const { user } = useContext(AuthContext);

  const [Brand, setSelectedBrand] = useState(0);
  const [Model, setSelectedModel] = useState(0);

  const [brands, setBrands] = useState([]);
  const [all_models, set_all_models] = useState([]);
  const [models, setModel] = useState([]);

  const [loadingScreen, setloadingScreen] = useState(true);
  const { t, i18n } = useTranslation();

  async function Add_Car() {
    await firestore().collection("User's Cars").add({
      Brand:brands[Brand],
      Model:models[Model],
      Owner_ID: user.uid,
      Questions: []
    })
    ToastAndroid.show(
      t("caradded"),
      ToastAndroid.SHORT
    );
    navigation.push('MyCars')
  }

  async function LoadUP() {

    setloadingScreen(true);
    let temp_brands = [];
    let temp_models = [];
    temp_brands.push("Select Brand");
    temp_models.push(["Select Model"]);
    await firestore()
      .collection('Car Brands and Models')
      .get().then(doc => {
        doc.forEach(element => {
          temp_brands.push(element.data().Brand);
          let temp_models_per_brand = [];
          element.data().Models.forEach(Model => {
            temp_models_per_brand.push(Model);
          });
          temp_models.push(temp_models_per_brand);
        });
      });
    setBrands(temp_brands);
    set_all_models(temp_models)
    setModel(temp_models[0]);

    setloadingScreen(false);
  }

  useEffect(() => {
    try {
      LoadUP();
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (all_models[Brand] != null) {
      setModel(all_models[Brand]);
    }
  }, [Brand]);

  return (
    <Container >
      {/* Search bar with drawer */}
      <View searchBar style={{ flexDirection: 'row', paddingTop: 26, marginBottom: 12, paddingBottom: 6, alignContent: "center", backgroundColor: "darkred", top: 0 }}>
        <Button transparent onPress={() => navigation.push('MyCars')} >
          <Ionicons
            name='arrow-back-outline'
            style={{ fontSize: 30, marginTop: 4, marginRight: 12, marginLeft: 12, color: 'white' }}
          />
        </Button>
        <Text style={{ color: "white", height: 50, fontSize: 20, textAlign: 'center', paddingLeft: '22%', paddingTop: 12, fontWeight: 'bold' }}>{t('UserAddCarScreenTitle')}</Text>
      </View>
      {/* End Search bar with drawer */}

      <Content style={{ marginHorizontal: 15, paddingVertical: 10 }}>

        {loadingScreen ?
          <Form>
            <Text style={styles.loadingStyle}>{t('UserAddCarScreenTitleLoading')}</Text>
          </Form>
          :
          <Form>
            {/* Car Model */}
            <Item regular style={{
              marginBottom: 10,
              borderWidth: 3,
              borderColor: 'darkblue',
              borderRadius: 6,
              alignSelf: 'flex-start'
            }}>

              <Picker
                mode="dialog"
                iosIcon={<Icon name="arrow-down" style={{ marginLeft: -5 }} />}
                placeholderStyle={{ color: "darkred" }}
                selectedValue={Brand}
                onValueChange={(Selected_Brand) => setSelectedBrand(Selected_Brand)}
              >
                {brands.map((item, index) => {
                  return (<Picker.Item label={item} value={index} key={index} />)
                })}
              </Picker>
            </Item>
            {/*
          {/* Car Brand */}
            <Item regular style={{
              marginBottom: 10,
              borderWidth: 3,
              borderColor: 'darkblue',
              borderRadius: 6,
              alignSelf: 'flex-start'
            }}>

              <Picker
                mode="dialog"
                iosIcon={<Icon name="arrow-down" style={{ marginLeft: -5 }} />}
                placeholderStyle={{ color: "darkred" }}
                selectedValue={Model}
                onValueChange={(Selected_Model) => setSelectedModel(Selected_Model)}
              >
                {models.map((item, index) => {
                  return (<Picker.Item label={item} value={index} key={index} />)
                })}
              </Picker>
            </Item>
            <Button style={{ backgroundColor: 'darkred', marginVertical: 20, alignSelf: 'center' }}
              onPress={() => {
                if (brands[Brand] == 'Select Brand') {
                  alert("Please select a brand.")
                }
                else if (models[Model] == 'Select Model') {
                  alert("Please select a model.")
                }
                else {
                  Add_Car();
                }
              }}
            >
              <Text>{t('UserAddCarScreenTitle')}</Text>
            </Button>

          </Form>
        }

      </Content>
      {/* Footer */}
      <View style={{ flexDirection: 'row', alignContent: "center", backgroundColor: "darkred" }}>
        <FooterTab transparent style={{ backgroundColor: "darkred" }}>
          <Button style={{ marginTop: 5 }} onPress={() => navigation.navigate('Home')}>
            <Icon style={{ color: 'white' }} name="home" />
            <Text style={{ color: 'white' }}>{t('UserHomeScreenHome')}</Text>
          </Button>

          <Button style={{ marginTop: 5 }} onPress={() => navigation.navigate('Profile')}>
            <Icon name="person" style={{ color: 'white' }} />
            <Text style={{ color: 'white' }}>{t('UserHomeScreenProfile')}</Text>
          </Button>

          <Button style={{ marginTop: 5 }} onPress={() => navigation.navigate('ContactUs')}>
            <Icon style={{ color: 'white' }} name="call" />
            <Text style={{ color: 'white' }} >{t('UserHomeScreenContactUs')}</Text>
          </Button>
        </FooterTab>
      </View>
      {/* End Footer */}
    </Container>
  );
}

export default AddCarScreen;

const styles = StyleSheet.create({
  InputStyle: {
    marginBottom: 10,
    borderColor: 'darkred',
    borderRadius: 6,
    justifyContent: 'space-between'
  },

  ViewStyle: {
    marginBottom: 10,
    flexDirection: 'row',
  },
  loadingStyle: {
    color: 'darkred',
    alignSelf: 'center',
    fontSize: 22,
    textAlignVertical: 'center',
    fontWeight: 'bold',
    marginTop: 180
  }
})