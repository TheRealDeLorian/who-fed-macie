import { Image } from "expo-image";
import { Platform, StyleSheet, TouchableOpacity } from "react-native";

import { DoggieEmoji } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function HomeScreen() {
  function handleFeedingMacie() {
    //send api call to the wfm api
    fetch("http://linuxserver:8084/feedmacie", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstParam: "fedMacie",
      }),
    });
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Who fed Macie?</ThemedText>
        <DoggieEmoji />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <TouchableOpacity
          onPress={() => {
            handleFeedingMacie();
          }}
          style={styles.button}
        >
          I fed Macie!
        </TouchableOpacity>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  button: {
    color: "#224ee0ff",
    borderRadius: 5,
  },
});
