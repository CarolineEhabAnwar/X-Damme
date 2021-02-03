import React, { Component } from 'react';
import { Container, Badge, Icon, FooterTab, Header, Content, Button, Text } from 'native-base';
import { StyleSheet, View, Image, FlatList, TouchableOpacity } from 'react-native';

export default class SOHomeScreen extends Component {

    render() {
        let name = "Shop Owner x";
        let home_notification = 5;
        let profile_notification = 5;
        let settings_notification = 5;
        return (
            <Container style={{ }}>
                <View style={{ flexDirection: "column" , justifyContent: "space-evenly"}}>
                    <View style={{ flexDirection: "column", alignItems: "center", justifyContent: "space-around" }}>
                        <Image source={require("../../assets/logo.png")} style={styles.logoStyle} />
                        <Text style={styles.title}>Welcome</Text>
                        <Text style={styles.subtitle}>{name}</Text>
                        <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 20 }}>
                            <Button rounded info style={{ backgroundColor: 'darkblue', width: 150, justifyContent: "center", top: 40, marginHorizontal: 10 }}
                                onPress={() => this.props.navigation.navigate('SOAddItem')}
                            >
                                <Text> Add Item </Text>
                            </Button>
                            <Button rounded style={{ backgroundColor: 'darkblue', width: 150, justifyContent: "center", top: 40, marginHorizontal: 10 }}
                                onPress={() => this.props.navigation.navigate('SOItemList')}>
                                <Text> Items List </Text>
                            </Button>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-around", top: 20 }}>
                            <Button rounded info style={{ backgroundColor: 'darkblue', width: 150, justifyContent: "center", top: 40, marginHorizontal: 10 }}
                                onPress={() => this.props.navigation.navigate('SORequest')}>
                                <Text> Requests </Text>
                            </Button>
                            <Button rounded info style={{ backgroundColor: 'darkblue', width: 150, justifyContent: "center", top: 40, marginHorizontal: 10 }}>
                                <Text> Add offer </Text>
                            </Button>
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignContent: "center", backgroundColor: "darkblue", position: "absolute", bottom: 0}}>
                    <FooterTab transparent style={{ backgroundColor: "darkblue" }}>
                        <Button badge >
                            {home_notification == null ? null : <Badge><Text>{home_notification}</Text></Badge>}
                            <Icon name="home" />
                            <Text>Home</Text>
                        </Button>

                        <Button badge >
                            {profile_notification == null ? null : <Badge><Text>{profile_notification}</Text></Badge>}
                            <Icon name="person" />
                            <Text>Profile</Text>
                        </Button>

                        <Button badge>
                            {settings_notification == null ? null : <Badge><Text>{settings_notification}</Text></Badge>}
                            <Icon name="call" />
                            <Text>Contact Us</Text>
                        </Button>
                    </FooterTab>
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({

    title: {
        fontSize: 60,
        justifyContent: "center",
        alignSelf: "center"
    },
    subtitle: {
        fontSize: 36,
        justifyContent: "center",
        alignSelf: "center"
    },
    logoStyle: {
        marginTop: 40,
        marginVertical: 20,
        width: 160,
        height: 120
    }
});