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
      navigation
    >
      <SwiperSlide>
        <div className="popular-slide_thumb">
        </div>
        <div className="popular-slide_text"></div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Slider;