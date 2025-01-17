import { AnimatedTestimonials } from "./AnimatedTestimonials";

export function AnimatedTestimonialsDemo() {
  const testimonials = [
    {
      quote:
        "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
      name: "Tahjib Hossain",
      designation: "Product Manager at TechFlow",
      src: "/me.jpg",
    },
    {
      quote:
        "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
      name: "Ashiqur Rahman",
      designation: "CTO at InnovateSphere",
      src: "/ashiq.jpg",
    },
    {
      quote:
        "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
      name: "Apurba Bashundhara",
      designation: "Operations Director at CloudScale",
      src: "/apurba.jpg",
    },
    {
      quote:
        "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
      name: "Tanzim Married",
      designation: "Engineering Lead at DataPro",
      src: "/tanzim.jpg",
    },
  ];
  return <AnimatedTestimonials testimonials={testimonials} />;
}
