import React, { Component, useContext, useState, useEffect } from 'react';
import { StyleSheet, View, CheckBox, TextInput, Alert } from 'react-native';
import { Container, FooterTab, Badge, Header, Content, Item, Input, Text, Radio, Form, Button } from 'native-base';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import firestore from "@react-native-firebase/firestore";
import FooterComponent from "../components/FooterComponent"
import DatePicker from 'react-native-date-picker'
import { Picker } from '@react-native-picker/picker';
import { AuthContext } from '../../navigation/AuthProvider';



const MechEditServiceScreen = ({ navigation, route }) => {

  const { user } = useContext(AuthContext);
  const [Service_Types, setService_Types] = useState([])
  const [MondaySelected, setMondaySelected] = useState(false);
  const [TuesdaySelected, setTuesdaySelected] = useState(false);
  const [WednesdaySelected, setWednesdaySelected] = useState(false);
  const [ThursdaySelected, setThursdaySelected] = useState(false);
  const [FridaySelected, setFridaySelected] = useState(false);
  const [SaturdaySelected, setSaturdaySelected] = useState(false);
  const [SundaySelected, setSundaySelected] = useState(false);
  const selectedDays = []
  const [duration, setDuration] = useState(route.params.duration);
  const [price, setPrice] = useState(route.params.price);
  const [startTime, setStartTime] = useState(new Date())
  let getStartTime = ''
  const [endTime, setEndTime] = useState(new Date())
  let getEndTime = ''
  const [selectedService, setSelectedService] = useState(route.params.type);

  MondaySelected ? selectedDays.push('Monday') : null,
    TuesdaySelected ? selectedDays.push('Tuesday') : null,
    WednesdaySelected ? selectedDays.push('Wednesday') : null,
    ThursdaySelected ? selectedDays.push('Thursday') : null,
    FridaySelected ? selectedDays.push('Friday') : null,
    SaturdaySelected ? selectedDays.push('Saturday') : null,
    SundaySelected ? selectedDays.push('Sunday') : null


  async function editService(service_type, price, days, startTime,
    endTime, duration, mechID,serviceID) {

    try {

      Alert.alert(
        "Warning",
        "Are you sure you want to edit this item?",
        [
          {
            text: "No"
          },
          {
            text: "Yes", onPress: async () => {
              const Edited_Service = await firestore().collection("Services").doc(serviceID).update({
                Type: service_type,
                Price: price,
                Days: days,
                Start_Time: startTime,
                End_Time: endTime,
                Duration: duration,
                Mech_ID: mechID
              });
              alert('Service has been edited successfully!')
              navigation.goBack()
            }
          }
        ]
      )
     
    }
    catch (error) {
      alert(error);
    }

  };

  async function Get_Service_Types() {
    await firestore().collection("App Details").doc("k82zp4G54ApB6UORzmMV").get().then((Service_Types) => {
      if (Service_Types.exists) {
        setService_Types(Service_Types.data().Service_Type);
      }
    });
  }


  useEffect(() => {
    try {
      Get_Service_Types();
    } catch (error) {
      console.log(error);
    }
  }, []);


  return (
    <Container >
      {/* Search bar with drawer */}
      <View searchBar style={{ flexDirection: 'row', paddingTop: 26, marginBottom: 12, paddingBottom: 6, alignContent: "center", backgroundColor: "darkgreen", top: 0 }}>
        <Button transparent onPress={() => navigation.goBack()} >
          <Ionicons
            name='arrow-back-outline'
            style={{ fontSize: 30, marginTop: 4, marginRight: 12, marginLeft: 12, color: 'white' }}
          />
        </Button>
        <Text style={{ color: "white", height: 50, fontSize: 20, textAlign: 'center', paddingLeft: '22%', paddingTop: 12, fontWeight: 'bold' }}> Edit Service</Text>
      </View>
      {/* End Search bar with drawer */}

      <Content style={{ marginHorizontal: 15, paddingVertical: 10 }}>

        <View style={{ flexDirection: 'row' }}>
          <AntDesign name="edit" style={{ marginRight: 10, marginTop: 6 }} size={21} color="darkgreen" />
          <Text style={styles.headerStyle}>Please enter service's new details</Text>
        </View>

        <Form>
          <View style={styles.serviceTypeStyle}>
            <Text style={styles.textStyle}>Service Type:</Text>
            <Picker
              selectedValue={selectedService}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedService(itemValue)
              }>
              {Service_Types.map((item, index) => {
                return (<Picker.Item label={item} value={item} key={index} />)
              })}
            </Picker>
          </View>

          <Item regular style={styles.PriceStyle}>
            <Input
              keyboardType="numeric"
              value={price}
              onChangeText={(price) => setPrice(price)}
            />
            <Text style={{ marginRight: 15, color: 'darkgreen' }}>EGP</Text>
          </Item>

          <Text style={styles.textStyle}>Service Avaiability</Text>

          <Item regular style={styles.InputStyle}>
            <View style={styles.container}>
              <View style={styles.checkboxContainer}>

                <View style={{ flexDirection: 'row' }}>
                  <CheckBox
                    value={MondaySelected}
                    onValueChange={setMondaySelected}
                    style={styles.checkbox}
                  />
                  <Text style={styles.label}>Monday</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                  <CheckBox
                    value={TuesdaySelected}
                    onValueChange={setTuesdaySelected}
                    style={styles.checkbox}
                  />
                  <Text style={styles.label}>Tuesday</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                  <CheckBox
                    value={WednesdaySelected}
                    onValueChange={setWednesdaySelected}
                    style={styles.checkbox}
                  />
                  <Text style={styles.label}>Wednesday</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                  <CheckBox
                    value={ThursdaySelected}
                    onValueChange={setThursdaySelected}
                    style={styles.checkbox}
                  />
                  <Text style={styles.label}>Thursday</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                  <CheckBox
                    value={FridaySelected}
                    onValueChange={setFridaySelected}
                    style={styles.checkbox}
                  />
                  <Text style={styles.label}>Friday</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                  <CheckBox
                    value={SaturdaySelected}
                    onValueChange={setSaturdaySelected}
                    style={styles.checkbox}
                  />
                  <Text style={styles.label}>Saturday</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                  <CheckBox
                    value={SundaySelected}
                    onValueChange={setSundaySelected}
                    style={styles.checkbox}
                  />
                  <Text style={styles.label}>Sunday</Text>
                </View>

              </View>
            </View>
          </Item>

          <Item style={styles.InputStyle}>
            <Text style={styles.textStyle}>From: </Text>
            <DatePicker
              date={startTime}
              mode="time"
              onDateChange={(time) => setStartTime(time)}
              androidVariant='nativeAndroid'
            />
          </Item>

          <Item style={styles.InputStyle}>
            <Text style={styles.textStyle}>To: </Text>
            <DatePicker
              date={endTime}
              mode="time"
              onDateChange={(end_time) => setEndTime(end_time)}
              androidVariant='nativeAndroid'
            />
          </Item>

          <Item regular style={styles.PriceStyle}>
            <Input
              keyboardType="numeric"
              value={duration}
              onChangeText={(duration) => setDuration(duration)}
            />
            <Text style={{ marginRight: 15, color: 'darkgreen' }}>Hours</Text>
          </Item>

          <View style={{flexDirection:'row',alignSelf:'center',marginTop:20,marginBottom:40}}>
            <Button style={{backgroundColor:'darkgreen'}} onPress={() => {

              getStartTime = startTime.toString().substring(15, 21)
              getEndTime = endTime.toString().substring(15, 21)

              if (selectedService == "Select Type") {
                alert('Please Enter a Service Type.')
              }
              else if (price == '') {
                alert('Please enter service price')
              }
              else if (duration == 0) {
                alert('Please enter suitable service duration')
              }
              else if (selectedDays.length == 0) {
                alert('Please select service availability days')
              }
              else if (getStartTime == getEndTime) {
                alert('Service start and end time are the same!')
              }
              else {
                editService(selectedService, price, selectedDays, getStartTime, getEndTime, duration,user.uid, route.params.serviceID)
              }
            }}>

              <Text>Confirm</Text>
            </Button>

            <Button
              onPress={async () => {
                navigation.goBack();
              }}

              style={{ backgroundColor: 'white', borderWidth: 1,borderColor:'darkgreen', marginLeft:30, color: 'white' }}>
              <Text style={{ color: 'darkgreen' }}>Cancel</Text>
            </Button>
          </View>
        </Form>
      </Content>

      <FooterComponent
        home="MechHome"
        profile="MechProfile"
        contactus="MechContactUs"
        bkcolor="darkgreen"
      />

    </Container>
  );
}

const styles = StyleSheet.create({
  InputStyle: {
    marginBottom: 10,
    borderColor: 'darkgreen',
    borderRadius: 6,
    justifyContent: 'space-between',
  },
  container: {
    flex: 1
  },
  PriceStyle: {
    marginBottom: 10,
    borderColor: 'darkgreen',
    borderRadius: 6,
    justifyContent: 'space-between',
    width: 200
  },
  checkboxContainer: {
    flexWrap: 'wrap',
    marginBottom: 5,
  },
  serviceTypeStyle: {
    marginBottom: 10,
    borderColor: 'darkgreen',
    borderWidth: 0.5,
    borderRadius: 10,
    padding: 6
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
    marginLeft: 3
  },
  ViewStyle: {
    marginBottom: 10,
    flexDirection: 'row',
  },
  textStyle: {
    color: 'darkgreen',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5
  },
  headerStyle: {
    color: 'darkgreen',
    fontSize: 17.5,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 15
  }
})

export default MechEditServiceScreen;