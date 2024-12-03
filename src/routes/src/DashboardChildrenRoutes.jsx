import { lazy, Suspense } from "react";
import GlobalLoading from "../../components library/GlobalLoading";
const ShopSettings = lazy(() =>
  import("../../components/dashboard/ShopSettings/ShopSettings")
);
const ModelOfBrand = lazy(() =>
  import("../../components/dashboard/ModelOfBrand/ModelOfBrand")
);
const ViewAllStores = lazy(() =>
  import("../../components/dashboard/ManageCourier/ViewAllStore")
);
const StoreCreateForm = lazy(() =>
  import("../../components/dashboard/ManageCourier/forms/StoreCreateForm")
);
const ViewAllCities = lazy(() =>
  import("../../components/dashboard/ManageCourier/ViewAllCities")
);
const ViewAllZones = lazy(() =>
  import("../../components/dashboard/ManageCourier/ViewAllZones")
);
const ViewAllArea = lazy(() =>
  import("../../components/dashboard/ManageCourier/ViewAllArea")
);
const UserPermission = lazy(() =>
  import("../../components/dashboard/UserPermission/Userpermission")
);
const StaffRole = lazy(() =>
  import("../../components/dashboard/UserPermission/StaffRole")
);
const ProductPage = lazy(() =>
  import("../../components/Home/Products/ProductPage")
);
const PrivateRoute = lazy(() => import("./routes/PrivateRoute"));
const CancelOrders = lazy(() =>
  import("../../components/dashboard/ManageOrders/CancelOrders")
);
const Change_Password = lazy(() =>
  import("../../pages/User_Dashboard/Change_Password")
);
const UserRoleList = lazy(() =>
  import("../../components/dashboard/SystemUsers/UserRoleList")
);
const ViewAllBlogs = lazy(() =>
  import("../../components/dashboard/Blogs/ViewAllBlogs/ViewAllBlogs")
);
const ViewAllProducts = lazy(() =>
  import("../../components/dashboard/ManageProduct/ViewAllProducts")
);
const AllOrders = lazy(() =>
  import("../../components/dashboard/ManageOrders/AllOrders")
);
const AboutAdmin = lazy(() => import("../../pages/OtherPage/about-us/page"));
const CreateTestimonials = lazy(() =>
  import("../../pages/OtherPage/add-new-testimonial/page")
);
const AllCustomers = lazy(() =>
  import("../../pages/OtherPage/all-custormers/page")
);
const ApprovedOrders = lazy(() =>
  import("../../components/dashboard/ManageOrders/ApprovedOrders")
);
const AssignUserRolePermission = lazy(() =>
  import("../../components/dashboard/SystemUsers/AssignUserRolePermission")
);
const BannerImagesBackup = lazy(() =>
  import("../../pages/OtherPage/banner-images-backup/page")
);
const BlogCategories = lazy(() =>
  import("../../components/dashboard/Blogs/BlogCategories/BlogCategories")
);
const BlogFilesBackup = lazy(() =>
  import("../../pages/OtherPage/blog-files-backup/page")
);
const BulkUpload = lazy(() =>
  import("../../components/dashboard/ManageProduct/BulkUpload")
);
const CategoryIconBackup = lazy(() =>
  import("../../pages/OtherPage/category-icon-backup/page")
);
const ContactRequestsList = lazy(() =>
  import("../../components/dashboard/ContactRequest/ContactUsers")
);
const CategoryCreateForm = lazy(() =>
  import("../../components/dashboard/CategoryComponents/CategoryCreateForm")
);
const ChildCategoryCreateForm = lazy(() =>
  import(
    "../../components/dashboard/ChildCategoryComponent/ChildCategoryCreateForm"
  )
);
const CustomPageCreateForm = lazy(() =>
  import("../../components/dashboard/CustomPages/CustomPageCreateForm")
);
const ProductCreateForm = lazy(() =>
  import("../../components/dashboard/ManageProduct/CreateProductForm")
);
const CreatePromoCodeForm = lazy(() =>
  import("../../components/dashboard/PromoCode/CreatePromoCodeForm")
);
const SubcategoryCreateForm = lazy(() =>
  import(
    "../../components/dashboard/SubCategoryComponents/CreateSubCategoryFrom"
  )
);
const CustomCSSJSForm = lazy(() =>
  import("../../components/dashboard/CustomCssJsForm/CustomCssJsForm")
);
const CustomerWishlist = lazy(() =>
  import("../../components/dashboard/Customers/CustomerWishlist")
);
const DatabaseBackup = lazy(() =>
  import("../../pages/OtherPage/database-backup/page")
);
const DeliveryCharges = lazy(() =>
  import("../../components/dashboard/Customers/DeliveryCharges")
);
const EmailConfigurations = lazy(() =>
  import("../../components/dashboard/Gateway & Api/EmailConfigaration")
);
const EmailTemplates = lazy(() =>
  import("../../components/dashboard/Gateway & Api/EmailTemplates")
);
const FAQList = lazy(() => import("../../components/dashboard/FAQ/FAQList"));
const FlagIconBackup = lazy(() =>
  import("../../pages/OtherPage/flag-icon-backup/page")
);
const CompanyInformation = lazy(() =>
  import("../../pages/OtherPage/general-info/page")
);
const GenerateDemoProducts = lazy(() =>
  import("../../components/dashboard/DemoProduct/GenerateDemoProducts")
);
const SeoPage = lazy(() => import("../../pages/OtherPage/home-page-seo/page"));
const MeasurementUnits = lazy(() =>
  import("../../components/dashboard/MeasurementUnits/MeasurementUnits")
);
const OnHoldSupport = lazy(() =>
  import("../../components/dashboard/SupportTicket/OnHoldSupport")
);
const OtherImagesBackup = lazy(() =>
  import("../../pages/OtherPage/other-images-backup/page")
);
const PaymentGateways = lazy(() =>
  import("../../components/dashboard/Gateway & Api/PaymentGateway")
);
const PaymentHistory = lazy(() =>
  import("../../components/dashboard/Customers/PaymentHistory")
);
const PendingOrders = lazy(() =>
  import("../../components/dashboard/ManageOrders/PendingOrders")
);
const PendingSupport = lazy(() =>
  import("../../components/dashboard/SupportTicket/PendingSupport")
);
const PreviousNotifications = lazy(() =>
  import("../../components/dashboard/Push Notification/PreviousNotification")
);
const PrivacyPolicy = lazy(() =>
  import("../../components/dashboard/TermAndPolicies/PrivacyPolicy")
);
const ProductBrands = lazy(() =>
  import("../../components/dashboard/Brands/ProductBrands")
);
const ProductColors = lazy(() =>
  import("../../components/dashboard/ProductColor/ProductColors")
);
const ProductFlag = lazy(() =>
  import("../../components/dashboard/ProductFlag/ProductFlag")
);
const ProductImageBackup = lazy(() =>
  import("../../pages/OtherPage/product-images-backup/page")
);
const ProductQuestionAnswer = lazy(() =>
  import("../../components/dashboard/ManageProduct/ProductQuestionAnswer")
);
const ProductSize = lazy(() =>
  import("../../components/dashboard/ProductSize/ProductSize")
);
const PromotionalBanner = lazy(() =>
  import("../../components/dashboard/SliderAndBanner/PromotionalBanner")
);
const RatingsReview = lazy(() =>
  import("../../components/dashboard/ManageProduct/RatingsReview")
);
const RejectedSupport = lazy(() =>
  import("../../components/dashboard/SupportTicket/RejectedSupport")
);
const RemoveDemoProducts = lazy(() =>
  import("../../components/dashboard/DemoProduct/RemoveDemoProduct")
);
const ReturnPolicy = lazy(() =>
  import("../../components/dashboard/TermAndPolicies/ReturnPolicy")
);
const SendNotification = lazy(() =>
  import("../../components/dashboard/Push Notification/SendNotification")
);
const SendSMS = lazy(() =>
  import("../../components/dashboard/SMS Service/SendSms")
);
const SetupConfigPage = lazy(() =>
  import("../../pages/OtherPage/setup-your-config/page")
);
const ShippingPolicy = lazy(() =>
  import("../../components/dashboard/TermAndPolicies/ShippingPolicy")
);
const SmsGateways = lazy(() =>
  import("../../components/dashboard/Gateway & Api/SMS_Gateway")
);
const SmsHistory = lazy(() =>
  import("../../components/dashboard/SMS Service/SMS_History")
);
const SMSTemplates = lazy(() =>
  import("../../components/dashboard/SMS Service/SMSTemplates")
);
const SocialChatAndScript = lazy(() =>
  import(
    "../../components/dashboard/SocialChatAndScriptComponents/SocialChatAndScript"
  )
);
const SocialMedia = lazy(() =>
  import("../../pages/OtherPage/social-media-links/page")
);
const SolvedSupport = lazy(() =>
  import("../../components/dashboard/SupportTicket/SolvedSupport")
);
const SubcategoryBackup = lazy(() =>
  import("../../pages/OtherPage/subcategory-backup/page")
);
const SubscribedUsersList = lazy(() =>
  import("../../components/dashboard/ContactRequest/SubscribeUsers")
);
const SystemUsers = lazy(() =>
  import("../../components/dashboard/SystemUsers/SystemUsers")
);
const TermsConditionForm = lazy(() =>
  import("../../components/dashboard/TermAndPolicies/TermsConditionForm")
);
const TicketFilesBackup = lazy(() =>
  import("../../pages/OtherPage/ticket-files-backup/page")
);
const UpazilaThanaList = lazy(() =>
  import("../../components/dashboard/Customers/UpazilaThana")
);
const UserImagesBackup = lazy(() =>
  import("../../pages/OtherPage/user-images-backup/page")
);
const BagBanners = lazy(() =>
  import("../../components/dashboard/SliderAndBanner/BagBanner/BagBanners")
);
const AllBanners = lazy(() =>
  import("../../pages/OtherPage/view-all-banners/page")
);
const CategoryList = lazy(() =>
  import("../../components/dashboard/CategoryComponents/ViewAllCategory")
);
const ChildCategoryList = lazy(() =>
  import(
    "../../components/dashboard/ChildCategoryComponent/ViewAllChildCategories"
  )
);
const CustomPageList = lazy(() =>
  import("../../components/dashboard/CustomPages/CustomPageList")
);
const ViewAllPromoCode = lazy(() =>
  import("../../components/dashboard/PromoCode/ViewAllPromoCode")
);
const ShoesBanners = lazy(() =>
  import("../../components/dashboard/SliderAndBanner/ShoesBanner/ShoesBanners")
);
const SliderList = lazy(() =>
  import("../../components/dashboard/SliderAndBanner/Sliders")
);
const SubcategoryList = lazy(() =>
  import(
    "../../components/dashboard/SubCategoryComponents/ViewAllSubcategories"
  )
);
const ViewAllTestimonials = lazy(() =>
  import("../../components/dashboard/Testimonials/ViewAllTestimonials")
);
const WebsiteThemeColorForm = lazy(() =>
  import("../../components/dashboard/websiteThemeColor/WebsiteThemeColorForm")
);
const BlogCreateForm = lazy(() =>
  import("../../components/dashboard/Blogs/ViewAllBlogs/BlogCreateForm")
);

function DashboardChildrenRoutes() {
  // const axiosSecure = useAxiosSecure();

  const user = () => {
    const storedUser = localStorage.getItem("user");
    return storedUser == "undefined" || storedUser == null
      ? null
      : JSON.parse(storedUser);
  };

  console.log("user routes", user());

  const role = user()?.role || "";
  // const role = "Front Desk Officer"; // add later
  // const role = "admin"; // add later
  // const role = "Coffee Shtaff";
  // const role = "Operation Manager";

  // fetchPermissions();

  // const permissionRoutesArray = fetchPermissions();

  const isPermittedRoute = (pathName) => {
    // const isPermittedRoute = (pathName) => {
    const permissionRoutesArray = () => {
      const storedUser = localStorage.getItem("permissionRoutes");
      return storedUser == "undefined" || storedUser == null
        ? []
        : JSON.parse(storedUser);
    };
    const isAllowed = permissionRoutesArray()
      ? permissionRoutesArray().includes(pathName)
      : false;

    if (role === "admin") {
      return pathName;
    }

    // return pathName;
    return isAllowed ? pathName : "";
  };

  // console.log("filterRouteItems", filterRouteItems);
  const dashboardChildrenRoutes = [
    // errorElement: <PrivateRoute> <Error404></Error404></PrivateRoute>,
    // {
    //   path: "",
    //   element: (
    //     // <PrivateRoute>
    //     //   <Panel></Panel>
    //     // </PrivateRoute>
    //     // <InitialPage />
    //     <Suspense fallback={<GlobalLoading />}>
    //       <PrivateRoute>
    //         <HomePage />
    //       </PrivateRoute>
    //     </Suspense>
    //   ),
    // },
    {
      path: "about-us",
      element: (
        // <PrivateRoute>
        //   <Panel></Panel>
        // </PrivateRoute>
        // <InitialPage />
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <AboutAdmin />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: isPermittedRoute("add-new-testimonial"),
      path: "add-new-testimonial",
      element: (
        // <PrivateRoute>
        //   <Panel></Panel>
        // </PrivateRoute>
        // <InitialPage />
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <CreateTestimonials />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "visitor",
      path: "all-customers",
      // path: isPermittedRoute("visitor"),

      element: (
        // <PrivateRoute>
        //   <Visitor />
        // </PrivateRoute>
        // <Visitor />

        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <AllCustomers />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "workout-routine",
      path: "all-orders",
      // path: isPermittedRoute("create-workout-question-input"),
      element: (
        // <PrivateRoute>
        //   <Visitor />
        // </PrivateRoute>
        // <Workout_routine />
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <AllOrders />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "workout-routine",
      path: "approved-orders",
      // path: isPermittedRoute("workout-routine"),
      element: (
        // <PrivateRoute>
        //   <Visitor />
        // </PrivateRoute>
        // <Workout_routine />
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <ApprovedOrders />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "workout-routine",
      path: "cancelled-orders",
      // path: isPermittedRoute("workout-routine"),
      element: (
        // <PrivateRoute>
        //   <Visitor />
        // </PrivateRoute>
        // <Workout_routine />
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <CancelOrders />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "workout-routine",
      path: "assign-role-permission",
      // path: isPermittedRoute("my-workout"),
      element: (
        // <PrivateRoute>
        //   <Visitor />
        // </PrivateRoute>
        // <Workout_routine />
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <AssignUserRolePermission />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "diet-plan",
      path: "banner-images-backup",
      // path: isPermittedRoute("diet-plan"),
      element: (
        // <PrivateRoute>
        //   <Visitor />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <BannerImagesBackup />
          </PrivateRoute>
        </Suspense>
        // <p>Hellow</p>
      ),
    },
    {
      // path: "user_profile",
      path: "blog-categories",
      // path: isPermittedRoute("user_profile"),
      element: (
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <BlogCategories />
          </PrivateRoute>
        </Suspense>
      ),
    },

    {
      // path: "shedule_classes",
      path: "blog-files-backup",
      // path: isPermittedRoute("shedule_classes"),
      element: (
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <BlogFilesBackup />
          </PrivateRoute>
        </Suspense>
      ),
    },

    {
      // path: "change_password",
      path: "change_password",
      // path: isPermittedRoute("change_password"),
      element: (
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <Change_Password />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "diet-plan",
      path: "bulk-product",
      // path: isPermittedRoute("add-request-diet-plan"),
      element: (
        // <PrivateRoute>
        //   <Visitor />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <BulkUpload />
          </PrivateRoute>
        </Suspense>
        // <p>Hellow</p>
      ),
    },
    {
      // path: "add-new-user",
      path: "category-icon-backup",
      // path: isPermittedRoute("add-new-user"),
      element: (
        // <PrivateRoute>
        //   <AddNewUser />
        // </PrivateRoute>
        // <AddNewUser />
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <CategoryIconBackup />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "members",
      path: "contact-request",
      // path: isPermittedRoute("members"),
      element: (
        // <PrivateRoute>
        //   <Members />
        // </PrivateRoute>
        // <Members />
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <ContactRequestsList />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      path: "create-categories",
      // path: "add_package/:id",
      // path: isPermittedRoute("add_package/:id"),
      element: (
        // <PrivateRoute>
        //   <Members />
        // </PrivateRoute>
        // <AddPackagePage />
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <CategoryCreateForm />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "gym-staff",
      path: "create-child-categories",
      // path: isPermittedRoute("gym-staff"),

      element: (
        // <PrivateRoute>
        //   <GymStaff />
        // </PrivateRoute>
        // <GymStaff />
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <ChildCategoryCreateForm />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "assign-lockers",
      path: "create-new-page",
      // path: isPermittedRoute("assign-lockers"),
      element: (
        // <PrivateRoute>
        //   <AssignLockers />
        // </PrivateRoute>
        // <AssignLockers />
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <CustomPageCreateForm />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "manage-lockers",
      path: "create-product",
      // path: isPermittedRoute("manage-lockers"),
      element: (
        // <PrivateRoute>
        //   <ManageLockers />
        // </PrivateRoute>
        // <ManageLockers />
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <ProductCreateForm />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "locker-payments",
      path: "create-promo-code",
      // path: isPermittedRoute("locker-payments"),
      element: (
        // <PrivateRoute>
        //   <LockerPayments />
        // </PrivateRoute>
        // <LockerPayments />
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <CreatePromoCodeForm />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "invoices-billing",
      path: "create-subcategories",
      // path: isPermittedRoute("invoices-billing"),
      element: (
        // <PrivateRoute>
        //   <InvoicesBilling />
        // </PrivateRoute>
        // <InvoicesBilling />
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <SubcategoryCreateForm />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "reports",
      path: "custom-css-js",
      // path: isPermittedRoute("reports"),
      element: (
        // <PrivateRoute>
        //   <InvoicesBilling />
        // </PrivateRoute>
        // <Report />
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <CustomCSSJSForm />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "expense-tracking",
      path: "customers-wishlist",
      // path: isPermittedRoute("expense-tracking"),
      element: (
        // <PrivateRoute>
        //   <ExpenseTracking />
        // </PrivateRoute>
        // <ExpenseTracking />
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <CustomerWishlist />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "tax-management",
      path: "database-backup",
      // path: isPermittedRoute("tax-management"),
      element: (
        // <PrivateRoute>
        //   <TaxManagement />
        // </PrivateRoute>
        // <TaxManagement />
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <DatabaseBackup />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "automated-reminders",
      path: "delivery-charges",
      // path: isPermittedRoute("automated-reminders"),
      element: (
        // <PrivateRoute>
        //   <AutomatedReminders />
        // </PrivateRoute>
        // <AutomatedReminders />
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <DeliveryCharges />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "feedback-surveys",
      path: "email-configurations",
      // path: isPermittedRoute("feedback-surveys"),
      element: (
        // <PrivateRoute>
        //   <FeedbackSurveys />
        // </PrivateRoute>
        // <FeedbackSurveys />
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <EmailConfigurations />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "follow-up-scheduling",
      path: "email-templates",
      // path: isPermittedRoute("follow-up-scheduling"),

      element: (
        // <PrivateRoute>
        //   <FollowUpScheduling />
        // </PrivateRoute>
        // <FollowUpScheduling />
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <EmailTemplates />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "due-finder",
      path: "faqs",
      // path: isPermittedRoute("due-finder"),
      element: (
        // <PrivateRoute>
        //   <DueFinder />
        // </PrivateRoute>
        // <DueFinder />
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <FAQList />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "routine-library",
      path: "flag-icon-backup",
      // path: isPermittedRoute("routine-library"),

      element: (
        // <PrivateRoute>
        //   <RoutineLibrary />
        // </PrivateRoute>
        // <RoutineLibrary />
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <FlagIconBackup />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "create-routine",
      path: "general-info",
      // path: isPermittedRoute("create-routine"),
      element: (
        // <PrivateRoute>
        //   <CreateRoutine />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <CompanyInformation />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "assign-routine",
      path: "generate-products",
      // path: isPermittedRoute("assign-routine"),
      element: (
        // <PrivateRoute>
        //   <AssignRoutine />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <GenerateDemoProducts />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "track-progress",
      path: "home-page-seo",
      // path: isPermittedRoute("track-progress"),
      element: (
        // <PrivateRoute>
        //   <TrackProgress />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <SeoPage />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "diet-library",
      path: "measurement-units",
      // path: isPermittedRoute("diet-library"),
      element: (
        // <PrivateRoute>
        //   <DietLibrary />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <MeasurementUnits />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "request-diet-plan",
      path: "on-hold-supports",
      // path: isPermittedRoute("request-diet-plan"),
      element: (
        // <PrivateRoute>
        //   <CreateDietPlan />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <OnHoldSupport />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "assign-diet-plan",
      path: "other-images-backup",
      // path: isPermittedRoute("assign-diet-plan"),
      element: (
        // <PrivateRoute>
        //   <AssignDietPlan />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <OtherImagesBackup />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "track-diet-progress",
      path: "payment-gateway",
      // path: isPermittedRoute("track-diet-progress"),
      element: (
        // <PrivateRoute>
        //   <TrackDietProgress />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <PaymentGateways />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "track-diet-progress",
      path: "permission-routes",
      // path: isPermittedRoute("track-diet-progress"),
      element: (
        // <PrivateRoute>
        //   <TrackDietProgress />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <UserPermission />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "schedule-classes",
      path: "payment-history",
      // path: isPermittedRoute("schedule-classes"),
      element: (
        // <PrivateRoute>
        //   <ScheduleClasses />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <PaymentHistory />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "manage-classes",
      path: "pending-orders",
      // path: isPermittedRoute("manage-classes"),
      element: (
        // <PrivateRoute>
        //   <ManageClasses />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <PendingOrders />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "register-classes",
      path: "pending-supports",
      // path: isPermittedRoute("register-classes"),
      element: (
        // <PrivateRoute>
        //   <RegisterClasses />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <PendingSupport />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "class-attendance",
      path: "previous-notification",
      // path: isPermittedRoute("class-attendance"),

      element: (
        // <PrivateRoute>
        //   <ClassAttendance />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <PreviousNotifications />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "member-package",
      path: "privacy-policy",
      // path: isPermittedRoute("member-package"),

      element: (
        // <PrivateRoute>
        //   <MemberPackage />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <PrivacyPolicy />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "staff-role",
      path: "product-brands",
      // path: isPermittedRoute("staff-role"),
      element: (
        // <PrivateRoute>
        //   <StaffRole />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <ProductBrands />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "staff-role",
      path: "product-colors",
      // path: isPermittedRoute("payment-method"),
      element: (
        // <PrivateRoute>
        //   <StaffRole />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <ProductColors />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "staff-role",
      path: "product-flags",
      // path: isPermittedRoute("create-transaction-type"),
      element: (
        // <PrivateRoute>
        //   <StaffRole />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <ProductFlag />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "change-password",
      path: "product-images-backup",
      // path: isPermittedRoute("change-password"),
      element: (
        // <PrivateRoute>
        //   <ChangePassword />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <ProductImageBackup />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "user-migration",
      path: "product-question-answer",
      // path: isPermittedRoute("user-migration"),

      element: (
        // <PrivateRoute>
        //   <Usermigration />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <ProductQuestionAnswer />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "addworkout",
      path: "product-sizes",
      // path: isPermittedRoute("addworkout"),
      element: (
        // <PrivateRoute>
        //   <Addworkout />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <ProductSize />
          </PrivateRoute>
        </Suspense>
      ),
    },

    {
      // path: "smscampaign",
      path: "promotional-banner",
      // path: isPermittedRoute("smscampaign"),
      element: (
        // <PrivateRoute>
        //   <SmsCampaign />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <PromotionalBanner />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "smslogs",
      path: "ratings-review",
      // path: isPermittedRoute("smslogs"),
      element: (
        // <PrivateRoute>
        //   <SMSLogs />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <RatingsReview />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "sendsinglesms",
      path: "rejected-supports",
      // path: isPermittedRoute("sendsinglesms"),
      element: (
        // <PrivateRoute>
        //   <Sendsinglesms />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <RejectedSupport />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "sendgroupsms",
      path: "remove-demo-products",
      // path: isPermittedRoute("sendgroupsms"),
      element: (
        // <PrivateRoute>
        //   <Sendgroupsms />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <RemoveDemoProducts />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "userprofile",
      path: "return-policy",
      // path: isPermittedRoute("userprofile"),
      element: (
        // <PrivateRoute>
        //   <UserProfile />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <ReturnPolicy />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "companyprofile",
      path: "send-notification",
      // path: isPermittedRoute("companyprofile"),
      element: (
        // <PrivateRoute>
        //   <CompanyProfile />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <SendNotification />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "smstemplates",
      path: "send-sms",
      // path: isPermittedRoute("smstemplates"),
      element: (
        // <PrivateRoute>
        //   <Smstemplates />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <SendSMS />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "smsgroup",
      path: "setup-your-config",
      // path: isPermittedRoute("smsgroup"),

      element: (
        // <PrivateRoute>
        //   <SmsGroup />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <SetupConfigPage />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "doorreport",
      path: "shipping-policy",
      // path: isPermittedRoute("doorreport"),

      element: (
        // <PrivateRoute>
        //   <SmsGroup />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <ShippingPolicy />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "monthlydoor",
      path: "sms-gateway",
      // path: isPermittedRoute("monthlydoor"),
      element: (
        // <PrivateRoute>
        //   <SmsGroup />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <SmsGateways />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "doorhistory",
      path: "sms-history",
      // path: isPermittedRoute("unactiveuser"),
      element: (
        // <PrivateRoute>
        //   <SmsGroup />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <SmsHistory />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "doorhistory",
      path: "sms-templates",
      // path: isPermittedRoute("updateaccessinfo"),
      element: (
        // <PrivateRoute>
        //   <SmsGroup />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <SMSTemplates />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "doorhistory",
      path: "social-chat-scripts",
      // path: isPermittedRoute("announcement"),
      element: (
        // <PrivateRoute>
        //   <SmsGroup />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <SocialChatAndScript />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "dailydoor",
      path: "social-media-links",
      // path: isPermittedRoute("dailydoor"),
      element: (
        // <PrivateRoute>
        //   <SmsGroup />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <SocialMedia />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "senderid",
      path: "solved-supports",
      // path: isPermittedRoute("senderid"),
      element: (
        // <PrivateRoute>
        //   <SmsGroup />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <SolvedSupport />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "senderid",
      path: "models-of-brand",
      // path: isPermittedRoute("senderid"),
      element: (
        // <PrivateRoute>
        //   <SmsGroup />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <ModelOfBrand />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "doorhistory",
      path: "subcategory-backup",
      // path: isPermittedRoute("doorhistory"),
      element: (
        // <PrivateRoute>
        //   <SmsGroup />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <SubcategoryBackup />
          </PrivateRoute>
        </Suspense>
      ),
    },

    {
      // path: "userpermission",
      path: "subscribed-users",
      // path: isPermittedRoute("userpermission"),
      element: (
        // <PrivateRoute>
        //   <SmsGroup />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <SubscribedUsersList />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "userpermission",
      path: "system-users",
      // path: isPermittedRoute("userpermission"),
      element: (
        // <PrivateRoute>
        //   <SmsGroup />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <SystemUsers />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "userpermission",
      path: "terms-condition",
      // path: isPermittedRoute("userpermission"),
      element: (
        // <PrivateRoute>
        //   <SmsGroup />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <TermsConditionForm />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "userpermission",
      path: "ticket-files-backup",
      // path: isPermittedRoute("userpermission"),
      element: (
        // <PrivateRoute>
        //   <SmsGroup />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <TicketFilesBackup />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "userpermission",
      path: "upazila-thana",
      // path: isPermittedRoute("userpermission"),
      element: (
        // <PrivateRoute>
        //   <SmsGroup />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <UpazilaThanaList />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "userpermission",
      path: "user-images-backup",
      // path: isPermittedRoute("userpermission"),
      element: (
        // <PrivateRoute>
        //   <SmsGroup />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <UserImagesBackup />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "userpermission",
      path: "user-roles",
      // path: isPermittedRoute("userpermission"),
      element: (
        // <PrivateRoute>
        //   <SmsGroup />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            {/* <UserRoleList /> */}
            <StaffRole />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "userpermission",
      path: "view-all-bag-banners",
      // path: isPermittedRoute("userpermission"),
      element: (
        // <PrivateRoute>
        //   <SmsGroup />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <BagBanners />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "userpermission",
      path: "view-all-banners",
      // path: isPermittedRoute("userpermission"),
      element: (
        // <PrivateRoute>
        //   <SmsGroup />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <AllBanners />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "userpermission",
      path: "view-all-blogs",
      // path: isPermittedRoute("userpermission"),
      element: (
        // <PrivateRoute>
        //   <SmsGroup />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <ViewAllBlogs />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "userpermission",
      path: "view-all-categories",
      // path: isPermittedRoute("userpermission"),
      element: (
        // <PrivateRoute>
        //   <SmsGroup />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <CategoryList />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "userpermission",
      path: "view-all-child-categories",
      // path: isPermittedRoute("userpermission"),
      element: (
        // <PrivateRoute>
        //   <SmsGroup />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <ChildCategoryList />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "userpermission",
      path: "view-all-pages",
      // path: isPermittedRoute("userpermission"),
      element: (
        // <PrivateRoute>
        //   <SmsGroup />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <CustomPageList />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "userpermission",
      path: "view-all-products",
      // path: isPermittedRoute("userpermission"),
      element: (
        // <PrivateRoute>
        //   <SmsGroup />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <ViewAllProducts />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "userpermission",
      path: "view-all-promo-code",
      // path: isPermittedRoute("userpermission"),
      element: (
        // <PrivateRoute>
        //   <SmsGroup />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <ViewAllPromoCode />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "userpermission",
      path: "view-all-shoes-banners",
      // path: isPermittedRoute("userpermission"),
      element: (
        // <PrivateRoute>
        //   <SmsGroup />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <ShoesBanners />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "userpermission",
      path: "view-all-sliders",
      // path: isPermittedRoute("userpermission"),
      element: (
        // <PrivateRoute>
        //   <SmsGroup />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <SliderList />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "userpermission",
      path: "view-all-subcategories",
      // path: isPermittedRoute("userpermission"),
      element: (
        // <PrivateRoute>
        //   <SmsGroup />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <SubcategoryList />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "userpermission",
      path: "view-all-testimonials",
      // path: isPermittedRoute("userpermission"),
      element: (
        // <PrivateRoute>
        //   <SmsGroup />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <ViewAllTestimonials />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "userpermission",
      path: "website-theme-color",
      // path: isPermittedRoute("userpermission"),
      element: (
        // <PrivateRoute>
        //   <SmsGroup />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <WebsiteThemeColorForm />
          </PrivateRoute>
        </Suspense>
        // <WebsiteThemeColorForm />
      ),
    },
    {
      // path: "userpermission",
      path: "write-blog",
      // path: isPermittedRoute("userpermission"),
      element: (
        // <PrivateRoute>
        //   <SmsGroup />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <BlogCreateForm />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "userpermission",
      path: "view-all-stores",
      // path: isPermittedRoute("userpermission"),
      element: (
        // <PrivateRoute>
        //   <SmsGroup />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <ViewAllStores />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "userpermission",
      path: "view-all-cities",
      // path: isPermittedRoute("userpermission"),
      element: (
        // <PrivateRoute>
        //   <SmsGroup />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <ViewAllCities />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "userpermission",
      path: "zones/:city_id",
      // path: isPermittedRoute("userpermission"),
      element: (
        // <PrivateRoute>
        //   <SmsGroup />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <ViewAllZones />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "userpermission",
      path: "area/:zone_id",
      // path: isPermittedRoute("userpermission"),
      element: (
        // <PrivateRoute>
        //   <SmsGroup />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <ViewAllArea />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "userpermission",
      path: "shop-settings",
      // path: isPermittedRoute("userpermission"),
      element: (
        // <PrivateRoute>
        //   <SmsGroup />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <ShopSettings />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      // path: "userpermission",
      path: "create-store",
      // path: isPermittedRoute("userpermission"),
      element: (
        // <PrivateRoute>
        //   <SmsGroup />
        // </PrivateRoute>
        <Suspense fallback={<GlobalLoading />}>
          <PrivateRoute>
            <StoreCreateForm />
          </PrivateRoute>
        </Suspense>
      ),
    },
  ];

  // return role === "admin" ? dashboardChildrenRoutes : [];
  return dashboardChildrenRoutes;
}

export default DashboardChildrenRoutes;
