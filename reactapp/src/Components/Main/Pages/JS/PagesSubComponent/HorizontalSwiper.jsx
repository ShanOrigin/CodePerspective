import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';
import SectionCore from './SectionCore';

export default function HorizontalSwiper({ section, data }) {
  return (
    <>
      <Swiper
        spaceBetween={10}
        pagination={true}
        modules={[Pagination]}
        className="mySwiper"
      >
        {SectionCore({ which: section, data: data }).map((slide, i) => (
          <SwiperSlide key={i}>{slide} </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
