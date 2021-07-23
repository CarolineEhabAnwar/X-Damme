import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, LogBox, Modal } from 'react-native';
import { Container, Form, Badge, InputGroup, Header, Item, Input, Content, Text, Button, Icon, } from 'native-base';
import FooterComponent from '../components/FooterComponent'
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import firestore from "@react-native-firebase/firestore";
import MechanicComponent from '../components/MechanicComponent';
import GetLocation from 'react-native-get-location';
import { useTranslation } from 'react-i18next';


const MechanicScreen = ({ navigation }) => {

  let returned_IDs = [];
  const { t, i18n } = useTranslation();
  const [services_arr, set_services_arr] = useState([])
  const [filtered_mechanics, set_filtered_mechanics] = useState([])
  const [mechanics, setMechanics] = useState([])
  const [show_mechanics, set_show_mechanics] = useState([])
  const [loading, setloading] = useState(true)
  const [search, setSearch] = useState('');
  const [selected_service, set_selected_service] = useState('')
  const [modalVisible, setModalVisible] = useState(false);
  const [Service_Types, setService_Types] = useState([]);
  const [location, setCurrentLocation] = useState(null);
  const [Near_Me_Pressed, setNear_Me_Pressed] = useState(false);
  const [IsLocationLoading,setIsLocationLoading] = useState(false);

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

    let temp = null;
    if (selected_service != '' && selected_service != "Select Type") {
      temp = services_arr.filter((service) => (service.Type.toString() == selected_service.toString()))
      temp.map((service) => returned_IDs.push(service.Mech_ID))
      returned_IDs = remove_duplicates(returned_IDs)
      //set_filtered_mechanics
      temp = filtered_mechanics.filter((mechanic) => (returned_IDs.includes(mechanic.key)))
    }

    if (temp != null)
      set_show_mechanics(temp);

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
      requestLocation();
    } catch (error) {
      alert(error);
    }
  }, []);

  const requestLocation = () => {
    setIsLocationLoading(true);
    try {
      GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 150000,
      }).then(location => {
        setCurrentLocation(location);
        setIsLocationLoading(false);
      }).catch(ex => {
        const { code, message } = ex;
        console.warn(code, message);
        if (code === 'CANCELLED') {
          alert('Location cancelled by user or by another request');
        }
        if (code === 'UNAVAILABLE') {
          alert('Location service is disabled or unavailable');
        }
        if (code === 'TIMEOUT') {
          alert('Location request timed out');
        }
        if (code === 'UNAUTHORIZED') {
          alert('Authorization denied');
        }
        setIsLocationLoading(false);
      });
    } catch (error) {
      setIsLocationLoading(false);
    }
  }

  const Calulate_Distance_For_Each = (Mechanic_Lat, Mechanic_Lon) => {
    let lat1 = location.latitude;
    let lon1 = location.longitude;
    let lat2 = Mechanic_Lat;
    let lon2 = Mechanic_Lon;
    const R = 6371e3; // metres
    const φ1 = lat1 * Math.PI / 180; // φ, λ in radians
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) *
      Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return (R * c) / 1000 // in KM
  }

  const Sort_Array = (Arr) => {
    let temp = Arr;
    var len = temp.length;
    for (var i = len - 1; i >= 0; i--) {
      for (var j = 1; j <= i; j++) {
        if (temp[j - 1].Distance > temp[j].Distance) {
          var temp1 = temp[j - 1];
          temp[j - 1] = temp[j];
          temp[j] = temp1;
        }
      }
    }
    return temp;
  }

  function Find_Near_Me() {
    let Filtered_List_temp = [];

    mechanics.forEach((element) => {
      let temp_Distance = null;
      let Mech_Lat = null;
      let Mech_Lon = null;

      for (let i = 0; i < element.address.length; i++) {
        if (element.address[i].split(':')[0] == "latitude")
          Mech_Lat = element.address[i].split(':')[1]
        else if (element.address[i].split(':')[0] == "longitude")
          Mech_Lon = element.address[i].split(':')[1]
      }

      if (Mech_Lat != null && Mech_Lon != null) {
        temp_Distance = Calulate_Distance_For_Each(Mech_Lat, Mech_Lon);
        if (temp_Distance < 10) {
          Filtered_List_temp.push({
            ...element,
            Distance: temp_Distance
          });
        }
      }
    });

    Filtered_List_temp = Sort_Array(Filtered_List_temp);

    set_show_mechanics(Filtered_List_temp);
  }

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
          <Input style={{ height: 45, color: "darkred" }} placeholder={t('UserHomeScreenText1')} onChangeText={(searchTxt) => { setSearch(searchTxt) }} />
        </InputGroup>
        <Button transparent style={{ height: 50 }} onPress={() => searchMechanics()}>
          <Text style={{ color: "white", fontWeight: 'bold' }}>{t('UserHomeScreenText1')}</Text>
        </Button>
      </View>
      {/* End Search bar with nav back */}


      <Container>

        <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 10 }}>
          <Button rounded style={{ marginLeft: 5, marginBottom: 5, backgroundColor: 'darkred' }} onPress={() => setModalVisible(true)}>
            <Icon name='filter' />
            <Text style={{ marginLeft: -27 }}>{t('UserHomeScreenText2')}  </Text>
          </Button>
          <Button disabled={IsLocationLoading} rounded style={{ marginLeft: 5, marginBottom: 5, backgroundColor: 'darkred' }} onPress={() => {
            setloading(true);
            if (!Near_Me_Pressed) {
              setNear_Me_Pressed(true);
              Find_Near_Me();
            }
            else {
              setNear_Me_Pressed(false);
              set_show_mechanics(mechanics);
            }
            setloading(false);
          }}>
            <Icon name='location-outline' />
            <Text style={{ marginLeft: -27 }}>{t('UserHomeScreenText3')}  </Text>
          </Button>
        </View>
        {/* Item Card */}
        {loading ? <Text style={styles.loadingStyle}>{t('UserHomeScreenText4')}  </Text> :
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