import { Book, Note } from "@/types";
import React, { useCallback, useEffect } from "react";
import {} from "react";

export const fetchAPI = async (url: string, options?: RequestInit) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      new Error(`Error status ${response.status} `);
    }
    return await response.json();
  } catch (err) {
    console.error("Fetch error", err);
    throw err;
  }
};

export const useFetch = <T>(url: string, options: RequestInit) => {
  const [data, setData] = React.useState<T | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetchAPI(url, options);
      setData(result.data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

export function mapToBookType(data: any): Book {
  return {
    id: data.id,
    userId: data.userid,
    title: data.title,
    author: data.author,
    numberOfPages: data.numberofpages,
    currentPage: data.currentpage,
    startDate: new Date(data.startdate),
    finishDate: new Date(data.finishdate),
    currentlyReading: data.currentlyreading,
  } as Book;
}

export function mapToNoteType(data: any): Note {
  return {
    id: data.id,
    userId: data.userid,
    bookId: data.bookid,
    bookTitle: data.booktitle,
    creationDate: new Date(data.creationdate),
    noteTitle: data.notetitle,
    noteText: data.notetext,
  }
}

export const fetchUserBooks = async (
  id: string,
  setterFunc: (x: Book[]) => void
) => {
  const response = await fetchAPI(`/(api)/books/${id}`, {
    method: "GET",
  });

  const mappedData = response.data.map((b: any) => mapToBookType(b));
  setterFunc(mappedData);
};

export const fetchBook = async (
  id: number,
  bookFunc?: (x: Book) => void
): Promise<Book | undefined> => {
  try {
    const response = await fetchAPI(`/(api)/book?id=${id}`, {
      method: "GET",
    });

    const mappedBook: Book = mapToBookType(response.data[0]);
    if (bookFunc) {
      bookFunc(mappedBook);
    } else {
      return mappedBook;
    }
  } catch (err) {
    console.error("Error fetching book", err);
  }
};

export const fetchBookNotes = async (
  bookId: number,
  setterFunc?: (x: Note[]) => void
) => {
  console.log('hio')
  console.log(bookId)
  const response = await fetchAPI(`/(api)/notes/${bookId}`, {
    method: "GET"
  });

  const mappedData = response.data.map((b: any) => mapToNoteType(b));

  if (setterFunc) {
    setterFunc(mappedData);
  } else {
    return mappedData;
  }
};
