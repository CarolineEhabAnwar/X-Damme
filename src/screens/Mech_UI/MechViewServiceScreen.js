import React, { Component } from 'react';
import { LogBox, StyleSheet, Alert } from 'react-native';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { Container, FooterTab, Content, Card, CardItem, Text, Button, Icon, Body, View } from 'native-base';
import FooterComponent from '../components/FooterComponent'
import { FlatList } from 'react-native-gesture-handler';


const MechViewServiceScreen = ({ navigation, route }) => {

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
              <Text style={styles.itemsTextStyle}>{route.params.item.Type}</Text>

              {route.params.item.InOffer == "true" ?
                <View>
                  <Text style={styles.textStyles}>Price: </Text>
                  <Text style={{ fontSize: 19, marginBottom: 10, fontWeight: 'bold', textDecorationLine: 'line-through' }}>{route.params.item.Price}</Text>
                  <Text style={styles.itemsTextStyle}>{route.params.item.After_Price}</Text>
                </View>
                :
                <View>
                  <Text style={styles.textStyles}>Price: </Text>
                  <Text style={styles.itemsTextStyle}>{route.params.item.Price}</Text>
                </View>
              }

              <Text style={styles.textStyles}>Service Availability: </Text>
              <FlatList
                data={route.params.item.Days}
                renderItem={({ item }) => {
                  return (
                    <Text style={styles.daysTextStyle}>{item}</Text>
                  );
                }}
                keyExtractor={(item, index) => index.toString()}
              />

              <Text style={styles.textStyles}>Start Time </Text>
              <Text style={styles.itemsTextStyle}>{route.params.item.Start_Time}</Text>

              <Text style={styles.textStyles}>End Time: </Text>
              <Text style={styles.itemsTextStyle}>{route.params.item.End_Time}</Text>

              <Text style={styles.textStyles}>Duration: </Text>
              <Text style={styles.itemsTextStyle}>{route.params.item.Duration} Hours</Text>

              <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 17, alignSelf: 'center' }}>
                {/* Edit */}
                <Button style={{ marginLeft: 30, backgroundColor: 'darkgreen' }}
                  onPress={() => navigation.navigate('MechEditService', {
                    type: route.params.item.Type,
                    price: route.params.item.Price,
                    days: route.params.item.Days,
                    start_time: route.params.item.Start_Time,
                    end_time: route.params.item.End_Time,
                    duration: route.params.item.Duration,
                    serviceID: route.params.item.key
                  })}>
                  <Text style={styles.buttonTextStyle}>Edit</Text>
                </Button>

                {/* Delete */}
                <Button transparent style={{ marginLeft: 30, backgroundColor: '#eb1c1c' }} onPress={() =>
                  Alert.alert(
                    "Warning",
                    "Are you sure you want to delete this item?",
                    [
                      {
                        text: "No"
                      },
                      {
                        text: "Yes", onPress: () => {
                          firestore()
                            .collection('CarStuff')
                            .doc(item.key)
                            .delete()
                            .then(() => {
                              alert("Item deleted");
                            });
                        }
                      }
                    ]
                  )
                }>
                  <Text style={{ fontWeight: 'bold', color: 'white' }}>Delete</Text>
                </Button>
              </View>
            </Body>
          </CardItem>
        </Card>
      </Content>

      <FooterComponent
        home="MechHome"
        profile="MechProfile"
        contactus="MechContactUs"
        backgroundColor="darkgreen"
      />

    </Container>
  );
}

export default MechViewServiceScreen;

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
