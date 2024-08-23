import { View, Text, Image } from "react-native";
import React from "react";
import { Book } from "@/types";
import icons from "../constants/icons";

type BookListProps = {
  books: Book[];
};

const BookList = ({ books }: BookListProps) => {
  return (
    books && (
      <View className="w-[calc(100%-1rem)] h-fit mx-2 p-2 ">
        <View className="flex flex-col gap-4">
          {books.map((book) => {
            const progress =
              ((book.currentPage ?? 0) / book.numberOfPages) * 100;

            let authorStr = book.author;
            if (book.author) {
              authorStr =
                book.author.length > 21
                  ? book.author.slice(0, 20) + "..."
                  : book.author;
            }
            return (
              <View className="flex flex-row">
                <Image
                  source={icons.cardBookColor}
                  className="h-20 w-14"
                  resizeMode="stretch"
                />
                <View className="flex flex-1 flex-col justify-between pl-2">
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
                      <Text
                        className="text-gray-300 text-sm font-pregular"
                        ellipsizeMode="tail"
                        numberOfLines={1}
                      >
                        {authorStr}
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
                  <View className="relative w-full">
                    <View className="bg-slate-200 rounded-full border-2">
                      <Text
                        className="bg-green-400 h-3.5 rounded-full"
                        style={{
                          width: `${progress}%`,
                        }}
                      />
                    </View>
                    <Text className="absolute inset-0 text-xs font-pmedium w-full text-center py-0.5">{`${book.currentPage}/${book.numberOfPages}`}</Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    )
  );
};

export default BookList;
