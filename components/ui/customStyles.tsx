import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
  choicesContainer:{flexDirection:"column", alignItems:"center", width:"100%", height:"100%"},
  choicesBackButtonContainer:{backgroundColor:"rgba(255, 255, 255, 0.8)", width:35, height:35, borderRadius:100, alignItems:"center", justifyContent:"center", top:0, left:20},
});