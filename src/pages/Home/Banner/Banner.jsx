import { useQuery } from '@tanstack/react-query';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

const Banner = () => {
  const axiosSecure = useAxiosSecure();
  const { data: issues = [] } = useQuery({
    queryKey: ['banner'],
    queryFn: async () => {
      const res = await axiosSecure.get('/home/reports');
      return res.data;
    },
  });

  return (
    <Swiper
  slidesPerView={1}
  centeredSlides={true}
  loop={issues.length > 1}
  autoplay={
    issues.length > 1
      ? { delay: 2000, disableOnInteraction: false }
      : false
  }
  spaceBetween={30}
  modules={[Autoplay, Pagination, Navigation]}
  pagination={{ clickable: true }}
  navigation={issues.length > 1}
>

      {issues.map((issue) => (
        <SwiperSlide key={issue._id}>
          <img
            src={issue.imageURL}
            className="w-full h-[200px] mt-8 md:mt-16 md:h-[550px] object-cover"
            alt={issue.title || 'Banner Image'}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Banner;
