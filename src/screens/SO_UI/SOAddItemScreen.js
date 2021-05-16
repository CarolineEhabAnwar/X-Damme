import React, { useContext, Component, useEffect } from 'react';
import { Platform, StyleSheet, View, LogBox, ToastAndroid } from 'react-native';
import { Container, FooterTab, Badge, Header, Content, Item, Input, Icon, Text, Radio, Picker, Form, Button, Image } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import ImagePicker from "react-native-image-crop-picker"
import SOProfileScreen from './SOProfileScreen';
import firestore from "@react-native-firebase/firestore";
import { useState } from "react";
import DatePicker from 'react-native-datepicker';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../navigation/AuthProvider';
import storage from '@react-native-firebase/storage';
import FooterComponent from '../components/FooterComponent';

//npm install react-native-image-crop-picker
//npm outdated
//npm install @react-native-firebase/analytics@"^11.2.0"
//npm update @react-native-firebase/analytics
//npm update @react-native-firebase/app@"11.4.1"
//npm install npm install react-native-firebase/storage
//npm install --legacy-peer-deps --save  @react-native-firebase/analytics@11.4.1 @react-native-firebase/app@11.4.1
//npm update react-native-datepicker
//npm install @react-native-community/datetimepicker

async function addItems(x_name, x_price, x_made_in, x_manufacture_date, x_car_model,
  x_car_brand, x_item_quality, x_image_path, x_type, user) {
  try {
    const Added_Item = await firestore().collection("CarStuff").add({
      Name: x_name,
      Price: x_price,
      Made_In: x_made_in,
      Type: x_type,
      Manufacture_Date: x_manufacture_date,
      Car_Model: x_car_model,
      Car_Brand: x_car_brand,
      Quality: x_item_quality,
      Image_Path: x_image_path,
      Shop_Owner_ID: user.uid
    });
    ToastAndroid.show(
      'Item has been added Succenfully.',
      ToastAndroid.SHORT
    );

  }
  catch (error) {
    alert(error);
  }

};




const SOAddItemScreen = ({ navigation }) => {

  LogBox.ignoreLogs(['Warning: componentWillReceiveProps has been renamed']);


  const { user } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [made_in, setMade_in] = useState('');
  const [manufacture_date, setManufacture_date] = useState("2016-05-15");
  const [image_path, setImage_path] = useState('');
  const [image, setImage] = useState(null);

  const [is_image_choosen, setis_image_choosen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [is_image_uploaded, setis_image_uploaded] = useState(false);
  const [loadingScreen, setloadingScreen] = useState(true);


  const [uploadedOnce, setuploadedOnce] = useState(false);
  const [Type, setSelectedType] = useState(0);
  const [Brand, setSelectedBrand] = useState(0);
  const [Model, setSelectedModel] = useState(0);
  const [Quality, setSelectedQuality] = useState(0);

  //Lists for Pickers
  const [types, setTypes] = useState([]);
  const [brands, setBrands] = useState([]);
  const [all_models, set_all_models] = useState([]);
  const [models, setModel] = useState([]);
  const [qualities, setQualities] = useState([]);


  async function Set_Pickers_Data() {

    //The name of the collection holding the data "Car Brands and Models"

    //Getting Types
    let temp_Types = [];
    await firestore()
      .collection('App Details').doc("ioaEG86eslG2pL74Riq1")
      .get().then(doc => {
        if (doc.exists) {
          doc.data().Types.forEach(element => {
            temp_Types.push(element);
          });
        }
      });
    setTypes(temp_Types);

    //Getting Brands and Models
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


    let temp_Qualities = [];
    await firestore()
      .collection('App Details').doc("RUltl1MjeBbhjEmJ6G8Y")
      .get().then(doc => {
        if (doc.exists) {
          doc.data().Qualities.forEach(element => {
            temp_Qualities.push(element);
          });
        }
      });
    setQualities(temp_Qualities);
    setloadingScreen(false);
  }

  useEffect(() => {
    if (all_models[Brand] != null) {
      setModel(all_models[Brand]);
    }
  }, [Brand]);

  useEffect(() => {
    try {
      Set_Pickers_Data();
    } catch (error) {
      alert(error);
    }

  }, []);

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 1200,
      height: 780,
      cropping: true,
    }).then((image) => {
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
    });
  };

  const choosePhotoFromLibrary = async () => {
    try {
      ImagePicker.openPicker({
        width: 1200,
        height: 780,
        cropping: true,
      }).then((image) => {
        setis_image_uploaded(false);
        const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
        setImage(imageUri);
        setis_image_choosen(true);
      });
    } catch (error) {
      setis_image_choosen(false);
    }
  };

  const Upload_The_Image = async () => {
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    const storageRef = storage().ref(`photos/${filename}`)

    try {
      setUploading(true);
      setis_image_choosen(false);
      await storage().ref(`photos/${filename}`).putFile(uploadUri);

      const url = await storageRef.getDownloadURL();
      ToastAndroid.show(
        'Uploaded Successfully.',
        ToastAndroid.SHORT
      );
      setUploading(false);
      setuploadedOnce(true);
      return url;
    } catch (error) {
      alert(error);
      return null;
    }
  };

  const removeAll = () => {
    setName('');
    setPrice('');
    setMade_in('');
    setManufacture_date("2016-05-15");
    setImage_path('');
    setImage(null);

    setis_image_choosen(false);
    setUploading(false);
    setis_image_uploaded(false);

    setuploadedOnce(false);
    setSelectedType(0);
    setSelectedBrand(0);
    setSelectedModel(0);
    setSelectedQuality(0);

  }

  return (
    <Container >
      {/* Search bar with drawer */}
      <View searchBar style={{ flexDirection: 'row', paddingTop: 26, marginBottom: 12, paddingBottom: 6, alignContent: "center", backgroundColor: "darkblue", top: 0 }}>
        <Button transparent onPress={() => navigation.navigate('SOHome')} >
          <Ionicons
            name='arrow-back-outline'
            style={{ fontSize: 30, marginTop: 4, marginRight: 12, marginLeft: 12, color: 'white' }}
          />
        </Button>
        <Text style={{ color: "white", height: 50, fontSize: 20, textAlign: 'center', paddingLeft: '22%', paddingTop: 12, fontWeight: 'bold' }}> Add Item</Text>
      </View>
      {/* End Search bar with drawer */}

      {loadingScreen ? <Content><Text style={styles.loadingStyle}> Loading... </Text></Content> :

        <Content style={{ marginHorizontal: 15, paddingVertical: 10 }}>

          <Form>
            <Item regular style={styles.InputStyle}>
              <Input value={name} placeholder='Item Name' onChangeText={name => setName(name)} />
            </Item>

            <Item regular style={styles.InputStyle}>
              <Input value={price} keyboardType="numeric" placeholder='Item Price' onChangeText={price => setPrice(price)} />
            </Item>
            <Item regular style={styles.InputStyle}>
              <Input value={made_in} placeholder='Made In' onChangeText={made_in => setMade_in(made_in)} />
            </Item>

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
                selectedValue={Type}
                onValueChange={(Selected_Type) => setSelectedType(Selected_Type)}
              >
                {types.map((item, index) => {
                  return (<Picker.Item label={item} value={index} key={index} />)
                })}
              </Picker>
            </Item>

            <Item regular style={styles.InputStyle}>
              <Button transparent
                style={{ height: 45, fontSize: 50, color: 'darkblue', margin: 2 }}
                onPress={async () => {
                  choosePhotoFromLibrary();
                }}>
                <Text> Choose Photo</Text>
              </Button>
              {is_image_choosen ? <Ionicons name="checkmark-outline" size={24} color="black" /> : null}
              {uploading ? <Feather name="loader" size={24} color="black" /> : null}
              {is_image_uploaded ? <Ionicons name="checkmark-done-outline" size={24} color="black" /> : null}
              <Button
                style={{ height: 45, position: 'relative', backgroundColor: 'darkblue', margin: 2 }}
                onPress={async () => {
                  try {
                    const imageUrl = await Upload_The_Image();
                    setImage_path(imageUrl);
                    setis_image_choosen(false);
                    setis_image_uploaded(true);
                  } catch (error) {
                    alert("There has been some error in uploading the image");
                  }
                }}>
                <Text> Upload Photo</Text>
              </Button>

            </Item>


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

            <Item regular style={{
              marginBottom: 10,
              borderWidth: 3,
              borderColor: 'darkblue',
              borderRadius: 6,
              alignSelf: 'flex-start',
              height: 50
            }}>
              <Text style={{ marginLeft: 10, marginRight: 5, color: 'darkblue' }}>
                Manufacture Date:
              </Text>
              <DatePicker
                style={{ width: 200 }}
                date={manufacture_date}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                minDate="1990-01-01"
                maxDate="2025-01-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                  },
                  dateInput: {
                    marginLeft: 36
                  }
                }}
                onDateChange={(manufacture_date) => setManufacture_date(manufacture_date)}
              />
            </Item>

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
                selectedValue={Quality}
                onValueChange={(Selected_Quality) => setSelectedQuality(Selected_Quality)}
              >
                {qualities.map((item, index) => {
                  return (<Picker.Item label={item} value={index} key={index} />)
                })}
              </Picker>
            </Item>



            <Button
              onPress={async () => {
                if (uploading) {
                  alert("Please Wait untill the uploads finshs.");
                }
                else if (name == '') {
                  alert("Please insert Item Name.");
                }
                else if (price == '') {
                  alert("Please insert Price.");
                }
                else if (made_in == '') {
                  alert("Please insert Manufacture Country.");
                }
                else if (types[Type] == 'Select Type') {
                  alert("Please select a type.")
                }
                else if (!uploadedOnce) {
                  alert("Please choose and upload an Image.");
                }
                else if (brands[Brand] == 'Select Brand') {
                  alert("Please select a brand.")
                }
                else if (models[Model] == 'Select Model') {
                  alert("Please select a model.")
                }
                else if (qualities[Quality] == 'Select Quality') {
                  alert("Please select a quality.")
                }
                else {
                  addItems(name, price, made_in, manufacture_date, models[Model], brands[Brand], qualities[Quality], image_path, types[Type], user);
                  removeAll();
                }
              }}  // Please handle all of the errors.

              style={{ backgroundColor: 'darkblue', marginVertical: 20, alignSelf: 'center' }}>
              <Text>Add Item</Text>
            </Button>

          </Form>

        </Content>
      }

      <FooterComponent home="SOHome" profile="SOProfile" contactus="SOContactUs" bkcolor="darkblue" />

    </Container>
  );

}

const styles = StyleSheet.create({
  InputStyle: {
    marginBottom: 10,
    borderColor: 'darkblue',
    borderRadius: 6,
    justifyContent: 'space-between'
  },

  ViewStyle: {
    marginBottom: 10,
    flexDirection: 'row',
  },
  loadingStyle: {
    color: 'darkblue',
    alignSelf: 'center',
    fontSize: 22,
    textAlignVertical: 'center',
    fontWeight: 'bold',
    marginTop: 180
  }
})

export default SOAddItemScreen;