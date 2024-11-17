import GeneralInfoForm from "../../../components/dashboard/generalInfoComponents/GeneralInfoForm";

export default function CompanyInformation() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-4">Company Information</h1>
      <div className="mt-9">
        <GeneralInfoForm />
      </div>
    </div>
  );
}
