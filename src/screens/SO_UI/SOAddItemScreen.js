import React, { Component,useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, FooterTab, Badge, Header, Content, Item, Input, Icon, DatePicker, Text, Radio, Picker, Form, Button, Image } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { Fontisto, Ionicons } from '@expo/vector-icons';
import ImagePicker from "react-native-image-picker"
import SOProfileScreen from './SOProfileScreen';
import firestore from "@react-native-firebase/firestore";


const itemDocument = firestore().collection("Car Stuff");

async function addItems(x_name, x_price, x_made_in, x_manufacture_date, x_car_model,
  x_car_brand, x_item_quality, x_image_path) {
  itemDocument.add({
    Name: x_name,
    Price: x_price,
    Made_In: x_made_in,
    Manufacture_Date: x_manufacture_date,
    Car_Model: x_car_model,
    Car_Brand: x_car_brand,
    Quality: x_item_quality,
    Image_Path: x_image_path
  });
};


const SOAddItemScreen = () => {

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [made_in, setMade_in] = useState('');
  const [manufacture_date, setManufacture_date] = useState('');
  const [car_model, setCar_Model] = useState('');
  const [car_brand, setCar_Brand] = useState('');
  const [item_quality, setItem_quality] = useState('');
  const [image_path, setImage_path] = useState('');

  return (
    <Container >
      {/* Search bar with drawer */}
      <View searchBar style={{ flexDirection: 'row', paddingTop: 26, marginBottom: 12, paddingBottom: 6, alignContent: "center", backgroundColor: "darkblue", top: 0 }}>
        <Button transparent onPress={() => this.props.navigation.navigate('SOHome')} >
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
            <Text style={{ marginLeft: 4, color: 'darkblue' }}> Item's Image: </Text>
            <Button
               style={{ height: 45, position: 'relative', backgroundColor: 'darkblue', margin: 2 }} >
              <Text> Upload Photo</Text>
            </Button>
          </Item>
          
          <Button 
          onPress={() => addItems(name, price, made_in, manufacture_date, car_model,
            car_brand, item_quality, image_path)}
          style={{ backgroundColor: 'darkblue', marginVertical: 20, alignSelf: 'center' }}>
            <Text>Add Item</Text>
          </Button>

        </Form>

      </Content>
      {/* Footer */}
      <View style={{ flexDirection: 'row', alignContent: "center", backgroundColor: "darkblue" }}>
        <FooterTab transparent style={{ backgroundColor: "darkblue" }}>
          <Button style={{ marginTop: 5 }} onPress={() => this.props.navigation.navigate('SOHome')}>
            <Icon style={{ color: 'white' }} name="home" />
            <Text style={{ color: 'white' }}> Home</Text>
          </Button>

          <Button style={{ marginTop: 5 }} onPress={() => this.props.navigation.navigate('SOProfile')}>
            <Icon name="person" style={{ color: 'white' }} />
            <Text style={{ color: 'white' }}>Profile</Text>
          </Button>

          <Button style={{ marginTop: 5 }} onPress={() => this.props.navigation.navigate('SOContactUs')}>
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