import { Stack } from "expo-router";

export default function MenuLayout() {
  return (
    <Stack
        screenOptions={{
            animation: "fade_from_bottom",
            contentStyle: { backgroundColor: "#fff" }
        }}
    >
      <Stack.Screen
        name="MenuPage"
        options={{
          headerTitle: "Menu",
          headerTitleAlign: "left",
          headerLargeTitle: true,
          headerShadowVisible: false,
          
          headerLargeTitleShadowVisible:false,
          headerTitleStyle: { fontFamily: "HeaderFont2", fontSize: 20 },
        }}
      />
    </Stack>
  );
}
