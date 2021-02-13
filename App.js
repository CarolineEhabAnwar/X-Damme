//Imports
import React from 'react'
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native'
import {Icon} from 'native-base'
import { createAppContainer } from "react-navigation"
import { createDrawerNavigator } from 'react-navigation-drawer'
import { createStackNavigator } from "react-navigation-stack"

//Import Screen
import LoginScreen from './src/screens/LoginScreen'
import SignUpScreen from './src/screens/SignUpScreen'
import SM_SignUpScreen from './src/screens/SM_SignUpScreen'

//User
import HomeScreen from './src/screens/UserUI/HomeScreen'
import ItemsScreen from "./src/screens/UserUI/ItemsScreen"
import MechanicDetailsScreen from "./src/screens/UserUI/MechanicDetailsScreen"
import MechanicScreen from "./src/screens/UserUI/MechanicScreen"
import ServiceDetailsScreen from "./src/screens/UserUI/ServiceDetailsScreen"
import TutorialsScreen from "./src/screens/UserUI/TutorialsScreen"
import ItemDetailsScreen from './src/screens/UserUI/ItemDetailsScreen'
import EmergencyScreen from './src/screens/UserUI/EmergencyScreen'
import EmergencyContactsScreen from './src/screens/UserUI/EmergencyContactsScreen'
import WinchNumbersScreen from './src/screens/UserUI/WinchNumbersScreen'
import ProfileScreen from "./src/screens/UserUI/ProfileScreen"
import ContactUsScreen from "./src/screens/UserUI/ContactUsScreen"
import SettingsScreen from "./src/screens/UserUI/SettingsScreen"
import MyCarsScreen from "./src/screens/UserUI/MyCarsScreen"
import MyCarsDetailsScreen from "./src/screens/UserUI/MyCarsDetailsScreen"
import AddCarScreen from "./src/screens/UserUI/AddCarScreen"
import EditKMScreen from "./src/screens/UserUI/EditKMScreen"
import MyRequestsScreen from "./src/screens/UserUI/MyRequestsScreen"
import MyRequestsDetailsScreen from "./src/screens/UserUI/MyRequestsDetailsScreen"


//Shop Owner
import SOContactUSScreen from "./src/screens/SO_UI/SOContactUsScreen"
import SOProfileScreen from "./src/screens/SO_UI/SOProfileScreen"
import SOViewRequestScreen from "./src/screens/SO_UI/SOViewRequestScreen"
import SOAddOfferScreen from "./src/screens/SO_UI/SOAddOfferScreen"
import SORequestScreen from "./src/screens/SO_UI/SORequestsScreen"
import SOAddItemScreeen from "./src/screens/SO_UI/SOAddItemScreen"
import SOEditItemScreen from "./src/screens/SO_UI/SOEditItemScreen"
import SOHomeScreen from "./src/screens/SO_UI/SOHomeScreen"
import SOItemListScreen from "./src/screens/SO_UI/SOItemListScreen"
import SOViewItemScreen from "./src/screens/SO_UI/SOViewItemScreen"

// Mechanic
import MechHomeScreen from "./src/screens/Mech_UI/MechHomeScreen"
import MechContactUsScreen from "./src/screens/Mech_UI/MechContactUsScreen"
import MechEditServiceScreen from "./src/screens/Mech_UI/MechEditServiceScreen"
import MechAddOfferScreen from "./src/screens/Mech_UI/MechAddOfferScreen"
import MechAddServiceScreen from "./src/screens/Mech_UI/MechAddServiceScreen"
import MechRequestsScreen from "./src/screens/Mech_UI/MechRequestsScreen"
import MechServiceListScreen from "./src/screens/Mech_UI/MechServiceListScreen"
import MechViewRequestScreen from "./src/screens/Mech_UI/MechViewRequestScreen"
import MechViewServiceScreen from "./src/screens/Mech_UI/MechViewServiceScreen"
import MechProfileScreen from "./src/screens/Mech_UI/MechProfileScreen"



 function Item({ item, navigate }) {
  return (
    <TouchableOpacity style={styles.listItem} onPress={()=>navigate(item.name)}>
      <Icon name={item.icon} style={{color:'darkred'}} size={30} />
      <Text style={styles.title}>{item.name}</Text>
    </TouchableOpacity>
  );
}

class Sidebar extends React.Component {
  state = {
      routes:[
          {
            name:"Home",
            icon:"ios-home"
          },
          {
            name: "Items",
            icon: "ios-car"
          },
          {
            name: "Mechanics",
            icon: "construct"
          },
          {
            name: "Recommendations",
            icon: "flash"
          },
          {
            name: "Tutorials",
            icon: "logo-youtube"
          },
          {
            name: "Emergency",
            icon: "alert-circle"
          },
          {
              name:"Profile",
              icon:"person"
          },
          {
              name:"ContactUs",
              icon:"call",
          },
          {
            name:"Logout",
            icon:"log-out",
        },
      ]
  }
  
  render(){
      return (
          <View style={styles.container}>
              <Image source={require("./assets/logo.png")} style={styles.profileImg}/>
              <Text style={{fontWeight:"bold", fontSize:16, marginTop:10,marginBottom:15, color: "white"}}>X-Damme</Text>
              <FlatList
                  style={{width:"100%", margpinTop: 20, alignSelf: "center"}}
                  data={this.state.routes}
                  renderItem={({ item }) => <Item  item={item} navigate={this.props.navigation.navigate}/>}
                  keyExtractor={item => item.name}
              />
          </View>
      )
  }
}


class SOSidebar extends React.Component {
  state = {
      routes:[
          {
              name:"SOHome",
              icon:"ios-home"
          },
          {
            name: "Add Item",
            icon: "add"
          },
          {
            name: "Items List",
            icon: "logo-steam"
          },
          {
            name: "Requests",
            icon: "logo-buffer"
          },
          {
            name: "Add Offer",
            icon: "flash"
          },
          {
            name:"Profile",
            icon:"person"
        },
        {
            name:"Contact Us",
            icon:"call"
        }
          
      ]
  }
  
  render(){
      return (
      <View style={styles.SOcontainer}>
        <Image source={require("./assets/logo.png")} style={styles.profileImg}/>
        <Text style={{fontWeight:"bold",fontSize:16,marginTop:10, color: "white"}}>X-Damme</Text>
        <FlatList
            style={{width:"100%", marginTop: 20}}
            data={this.state.routes}
            renderItem={({ item }) => <Item  item={item} navigate={this.props.navigation.navigate}/>}
            keyExtractor={item => item.name}
        />
      </View>
      )
  }
}

class MSidebar extends React.Component {
  state = {
      routes:[
          {
            name:"MHome",
            icon:"ios-home"
          },
          {
            name: "Add Service",
            icon: "add"
          },
          {
            name: "Services List",
            icon: "logo-steam"
          },
          {
            name: "Requests",
            icon: "logo-buffer"
          },
          {
            name: "Add Offer",
            icon: "flash"
          },
          {
            name:"Profile",
            icon:"person"
        },
        {
            name:"Contact Us",
            icon:"call"
        }
      ]
  }
  
  render(){
      return (
        <View style={styles.Mcontainer}>
        <Image source={require("./assets/logo.png")} style={styles.profileImg}/>
        <Text style={{fontWeight:"bold",fontSize:16,marginTop:10, color: "white"}}>X-Damme</Text>
        <FlatList
            style={{width:"100%", marginTop: 20}}
            data={this.state.routes}
            renderItem={({ item }) => <Item  item={item} navigate={this.props.navigation.navigate}/>}
            keyExtractor={item => item.name}
        />
    </View>
      )
  }
}


const Drawer = createDrawerNavigator(
  {
    Home:{ screen: HomeScreen},
    SignUp:{ screen: SignUpScreen,
             navigationOptions: ({navigation}) => ({drawerLockMode: 'locked-closed'})},
    Login:{ screen: LoginScreen,
            navigationOptions: ({navigation}) => ({drawerLockMode: 'locked-closed'})
          },
    
    Items: {screen: ItemsScreen},
    ItemDetails: {screen: ItemDetailsScreen},
    MechanicDetails: {screen: MechanicDetailsScreen},
    Mechanics: {screen: MechanicScreen},
    ServiceDetails: {screen: ServiceDetailsScreen},
    Tutorials: {screen: TutorialsScreen},
    Emergency: {screen: EmergencyScreen},
    EmergencyContacts:{screen:EmergencyContactsScreen},
    WinchNumbers:{screen:WinchNumbersScreen},
    Profile:{screen:ProfileScreen},
    ContactUs:{screen:ContactUsScreen},
    Settings:{screen:SettingsScreen},
    MyCars:{screen:MyCarsScreen},
    MyCarsDetails:{screen:MyCarsDetailsScreen},
    AddCar:{screen:AddCarScreen},
    EditKM:{screen:EditKMScreen},
    MyRequests:{screen:MyRequestsScreen},
    MyRequestsDetails:{screen:MyRequestsDetailsScreen}
  },
  {
    initialRouteName: "Login",
    unmountInactiveRoutes: true,
    headerMode: "none",
    contentComponent: props => <Sidebar {...props} />
  }
)



const SODrawer = createDrawerNavigator(
  {
    Login:{ screen: LoginScreen,
            navigationOptions: ({navigation}) => ({drawerLockMode: 'locked-closed'})
          },
    SM_SignUp: {screen: SM_SignUpScreen,
               navigationOptions: ({navigation}) => ({drawerLockMode: 'locked-closed'})
              },
    SORequests: {screen: SORequestScreen},
    SOAddItem: {screen: SOAddItemScreeen},
    SOEditItem: {screen: SOEditItemScreen},
    SOHome: {screen: SOHomeScreen},
    SOItemList: {screen: SOItemListScreen},
    SOViewItem: {screen: SOViewItemScreen},
    SOProfile: {screen:SOProfileScreen},
    SOContactUS:{screen:SOContactUSScreen},
    SOViewRequest:{screen:SOViewRequestScreen},
    SOAddOffer:{screen:SOAddOfferScreen}
  },
  {
    initialRouteName: "Login",
    unmountInactiveRoutes: true,
    headerMode: "none",
    contentComponent: props => <SOSidebar {...props} />
  }
)


const MDrawer = createDrawerNavigator(
  {
    Login:{ screen: LoginScreen,
            navigationOptions: ({navigation}) => ({drawerLockMode: 'locked-closed'})
          },
    SM_SignUp: {screen: SM_SignUpScreen,
               navigationOptions: ({navigation}) => ({drawerLockMode: 'locked-closed'})
              },
    MechHome :{screen:MechHomeScreen},
    MechAddOffer:{screen:MechAddOfferScreen},
    MechAddService:{screen:MechAddServiceScreen},
    MechContactUs:{screen:MechContactUsScreen},
    MechEditService:{screen:MechEditServiceScreen},
    MechProfile:{screen:MechProfileScreen},
    MechRequests:{screen:MechRequestsScreen},
    MechServiceList:{screen:MechServiceListScreen},
    MechViewRequest:{screen:MechViewRequestScreen},
    MechViewService:{screen:MechViewServiceScreen}        
  },
  {
    initialRouteName: "Login",
    unmountInactiveRoutes: true,
    headerMode: "none",
    contentComponent: props => <MSidebar {...props} />
  }
)

const AppNavigator = createStackNavigator(
  {
    Drawer : {screen: Drawer},
    SODrawer: {screen: SODrawer},
    MDrawer: {screen: MDrawer}
  },
  {
    initialRouteName: "Drawer",
    headerMode: "none",
    unmountInactiveRoutes: true
  }
)

const AppContainer = createAppContainer(AppNavigator);



export default class App extends React.Component {
  
  render(){

    return (
      <AppContainer />
    );
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingTop:40,
    alignItems:"center",
    flex:1, 
    backgroundColor: "darkred", 
  },
  Mcontainer: {
    backgroundColor: "#fff",
    paddingTop:40,
    alignItems:"center",
    flex:1, 
    backgroundColor: "darkgreen"
  },
  SOcontainer: {
    backgroundColor: "#fff",
    paddingTop:40,
    alignItems:"center",
    flex:1, 
    backgroundColor: "darkblue"
  },
  listItem:{
      height:50,
      alignItems:"flex-start",
      flexDirection:"row",
      backgroundColor: "white",
      paddingHorizontal: 10,
      paddingVertical: 10
  },
  title:{
      fontSize:18,
      marginLeft:20,
      marginTop:6,
      color:'darkred',
      fontWeight:'300'
  },
  SOtitle:{
    fontSize:18,
    marginLeft:20,
    marginTop:6,
    color:'darkred',
    fontWeight:'300'
  },
  header:{
    width:"100%",
    height:60,
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    paddingHorizontal:20
  },
  profileImg:{
    width:140,
    height:140,
    borderRadius:70,
    resizeMode: 'contain',
    backgroundColor: "white",
  },
  sidebarDivider:{
    height:1,
    width:"100%",
    backgroundColor:"white",
    marginTop:10,
  }
}
);