import Container from "../../../shared/Container";
import PageHeader from "../../UI/PageHeader";
import AccountNav from "./account-nav";

const AccountLayout = ({ children }) => {
  return (
    <>
      <PageHeader pageHeader="My Account" pageSubHeader="explore" />
      <Container>
        <div className="py-16 lg:py-20 px-0 xl:max-w-screen-xl mx-auto flex  md:flex-row w-full">
          <div className="flex flex-col md:flex-row w-full">
            <AccountNav />
            <div className="md:w-4/6 2xl:w-8/12 mt-4 md:mt-0">{children}</div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default AccountLayout;
