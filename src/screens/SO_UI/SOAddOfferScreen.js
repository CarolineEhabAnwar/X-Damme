import React, { Component } from 'react';
import {StyleSheet,View} from 'react-native';
import { Container, Header,FooterTab,Badge, Content, Item, Input, Icon,DatePicker,Text,Radio,Picker,Form, Button,Image } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { AntDesign,Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

export default class SOAddOfferScreen extends Component {
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
      <View searchBar style={{flexDirection: 'row', paddingTop:26 , marginBottom: 12, paddingBottom: 6, alignContent:"center", backgroundColor: "darkblue", top: 0}}>
        <Button transparent onPress={() => this.props.navigation.navigate('SOHome')} >
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
          <AntDesign name="edit" style={{marginRight:10,marginTop:1.5}} size={22} color="darkblue" />
          <Text style={styles.textStyle}>Please enter offer details</Text>
        </View>
        <Form>          
        <Item regular style={styles.InputStyle}>
            <Input placeholder='Offer Percentage' keyboardType="numeric"/>
        </Item>

        <Item regular style={styles.InputStyle}>
            <Input placeholder='Item ID' />
         </Item>
        
        
        <Item regular style={ {marginBottom:10,
        borderWidth:3,
        borderColor:'darkblue',
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
            placeHolderTextStyle={{ color: "darkblue" }}
            onDateChange={this.setDate}
            disabled={false}
            />
            <Text>
            {this.state.chosenDate.toString().substr(4, 12)}
            </Text>
        </Item>

        <Item regular style={ {marginBottom:10,
        borderWidth:3,
        borderColor:'darkblue',
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
            placeHolderTextStyle={{ color: "darkblue" }}
            onDateChange={this.setDate}
            disabled={false}
            />
            <Text>
            {this.state.chosenDate.toString().substr(4, 12)}
            </Text>
        </Item>

        <Item regular style={styles.InputStyle}>
            <Text style={{marginLeft:4,color:'darkblue'}}>Advertisment Image: </Text>
            <Button style={{height:45,position:'relative',backgroundColor:'darkblue',margin:2}} >
             <Text> Upload Photo</Text> 
            </Button>
         </Item>

        <View style={{flexDirection:'row',justifyContent:'center'}}>
          <Button style={{backgroundColor:'darkblue', marginVertical:20, marginRight:40,alignSelf:'center'}}>
              <Text>Confirm</Text>
          </Button>

          <Button bordered  style={{borderColor:'darkblue',marginVertical:20, alignSelf:'center'}}
                onPress={() => this.props.navigation.navigate('SOHome')}
            >
              <Text style={{color:'darkblue'}}>Cancel</Text>
          </Button>
        </View>
        </Form>
      </Content>

        {/* Footer */}
        <View style={{flexDirection: 'row',alignContent:"center", backgroundColor: "darkblue"}}>
          <FooterTab transparent style={{backgroundColor: "darkblue"}}>
            <Button style={{marginTop:5}} onPress={() => this.props.navigation.navigate('SOHome')}>
              <Icon style={{color:'white'}} name="home" />
              <Text style={{color:'white'}}> Home</Text>
            </Button>

            <Button style={{marginTop:5}} onPress={() => this.props.navigation.navigate('SOProfile')}>
              <Icon name="person" style={{color:'white'}}/>
              <Text style={{color:'white'}}>Profile</Text>
            </Button>

            <Button style={{marginTop:5}} onPress={() => this.props.navigation.navigate('SOContactUs')}>
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
        borderColor:'darkblue',
        borderRadius:6,
        justifyContent:'space-between'
    },

    ViewStyle:{
      marginBottom:10,
      flexDirection:'row',
  },
    textStyle:{
        marginBottom:12,
        color:'darkblue',
        fontSize:19,
        fontWeight:'600',
        alignSelf:'center'
    }
})