import { Tabs } from "expo-router";
import React from "react";
import TabBar from "../TabBar";
import IndexHeader from "../(headers)/IndexHeader"
import SearchHeader from "../(headers)/SearchHeader"

const TabLayout =  () => {
    return(
      <Tabs tabBar={props => <TabBar {...props} />}>
        <Tabs.Screen name="index" options={{ title: "Home", headerShown: false}}/>
        <Tabs.Screen name="SearchPage" options={{ title: "Search", header: () => <SearchHeader /> }} />
        <Tabs.Screen name="menu" options={{ title: "Menu", headerShown: false}} />
      </Tabs>
    )
}
export default TabLayout;