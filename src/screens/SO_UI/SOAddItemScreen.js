import React, { useContext, Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, FooterTab, Badge, Header, Content, Item, Input, Icon, Text, Radio, Picker, Form, Button, Image } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { Fontisto, Ionicons } from '@expo/vector-icons';
import ImagePicker from "react-native-image-picker"
import SOProfileScreen from './SOProfileScreen';
import firestore from "@react-native-firebase/firestore";
import { useState } from "react";
import DatePicker from 'react-native-datepicker';
import { useNavigation } from '@react-navigation/native';
import {AuthContext} from '../../navigation/AuthProvider';



async function addItems(x_name, x_price, x_made_in, x_manufacture_date, x_car_model,
  x_car_brand, x_item_quality, x_image_path, user) {
  try {
    console.log(user.uid);
    const Added_Item = await firestore().collection("CarStuff").add({
      Name: x_name,
      Price: x_price,
      Made_In: x_made_in,
      Manufacture_Date: x_manufacture_date,
      Car_Model: x_car_model,
      Car_Brand: x_car_brand,
      Quality: x_item_quality,
      Image_Path: x_image_path,
      Shop_Owner_ID: user.uid
    });
    alert("Item has been added successfully.");
  }
  catch (error) {
    alert(error);
  }

};


const SOAddItemScreen = ({ navigation }) => {

  const {user} = useContext(AuthContext);

  const [name, setName] = useState('Null');
  const [price, setPrice] = useState('0');
  const [made_in, setMade_in] = useState('Null');
  const [manufacture_date, setManufacture_date] = useState("2016-05-15");
  const [car_model, setCar_Model] = useState('Sunny');
  const [car_brand, setCar_Brand] = useState('Kia');
  const [item_quality, setItem_quality] = useState('Low');
  const [image_path, setImage_path] = useState('Null');

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

      <Content style={{ marginHorizontal: 15, paddingVertical: 10 }}>

        <Form>
          <Item regular style={styles.InputStyle}>
            <Input placeholder='Item Name' onChangeText={name => setName(name)} />
          </Item>

          <Item regular style={styles.InputStyle}>
            <Input keyboardType="numeric" placeholder='Item Price' onChangeText={price => setPrice(price)} />
          </Item>
          <Item regular style={styles.InputStyle}>
            <Input placeholder='Made In' onChangeText={made_in => setMade_in(made_in)} />
          </Item>

          <Item regular style={styles.InputStyle}>
            <Input placeholder='Image Path' onChangeText={image_path => setImage_path(image_path)} />
            <Button
              style={{ height: 45, position: 'relative', backgroundColor: 'darkblue', margin: 2 }} >
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
              placeholder="Car Brand"
              placeholderStyle={{ color: "darkblue" }}
              selectedValue={car_brand}
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
              selectedValue={car_model}
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
            <Text style={{ marginLeft: 10 ,marginRight: 5}}>
              Manufacture Date:
            </Text>
            <DatePicker
                  style={{width: 200}}
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
              selectedValue={item_quality}
              onValueChange={(ItemQuality) => setItem_quality(ItemQuality)}
            >
              <Picker.Item label="Low" value="Low" />
              <Picker.Item label="Medium" value="Medium" />
              <Picker.Item label="High" value="High" />
            </Picker>
          </Item>


          <Button
            onPress={() =>{
              addItems(name, price, made_in, manufacture_date, car_model,car_brand, item_quality, image_path,user )}
              // Please handle all of the errors.
            }
              
            style={{ backgroundColor: 'darkblue', marginVertical: 20, alignSelf: 'center' }}>
            <Text>Add Item</Text>
          </Button>

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

export default SOAddItemScreen;