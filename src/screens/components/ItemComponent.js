import React, { useState, useEffect, useContext } from 'react';
import firestore from '@react-native-firebase/firestore';
import { StyleSheet, View, Image } from 'react-native';
import { Card, CardItem, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import { AuthContext } from '../../navigation/AuthProvider';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const ItemComponent = (props) => {
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();
  const { user } = useContext(AuthContext);

  return (
    <Card style={{ borderRadius: 3 }}>
      <CardItem>
        <Left>
          <Body style={{ marginBottom: 8 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{props.Item.Name}</Text>
            <Text style={{ fontWeight: 'bold' }} note>{props.Item.Car_Brand} {props.Item.Car_Model}</Text>
          </Body>
        </Left>
      </CardItem>
      <CardItem cardBody>
        <Image source={{ uri: props.Item.Image_Path }} style={{ height: 210, width: null, flex: 1 }} />
      </CardItem>
      <View style={{ flexDirection: "row" }}>
        <Button transparent style={{marginRight:15}} onPress={() => navigation.navigate('ShopOwnerProfile', {
          ID: props.Item.Shop_Owner_ID,
          Name: props.Item.Shop_Owner_Name
        })}>
          <Icon active style={{ color: "darkred" }} name="person" />
          <Text style={{ marginLeft: -25, fontWeight: 'bold', color: 'darkred', fontSize: 15 }}>{props.Item.Shop_Owner_Name}</Text>
        </Button>
        <View style={{ alignSelf: "flex-start", marginLeft: -17 }}>
          {props.Item.InOffer == "true" ?
            <View style={{ flexDirection: 'row' }}>
              <FontAwesome5 name="coins" size={20} color="black" style={{ marginTop: 14, marginLeft: 17 }} />
              <View style={{flexDirection:'column'}}>
                <Text style={{
                  marginTop: 16, fontSize: 15, marginLeft: 8, fontWeight: 'bold', color: 'black', textDecorationLine: 'line-through',marginBottom:-18,marginRight:30
                }}>{props.Item.Price} EGP</Text>
                <Text style={{marginTop: 16,fontSize: 15,marginLeft: 8,fontWeight: 'bold',color: 'black',marginBottom:10}}>{props.Item.After_Price} EGP</Text>
              </View>
            </View>
            :
            <View style={{ flexDirection: 'row' }}>
              <FontAwesome5 name="coins" size={20} color="black" style={{ marginTop: 14, marginLeft: 17 }} />
              <Text style={[styles.textStyle,{marginRight:30}]}>{props.Item.Price} EGP</Text>
            </View>
          }
        </View>
        <Button transparent style={{marginLeft:10}} onPress={async () => {
          try {
            await firestore().collection('users').doc(user.uid).get().then((User_Data) => {
              let temp_cart = [];
              temp_cart = User_Data.data().cart;
              temp_cart.push(props.Item.key);
              firestore().collection('users').doc(user.uid).update({
                cart: temp_cart
              }).then(() => {
                alert(t('ItemComponentText2'));
              });
            });
          }
          catch (error) {
            alert(error);
          }
        }}>
          <FontAwesome5 name="shopping-cart" style={{ color: "darkred", marginRight: 3, marginTop: 3 }} size={20} color="black" />
        </Button>
      </View>
      <CardItem style={{ marginLeft: 'auto' }}>
        <View style={{alignSelf:"flex-end"}}>
          <Button style={styles.cartItemStyle} transparent onPress={() => navigation.navigate('ItemDetails', {
            Item: props.Item,
            key: props.Item.key
          })}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', marginRight: -15, color: 'darkred' }}>{t('ItemComponentText3')}</Text>
            <Icon active style={{marginLeft:-1 , fontSize: 25, color: 'darkred' }} name="arrow-forward" />
          </Button>
        </View>
      </CardItem>
    </Card>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    marginTop: 16,
    fontSize: 15,
    marginLeft: 8,
    fontWeight: 'bold',
    color: 'black',
  },

  cartItemStyle: {
    marginTop: -23,
    marginBottom: -10,
    marginRight: 3
  },
  rateStyle: {
    marginTop: -23,
    marginBottom: -9,
    marginRight: 3,
    fontSize: 16,
    marginLeft: 0,
    fontWeight: 'bold',
    color: 'black'
  }
})

export default ItemComponent;
