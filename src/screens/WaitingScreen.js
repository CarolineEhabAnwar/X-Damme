import React, { Component } from 'react';
import { Image,StyleSheet,View } from 'react-native';
import { Container,Content,Text} from 'native-base';


export default class WaitingScreen extends Component {
  render() {
    return (
      <Container>
        <Content>
          <View style={styles.header}>
            <Image source={require("../../assets/logo2.png")} style={{height:300,width:300}} />
              <Text style={styles.name}> Loading... </Text>
          </View>
        </Content>   
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  header:{
    padding:25,
    marginTop:90,
    alignItems: 'center',
  },
  name:{
    fontSize:30,
    color:"#ab0000",
    fontWeight:'800',
  },
});
 