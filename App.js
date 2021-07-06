import 'react-native-gesture-handler';
import React, { useEffect, useState, useContext } from 'react';
import Providers from './src/navigation';
import { StyleSheet, Text, View } from "react-native";
import firestore from "@react-native-firebase/firestore";



const App = () => {

  return <Providers />;
}

export default App;