import useGetAllFaq from "../../../Hook/GetPublicDataHook/useGetAllFaq";

const Faqs = () => {
  const content = useGetAllFaq({});
  return (
    <>
      <div className="min-h-[80vh] max-w-[750px] mx-auto bg-gray-100 py-8 px-4  sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold mb-6">FAQ</h2>
        <div className="max-w-[97%] mx-auto">
          {content.length > 0 &&
            content.map((item, index) => (
              <div
                tabIndex={index}
                className="collapse collapse-arrow border-base-300 bg-base-200 border"
                key={index}
              >
                <div className="collapse-title text-xl font-medium">
                  {item.question}
                </div>
                <div className="collapse-content">
                  <p>{item.answer}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};
export default Faqs;
