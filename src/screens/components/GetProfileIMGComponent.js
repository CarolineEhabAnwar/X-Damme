import React, { useState, useEffect, useContext } from 'react';
import firestore from '@react-native-firebase/firestore';
import { StyleSheet, View, Image, Modal , ToastAndroid} from 'react-native';
import { Card, CardItem, Text, Button, Icon, Left, Body, Right, Form, Item } from 'native-base';
import { Ionicons, Feather } from '@expo/vector-icons';
import { AuthContext } from '../../navigation/AuthProvider';
import ImagePicker from "react-native-image-crop-picker";
import storage from '@react-native-firebase/storage';

const GetProfileIMGComponent = (props) => {

    const { user } = useContext(AuthContext);
    const [modalVisible, setModalVisible] = useState(false);
    const [image_path, setImage_path] = useState('');
    const [image, setImage] = useState(null);
    const [is_image_choosen, setis_image_choosen] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [is_image_uploaded, setis_image_uploaded] = useState(false);
    const [uploadedOnce, setuploadedOnce] = useState(false);

    async function Save(){
        await firestore().collection("users").doc(user.uid).update({
            profileIMG: image_path
        });
        ToastAndroid.show(
            'Saved.',
            ToastAndroid.SHORT
        );
        setModalVisible(false);

    }

    async function Cancel(){
        await firestore().collection("users").doc(user.uid).update({
            profileIMG: ""
        });
        ToastAndroid.show(
            'Canceled.',
            ToastAndroid.SHORT
        );
        setModalVisible(false);
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

    async function LoadUP() {
        await firestore().collection("users").doc(user.uid).get().then((Data) => {
            if (Data.exists) {
                if (Data.data().profileIMG == null) {
                    setModalVisible(true);
                }
            }
        });
    }

    useState(() => {
        try {
            LoadUP()
        } catch (error) {
            console.log(error);
        }
    }, [])


    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>

                    {/* Car Model */}
                    <Text style={styles.modalText}>Profile Photo</Text>

                    <Form style={{ width: 330 }}>

                        <Text>Please Input a photo.(Optional)</Text>
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
                                style={{ height: 45, position: 'relative', backgroundColor: props.Color, margin: 2 }}
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
                        <View style={{ paddingHorizontal: 50, flexDirection: 'row', justifyContent: "space-between" }}>
                            <Button
                                style={{ height: 45, position: 'relative', backgroundColor: props.Color, margin: 2 }}
                                onPress={async () => {
                                    Cancel();
                                }}>
                                <Text>Cancel</Text>
                            </Button>
                            <Button
                                style={{ height: 45, position: 'relative', backgroundColor: props.Color, margin: 2 }}
                                onPress={async () => {
                                    if(uploading){
                                        alert("Please wait untill uploading is finished.")
                                    }
                                    else if(uploadedOnce){
                                        Save();
                                    }
                                    else{
                                        alert("Please Select and Upload a photo first.")
                                    }
                                }}>
                                <Text>Save</Text>
                            </Button>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "center" }}>
                            <Button
                                style={{ height: 45, position: 'relative', backgroundColor: props.Color, margin: 2 }}
                                onPress={async () => {
                                    setModalVisible(false);
                                }}>
                                <Text> Remind Me Later</Text>
                            </Button>

                        </View>
                    </Form>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        color: 'darkred',
        fontWeight: 'bold',
        fontSize: 17
    },
    modalView: {
        margin: 20,
        width: "auto",
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: -30
    },
    InputStyle: {
        marginBottom: 10,
        borderColor: 'darkgreen',
        borderRadius: 6,
        justifyContent: 'space-between'
    }
})

export default GetProfileIMGComponent;
