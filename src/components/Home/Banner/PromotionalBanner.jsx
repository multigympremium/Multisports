const PromotionalBanner = () => {
  return (
    <div className='w-[90%] md:w-full mx-auto my-3  md:my-9 mb-6 md:mb-16 relative overflow-hidden'>
      <img
        src="https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbanner%2Fbanner-3.jpg&w=1920&q=100"
        className='rounded-lg h-28  object-cover md:h-full w-full'
        alt="Banner"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer"></div>
    </div>
  );
};

export default PromotionalBanner;
