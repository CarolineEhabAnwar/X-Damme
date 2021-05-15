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
import FooterComponent from '../components/FooterComponent'

async function Set_Pickers_Data() {
}
//********************************************************************* */
const SOEditItemScreen = ({ navigation, route }) => {

  const { user } = useContext(AuthContext);
  const price_string = String(route.params.price);
  const [name, setName] = useState(route.params.name);
  const [price, setPrice] = useState(route.params.price);
  const [made_in, setMade_in] = useState(route.params.made_in);
  const [manufacture_date, setManufacture_date] = useState(route.params.manf_date);
  const [car_model, setCar_Model] = useState(route.params.car_model);
  const [car_brand, setCar_Brand] = useState(route.params.car_brand);
  const [item_quality, setItem_quality] = useState(route.params.quality);
  const [image_path, setImage_path] = useState(route.params.imagePath);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedOnce, setuploadedOnce] = useState(false);
  const [qualities, setQualities] = useState([]);
  
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


          {/* Photo Upload  */}
          <Item regular style={styles.InputStyle}>
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
                console.log(image_path)
              }}>
              <Text> Upload Photo</Text>
            </Button>            
          </Item>

          {/* -------------------------------------------------------- */}
          {/* Da mn awl l el car brand wel model picker */}
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
          {/* End l el car brand wel model picker */}
          {/* -------------------------------------------------------- */}

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
              onDateChange={(new_date) => setManufacture_date(new_date)}
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
              selectedValue={item_quality}
              placeholderStyle={{ color: "darkblue" }}
              onValueChange={(quality_value) => setItem_quality(quality_value)}
            >
              <Picker.Item label="Low" value="Low" />
              <Picker.Item label="Medium" value="Medium" />
              <Picker.Item label="High" value="High" />
            </Picker>
          </Item>

          <View style={{ flexDirection: 'row', alignSelf: 'center' }}>

            <Button
              onPress={() => {
                try{
                firestore().collection("CarStuff").doc(route.params.itemID).update({
                 Name: name,
                 Price: price,
                 Quality: item_quality,
                 Manufacture_Date: manufacture_date,
                 Made_In:made_in,
                 Car_Model: car_model,
                 Car_Brand: car_brand,
                 Image_Path: image_path
                });
                alert('Item has been edited successfully!!')
                console.log(image_path)
                navigation.goBack()
              }   
              catch (error) {
                alert(error);
              }
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

      <FooterComponent home="SOHome" profile="SOProfile" contactus="SOContactUs" bkcolor="darkblue"/>

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