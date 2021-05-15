import React, { useContext } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { Container, FooterTab, Badge, Header, Content, Item, Input, Icon, Text, Radio, Picker, Form, Button, Image } from 'native-base';
import { Feather, Ionicons } from '@expo/vector-icons';
import ImagePicker from "react-native-image-crop-picker"
import { useState } from "react";
import DatePicker from 'react-native-datepicker';
import { AuthContext } from '../../navigation/AuthProvider';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

// async function editItem(x_name, x_price, x_made_in, x_manufacture_date, x_car_brand,
//   x_car_model, x_item_quality, x_image_path,ItemID) {
//   try {
//     await firestore().collection("CarStuff").doc({ItemID}).update({
//       Name: x_name,
//       Price: x_price,
//       Made_In: x_made_in,
//       Manufacture_Date: x_manufacture_date,
//       Car_Brand: x_car_brand,
//       Car_Model: x_car_model,     
//       Quality: x_item_quality,
//       Image_Path: x_image_path
//     });
//     alert("Item has been Edited successfully.");
//   }
//   catch (error) {
//     alert(error);
//   }

// };

const SOEditItemScreen = ({ navigation, route }) => {

  const { user } = useContext(AuthContext);
  const price_string = String(route.params.price);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [made_in, setMade_in] = useState('');
  const [manufacture_date, setManufacture_date] = useState("2016-05-15");
  const [car_model, setCar_Model] = useState('Sunny');
  const [car_brand, setCar_Brand] = useState('Kia');
  const [item_quality, setItem_quality] = useState('Low');
  const [image_path, setImage_path] = useState('');
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedOnce, setuploadedOnce] = useState(false);


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
    ImagePicker.openPicker({
      width: 1200,
      height: 780,
      cropping: true,
    }).then((image) => {
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
    });
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
      await storage().ref(`photos/${filename}`).putFile(uploadUri);

      const url = await storageRef.getDownloadURL();
      alert("Uploaded Successfully.")
      //alert("Image Uploaded Successfullt.")
      setUploading(false);
      setuploadedOnce(true);
      return url;
    } catch (error) {
      alert(error);
      return null;
    }
  };

  return (
    <Container >
      {/* Search bar with drawer */}
      <View searchBar style={{ flexDirection: 'row', paddingTop: 26, marginBottom: 12, paddingBottom: 6, alignContent: "center", backgroundColor: "darkblue", top: 0 }}>
        <Button transparent onPress={() => navigation.goBack()} >
          <Ionicons
            name='arrow-back-outline'
            style={{ fontSize: 30, marginTop: 4, marginRight: 12, marginLeft: 12, color: 'white' }}
          />
        </Button>
        <Text style={{ color: "white", height: 50, fontSize: 20, textAlign: 'center', paddingLeft: '25%', paddingTop: 12, fontWeight: 'bold' }}> Edit Item</Text>
      </View>
      {/* End Search bar with drawer */}

      <Content style={{ marginHorizontal: 15, paddingVertical: 10 }}>

        <Form>
          <Item regular style={styles.InputStyle}>
            <Input placeholder={route.params.name} onChangeText={name => setName(name)} />
          </Item>

          <Item regular style={styles.InputStyle}>
            <Input placeholder={price_string} keyboardType="numeric" onChangeText={price => setPrice(price)} />
          </Item>
          <Item regular style={styles.InputStyle}>
            <Input placeholder={route.params.made_in} onChangeText={made_in => setMade_in(made_in)} />
          </Item>

          {/* <Item regular style={styles.InputStyle}>
            <Button transparent
              style={{ height: 45,fontSize:50, color: 'darkblue', margin: 2 }}
              onPress={async () => {
                choosePhotoFromLibrary();
              }}>
              <Text> Choose Photo</Text>
            </Button>
            {uploading ? <Feather name="loader" size={24} color="darkblue" /> : null}
            <Button
              style={{ height: 45, position: 'relative', backgroundColor: 'darkblue', margin: 2 }}
              onPress={async () => {
                const imageUrl = await Upload_The_Image();
                setImage_path(imageUrl);
              }}>
              <Text> Upload Photo</Text>
            </Button>
            
          </Item> */}


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
              placeholder="Car Brand"
              placeholderStyle={{ color: "darkblue" }}
              selectedValue={route.params.car_brand}
              onValueChange={(Car_Brand) => setCar_Brand(Car_Brand)}
            >
              <Picker.Item label="Nissan" value="Nissan" />
              <Picker.Item label="Kia" value="Kia" />
              <Picker.Item label="BMW" value="BMW" />
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
              placeholder="Car Model"
              placeholderStyle={{ color: "darkblue" }}
              selectedValue={route.params.car_model}
              onValueChange={(CarModel) => setCar_Model(CarModel)}
            >
              <Picker.Item label="C300" value="C300" />
              <Picker.Item label="Sunny" value="Sunny" />
              <Picker.Item label="Cerato" value="Cerato" />
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
              placeholder="Item Quality"
              placeholderStyle={{ color: "darkblue" }}
              selectedValue={route.params.quality}
              onValueChange={(ItemQuality) => setItem_quality(ItemQuality)}
            >
              <Picker.Item label="Low" value="Low" />
              <Picker.Item label="Medium" value="Medium" />
              <Picker.Item label="High" value="High" />
            </Picker>
          </Item>

          <View style={{ flexDirection: 'row', alignSelf: 'center' }}>

            <Button
              onPress={async () => {
                // if(uploading){
                //   alert("Please Wait untill the uploads finshes.");
                // }
                // else if(!uploadedOnce){
                //   alert("Please choose and upload an Image.");
                // }
                if (name==null) {
                   console.log(name)
                   console.log(route.params.name)
                }
                if (price == '') {
                  setPrice(route.params.price)
                }
                if (made_in == '') {
                  setMade_in(route.params.made_in)
                }
                //editItem(name, price, made_in, manufacture_date, car_model, car_brand, item_quality, image_path,(route.params.itemID));
                firestore().collection("CarStuff").doc(route.params.itemID).update({
                 Name: name
                });
              }}

              style={{ backgroundColor: 'darkblue', marginVertical: 20, alignSelf: 'center', marginRight: 40 }}>
              <Text>Confirm</Text>
            </Button>

            <Button
              onPress={() => navigation.goBack()}
              style={{ backgroundColor: 'white', borderWidth: 1, marginVertical: 20 }}>
              <Text style={{ color: 'darkblue' }}>Cancel</Text>
            </Button>
          </View>

        </Form>

      </Content>
      {/* Footer */}
      <View style={{ flexDirection: 'row', alignContent: "center", backgroundColor: "darkblue" }}>
        <FooterTab transparent style={{ backgroundColor: "darkblue" }}>
          <Button style={{ marginTop: 5 }} onPress={() => navigation.navigate('SOHome')}>
            <Icon style={{ color: 'white' }} name="home" />
            <Text style={{ color: 'white' }}> Home</Text>
          </Button>

          <Button style={{ marginTop: 5 }} onPress={() => navigation.navigate('SOProfile')}>
            <Icon name="person" style={{ color: 'white' }} />
            <Text style={{ color: 'white' }}>Profile</Text>
          </Button>

          <Button style={{ marginTop: 5 }} onPress={() => navigation.navigate('SOContactUs')}>
            <Icon style={{ color: 'white' }} name="call" />
            <Text style={{ color: 'white' }} >Contact Us</Text>
          </Button>
        </FooterTab>
      </View>
      {/* End Footer */}
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
  }
})

export default SOEditItemScreen;