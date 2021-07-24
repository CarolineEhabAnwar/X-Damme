import { FooterTab, Content, Container, Button, Icon } from 'native-base';
import React, { useContext, Component, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { FontAwesome5, Ionicons, AntDesign, MaterialIcons, Feather, Foundation, MaterialCommunityIcons } from '@expo/vector-icons';
import { AuthContext } from '../../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import FooterComponent from '../components/FooterComponent'
import { useTranslation } from 'react-i18next';


const SOProfileScreen = ({ navigation }) => {

  const { logout } = useContext(AuthContext);
  const [FinalShopRating, setFinalShopRating] = useState(0);
  const [loading, setloading] = useState(true);
  const { user } = useContext(AuthContext);
  const { t, i18n } = useTranslation();

  const [shop_Owner_Name, setShop_Owner_name] = useState("");
  const [Image_Path, setImage_Path] = useState("");

  async function LoadUP() {
    setloading(true);
    await firestore().collection('users').doc(user.uid).get().then(Data => {
      if (Data.exists) {
        setShop_Owner_name(Data.data().fname + " " + Data.data().lname);
        if (Data.data().profileIMG != null) {
          setImage_Path(Data.data().profileIMG);
        }
      }
    });
    await Get_Rating();
    setloading(false);
  }

  async function Get_Rating() {

    let shopvalue = 0;
    let final_shop_rating = 0;
    let shopCount = 0;


    try {
      await firestore().collection('Reviews').where('ShopOwnerID', '==', user.uid)
        .get()
        .then(querySnapshot => {

          shopCount = querySnapshot.docs.length
          querySnapshot.forEach(documentSnapshot => {
            shopvalue += documentSnapshot.data().ShopStarRating;
          });

        });

      if (shopCount == 0) {
        final_shop_rating = 0;
      }
      else {
        final_shop_rating = shopvalue / shopCount;
      }

      setFinalShopRating(final_shop_rating);

      if (loading)
        setloading(false);
    }
    catch (error) {
      alert(error);
    }

  }

  useEffect(() => {
    try {
      LoadUP();

    } catch (error) {
      alert(error);
    }
  }, []);


  return (

    <Container>

      {/* Text with drawer */}
      <View searchBar style={{ flexDirection: 'row', paddingTop: 25, marginBottom: 0, paddingBottom: 6, alignContent: "center", backgroundColor: "darkblue", top: 0 }}>
        <Button transparent onPress={() => navigation.navigate('SOHome')} >
          <Ionicons
            name='arrow-back-outline'
            style={{ fontSize: 30, marginTop: 4, marginRight: 12, marginLeft: 12, color: 'white' }}
          />
        </Button>
        <Text style={{ color: "white", height: 50, fontSize: 20, textAlign: 'center', paddingLeft: '27%', paddingTop: 12, fontWeight: 'bold' }}>{t("UserProfileScreenText1")} </Text>
      </View>
      {/* End Text with drawer */}

      {loading ? <Content><Text style={styles.loadingStyle}> {t('SOProfileScreenText1')} </Text></Content> :

        <Content>
          <View style={styles.container}>
            <View style={styles.header}>
              <View style={styles.headerContent}>
                {Image_Path == "" ?
                  <Image style={styles.avatar} source={require("../../../assets/mechanic.png")} />
                  :
                  <Image source={{ uri: Image_Path }} style={{ borderRadius: 100, height: 200, width: 200, flex: 1 }} />
                }
                <Text style={styles.name}>
                  {shop_Owner_Name}
                </Text>
                <Text style={styles.name}>
                {t('SOProfileScreenText2')} {Math.round(FinalShopRating * 10) / 10}
                </Text>
              </View>
            </View>

            <View style={styles.body}>
              <View style={styles.bodyContent}>

                <Button style={styles.menuBox} onPress={() => navigation.navigate('SORequests', { Editing: false })}>
                  <MaterialIcons name="history" size={40} color="white" />
                  <Text style={styles.info}>{t("SOProfileScreenText9")}</Text>
                </Button>

                <Button style={styles.menuBox} onPress={() => navigation.navigate('SOSettings')}>
                  <MaterialIcons name="settings" size={40} color="white" />
                  <Text style={styles.info}>{t("UserProfileScreenText7")}</Text>
                </Button>

                <Button style={styles.menuBox} onPress={() => logout()}>
                  <MaterialIcons name="logout" size={40} color="white" />
                  <Text style={styles.info}>{t("UserProfileScreenText8")}</Text>
                </Button>
              </View>
            </View>
          </View>
        </Content>
      }
      <FooterComponent home="SOHome" profile="SOProfile" contactus="SOContactUs" bkcolor="darkblue" />
    </Container>
  );
}

export default SOProfileScreen;

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
    borderColor: "darkblue",
    marginBottom: 10,
  },
  loadingStyle: {
    color: 'darkblue',
    alignSelf: 'center',
    fontSize: 22,
    textAlignVertical: 'center',
    fontWeight: 'bold',
    marginTop: 180
  },
  name: {
    fontSize: 25,
    color: "darkblue",
    fontWeight: '800',
  },
  textInfo: {
    fontSize: 18,
    marginTop: 20,
    color: "#696969",
  },
  bodyContent: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  menuBox: {
    backgroundColor: "darkblue",
    width: 100,
    height: 100,
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
  }
});
