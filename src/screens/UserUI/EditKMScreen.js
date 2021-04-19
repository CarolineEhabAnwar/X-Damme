import React, { Component } from 'react';
import {StyleSheet,View} from 'react-native';
import { Container,FooterTab,Badge, Header, Content, Item, Input, Icon,DatePicker,Text,Radio,Picker,Form, Button,Image } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { Fontisto,Ionicons } from '@expo/vector-icons';
import ImagePicker from "react-native-image-picker"

const EditKMScreen = () => {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //       selected: undefined,
    //       chosenDate: new Date()
    //     };
    //   }

    //   onValueChange(value: string) {
    //     this.setState({
    //       selected: value
    //     });
    // }

    // setDate(newDate) {
    //     this.setState({ chosenDate: new Date(Date.GMT(2019, 2, 18)) });
    // }


    // handleChoosePhoto = () =>  {
    //   const options = {};
    //   ImagePicker.launchImageLibrary(options,response => {console.log("response",response);})
    // }

    let home_notification = 5;
    let profile_notification = 5;
    let settings_notification = 5;

    return (
      <Container >
        {/* Search bar with drawer */}
        <View searchBar style={{flexDirection: 'row', paddingTop:26 , marginBottom: 12, paddingBottom: 6, alignContent:"center", backgroundColor: "darkred", top: 0}}>
        <Button transparent onPress={() => this.props.navigation.navigate('MyCars')} >
              <Ionicons
                name='arrow-back-outline'
                style={{ fontSize: 30, marginTop:4,marginRight:12,marginLeft:12 ,color: 'white'}}
              />
            </Button>
            <Text style={{color: "white",height:50,fontSize:20, textAlign:'center',paddingLeft:'25%',paddingTop:12, fontWeight:'bold'}}> Edit KM</Text> 
        </View>
        {/* End Search bar with drawer */}

        <Content style={{marginHorizontal:15,paddingVertical:10}}>

        <Form>         
        <Item regular style={styles.InputStyle}>
          <Input placeholder='Add new KM Reading' keyboardType="numeric" />
        </Item>

        <Button  style={{backgroundColor:'darkred', marginVertical:20, alignSelf:'center'}}>
            <Text>Add KM</Text>
        </Button>

        <Button  style={{backgroundColor:'darkred', marginVertical:20, alignSelf:'center'}}>
            <Text>See KM History</Text>
        </Button>

        </Form>

    </Content>
  
    </Container>
    );

  }

const styles = StyleSheet.create({
    InputStyle:{
        marginBottom:10,
        borderColor:'darkred',
        borderRadius:6,
        justifyContent:'space-between'
    },

    ViewStyle:{
      marginBottom:10,
      flexDirection:'row',
  }
});

export default EditKMScreen;