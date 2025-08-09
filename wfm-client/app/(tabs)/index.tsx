import { Image } from "expo-image";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";

import { DoggieEmoji } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useEffect, useState } from "react";

type FeedingInfo = {
  personWhoFedMacie: string;
  timeFed: Date;
};

export default function HomeScreen() {
  const [feedingInfo, setFeedingInfo] = useState<FeedingInfo>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const getWhoFedMacie = async () => {
      try {
        const response = await fetch("http://linuxserver:8084/whofedmacie");
        if (!response.ok) {
          throw new Error(`HTTP error: Status ${response.status}`);
        }
        const newFeedingInfo = await response.json();
        setFeedingInfo(newFeedingInfo);
      } catch {
        setError("Data not available.");
      }
    };

    getWhoFedMacie();
  }, []);
  // {
  //   //TODO: replace this with the newest person from the api
  //   personWhoFedMacie: "Joe",
  //   timeFed: new Date(2025, 8, 8, 23, 54),
  // }

  function handleFeedingMacie() {
    //send api call to the wfm api
    // fetch("http://linuxserver:8084/feedmacie", {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     firstParam: "fedMacie",
    //   }),
    // });
    console.log("fed macie!");
    alert("fed macie!");
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
      <ThemedText>
        Macie was last fed by ____ ____ hours ago at ______.
      </ThemedText>
      <ThemedView style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            handleFeedingMacie();
          }}
          style={styles.button}
        >
          <ThemedText>I fed Macie!</ThemedText>
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
  buttonContainer: {
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
    color: "#000000",
    borderRadius: 5,
    backgroundColor: "#224ee0ff",
    padding: 20,
    maxWidth: 200,
    alignItems: "center",
  },
});
