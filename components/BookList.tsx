import { View, Text, Image } from "react-native";
import React from "react";
import { Book } from "@/types";
import icons from "../constants/icons";

type BookListProps = {
  books: Book[];
};

const testBooks = [
  {
    id: 1,
    userId: 1,
    title:
      "The Phoenix Project: A Novel about IT, DevOps, and Helping Your Business Win",
    author: "Gene Kim",
    numberOfPages: 537,
    currentPage: 30,
    startDate: new Date("2024-07-1"),
    endDate: null,
  },
  {
    id: 2,
    userId: 1,
    title: "Think and Grow Rich",
    author: "Napoleon Hill",
    numberOfPages: 342,
    currentPage: 160,
    startDate: new Date("2024-07-1"),
    endDate: null,
  },
  {
    id: 3,
    userId: 1,
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J. K. Rowling",
    numberOfPages: 537,
    currentPage: 537,
    startDate: new Date("2024-07-1"),
    endDate: null,
  },
];

const BookList = ({ books }: BookListProps) => {
  return (
    <View className="w-[calc(100%-1rem)] h-fit mx-2 p-2 bg-primaryLight rounded-2xl border-2 border-orange-500">
      <View className="flex flex-col gap-4">
        {testBooks.map((book) => (
          <View className="flex flex-row">
            <Image
              source={icons.cardBookColor}
              className="h-20 w-14"
              resizeMode="stretch"
            />
            <View className="flex flex-1 flex-col justify-start pl-2">
              <Text
                className="text-white text-sm font-psemibold"
                numberOfLines={1}
              >
                {book.title}
              </Text>
              <View className="flex flex-row justify-between">
                <View className="flex flex-row">
                  <Image
                    source={icons.userBlack}
                    className="w-5 h-5 mr-1"
                    resizeMode="contain"
                  />
                  <Text className="text-gray-300 text-sm font-pregular">
                    {book.author}
                  </Text>
                </View>
                <View className="flex flex-row">
                  <Image
                    source={icons.calendarBlack}
                    className="w-5 h-5 mr-1"
                    resizeMode="contain"
                  />
                  <Text className="text-gray-300 text-sm font-pregular">
                    {book.startDate.toLocaleDateString()}
                  </Text>
                </View>
              </View>
              <Text className=""></Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default BookList;
