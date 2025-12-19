import { styles } from "@/components/ui/customStyles";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import type { ICarouselInstance } from "react-native-reanimated-carousel";
import Carousel from "react-native-reanimated-carousel";
import React from "react";
import {Dish} from "../../constants/types";


export default function ChoiceScreen({route, navigation}:any){
    const ref = React.useRef<ICarouselInstance>(null);
    
    const data: Dish[] = route.params["data"];
    console.log("data", data);
    return(
        <View style={styles.mainContainer}>
            <View style={styles.choicesBackButtonContainer}>
                <Icon name="arrow-left" size={25} color="#000" onPress={() => navigation.navigate('Home')}/>
            </View>
            <View style={styles.choicesContainer}>
                {/* {data.map((item:any, index:number) => (
                    <View key={index} style={styles.choicesItemContainer}>
                        <View style={styles.choicesItemTextContainer}>
                            <Text>{item}</Text>
                        </View>
                    </View>
                ))} */}
                <Carousel
                    ref={ref}
                    loop={true}
                    width={300}
                    height={300}
                    autoPlay={false}
                    data={data}
                    renderItem={(item) => (
                        <View>
                            <View >
                                <Text>{item}</Text>
                            </View>
                        </View>
                    )}
                />
            </View>
        </View>
    )
}