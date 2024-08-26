import { BookList } from "@/components/BookList";
import CustomButton from "@/components/CustomButton";
import { testBooks } from "@/constants";
import { fetchAPI, fetchUserBooks, mapToBookType } from "@/helpers/helpers";
import { Book } from "@/types";
import { SignedIn, useUser } from "@clerk/clerk-expo";
import icons from "@/constants/icons";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import ReactNativeModal from "react-native-modal";
import InputWithIcon from "@/components/InputWithIcon";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import images from "@/constants/images";
import { router } from "expo-router";

export default function Page() {
  const { user } = useUser();
  const [userBooks, setUserBooks] = React.useState<Book[]>([]);
  const [showAddBookModal, setShowAddBookModal] =
    React.useState<boolean>(false);
  const [addBookFields, setAddBookFields] = React.useState({
    title: "",
    author: "",
    numberOfPages: 0,
  });

  const canAddBook =
    !addBookFields.title ||
    !addBookFields.author ||
    !addBookFields.numberOfPages;

  const onAddBook = async () => {
    if (user) {
      await fetchAPI("/(api)/book", {
        method: "POST",
        body: JSON.stringify({
          userId: user?.id,
          title: addBookFields.title,
          author: addBookFields.author,
          numberOfPages: addBookFields.numberOfPages,
          currentPage: 0,
          startDate: new Date(),
          finishDate: null,
          currentlyReading: true,
        }),
      });
      fetchUserBooks(user.id, setUserBooks);
    }
  };

  React.useEffect(() => {
    if (user) {
      fetchUserBooks(user.id, setUserBooks);
    }
  }, [user]);

  const onCloseModal = () => {
    setAddBookFields({
      title: "",
      author: "",
      numberOfPages: 0,
    });
    setShowAddBookModal(false);
  };

  const onPressBook = (book: Book) => {
    router.push(`/(tabs)/(book)/${book.id}`);
  };

  return (
    <GestureHandlerRootView>
      <SafeAreaView>
        <SignedIn>
          <ScrollView className="min-h-full bg-primary flex-col">
            <View className="mt-12 bg-primaryLight rounded-2xl border-2 border-orange-500">
              <View className="flex flex-row mt-2 ml-2 items-center">
                <Image source={images.readingSticker} className="w-12 h-12" />
                <Text
                  className=" text-white text-3xl font-pmedium"
                  style={{
                    textShadowOffset: { width: 1, height: 1 },
                    textShadowColor: "#000",
                    textShadowRadius: 6,
                  }}
                >
                  Currently Reading
                </Text>
              </View>
              <BookList books={userBooks} onPressBook={onPressBook} />
              <View className="my-2 mx-4 rounded-full border-2">
                <CustomButton
                  onPress={() => {
                    setShowAddBookModal(true);
                  }}
                  text="Add a New Book"
                  color="orange"
                  textStyle="text-xl text-neutral-50 font-pregular"
                />
              </View>
            </View>
            <ReactNativeModal
              isVisible={showAddBookModal}
              onBackButtonPress={onCloseModal}
            >
              <View className="bg-primaryLight border-orange-500 border-2 rounded-2xl h-[420px] justify-start p-4">
                <View className="flex flex-row justify-between">
                  <Text className="font-psemibold text-white text-2xl">
                    Add Book
                  </Text>
                  <TouchableOpacity onPress={onCloseModal}>
                    <Image
                      source={icons.xBlack}
                      className="w-7 h-7"
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
                <View className="flex flex-col">
                  <InputWithIcon
                    label="Title"
                    placeholder="Lord of The Rings"
                    icon={icons.bookIconBlack}
                    inputStyle="text-neutral-200"
                    labelStyle=""
                    containerStyle="border-2 border-neutral-400 rounded-full focus:border-white p-2"
                    onChangeText={(text) => {
                      setAddBookFields({ ...addBookFields, title: text });
                    }}
                  />
                  <InputWithIcon
                    label="Author"
                    placeholder="J. R. R. Tolkien"
                    icon={icons.userBlack}
                    inputStyle="text-neutral-200"
                    labelStyle=""
                    containerStyle="border-2 border-neutral-400 rounded-full focus:border-white p-2"
                    onChangeText={(text) => {
                      setAddBookFields({ ...addBookFields, author: text });
                    }}
                  />
                  <InputWithIcon
                    label="Number of Pages"
                    placeholder="123"
                    icon={icons.bookIconBlack}
                    inputStyle="text-neutral-200"
                    labelStyle=""
                    containerStyle="border-2 border-neutral-400 rounded-full focus:border-white p-2"
                    onChangeText={(text) => {
                      setAddBookFields({
                        ...addBookFields,
                        numberOfPages: +text,
                      });
                    }}
                    keyboardType="numeric"
                  />
                </View>
                <View className="border-2 mt-4 rounded-full">
                  <CustomButton
                    onPress={onAddBook}
                    text="Add Book"
                    color="orange"
                    textStyle="font-psemibold text-neutral-100 text-xl"
                    disabled={canAddBook}
                  ></CustomButton>
                </View>
              </View>
            </ReactNativeModal>
          </ScrollView>
        </SignedIn>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
