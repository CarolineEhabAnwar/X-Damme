import React, { useContext, Component, useEffect, useState } from 'react';
import { StyleSheet, View, LogBox, ToastAndroid, Slider, FlatList } from 'react-native';
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

const SOAddOfferScreen = ({ navigation }) => {

  LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

  const { user } = useContext(AuthContext);
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
        'Uploaded Successfully.',
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
    console.log("Offer Title: " + Offer_Title);
    console.log("Offer Percentage: " + SliderValue);
    console.log("Offered Items: " + ChoosenItems);
    console.log("Offer Image Path: " + image_path);
    console.log("Offer Duration: " + Duration);
    try {

      let Items_String = [];
      for (let i = 0; i < ChoosenItems.length; i++) {
        ChoosenItems[i].Item_Price_After = ChoosenItems[i].Item_Price_Before * (100 - SliderValue) / 100;
        Items_String.push(ChoosenItems[i].Item_ID + "/" + ChoosenItems[i].Item_Name + "/" + ChoosenItems[i].Item_Price_Before + "/" + ChoosenItems[i].Item_Price_After)

        await firestore().collection("CarStuff").doc(ChoosenItems[i].Item_ID).update({
          InOffer: "true",
          After_Price: ChoosenItems[i].Item_Price_After,
          Offer_Start_Date: firestore.Timestamp.fromDate(new Date()),
          Offer_Duration: Duration
        });

      }
      console.log(Items_String);


      await firestore().collection("Ads").add({
        Title: Offer_Title,
        Percentage: SliderValue,
        Items: Items_String,
        Image_Path: image_path,
        Duration: Duration,
        Date_Of_Offer: firestore.Timestamp.fromDate(new Date())
      });

      ToastAndroid.show(
        'Offer Added Successfully...',
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
  };

  useEffect(() => {
    try {
      Get_Items();
    } catch (error) {
      console.log(error);
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
        <Text style={{ color: "white", height: 50, fontSize: 20, textAlign: 'center', paddingLeft: '24%', paddingTop: 12, fontWeight: 'bold' }}> Add Offer</Text>
      </View>
      {/* End Search bar with drawer */}
      <Content style={{ marginHorizontal: 15, paddingVertical: 10 }}>

        <View style={{ flexDirection: 'row' }}>
          <AntDesign name="edit" style={{ marginRight: 10, marginTop: 1.5 }} size={22} color="darkblue" />
          <Text style={styles.textStyle}>Please enter offer details</Text>
        </View>
        <Form>
          <Item regular style={styles.InputStyle}>
            <Input placeholder='Offer Title' value={Offer_Title} onChangeText={SetOffer_Title} />
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

          <Item regular style={{
            marginBottom: 10,
            borderWidth: 3,
            borderColor: 'darkblue',
            borderRadius: 6,
            alignSelf: 'flex-start',
            height: 139,

          }}>
            <FlatList
              data={items}
              keyExtractor={(item) => item.key}
              renderItem={(item) => {
                return (
                  <SOItemOfferComponent
                    Item_Details={item}
                    Add_Me={Add_Choosen_Item}
                    Remove_Me={Remove_Choosen_Item}
                  />
                );
              }}
            />
          </Item>

          <Item regular style={styles.InputStyle}>
            <Button transparent
              style={{ height: 45, fontSize: 50, color: 'darkblue', margin: 2 }}
              onPress={async () => {
                choosePhotoFromLibrary();
              }}>
              <Text> Choose Photo</Text>
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
                  alert("There has been some error in uploading the image");
                }
              }}>
              <Text> Upload Photo</Text>
            </Button>

          </Item>

          <Item regular style={styles.PriceStyle}>
            <Input
              keyboardType="numeric"
              placeholder='Offer Duration'
              onChangeText={(duration) => setDuration(duration)}
            />
            <Text style={{ marginRight: 15, color: 'darkblue' }}>Days</Text>
          </Item>

          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Button style={{ backgroundColor: 'darkblue', marginVertical: 20, marginRight: 40, alignSelf: 'center' }}
              onPress={() => {
                if (uploading) {
                  alert("Please Wait untill the uploads finshs.");
                }
                else if (Offer_Title == '') {
                  alert("Please insert Offer Title.");
                }
                else if (ChoosenItems.length == 0) {
                  alert("Please choose the items to be in the offer.");
                }
                else if (!uploadedOnce) {
                  alert("Please choose and upload an Image.");
                }
                else if (Duration == null) {
                  alert("Please insert the offer duration.");
                }
                else {
                  //addItems(name, price, made_in, manufacture_date, models[Model], brands[Brand], qualities[Quality], image_path, types[Type], user);
                  Upload_Offer();
                }
              }}
            >
              <Text>Confirm</Text>
            </Button>

            <Button bordered style={{ borderColor: 'darkblue', marginVertical: 20, alignSelf: 'center' }}
              onPress={() => navigation.navigate('SOHome')}
            >
              <Text style={{ color: 'darkblue' }}>Cancel</Text>
            </Button>
          </View>
        </Form>
      </Content>

      <FooterComponent home="SOHome" profile="SOProfile" contactus="SOContactUs" />

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