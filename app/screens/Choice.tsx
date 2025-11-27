import { View, Text, Button } from "react-native";


export default function ChoiceScreen({route, navigation}:any){
    console.log(route.params)
    return(
        <View>
            <Text>Choice view</Text>
            <Button title="Go back" onPress={()=>navigation.goBack()}/>
        </View>
    )
}