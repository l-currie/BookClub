import { Stack, Tabs } from "expo-router";
import { Text, Image, View, ImageSourcePropType } from "react-native";
import icons from "../../constants/icons";

export default function TabsLayout() {
  type TabIconProps = {
    icon: ImageSourcePropType;
  };

  const TabIcon = ({ icon }: TabIconProps) => {
    return (
      <View className="items-center">
        <Image className="w-10 h-10" source={icon} resizeMode="contain"></Image>
      </View>
    );
  };

  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopWidth: 2,
          borderTopColor: "#ff9800",
          backgroundColor: "#4d3b22",
          height: 60,
        }
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={focused ? icons.booksColor : icons.booksBlack}
            ></TabIcon>
          ),
        }}
      />

      <Tabs.Screen
        name="(book)/[id]"
        options={{
          title: "Book",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={focused ? icons.noteColor : icons.noteBlack}
            ></TabIcon>
          ),
        }}
      />
    </Tabs>
  );
}
