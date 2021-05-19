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
  const [ShopOwnerName,setShopOwnerName] = useState("");

  async function Load_Screen() {
    setLoading(true);
    let temp =[];
    let index = 0;
    await firestore().collection('Requests').where("User_ID","==",user.uid).get().then(querySnapshot => {
      querySnapshot.forEach((documentSnapshot)=>{
        temp.push([documentSnapshot.data(),(index+"")])
        index++;
      });
    });
    setShow_List(temp);
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
            keyExtractor={(item) => item[1]}
            renderItem={({ item }) => {
              return (
                <RequestCardComponent
                  Data={item[0]}
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