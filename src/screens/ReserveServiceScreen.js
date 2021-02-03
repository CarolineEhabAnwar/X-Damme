import React, { Component } from 'react';
import { Image,StyleSheet } from 'react-native';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button, Icon } from 'native-base';
import { Entypo } from '@expo/vector-icons';

export default class ReserveServiceScreen extends Component {
  render() {
    return (
      <Container>
        <Content>
          <List>
            {/* Item 1 */}
            <ListItem>
              <Body>
                <Text style={styles.textStyles}>Change Tires </Text>
              </Body>
              <Right>
                <Button transparent>
                    <Entypo style={styles.IconStyle} name="arrow-bold-right" size={28} color="black" />
                </Button>
              </Right>
            </ListItem>

            {/* Item 2 */}
            <ListItem>
              <Body>
                <Text style={styles.textStyles}>Fix Motor</Text>
              </Body>
              <Right>
                <Button transparent>
                    <Entypo style={styles.IconStyle} name="arrow-bold-right" size={28} color="black" />
                </Button>
              </Right>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
    IconStyle:{
      color:'darkred',
      marginLeft:-30
    },
    textStyles:{
        fontWeight:'500'
    }
})
  