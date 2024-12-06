import useGetTermsCondition from "../../../../Hook/GetPublicDataHook/useGetTermsCondition";

function TermsCondition() {
  const content = useGetTermsCondition({});
  return (
    <>
      <div className="min-h-[80vh] max-w-[750px] mx-auto bg-gray-100 py-8 px-4  sm:px-6 lg:px-8">
        <div className="max-w-[97%] mx-auto">
          <p dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    </>
  );
}

export default TermsCondition;
