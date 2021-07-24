import React, { useContext, Component, useEffect, useState } from 'react';
import { StyleSheet, View, LogBox, ToastAndroid, Slider, ScrollView } from 'react-native';
import { Container, Header, FooterTab, Badge, Content, Item, Input, Icon, Text, Radio, Picker, Form, Button, Image } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { AntDesign, Ionicons, Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import FooterComponent from '../components/FooterComponent'
import ImagePicker from "react-native-image-crop-picker"
import storage from '@react-native-firebase/storage';
import firestore from "@react-native-firebase/firestore";
import { AuthContext } from '../../navigation/AuthProvider';
import SOItemOfferComponent from '../components/SOItemOfferComponent';
import { useTranslation } from 'react-i18next';

const SOAddOfferScreen = ({ navigation }) => {

  LogBox.ignoreLogs(['Slider has been extracted from react-native core and will be removed in a future release']);
  const { user } = useContext(AuthContext);
  const { t, i18n } = useTranslation();
  const [IsPremium, setIsPremium] = useState(false);
  const [SliderValue, SetSliderValue] = useState(1);
  const [Offer_Title, SetOffer_Title] = useState("");
  const [items, setItems] = useState([]);
  const [ChoosenItems, setChoosenItems] = useState([]);
  const [Duration, setDuration] = useState(null);
  const [image_path, setImage_path] = useState('');
  const [image, setImage] = useState(null);
  const [is_image_choosen, setis_image_choosen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [is_image_uploaded, setis_image_uploaded] = useState(false);
  const [uploadedOnce, setuploadedOnce] = useState(false);
  const [loading, setLoading] = useState(true);
  const [MyName, setMyName] = useState("");

  const choosePhotoFromLibrary = async () => {
    try {
      ImagePicker.openPicker({
        width: 1200,
        height: 780,
        cropping: true,
      }).then((image) => {
        setis_image_uploaded(false);
        const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
        setImage(imageUri);
        setis_image_choosen(true);
      });
    } catch (error) {
      setis_image_choosen(false);
    }
  };

  const Upload_The_Image = async () => {
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    const storageRef = storage().ref(`adv/${filename}`)

    try {
      setUploading(true);
      setis_image_choosen(false);
      await storage().ref(`adv/${filename}`).putFile(uploadUri);

      const url = await storageRef.getDownloadURL();
      ToastAndroid.show(
        t('SOAddOfferScreenText1'),
        ToastAndroid.SHORT
      );
      setUploading(false);
      setuploadedOnce(true);
      return url;
    } catch (error) {
      alert(error);
      return null;
    }
  };

  const Add_Choosen_Item = (item) => {
    let temp_choosen = ChoosenItems;
    let temp_item = {
      Item_ID: item.key,
      Item_Name: item.Name,
      Item_Price_After: 0,
      Item_Price_Before: item.Price,
    }
    temp_choosen.push(temp_item);
    setChoosenItems(temp_choosen);
  }

  const Remove_Choosen_Item = (item) => {
    let temp_choosen = ChoosenItems;
    let index = -1;
    for (let i = 0; i < temp_choosen.length; i++) {
      if (temp_choosen[i].Item_ID == item.key) {
        index = i
      }
    }
    if (index != -1) {
      temp_choosen.splice(index);
    }
    setChoosenItems(temp_choosen);
  }

  async function Upload_Offer() {
    try {

      let Items_ID = [];
      for (let i = 0; i < ChoosenItems.length; i++) {
        ChoosenItems[i].Item_Price_After = ChoosenItems[i].Item_Price_Before * (100 - SliderValue) / 100;
        Items_ID.push(ChoosenItems[i].Item_ID);

        await firestore().collection("CarStuff").doc(ChoosenItems[i].Item_ID).update({
          InOffer: "true",
          After_Price: ChoosenItems[i].Item_Price_After,
          Offer_Start_Date: firestore.Timestamp.fromDate(new Date()),
          Offer_Duration: Duration
        });
      }


      await firestore().collection("Ads").add({
        Title: Offer_Title,
        Percentage: SliderValue,
        Items: Items_ID,
        Image_Path: image_path,
        Duration: Duration,
        Date_Of_Offer: firestore.Timestamp.fromDate(new Date()),
        ShopOwnerName: MyName,
        Service: "false"
      });

      ToastAndroid.show(
        t('SOAddOfferScreenText2'),
        ToastAndroid.SHORT
      );

      navigation.navigate('SOHome')
    } catch (error) {
      console.log(error);
    }
  }

  async function Get_Items() {
    await firestore().collection('CarStuff').where('Shop_Owner_ID', '==', (user.uid))
      .onSnapshot(querySnapshot => {
        const temp_SOItems = [];
        querySnapshot.forEach(documentSnapshot => {
          temp_SOItems.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          })
        });
        setItems(temp_SOItems)
      })
    setLoading(false);
  };

  async function Check_IsPremium() {
    await firestore().collection("users").doc(user.uid).get().then((Data) => {
      if (Data.exists) {
        setMyName(Data.data().fname + " " + Data.data().lname);
        if (Data.data().IsPremium == null || Data.data().IsPremium == false) {
          setIsPremium(false);
          return false;
        }
        else {
          setIsPremium(true);
          return true;
        }
      }
    })
  }

  useEffect(async () => {
    try {
      await Check_IsPremium()
      await Get_Items();
    } catch (error) {
      alert(t('SOAddOfferScreenText3'))
    }
  }, []);

  return (
    <Container>
      {/* Search bar with drawer */}
      <View searchBar style={{ flexDirection: 'row', paddingTop: 26, marginBottom: 12, paddingBottom: 6, alignContent: "center", backgroundColor: "darkblue", top: 0 }}>
        <Button transparent onPress={() => navigation.navigate('SOHome')} >
          <Ionicons
            name='arrow-back-outline'
            style={{ fontSize: 30, marginTop: 4, marginRight: 12, marginLeft: 12, color: 'white' }}
          />
        </Button>
        <Text style={{ color: "white", height: 50, fontSize: 20, textAlign: 'center', paddingLeft: '24%', paddingTop: 12, fontWeight: 'bold' }}> {t('SOAddOfferScreenText4')}</Text>
      </View>
      {/* End Search bar with drawer */}
      {loading ?

        <Content><Text style={{ color: "darkblue", alignSelf: 'center', fontSize: 22, textAlignVertical: 'center', fontWeight: 'bold', marginTop: 180 }}>
          {t('SOAddOfferScreenText20')}
        </Text></Content>
        :

        <Content scrollEnabled={false} style={{ marginHorizontal: 15, paddingVertical: 10 }}>
          {IsPremium ?
            <View>
              <View style={{ flexDirection: 'row' }}>
                <AntDesign name="edit" style={{ marginRight: 10, marginTop: 1.5 }} size={22} color="darkblue" />
                <Text style={styles.textStyle}>{t('SOAddOfferScreenText5')}</Text>
              </View>
              <Form>
                <Item regular style={styles.InputStyle}>
                  <Input placeholder={t('SOAddOfferScreenText17')} value={Offer_Title} onChangeText={SetOffer_Title} />
                </Item>

                <Item regular style={{ marginBottom: 10, borderColor: 'darkblue', borderRadius: 6, justifyContent: 'space-evenly' }}>
                  <Slider style={{ flex: 10 }}
                    value={1}
                    maximumValue={100}
                    minimumValue={1}
                    step={0.5}
                    onValueChange={SetSliderValue}
                  />
                  <Text style={{ fontSize: 20, flex: 2 }}>{SliderValue}%</Text>
                </Item>

                <ScrollView regular style={{ marginBottom: 15, flexDirection: "column", height: 140, borderWidth: 1, borderColor: "darkblue", borderRadius: 15 }}>
                  {items.map((item, index) => {
                    return (
                      <SOItemOfferComponent
                        key={index}
                        Item_Details={item}
                        Add_Me={Add_Choosen_Item}
                        Remove_Me={Remove_Choosen_Item}
                      />
                    )
                  })}
                </ScrollView>

                <Item regular style={styles.InputStyle}>
                  <Button transparent
                    style={{ height: 45, fontSize: 50, color: 'darkblue', margin: 2 }}
                    onPress={async () => {
                      choosePhotoFromLibrary();
                    }}>
                    <Text>{t('SOAddOfferScreenText6')}</Text>
                  </Button>
                  {is_image_choosen ? <Ionicons name="checkmark-outline" size={24} color="black" /> : null}
                  {uploading ? <Feather name="loader" size={24} color="black" /> : null}
                  {is_image_uploaded ? <Ionicons name="checkmark-done-outline" size={24} color="black" /> : null}
                  <Button
                    style={{ height: 45, position: 'relative', backgroundColor: 'darkblue', margin: 2 }}
                    onPress={async () => {
                      try {
                        const imageUrl = await Upload_The_Image();
                        setImage_path(imageUrl);
                        setis_image_choosen(false);
                        setis_image_uploaded(true);
                      } catch (error) {
                        alert(t('SOAddOfferScreenText7'));
                      }
                    }}>
                    <Text> {t('SOAddOfferScreenText8')}</Text>
                  </Button>

                </Item>

                <Item regular style={styles.PriceStyle}>
                  <Input
                    keyboardType="numeric"
                    placeholder={t('SOAddOfferScreenText18')} 
                    onChangeText={(duration) => setDuration(duration)}
                  />
                  <Text style={{ marginRight: 15, color: 'darkblue' }}>{t('SOAddOfferScreenText19')}</Text>
                </Item>

                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                  <Button style={{ backgroundColor: 'darkblue', marginVertical: 20, marginRight: 40, alignSelf: 'center' }}
                    onPress={() => {
                      if (uploading) {
                        alert(t('SOAddOfferScreenText9'));
                      }
                      else if (Offer_Title == '') {
                        alert(t('SOAddOfferScreenText10'));
                      }
                      else if (ChoosenItems.length == 0) {
                        alert(t('SOAddOfferScreenText11'));
                      }
                      else if (!uploadedOnce) {
                        alert(t('SOAddOfferScreenText12'));
                      }
                      else if (Duration == null) {
                        alert(t('SOAddOfferScreenText13'));
                      }
                      else {
                        Upload_Offer();
                      }
                    }}
                  >
                    <Text>{t('SOAddOfferScreenText14')}</Text>
                  </Button>

                  <Button bordered style={{ borderColor: 'darkblue', marginVertical: 20, alignSelf: 'center' }}
                    onPress={() => navigation.navigate('SOHome')}
                  >
                    <Text style={{ color: 'darkblue' }}>{t('SOAddOfferScreenText15')}</Text>
                  </Button>
                </View>
              </Form>
            </View>
            :
            <Text style={{ color: "darkblue", alignSelf: 'center', fontSize: 22, textAlignVertical: 'center', fontWeight: 'bold', marginTop: 180 }}>
              {t('SOAddOfferScreenText16')}
            </Text>
          }
        </Content>
      }

      <FooterComponent
        home="SOHome"
        profile="SOProfile"
        contactus="SOContactUs"
        bkcolor="darkblue"
      />
    </Container>
  );
}

export default SOAddOfferScreen;

const styles = StyleSheet.create({
  InputStyle: {
    marginBottom: 10,
    borderColor: 'darkblue',
    borderRadius: 6,
    justifyContent: 'space-between'
  },

  ViewStyle: {
    marginBottom: 10,
    flexDirection: 'row',
  },
  textStyle: {
    marginBottom: 12,
    color: 'darkblue',
    fontSize: 19,
    fontWeight: '600',
    alignSelf: 'center'
  },
  PriceStyle: {
    marginBottom: 10,
    borderColor: 'darkgreen',
    borderRadius: 6,
    justifyContent: 'space-between',
    width: 200
  }
})