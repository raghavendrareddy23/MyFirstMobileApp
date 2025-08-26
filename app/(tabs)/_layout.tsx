import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerTitleAlign: "center" }}>
      <Tabs.Screen name="index" options={{ title: "To-Do Tasks" }} />
      <Tabs.Screen name="tasks" options={{ title: "Tasks" }} />
    </Tabs>
  );
}
