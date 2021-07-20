import React, { Component } from 'react';
import { LogBox, StyleSheet, Alert } from 'react-native';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { Container, FooterTab, Content, Card, CardItem, Text, Button, Icon, Body, View } from 'native-base';
import FooterComponent from '../components/FooterComponent'
import { FlatList } from 'react-native-gesture-handler';


const MechViewRequestScreen = ({ navigation, route }) => {

  LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

  return (
    <Container>
      {/* Search bar with drawer */}
      <View searchBar style={{ flexDirection: 'row', paddingTop: 26, marginBottom: 12, paddingBottom: 6, alignContent: "center", backgroundColor: "darkgreen", top: 0 }}>
        <Button transparent onPress={() => navigation.goBack()} >
          <Ionicons
            name='arrow-back-outline'
            style={{ fontSize: 30, marginTop: 4, marginRight: 12, marginLeft: 12, color: 'white' }}
          />
        </Button>
        <Text style={{ color: "white", height: 50, fontSize: 20, textAlign: 'center', paddingLeft: '22%', paddingTop: 12, fontWeight: 'bold' }}> View Service</Text>
      </View>
      {/* End Search bar with drawer */}

      <Content>
        <Card style={{ flex: 0 }}>
          <CardItem style={{ marginHorizontal: 1, borderWidth: 3, borderColor: 'darkgreen' }}>
            <Body>

              <Text style={styles.textStyles}>Type: </Text>
              <Text style={styles.itemsTextStyle}>{route.params.type}</Text>

              <Text style={styles.textStyles}>Price: </Text>
              <Text style={styles.itemsTextStyle}>{route.params.price} EGP</Text>

              <Text style={styles.textStyles}>Service Availability: </Text>
              <FlatList
                data={route.params.days}
                renderItem={({ item }) => {
                  return (
                    <Text style={styles.daysTextStyle}>{item}</Text>
                  );
                }}
                keyExtractor={(item, index) => index.toString()}
              />

              <Text style={styles.textStyles}>Start Time </Text>
              <Text style={styles.itemsTextStyle}>{route.params.start_time}</Text>

              <Text style={styles.textStyles}>End Time: </Text>
              <Text style={styles.itemsTextStyle}>{route.params.end_time}</Text>

              <Text style={styles.textStyles}>Duration: </Text>
              <Text style={styles.itemsTextStyle}>{route.params.duration} Hours</Text>


            </Body>
          </CardItem>
        </Card>
      </Content>

      <FooterComponent
        home="MechHome"
        profile="MechProfile"
        contactus="MechContactUs"
        bkcolor="darkgreen"
      />

    </Container>
  );
}

export default MechViewRequestScreen;

const styles = StyleSheet.create({
  textStyles: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textShadowColor: 'green',
    textShadowRadius: 1.5,
    textShadowOffset: {
      width: 0.5,
      height: 0.5
    },
  },

  itemsTextStyle: {
    fontSize: 19,
    marginBottom: 10,
    fontWeight: 'bold',
  },

  daysTextStyle: {
    fontSize: 19,
    marginBottom: 5,
    fontWeight: 'bold',
  },

  buttonStyle: {
    marginTop: 7,
    marginLeft: 'auto',
    backgroundColor: 'darkgreen',
  },

  buttonTextStyle: {
    fontWeight: 'bold'
  }
})
