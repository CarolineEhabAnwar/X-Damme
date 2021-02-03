import React from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import {Icon} from 'native-base';
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from "react-navigation-stack"
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import HomeScreen from './src/screens/HomeScreen';
import SM_SignUpScreen from './src/screens/SM_SignUpScreen'
import ItemsScreen from "./src/screens/ItemsScreen";
import MechanicHomeScreen from "./src/screens/MechanicHomeScreen";
import MechanicDetailsScreen from "./src/screens/MechanicDetailsScreen";
import MechanicScreen from "./src/screens/MechanicScreen";
import ReserveServicScreen from "./src/screens/ReserveServiceScreen";
import ServiceDetailsScreen from "./src/screens/ServiceDetailsScreen";
import ShopOwnerRequestsScreen from "./src/screens/ShopOwnerRequestsScreen";
import SOAddItemScreeen from "./src/screens/SOAddItemScreen";
import SOEditItemScreen from "./src/screens/SOEditItemScreen";
import SOHomeScreen from "./src/screens/SOHomeScreen";
import SOItemListScreen from "./src/screens/SOItemListScreen";
import SOViewItemScreen from "./src/screens/SOViewItemScreen";
import TutorialsScreen from "./src/screens/TutorialsScreen";
import ItemDetailsScreen from './src/screens/ItemDetailsScreen';
import EmergencyScreen from './src/screens/EmergencyScreen';
import EmergencyContactsScreen from './src/screens/EmergencyContactsScreen';
import WinchNumbersScreen from './src/screens/WinchNumbersScreen'


 function Item({ item, navigate }) {
  return (
    <TouchableOpacity style={styles.listItem} onPress={()=>navigate(item.name)}>
      <Icon name={item.icon} size={32} />
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
            icon: "logo-steam"
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
              name:"Contact Us",
              icon:"call",
          },
          {
            name:"Logout",
            icon:"person",
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
    ReserveService: {screen: ReserveServicScreen},
    ServiceDetails: {screen: ServiceDetailsScreen},
    Tutorials: {screen: TutorialsScreen},
    Emergency: {screen: EmergencyScreen},
    EmergencyContacts:{screen:EmergencyContactsScreen},
    WinchNumbers:{screen:WinchNumbersScreen}
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
    SORequest: {screen: ShopOwnerRequestsScreen},
    SOAddItem: {screen: SOAddItemScreeen},
    SOEditItem: {screen: SOEditItemScreen},
    SOHome: {screen: SOHomeScreen},
    SOItemList: {screen: SOItemListScreen},
    SOViewItem: {screen: SOViewItemScreen}
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
    MechanicHome: { screen: MechanicHomeScreen}
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
      marginLeft:20
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