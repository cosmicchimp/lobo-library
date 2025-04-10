import { Tabs } from "expo-router";
import React from "react";
import TabBar from "../../lib/components/navigation/TabBar";
import { SearchProvider } from "../../lib/context/SearchContext";

const TabLayout = () => {
  return (
    <Tabs
      tabBar={(
        props: React.JSX.IntrinsicAttributes & {
          state: any;
          descriptors: any;
          navigation: any;
        }
      ) => <TabBar {...props} />}
    >
      <Tabs.Screen
        name="index"
        options={{ title: "Home", headerShown: false }}
      />
      <Tabs.Screen
        name="search"
        options={{ title: "Search", headerShown: false }}
      />
      <Tabs.Screen
        name="menu"
        options={{ title: "Menu", headerShown: false }}
      />
    </Tabs>
  );
};

export default TabLayout;

{
  /* SearchProvider provides search context to the search screen only */
}
