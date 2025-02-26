import {View, Text, Platform,ScrollView,Pressable,Alert} from 'react-native';
import React,{useState,useEffect,useCallback} from 'react';
import { TabsStackScreenProps } from '../Navigation/TabsNavigator';
import { SafeAreaView } from 'react-native';
import { HeadersComponent } from '../Components/HeaderComponent/HeaderComponent';
import ImageSlider from '../HomeScreenComponents/ImageSlider';
import { ProductListParams } from './../TypesCheck/HomeProps';
import { CategoryCard } from '../Components/HomeScreenComponents/CategoryCard';
import { fetchCategories,fetchProductsByCatID,fetchTrendingProducts } from '../MiddeleWares/HomeMiddeWare';
import { useFocusEffect } from '@react-navigation/native';
import { ProductCard } from '../Components/HomeScreenComponents/ProductCard';


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
    const [getProductsByCatID, setGetProductsByCatID] = useState<ProductListParams[]>([]);
    const [trendingProducts, setTrendingProducts] = useState<ProductListParams[]>([])



    useEffect(() => {
        fetchCategories({setGetCategory});
        fetchTrendingProducts({setTrendingProducts});

    }, []);

    useEffect(() => {
        console.log("fetchProductByCatID: ", fetchProductsByCatID);
        if(activeCat) {
            fetchProductsByCatID({ setGetProductsByCatID, catID: activeCat});
        }
    }, [activeCat]);

    useFocusEffect(
        useCallback(() => {
            fetchCategories({setGetCategory});
            if (activeCat){
                fetchProductsByCatID({ setGetProductsByCatID, catID: activeCat});
            }
        }, [activeCat]) //dependency array rong de tranh goi lai khong can thiet!
    );

    return (
        <SafeAreaView style={{ paddingTop: Platform.OS === "android" ? 40:0, flex: 1, backgroundColor: "black"}}>
            <HeadersComponent gotoCartScreen={gotoCartScreen}/>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}
                style ={{backgroundColor: "#efg"}}
            >
                <ImageSlider images={sliderImages}/>
            </ScrollView>   

            <View style={{ backgroundColor: "yellow" }}>
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
                                key={index}
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
            <View style= {{
                backgroundColor: "pink", flexDirection: "row", justifyContent: "space-between"
            }}>
                <Text style={{ fontSize: 14, fontWeight: "bold", padding: 10}}>
                    Products from Selected Category
                </Text>
                <Pressable>
                    <Text style= {{fontSize: 11, fontWeight: "bold", padding: 10}}>
                        See all
                    </Text>
                </Pressable>
            </View>

            <View style= {{
                backgroundColor: "#fff", borderWidth: 7, borderColor: "green", flexDirection: "row",
                justifyContent: "space-between", alignItems: "center", flexWrap: "wrap"
            }}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {
                        getProductsByCatID?.length> 0 ? (
                            getProductsByCatID.map((item, index) => (
                                <CategoryCard
                                    key={index}
                                    item={{"name": item.name, "images": item.images, "_id": item._id}}
                                    catStyleProps={{
                                        "height": 100,
                                        "width": 100,
                                        "radius": 10,
                                        "resizeMode": "contain"
                                    }}
                                    catProps={{
                                        "onPress": () => Alert.alert(item.name)
                                    }}
                                 />
                            ))
                        ) : (
                            <Text> Khong co san pham nao</Text>
                        )}
                </ScrollView>
            </View>


            <View style={{
                backgroundColor: "purple", flexDirection: "row", justifyContent: "space-between", marginTop: 10
            }}>
                <Text style={{ color: "yellow", fontSize: 14, fontWeight: "bold", padding: 10}}>
                    Trending Deals of The Week
                </Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>

                {
                    trendingProducts.map((item, index) => (
                        <ProductCard
                            item={{
                                _id: item?._id || index.toString(),
                                name: item?.name || "No name",
                                images: item?.images || [""],
                                price: item?.price || 0,
                                oldPrice: item?.oldPrice || item?.price || 0,
                                description: item?.description || "No description available",
                                quantity: item?.quantity ?? 1,
                                inStock: item?.inStock ?? true,
                                isFeatured: Boolean(item?.isFeatured),
                                category: item?.category?.toString() || "Uncategorized"
                            }}
                            key={index}
                            pStyleProps={{"resizeMode": "contain", "width": 100, height: 90, "marginBottom": 5}}   
                            productProps={{}} 
                        ></ProductCard>
                    ))
                }
                
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen