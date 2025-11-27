import { Camera, CameraView, useCameraPermissions } from "expo-camera";
import { ImageManipulator, SaveFormat } from "expo-image-manipulator";
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Alert, Button, Pressable, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import data from "../../constants/example.json";

export default function HomeScreen({navigation}:any) {
  const cameraRef = useRef<any>(null);
    const [isCameraReady, setIsCameraReady] = useState<boolean>(false);
    const [hasPermission, setHasPermission] = useCameraPermissions();
    const [loading, setLoading] = useState(false);
    const [photoUri, setPhotoUri] = useState(null);
    
    
    useEffect(() => {
        (async () => {
          setHasPermission();
        })();
      }, []);

    
      const takePictureAndSend = async () => {
    if (!cameraRef.current) return;
    try {
      const photo = await cameraRef.current.takePictureAsync({
        base64: false,
        quality: 0.7,
      });
      setPhotoUri(photo.uri);
      setLoading(true);

      // Resize/flatten to reduce upload size
      const manipResult = (
        await ImageManipulator.manipulate(photo.uri).renderAsync()
      ).saveAsync({ base64: true, format: SaveFormat.JPEG });

      const base64 = (await manipResult).base64;
      console.log("HERE");

      // const resp = await fetch('http://YOUR_SERVER_IP:3000/generate-meals', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ image_base64: base64 }),
      // });

      // if (!resp.ok) {
      //   const txt = await resp.text();
      //   throw new Error(txt || 'Server error');
      // }

      const resp = data;
      navigation.navigate("Choice",{data:resp})
    } catch (err: any) {
      console.error(err);
      Alert.alert("Error", err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  
  const noPermissionView = ()=>{
    return(
      <View>
          <Text>Need permission:</Text>
          <Button title="Grant Permission" onPress={setHasPermission} />
        </View>
    )
  }
  const viewWithPermission = ()=>{
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>What's your ingredient?</Text>
        <View style={styles.instructionBubble}>
          <Text style={styles.primaryText}>Take a picture of your ingredients</Text>
          <Text style={styles.secondaryText}>We'll suggest a recipe for you</Text>
        </View>
        <View style={styles.cameraComponentContainer}>
        {!loading ? (
            <View style={styles.cameraComponentContainer}>        
            <View style={styles.cameraContainer}>
                <CameraView
                    ref={cameraRef}
                    facing="back"
                    style={{ flex: 1 }}
                    onCameraReady={() => setIsCameraReady(true)}
                    ratio="1:1"
                />
            </View>
            <View style={styles.cameraIconContainer}>
                <Pressable onPress={()=>{takePictureAndSend()}}>
                <Icon name={"camera"} size={32} color={"white"}/>
                </Pressable>
            </View>
           </View> 
        ) :
            (<View>
                <ActivityIndicator size={200}  color={"rgba(142, 117, 70, 1)"}/>
            </View>)}
        </View>
      </View>
    )
  }
  return (
    <View style={styles.mainContainer}>
      {!hasPermission || !hasPermission.granted ? noPermissionView() : viewWithPermission()}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, paddingTop: 20, backgroundColor:"rgba(250, 244, 234, 1)", top:35 },
  container:{display:"flex", height:"90%", alignItems:"center", justifyContent:"space-evenly"},
  instructionBubble:{flexDirection:"column", borderRadius:25,alignItems:"center", justifyContent:"center", backgroundColor:"white", width:300, height:80},
  heading: { fontSize: 25, fontWeight: "700", marginBottom: 8},
  primaryText:{fontSize: 20},
  camera: { backgroundColor:"black" },
  secondaryText:{fontSize:18, color:"rgba(142, 117, 70, 1)"},
  cameraContainer: { backgroundColor:"blue", overflow: "hidden", width:350, height:350, marginBottom: 60},
  cameraIconContainer:{backgroundColor:"orange", width:60, height:60, borderRadius:100, alignItems:"center", justifyContent:"center"},
  cameraComponentContainer:{alignItems:"center"},
});
