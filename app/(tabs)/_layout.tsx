import { Tabs } from "expo-router";
import React from "react";
import TabBar from "../TabBar";

const TabLayout =  () => {
    return(
        <Tabs tabBar={props => <TabBar {...props} />}>
          <Tabs.Screen name="index" options={{title: "Home"}} />
          <Tabs.Screen name="SearchPage" options={{title: "Search"}} />
          <Tabs.Screen name="ProfilePage" options={{title: "Profile"}} />
        </Tabs>
    )
}
export default TabLayout;