import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import '../../components/styles/global.css'
import './Slider.css'

const Slider: React.FC = () => {
  return (
    <Swiper
    spaceBetween={20}
    pagination={{ clickable: true }}
    navigation >
    <SwiperSlide>
      <div className="container">
        <div className="cont">
      <div className="popular-slide_thumb">
        <img src="img/fish/preview/fish_1.jpg"/>
      </div>
      <div className="popular-slide_text" id='swiper'>
      Мраморный гурами 
      </div>
      </div>
      <div className="cont">
      <div className="popular-slide_thumb">
        <img src="img/fish/preview/fish_2.jpg"/>
      </div>
      <div className="popular-slide_text">
      Скалярия кои красный дьявол 
      </div>
      </div>
      <div className="cont">
      <div className="popular-slide_thumb">
        <img src="img/fish/preview/fish_3.jpg"/>
      </div>
      <div className="popular-slide_text">
      Снежный принц
      </div>
      </div>
      </div>
    </SwiperSlide>
    <SwiperSlide>
    <div className="container">
      <div className="cont">
      <div className="popular-slide_thumb">
        <img src="img/fish/preview/aquarium_1.webp"/>
      </div>
      <div className="popular-slide_text">
      Уникальный дизайн
      </div>
      </div>
      <div className="cont">
      <div className="popular-slide_thumb">
        <img src="img/fish/preview/aquarium_2.webp"/>
      </div>
      <div className="popular-slide_text">
      Дизайн под интерьер
      </div>
      </div>
      <div className="cont">
      <div className="popular-slide_thumb">
        <img src="img/fish/preview/aquarium_3.jpg"/>
      </div>
      <div className="popular-slide_text">
      Установка на месте
      </div>
      </div>
      </div>
    </SwiperSlide>
    <SwiperSlide>
    <div className="container">
      <div className="cont">
      <div className="popular-slide_thumb">
        <img src="img/fish/preview/konsult_1.jpg"/>
      </div>
      <div className="popular-slide_text">
      Доступно
      </div>
      </div>
      <div className="cont">
      <div className="popular-slide_thumb">
        <img src="img/fish/preview/konsult_2.jpg"/>
      </div>
      <div className="popular-slide_text">
      Быстро
      </div>
      </div>
      <div className="cont">
      <div className="popular-slide_thumb">
        <img src="img/fish/preview/konsult_3.jpg"/>
      </div>
      <div className="popular-slide_text">
      Надёжно
      </div>
      </div>
      </div>
    </SwiperSlide>
  </Swiper>
  );
};

export default Slider;