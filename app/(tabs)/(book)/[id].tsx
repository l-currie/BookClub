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
import { Book, Note } from "@/types";
import {
  fetchAPI,
  fetchBook,
  fetchUserBooks,
  fetchBookNotes,
} from "@/helpers/helpers";
import { SafeAreaView } from "react-native-safe-area-context";
import ReactNativeModal from "react-native-modal";
import images from "@/constants/images";
import { useUser } from "@clerk/clerk-expo";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import icons from "@/constants/icons";
import { BookList, BookCard } from "@/components/BookList";
import InputWithIcon from "@/components/InputWithIcon";
import CustomButton from "@/components/CustomButton";
import NoteCard from "@/components/NoteCard";

const bookScreen = () => {
  const { user } = useUser();
  const { id } = useLocalSearchParams();
  const [book, setBook] = React.useState<Book>();
  const [userBooks, setUserBooks] = React.useState<Book[]>([]);
  const [showSelectBookModal, setShowSelectBookModal] = React.useState<boolean>(
    id ? false : true
  );
  const [showAddNoteModal, setShowAddNoteModal] =
    React.useState<boolean>(false);
  const [bookNotes, setBookNotes] = React.useState<Note[]>([]);
  const [addNoteFields, setAddNoteFields] = React.useState({
    noteTitle: "",
    noteText: "",
  });

  React.useEffect(() => {
    if (id) {
      fetchBook(+id, setBook);
      fetchBookNotes(+id, setBookNotes);
    }
  }, [id]);

  React.useEffect(() => {
    if (user) {
      fetchUserBooks(user.id, setUserBooks);
    }
  }, [user]);

  const clearAndCloseAddNoteModal = () => {
    setAddNoteFields({ noteTitle: "", noteText: "" });
    setShowAddNoteModal(false);
  };

  const disableAddNote = !addNoteFields.noteTitle || !addNoteFields.noteText;

  const onPressBook = (book: Book) => {
    router.navigate(`/(tabs)/(book)/${book.id}`);
    setShowSelectBookModal(false);
  };

  const onAddNote = async () => {
    if (user && book) {
      await fetchAPI("/(api)/note", {
        method: "POST",
        body: JSON.stringify({
          userId: user.id,
          bookId: book.id,
          bookTitle: book.title,
          creationDate: new Date(),
          noteTitle: addNoteFields.noteTitle.trim(),
          noteText: addNoteFields.noteText,
        }),
      });

      await fetchBookNotes(book.id, setBookNotes);
      clearAndCloseAddNoteModal();
    }
  };

  console.log(bookNotes)

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
            <View className="flex flex-row mt-4">
              <Image
                source={icons.noteColor}
                className="w-12 h-12"
                resizeMode="contain"
              />
              <Text className="text-xl text-white">Notes</Text>
            </View>
            <ScrollView className="flex flex-col gap-4 m-2">
              {bookNotes.map((note) => (<NoteCard note={note} onPressNote={(x) => null} />))}
            </ScrollView>
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
                <BookList books={userBooks} onPressBook={onPressBook} />
              </ScrollView>
            </View>
          </View>
        </ReactNativeModal>
        <ReactNativeModal
          isVisible={showAddNoteModal}
          onBackButtonPress={clearAndCloseAddNoteModal}
          onBackdropPress={clearAndCloseAddNoteModal}
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
                <TextInput
                  className="text-white text-sm font-pregular border-2 border-neutral-400 focus:border-white rounded-3xl p-4 items-start"
                  value={addNoteFields.noteText}
                  onChangeText={(text) => {
                    setAddNoteFields({ ...addNoteFields, noteText: text });
                  }}
                  numberOfLines={5}
                  maxLength={1000}
                  multiline={true}
                  textAlignVertical="top"
                />
                <View className="border-2 mt-4 rounded-full">
                  <CustomButton
                    onPress={onAddNote}
                    text="Add Note"
                    color="orange"
                    textStyle="font-psemibold text-neutral-100 text-xl"
                    disabled={disableAddNote}
                  />
                </View>
              </View>
            </View>
          </View>
        </ReactNativeModal>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default bookScreen;
