import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
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
import { BookList, BookCard } from "@/components/BookList";
import InputWithIcon from "@/components/InputWithIcon";

const bookScreen = () => {
  const { user } = useUser();
  const { id } = useLocalSearchParams();
  const [bookId, setBookId] = React.useState(id);
  const [book, setBook] = React.useState<Book>();
  const [userBooks, setUserBooks] = React.useState<Book[]>([]);
  const [showSelectBookModal, setShowSelectBookModal] = React.useState<boolean>(
    id ? false : true
  );
  const [showAddNoteModal, setShowAddNoteModal] = React.useState<boolean>(true);

  const [addNoteFields, setAddNoteFields] = React.useState({
    noteTitle: "",
    noteText: "",
  });

  //TODO: Refactor to replace the url with new bookId instead of managing two state when select new book
  React.useEffect(() => {
    if (bookId && (!book || +bookId !== book?.id)) {
      fetchBook(+bookId, setBook);
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

  const setAndCloseSelectionModal = (book: Book) => {
    setBook(book);
    setShowSelectBookModal(false);
  };

  return (
    <GestureHandlerRootView>
      <SafeAreaView>
        <ScrollView className="min-h-full bg-primary flex-col">
          <View className="m-2 p-2 bg-primaryLight border-2 border-orange-500 rounded-2xl">
            {book && (
              <BookCard
                book={book}
                onPressBook={(book) => {
                  setShowSelectBookModal(true);
                }}
              />
            )}
          </View>
          <View className="flex flex-row">
            <Image
              source={icons.noteColor}
              className="w-12 h-12"
              resizeMode="contain"
            />
            <Text className="text-xl text-white">Notes</Text>
          </View>
        </ScrollView>
        <ReactNativeModal
          isVisible={showSelectBookModal}
          onBackButtonPress={() => setShowSelectBookModal(false)}
        >
          <View className="bg-primaryLight border-orange-500 border-2 rounded-2xl h-[420px] justify-start">
            <View className="flex flex-col w-full h-full gap-2">
              <View className="flex flex-row items-center px-4 pt-2">
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
              <ScrollView className="h-fill flex-1">
                <BookList
                  books={userBooks}
                  onPressBook={setAndCloseSelectionModal}
                />
              </ScrollView>
            </View>
          </View>
        </ReactNativeModal>
        <ReactNativeModal
          isVisible={showAddNoteModal}
          onBackButtonPress={() => false}
        >
          <View className="bg-primaryLight border-orange-500 border-2 rounded-2xl h-[420px] justify-start">
            <View className="flex flex-col w-full h-full gap-2 px-2">
              <View className="flex flex-row items-center px-4 pt-2">
                {/* TODO: Swap the image for a pencil / writing sticker*/}
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
                  New Note
                </Text>
              </View>
              <View className="flex flex-col">
                <InputWithIcon
                  label="Title"
                  placeholder="Fascinating Quote"
                  icon={icons.commentBlack}
                  inputStyle="text-neutral-200"
                  labelStyle=""
                  containerStyle="border-2 border-neutral-400 rounded-full focus:border-white p-2"
                  onChangeText={(text) => {
                    setAddNoteFields({ ...addNoteFields, noteTitle: text });
                  }}
                />
                <Text className="text-lg font-pmedium mb-1 mt-2 text-neutral-200">
                  Text
                </Text>
                  <TextInput className="text-white text-sm font-pregular border-2 border-orange-500 rounded-2xl p-2 items-start"
                  value={addNoteFields.noteText}
                  onChangeText={(text) => {
                    setAddNoteFields({ ...addNoteFields, noteText: text });
                  }}
                  numberOfLines={5}
                  maxLength={1000}
                  multiline={true}
                />
              </View>
            </View>
          </View>
        </ReactNativeModal>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default bookScreen;
