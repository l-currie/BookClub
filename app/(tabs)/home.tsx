import BookList from "@/components/BookList";
import CustomButton from "@/components/CustomButton";
import { testBooks, testPostBookBody } from "@/constants";
import { fetchAPI, mapToBookType } from "@/helpers/helpers";
import { Book } from "@/types";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import React from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";

export default function Page() {
  const { user } = useUser();
  const [userBooks, setUserBooks] = React.useState<Book[]>([]);

  const onAddBook = async () => {
    await fetchAPI("/(api)/book", {
      method: "POST",
      body: JSON.stringify(testBooks[2]),
    });
    fetchUserBooks()
  };

  React.useEffect(() => {
    if (user) {
      fetchUserBooks();
    }
  }, [user]);

  const fetchUserBooks = async () => {
    if (user) {
      const response = await fetchAPI(`/(api)/books/${user.id}`, {
        method: "GET",
      });

      const mappedData = response.data.map((b: any) => mapToBookType(b))
      setUserBooks(mappedData)
    }
  };

  return (
    <SafeAreaView>
      <SignedIn>
        <ScrollView className="min-h-full bg-primary flex-col">
          <View className="mt-12 bg-primaryLight rounded-2xl border-2 border-orange-500">
            <BookList books={userBooks} />
            <View className="my-2 mx-4 rounded-full border-2">
              <CustomButton
                onPress={() => {
                  onAddBook();
                }}
                text="Add a New Book"
                color="orange"
                textStyle="text-xl text-neutral-50 font-pregular"
              />
            </View>
          </View>
        </ScrollView>
      </SignedIn>
    </SafeAreaView>
  );
}
