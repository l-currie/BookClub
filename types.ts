export type Book = {
    id: number,
    userId: number,
    author?: string,
    numberOfPages?: number,
    currentPage?: number,
    startDate?: Date,
    finishDate?: Date
}