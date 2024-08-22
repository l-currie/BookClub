import images from "../constants/images";

export const welcomeScreen = [
  {
    id: 1,
    title: "Track Your Progress",
    description:
      "Tracking your reading has never been easier! Track every page page with ease and see your progress!",
    image: images.bookmarkSticker,
  },
  {
    id: 2,
    title: "Write Your Notes",
    description:
      "SocialRead allows you to write notes as you read. Write down important quotes and points to remember!",
    image: images.highlightSticker,
  },
  {
    id: 3,
    title: "Keep up With Friends",
    description:
      "See what books your friends are reading, and read their notes and reviews!",
    image: images.reviewSticker,
  },
];

export const testBooks = [
  {
    id: 1,
    userId: 'user_2kw7gcZdX65buUIK9Bnx8IJJrwx',
    title:
      "The Phoenix Project: A Novel about IT, DevOps, and Helping Your Business Win",
    author: "Gene Kim",
    numberOfPages: 537,
    currentPage: 30,
    startDate: new Date("2022-09-23"),
    endDate: null,
    currentlyReading: true,
  },
  {
    id: 2,
    userId: 'user_2kw7gcZdX65buUIK9Bnx8IJJrwx',
    title: "Think and Grow Rich",
    author: "Napoleon Hill 123456789",
    numberOfPages: 342,
    currentPage: 160,
    startDate: new Date("2024-06-23"),
    endDate: null,
    currentlyReading: true,
  },
  {
    id: 3,
    userId: 'user_2kw7gcZdX65buUIK9Bnx8IJJrwx',
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J. K. Rowling",
    numberOfPages: 537,
    currentPage: 537,
    startDate: new Date("2024-07-1"),
    endDate: null,
    currentlyReading: true,
  },
];

export const testPostBookBody = {
  id: 1233123123,
  userId: 'user_2kw7gcZdX65buUIK9Bnx8IJJrwx',
  title: "Lord of the Rings: The Two Towers",
  author: "J. R. R. Tolkien",
  numberOfPages: 378,
  currentPage: 0,
  startDate: new Date("2024-08-1"),
  endDate: null,
  currentlyReading: true,
};
