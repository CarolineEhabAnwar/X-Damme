import React, { Component, useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Alert, ToastAndroid, Image } from 'react-native';
import { Container, Picker, Form, Item, InputGroup, FooterTab, Input, Content, Text, Button, Icon } from 'native-base';
import { TextInput } from 'react-native-gesture-handler';
import { AuthContext } from '../navigation/AuthProvider';
import ImagePicker from "react-native-image-crop-picker";
import storage from '@react-native-firebase/storage';
import { Ionicons, Feather } from '@expo/vector-icons';
import firestore from '@react-native-firebase/firestore';

const testScreen = () => {

    const [Name, setName] = useState("");
    const [Abbreviation, setAbbreviation] = useState("");
    const [Branch, setBranch] = useState("");
    const [Description, setDescription] = useState("");
    const [Phone_Number, setPhone_Number] = useState("");
    const [Location, setLocation] = useState("");


    const { user } = useContext(AuthContext);
    const [image_path, setImage_path] = useState('');
    const [image, setImage] = useState(null);
    const [is_image_choosen, setis_image_choosen] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [is_image_uploaded, setis_image_uploaded] = useState(false);
    const [uploadedOnce, setuploadedOnce] = useState(false);

    async function Save() {
        console.log("Name:"+Name);
        console.log("Abbreviation:"+Abbreviation);
        console.log("Branch:"+Branch);
        console.log("Description:"+Description);
        console.log("Phone_Number:"+Phone_Number);
        let temp = [];
        temp.push(Location.split(",")[0],Location.split(",")[1])
        console.log("Location:"+temp);
        console.log("image_path:"+image_path);



        await firestore().collection("Hospitals").add({
            Name,
            Abbreviation,
            Branch,
            Description,
            Phone_Number,
            Location: temp,
            image_path
        })        
    }

    const choosePhotoFromLibrary = async () => {
        try {
            ImagePicker.openPicker({
                width: 1200,
                height: 780,
                cropping: true,
            }).then((image) => {
                setis_image_uploaded(false);
                const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
                setImage(imageUri);
                setis_image_choosen(true);
            });
        } catch (error) {
            setis_image_choosen(false);
        }
    };

    const Upload_The_Image = async () => {
        const uploadUri = image;
        let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

        const extension = filename.split('.').pop();
        const name = filename.split('.').slice(0, -1).join('.');
        filename = name + Date.now() + '.' + extension;

        const storageRef = storage().ref(`hospitals/${filename}`)

        try {
            setUploading(true);
            setis_image_choosen(false);
            await storage().ref(`hospitals/${filename}`).putFile(uploadUri);

            const url = await storageRef.getDownloadURL();
            ToastAndroid.show(
                'Uploaded Successfully.',
                ToastAndroid.SHORT
            );
            setUploading(false);
            setuploadedOnce(true);
            return url;
        } catch (error) {
            alert(error);
            return null;
        }
    };

    return (
        <View style={styles.container}>

            <Text>Name:</Text>
            <TextInput style={{ borderWidth: 2, borderColor: "black", height: 40, width: 300 }}
                defaultValue={""}
                onChangeText={setName}
            />

            <Text>Abbreviation:</Text>
            <TextInput style={{ borderWidth: 2, borderColor: "black", height: 40, width: 300 }}
                defaultValue={""}
                onChangeText={setAbbreviation}
            />

            <Text>Branch:</Text>
            <TextInput style={{ borderWidth: 2, borderColor: "black", height: 40, width: 300 }}
                defaultValue={""}
                onChangeText={setBranch}
            />

            <Text>Description:</Text>
            <TextInput style={{ borderWidth: 2, borderColor: "black", height: 40, width: 300 }}
                defaultValue={""}
                onChangeText={setDescription}
            />

            <Text>Location:</Text>
            <TextInput style={{ borderWidth: 2, borderColor: "black", height: 40, width: 300 }}
                defaultValue={""}
                onChangeText={setLocation}
            />

            <Text>Phone_Number:</Text>
            <TextInput style={{ borderWidth: 2, borderColor: "black", height: 40, width: 300 }}
                defaultValue={""}
                keyboardType='number-pad'
                onChangeText={setPhone_Number}
            />

            <Text>Image:</Text>
            <Item regular style={styles.InputStyle}>
                <Button transparent
                    style={{ height: 45, fontSize: 50, color: 'darkblue', margin: 2 }}
                    onPress={async () => {
                        choosePhotoFromLibrary();
                    }}>
                    <Text> Choose Photo</Text>
                </Button>
                {is_image_choosen ? <Ionicons name="checkmark-outline" size={24} color="black" /> : null}
                {uploading ? <Feather name="loader" size={24} color="black" /> : null}
                {is_image_uploaded ? <Ionicons name="checkmark-done-outline" size={24} color="black" /> : null}
                <Button
                    style={{ height: 45, position: 'relative', backgroundColor: "red", margin: 2 }}
                    onPress={async () => {
                        try {
                            const imageUrl = await Upload_The_Image();
                            setImage_path(imageUrl);
                            setis_image_choosen(false);
                            setis_image_uploaded(true);
                        } catch (error) {
                            console.log(error)
                            alert("There has been some error in uploading the image");
                        }
                    }}>
                    <Text> Upload Photo</Text>
                </Button>
            </Item>

            <Button
                style={{ height: 45, position: 'relative', backgroundColor: "red", margin: 2 ,marginLeft:"41%",marginTop:20}}
                onPress={async () => {
                    Save();
                }}>
                <Text> Save</Text>
            </Button>
        </View>
    );
}

export default testScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    location: {
        color: '#333333',
        marginBottom: 5,
    },
    button: {
        marginBottom: 8,
    }
});