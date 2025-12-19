import { styles } from "@/components/ui/customStyles";
import { View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";


export default function ChoiceScreen({route, navigation}:any){
    const data = route.params["data"];
    console.log("data", data);
    return(
        <View style={styles.mainContainer}>
            <View style={styles.choicesBackButtonContainer}>
                <Icon name="arrow-left" size={25} color="#000" onPress={() => navigation.navigate('Home')}/>
            </View>
            <View style={styles.choicesContainer}>
                
            </View>
        </View>
    )
}