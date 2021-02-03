import React, { Component } from 'react';
import {StyleSheet,View} from 'react-native';
import { Container, Header, Content, Item, Input, Icon,DatePicker,Text,Radio,Picker,Form, Button,Image } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

export default class SignUpScreen extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = { chosenDate: new Date() };
    //     this.setDate = this.setDate.bind(this);
    //   }
    //   setDate(newDate) {
    //     this.setState({ chosenDate: new Date(Date.UTC(2019, 2, 18)) });
    // }

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
    return (
      <Container >
        <Content style={{marginHorizontal:15,paddingVertical:10}}>
        
        <View style={styles.ViewStyle}>
          <Text style={{color:'darkred',fontSize:15.5, alignSelf: "center"}}> Are you a Shop Owner or Mechanic?</Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('SM_SignUp')}>
            <Text> Press Here</Text>
          </TouchableOpacity>
        </View>
        
        <Form>          
        <Item regular style={styles.InputStyle}>
          <MaterialIcons name="drive-file-rename-outline" style={styles.IconsStyle} size={23} color="darkred" />
          <Input style={{borderRightWidth:1,borderRightColor:'darkred'}} placeholder='First Name' />
          <MaterialIcons name="drive-file-rename-outline" style={styles.IconsStyle} size={23} color="darkred" />
          <Input placeholder='Last Name' />
        </Item>
        
        <Item regular style={styles.InputStyle}>
            <AntDesign name="user" size={24} style={styles.IconsStyle}color="darkred" />
            <Input placeholder='Username' />
         </Item>
        
         <Item regular style={styles.InputStyle}>
            <MaterialIcons name="email" style={styles.IconsStyle}  size={24} color="darkred"  />
            <Input placeholder='Email Address' />
         </Item>

        <Item regular style={styles.InputStyle}>
            <Ionicons name="ios-key-outline" style={styles.IconsStyle} size={23} color="darkred" />
            <Input secureTextEntry={true} placeholder='Password' />
        </Item>

        <Item regular style={styles.InputStyle}>
          <Ionicons name="ios-key-outline" style={styles.IconsStyle} size={23} color="darkred" />
          <Input secureTextEntry={true} placeholder='Confirm Password' />
        </Item>
        
        <Item regular style={styles.InputStyle}>
            <Feather name="map-pin" style={styles.IconsStyle} size={22} color="darkred" />
            <Input style={{borderRightWidth:1,borderRightColor:'darkred'}} placeholder='Address' />

            <MaterialIcons name="location-city" style={styles.IconsStyle} size={27} color="darkred" />
            <Input placeholder='City' />
        </Item>

        <Item regular style={styles.InputStyle}>
            <AntDesign name="phone" style={styles.IconsStyle} size={22} color="darkred" />
            <Input keyboardType="numeric" placeholder='Phone' />
        </Item>

        <Item regular style={ {marginBottom:10,
        borderWidth:3,
        borderColor:'darkred',
        borderRadius:6,
        height:50,
        alignSelf:'flex-start'}}>
         <MaterialIcons name="date-range" style={{marginLeft:5,marginRight:-5}} size={23} color="darkred"/>
         <DatePicker
            defaultDate={new Date(2018, 4, 4)}
            minimumDate={new Date(2018, 1, 1)}
            maximumDate={new Date(2018, 12, 31)}
            locale={"en"}
            timeZoneOffsetInMinutes={undefined}
            modalTransparent={false}
            animationType={"fade"}
            androidMode={"default"}
            placeHolderText="Select Birth Date :"
            textStyle={{ color: "green" }}
            placeHolderTextStyle={{ color: "darkred" }}
            onDateChange={this.setDate}
            disabled={false}
            />
            <Text>
            {this.state.chosenDate.toString().substr(4, 12)}
            </Text>
        </Item>
        
        <Item regular style={ {marginBottom:10,
        borderWidth:3,
        borderColor:'darkred',
        borderRadius:6,
        alignSelf:'flex-start'}}>
        <Foundation name="male-female" style={{marginLeft:6,marginRight:-5}} size={25} color="darkred"/>
        <Picker
              mode="dialog"
              
              iosIcon={<Icon name="arrow-down" style={{marginLeft:-10}} />}
              placeholder="Gender"
              placeholderStyle={{ color: "darkred" }}
              selectedValue={this.state.selected}
              onValueChange={this.onValueChange.bind(this)}
            >
              <Picker.Item label="Male" value="key0" />
              <Picker.Item label="Female" value="key1" />
        </Picker>
        </Item>

        <Button  style={{backgroundColor:'darkred', marginVertical:20, alignSelf:'center'}}
                 onPress={() => this.props.navigation.navigate('Home')}>
            <Text>Submit</Text>
        </Button>

        </Form>

    </Content>
    </Container>
    );

  }
}

const styles = StyleSheet.create({
    InputStyle:{
        marginBottom:10,
        borderColor:'darkred',
        borderRadius:6,
    },

    ViewStyle:{
      marginBottom:10,
      marginTop:20,
      flexDirection:'row',
      alignSelf: "center"
  },
  IconsStyle:{
    marginLeft:5,
    marginTop:2
  }
})