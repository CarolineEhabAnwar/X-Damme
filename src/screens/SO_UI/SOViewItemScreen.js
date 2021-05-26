import React, { Component } from 'react';
import { Image, StyleSheet,Alert } from 'react-native';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { Container, FooterTab, Content, Card, CardItem, Text, Button, Icon, Body, View } from 'native-base';
import FooterComponent from '../components/FooterComponent'


const SOViewItemScreen = ({ navigation, route }) => {

  return (
    <Container>
      {/* Search bar with drawer */}
      <View searchBar style={{ flexDirection: 'row', paddingTop: 26, marginBottom: 12, paddingBottom: 6, alignContent: "center", backgroundColor: "darkblue", top: 0 }}>
        <Button transparent onPress={() => navigation.goBack()} >
          <Ionicons
            name='arrow-back-outline'
            style={{ fontSize: 30, marginTop: 4, marginRight: 12, marginLeft: 12, color: 'white' }}
          />
        </Button>
        <Text style={{ color: "white", height: 50, fontSize: 20, textAlign: 'center', paddingLeft: '20%', paddingTop: 12, fontWeight: 'bold' }}> Item Details</Text>
      </View>
      {/* End Search bar with drawer */}

      <Content>
        <Card style={{ flex: 0 }}>
          <Image source={{ uri: route.params.imagePath }} style={{ marginBottom: 20, height: 200, width: null }} />
          <CardItem style={{ marginHorizontal: 1, borderWidth: 3, borderColor: 'darkblue' }}>
            <Body>

              <Text style={styles.textStyles}>Name: </Text>
              <Text style={styles.itemsTextStyle}>{route.params.name}</Text>

              <Text style={styles.textStyles}>Price: </Text>
              <Text style={styles.itemsTextStyle}>{route.params.price}</Text>

              <Text style={styles.textStyles}>Quality: </Text>
              <Text style={styles.itemsTextStyle}>{route.params.quality}</Text>

              <Text style={styles.textStyles}>Manufacture Date: </Text>
              <Text style={styles.itemsTextStyle}>{route.params.manf_date}</Text>

              <Text style={styles.textStyles}>Made In: </Text>
              <Text style={styles.itemsTextStyle}>{route.params.made_in}</Text>

              <Text style={styles.textStyles}>Car Brand: </Text>
              <Text style={styles.itemsTextStyle}>{route.params.car_brand}</Text>

              <Text style={styles.textStyles}>Car Model: </Text>
              <Text style={styles.itemsTextStyle}>{route.params.car_model}</Text>

              <Text style={styles.textStyles}>Item ID: </Text>
              <Text style={styles.itemsTextStyle}>{route.params.itemID}</Text>

              <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 17, alignSelf:'center' }}>
                {/* Edit */}
                <Button style={{ marginLeft: 30, backgroundColor: 'darkblue' }}
                  onPress={() => navigation.navigate('SOEditItem', {
                  imagePath: route.params.imagePath,
                  name: route.params.name,
                  price: route.params.price,
                  quality: route.params.quality,
                  manf_date: route.params.manf_date,
                  made_in: route.params.made_in,
                  car_model: route.params.car_model,
                  car_brand: route.params.car_brand,
                  type: route.params.type,
                  itemID: route.params.itemID
                })}>
                  <Text style={styles.buttonTextStyle}>Edit</Text>
                </Button>

                {/* Delete */}
                <Button transparent  style={{ marginLeft: 30, backgroundColor: '#eb1c1c' }} onPress={() =>
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
                  <Text style={{fontWeight:'bold',color:'white'}}>Delete</Text>
                </Button>
              </View>
            </Body>
          </CardItem>
        </Card>
      </Content>

      <FooterComponent home="SOHome" profile="SOProfile" contactus="SOContactUs" bkcolor="darkblue"/>

    </Container>
  );
}

export default SOViewItemScreen;

const styles = StyleSheet.create({
  textStyles: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textShadowColor: 'blue',
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

  buttonStyle: {
    marginTop: 7,
    marginLeft: 'auto',
    backgroundColor: 'darkblue',
  },

  buttonTextStyle: {
    fontWeight: 'bold'
  }
})
