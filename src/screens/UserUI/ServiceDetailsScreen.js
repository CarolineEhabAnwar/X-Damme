import React, { Component, useState, useEffect } from "react";
import { LogBox, StyleSheet, FlatList, Modal, View, CheckBox,Pressable,Alert } from 'react-native';
import { Container, Form, Icon, InputGroup, Input, Button, Item, Text, Content } from "native-base";
import firestore from "@react-native-firebase/firestore";
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import ServiceComponent from '../components/ServiceComponent'
import FooterComponent from "../components/FooterComponent";
import { set } from "react-native-reanimated";

const ServiceDetailsScreen = ({ route, navigation }) => {
  LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  const mechID_sent = route.params.mechID
  const [mech_services, set_mech_serives] = useState([])
  
  let [filtered_services, set_filtered_services] = useState([])
  const [show_services, set_show_services] = useState([])
  const [loading, setloading] = useState(true)
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const [MondaySelected, setMondaySelected] = useState(false);
  const [TuesdaySelected, setTuesdaySelected] = useState(false);
  const [WednesdaySelected, setWednesdaySelected] = useState(false);
  const [ThursdaySelected, setThursdaySelected] = useState(false);
  const [FridaySelected, setFridaySelected] = useState(false);
  const [SaturdaySelected, setSaturdaySelected] = useState(false);
  const [SundaySelected, setSundaySelected] = useState(false);

  const [Service_Types, setService_Types] = useState([]);
  const [type_f, set_type_f] = useState('')
  const [days_f, set_days_f] = useState([])
  const [time_f, set_time_f] = useState('')
  const [duration_f, set_duration_f] = useState('')

  const selectedDays = []

  MondaySelected ? selectedDays.push('Monday') : null,
  TuesdaySelected ? selectedDays.push('Tuesday') : null,
  WednesdaySelected ? selectedDays.push('Wednesday') : null,
  ThursdaySelected ? selectedDays.push('Thursday') : null,
  FridaySelected ? selectedDays.push('Friday') : null,
  SaturdaySelected ? selectedDays.push('Saturday') : null,
  SundaySelected ? selectedDays.push('Sunday') : null

  const [price_min, set_price_min] = useState(0)
  const [price_max, set_price_max] = useState(0)

  useEffect(() => {
    const subscriber = firestore()
      .collection('Services')
      .where('Mech_ID', '==', mechID_sent)
      .onSnapshot(querySnapshot => {
        const temp_services = [];
        querySnapshot.forEach(documentSnapshot => {
          temp_services.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        set_mech_serives(temp_services);
        set_show_services(temp_services);
        set_filtered_services(temp_services)

        setloading(false);
      });
    return () => subscriber();
  }, []);


  const searchServices = () => {
    if (search == "") {
      set_show_services(mech_services);
    }
    else {
      let temp = [];
      for (let i = 0; i < mech_services.length; i++) {
        if (mech_services[i].Type.toUpperCase().includes(search.toUpperCase())) {
          temp.push(mech_services[i]);
        }
      }
      set_show_services(temp);
    }
  }

  // ----------------- Filter Function-------------------//

  const filterServices = (type_f, days_f, time_f, duration_f, price_min, price_max) => {

    if (type_f != '' && type_f != "Select Type") {
      filtered_services = filtered_services.filter((service) => (service.Type.toString() == type_f.toString()))
    }

    if ((price_min != 0)) {
      filtered_services = filtered_services.filter((service) => (service.Price >= (parseFloat(price_min))))
    }

    if ((price_max != 0)) {
      filtered_services = filtered_services.filter((service) => (service.Price <= (parseFloat(price_max))))
    }

    if ((days_f.length != 0)) {
      filtered_services = filtered_services.filter((service) => ((days_f.every(v => (service.Days).includes(v)))))
    }

    set_show_services(filtered_services)

  }
  // ----------------- End Filter Function-------------------//

  // ---------------------- Service Types -------------------//

  function Get_Service_Types() {
    firestore().collection("App Details").doc("k82zp4G54ApB6UORzmMV").get().then((Service_Types) => {
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
    <Container>

      {/* Start Filter Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>

            {/* Service type */}
            <Text style={styles.modalText}>Filter Services</Text>

            <Form>
              <View style={styles.serviceTypeStyle}>
                <Text style={styles.textStyle2}>Service Type:</Text>
                <Picker
                  selectedValue={type_f}
                  onValueChange={(itemValue, itemIndex) =>
                    set_type_f(itemValue)
                  }>
                  {Service_Types.map((item, index) => {
                    return (<Picker.Item label={item} value={item} key={index} />)
                  })}
                </Picker>
              </View>

              {/* Price Range */}
              <Text style={styles.textStyle2}>Price Range:</Text>


              <Item regular style={styles.InputStyle}>
                <Input value={price_min == 0 ? null : price_min} keyboardType="numeric" placeholder='From' onChangeText={price_min => set_price_min(price_min)} />
              </Item>

              <Item regular style={styles.InputStyle}>
                <Input value={price_max == 0 ? null : price_max} keyboardType="numeric" placeholder='To' onChangeText={price_max => set_price_max(price_max)} />
              </Item>

              {/* Days CheckBox */}
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

              <View style={{ flexDirection: 'row' }}>
                <Button
                  style={[styles.button, styles.buttonClose, { marginRight: 15 }]}
                  onPress={() => {
                    set_type_f('')

                    set_price_min(0)
                    set_price_max(0)

                    setMondaySelected(false)
                    setTuesdaySelected(false)
                    setWednesdaySelected(false)
                    setThursdaySelected(false)
                    setFridaySelected(false)
                    setSaturdaySelected(false)
                    setSundaySelected(false)
                  }}
                >
                  <Text style={styles.textStyle}>Remove Filter</Text>
                </Button >

                <Button
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    filterServices(type_f, selectedDays, time_f, duration_f, price_min, price_max)
                    setModalVisible(!modalVisible)
                  }
                  }
                >
                  <Text style={styles.textStyle}>OK</Text>
                </Button>

              </View>
            </Form>
          </View>
        </View>
      </Modal>
      {/* End Filter Modal */}



      {/* Search bar with nav back */}
      <View searchBar style={{ flexDirection: 'row', paddingTop: 25, marginBottom: 12, paddingBottom: 6, alignContent: "center", backgroundColor: "darkred", top: 0 }}>
        <Button transparent onPress={() => navigation.navigate('MechanicDetails')} >
          <Ionicons
            name='arrow-back-outline'
            style={{ fontSize: 30, marginTop: 4, marginRight: 12, marginLeft: 12, color: 'white' }}
          />
        </Button>
        <InputGroup rounded style={{ flex: 1, backgroundColor: '#fff', height: 35, marginTop: 7, paddingLeft: 10, paddingRight: 10 }}>
          <Icon name="ios-search" style={{ color: "darkred" }} />
          <Input style={{ height: 40, marginTop: 5, color: "darkred" }} placeholder="Search Service" onChangeText={(searchTxt) => setSearch(searchTxt)} />
        </InputGroup>
        <Button transparent style={{ height: 50 }} onPress={() => searchServices()}>
          <Text style={{ color: "white", fontWeight: 'bold' }}>Search</Text>
        </Button>
      </View>
      {/* End Search bar with nav back */}

      {/* Filter Button */}
      <Button rounded style={{ marginLeft: 5, marginBottom: 5, backgroundColor: 'darkred' }} onPress={() => setModalVisible(true)}>
        <Icon name='filter' />
        <Text style={{ marginLeft: -27 }}> Filter </Text>
      </Button>
      <Content>
        {loading ? <Text style={styles.loadingStyle}> Loading Services... </Text> :
          <FlatList
            data={show_services}
            renderItem={({ item }) => {
              return (
                <ServiceComponent
                  type={item.Type}
                  price={item.Price}
                  after_Price={item.After_Price}
                  InOffer={item.InOffer}
                  days={item.Days}
                  duration={item.Duration}
                  start_time={item.Start_Time}
                  end_time={item.End_Time}
                  mechID = {item.Mech_ID}
                />);
            }}
          />
        }

      </Content>

      <FooterComponent
        home='Home'
        profile='Profile'
        contactus='ContactUs'
        bkcolor='darkred'
      />

    </Container>
  );
}

export default ServiceDetailsScreen

const styles = StyleSheet.create({
  textStyles: {
    marginVertical: 10,
    color: 'darkred'
  },
  textStyle2: {
    marginBottom: 5,
    color: 'darkred',
    fontWeight: 'bold'
  },
  IconStyles: {
    marginVertical: 9,
    marginRight: 5
  },

  buttontextStyles: {
    color: 'darkred',
    fontWeight: 'bold',
    fontSize: 18
  },
  loadingStyle: {
    color: 'darkred',
    alignSelf: 'center',
    fontSize: 22,
    textAlignVertical: 'center',
    fontWeight: 'bold',
    marginTop: 180
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10
  },
  modalView: {
    margin: 5,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  InputStyle: {
    marginBottom: 10,
    borderColor: 'darkred',
    borderRadius: 6,
    justifyContent: 'space-between'
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: 'darkred',
    fontWeight: 'bold',
    fontSize: 17
  },
  serviceTypeStyle: {
    marginBottom: 10,
    borderColor: 'darkred',
    borderWidth: 0.5,
    borderRadius: 10,
    padding: 6
  },
  container: {
    flex: 1
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
    marginLeft: 3
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    alignSelf: 'center'
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "darkred",
  },
  checkboxContainer: {
    flexWrap: 'wrap',
    marginBottom: 10,
  },
})