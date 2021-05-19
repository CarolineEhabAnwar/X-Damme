import React, { Component, useEffect, useState, useContext } from 'react';
import { Image, StyleSheet, FlatList, LogBox } from 'react-native';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { Container, FooterTab, Badge, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, View } from 'native-base';
import SORequestCardComponent from "../components/SORequestCardComponent";
import firestore from '@react-native-firebase/firestore';
import FooterComponent from '../components/FooterComponent'
import { AuthContext } from '../../navigation/AuthProvider';
import { quality } from 'jimp';


const SORequestsScreen = ({ navigation, route }) => {

  LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [showList, setShowList] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);

  async function GetScreenReady() {
    setIsEmpty(false);
    setLoading(true);
    let temp = [];
    if (route.params.Editing) {
      await firestore().collection('Requests').where("Shop_Owner_ID", "==", user.uid).where("Status", "==", "Pending").get().then(querySnapshot => {
        querySnapshot.forEach((documentSnapshot) => {
          temp.push([documentSnapshot.data(), documentSnapshot.id])
        });
      });
    }else{
      await firestore().collection('Requests').where("Shop_Owner_ID", "==", user.uid).where("Status", "in", ["Accepted","Declined"]).get().then(querySnapshot => {
        querySnapshot.forEach((documentSnapshot) => {
          temp.push([documentSnapshot.data(), documentSnapshot.id]) 
        });
      });
    }
    if (temp.length == 0) {
      setIsEmpty(true);
    }
    setShowList(temp);
    setLoading(false);
  }

  useEffect(() => {
    try {
      GetScreenReady();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <Container>
      {/* Search bar with drawer */}
      <View searchBar style={{ flexDirection: 'row', paddingTop: 26, marginBottom: 12, paddingBottom: 6, alignContent: "center", backgroundColor: "darkblue", top: 0 }}>
        <Button transparent onPress={() => navigation.navigate('SOHome')} >
          <Ionicons
            name='arrow-back-outline'
            style={{ fontSize: 30, marginTop: 4, marginRight: 12, marginLeft: 12, color: 'white' }}
          />
        </Button>
        <Text style={{ color: "white", height: 50, fontSize: 20, textAlign: 'center', paddingLeft: '22%', paddingTop: 12, fontWeight: 'bold' }}> Requests</Text>
      </View>
      {/* End Search bar with drawer */}

      {isEmpty ? <Content><Text style={styles.loadingStyle}> No Current Requests... </Text></Content> : null}

      {loading ? <Content><Text style={styles.loadingStyle}> Loading Requests... </Text></Content> :
        <Content>
          <FlatList
            data={showList}
            keyExtractor={(item) => item[1]}
            renderItem={({ item }) => {
              return (
                <SORequestCardComponent
                  Data={item[0]}
                  ID={item[1]}
                  RefreshParent={() => { GetScreenReady() }}
                  Editing={route.params.Editing}
                />
              )
            }}
          />
        </Content>
      }

      <FooterComponent home="SOHome" profile="SOProfile" contactus="SOContactUs" bkcolor="darkblue" />

    </Container>
  );
}

export default SORequestsScreen;

const styles = StyleSheet.create({
  textStyles: {
    fontSize: 20,
    marginBottom: 4,
    fontWeight: 'bold',
    color: 'black',
    textShadowColor: 'darkblue',
    textShadowRadius: 1.5,
    textShadowOffset: {
      width: 0,
      height: 0
    },
    marginBottom: 10

  },

  buttonStyle: {
    marginTop: 7,
    marginLeft: 'auto',
    backgroundColor: 'darkblue',
  },

  buttonTextStyle: {
    fontWeight: 'bold'
  },
  loadingStyle: {
    color: 'darkblue',
    alignSelf: 'center',
    fontSize: 22,
    textAlignVertical: 'center',
    fontWeight: 'bold',
    marginTop: 180
  }
})