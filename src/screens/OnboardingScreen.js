import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

import Onboarding from 'react-native-onboarding-swiper';

const Dots = ({selected}) => {
    let backgroundColor;

    backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';

    return (
        <View 
            style={{
                width:6,
                height: 6,
                marginHorizontal: 3,
                backgroundColor
            }}
        />
    );
}

const Skip = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16}}>Skip</Text>
    </TouchableOpacity>
);

const Next = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16}}>Next</Text>
    </TouchableOpacity>
);

const Done = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16}}>Done</Text>
    </TouchableOpacity>
);

const OnboardingScreen = ({navigation}) => {
    return (
        <Onboarding
        SkipButtonComponent={Skip}
        NextButtonComponent={Next}
        DoneButtonComponent={Done}
        DotComponent={Dots}
        onSkip={() => navigation.replace("Login")}
        onDone={() => navigation.navigate("Login")}
        pages={[
          {
            backgroundColor: '#db9191',
            image: <Image style={{width:400,height:450,marginLeft:10,marginTop:-70, resizeMode:'stretch'}}source={require('../../assets/logo2.png')} />,
            title: <Text style={styles.titleStyle}>Welcome To X-Damme</Text>,
            subtitle: 'A New Way To Find What Your Car Needs',
          },
          {
            backgroundColor: '#bdbdbd',
            image: <Image style={{resizeMode:'stretch',width:440,marginTop:-70}} source={require('../../assets/onboarding2.png')} />,
            title: 'Find your car part',
            subtitle: 'You will find the car part you are searching for!',
          },
          {
            backgroundColor: '#adb4d9',
            image: <Image style={{resizeMode:'stretch',width:420,height:300}} source={require('../../assets/onboardin3.jpg')} />,
            title: 'Fix and check you car',
            subtitle: "Reserve an appointment with any mechanic you want!",
          },
          {
            backgroundColor: '#f5bb5d',
            image: <Image style={{resizeMode:'stretch',width:200,height:300}} source={require('../../assets/onboarding4.png')} />,
            title: 'Help!',
            subtitle: "You will receive help wherever you are!",
          },
        ]}
      />
    );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  titleStyle:{
      fontSize:25,
      color:'#c2271d',
      fontWeight:'bold'
  }
});