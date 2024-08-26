export type Book = {
    id: number,
    userId: string,
    title: string,
    author: string,
    numberOfPages: number,
    currentPage: number,
    startDate: Date,
    finishDate?: Date
    currentlyReading: boolean
}

export type Note = {
    id: number
    userId: string,
    bookId: number,
    bookTitle: string,
    creationDate: Date,
    noteTitle: string,
    noteText: string,
}