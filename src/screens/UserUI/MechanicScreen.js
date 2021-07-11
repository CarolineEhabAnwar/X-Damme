import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, LogBox, Modal } from 'react-native';
import { Container, Form, Badge, InputGroup, Header, Item, Input, Content, Text, Button, Icon, } from 'native-base';
import FooterComponent from '../components/FooterComponent'
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import firestore from "@react-native-firebase/firestore";
import MechanicComponent from '../components/MechanicComponent'


const MechanicScreen = ({ navigation }) => {
  LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  const [mechanics, setMechanics] = useState([])
  let [services_arr, set_services_arr] = useState([])
  let [filtered_mechanics, set_filtered_mechanics] = useState([])
  let returned_IDs = []
  const [show_mechanics, set_show_mechanics] = useState([])
  const [loading, setloading] = useState(true)
  const [search, setSearch] = useState('');
  const [selected_service, set_selected_service] = useState('')
  const [modalVisible, setModalVisible] = useState(false);
  const [Service_Types, setService_Types] = useState([]);




  useEffect(() => {
    const subscriber = firestore()
      .collection('users')
      .where('type', '==', ('Mechanic'))
      .onSnapshot(querySnapshot => {
        const temp_mechanics = [];

        querySnapshot.forEach(documentSnapshot => {
          temp_mechanics.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setMechanics(temp_mechanics)
        set_filtered_mechanics(temp_mechanics)
        set_show_mechanics(temp_mechanics)
        setloading(false);
      });

    return () => subscriber();
  }, []);

  useEffect(() => {
    const subscriber_serv = firestore()
      .collection('Services')
      .onSnapshot(querySnapshot => {
        const temp_services = [];

        querySnapshot.forEach(documentSnapshot => {
          temp_services.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        set_services_arr(temp_services)
      });
    return () => subscriber_serv();
  }, []);

  function remove_duplicates(a) {
    return a.sort().filter(function (item, pos, ary) {
      return !pos || item != ary[pos - 1];
    });
  }


  // ---------------------- Search -------------------//

  const searchMechanics = () => {
    if (search == "") {
      set_show_mechanics(mechanics);
    }
    else {
      let temp = [];
      for (let i = 0; i < mechanics.length; i++) {
        if (mechanics[i].fname.toUpperCase().includes(search.toUpperCase()) ||
          mechanics[i].lname.toUpperCase().includes(search.toUpperCase())) {
          temp.push(mechanics[i]);
        }
      }
      set_show_mechanics(temp);
    }
  }

  // ---------------------- Filter Mechanics -------------------//

  const filterMechanics = (selected_service) => {

    if (selected_service != '' && selected_service != "Select Type") {
      services_arr = services_arr.filter((service) => (service.Type.toString() == selected_service.toString()))
      services_arr.map((service) => returned_IDs.push(service.Mech_ID))
      returned_IDs = remove_duplicates(returned_IDs)

      filtered_mechanics = filtered_mechanics.filter((mechanic) => (returned_IDs.includes(mechanic.key)))
    }

    set_show_mechanics(filtered_mechanics)

  }

  // ---------------------- Service Types -------------------//

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
      alert(error);
    }
  }, []);

  return (
    <Container>

      {/* Start Modal */}
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
            <Text style={styles.modalText}>Filter Mechanics</Text>

            <Form>

              <View style={styles.serviceTypeStyle}>
                <Text style={styles.textStyle2}>Service Type:</Text>
                <Picker
                  selectedValue={selected_service}
                  onValueChange={(itemValue, itemIndex) =>
                    set_selected_service(itemValue)
                  }>
                  {Service_Types.map((item, index) => {
                    return (<Picker.Item label={item} value={item} key={index} />)
                  })}
                </Picker>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <Button
                  style={[styles.button, styles.buttonClose, { marginRight: 15 }]}
                  onPress={() => {
                    set_selected_service('')
                  }}
                >
                  <Text style={styles.textStyle}>Remove Filter</Text>
                </Button >

                <Button
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    filterMechanics(selected_service)
                    setModalVisible(!modalVisible)
                  }}
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
        <Button transparent onPress={() => navigation.goBack()} >
          <Ionicons
            name='arrow-back-outline'
            style={{ fontSize: 30, marginTop: 4, marginRight: 12, marginLeft: 12, color: 'white' }}
          />
        </Button>
        <InputGroup rounded style={{ flex: 1, backgroundColor: '#fff', height: 35, marginTop: 7, paddingLeft: 10, paddingRight: 10 }}>
          <Icon name="ios-search" style={{ color: "darkred" }} />
          <Input style={{ height: 45, color: "darkred" }} placeholder="Search Mechanic" onChangeText={(searchTxt) => { setSearch(searchTxt) }} />
        </InputGroup>
        <Button transparent style={{ height: 50 }} onPress={() => searchMechanics()}>
          <Text style={{ color: "white", fontWeight: 'bold' }}>Search</Text>
        </Button>
      </View>
      {/* End Search bar with nav back */}


      <Container>

        <Button rounded style={{ marginLeft: 5, marginBottom: 5, backgroundColor: 'darkred' }} onPress={() => setModalVisible(true)}>
          <Icon name='filter' />
          <Text style={{ marginLeft: -27 }}> Filter </Text>
        </Button>

        {/* Item Card */}
        {loading ? <Text style={styles.loadingStyle}> Loading Mechanics... </Text> :
          <FlatList
            data={show_mechanics}
            renderItem={({ item }) => {
              return (
                <MechanicComponent
                  mech={item}
                  fname={item.fname}
                  lname={item.lname}
                  address={item.address}
                  mechID={item.key}
                />);
            }}
          />
        }
      </Container>

      <FooterComponent
        home="Home"
        profile="Profile"
        contactus="ContactUs"
        bkcolor="darkred"
      />
    </Container>
  );
}

export default MechanicScreen

const styles = StyleSheet.create({
  cartItemStyle: {
    marginTop: -4,
    marginRight: 3
  },
  loadingStyle: {
    color: 'darkred',
    alignSelf: 'center',
    fontSize: 22,
    textAlignVertical: 'center',
    fontWeight: 'bold',
    marginTop: 180
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    alignSelf: 'center'
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
  textStyle2: {
    marginBottom: 5,
    color: 'darkred',
    fontWeight: 'bold'
  },
})