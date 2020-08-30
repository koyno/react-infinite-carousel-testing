import React from "react";
import InfiniteCarousel from "react-leaf-carousel";

export default function App() {
  return (
    <InfiniteCarousel
    swipe
    lazyLoad
    dots
    //showSides
    breakpoints={[
      {
        breakpoint: 768,
        settings: {
          slidesToScroll: 2,
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToScroll: 3,
          slidesToShow: 3,
        },
      },
    ]}
    animationDuration={0}
    slidesToScroll={4}
    slidesToShow={4}
    >
    
      {[...Array(24)].map((value, index) => (
        <div key={index}>
          <img data-testid={"img" + index} src={"https://picsum.photos/200?random=" + index} alt="image" />
        </div>
      ))}

    </InfiniteCarousel>
  );
}
