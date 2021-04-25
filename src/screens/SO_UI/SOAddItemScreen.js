import React, { Component } from 'react';
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


const SOAddItemScreen = ({ navigation }) => {

  const itemDocument = firestore().collection("CarStuff");

  // constructor(props) {
  //     super(props);
  //     this.state = {
  //       selected: undefined,
  //       chosenDate: new Date()
  //     };
  //   }

  //   onValueChange(value: string) {
  //     this.setState({
  //       selected: value
  //     });
  // }

  // setDate(newDate) {
  //     this.setState({ chosenDate: new Date(Date.GMT(2019, 2, 18)) });
  // }


  // handleChoosePhoto = () =>  {
  //   const options = {};
  //   ImagePicker.launchImageLibrary(options,response => {console.log("response",response);})
  // }



  let home_notification = 5;
  let profile_notification = 5;
  let settings_notification = 5;

  const [name, setName] = useState('Null');
  const [price, setPrice] = useState('0');
  const [made_in, setMade_in] = useState('Null');
  const [manufacture_date, setManufacture_date] = useState('Null');
  const [car_model, setCar_Model] = useState('Sunny');
  const [car_brand, setCar_Brand] = useState('Nissan');
  const [item_quality, setItem_quality] = useState('Low');
  const [image_path, setImage_path] = useState('Null');

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
              selectedValue={"Nissan"}
              onValueChange={(car_model) => setCar_Model(car_model)}            >
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
              selectedValue={"C300"}
              onValueChange={(car_brand) => setCar_Brand(car_brand)}
            >
              <Picker.Item label="C300" value="C300" />
              <Picker.Item label="Sunny" value="Sunny" />
              <Picker.Item label="Cerato" value="Cerato" />
            </Picker>
          </Item>

          <Item regular style={styles.InputStyle}>
            <Input placeholder='Car Year' />
          </Item>

          <Item regular style={{
            marginBottom: 10,
            borderWidth: 3,
            borderColor: 'darkblue',
            borderRadius: 6,
            alignSelf: 'flex-start',
            height: 50
          }}>
            <DatePicker
              defaultDate={new Date(2018, 4, 4)}
              minimumDate={new Date(2018, 1, 1)}
              maximumDate={new Date(2018, 12, 31)}
              locale={"en"}
              value="Manufacture Date: "
              mode="date"
              timeZoneOffsetInMinutes={undefined}
              modalTransparent={false}
              animationType={"fade"}
              androidMode={"default"}
              placeHolder="Manufacture Date: "
              placeHolderTextStyle={{ color: "darkblue" }}
              onDateChange={(manufacture_date) => setManufacture_date(manufacture_date)}
              disabled={false}
            />
            <Text>
              Select Manufacture Date:
            </Text>
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
              selectedValue={"Low"}
              onValueChange={(item_quality) => setItem_quality(item_quality)}
            >
              <Picker.Item label="Low" value="Low" />
              <Picker.Item label="Medium" value="Medium" />
              <Picker.Item label="High" value="High" />
            </Picker>
          </Item>


          <Button
            press
            onPress={() =>
              addItems(name, price, made_in, manufacture_date, car_model,
                car_brand, item_quality, image_path),
              navigation.navigate.bind(this, "SOItemList")}
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

          <Button style={{ marginTop: 5 }} onPress={() => this.propsnavigation.navigate('SOContactUs')}>
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