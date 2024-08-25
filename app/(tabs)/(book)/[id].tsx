import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Book } from "@/types";
import { fetchBook, fetchUserBooks } from "@/helpers/helpers";
import { SafeAreaView } from "react-native-safe-area-context";
import ReactNativeModal from "react-native-modal";
import images from "@/constants/images";
import { useUser } from "@clerk/clerk-expo";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import icons from "@/constants/icons";
import BookList from "@/components/BookList";

const bookScreen = () => {
  const { user } = useUser();
  const { id } = useLocalSearchParams();
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);
  const [bookId, setBookId] = React.useState(id);
  const [book, setBook] = React.useState<Book>();
  const [showSelectBookModal, setShowSelectBookModal] =
    React.useState<boolean>(true);
  const [userBooks, setUserBooks] = React.useState<Book[]>([]);

  React.useEffect(() => {
    if (bookId && (!book || +bookId !== book.id)) {
      setIsLoaded(false);
      fetchBook(bookId as string);
    }
  }, [bookId]);

  React.useEffect(() => {
    if (id) {
      setBookId(id);
    }
  }, [id]);

  React.useEffect(() => {
    if (user) {
      fetchUserBooks(user.id, setUserBooks);
    }
  }, [user]);

  return (
    <GestureHandlerRootView>
      <SafeAreaView>
        <ScrollView className="min-h-full bg-primary flex-col"></ScrollView>
        <ReactNativeModal
          isVisible={showSelectBookModal}
          onBackButtonPress={() => setShowSelectBookModal(false)}
        >
          <View className="bg-primaryLight border-orange-500 border-2 rounded-2xl h-[420px] justify-start p-4">
            <View className="flex flex-col w-full h-full gap-4">
              <View className="flex flex-row items-center">
                {/* TODO: Swap the image for a bookcase / grab book sticker */}
                <Image
                  source={images.readingSticker}
                  className="w-12 h-12"
                  resizeMode="contain"
                />
                <Text
                  className=" text-white text-3xl font-pmedium"
                  style={{
                    textShadowOffset: { width: 1, height: 1 },
                    textShadowColor: "#000",
                    textShadowRadius: 6,
                  }}
                >
                  Select a Book
                </Text>
              </View>
              <ScrollView className="h-fill flex-1" pointerEvents="auto">
                <BookList books={userBooks} onPressBook={setBook}/>
              </ScrollView>
            </View>
          </View>
        </ReactNativeModal>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default bookScreen;
