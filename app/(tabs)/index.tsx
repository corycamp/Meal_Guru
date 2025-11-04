import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, Image, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity, Alert } from 'react-native';
import {ImageManipulator, SaveFormat} from 'expo-image-manipulator';
import { Camera, CameraView } from 'expo-camera';
import {readAsStringAsync} from 'expo-file-system/legacy'
import data from '../../constants/example.json'

export default function HomeScreen() {
  const cameraRef = useRef<any>(null);
    const [hasPermission, setHasPermission] = useState<boolean|null>(null);
    const [isCameraReady, setIsCameraReady] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [photoUri, setPhotoUri] = useState(null);
  
    useEffect(() => {
      (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }, []);
  
    if (hasPermission === null) return <View style={styles.center}><Text>Requesting camera permission...</Text></View>;
    if (hasPermission === false) return <View style={styles.center}><Text>No access to camera.</Text></View>;
  
    const takePictureAndSend = async () => {
      if (!cameraRef.current) return;
      setLoading(true);
      try {
        const photo = await cameraRef.current.takePictureAsync({ base64: false, quality: 0.7 });
        setPhotoUri(photo.uri);
  
        // Resize/flatten to reduce upload size
        const manipResult = (await ImageManipulator.manipulate(photo.uri).renderAsync()).saveAsync({base64:true, format:SaveFormat.JPEG});
  
        const base64 = (await manipResult).base64
        console.log("HERE")
  
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
        console.log(resp)
        // const json = await resp.json();
        setResult(resp);
      } catch (err:any) {
        console.error(err);
        Alert.alert('Error', err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <View style={styles.container}>
        <View style={styles.cameraContainer}>
          <CameraView
            ref={cameraRef}
            style={styles.camera}
            onCameraReady={() => setIsCameraReady(true)}
            ratio="16:9"
          />
        </View>
  
        <View style={styles.controls}>
          <Button title={loading ? 'Working...' : 'Take picture & get meal ideas'} onPress={takePictureAndSend} disabled={!isCameraReady || loading} />
        </View>
  
        {photoUri ? (
          <View style={styles.previewContainer}>
            <Text style={{fontWeight:'bold'}}>Last photo:</Text>
            <Image source={{ uri: photoUri }} style={styles.preview} />
          </View>
        ) : null}
  
        {loading ? <ActivityIndicator style={{marginTop:12}} size="large" /> : null}
  
        {result ? (
          <ScrollView style={styles.results}>
            <Text style={styles.heading}>Detected ingredient: {result.ingredientName}</Text>
            {result.meals.map((meal:any, idx:number) => (
              <View key={idx} style={styles.mealCard}>
                <Text style={styles.mealTitle}>{idx + 1}. {meal.title}</Text>
                <ScrollView horizontal>
                  {meal.images.map((uri:string, i:number) => (
                    <Image key={i} source={{ uri }} style={styles.mealImage} />
                  ))}
                </ScrollView>
                <Text style={styles.sub}>Ingredients:</Text>
                {meal.ingredients.map((ing:string, i:number) => <Text key={i}>• {ing}</Text>)}
                <Text style={styles.sub}>Steps:</Text>
                {meal.steps.map((s:string, i:number) => <Text key={i}>{i+1}. {s}</Text>)}
                <Text style={styles.sub}>Videos:</Text>
                {meal.videos.map((v:string, i:number) => (
                  <TouchableOpacity key={i} onPress={() => { /* open youtube link */ }}>
                    <Text style={{color:'blue'}}>{v}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </ScrollView>
        ) : null}
      </View>
    );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 40 },
  cameraContainer: { flex: 0.45, overflow: 'hidden' },
  camera: { flex: 1 },
  controls: { padding: 12 },
  previewContainer: { padding: 12, alignItems: 'center' },
  preview: { width: 200, height: 120, borderRadius: 8 },
  results: { flex: 1, padding: 12 },
  heading: { fontSize: 18, fontWeight: '700', marginBottom: 8 },
  mealCard: { marginBottom: 18, padding: 10, borderRadius: 8, backgroundColor: '#f5f5f5' },
  mealTitle: { fontSize: 16, fontWeight: '700' },
  mealImage: { width: 120, height: 80, marginRight: 8, borderRadius: 6 },
  sub: { marginTop: 8, fontWeight: '600' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});
