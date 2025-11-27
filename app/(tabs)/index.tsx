import { Camera, CameraView, useCameraPermissions } from "expo-camera";
import React, { useEffect, useRef, useState } from "react";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

export default function HomeScreen() {
  const cameraRef = useRef<any>(null);
    const [isCameraReady, setIsCameraReady] = useState<boolean>(false);
    const [hasPermission, setHasPermission] = useCameraPermissions();

     useEffect(() => {
        (async () => {
          setHasPermission();
        })();
      }, []);
  
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
          <Pressable onPress={()=>{window.alert()}}>
          <Icon name={"camera"} size={32} color={"white"}/>
          </Pressable>
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
  container:{display:"flex", height:"90%", alignItems:"center", justifyContent:"space-between"},
  instructionBubble:{flexDirection:"column", borderRadius:25,alignItems:"center", justifyContent:"center", backgroundColor:"white", width:300, height:80},
  heading: { fontSize: 25, fontWeight: "700", marginBottom: 8},
  primaryText:{fontSize: 20},
  camera: { backgroundColor:"black" },
  secondaryText:{fontSize:18, color:"rgba(142, 117, 70, 1)"},
  cameraContainer: { backgroundColor:"blue", overflow: "hidden", width:350, height:350},
  cameraIconContainer:{backgroundColor:"orange", width:60, height:60, borderRadius:100, alignItems:"center", justifyContent:"center"}
});
