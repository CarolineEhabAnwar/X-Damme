import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

const ItemComponent = ({imageSource, title, price, quality}) => {

    return <View style={{flexDirection: "row", marginEnd: 10}}>
        <Image source={imageSource} style={{width: 100, height: 100, resizeMode: "contain"}}/>
            <View style={{flexDirection: "column", marginLeft: 10, marginTop: 20}}>
                <Text>{title}</Text>
                <Text>{price}</Text>
                <Text>{quality}</Text>
            </View>
        </View>
};

const style = StyleSheet.create({});

export default ItemComponent;


