import React, {useContext, useState} from 'react';
import {FlatList, SafeAreaView, StatusBar,View, Text, TouchableOpacity, Platform, StyleSheet} from 'react-native';
import FormInput from '../screens/components/FormInput';
import FormButton from '../screens/components/FormButton';
import {AuthContext} from '../navigation/AuthProvider';
import { ScrollView } from 'react-native-gesture-handler';


const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "User",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Shop Owner",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Mechanic",
  },
];

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.title}</Text>
  </TouchableOpacity>
);



const SignupScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [fname, setFname] = useState();
  const [lname, setLname] = useState();
  const [address, setAddress] = useState();
  const {register} = useContext(AuthContext);
  const [selectedId, setSelectedId] = useState(null);
  const [type, setType] = useState("");
  const [cart,setCart] = useState([]);
  const [requests,setRequests] = useState([]);

 

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#ab0000" : "white";
    const color = item.id === selectedId ? 'white' : '#ab0000';

    return (
      <Item
        item={item}
        onPress={() => {
          setSelectedId(item.id);
          setType(item.title);
        }}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };
  


  return (
    
    <ScrollView contentContainerStyle={styles.container}>

      <Text style={styles.text}>Create an account</Text>
    
      <FormInput
        labelValue={fname}
        onChangeText={(FirstName) => setFname(FirstName)}
        placeholderText="First Name"
        iconType="user"
        autoCorrect={false}
      />
      

      <FormInput
        labelValue={lname}
        onChangeText={(LastName) => setLname(LastName)}
        placeholderText="Last Name"
        iconType="user"
        autoCorrect={false}
      />
      
      <FormInput
        labelValue={address}
        onChangeText={(Address) => setAddress(Address)}
        placeholderText="Address"
        iconType="city"
        autoCorrect={false}
      />
    
      <FormInput
        labelValue={email}
        onChangeText={(userEmail) => setEmail(userEmail)}
        placeholderText="Email Address"
        iconType="mail"
        keyboardType="email-address"
        autoCorrect={false}
      />

      <FormInput
        labelValue={password}
        onChangeText={(userPassword) => setPassword(userPassword)}
        placeholderText="Password"
        iconType="lock"
        secureTextEntry={true}
      />

      <FormInput
        labelValue={confirmPassword}
        onChangeText={(userPassword) => setConfirmPassword(userPassword)}
        placeholderText="Confirm Password"
        iconType="lock"
        secureTextEntry={true}
      />

      <View style={{flexDirection:'row'}}>
        <SafeAreaView style={{flexDirection:'row'}}>
        <FlatList
          data={DATA}
          scrollEnabled={false}
          horizontal
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
        />
      </SafeAreaView>
      </View>

      <FormButton
        buttonTitle="Sign Up"
        onPress={() => {
          if(fname === "")
            alert("Please insert your first name.");
          else if(lname === "")
            alert("Please insert your last name.");
          else if(address === "")
            alert("Please insert your address.");
          else if(email === "")
            alert("Please insert an email.");
          else if(email === "")
            alert("Please insert a password.");
          else if(password !== confirmPassword)
            alert("Password mismatch with the confirm password.");
          else if(type === "")
            alert("Please select a type.");
          else{
            register(fname, lname, address, email, password, type,cart,requests);
          }
        }}
      />
      
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.navButtonText}>Have an account? Sign In</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafd',
    alignItems: 'center',
    padding: 22,
  },
  text: {
    fontSize: 28,
    marginBottom: 40,
    color: '#ab0000',
    fontWeight:'bold'
  },
  navButton: {
    marginTop: 10,
  },
  navButtonText: {
    fontSize: 18,
    marginTop:20,
    fontWeight: 'bold',
    color: '#ab0000',
    fontFamily: 'Lato-Regular',
  },
  menuBox:{
    backgroundColor: "#ab0000",
    justifyContent: 'center',
    width:80,
    height:80,
    margin:15,
    shadowColor: 'black',
    shadowOpacity: .2,
    shadowOffset: {
      height:2,
      width:-2
    },
    borderRadius:13,
    elevation:4,
    flexDirection:'column'
  },
  icon: {
    width:60,
    height:60,
  },
  info:{
    fontSize:13,
    fontWeight:'bold',
    marginTop:10,
    color: "white",
  },
  item: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 8,
    borderRadius:5,
    borderWidth:2,
    borderColor:'#ab0000'
  },
  title: {
    fontSize: 20,
  },
});