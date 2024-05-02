'use client'
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';
import StoryCard from './story-card';


const StorySlider = ()=> {
  return (
      <Swiper
        slidesPerView={5}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper h-40"
      >
        <StoryCard />
        <SwiperSlide className='rounded-lg bg-blue-500'>Slide 1</SwiperSlide>
        <SwiperSlide className='rounded-lg bg-green-500'>Slide 2</SwiperSlide>
        <SwiperSlide className='rounded-lg bg-red-500'>Slide 3</SwiperSlide>
        <SwiperSlide className='rounded-lg bg-yellow-500'>Slide 4</SwiperSlide>
        <SwiperSlide className='rounded-lg bg-purple-500'>Slide 5</SwiperSlide>
        <SwiperSlide className='rounded-lg bg-cyan-500'>Slide 6</SwiperSlide>
        <SwiperSlide className='rounded-lg bg-indigo-500'>Slide 7</SwiperSlide>
        <SwiperSlide className='rounded-lg bg-fuchsia-500'>Slide 8</SwiperSlide>
        <SwiperSlide className='rounded-lg bg-emerald-600'>Slide 9</SwiperSlide>
      </Swiper>
  );
}

export default StorySlider