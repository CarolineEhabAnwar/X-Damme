import React, { Component, useState, useEffect } from 'react';
import { Image, StyleSheet, View, Linking } from 'react-native';
import { Container, FooterTab, Badge, InputGroup, Input, Header, Content, Card, Icon, CardItem, Thumbnail, Text, Button, Left, Body, Right } from 'native-base';
import { DrawerActions } from 'react-navigation-drawer';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import FooterComponent from '../components/FooterComponent';
import firestore, { firebase } from "@react-native-firebase/firestore";

const ShopOwnerProfileScreen = ({ route, navigation }) => {

  const [loading, setloading] = useState(true);
  const [Shop_Owner_Data, setShop_Owner_Data] = useState(null);
  const [locationURL, setlocationURL] = useState("");

  const LoadUP = async () => {
    setloading(true);

    await firestore().collection("users").doc(route.params.ID).get().then((Data) => {
      if (Data.exists) {
        setShop_Owner_Data(Data.data());
        Get_Location(Data.data());
      }
    })

    setloading(false);
  }

  const Get_Location = (Shop_Owner_Data) => {
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${Shop_Owner_Data.address[3].split(":")[1]},${Shop_Owner_Data.address[4].split(":")[1]}`;
    const label = 'Custom Label';
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });
    setlocationURL(url)
  }

  useEffect(() => {
    try {
      LoadUP();
    } catch (error) {
      console.log(error);
    }
  }, [])

  const Check_Location = () => {
    Linking.openURL(locationURL);
  }

  return (
    <Container>
      {/* Text with navback */}
      <View searchBar style={{ flexDirection: 'row', paddingTop: 25, marginBottom: 12, paddingBottom: 6, alignContent: "center", backgroundColor: "darkred", top: 0 }}>
        <Button transparent onPress={() => navigation.goBack()} >
          <Ionicons
            name='arrow-back-outline'
            style={{ fontSize: 30, marginTop: 4, marginRight: 12, marginLeft: 12, color: 'white' }}
          />
        </Button>
        <Text style={{ color: "white", height: 50, fontSize: 20, textAlign: 'center', paddingLeft: '16%', paddingTop: 12, fontWeight: 'bold' }}>{route.params.Name} Details</Text>
      </View>
      {/* End Text with navback */}
      <Content>
        {loading ?
          <Text style={styles.loadingStyle}> Loading... </Text>
          :
          <Card style={{ flex: 0 }}>
            {Shop_Owner_Data.profileIMG == null || Shop_Owner_Data.profileIMG == "" ?
              <Image source={require("../../../assets/ShopOwner.png")} style={{ marginBottom: 20, height: 196, width: null }} />
              :
              <Image source={{ uri: Shop_Owner_Data.profileIMG }} style={{ marginBottom: 20, height: 196, width: null }} />
            }
            <CardItem style={{ marginHorizontal: 1, borderWidth: 3, borderColor: 'darkred' }}>
              <Body>
                <Text style={styles.textStyles}>Name: </Text>
                <Text style={styles.mechanicsTextStyle}>{Shop_Owner_Data.fname} {Shop_Owner_Data.lname}</Text>

                <Text style={styles.textStyles}>Phone Number:</Text>
                <Text style={styles.mechanicsTextStyle}>{Shop_Owner_Data.phoneNumber}</Text>

                <Text style={styles.textStyles}>Rate:</Text>
                <Text style={styles.mechanicsTextStyle}>//Rate//</Text>

                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
                  <Button style={styles.buttonStyle} onPress={() => Check_Location()}>
                    <Icon style={{ marginRight: -6 }} name="location-outline"></Icon>
                    <Text style={styles.buttonTextStyle}>Check Location</Text>
                  </Button>

                  <Button style={styles.buttonStyle}
                    onPress={() => console.log("Review")}
                  >
                    <Icon style={{ marginRight: -6 }} name="pencil"></Icon>
                    <Text style={styles.buttonTextStyle}>Review</Text>
                  </Button>
                </View>
              </Body>
            </CardItem>
          </Card>
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

export default ShopOwnerProfileScreen

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
    marginTop: 15,
    backgroundColor: 'darkred',
  },

  buttonTextStyle: {
    fontWeight: 'bold'
  },
  mechanicsTextStyle: {
    fontSize: 19,
    marginBottom: 10,
    fontWeight: 'bold',
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