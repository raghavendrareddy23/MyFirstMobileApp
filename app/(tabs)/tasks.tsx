import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Task } from "../../components/task";
const STORAGE_KEY = "tasks";

export default function Completed() {
  const [completed, setCompleted] = useState<Task[]>([]);

//   const [pending, setPending] = useState<Task[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          const all: Task[] = JSON.parse(raw);
          setCompleted(all.filter((t) => t.completed === true));
        //   setPending(all.filter((t) => t.completed === false));
        }
      } catch (err) {
        console.error("Error fetching tasks", err);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Completed</Text>
      <FlatList
        data={completed}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => <Text style={styles.item}>{item.title}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  h1: { fontSize: 22, fontWeight: "700", marginBottom: 12 },
  item: {
    fontSize: 18,
    paddingVertical: 8,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
});
