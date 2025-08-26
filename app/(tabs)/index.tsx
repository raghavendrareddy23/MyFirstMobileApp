import AsyncStorage from "@react-native-async-storage/async-storage";
import { Href, Link } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { createTask, Task } from "../../components/task";

const STORAGE_KEY = "tasks";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [text, setText] = useState("");

  useEffect(() => { (async () => {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (raw) setTasks(JSON.parse(raw));
  })(); }, []);

  useEffect(() => { AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)); }, [tasks]);

  const addTask = () => {
    if (!text.trim()) return;
    setTasks((prev) => [...prev, createTask(text)]);
    setText("");
  };
  const toggle = (id: string) =>
    setTasks((prev) => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  const remove = (id: string) => setTasks((prev) => prev.filter(t => t.id !== id));

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>My To-Dos</Text>

      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder="Add a task..."
          value={text}
          onChangeText={setText}
        />
        <TouchableOpacity style={styles.add} onPress={addTask}><Text style={styles.addTxt}>+</Text></TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <TouchableOpacity onPress={() => toggle(item.id)}>
              <Text style={[styles.item, item.completed && styles.done]}>{item.title}</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Link href={`/task/${item.id}` as Href} style={styles.link}>Details</Link>
              <TouchableOpacity onPress={() => remove(item.id)}><Text style={styles.del}>X</Text></TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, padding:16, backgroundColor:"#fff" },
  h1:{ fontSize:24, fontWeight:"700", marginBottom:12 },
  row:{ flexDirection:"row", marginBottom:12 },
  input:{ flex:1, borderWidth:1, borderColor:"#ddd", borderRadius:8, padding:10 },
  add:{ marginLeft:8, backgroundColor:"#007AFF", borderRadius:8, paddingHorizontal:16, justifyContent:"center" },
  addTxt:{ color:"#fff", fontSize:20, fontWeight:"700" },
  itemRow:{ flexDirection:"row", justifyContent:"space-between", paddingVertical:10, borderBottomColor:"#eee", borderBottomWidth:1 },
  item:{ fontSize:18 },
  done:{ textDecorationLine:"line-through", color:"#888" },
  link:{ marginRight:12, color:"#007AFF" },
  del:{ color:"#ff3b30", fontWeight:"700" },
});
