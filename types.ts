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