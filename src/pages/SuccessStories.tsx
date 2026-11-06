import React from "react";

const images = [
  "assets/success-stories/2 done h/DEVI VARA LAKSHMI ATLA (UK).png",
  "assets/success-stories/2 done h/GAJJELA POOJA (UK).png",
  "assets/success-stories/2 done h/DEVI VARA LAKSHMI ATLA (UK).png",
  "assets/success-stories/2 done h/GAJJELA POOJA (UK).png",
  "assets/success-stories/2 done h/DEVI VARA LAKSHMI ATLA (UK).png",
  "assets/success-stories/2 done h/GAJJELA POOJA (UK).png",
];

const SuccessStories = () => {
  return (
    <>
      <section className="pt-36 pb-20 bg-gradient-to-b from-darkblue to-gray-900 text-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Success Stories
          </h1>
          <p className="text-xl text-gray-300">Study in Top UK Universities</p>
        </div>
      </section>

      <section className="w-full py-10 px-4">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 justify-items-center">
            {images.map((img, index) => (
              <div
                key={index}
                className="w-full max-w-[300px] flex justify-center items-center"
              >
                <img
                  src={img}
                  alt={`UK Success Story ${index + 1}`}
                  className="w-full h-auto object-contain rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default SuccessStories;
