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
  const [showEditNoteModal, setShowEditNoteModal] =
    React.useState<boolean>(false);
  const [showDeleteNoteModal, setShowDeleteNoteModal] =
    React.useState<boolean>(false);
  const [selectedNote, setSelectedNote] = React.useState<Note>();
  const [allowEditNote, setAllowEditNote] = React.useState<boolean>(false);
  const [bookNotes, setBookNotes] = React.useState<Note[]>([]);
  const [noteFields, setNoteFields] = React.useState({
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
    setNoteFields({ noteTitle: "", noteText: "" });
    setShowAddNoteModal(false);
  };

  const clearAndCloseEditNoteModal = () => {
    setNoteFields({ noteTitle: "", noteText: "" });
    setShowEditNoteModal(false);
    setAllowEditNote(false);
  };

  const disableAddNote = !noteFields.noteTitle || !noteFields.noteText;

  const onPressBook = (book: Book) => {
    router.navigate(`/(tabs)/(book)/${book.id}`);
    setShowSelectBookModal(false);
  };

  const onPressNote = (note: Note) => {
    setSelectedNote(note);
    setNoteFields({ noteTitle: note.noteTitle, noteText: note.noteText });
    setShowEditNoteModal(true);
  };

  const onLongPressnote = (note: Note) => {
    setSelectedNote(note);
    setShowDeleteNoteModal(true);
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
          noteTitle: noteFields.noteTitle.trim(),
          noteText: noteFields.noteText,
        }),
      });

      await fetchBookNotes(book.id, setBookNotes);
      clearAndCloseAddNoteModal();
    }
  };

  const onEditNote = async () => {
    if (selectedNote && book) {
      await fetchAPI("/(api)/note", {
        method: "PUT",
        body: JSON.stringify({
          ...selectedNote,
          noteTitle: noteFields.noteTitle,
          noteText: noteFields.noteText,
        }),
      });
      fetchBookNotes(book.id, setBookNotes);
      clearAndCloseEditNoteModal();
    }
  };

  const onDeleteNote = async () => {
    if (selectedNote && book) {
      await fetchAPI("/(api)/note", {
        method: "DELETE",
        body: JSON.stringify({
          id: selectedNote.id,
        }),
      });
      fetchBookNotes(book.id, setBookNotes);
      setShowDeleteNoteModal(false)
    }
  };

  return (
    <GestureHandlerRootView>
      <SafeAreaView>
        <View className="min-h-full bg-primary flex-col pt-2">
          <View className="p-2 bg-primaryLight border-2 border-orange-500 rounded-2xl">
            {book && (
              <BookCard
                book={book}
                onPressBook={(book) => {
                  setShowSelectBookModal(true);
                }}
              />
            )}
            <View className="flex flex-row mt-4 items-center">
              <Image
                source={icons.noteColor}
                className="w-12 h-12"
                resizeMode="contain"
              />
              <Text className="text-xl text-white">Notes</Text>
            </View>
            <ScrollView className="flex flex-col mt-4 h-[50%]">
              {bookNotes.map((note) => (
                <View className="mb-4">
                  <NoteCard
                    note={note}
                    onPressNote={onPressNote}
                    onLongPressNote={onLongPressnote}
                  />
                </View>
              ))}
            </ScrollView>
            <View className="border-2 mt-4 rounded-full">
              <CustomButton
                onPress={() => setShowAddNoteModal(true)}
                text="Add Note"
                color="orange"
                textStyle="font-psemibold text-neutral-100 text-xl"
              />
            </View>
          </View>
        </View>
        <ReactNativeModal
          isVisible={showSelectBookModal}
          onBackButtonPress={() => setShowSelectBookModal(false)}
          onBackdropPress={() => setShowSelectBookModal(false)}
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
                    setNoteFields({ ...noteFields, noteTitle: text });
                  }}
                  maxLength={65}
                />
                <Text className="text-lg font-pmedium mb-1 mt-2 text-neutral-200">
                  Text
                </Text>
                <View className=" flex-1 h-[200px] w-full bg-red-500">
                  <TextInput
                    className="text-white text-sm font-pregular border-2 border-neutral-400 focus:border-white rounded-3xl p-4 items-start h-full"
                    value={noteFields.noteText}
                    onChangeText={(text) => {
                      setNoteFields({ ...noteFields, noteText: text });
                    }}
                    maxLength={1000}
                    multiline={true}
                    textAlignVertical="top"
                  />
                </View>
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
        <ReactNativeModal
          isVisible={showEditNoteModal}
          onBackButtonPress={clearAndCloseEditNoteModal}
          onBackdropPress={clearAndCloseEditNoteModal}
        >
          <View className="bg-primaryLight border-orange-500 border-2 rounded-2xl h-fit pb-2 justify-start">
            <View className="flex flex-col w-full h-fit gap-2 px-2">
              <View className="flex flex-row justify-between px-2 pt-2">
                <View className="flex flex-row items-center">
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
                    {allowEditNote ? "Edit Note" : "View Note"}
                  </Text>
                </View>
                <View className="flex flex-row gap-2 items-center">
                  {!allowEditNote && (
                    <TouchableOpacity onPress={() => setAllowEditNote(true)}>
                      <Image
                        source={icons.editBlack}
                        className="w-6 h-6"
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity onPress={clearAndCloseEditNoteModal}>
                    <Image
                      source={icons.xBlack}
                      className="w-6 h-6"
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View>
                <TextInput
                  className={
                    !allowEditNote
                      ? "text-white text-lg font-psemibold p-2 max-h-16"
                      : "text-white text-lg font-psemibold border-2 border-neutral-400 focus:border-white rounded-2xl p-2 items-start max-h-16"
                  }
                  placeholder="Fascinating Quote"
                  onChangeText={(text) => {
                    setNoteFields({ ...noteFields, noteTitle: text });
                  }}
                  value={noteFields.noteTitle}
                  editable={allowEditNote}
                  numberOfLines={2}
                  multiline={true}
                  maxLength={65}
                />
              </View>
              <ScrollView
                className="flex h-fit"
                style={
                  !allowEditNote
                    ? {
                        maxHeight: 250,
                        minHeight: 75,
                      }
                    : {}
                }
              >
                <TextInput
                  className={
                    !allowEditNote
                      ? "text-white text-sm font-pregular p-2"
                      : "text-white text-sm font-pregular border-2 border-neutral-400 focus:border-white rounded-2xl p-2 items-start"
                  }
                  value={noteFields.noteText}
                  onChangeText={(text) => {
                    setNoteFields({ ...noteFields, noteText: text });
                  }}
                  maxLength={1000}
                  multiline={true}
                  textAlignVertical="top"
                  scrollEnabled={true}
                  editable={allowEditNote}
                  style={
                    allowEditNote
                      ? {
                          maxHeight: 250,
                          minHeight: 75,
                        }
                      : {}
                  }
                />
              </ScrollView>
              <View className="border-2 mt-4 rounded-full">
                <CustomButton
                  onPress={
                    allowEditNote ? onEditNote : clearAndCloseEditNoteModal
                  }
                  text={allowEditNote ? "Edit Note" : "Close"}
                  color="orange"
                  textStyle="font-psemibold text-neutral-100 text-xl"
                />
              </View>
            </View>
          </View>
        </ReactNativeModal>
        <ReactNativeModal
          isVisible={showDeleteNoteModal}
          onBackButtonPress={() => setShowDeleteNoteModal(false)}
          onBackdropPress={() => setShowDeleteNoteModal(false)}
        >
          <View className="bg-primaryLight border-orange-500 border-2 rounded-2xl h-fit pb-4 justify-start">
            <View className="flex flex-col w-full h-fit gap-2 px-2">
              <Text className="font-pbold text-white text-2xl items-center px-2 pt-2">
                Delete Note
              </Text>
              <Text className="font-pregular text-neutral-300 text-base px-2">
                Are you sure you want to delete this note? This can't be undone.
              </Text>
              <View className="flex flex-row gap-2">
                <View className="flex-1 border-2 mt-4 rounded-full">
                  <TouchableOpacity
                    className="min-w-full items-center bg-neutral-100 rounded-full py-1"
                    onPress={() => setShowDeleteNoteModal(false)}
                  >
                    <Text className="font-psemibold text-neutral-800 text-xl">
                      Cancel
                    </Text>
                  </TouchableOpacity>
                </View>
                <View className="flex-1 border-2 mt-4 rounded-full">
                  <CustomButton
                    onPress={onDeleteNote}
                    text="Continue"
                    color="red"
                    textStyle="font-psemibold text-white text-xl"
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
