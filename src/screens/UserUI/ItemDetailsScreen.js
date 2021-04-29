import React from 'react';
import { Image,StyleSheet,View } from 'react-native';
import { Container,FooterTab,Footer,Badge,InputGroup,Input, Header, Content, Card, Icon, CardItem,Thumbnail, Text, Button, Left, Body, Right } from 'native-base';
import { DrawerActions } from 'react-navigation-drawer';
import { FontAwesome5,Ionicons } from '@expo/vector-icons'; 
import Modal from 'react-native-modal';


const ItemDetailsScreen = ({navigation, route}) => {

  console.log(route.params)

    return (
      <Container>
        
        {/* Text with drawer */}
        <View searchBar style={{flexDirection: 'row', paddingTop:25 , marginBottom: 12, paddingBottom: 6, alignContent:"center", backgroundColor: "darkred", top: 0}}>
        <Button transparent onPress={() => navigation.goBack()} >
              <Ionicons
                name='arrow-back-outline'
                style={{ fontSize: 30, marginTop:4,marginRight:12,marginLeft:12 ,color: 'white'}}
              />
        </Button>
        <Text style={{color: "white",height:50,fontSize:20, textAlign:'center',paddingLeft:'21%',paddingTop:12, fontWeight:'bold'}}>Item Details</Text> 
      </View>
      {/* End Text with drawer */}
      <Content>
          <Card style={{marginTop:0,flex: 0}}>
            <Image source={require("../../../assets/mirror.jpg")} style={{marginBottom:20,height: 200, width: null}}/>
              <CardItem style={{marginHorizontal:1,borderWidth:3,borderColor:'darkred'}}>
                <Body>
                  <Text style={styles.textStyles}>Name: {route.params.ItemName}</Text>
                  <Text style={styles.textStyles}>Price: {route.params.Price}</Text>
                  <Text style={styles.textStyles}>Car Brand: {route.params.CarBrand}</Text>
                  <Text style={styles.textStyles}>Car Model: {route.params.CarModel}</Text>
                  <Text style={styles.textStyles}>Quality: {route.params.Quality}</Text>
                  <Text style={styles.textStyles}>Made In: {route.params.MadeIn}</Text>
                  <Text style={styles.textStyles}>Manufacture Date: {route.params.Manufacture_Date}</Text>
                  <Text style={styles.textStyles}>Shop Owner: {route.params.Shop_Owner}</Text>
                  <View style={{flexDirection:'row',alignSelf:'center'}}>
                    <Button style={styles.buttonStyle}>
                      <Icon style={{marginRight:-6}} name="pencil-outline"></Icon>
                      <Text style={styles.buttonTextStyle}>Review</Text>
                    </Button>
                    <Button style={styles.buttonStyle}>
                      <Icon style={{marginRight:-6}} name="cart"></Icon>
                      <Text style={styles.buttonTextStyle}>Add to Cart</Text>
                    </Button>
                  </View>
                </Body>
              </CardItem>
          </Card>
        </Content>
        {/* Footer */}
        <View style={{flexDirection: 'row',alignContent:"center", backgroundColor: "darkred"}}>
          <FooterTab transparent style={{backgroundColor: "darkred"}}>
            <Button style={{marginTop:5}} onPress={() => navigation.navigate('Home')}>
              <Icon style={{color:'white'}} name="home" />
              <Text style={{color:'white'}}> Home</Text>
            </Button>

            <Button style={{marginTop:5}} onPress={() => navigation.navigate('Profile')}>
              <Icon name="person" style={{color:'white'}}/>
              <Text style={{color:'white'}}>Profile</Text>
            </Button>

            <Button style={{marginTop:5}} onPress={() => navigation.navigate('ContactUs')}>
              <Icon style={{color:'white'}} name="call" />
              <Text style={{color:'white'}} >Contact Us</Text>
            </Button>
          </FooterTab>
        </View>
        {/* End Footer */}
      </Container>
    );
  }

export default ItemDetailsScreen;

const styles = StyleSheet.create({
  textStyles:{
    fontSize:20,
    marginBottom:4,
    fontWeight:'bold',
    color:'black',
    textShadowColor: 'darkred',
    textShadowRadius: 1.5,
     textShadowOffset: { 
        width: 0.5,
        height: 0.5
      },
    marginBottom:10
    
  },

  buttonStyle:{
    marginTop:7,
    backgroundColor:'darkred',
    marginRight:10
  },

  buttonTextStyle:{
    fontWeight:'bold'
  }
})