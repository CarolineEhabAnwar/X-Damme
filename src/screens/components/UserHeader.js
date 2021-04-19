import React from 'react';
import {View, Text, StyleSheet, Image, Button, Ionicons} from 'react-native';

const UserHeader = () => {

    return  <View searchBar style={{flexDirection: 'row', paddingTop:25 , marginBottom: 12, paddingBottom: 6, alignContent:"center", backgroundColor: "darkred", top: 0}}>
    <Button transparent >
          <Ionicons
            name='arrow-back-outline'
            style={{ fontSize: 30, marginTop:4,marginRight:12,marginLeft:12 ,color: 'white'}}
          />
    </Button>
    <Text style={{color: "white",height:50,fontSize:20, textAlign:'center',paddingLeft:'21%',paddingTop:12, fontWeight:'bold'}}>Item Details</Text> 
  </View>
};


export default UserHeader;





       