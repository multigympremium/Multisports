import GeneralInfoForm from "../../../components/dashboard/generalInfoComponents/GeneralInfoForm";

export default function CompanyInformation() {
  return (
    <div className="container w-full  mx-auto p-6  pt-0">
      <h1 className="md:text-3xl header text-xl font-semibold mb-4">Company Information</h1>
      <div className="mt-4 md:mt-9">
        <GeneralInfoForm />
      </div>
    </div>
  );
}
