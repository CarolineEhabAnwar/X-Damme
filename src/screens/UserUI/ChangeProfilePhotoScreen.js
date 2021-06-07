import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Alert, ToastAndroid, Image } from 'react-native';
import { Container, Content, Item, Input, Text, Form, Button } from 'native-base';
import FooterComponent from '../components/FooterComponent'
import { AuthContext } from '../../navigation/AuthProvider';
import firebase from "@react-native-firebase/app";
import ImagePicker from "react-native-image-crop-picker";
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { Ionicons, Feather } from '@expo/vector-icons';


const ChangeProfilePhotoScreen = ({ navigation, route }) => {

    const { user } = useContext(AuthContext);
    const [image_path, setImage_path] = useState('');
    const [image, setImage] = useState(null);
    const [is_image_choosen, setis_image_choosen] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [is_image_uploaded, setis_image_uploaded] = useState(false);
    const [uploadedOnce, setuploadedOnce] = useState(false);

    async function Save() {
        await firestore().collection("users").doc(user.uid).update({
            profileIMG: image_path
        });
        ToastAndroid.show(
            'Saved.',
            ToastAndroid.SHORT
        );
        navigation.goBack();
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

        const storageRef = storage().ref(`profile/${filename}`)

        try {
            setUploading(true);
            setis_image_choosen(false);
            await storage().ref(`profile/${filename}`).putFile(uploadUri);

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
        <Container >
            {/* Search bar with drawer */}
            <View searchBar style={{ flexDirection: 'row', paddingTop: 26, marginBottom: 12, paddingBottom: 6, alignContent: "center", backgroundColor: route.params.Color, top: 0 }}>
                <Button transparent onPress={() => navigation.goBack()} >
                    <Ionicons
                        name='arrow-back-outline'
                        style={{ fontSize: 30, marginTop: 4, marginRight: 12, marginLeft: 12, color: 'white' }}
                    />
                </Button>
                <Text style={{ color: "white", height: 50, fontSize: 20, textAlign: 'center', paddingLeft: '20%', paddingTop: 12, fontWeight: 'bold' }}>Change Photo</Text>
            </View>
            {/* End Search bar with drawer */}

            <Content style={{ marginHorizontal: 15, paddingVertical: 10 }}>
                {image == null ?
                    null
                    :
                    <View style={{width:"auto",flexDirection:"row",justifyContent:'center',marginVertical:10}}>
                        <Image source={{ uri: image }} style={{ borderRadius: 100, height: 200, width: 200 }} />
                    </View>
                }

                <Form style={{ width: 380 }}>
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
                            style={{ height: 45, position: 'relative', backgroundColor: route.params.Color, margin: 2 }}
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
                    <View style={{ paddingHorizontal: 50, flexDirection: 'row', justifyContent: "center" }}>
                        <Button
                            style={{ height: 45, position: 'relative', backgroundColor: route.params.Color, margin: 2 }}
                            onPress={async () => {
                                if (uploading) {
                                    alert("Please wait untill uploading is finished.")
                                }
                                else if (uploadedOnce) {
                                    Save();
                                }
                                else {
                                    alert("Please Select and Upload a photo first.")
                                }
                            }}>
                            <Text>Save</Text>
                        </Button>
                    </View>
                </Form>

            </Content>

            <FooterComponent
                home={route.params.Home}
                profile={route.params.Profile}
                contactus={route.params.ContactUs}
                bkcolor={route.params.Color}
            />

        </Container>
    );
}

export default ChangeProfilePhotoScreen;

const styles = StyleSheet.create({
    InputStyle: {
        marginBottom: 10,
        borderColor: 'black',
        borderRadius: 6,
        justifyContent: 'space-between'
    },

    ViewStyle: {
        marginBottom: 10,
        flexDirection: 'row',
    }
})