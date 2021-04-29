import React, {useContext, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {AuthContext} from './AuthProvider';
import AsyncStorage from '@react-native-community/async-storage';

import AuthStack from './AuthStack';
import AppStack from './AppStack';

const Routes = () => {
  const {user, setUser, typeUsed, setType, from_SignUp} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);
  let finished_loading = false;

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if(user){
    console.log(user.uid);
    if(typeUsed != "Default")
    {
      return (
        <NavigationContainer>
          {AppStack(typeUsed)}
        </NavigationContainer>
      ); 
    }
    else{
      AsyncStorage.getItem('TypeUsed').then((value) => {
        if(value != null && value != "Default"){
          setType(value);          
          return (
            <NavigationContainer>
              {AppStack(value)}
            </NavigationContainer>
          );
        }
        })
    }
    return (
      <NavigationContainer>
        {AppStack("Waiting")}
      </NavigationContainer>
    ); //waiting for everything to load
  }
  else{
    return (
      <NavigationContainer>
        <AuthStack/>
      </NavigationContainer>
  ); 
  } 
};

export default Routes;