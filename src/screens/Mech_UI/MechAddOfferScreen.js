import React, { Component } from 'react';
import {StyleSheet,View} from 'react-native';
import { Container, Header,FooterTab,Badge, Content, Item, Input, Icon,DatePicker,Text,Radio,Picker,Form, Button,Image } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { AntDesign,Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

export default class MechAddOffer extends Component {
    constructor(props) {
        super(props);
        this.state = {
          selected: undefined,
          chosenDate: new Date()
        };
      }

      onValueChange(value: string) {
        this.setState({
          selected: value
        });
    }

    setDate(newDate) {
        this.setState({ chosenDate: new Date(Date.GMT(2019, 2, 18)) });
    }
  
    
    render() {

    let home_notification = 5;
    let profile_notification = 5;
    let settings_notification = 5;

    return (
      <Container>
      {/* Search bar with drawer */}
      <View searchBar style={{flexDirection: 'row', paddingTop:26 , marginBottom: 12, paddingBottom: 6, alignContent:"center", backgroundColor: "darkgreen", top: 0}}>
        <Button transparent onPress={() => this.props.navigation.navigate('MechHome')} >
              <Ionicons
                name='arrow-back-outline'
                style={{ fontSize: 30, marginTop:4,marginRight:12,marginLeft:12 ,color: 'white'}}
              />
            </Button>
          <Text style={{color: "white",height:50,fontSize:20, textAlign:'center',paddingLeft:'24%',paddingTop:12, fontWeight:'bold'}}> Add Offer</Text> 
      </View>
      {/* End Search bar with drawer */}  
        <Content style={{marginHorizontal:15,paddingVertical:10}}>
        
        <View style={{flexDirection:'row'}}>
          <AntDesign name="edit" style={{marginRight:10,marginTop:1.5}} size={22} color="darkgreen" />
          <Text style={styles.textStyle}>Please enter offer details</Text>
        </View>
        <Form>          
        <Item regular style={styles.InputStyle}>
            <Input placeholder='Offer Percentage' keyboardType="numeric"/>
        </Item>

        <Item regular style={styles.InputStyle}>
            <Input placeholder='Service Name' />
         </Item>
        
        
        <Item regular style={ {marginBottom:10,
        borderWidth:3,
        borderColor:'darkgreen',
        borderRadius:6,
        alignSelf:'flex-start',
        height:50}}>
         <DatePicker
            defaultDate={new Date(2018, 4, 4)}
            minimumDate={new Date(2018, 1, 1)}
            maximumDate={new Date(2018, 12, 31)}
            locale={"en"}
            timeZoneOffsetInMinutes={undefined}
            modalTransparent={false}
            animationType={"fade"}
            androidMode={"default"}
            placeHolderText="Offer Start :"
            placeHolderTextStyle={{ color: "darkgreen" }}
            onDateChange={this.setDate}
            disabled={false}
            />
            <Text>
            {this.state.chosenDate.toString().substr(4, 12)}
            </Text>
        </Item>

        <Item regular style={ {marginBottom:10,
        borderWidth:3,
        borderColor:'darkgreen',
        borderRadius:6,
        alignSelf:'flex-start',
        height:50}}>
         <DatePicker
            defaultDate={new Date(2018, 4, 4)}
            minimumDate={new Date(2018, 1, 1)}
            maximumDate={new Date(2018, 12, 31)}
            locale={"en"}
            timeZoneOffsetInMinutes={undefined}
            modalTransparent={false}
            animationType={"fade"}
            androidMode={"default"}
            placeHolderText="Offer End :"
            placeHolderTextStyle={{ color: "darkgreen" }}
            onDateChange={this.setDate}
            disabled={false}
            />
            <Text>
            {this.state.chosenDate.toString().substr(4, 12)}
            </Text>
        </Item>

        <Item regular style={styles.InputStyle}>
            <Text style={{marginLeft:4,color:'darkgreen'}}>Advertisment Image: </Text>
            <Button style={{height:45,position:'relative',backgroundColor:'darkgreen',margin:2}} >
             <Text> Upload Photo</Text> 
            </Button>
         </Item>

        <View style={{flexDirection:'row',justifyContent:'center'}}>
          <Button style={{backgroundColor:'darkgreen', marginVertical:20, marginRight:40,alignSelf:'center'}}>
              <Text>Confirm</Text>
          </Button>

          <Button bordered  style={{borderColor:'darkgreen',marginVertical:20, alignSelf:'center'}}
                onPress={() => this.props.navigation.navigate('MechHome')}
            >
              <Text style={{color:'darkgreen'}}>Cancel</Text>
          </Button>
        </View>
        </Form>
      </Content>

        {/* Footer */}
        <View style={{flexDirection: 'row',alignContent:"center", backgroundColor: "darkgreen"}}>
          <FooterTab transparent style={{backgroundColor: "darkgreen"}}>
            <Button style={{marginTop:5}} onPress={() => this.props.navigation.navigate('MechHome')}>
              <Icon style={{color:'white'}} name="home" />
              <Text style={{color:'white'}}> Home</Text>
            </Button>

            <Button style={{marginTop:5}} onPress={() => this.props.navigation.navigate('MechProfile')}>
              <Icon name="person" style={{color:'white'}}/>
              <Text style={{color:'white'}}>Profile</Text>
            </Button>

            <Button style={{marginTop:5}} onPress={() => this.props.navigation.navigate('MechContactUs')}>
              <Icon style={{color:'white'}} name="call" />
              <Text style={{color:'white'}} >Contact Us</Text>
            </Button>
          </FooterTab>
        </View>
        {/* End Footer */}      
    </Container>
    );

  }
}

const styles = StyleSheet.create({
    InputStyle:{
        marginBottom:10,
        borderColor:'darkgreen',
        borderRadius:6,
        justifyContent:'space-between'
    },

    ViewStyle:{
      marginBottom:10,
      flexDirection:'row',
  },
    textStyle:{
        marginBottom:12,
        color:'darkgreen',
        fontSize:19,
        fontWeight:'600',
        alignSelf:'center'
    }
})