import {View, Text, Platform,ScrollView} from 'react-native';
import React,{useState,useEffect,useCallback} from 'react';
import { TabsStackScreenProps } from '../Navigation/TabsNavigator';
import { SafeAreaView } from 'react-native';
import { HeadersComponent } from '../Components/HeaderComponent/HeaderComponent';
import ImageSlider from '../HomeScreenComponents/ImageSlider';
import { ProductListParams } from './../TypesCheck/HomeProps';
import { CategoryCard } from '../Components/HomeScreenComponents/CategoryCard';
import { fetchCategories } from '../MiddeleWares/HomeMiddeWare';
import { useFocusEffect } from '@react-navigation/native';
type Props = {}

const HomeScreen = ({navigation, route}: TabsStackScreenProps<"Home">) => {
    const gotoCartScreen = () => {
        navigation.navigate("Cart")
    }
    const sliderImages=[
        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Ryssebergen_2012b.jpg/405px-Ryssebergen_2012b.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/L%27automne_au_Qu%C3%A9bec_%288072544123%29.jpg/405px-L%27automne_au_Qu%C3%A9bec_%288072544123%29.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Hellyer_Gorge%2C_Tasmania.jpg/405px-Hellyer_Gorge%2C_Tasmania.jpg"
    ]

    const [getCategory, setGetCategory] = useState<ProductListParams[]>([])
    const [activeCat, setActiveCat] = useState<string>("")

    useEffect(() => {
        fetchCategories({setGetCategory});
    }, []);



    useFocusEffect(
        useCallback(() => {
            fetchCategories({setGetCategory});
        }, []) //dependency array rong de tranh goi lai khong can thiet!
    );
    return (
        <SafeAreaView style={{ paddingTop: Platform.OS === "android" ? 40:0, flex: 1, backgroundColor: "black"}}>
            <HeadersComponent gotoCartScreen={gotoCartScreen}/>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}
                style ={{backgroundColor: "#efg"}}
            >
                <ImageSlider images={sliderImages}/>
            </ScrollView>   

            <View style={{ backgroundColor: "yellow", flex: 1}}>
                <Text>
                    Category
                </Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}
                    contentContainerStyle = {{paddingHorizontal: 15}}
                    style= {{margin: 4}}
                >
                    {
                        getCategory.map((item, index) => (
                            <CategoryCard
                                item={{ "name" : item.name, "images" : item.images, _id : item._id}}
                                catStyleProps={{
                                    "height": 50,
                                    "width": 55,
                                    "radius": 20,
                                    "resizeMode": "contain"
                                }}
                                catProps={{
                                    "activeCat": activeCat,  "onPress" : () => setActiveCat(item._id)
                                }}
                            />
                        ))
                    }

                </ScrollView>
            </View>
        
        </SafeAreaView>
    )
}

export default HomeScreen