import { View, Text } from 'react-native'
import React from 'react'
import { Book } from '@/types'

type BookListProps = {
    books: Book[]
}

const BookList = () => {
  return (
    <View className='h-fit w-fit mx-8 bg-primaryLight rounded-2xl border-2 p-2 border-orange-500'>
        <Text className='text-white'>hiiii</Text>
        <Text className='text-white'>hiiii</Text>
        <Text className='text-white'>hiiii</Text>
        <Text className='text-white'>hiiii</Text>
        <Text className='text-white'>hiiii</Text>
        <Text className='text-white'>hiiii</Text>
        <Text className='text-white'>hiiii</Text>
        <Text className='text-white'>hiiii</Text>
        <Text className='text-white'>hiiii</Text>
        <Text className='text-white'>hiiii</Text>
    </View>
  )
}

export default BookList