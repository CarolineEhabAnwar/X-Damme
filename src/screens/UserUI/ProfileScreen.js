import { FooterTab, Content, Container, Button, Icon } from 'native-base';
import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { AuthContext } from '../../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import FooterComponent from '../components/FooterComponent';
import { useTranslation } from 'react-i18next';


const ProfileScreen = ({ navigation }) => {

  const { logout } = useContext(AuthContext);
  const { user } = useContext(AuthContext);
  const [userName, setUserName] = useState('');
  const [Image_Path, setImage_Path] = useState("");
  const [loading, setloading] = useState(true);
  const { t, i18n } = useTranslation();

  async function LoadUP() {
    setloading(true);
    await firestore().collection('users').doc(user.uid).get().then(Data => {
      if (Data.exists) {
        setUserName(Data.data().fname + " " + Data.data().lname);
        if (Data.data().profileIMG != null) {
          setImage_Path(Data.data().profileIMG);
        }
      }
    });

    setloading(false);
  }

  useEffect(() => {
    try {
      LoadUP();
    } catch (error) {
      console.log(error);
    }
  }, [])

  return (

    <Container>
      {/* Text with drawer */}
      <View searchBar style={{ flexDirection: 'row', paddingTop: 25, marginBottom: 0, paddingBottom: 6, alignContent: "center", backgroundColor: "darkred", top: 0 }}>
        <Button transparent onPress={() => navigation.navigate('Home')} >
          <Ionicons
            name='arrow-back-outline'
            style={{ fontSize: 30, marginTop: 4, marginRight: 12, marginLeft: 12, color: 'white' }}
          />
        </Button>
        <Text style={{ color: "white", height: 50, fontSize: 20, textAlign: 'center', paddingLeft: '27%', paddingTop: 12, fontWeight: 'bold' }}>{t('UserProfileScreenText1')}</Text>
      </View>
      {/* End Text with drawer */}

      {loading ? <Content><Text style={styles.loadingStyle}>{t('UserProfileScreenText2')}</Text></Content> :
        <Content>

          <View style={styles.container}>
            <View style={styles.header}>
              <View style={styles.headerContent}>
                {Image_Path == "" ?
                  <Image style={styles.avatar} source={require("../../../assets/user.png")} />
                  :
                  <Image source={{ uri: Image_Path }} style={{ borderRadius: 100, height: 200, width: 200, flex: 1 }} />
                }
                <Text style={styles.name}>
                  {userName}
                </Text>
              </View>
            </View>

            <View>
              <View style={styles.bodyContent}>
                <Button style={styles.menuBox} onPress={() => navigation.navigate('MyCars')}>
                  <FontAwesome5 name="car-side" size={40} color="white" />
                  <Text style={styles.info}>{t('UserProfileScreenText3')}</Text>
                </Button>

                <Button style={styles.menuBox} onPress={() => navigation.navigate('MyRequests')}>
                  <MaterialIcons name="history" size={45} color="white" />
                  <Text style={styles.info}>{t('UserProfileScreenText4')}</Text>
                </Button>

                <Button style={styles.menuBox} onPress={() => navigation.navigate('MyServiceRequests')}>
                  <MaterialIcons name="history" size={45} color="white" />
                  <Text style={styles.info}>{t('UserProfileScreenText5')}</Text>
                </Button>

                <Button style={styles.menuBox} onPress={() => navigation.navigate('MyReviews')}>
                  <MaterialIcons name="rate-review" size={45} color="white" />
                  <Text style={styles.info}>{t('UserProfileScreenText6')}</Text>
                </Button>

                <Button style={styles.menuBox} onPress={() => navigation.navigate('Settings')}>
                  <MaterialIcons name="settings" size={45} color="white" />
                  <Text style={styles.info}>{t('UserProfileScreenText7')}</Text>
                </Button>

                <Button style={styles.menuBox} onPress={() => logout()}>
                  <MaterialIcons name="logout" size={45} color="white" />
                  <Text style={styles.info}>{t('UserProfileScreenText8')}</Text>
                </Button>
              </View>
            </View>
          </View>
        </Content>
      }

      <View style={{ flexDirection: 'row', alignContent: "center", backgroundColor: "darkred" }}>
        <FooterTab transparent style={{ backgroundColor: "darkred" }}>
          <Button style={{ marginTop: 5 }} onPress={() => navigation.navigate('Home')}>
            <Icon style={{ color: 'white' }} name="home" />
            <Text style={{ color: 'white' }}>{t('UserHomeScreenHome')}</Text>
          </Button>

          <Button style={{ marginTop: 5 }}>
            <Icon name="person" style={{ color: 'white' }} />
            <Text style={{ color: 'white' }}>{t('UserHomeScreenProfile')}</Text>
          </Button>

          <Button style={{ marginTop: 5 }} onPress={() => navigation.navigate('ContactUs')}>
            <Icon style={{ color: 'white' }} name="call" />
            <Text style={{ color: 'white' }} >{t('UserHomeScreenContactUs')}</Text>
          </Button>
        </FooterTab>
      </View>
    </Container>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "white",
  },
  headerContent: {
    padding: 25,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "black",
    marginBottom: 10,
  },
  loadingStyle: {
    color: 'darkred',
    alignSelf: 'center',
    fontSize: 22,
    textAlignVertical: 'center',
    fontWeight: 'bold',
    marginTop: 180
  },
  name: {
    fontSize: 30,
    color: "darkred",
    fontWeight: 'bold',
  },
  textInfo: {
    fontSize: 18,
    marginTop: 20,
    color: "#696969",
  },
  bodyContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'center',
    justifyContent: 'center'
  },
  menuBox: {
    backgroundColor: "darkred",
    width: 150,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 12,
    shadowColor: 'black',
    shadowOpacity: .2,
    shadowOffset: {
      height: 2,
      width: -2
    },

    borderRadius: 13,
    elevation: 4,
    flexDirection: 'column'
  },
  icon: {
    width: 60,
    height: 60,
  },
  info: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 10,
    color: "white",
    alignSelf: 'center',
    fontWeight: 'bold'
  }
});
