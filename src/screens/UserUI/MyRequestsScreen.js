import React, { Component, useState, useEffect, useContext } from 'react';
import { Image, StyleSheet, View, FlatList, LogBox } from 'react-native';
import { Container, FooterTab, Content, Icon, Text, Button, List, ListItem } from 'native-base';
import { DrawerActions } from 'react-navigation-drawer';
import { FontAwesome5, Ionicons, Foundation, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import RequestCardComponent from '../components/RequestCardComponent'
import firestore from "@react-native-firebase/firestore";
import { AuthContext } from '../../navigation/AuthProvider';


const MyRequestsScreen = ({ navigation }) => {

  LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

  const { user } = useContext(AuthContext);
  const [show_List, setShow_List] = useState([]);
  const [loading, setLoading] = useState(true);

  async function Load_Screen() {
    setLoading(true);
    setShow_List([]);
    let temp_request_list = [];
    let all_detailed_requests = [];
    //Getting request history from user
    await firestore().collection('users').doc(user.uid).get().then((User_Data) => {
      if (User_Data.exists) {
        let temp_list = User_Data.data().requestHistory;
        let temp_ShopOwnerID = "";
        let temp_items = [];
        for (let i = 0; i < temp_list.length; i++) {
          let temp = [];
          temp_ShopOwnerID = temp_list[i].split("*")[0];
          temp_items = temp_list[i].split("*")[1].split("/");
          temp.push(temp_ShopOwnerID, temp_items.slice(0, -1));
          temp_request_list.push(temp);
        }
      }
    });
    //Getting Each detail using IDs
    for (let i = 0; i < temp_request_list.length; i++) {
      let temp_request_element = [];
      let ShopOwner_Name = "";
      await firestore().collection('users').doc(temp_request_list[i][0]).get().then((Shop_Owner_Data) => {
        if (Shop_Owner_Data.exists) {
          ShopOwner_Name = Shop_Owner_Data.data().fname + " " + Shop_Owner_Data.data().lname;
        }
      });
      let total_Price = 0;
      let temp_Items_elements = [];
      for (let j = 0; j < temp_request_list[i][1].length; j++) {
        await firestore().collection('CarStuff').doc(temp_request_list[i][1][j].split(',')[0]).get().then((Car_Stuff_Data) => {
          if (Car_Stuff_Data.exists) {

            total_Price += Car_Stuff_Data.data().Price * temp_request_list[i][1][j].split(',')[1];
            let temp = [];
            temp.push(Car_Stuff_Data.data().Name, temp_request_list[i][1][j].split(',')[1], Car_Stuff_Data.data().Price)
            temp_Items_elements.push(temp)
          }
        });
      }
      temp_request_element.push(ShopOwner_Name, temp_Items_elements, total_Price);
      all_detailed_requests.push(temp_request_element);
    }
    setShow_List(all_detailed_requests);
    setLoading(false);
  }

  useEffect(() => {
    try {
      Load_Screen();
    } catch (error) {
      alert(error);
    }
  }, []);

  return (
    <Container>

      {/* Text with drawer */}
      <View searchBar style={{ flexDirection: 'row', paddingTop: 25, marginBottom: 0, paddingBottom: 6, alignContent: "center", backgroundColor: "darkred", top: 0 }}>
        <Button transparent onPress={() => navigation.navigate('Profile')} >
          <Ionicons
            name='arrow-back-outline'
            style={{ fontSize: 30, marginTop: 4, marginRight: 12, marginLeft: 12, color: 'white' }}
          />
        </Button>
        <Text style={{ color: "white", height: 50, fontSize: 20, textAlign: 'center', paddingLeft: '21%', paddingTop: 12, fontWeight: 'bold' }}>Request History</Text>
      </View>
      {/* End Text with drawer */}

      {loading ? <Content><Text style={styles.loadingStyle}> Loading Items... </Text></Content> :
        <Content>
          <FlatList
            data={show_List}
            keyExtractor={(item) => item[0]}
            renderItem={({ item }) => {
              return (
                <RequestCardComponent
                  ShopOwner_Name={item[0]}
                  Items={item[1]}
                  Total_Price={item[2]} 
                />
              )
            }}
          />
        </Content>
      }
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
    </Container>
  );
}

export default MyRequestsScreen;

const styles = StyleSheet.create({
  textStyles: {
    fontSize: 20,
    marginBottom: 4,
    fontWeight: 'bold',
    color: 'black',
    textShadowColor: 'darkred',
    textShadowRadius: 1.5,
    textShadowOffset: {
      width: 0.5,
      height: 0.5
    },
    marginBottom: 10

  },

  buttonStyle: {
    marginTop: 7,
    backgroundColor: 'darkred',
    marginRight: 10
  },

  buttonTextStyle: {
    fontWeight: 'bold'
  },

  loadingStyle: {
    color: 'darkred',
    alignSelf: 'center',
    fontSize: 22,
    textAlignVertical: 'center',
    fontWeight: 'bold',
    marginTop: 180
  }
})