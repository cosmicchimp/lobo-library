import { Tabs } from "expo-router";
import React from "react";
import TabBar from "../../components/TabBar";
import { SearchProvider } from '@/context/SearchContext';


const TabLayout =  () => {
    return(
      <Tabs tabBar={(props: React.JSX.IntrinsicAttributes & { state: any; descriptors: any; navigation: any; }) => <TabBar {...props} />}>
        
        {/* home screen */}
        <Tabs.Screen name="index" options={{ title: "Home", headerShown: false}}/>
        
        {/* search screen */}
        <SearchProvider> 
          <Tabs.Screen name="search" options={{ title: "Search", headerShown: false }} />
        </SearchProvider>

        {/* menu screen */}
        <Tabs.Screen name="menu" options={{ title: "Menu", headerShown: false}} />
      </Tabs>
    )
}

export default TabLayout;

{/* SearchProvider provides search context to the search screen only */}