import React, { Component } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Container, Header, Badge, FooterTab, Button, Text, Icon, InputGroup, Input } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Fontisto } from '@expo/vector-icons';
import { FontAwesome5, AntDesign, Ionicons, FontAwesome } from '@expo/vector-icons';
import FooterComponent from '../components/FooterComponent'

const TutorialsScreen = ({ navigation }) => {

  return (
    <Container>
      {/* Text with navback */}
      <View searchBar style={{ flexDirection: 'row', paddingTop: 25, paddingBottom: 6, alignContent: "center", backgroundColor: "darkred", top: 0 }}>
        <Button transparent onPress={() => navigation.goBack()} >
          <Ionicons
            name='arrow-back-outline'
            style={{ fontSize: 30, marginTop: 4, marginRight: 12, marginLeft: 12, color: 'white' }}
          />
        </Button>
        <Text style={{ color: "white", height: 50, fontSize: 20, textAlign: 'center', paddingLeft: '25%', paddingTop: 12, fontWeight: 'bold' }}>Tutorials</Text>
      </View>
      {/* End Text with navback */}

      <Grid>
        <Col style={{ backgroundColor: '#635DB7'}}>
          <Button full transparent style={styles.buttonStyle} onPress={() => navigation.navigate('BeginnersStuff')}>
            <Icon style={styles.iconStyle} name="bulb-outline"></Icon>
            <Text style={styles.textStyle}>Beginners Stuff</Text>
          </Button>
        </Col>
        <Col style={{ backgroundColor: '#ad9c9c'}}>
          <Button full transparent style={styles.buttonStyle} onPress={() => navigation.navigate('StuckOnTheRoad')}>
            <FontAwesome name="road" style={styles.iconStyle} />
            <Text style={styles.textStyle}>Stuck on the road</Text>
          </Button>
        </Col>
      </Grid>
      <Grid>
        <Col style={{ backgroundColor: '#1a8f8d' }}>
          <Button full transparent style={styles.buttonStyle} onPress={() => navigation.navigate('CarCheckUp')}>
            <Icon style={styles.iconStyle} name="build-outline"></Icon>
            <Text style={styles.textStyle}>Car Check up</Text>
          </Button>
        </Col>
        <Col style={{ backgroundColor: '#cf0e22'}}>
          <Button full transparent style={styles.buttonStyle} onPress={() => navigation.navigate('FirstAid')}>
            <Fontisto name="first-aid-alt" style={styles.iconStyle} />
            <Text style={styles.textStyle}>First Aid</Text>
          </Button>
        </Col>
      </Grid>

      <FooterComponent
        home="Home"
        contactus="ContactUs"
        profile="Profile"
        bkcolor="darkred"
      />

    </Container>
  );
}

export default TutorialsScreen;

const styles = StyleSheet.create({
  buttonStyle: {
    width: "100%",
    height: "100%",
    flexDirection: 'column'
  },

  textStyle: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 18,
  },

  iconStyle: {
    fontSize: 40,
    color: 'white',
    marginBottom: 10
  }
})

