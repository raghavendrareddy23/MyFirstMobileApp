import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Task } from "../../components/task";
const STORAGE_KEY = "tasks";

export default function TaskDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => { (async () => {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (raw) {
      const all: Task[] = JSON.parse(raw);
      setTask(all.find(t => t.id === id) ?? null);
    }
  })(); }, [id]);

  if (!task) return <View style={styles.container}><Text style={styles.txt}>Task not found.</Text></View>;

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Task Details</Text>
      <Text style={styles.txt}>ID: {task.id}</Text>
      <Text style={styles.txt}>Title: {task.title}</Text>
      <Text style={styles.txt}>Status: {task.completed ? "Completed" : "Pending"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, padding:16, backgroundColor:"#fff" },
  h1:{ fontSize:22, fontWeight:"700", marginBottom:10 },
  txt:{ fontSize:18, marginVertical:4 },
});
