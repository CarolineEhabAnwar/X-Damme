import React, { Component,useState , useEffect, useContext } from 'react';
import firestore from '@react-native-firebase/firestore';
import { StyleSheet, View, Image } from 'react-native';
import { Card, CardItem, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import { AuthContext } from '../../navigation/AuthProvider';
import { useNavigation } from '@react-navigation/native';

const ItemComponent = (props) => {
  const navigation = useNavigation();

  const { user } = useContext(AuthContext);
  
  const[shop_Owner_Name,setShop_Owner_name] = useState("");

  function Get_Shop_Owner_Name() {
    useEffect(() => {
      try {
        if (props.shop_owner_id != null) {
          const subscriber = firestore()
            .collection('users')
            .doc(props.shop_owner_id)
            .onSnapshot(documentSnapshot => {
              if (documentSnapshot.exists)
              {
                setShop_Owner_name(documentSnapshot.data().fname+" "+documentSnapshot.data().lname);

              }
            });
          // Stop listening for updates when no longer required
          return () => subscriber();
        }
      } catch (error) {
        alert(error);
      }
    }, []);
  }


  Get_Shop_Owner_Name();

  return (
    <Card style={{ borderRadius: 3 }}>
      <CardItem>
        <Left>
          <Body style={{ marginBottom: 8 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{props.itemName}</Text>
            <Text style={{ fontWeight: 'bold' }} note>{props.carBrand} {props.carModel}</Text>
          </Body>
        </Left>
      </CardItem>
      <CardItem cardBody>
        <Image source={{uri: props.itemImg}} style={{ height: 210, width: null, flex: 1 }} />
      </CardItem>
      <CardItem>
        <Left>
          <Button transparent>
            <Icon active style={{ color: "darkred" }} name="person" />
            <Text style={{ marginLeft: -7, fontWeight: 'bold', marginTop: 5, color: 'darkred', fontSize: 15 }}>{shop_Owner_Name}</Text>
          </Button>
        </Left>
        <Body>
          <View style={{ flexDirection: 'row' }}>
            <FontAwesome5 name="coins" size={20} color="black" style={{ marginTop: 14, marginLeft: 17 }} />
            <Text style={styles.textStyle}>{props.price} EGP</Text>
          </View>
        </Body>
        <Right>
          <Button style={styles.cartItemStyle} large style={{ height: 30, marginRight: 3 }} transparent onPress={async ()=>{
            try{
              await firestore().collection('users').doc(user.uid).get().then((User_Data) =>{
                let temp_cart = [];
                temp_cart = User_Data.data().cart;
                temp_cart.push(props.itemID);
                firestore().collection('users').doc(user.uid).update({
                  cart: temp_cart
                }).then(()=>{
                  alert("Added To Cart.");
                });
              }); 
            }
            catch (error){
              alert(error);
            }          
          }}>
            <FontAwesome5 name="shopping-cart" style={{ color: "darkred", marginRight: 3, marginTop: 3 }} size={20} color="black" />
          </Button>
        </Right>
      </CardItem>
      <CardItem style={{ marginLeft: 'auto' }}>
        <Left>
          <Text style={styles.rateStyle}> {props.rate} </Text>
        </Left>
        <Right>
          <Button style={styles.cartItemStyle} transparent onPress={() => navigation.navigate('ItemDetails',{
          ItemName: props.itemName,
          CarBrand: props.carBrand,
          CarModel: props.carModel,
          Price: props.price,
          MadeIn: props.madeIn,
          Manufacture_Date: props.manufacture_Date,
          Quality: props.quality,
          Shop_Owner: shop_Owner_Name,
          ItemIMG: props.itemImg,
          ItemID: props.itemID,
          ShopOwnerID: props.shop_owner_id
          })}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', marginRight: -15, color: 'darkred' }}> See Item Details </Text>
            <Icon active style={{ fontSize: 25, color: 'darkred' }} name="arrow-forward" />
          </Button>
        </Right>
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
    color: 'black'
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
