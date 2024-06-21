import {  SafeAreaView, } from 'react-native'
import React from 'react'
import MoviesList from '@/components/movies-list'
import { MoviesData } from '@/types';
import useTrendingMovies from '@/hooks/useTrendingMovies';

const New = () => {
  const { data: Trending }: { data: MoviesData[] } = useTrendingMovies();
  return (
    <SafeAreaView className='bg-black flex-1'>
    </SafeAreaView>
  )
}

export default New
