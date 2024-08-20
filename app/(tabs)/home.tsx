import BookList from "@/components/BookList";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { SafeAreaView, ScrollView, Text, View } from "react-native";

export default function Page() {
  const { user } = useUser();

  return (
    <SafeAreaView>
      <SignedIn>
        <ScrollView className="min-h-full bg-primary">
          <View className="mt-12">
          <BookList />
          </View>
          
        </ScrollView>
      </SignedIn>
    </SafeAreaView>
  );
}
