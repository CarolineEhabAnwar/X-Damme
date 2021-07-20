import React, { Component, useState, useEffect } from 'react';
import { Image, StyleSheet, View, FlatList, LogBox } from 'react-native';
import { Container, Button, Text, Content } from 'native-base';
import { FontAwesome5, AntDesign, Ionicons, FontAwesome } from '@expo/vector-icons';
import FooterComponent from '../components/FooterComponent'
import YoutubePlayer from 'react-native-youtube-iframe';
import { ScrollView } from 'react-native-gesture-handler';
import firestore from "@react-native-firebase/firestore";
import { useTranslation } from 'react-i18next';


const BeginnersStuffScreen = ({ navigation }) => {

    const { t, i18n } = useTranslation();
    const [playing, setPlaying] = useState(false);
    const [tutorials, setTutorials] = useState([])
    const [loading, setloading] = useState(false)

    const togglePlaying = () => {
        setPlaying((prev) => !prev);
    }

    async function Load_Up() {
        await firestore()
            .collection('Beginners Stuff')
            .onSnapshot(querySnapshot => {
                const temp_tutorials = [];
                querySnapshot.forEach(documentSnapshot => {
                    temp_tutorials.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id
                    });
                });
                setTutorials(temp_tutorials)
                setloading(false);
            });
    }

    useEffect(async () => {
        try {
            await Load_Up();
        } catch (error) {
            alert(t('UserBeginnerStuffScreenAlert1'))
        }
    }, []);

    return (
        <Container>
            {/* Text with navback */}
            <View searchBar style={{ flexDirection: 'row', paddingTop: 25, marginBottom: 12, paddingBottom: 6, alignContent: "center", backgroundColor: "darkred", top: 0 }}>
                <Button transparent onPress={() => navigation.navigate("Tutorials")} >
                    <Ionicons
                        name='arrow-back-outline'
                        style={{ fontSize: 30, marginTop: 4, marginRight: 12, marginLeft: 12, color: 'white' }}
                    />
                </Button>
                <Text style={{ color: "white", height: 50, fontSize: 20, textAlign: 'center', paddingLeft: '18%', paddingTop: 12, fontWeight: 'bold' }}>{t('UserBeginnerStuffScreenTitle')}</Text>
            </View>
            {/* End Text with navback */}


            <Content>
                {loading ? <Text style={styles.loadingStyle}>{t('UserBeginnerStuffScreenLoading')}</Text> :
                    <View>
                        {tutorials.map((item, index) => {
                            return (
                                <YoutubePlayer
                                    key={index}
                                    height={260}
                                    play={playing}
                                    videoId={item.Tutorial_ID}
                                />);
                        })}
                    </View>
                }
            </Content>


            <FooterComponent
                home="Home"
                contactus="ContactUs"
                profile="Profile"
                bkcolor="darkred"
            />

        </Container>
    );
}

export default BeginnersStuffScreen;

const styles = StyleSheet.create({
    buttonStyle: {
        width: "100%",
        height: "100%",
        flexDirection: 'column'
    },

    VideoTitleStyle: {
        fontWeight: 'bold',
        color: 'darkred',
        fontSize: 16
    }
})

