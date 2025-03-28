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
        name="index"
        options={{
          headerTitle: "Lobo Library",
          headerTitleAlign: "center",
          headerLargeTitle: true,
          headerShadowVisible: false,
          headerLargeTitleShadowVisible:false,
          headerTitleStyle: { 
            fontFamily: "LoboFont", 
            fontSize: 20, 
            color: "#ba0c2f",

          },
          headerLargeTitleStyle: { 
            fontFamily: "LoboFont",
            color: "#ba0c2f",
            fontSize: 40, 
          }, 
        }}
      />
    </Stack>
  );
}
