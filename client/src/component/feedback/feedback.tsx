import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Autoplay, Navigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/css';

SwiperCore.use([Autoplay, Pagination, Navigation, A11y]);

const FeedbackComp = () => {
  const testimonials = [
    {
      imgSrc: '/assets/img/testimonials/testimonials-1.jpg',
      name: 'Saul Goodman',
      role: 'Customer',
      stars: 5,
      quote:
        'Exceptional service, meticulous attention to detail, and responsive communication make Jony Mathew the go-to choice for plumbing.',
    },
    {
      imgSrc: '/assets/img/testimonials/testimonials-2.jpg',
      name: 'Sara Wilsson',
      role: 'Customer',
      stars: 5,
      quote:
        'Reliable, skilled, and always there when you need them, jony mathew is your trusted go-to for all your plumbing needs.',
    },
    {
      imgSrc: '/assets/img/testimonials/testimonials-3.jpg',
      name: 'Jena Karlis',
      role: 'Customer',
      stars: 5,
      quote:
        "I had a plumbing emergency late at night, and Jony Mathew came to the rescue! Despite the late hour, they arrived quickly and worked efficiently to repair a burst pipe in my basement. Their expertise and dedication saved the day, and I'm incredibly grateful for their prompt response and exceptional service.",
    },
    {
      imgSrc: '/assets/img/testimonials/testimonials-4.jpg',
      name: 'Matt Brandon',
      role: 'Customer',
      stars: 5,
      quote:
        'Saved the day with a speedy response to a burst pipe—Jony Mathew is a lifesaver!',
    },
    {
      imgSrc: '/assets/img/testimonials/testimonials-5.jpg',
      name: 'John Larson',
      role: 'Customer',
      stars: 5,
      quote:
        'Trustworthy and proactive, jony mathew ensures peace of mind with every plumbing task.',
    },
  ];

  return (
    <section id='testimonials' className='testimonials'>
      <div className='container'>
        <Swiper
          spaceBetween={30}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          data-aos='fade-up'
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className='testimonial-item'>
                <img
                  src={testimonial.imgSrc}
                  className='testimonial-img'
                  alt={testimonial.name}
                />
                <h3>{testimonial.name}</h3>
                <h4>{testimonial.role}</h4>
                <div className='stars'>
                  {[...Array(testimonial.stars)].map((star, i) => (
                    <i className='bi bi-star-fill' key={i}></i>
                  ))}
                </div>
                <p>
                  <i className='bi bi-quote quote-icon-left'></i>
                  {testimonial.quote}
                  <i className='bi bi-quote quote-icon-right'></i>
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
export default FeedbackComp;
