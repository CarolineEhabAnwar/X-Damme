import React, { Component } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Container, FooterTab, Badge, InputGroup, Header, Content, List, Item, Input, ListItem, Thumbnail, Text, Left, Body, Right, Button, Icon, View } from 'native-base';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { DrawerActions } from 'react-navigation-drawer';


const SOItemListComponent = ({title, ...props}) => {
    return (
            <List>
                <Body>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontWeight: '500', marginLeft: 2, marginRight: 50 }}>{title}</Text>
                    </View>
                </Body>
                <Right>
                    <View style={{ flexDirection: 'row', justifyContent: "flex-start" }}>
                        <Button transparent onPress={() => props.navigation.navigate('SOViewItem')}>
                            <Text style={{ color: 'blue' }}>View</Text>
                        </Button>

                        <Button transparent onPress={() => props.navigation.navigate('SOEditItem')}>
                            <Text style={{ color: 'green' }}>Edit</Text>
                        </Button>

                        <Button transparent>
                            <Text style={{ color: 'red', width: 80 }}>Delete</Text>
                        </Button>
                    </View>
                </Right>
            </List>
    )
}

export default SOItemListComponent;