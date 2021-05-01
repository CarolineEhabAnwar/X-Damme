import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Modal, LogBox } from 'react-native';
import { Container, Picker, Form, Item, InputGroup, FooterTab, Input, Content, Text, Button, Icon } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import firestore from "@react-native-firebase/firestore";
import ItemComponent from '../components/ItemComponent'

const ItemsScreen = ({ navigation }) => {

  const [modalVisible, setModalVisible] = useState(false);
  const [car_brand, setCar_Brand] = useState('Select Brand');
  const [car_model, setCar_Model] = useState('Select Model');
  const [price_min, set_price_min] = useState(0);
  const [price_max, set_price_max] = useState('50000');
  const [item_type, set_item_type] = useState('Select Type');
  const [quality, set_quality] = useState('Select Quality');
  const [search_item, set_search_item] = useState('');


  LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  const [items, setItems] = useState([]); // Initial empty array of Items
  const [show_Items, setShow_Items] = useState([]);
  const [loading, setloading] = useState(true);

  function Filter() {
    setModalVisible(!modalVisible);

    let temp_filter_items_Type = [];
    if (item_type != "Select Type") {
      for (let i = 0; i < items.length; i++) {
        if (items[i].Name.toUpperCase().includes(item_type.toUpperCase())) {
          temp_filter_items_Type.push(items[i]);
        }
      }
    }
    else {
      temp_filter_items_Type = items;
    }

    let temp_filter_items_Brand = [];
    if (car_brand != "Select Brand") {
      for (let i = 0; i < temp_filter_items_Type.length; i++) {
        if (temp_filter_items_Type[i].Car_Brand == car_brand) {
          temp_filter_items_Brand.push(temp_filter_items_Type[i]);
        }
      }
    }
    else {
      temp_filter_items_Brand = temp_filter_items_Type;
    }

    let temp_filter_items_Model = [];
    if (car_model != "Select Model") {
      for (let i = 0; i < temp_filter_items_Brand.length; i++) {
        if (temp_filter_items_Brand[i].Car_Model == car_model) {
          temp_filter_items_Model.push(temp_filter_items_Brand[i]);
        }
      }
    }
    else {
      temp_filter_items_Model = temp_filter_items_Brand;
    }

    let temp_filter_items_Quality = [];
    if (quality != "Select Quality") {
      for (let i = 0; i < temp_filter_items_Model.length; i++) {
        if (temp_filter_items_Model[i].Quality == quality) {
          temp_filter_items_Quality.push(temp_filter_items_Model[i]);
        }
      }
    }
    else {
      temp_filter_items_Quality = temp_filter_items_Model;
    }

    if (temp_filter_items_Quality == 0) {
      setShow_Items(null);
      return;
    }

    setShow_Items(temp_filter_items_Quality);
  }

  useEffect(() => {
    try {
      const subscriber = firestore()
        .collection('CarStuff')
        .onSnapshot(querySnapshot => {
          const temp_items = [];

          querySnapshot.forEach(documentSnapshot => {
            temp_items.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });
          setItems(temp_items);
          setShow_Items(temp_items);
          if (loading)
            setloading(false);
        });
      return () => subscriber();
    } catch (error) {
      alert(error);
    }

  }, []);

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

            {/* Car Model */}
            <Text style={styles.modalText}>Filter Items</Text>

            <Form>
              {/* Item Type Picker */}
              <Item regular style={{
                marginBottom: 10,
                borderWidth: 3,
                borderColor: 'darkred',
                borderRadius: 6,
                alignSelf: 'flex-start'
              }}>

                <Picker
                  mode="dialog"
                  iosIcon={<Icon name="arrow-down" style={{ marginLeft: -5 }} />}
                  placeholder="Item Type"
                  placeholderStyle={{ color: "darkred" }}
                  selectedValue={item_type}
                  onValueChange={(item_type) => set_item_type(item_type)}
                >
                  <Picker.Item label="Select Type" value="Select Type" />
                  <Picker.Item label="Mirror" value="Mirror" />
                  <Picker.Item label="Motor" value="Motor" />
                  <Picker.Item label="Radiator" value="Radiator" />
                </Picker>
              </Item>

              {/* Car Brand Picker */}
              <Item regular style={{
                marginBottom: 10,
                borderWidth: 3,
                borderColor: 'darkred',
                borderRadius: 6,
                alignSelf: 'flex-start'
              }}>

                <Picker
                  mode="dialog"
                  iosIcon={<Icon name="arrow-down" style={{ marginLeft: -5 }} />}
                  placeholder="select Brand"
                  placeholderStyle={{ color: "darkred" }}
                  selectedValue={car_brand}
                  onValueChange={(Car_Brand) => setCar_Brand(Car_Brand)}
                >
                  <Picker.Item label='Select Brand' value='Select Brand' />
                  <Picker.Item label="Nissan" value="Nissan" />
                  <Picker.Item label="Kia" value="Kia" />
                  <Picker.Item label="BMW" value="BMW" />
                </Picker>
              </Item>

              {/* Car Model Picker*/}
              <Item regular style={{
                marginBottom: 10,
                borderWidth: 3,
                borderColor: 'darkred',
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
                  <Picker.Item label="Select Model" value="Select Model" />
                  <Picker.Item label="C300" value="C300" />
                  <Picker.Item label="Sunny" value="Sunny" />
                  <Picker.Item label="Cerato" value="Cerato" />
                </Picker>
              </Item>

              {/* Quality Picker*/}
              <Item regular style={{
                marginBottom: 10,
                borderWidth: 3,
                borderColor: 'darkred',
                borderRadius: 6,
                alignSelf: 'flex-start'
              }}>

                <Picker
                  mode="dialog"
                  iosIcon={<Icon name="arrow-down" style={{ marginLeft: -5 }} />}
                  placeholder="Quality"
                  placeholderStyle={{ color: "darkred" }}
                  selectedValue={quality}
                  onValueChange={(quality) => set_quality(quality)}
                >
                  <Picker.Item label="Select Quality" value="Select Quality" />
                  <Picker.Item label="Low" value="Low" />
                  <Picker.Item label="Medium" value="Medium" />
                  <Picker.Item label="High" value="High" />
                </Picker>
              </Item>

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
                  onPress={() => {
                    setCar_Brand('Select Brand');
                    setCar_Model('Select Model');
                    set_quality('Select Quality');
                    set_item_type('Select Type');
                  }}
                >
                  <Text style={styles.textStyle}>Remove Filter</Text>
                </Button >


                <Button
                  style={[styles.button, styles.buttonClose ]}
                  onPress={() => {
                    Filter();
                  }}
                >
                  <Text style={styles.textStyle}>OK</Text>
                </Button>
              </View>
            </Form>
          </View>
        </View>
      </Modal>
      {/* End Modal */}

      {/* Item Card */}
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
          <Input style={{ height: 40, marginTop: 5, color: "darkred" }} placeholder="Search" onChangeText={search_item => set_search_item(search_item)} />
        </InputGroup>
        <Button transparent style={{ height: 50 }}
          onPress={() => {
            if (search_item == '') {
              setShow_Items(items);
              return;
            }
            let items_to_show = [];
            for (let i = 0; i < items.length; i++) {
              if (items[i].Name.toUpperCase().includes(search_item.toUpperCase())) {
                items_to_show.push(items[i]);
              }
            }
            setShow_Items(items_to_show);
          }}
        >
          <Text style={{ color: "white", fontWeight: 'bold' }}>Search</Text>
        </Button>
      </View>
      {/* End Search bar with nav back */}

      <Content>
        {/* Filter Button */}
        <Button rounded style={{ marginLeft: 5, marginBottom: 5, backgroundColor: 'darkred' }} onPress={() => setModalVisible(true)}>
          <Icon name='filter' />
          <Text style={{ marginLeft: -27 }}> Filter </Text>
        </Button>
        {/* End filter button */}



        {loading ? <Text style={styles.loadingStyle}> Loading Items... </Text> :
          <FlatList
            data={show_Items}
            renderItem={({ item }) => {
              return (
                <ItemComponent
                  itemName={item.Name}
                  carBrand={item.Car_Brand}
                  carModel={item.Car_Model}
                  price={item.Price}
                  madeIn={item.Made_In}
                  manufacture_Date={item.Manufacture_Date}
                  quality={item.Quality}
                  shop_owner_id={item.Shop_Owner_ID}
                  itemImg={item.Image_Path}
                  cart={item.cart}
                  itemID={item.key}
                />);
            }}
          />
        }

      </Content>
      {/* Footer */}
      <View style={{ flexDirection: 'row', alignContent: "center", backgroundColor: "darkred" }}>
        <FooterTab transparent style={{ backgroundColor: "darkred" }}>
          <Button style={{ marginTop: 5 }} onPress={() => navigation.navigate('Home')}>
            <Icon style={{ color: 'white' }} name="home" />
            <Text style={{ color: 'white' }}> Home</Text>
          </Button>

          <Button style={{ marginTop: 5 }} onPress={() => navigation.navigate('Profile')}>
            <Icon name="person" style={{ color: 'white' }} />
            <Text style={{ color: 'white' }}>Profile</Text>
          </Button>

          <Button style={{ marginTop: 5 }} onPress={() => navigation.navigate('ContactUs')}>
            <Icon style={{ color: 'white' }} name="call" />
            <Text style={{ color: 'white' }} >Contact Us</Text>
          </Button>
        </FooterTab>
      </View>
      {/* End Footer */}
    </Container >
  );
}

const styles = StyleSheet.create({
  textStyle: {
    marginTop: 16,
    fontSize: 15,
    marginLeft: 8,
    fontWeight: 'bold',
    color: 'black'
  },

  InputStyle: {
    marginBottom: 10,
    borderColor: 'darkred',
    borderRadius: 6,
    justifyContent: 'space-between'
  },

  cartItemStyle: {
    marginTop: -23,
    marginBottom: -10,
    marginRight: 3
  },
  rateStyle: {
    marginTop: -23,
    marginBottom: -9,
    marginRight: 3,
    fontSize: 16,
    marginLeft: 0,
    fontWeight: 'bold',
    color: 'black'
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
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: 'darkred',
    fontWeight: 'bold',
    fontSize: 17
  },
  textStyle2: {
    fontWeight: 'bold',
    fontSize: 17,
    color: 'darkred',
    marginBottom: 7

  }
})

export default ItemsScreen;