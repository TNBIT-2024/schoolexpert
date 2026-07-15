import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Testimonials() {
  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Parent, Mumbai',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
      rating: 5,
      text: 'SchoolExpert made finding the perfect school for my daughter so easy! The AI recommendations were spot-on, and the parent community gave me valuable insights I couldn\'t find anywhere else.',
    },
    {
      name: 'Rajesh Kumar',
      role: 'Parent, Bangalore',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
      rating: 5,
      text: 'Moving to a new city was stressful, but SchoolExpert helped us find and enroll in a great school within weeks. The detailed school profiles and direct school communication features saved us so much time.',
    },
    {
      name: 'Anita Patel',
      role: 'Parent, Delhi',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
      rating: 5,
      text: 'The verified reviews and detailed school information gave me confidence in our choice. Being able to connect with other parents who had children in the same school was invaluable.',
    },
    {
      name: 'Vikram Reddy',
      role: 'Parent, Hyderabad',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
      rating: 5,
      text: 'I was looking for an IB school for my son, and SchoolExpert\'s advanced filters helped me narrow down exactly what I needed. The admission tracking feature kept everything organized.',
    },
    {
      name: 'Meera Iyer',
      role: 'Parent, Chennai',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80',
      rating: 5,
      text: 'As a working parent, I appreciated being able to do everything online - from research to school communication to application tracking. SchoolExpert is a complete solution!',
    },
    {
      name: 'Arjun Mehta',
      role: 'Parent, Pune',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
      rating: 5,
      text: 'The platform\'s AI understood exactly what we were looking for. We found our dream school on the first try, and the enrollment process was seamless. Highly recommended!',
    },
  ];

  return (
    <div className="py-24 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl mb-4">
            What{' '}
            <span className="text-amber-600">
              Parents Say
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of satisfied parents who found their perfect school through SchoolExpert
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200/50 relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 text-slate-200/60">
                <Quote className="w-12 h-12" />
              </div>

              {/* Rating */}
              <div className="flex space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-700 mb-6 leading-relaxed relative z-10">{testimonial.text}</p>

              {/* Author */}
              <div className="flex items-center space-x-4">
                <ImageWithFallback
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-slate-200/50"
                />
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
