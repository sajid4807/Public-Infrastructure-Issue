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
    <section className="relative mt-8 md:mt-16 overflow-hidden">
      {/* Swiper Container with Modern Styling */}
      <div className="relative max-w-7xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden shadow-sm border-4 border-white/50 backdrop-blur-xl">
          {/* Gradient overlay borders */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 pointer-events-none z-10"></div>
          
          <Swiper
            slidesPerView={1}
            centeredSlides={true}
            loop={issues.length > 1}
            autoplay={
              issues.length > 1
                ? { delay: 4000, disableOnInteraction: false }
                : false
            }
            spaceBetween={0}
            modules={[Autoplay, Pagination, Navigation]}
            pagination={{ 
              clickable: true,
              dynamicBullets: true,
            }}
            navigation={issues.length > 1}
            className="banner-swiper"
          >
            {issues.map((issue, index) => (
              <SwiperSlide key={issue._id}>
                <div 
                  className="relative group"
                  style={{ animation: `fadeIn 0.8s ease-out ${index * 0.1}s both` }}
                >
                  {/* Image with overlay gradient */}
                  <div className="relative h-[50vh] md:h-[65vh] overflow-hidden">
                    <img
                      src={issue.imageURL}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                      alt={issue.title || 'Banner Image'}
                    />
                    
                    {/* Dark gradient overlay for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                    
                    {/* Content overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 z-20">
                      <div className="max-w-4xl">
                        {/* Issue badge */}
                        {issue.category && (
                          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 px-4 py-2 rounded-full mb-4">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                            </svg>
                            <span className="text-white font-semibold text-xs uppercase tracking-wide">
                              {issue.category}
                            </span>
                          </div>
                        )}
                        
                        {/* Title */}
                        {issue.title && (
                          <h3 className="text-2xl md:text-4xl font-black text-white mb-3 capitalize leading-tight drop-shadow-lg">
                            {issue.title}
                          </h3>
                        )}
                        
                        {/* Description */}
                        {issue.description && (
                          <p className="text-white/90 text-sm md:text-base leading-relaxed line-clamp-2 drop-shadow-md">
                            {issue.description}
                          </p>
                        )}
                        
                        {/* Status badge if available */}
                        {issue.status && (
                          <div className="mt-4 inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-2 rounded-full text-white text-xs font-bold uppercase tracking-wide shadow-lg">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            {issue.status}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Slide counter indicator */}
        {issues.length > 1 && (
          <div className="absolute top-6 right-6 z-30 bg-white/20 backdrop-blur-md border border-white/30 px-4 py-2 rounded-full shadow-lg">
            <span className="text-white font-bold text-sm">
              {issues.length} {issues.length === 1 ? 'Issue' : 'Issues'}
            </span>
          </div>
        )}
      </div>

   

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        /* Custom Swiper Navigation Buttons */
        .banner-swiper .swiper-button-next,
        .banner-swiper .swiper-button-prev {
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(12px);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: 2px solid rgba(255, 255, 255, 0.3);
          transition: all 0.3s ease;
        }

        .banner-swiper .swiper-button-next:hover,
        .banner-swiper .swiper-button-prev:hover {
          background: rgba(255, 255, 255, 0.4);
          transform: scale(1.1);
        }

        .banner-swiper .swiper-button-next:after,
        .banner-swiper .swiper-button-prev:after {
          font-size: 20px;
          color: white;
          font-weight: bold;
        }

        /* Custom Swiper Pagination */
        .banner-swiper .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: rgba(255, 255, 255, 0.5);
          opacity: 1;
          transition: all 0.3s ease;
        }

        .banner-swiper .swiper-pagination-bullet-active {
          background: linear-gradient(135deg, #6366f1, #a855f7, #ec4899);
          width: 32px;
          border-radius: 6px;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .banner-swiper .swiper-button-next,
          .banner-swiper .swiper-button-prev {
            width: 40px;
            height: 40px;
          }

          .banner-swiper .swiper-button-next:after,
          .banner-swiper .swiper-button-prev:after {
            font-size: 16px;
          }
        }
      `}</style>
    </section>
  );
};

export default Banner;