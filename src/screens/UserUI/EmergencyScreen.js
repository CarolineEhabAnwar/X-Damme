import React, { Component } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Container, Badge, FooterTab, Header, Button, Text, Icon, InputGroup, Input } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Entypo, FontAwesome, MaterialIcons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { Fontisto, Ionicons } from '@expo/vector-icons';
import FooterComponent from "../components/FooterComponent"

const EmergencyScreen = ({ navigation }) => {

  return (
    <Container>
      {/* Text with navback */}
      <View searchBar style={{ flexDirection: 'row', paddingTop: 25, paddingBottom: 6, alignContent: "center", backgroundColor: "darkred", top: 0 }}>
        <Button transparent onPress={() => navigation.navigate('Home')} >
          <Ionicons
            name='arrow-back-outline'
            style={{ fontSize: 30, marginTop: 4, marginRight: 12, marginLeft: 12, color: 'white' }}
          />
        </Button>
        <Text style={{ color: "white", height: 50, fontSize: 20, textAlign: 'center', paddingLeft: '22%', paddingTop: 12, fontWeight: 'bold' }}>Emergency</Text>
      </View>
      {/* End Text with navback */}
      <Grid>
        <Col style={{ backgroundColor: '#c99c1e' }}>
          <Button full transparent style={styles.buttonStyle} onPress={() => navigation.navigate('PingMap')}>
            <Entypo style={styles.iconStyle} name="location-pin" />
            <Text style={styles.textStyle}>Ping Nearest Users</Text>
          </Button>
        </Col>
        <Col style={{ backgroundColor: '#1b2696' }}>
          <Button full transparent style={styles.buttonStyle} onPress={() => navigation.navigate('EmergencyContacts')} >
            <MaterialIcons name="quick-contacts-dialer" style={styles.iconStyle} />
            <Text style={styles.textStyle}>Emergency Contacts </Text>
          </Button>
        </Col>
      </Grid>
      <Grid>
        <Col style={{ backgroundColor: '#d91118' }}>
          <Button full transparent style={styles.buttonStyle} onPress={() => {
            navigation.navigate("NearbyHospitals")
            console.log("Hospitals")
          }}>
            <FontAwesome5 style={styles.iconStyle} name="hospital" />
            <Text style={styles.textStyle}>Nearby Hospitals</Text>
          </Button>
        </Col>
        <Col style={{ backgroundColor: '#80207e' }}>
          <Button full transparent style={styles.buttonStyle} onPress={() => navigation.navigate('WinchNumbers')}>
            <MaterialCommunityIcons name="tow-truck" style={styles.iconStyle} />
            <Text style={styles.textStyle}>Winch Numbers</Text>
          </Button>
        </Col>
      </Grid>

      <FooterComponent
        home="Home"
        profile="Profile"
        contactus="ContactUs"
        bkcolor="darkred"
      />

    </Container>
  );
}

export default EmergencyScreen;

const styles = StyleSheet.create({
  buttonStyle: {
    width: "100%",
    height: "100%",
    flexDirection: 'column'
  },

  textStyle: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
    textAlign: 'center'
  },

  iconStyle: {
    fontSize: 40,
    color: 'white',
    marginBottom: 10
  }
})

