import { FooterTab, Content, Container, Button, Icon } from 'native-base';
import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { FontAwesome5, Ionicons,  MaterialIcons } from '@expo/vector-icons';
import { AuthContext } from '../../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import FooterComponent from '../components/FooterComponent';


const ProfileScreen = ({ navigation }) => {

  const { logout } = useContext(AuthContext);
  const { user } = useContext(AuthContext);
  const [userName,setUserName] = useState('');


  firestore()
    .collection('users')
    .doc(user.uid)
    .get()
    .then(documentSnapshot => documentSnapshot.get('fname'))
    .then(username => {
      setUserName(username)
    });


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
        <Text style={{ color: "white", height: 50, fontSize: 20, textAlign: 'center', paddingLeft: '27%', paddingTop: 12, fontWeight: 'bold' }}>Profile</Text>
      </View>
      {/* End Text with drawer */}

      <Content>

        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <Image style={styles.avatar} source={require("../../../assets/user.png")} />
              <Text style={styles.name}>
                {userName}
              </Text>
            </View>
          </View>

          <View>
            <View style={styles.bodyContent}>
              <Button style={styles.menuBox} onPress={() => navigation.navigate('MyCars')}>
                <FontAwesome5 name="car-side" size={40} color="white" />
                <Text style={styles.info}>My Cars</Text>
              </Button>

              <Button style={styles.menuBox} onPress={() => navigation.navigate('MyRequests')}>
                <MaterialIcons name="history" size={45} color="white" />
                <Text style={styles.info}>Item Requests</Text>
              </Button>

              <Button style={styles.menuBox} onPress={() => navigation.navigate('MyServiceRequests')}>
                <MaterialIcons name="history" size={45} color="white" />
                <Text style={styles.info}>Service Requests</Text>
              </Button>

              <Button style={styles.menuBox} onPress={() => navigation.navigate('MyReviews')}>
                <MaterialIcons name="rate-review" size={45} color="white" />
                <Text style={styles.info}>Reviews</Text>
              </Button>

              <Button style={styles.menuBox} onPress={() => navigation.navigate('Settings')}>
                <MaterialIcons name="settings" size={45} color="white" />
                <Text style={styles.info}>Settings</Text>
              </Button>

              <Button style={styles.menuBox} onPress={() => logout()}>
                <MaterialIcons name="logout" size={45} color="white" />
                <Text style={styles.info}>Logout</Text>
              </Button>
            </View>
          </View>
        </View>
      </Content>
      
      <FooterComponent 
        home="Home"
        profile="Profile"
        contactus="ContactUs"
        bkcolor="darkred"
      />
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
    alignSelf:'center'
  }
});
