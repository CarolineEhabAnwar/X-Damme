import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Modal, LogBox } from 'react-native';
import { Container, Picker, Form, Item, InputGroup, FooterTab, Input, Content, Text, Button, Icon } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import firestore from "@react-native-firebase/firestore";
import ItemComponent from '../components/ItemComponent'

const AdvViewScreen = ({ navigation, route }) => {

    //Setting the Model Visible
    const [modalVisible, setModalVisible] = useState(false);

    //Search bar Value
    const [search_item, set_search_item] = useState('');

    //Picker Selected Values
    const [filterType, setFilterType] = useState(0);
    const [filterBrand, setFilterBrand] = useState(0);
    const [filterModel, setFilterModel] = useState(0);
    const [filterQuality, setFilterQuality] = useState(0);

    //Picker Data States
    const [types, setTypes] = useState([]);
    const [brands, setBrands] = useState([]);
    const [all_models, set_all_models] = useState([]);
    const [models, setModel] = useState([]);
    const [qualities, setQualities] = useState([]);

    async function Set_Pickers_Data() {

        //The name of the collection holding the data "Car Brands and Models"

        //Getting Types
        let temp_Types = [];
        await firestore()
            .collection('App Details').doc("ioaEG86eslG2pL74Riq1")
            .get().then(doc => {
                if (doc.exists) {
                    doc.data().Types.forEach(element => {
                        temp_Types.push(element);
                    });
                }
            });
        setTypes(temp_Types);

        //Getting Brands and Models
        let temp_brands = [];
        let temp_models = [];
        temp_brands.push("Select Brand");
        temp_models.push(["Select Model"]);
        await firestore()
            .collection('Car Brands and Models')
            .get().then(doc => {
                doc.forEach(element => {
                    temp_brands.push(element.data().Brand);
                    let temp_models_per_brand = [];
                    element.data().Models.forEach(Model => {
                        temp_models_per_brand.push(Model);
                    });
                    temp_models.push(temp_models_per_brand);
                });
            });


        setBrands(temp_brands);
        set_all_models(temp_models)
        setModel(temp_models[0]);


        let temp_Qualities = [];
        await firestore()
            .collection('App Details').doc("RUltl1MjeBbhjEmJ6G8Y")
            .get().then(doc => {
                if (doc.exists) {
                    doc.data().Qualities.forEach(element => {
                        temp_Qualities.push(element);
                    });
                }
            });
        setQualities(temp_Qualities);
    }


    useEffect(() => {

        if (all_models[filterBrand] != null) {
            setModel(all_models[filterBrand]);
        }
    }, [filterBrand]);


    //Price Range Values for filtering
    const [price_min, set_price_min] = useState(0);
    const [price_max, set_price_max] = useState(1000000000);

    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    const [items, setItems] = useState([]); // Initial empty array of Items
    const [show_Items, setShow_Items] = useState([]);
    const [loading, setloading] = useState(true);

    function Filter() {
        setModalVisible(!modalVisible);

        let temp_filter_items_Type = [];

        if (types[filterType] != "Select Type" && types[filterType] != null) {
            for (let i = 0; i < items.length; i++) {
                if (items[i].Name.toUpperCase().includes(types[filterType].toUpperCase())) {
                    temp_filter_items_Type.push(items[i]);
                }
            }
        }
        else {
            temp_filter_items_Type = items;
        }

        let temp_filter_items_Brand = [];
        if (brands[filterBrand] != "Select Brand" && brands[filterBrand] != null) {
            for (let i = 0; i < temp_filter_items_Type.length; i++) {
                if (temp_filter_items_Type[i].Car_Brand == brands[filterBrand]) {
                    temp_filter_items_Brand.push(temp_filter_items_Type[i]);
                }
            }
        }
        else {
            temp_filter_items_Brand = temp_filter_items_Type;
        }

        let temp_filter_items_Model = [];
        if (models[filterModel] != "Select Model" && models[filterModel] != null) {
            for (let i = 0; i < temp_filter_items_Brand.length; i++) {
                if (temp_filter_items_Brand[i].Car_Model == models[filterModel]) {
                    temp_filter_items_Model.push(temp_filter_items_Brand[i]);
                }
            }
        }
        else {
            temp_filter_items_Model = temp_filter_items_Brand;
        }

        let temp_filter_items_Quality = [];
        if (qualities[filterQuality] != "Select Quality" && qualities[filterQuality] != null) {
            for (let i = 0; i < temp_filter_items_Model.length; i++) {
                if (temp_filter_items_Model[i].Quality == qualities[filterQuality]) {
                    temp_filter_items_Quality.push(temp_filter_items_Model[i]);
                }
            }
        }
        else {
            temp_filter_items_Quality = temp_filter_items_Model;
        }

        let temp_filter_prices = [];
        if (price_max != 1000000000 && price_min != 0) {
            for (let i = 0; i < temp_filter_items_Quality.length; i++) {
                if (temp_filter_items_Quality[i].Price < price_max && temp_filter_items_Quality[i].Price > price_min) {
                    temp_filter_prices.push(temp_filter_items_Quality[i]);
                }
            }
        }
        else if (price_max != 1000000000) {
            for (let i = 0; i < temp_filter_items_Quality.length; i++) {
                if (temp_filter_items_Quality[i].Price < price_max) {
                    temp_filter_prices.push(temp_filter_items_Quality[i]);
                }
            }
        }
        else if (price_min != 0) {
            for (let i = 0; i < temp_filter_items_Quality.length; i++) {
                if (temp_filter_items_Quality[i].Price > price_min) {
                    temp_filter_prices.push(temp_filter_items_Quality[i]);
                }
            }
        }
        else {
            temp_filter_prices = temp_filter_items_Quality;
        }


        if (temp_filter_prices == 0) {
            setShow_Items(null);
            return;
        }

        setShow_Items(temp_filter_prices);
    }

    async function Get_Items() {
        let temp = [];
        for (let i = 0; i < route.params.AD.Items.length; i++) {
            await firestore().collection('CarStuff').doc(route.params.AD.Items[i]).get().then(
                (Item_Info) => {
                    temp.push({
                        ...Item_Info.data(), key: route.params.AD.Items[i]
                    })
                }
            )
        }
        setItems(temp);
        setShow_Items(temp);
        if (loading)
            setloading(false);
    }

    useEffect(() => {
        try {
            Set_Pickers_Data();
            Get_Items()
        } catch (error) {
            alert(error);
        }
    }, []);

    return (
        <Container>

            {/* Start Modal */}
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
                        <Text style={styles.modalText}>Filter Items</Text>

                        <Form>
                            {/* Item Type Picker */}
                            <Item regular style={{
                                marginBottom: 10,
                                borderWidth: 3,
                                borderColor: 'darkred',
                                borderRadius: 6,
                                alignSelf: 'flex-start'
                            }}>

                                <Picker
                                    mode="dialog"
                                    iosIcon={<Icon name="arrow-down" style={{ marginLeft: -5 }} />}
                                    placeholderStyle={{ color: "darkred" }}
                                    selectedValue={filterType}
                                    onValueChange={(Selected_Type) => setFilterType(Selected_Type)}
                                >
                                    {types.map((item, index) => {
                                        return (<Picker.Item label={item} value={index} key={index} />)
                                    })}
                                </Picker>
                            </Item>

                            {/* Car Brand Picker */}
                            <Item regular style={{
                                marginBottom: 10,
                                borderWidth: 3,
                                borderColor: 'darkred',
                                borderRadius: 6,
                                alignSelf: 'flex-start'
                            }}>

                                <Picker
                                    mode="dialog"
                                    iosIcon={<Icon name="arrow-down" style={{ marginLeft: -5 }} />}
                                    placeholderStyle={{ color: "darkred" }}
                                    selectedValue={filterBrand}
                                    onValueChange={(Selected_Brand) => setFilterBrand(Selected_Brand)}
                                >
                                    {brands.map((item, index) => {
                                        return (<Picker.Item label={item} value={index} key={index} />)
                                    })}
                                </Picker>
                            </Item>

                            {/* Car Model Picker*/}
                            <Item regular style={{
                                marginBottom: 10,
                                borderWidth: 3,
                                borderColor: 'darkred',
                                borderRadius: 6,
                                alignSelf: 'flex-start'
                            }}>


                                <Picker
                                    mode="dialog"
                                    iosIcon={<Icon name="arrow-down" style={{ marginLeft: -5 }} />}
                                    placeholderStyle={{ color: "darkred" }}
                                    selectedValue={filterModel}
                                    onValueChange={(Selected_Model) => setFilterModel(Selected_Model)}
                                >
                                    {models.map((item, index) => {
                                        return (<Picker.Item label={item} value={index} key={index} />)
                                    })}
                                </Picker>
                            </Item>

                            {/* Quality Picker*/}
                            <Item regular style={{
                                marginBottom: 10,
                                borderWidth: 3,
                                borderColor: 'darkred',
                                borderRadius: 6,
                                alignSelf: 'flex-start'
                            }}>

                                <Picker
                                    mode="dialog"
                                    iosIcon={<Icon name="arrow-down" style={{ marginLeft: -5 }} />}
                                    placeholderStyle={{ color: "darkred" }}
                                    selectedValue={filterQuality}
                                    onValueChange={(Selected_Quality) => setFilterQuality(Selected_Quality)}
                                >
                                    {qualities.map((item, index) => {
                                        return (<Picker.Item label={item} value={index} key={index} />)
                                    })}
                                </Picker>
                            </Item>

                            {/* Price Range */}
                            <Text style={styles.textStyle2}>Price Range:</Text>


                            <Item regular style={styles.InputStyle}>
                                <Input value={price_min == 0 ? null : price_min} keyboardType="numeric" placeholder='From' onChangeText={price_min => set_price_min(price_min)} />
                            </Item>

                            <Item regular style={styles.InputStyle}>
                                <Input value={price_max == 1000000000 ? null : price_max} keyboardType="numeric" placeholder='To' onChangeText={price_max => set_price_max(price_max)} />
                            </Item>

                            <View style={{ flexDirection: 'row' }}>
                                <Button
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => {
                                        setFilterType(0);
                                        setFilterBrand(0);
                                        setFilterModel(0);
                                        setFilterQuality(0);
                                        set_price_max(1000000000);
                                        set_price_min(0);
                                    }}
                                >
                                    <Text style={styles.textStyle}>Remove Filter</Text>
                                </Button >


                                <Button
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => {
                                        if (price_min > price_max)
                                            return alert("Please make sure the Min Price is less than the Max Price.");
                                        Filter();
                                    }}
                                >
                                    <Text style={styles.textStyle}>OK</Text>
                                </Button>
                            </View>
                        </Form>
                    </View>
                </View>
            </Modal>
            {/* End Modal */}

            {/* Item Card */}
            {/* Search bar with nav back */}
            <View searchBar style={{ flexDirection: 'row', paddingTop: 25, marginBottom: 12, paddingBottom: 6, alignContent: "center", backgroundColor: "darkred", top: 0 }}>
                <Button transparent onPress={() => navigation.goBack()} >
                    <Ionicons
                        name='arrow-back-outline'
                        style={{ fontSize: 30, marginTop: 4, marginRight: 12, marginLeft: 12, color: 'white' }}
                    />
                </Button>
                <InputGroup rounded style={{ flex: 1, backgroundColor: '#fff', height: 35, marginTop: 7, paddingLeft: 10, paddingRight: 10 }}>
                    <Icon name="ios-search" style={{ color: "darkred" }} />
                    <Input style={{ height: 40, marginTop: 5, color: "darkred" }} placeholder="Search" onChangeText={search_item => set_search_item(search_item)} />
                </InputGroup>
                <Button transparent style={{ height: 50 }}
                    onPress={() => {
                        if (search_item == '') {
                            setShow_Items(items);
                            return;
                        }
                        let items_to_show = [];
                        for (let i = 0; i < items.length; i++) {
                            if (items[i].Name.toUpperCase().includes(search_item.toUpperCase())) {
                                items_to_show.push(items[i]);
                            }
                        }
                        setShow_Items(items_to_show);
                    }}
                >
                    <Text style={{ color: "white", fontWeight: 'bold' }}>Search</Text>
                </Button>
            </View>
            {/* End Search bar with nav back */}

            <Content>
                {/* Filter Button */}
                <Button rounded style={{ marginLeft: 5, marginBottom: 5, backgroundColor: 'darkred' }} onPress={() => setModalVisible(true)}>
                    <Icon name='filter' />
                    <Text style={{ marginLeft: -27 }}> Filter </Text>
                </Button>
                {/* End filter button */}



                {loading ? <Text style={styles.loadingStyle}> Loading Items... </Text> :
                    <FlatList
                        data={show_Items}
                        renderItem={({ item }) => {
                            return (
                                <ItemComponent
                                    Item={item}
                                />);
                        }}
                    />
                }

            </Content>
            {/* Footer */}
            <View style={{ flexDirection: 'row', alignContent: "center", backgroundColor: "darkred" }}>
                <FooterTab transparent style={{ backgroundColor: "darkred" }}>
                    <Button style={{ marginTop: 5 }} onPress={() => navigation.navigate('Home')}>
                        <Icon style={{ color: 'white' }} name="home" />
                        <Text style={{ color: 'white' }}> Home</Text>
                    </Button>

                    <Button style={{ marginTop: 5 }} onPress={() => navigation.navigate('Profile')}>
                        <Icon name="person" style={{ color: 'white' }} />
                        <Text style={{ color: 'white' }}>Profile</Text>
                    </Button>

                    <Button style={{ marginTop: 5 }} onPress={() => navigation.navigate('ContactUs')}>
                        <Icon style={{ color: 'white' }} name="call" />
                        <Text style={{ color: 'white' }} >Contact Us</Text>
                    </Button>
                </FooterTab>
            </View>
            {/* End Footer */}
        </Container >
    );
}

const styles = StyleSheet.create({
    textStyle: {
        marginTop: 16,
        fontSize: 15,
        marginLeft: 8,
        fontWeight: 'bold',
        color: 'black'
    },

    InputStyle: {
        marginBottom: 10,
        borderColor: 'darkred',
        borderRadius: 6,
        justifyContent: 'space-between'
    },

    cartItemStyle: {
        marginTop: -23,
        marginBottom: -10,
        marginRight: 3
    },
    rateStyle: {
        marginTop: -23,
        marginBottom: -9,
        marginRight: 3,
        fontSize: 16,
        marginLeft: 0,
        fontWeight: 'bold',
        color: 'black'
    },
    loadingStyle: {
        color: 'darkred',
        alignSelf: 'center',
        fontSize: 22,
        textAlignVertical: 'center',
        fontWeight: 'bold',
        marginTop: 180
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
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
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        alignSelf: 'center'
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "darkred",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        color: 'darkred',
        fontWeight: 'bold',
        fontSize: 17
    },
    textStyle2: {
        fontWeight: 'bold',
        fontSize: 17,
        color: 'darkred',
        marginBottom: 7

    }
})

export default AdvViewScreen;
