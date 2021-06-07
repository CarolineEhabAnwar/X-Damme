import React, { Component } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Container, FooterTab, Badge, InputGroup, Input, Header, Content, Card, Icon, CardItem, Thumbnail, Text, Button, Left, Body, Right } from 'native-base';
import { DrawerActions } from 'react-navigation-drawer';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import FooterComponent from '../components/FooterComponent'

const MechanicDetailsScreen = ({ route, navigation }) => {

  const mechID = route.params.mechID

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
        <Text style={{ color: "white", height: 50, fontSize: 20, textAlign: 'center', paddingLeft: '16%', paddingTop: 12, fontWeight: 'bold' }}>Mechanic Details</Text>
      </View>
      {/* End Text with navback */}
      <Content>
        <Card style={{ flex: 0 }}>
          {route.params.Image == null || route.params.Image == "" ?
            <Image source={require("../../../assets/mechanic.png")} style={{ marginBottom: 20, height: 196, width: null }} />
            :
            <Image source={{ uri: route.params.Image }} style={{ marginBottom: 20, height: 196, width: null }} />
          }
          <CardItem style={{ marginHorizontal: 1, borderWidth: 3, borderColor: 'darkred' }}>
            <Body>
              <Text style={styles.textStyles}>Name: </Text>
              <Text style={styles.mechanicsTextStyle}>{route.params.fname} {route.params.lname}</Text>

              <Text style={styles.textStyles}>Location: </Text>
              <Text style={styles.mechanicsTextStyle}>{route.params.address}</Text>

              <Text style={styles.textStyles}>Rate:</Text>
              <Text style={styles.mechanicsTextStyle}>//Rate//</Text>
              {/* <Text style={styles.textStyles}>Open Time: -</Text>
                  <Text style={styles.textStyles}>Close Time: -</Text>
                  <Text style={styles.textStyles}>Working Days: -</Text> */}
              <Button style={styles.buttonStyle} onPress={() => navigation.navigate('ServiceDetails', {
                mechID: mechID
              })}>
                <Icon style={{ marginRight: -6 }} name="build-outline"></Icon>
                <Text style={styles.buttonTextStyle}>Services</Text>
              </Button>
            </Body>
          </CardItem>
        </Card>
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

export default MechanicDetailsScreen

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
    marginLeft: 'auto',
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
})