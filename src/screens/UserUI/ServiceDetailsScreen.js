import React, { Component, useState, useEffect } from "react";
import { LogBox, StyleSheet, FlatList, Modal, View, Pressable } from 'react-native';
import { Container, Form, Icon, InputGroup, Input, Button, Item, Text, Content } from "native-base";
import firestore from "@react-native-firebase/firestore";
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import ServiceComponent from '../components/ServiceComponent'
import FooterComponent from "../components/FooterComponent";

const ServiceDetailsScreen = ({ route, navigation }) => {
  LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  const mechID_sent = route.params.mechID
  const [mech_services, set_mech_serives] = useState([])
  let [filtered_services, set_filtered_services] = useState([])
  const [show_services, set_show_services] = useState([])
  const [loading, setloading] = useState(true)
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedService, setSelectedService] = useState('Wench')

  const [type_f, set_type_f] = useState('Wench')
  const [dates_f, set_dates_f] = useState('')
  const [time_f, set_time_f] = useState('')
  const [duration_f, set_duration_f] = useState('')

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

  const filterServices = (type_f, dates_f, time_f, duration_f, price_min, price_max) => {

    // if ((parseFloat(price_min)) > (parseFloat(price_max))) {
    //   console.log((parseFloat(price_min)))
    //   console.log((parseFloat(price_max)))
    //   alert('Please enter minimum price less than the maximum price')
    // }

    // else {

      filtered_services = filtered_services.filter((service) => (service.Type.toString() == type_f.toString()))
      
      if((price_min != 0)){
        filtered_services = filtered_services.filter((service) => (service.Price >= (parseFloat(price_min))))
      }

      if((price_max != 0)){
        filtered_services = filtered_services.filter((service) => (service.Price <= (parseFloat(price_max))))
      }

      set_show_services(filtered_services)
    
  }
// ----------------- End Filter Function-------------------//
  return (
    <Container>
      {/* Start Modal */}
      <Modal
        animationType="slide"
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
                <Text style={styles.textStyle}>Service Type:</Text>
                <Picker
                  selectedValue={type_f}
                  onValueChange={(itemValue, itemIndex) =>
                    set_type_f(itemValue)
                  }>
                  <Picker.Item label="Wench" value="Wench" />
                  <Picker.Item label="Fix Motor" value="Fix Motor" />
                  <Picker.Item label="Electricity" value="Electricity" />
                  <Picker.Item label="Check Engine" value="Check Engine" />
                </Picker>
              </View>

              {/* Price Range */}
              <Text style={styles.textStyle2}>Price Range:</Text>


              <Item regular style={styles.InputStyle}>
                <Input keyboardType="numeric" placeholder='From' onChangeText={price_min => set_price_min(price_min)} />
              </Item>

              <Item regular style={styles.InputStyle}>
                <Input keyboardType="numeric" placeholder='To' onChangeText={price_max => set_price_max(price_max)} />
              </Item>

              <View style={{ flexDirection: 'row' }}>
                <Button
                  style={[styles.button, styles.buttonClose]}
                >
                  <Text style={styles.textStyle}>Remove Filter</Text>
                </Button >


                <Button
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => filterServices(type_f, dates_f, time_f, duration_f, price_min, price_max)}
                >
                  <Text style={styles.textStyle}>OK</Text>
                </Button>
              </View>
            </Form>
          </View>
        </View>
      </Modal>

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
                  days={item.Days}
                  duration={item.Duration}
                  start_time={item.Start_Time}
                  end_time={item.End_Time}
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
    fontWeight: '600'
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
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
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
})