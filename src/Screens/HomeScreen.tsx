import {View, Text, Platform} from 'react-native';
import React from 'react';
import { TabsStackScreenProps } from '../Navigation/TabsNavigator';
import { SafeAreaView } from 'react-native';
import { HeadersComponent } from '../Components/HeaderComponent/HeaderComponent';

type Props = {}

const HomeScreen = ({navigation, route}: TabsStackScreenProps<"Home">) => {
    const gotoCartScreen = () => {
        navigation.navigate("Cart")
    }
    return (
        <SafeAreaView style={{ paddingTop: Platform.OS === "android" ? 40:0, flex: 1, backgroundColor: "black"}}>
            <HeadersComponent gotoCartScreen={gotoCartScreen}/>
        </SafeAreaView>
    )
}

export default HomeScreen