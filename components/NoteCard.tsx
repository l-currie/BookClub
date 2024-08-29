import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Note } from "@/types";
import icons from "@/constants/icons";

type NoteCardProps = {
  note: Note;
  onPressNote: (note: Note) => void;
  onLongPressNote?: (note: Note) => void;
};

const NoteCard = ({ note, onPressNote, onLongPressNote }: NoteCardProps) => {
  return (
    <TouchableOpacity
      key={note.id}
      onPress={() => onPressNote(note)}
      onLongPress={() => (onLongPressNote ? onLongPressNote(note) : null)}
    >
      <View className="flex flex-col">
        <View className="flex flex-row justify-between items-center">
          <Text
            className="text-white text-lg font-psemibold flex-1"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {note.noteTitle}
          </Text>
          <View className="flex flex-row pl-4">
            <Image
              source={icons.calendarBlack}
              className="w-5 h-5 mr-1"
              resizeMode="contain"
            />
            <Text className="text-gray-300 text-sm font-pregular">
              {note.creationDate.toLocaleDateString()}
            </Text>
          </View>
        </View>
        <Text
          className="text-gray-300 text-sm font-pregular"
          numberOfLines={3}
          ellipsizeMode="tail"
        >
          {note.noteText}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default NoteCard;
