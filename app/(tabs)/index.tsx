import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Test</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 40 },
  cameraContainer: { flex: 0.45, overflow: "hidden" },
  camera: { flex: 1 },
  controls: { padding: 12 },
  previewContainer: { padding: 12, alignItems: "center" },
  preview: { width: 200, height: 120, borderRadius: 8 },
  results: { flex: 1, padding: 12 },
  heading: { fontSize: 18, fontWeight: "700", marginBottom: 8 },
  mealCard: {
    marginBottom: 18,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
  },
  mealTitle: { fontSize: 16, fontWeight: "700" },
  mealImage: { width: 120, height: 80, marginRight: 8, borderRadius: 6 },
  sub: { marginTop: 8, fontWeight: "600" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
