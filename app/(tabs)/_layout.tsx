import { Tabs } from "expo-router";
import React from "react";
import TabBar from "../TabBar";
import IndexHeader from "../(headers)/IndexHeader"
import SearchHeader from "../(headers)/SearchHeader"
import ProfileHeader from "../(headers)/ProfileHeader"

const TabLayout =  () => {
    return(
        <Tabs tabBar={props => <TabBar {...props} />}>
          <Tabs.Screen name="index" options={{ header: () => <IndexHeader /> }}/>
          <Tabs.Screen name="SearchPage" options={{ header: () => <SearchHeader /> }} />
          <Tabs.Screen name="ProfilePage" options={{ header: () => <ProfileHeader /> }} />
        </Tabs>
    )
}
export default TabLayout;