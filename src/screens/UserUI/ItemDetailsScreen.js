import React, { useContext, useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../navigation/AuthProvider';
import { Image, LogBox, StyleSheet, View, TouchableOpacity, Animated } from 'react-native';
import { Container, FooterTab, Footer, Badge, InputGroup, Input, Header, Content, Card, Icon, CardItem, Thumbnail, Text, Button, Left, Body, Right } from 'native-base';
import { DrawerActions } from 'react-navigation-drawer';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { Rating } from 'react-native-ratings';
import { useTranslation } from 'react-i18next';



const ItemDetailsScreen = ({ navigation, route }) => {

  const { t, i18n } = useTranslation();

  const PercentageBar = ({ starText, percentage }) => {

    const [animation] = useState(new Animated.Value(0));
    useEffect(() => {
      Animated.timing(animation, {
        toValue: percentage,
        duration: 500,
      }).start();
    }, [percentage]);

    return (
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <Text style={styles.progressText}>{starText}</Text>
        <View style={styles.progressMiddle}>
          <View style={styles.progressWrap}>
            <Animated.View
              style={[
                styles.progressBar,
                {
                  width: animation.interpolate({
                    inputRange: [0, 100],
                    outputRange: ["0.0%", "100.0%"],
                  }),
                },
              ]}
            />
          </View>
        </View>
        <Text style={styles.progressPercentText}>{percentage}%</Text>
      </View>
    );
  };


  LogBox.ignoreLogs(['Animated: `useNativeDriver` was not specified.']);

  const [TotalItemReviewsCount, setTotalItemReviewsCount] = useState(0);
  const [TotalShopReviewsCount, setTotalShopReviewsCount] = useState(0);
  const [FinalItemRating, setFinalItemRating] = useState(0);
  const [FinalShopRating, setFinalShopRating] = useState(0);
  const [starsPerc, setStarsPerc] = useState([]);
  const [loading, setloading] = useState(true);


  useEffect(async () => {
    await Get_Item_Rating();
  }, []);

  async function Get_Item_Rating() {
    setloading(true);

    let itemvalue = 0;
    let shopvalue = 0;
    let final_item_rating = 0;
    let final_shop_rating = 0;

    let itemCount = 0;
    let shopCount = 0;

    let temp_Stars = [0, 0, 0, 0, 0, 0];
    let temp_Stars_Perc = [0, 0, 0, 0, 0, 0];

    try {
      await firestore().collection('Reviews').where('ItemID', '==', route.params.Item.key)
        .get()
        .then(querySnapshot => {
          itemCount = querySnapshot.docs.length;
          setTotalItemReviewsCount(itemCount);
          querySnapshot.forEach(documentSnapshot => {
            itemvalue += documentSnapshot.data().ItemStarRating;
            switch (Math.round(documentSnapshot.data().ItemStarRating)) {
              case 1:
                temp_Stars[0]++
                break;
              case 2:
                temp_Stars[1]++
                break;
              case 3:
                temp_Stars[2]++
                break;
              case 4:
                temp_Stars[3]++
                break;
              case 5:
                temp_Stars[4]++
                break;
              case 0:
                temp_Stars[5]++
                break;

            }

          });


          for (let i = 0; i < temp_Stars.length; i++) {
            if (itemCount == 0) {
              temp_Stars_Perc[i] = 0;
            }
            else {
              temp_Stars_Perc[i] = (temp_Stars[i] / itemCount) * 100;
            }
          }

          setStarsPerc(temp_Stars_Perc);


        });

      await firestore().collection('Reviews').where('ShopOwnerID', '==', route.params.Item.Shop_Owner_ID)
        .get()
        .then(querySnapshot => {

          shopCount = querySnapshot.docs.length
          setTotalShopReviewsCount(shopCount);
          querySnapshot.forEach(documentSnapshot => {
            shopvalue += documentSnapshot.data().ShopStarRating;
          });

        });

      if (itemCount == 0) {
        final_item_rating = 0;
      }
      else {
        final_item_rating = itemvalue / itemCount;
      }
      if (shopCount == 0) {
        final_shop_rating = 0;
      }
      else {
        final_shop_rating = shopvalue / shopCount;
      }

      setFinalItemRating(final_item_rating);
      setFinalShopRating(final_shop_rating);
      if (loading)
        setloading(false);
    }
    catch (error) {
      alert(error);
    }

  }

  const { user } = useContext(AuthContext);

  return (
    <Container>

      {/* Text with drawer */}
      <View searchBar style={{ flexDirection: 'row', paddingTop: 25, marginBottom: 12, paddingBottom: 6, alignContent: "center", backgroundColor: "darkred", top: 0 }}>
        <Button transparent onPress={() => navigation.goBack()} >
          <Ionicons
            name='arrow-back-outline'
            style={{ fontSize: 30, marginTop: 4, marginRight: 12, marginLeft: 12, color: 'white' }}
          />
        </Button>
        <Text style={{ color: "white", height: 50, fontSize: 20, textAlign: 'center', paddingLeft: '21%', paddingTop: 12, fontWeight: 'bold' }}>{t('UserItemDetailsScreenTitle')}</Text>
      </View>
      {/* End Text with drawer */}
      <Content>
        {loading ? <Text style={styles.loadingStyle}>{t('UserItemDetailsScreenLoading')}</Text> :
          <Card style={{ marginTop: 0, flex: 0 }}>
            <Image source={{ uri: route.params.Item.Image_Path }} style={{ marginBottom: 20, height: 200, width: null }} />
            <CardItem style={{ marginHorizontal: 1, borderWidth: 3, borderColor: 'darkred' }}>
              <Body>
                <Text style={styles.textStyles}>{t('UserItemDetailsScreenText1')}</Text>
                <Text style={styles.itemsTextStyle}>{route.params.Item.Name}</Text>

                {route.params.Item.InOffer == "true" ?
                  <View>
                    <Text style={styles.textStyles}>{t('UserItemDetailsScreenText2')}</Text>
                    <Text style={{ fontSize: 19, marginBottom: 10, fontWeight: 'bold', textDecorationLine: 'line-through' }}>{route.params.Item.Price}</Text>
                    <Text style={styles.itemsTextStyle}>{route.params.Item.After_Price}</Text>
                  </View>
                  :
                  <View>
                    <Text style={styles.textStyles}>{t('UserItemDetailsScreenText2')}</Text>
                    <Text style={styles.itemsTextStyle}>{route.params.Item.Price}</Text>
                  </View>
                }

                <Text style={styles.textStyles}>{t('UserItemDetailsScreenText3')} </Text>
                <Text style={styles.itemsTextStyle}>{route.params.Item.Car_Brand}</Text>

                <Text style={styles.textStyles}>{t('UserItemDetailsScreenText4')}</Text>
                <Text style={styles.itemsTextStyle}>{route.params.Item.Car_Model}</Text>

                <Text style={styles.textStyles}>{t('UserItemDetailsScreenText5')}</Text>
                <Text style={styles.itemsTextStyle}>{route.params.Item.Quality}</Text>

                <Text style={styles.textStyles}>{t('UserItemDetailsScreenText6')}</Text>
                <Text style={styles.itemsTextStyle}>{route.params.Item.Made_In}</Text>

                <Text style={styles.textStyles}>{t('UserItemDetailsScreenText7')}</Text>
                <Text style={styles.itemsTextStyle}>{route.params.Item.Manufacture_Date}</Text>

                <Text style={styles.textStyles}>{t('UserItemDetailsScreenText8')}</Text>
                <Text style={styles.itemsTextStyle}>{route.params.Item.Shop_Owner_Name}</Text>

                <Text style={styles.textStyles}>{t('UserItemDetailsScreenText9')}</Text>
                <View style={styles.reviewContainer}>
                  <Text style={{ color: "darkred", fontWeight: 'bold', left: 70 }}>{t('UserItemDetailsScreenText10')}</Text>
                  <View style={styles.totalWrap}>
                    <View
                      style={{
                        flexDirection: "row",
                      }}
                    >
                      <Rating
                        showRating fractions={1}
                        startingValue={FinalItemRating}
                        readonly={true}
                        style={{ paddingVertical: 10 }}
                      />
                    </View>
                  </View>
                  <Text style={styles.amountText}>{TotalItemReviewsCount} {t('UserItemDetailsScreenText11')}</Text>

                  <View style={{ marginTop: 15, left: 13 }}>
                    <View style={styles.spacer}>
                      <PercentageBar starText="5 star" percentage={Math.round(starsPerc[4])} />
                    </View>
                    <View style={styles.spacer}>
                      <PercentageBar starText="4 star" percentage={Math.round(starsPerc[3])} />
                    </View>
                    <View style={styles.spacer}>
                      <PercentageBar starText="3 star" percentage={Math.round(starsPerc[2])} />
                    </View>
                    <View style={styles.spacer}>
                      <PercentageBar starText="2 star" percentage={Math.round(starsPerc[1])} />
                    </View>
                    <View style={styles.spacer}>
                      <PercentageBar starText="1 star" percentage={Math.round(starsPerc[0])} />
                    </View>
                    <View style={styles.spacer}>
                      <PercentageBar starText="0 star" percentage={Math.round(starsPerc[5])} />
                    </View>
                  </View>
                  <TouchableOpacity onPress={() => {
                    navigation.navigate("CustomersReviews", {
                      itemID: route.params.key
                    })
                  }}>
                    <Text style={styles.howWeCalculate}>{t('UserItemDetailsScreenText12')}</Text>
                  </TouchableOpacity>
                  <Text style={{ color: "darkred", fontWeight: 'bold', left: 50 }}>{t('UserItemDetailsScreenText13')}</Text>
                  <View style={styles.totalWrap}>
                    <View
                      style={{
                        flexDirection: "row",
                      }}
                    >
                      <Rating
                        showRating fractions={1}
                        startingValue={FinalShopRating}
                        readonly={true}
                        style={{ paddingVertical: 10 }}
                      />
                    </View>
                  </View>
                  <Text style={styles.amountText}>{TotalShopReviewsCount} {t('UserItemDetailsScreenText14')} </Text>

                </View>

                <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                  <Button style={styles.buttonStyle} onPress={() => {
                    navigation.navigate("Review", {
                      ItemID: route.params.key,
                      shopownerID: route.params.Item.Shop_Owner_ID,

                    })
                  }}>
                    <Icon style={{ marginRight: -6 }} name="pencil-outline"></Icon>
                    <Text style={styles.buttonTextStyle}>{t('UserItemDetailsScreenText15')}</Text>
                  </Button>
                  <Button style={styles.buttonStyle} onPress={async () => {
                    try {
                      await firestore().collection('users').doc(user.uid).get().then((User_Data) => {
                        let temp_cart = [];
                        temp_cart = User_Data.data().cart;
                        temp_cart.push(route.params.key);
                        firestore().collection('users').doc(user.uid).update({
                          cart: temp_cart
                        }).then(() => {
                          alert(t("ItemComponentText2"));
                        });
                      });
                    }
                    catch (error) {
                      alert(error);
                    }
                  }}>
                    <Icon style={{ marginRight: -6 }} name="cart"></Icon>
                    <Text style={styles.buttonTextStyle}>{t('UserItemDetailsScreenText16')}</Text>
                  </Button>
                </View>
              </Body>
            </CardItem>
          </Card>
        }
      </Content>
      {/* Footer */}
      <View style={{ flexDirection: 'row', alignContent: "center", backgroundColor: "darkred" }}>
        <FooterTab transparent style={{ backgroundColor: "darkred" }}>
          <Button style={{ marginTop: 5 }} onPress={() => navigation.navigate('Home')}>
            <Icon style={{ color: 'white' }} name="home" />
            <Text style={{ color: 'white' }}>{t('UserHomeScreenHome')}</Text>
          </Button>

          <Button style={{ marginTop: 5 }} onPress={() => navigation.navigate('Profile')}>
            <Icon name="person" style={{ color: 'white' }} />
            <Text style={{ color: 'white' }}>{t('UserHomeScreenProfile')}</Text>
          </Button>

          <Button style={{ marginTop: 5 }} onPress={() => navigation.navigate('ContactUs')}>
            <Icon style={{ color: 'white' }} name="call" />
            <Text style={{ color: 'white' }} >{t('UserHomeScreenContactUs')}</Text>
          </Button>
        </FooterTab>
      </View>
      {/* End Footer */}
    </Container>
  );
}


const styles = StyleSheet.create({
  textStyles: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textShadowColor: 'red',
    textShadowRadius: 1.5,
    textShadowOffset: {
      width: 0.5,
      height: 0.5
    },
  },

  itemsTextStyle: {
    fontSize: 19,
    marginBottom: 10,
    fontWeight: 'bold',
  },

  buttonStyle: {
    marginTop: 7,
    backgroundColor: 'darkred',
    marginRight: 10
  },

  buttonTextStyle: {
    fontWeight: 'bold'
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  reviewContainer: {
    alignContent:'center',
    justifyContent:'center',
    borderRadius: 10,
    paddingHorizontal: 50,
    left: 20,
    paddingVertical: 0,
    minWidth: "20%",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1.0,
    shadowRadius: 2,
    shadowColor: "rgba(193, 211, 251, 0.5)",
    elevation: 0,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    color: "darkred",
    textAlign: "center",
    fontWeight: 'bold',
  },
  loadingStyle: {
    color: 'darkred',
    alignSelf: 'center',
    fontSize: 22,
    textAlignVertical: 'center',
    fontWeight: 'bold',
    marginTop: 220
  },
  totalWrap: {
    marginTop: 2,
    marginBottom: 5,
    backgroundColor: "#FFFFFF",
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  amountText: {
    fontSize: 16,
    color: "darkred",
    textAlign: "center",
    fontWeight: 'bold',
    marginBottom: 10

  },
  howWeCalculate: {
    fontSize: 18,
    color: "darkcyan",
    textAlign: "center",
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 5,
    fontStyle: 'italic'

  },
  spacer: {
    marginBottom: 14,
  },
  progressText: {
    width: 50,
    fontSize: 14,
    fontWeight: 'bold',
    color: "darkred",
  },
  progressPercentText: {
    width: 40, fontSize: 14, color: "darkred", fontWeight: 'bold',
  },
  progressMiddle: {
    height: 15,
    flex: 1,
    marginHorizontal: 10,
  },
  progressWrap: {
    backgroundColor: "#F5F8FF",
    borderRadius: 18,
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    padding: 2,
  },
  progressBar: {
    flex: 1,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "#ffcc48",
    shadowOpacity: 1.0,
    shadowRadius: 4,
    backgroundColor: "#FFCC48",
    borderRadius: 18,
    minWidth: 5,
  },
})


export default ItemDetailsScreen;
