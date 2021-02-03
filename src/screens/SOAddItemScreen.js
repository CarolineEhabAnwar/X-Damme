import React, { Component } from 'react';
import {StyleSheet,View} from 'react-native';
import { Container, Header, Content, Item, Input, Icon,DatePicker,Text,Radio,Picker,Form, Button,Image } from 'native-base';
import { TouchableOpacity } from 'react-native';

export default class SOAddItemScreen extends Component {
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

        <Form>          
        <Item regular style={styles.InputStyle}>
            <Input placeholder='Item Name' />
        </Item>

        <Item regular style={styles.InputStyle}>
            <Input keyboardType="numeric" placeholder='Item Price' />
         </Item>
        
         <Item regular style={styles.InputStyle}>
            <Input placeholder='Made In' />
         </Item>
        
        <Item regular style={ {marginBottom:10,
        borderWidth:3,
        borderColor:'darkred',
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
            placeHolderText="Manufacture Date :"
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
        
        <Picker
              mode="dialog"
              
              iosIcon={<Icon name="arrow-down" style={{marginLeft:-5}}/>}
              placeholder="Item Quality"
              placeholderStyle={{ color: "darkred" }}
              selectedValue={this.state.selected}
              onValueChange={this.onValueChange.bind(this)}
            >
              <Picker.Item label="Low" value="key0" />
              <Picker.Item label="Medium" value="key1" />
              <Picker.Item label="High" value="key2" />
        </Picker>
        </Item>

        <Button  style={{backgroundColor:'darkred', marginVertical:20, alignSelf:'center'}}>
            <Text>Add Item</Text>
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
      flexDirection:'row',
  }
})