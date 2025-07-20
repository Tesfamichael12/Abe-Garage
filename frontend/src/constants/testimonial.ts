export interface Testimonial {
  image: string;
  name: string;
  quote: string;
}

export const testimonials: Testimonial[] = [
  {
    image: "/images/icon-1.png",
    name: "Emma Rodriguez",
    quote:
      "As a car enthusiast, I'm very particular about who works on my vehicles. Abe Garage has proven to be trustworthy and skilled. Their diagnostic capabilities and repair work are top-notch.",
  },
  {
    image: "/images/icon-1.png",
    name: "Sarah Williams",
    quote:
      "The team at Abe Garage has been exceptional in maintaining our fleet vehicles. Their attention to detail and professional service has exceeded our expectations. We highly recommend their services to any business looking for reliable automotive care.",
  },
  {
    image: "/images/icon-1.png",
    name: "David Chen",
    quote:
      "I've been bringing my cars here for over 10 years. The quality of work and customer service is consistently outstanding. They always explain what needs to be done and never try to upsell unnecessary services.",
  },
];
