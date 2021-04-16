import React, {useContext, useState} from 'react';
import {View, Text, TouchableOpacity, Platform, StyleSheet} from 'react-native';
import FormInput from '../screens/components/FormInput';
import FormButton from '../screens/components/FormButton';
import SocialButton from '../screens/components/SocialButton';
import {AuthContext} from '../navigation/AuthProvider';

const SignupScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [fname, setFname] = useState();
  const [lname, setLname] = useState();
  const [address, setAddress] = useState();
  const {register} = useContext(AuthContext);

  return (
    <View style={styles.container}>
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
        iconType="user"
        autoCorrect={false}
      />
    
      <FormInput
        labelValue={email}
        onChangeText={(userEmail) => setEmail(userEmail)}
        placeholderText="Email"
        iconType="user"
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

      <FormButton
        buttonTitle="Sign Up"
        onPress={() => register(fname, lname, address, email, password)}
      />

      {/* <View style={styles.textPrivate}>
        <Text style={styles.color_textPrivate}>
          By registering, you confirm that you accept our{' '}
        </Text>
        <TouchableOpacity onPress={() => alert('Terms Clicked!')}>
          <Text style={[styles.color_textPrivate, {color: '#e88832'}]}>
            Terms of service
          </Text>
        </TouchableOpacity>
        <Text style={styles.color_textPrivate}> and </Text>
        <Text style={[styles.color_textPrivate, {color: '#e88832'}]}>
          Privacy Policy
        </Text>
      </View> */}

      
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.navButtonText}>Have an account? Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafd',
    justifyContent: 'center',
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
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 35,
    justifyContent: 'center',
  },
});