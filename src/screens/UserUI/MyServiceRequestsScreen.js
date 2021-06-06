import React, { Component, useEffect,useState,useContext } from 'react';
import { LogBox,StyleSheet } from 'react-native';
import { Entypo,Ionicons } from '@expo/vector-icons';
import { Container,FooterTab,Badge, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, View, Item } from 'native-base';
import FooterComponent from '../components/FooterComponent'
import ServiceRequestComponent from '../components/ServiceRequestComponent'
import { FlatList } from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../navigation/AuthProvider';
import UserServiceRequestViewComponent from '../components/UserServiceRequestViewComponent';

const MyServiceRequestsScreen = ({navigation}) => {

  LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

  const { user } = useContext(AuthContext);

  const [requests,setRequests] = useState([])
  const [show_requests,set_show_requests] = useState([])
  const [loading, setLoading] = useState(true);
  const [is_empty, set_is_empty] = useState(false);

  useEffect(() => {
    firestore()
      .collection('Service Requests')
      .where('User_ID', '==', (user.uid))
      .onSnapshot(querySnapshot => {
        const temp_requests = [];

        querySnapshot.forEach(documentSnapshot => {
          temp_requests.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setRequests(temp_requests);
        set_show_requests(temp_requests);
        setLoading(false);
      });
  },[]);

    return (
      <Container>
        {/* Search bar with drawer */}
        <View searchBar style={{flexDirection: 'row', paddingTop:26 , marginBottom: 12, paddingBottom: 6, alignContent:"center", backgroundColor: "darkred", top: 0}}>
        <Button transparent onPress={() => navigation.goBack()} >
              <Ionicons
                name='arrow-back-outline'
                style={{ fontSize: 30, marginTop:4,marginRight:12,marginLeft:12 ,color: 'white'}}
              />
            </Button>
            <Text style={{color: "white",height:50,fontSize:20, textAlign:'center',paddingLeft:'19%',paddingTop:12, fontWeight:'bold'}}> Requests History</Text> 
        </View>
        {/* End Search bar with drawer */}        

           
        <Content>
          
        {loading ? <Text style={styles.loadingStyle}> Loading Requests History... </Text> :
          <FlatList
            data={requests}
            renderItem={({ item }) => {
                return (
                  <UserServiceRequestViewComponent 
                    service_type = {item.Service_Type}
                    requested_time = {item.Requested_Time}
                    reserved_day = {item.Reserved_Day}
                    requestID = {item.key}
                    request_status = {item.Status}
                    requested_by = {item.User_Name}
                    status={item.Status}
                    mech_name={item.Mech_Name}
                  />
                );
            }}
          />
        }
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

export default MyServiceRequestsScreen

const styles = StyleSheet.create({

    loadingStyle: {
        color: 'darkred',
        alignSelf: 'center',
        fontSize: 22,
        textAlignVertical: 'center',
        fontWeight: 'bold',
        marginTop: 180
    }
})