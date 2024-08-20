import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { SafeAreaView, ScrollView, Text, View } from "react-native";

export default function Page() {
  const { user } = useUser();

  return (
    <SafeAreaView>
      <SignedIn>
        <View>
        <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
        </View>
      </SignedIn>
    </SafeAreaView>
  );
}
