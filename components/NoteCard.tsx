import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Note } from "@/types";
import icons from "@/constants/icons";

type NoteCardProps = {
  note: Note;
  onPressNote: (x?: Note) => void;
};

const NoteCard = ({ note, onPressNote }: NoteCardProps) => {
  return (
    <TouchableOpacity key={note.id} onPress={() => onPressNote(note)}>
      <View className="flex flex-col justify-between">
        <View className="flex flex-1 flex-row justify-between">
          <Text className="text-white text-lg font-psemibold" numberOfLines={1}>
            {note.noteTitle}
          </Text>
          <View className="flex flex-row">
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
        <Text className="text-gray-300 text-sm font-pregular" numberOfLines={3} ellipsizeMode="tail">
          {note.noteText}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default NoteCard;
