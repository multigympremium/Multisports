import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { useAuth } from "../../providers/AuthProvider";
import { GrConfigure } from "react-icons/gr";
import { IoCallSharp, IoSettingsSharp } from "react-icons/io5";
import { TbLayoutDashboardFilled, TbShoppingCartCog } from "react-icons/tb";
import { AiOutlineAppstoreAdd, AiOutlineFileAdd, AiOutlineInfoCircle } from "react-icons/ai";
import { BiCategoryAlt, BiSolidCategory } from "react-icons/bi";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { HiMiniShoppingBag } from "react-icons/hi2";
import { FaBalanceScaleRight, FaBlogger, FaBoxOpen, FaFileContract, FaImage, FaList, FaUsers } from "react-icons/fa";
import { RiEBike2Fill } from "react-icons/ri";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaCircleInfo, FaQuoteLeft, FaShop } from "react-icons/fa6";
import { GoDash } from "react-icons/go";


function MenuItemsList({ userRole }) {
  const [permissionData, setPermissionData] = useState([]);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [groupNames, setGroupNames] = useState([]);
  const isAllowedRoute = (pathName) => {
    const isAllowed =
      permissionData &&
      permissionData.length > 0 &&
      permissionData.find((item) => item.path === pathName)?.isAllowed;

    if (user?.role === "admin") {
      return true;
    }

    return isAllowed || false;
  };

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const response = await axiosSecure.get(
          `/permissions/${user?.role}?branch=${user.branch}`
        );

        const permissionRoutesArray = response?.data?.routesData.map(
          (item) => item.path
        );

        localStorage.setItem(
          "permissionRoutes",
          JSON.stringify(permissionRoutesArray)
        );

        setPermissionData(response?.data?.routesData);
        setGroupNames(response?.data?.groupNames?.allowedGroups);
      } catch (error) {
        console.error("Error fetching permissions:", error);
      }
    };
    fetchPermissions();
  }, [user?.role, axiosSecure]);

  const allMenuItems = [
    // Website Config
    {
      title: "Website Config",
      icon: <IoSettingsSharp />,
      list: [
        {
          title: "General Info",
          path: "general-info",
          isAllowed: isAllowedRoute("general-info"),
          icon: <GoDash />,
        },
        {
          title: "Website Theme Color",
          path: "website-theme-color",
          isAllowed: isAllowedRoute("website-theme-color"),
          icon: <GoDash />,
        },
        {
          title: "Social Media Links",
          path: "social-media-links",
          isAllowed: isAllowedRoute("social-media-links"),
          icon: <GoDash />,
        },
        {
          title: "Home Page SEO",
          path: "home-page-seo",
          isAllowed: isAllowedRoute("home-page-seo"),
          icon: <GoDash />,
        },
        {
          title: "Custom CSS & JS",
          path: "custom-css-js",
          isAllowed: isAllowedRoute("custom-css-js"),
          icon: <GoDash />,
        },
        {
          title: "Social & Chat Scripts",
          path: "social-chat-scripts",
          isAllowed: isAllowedRoute("social-chat-scripts"),
          icon: <GoDash />,
        },
      ],
    },

    // E-Commerce Config
    {
      title: "E-Commerce Config",
      icon: <FaShop />,
      list: [
        {
          title: "Setup Your Config",
          path: "setup-your-config",
          isAllowed: isAllowedRoute("setup-your-config"),
          icon: <GoDash />,
        },
        {
          title: "Product Sizes",
          path: "product-sizes",
          isAllowed: isAllowedRoute("product-sizes"),
          icon: <GoDash />,
        },
        {
          title: "Product Colors",
          path: "product-colors",
          isAllowed: isAllowedRoute("product-colors"),
          icon: <GoDash />,
        },
        {
          title: "Measurement Units",
          path: "measurement-units",
          isAllowed: isAllowedRoute("measurement-units"),
          icon: <GoDash />,
        },
        {
          title: "Product Brands",
          path: "product-brands",
          isAllowed: isAllowedRoute("product-brands"),
          icon: <GoDash />,
        },
        {
          title: "Models of Brand",
          path: "models-of-brand",
          isAllowed: isAllowedRoute("models-of-brand"),
          icon: <GoDash />,
        },
        {
          title: "Product Flags",
          path: "product-flags",
          isAllowed: isAllowedRoute("product-flags"),
          icon: <GoDash />,
        },
        {
          title: "Discount",
          path: "discount",
          isAllowed: isAllowedRoute("discount"),
          icon: <GoDash />,
        },
      ],
    },
    // Category
    {
      title: "Category",
      icon: <BiSolidCategory />, // Replace with the actual SVG icon
      list: [
        {
          title: "Create",
          path: "create-categories",
          isAllowed: isAllowedRoute("create-categories"),
          icon: <GoDash />, // Replace with the actual SVG icon
        },
        {
          title: "View All",
          path: "view-all-categories",
          isAllowed: isAllowedRoute("view-all-categories"),
          icon: <GoDash />,
        },
      ],
    },
    // subcategory
    {
      title: "Child Category",
      icon: <FaList />, // Replace with the actual SVG icon
      list: [
        {
          title: "Create",
          path: "create-child-categories",
          isAllowed: isAllowedRoute("create-child-categories"),
          icon: <GoDash />, // Replace with the actual SVG icon
        },
        {
          title: "View All",
          path: "view-all-child-categories",
          isAllowed: isAllowedRoute("view-all-child-categories"),
          icon: <GoDash />,
        },
      ],
    },

    // child category
    {
      title: "Subcategory",
      icon: <HiOutlineMenuAlt2 />, // Replace with the actual SVG icon
      list: [
        {
          title: "Create",
          path: "create-subcategories",
          isAllowed: isAllowedRoute("create-subcategories"),
          icon: <GoDash />, // Replace with the actual SVG icon
        },
        {
          title: "View All",
          path: "view-all-subcategories",
          isAllowed: isAllowedRoute("view-all-subcategories"),
          icon: <GoDash />,
        },
      ],
    },

    // Manage Product
    {
      title: "Manage Product",
      icon: <HiMiniShoppingBag />, // Replace with the actual SVG icon
      list: [
        {
          title: "Create Product",
          path: "create-product",
          isAllowed: isAllowedRoute("create-product"),
          icon: <GoDash />, // Replace with the actual SVG icon
        },
        {
          title: "View All Products",
          path: "view-all-products",
          isAllowed: isAllowedRoute("view-all-products"),
          icon: <GoDash />,
        },
        // {
        //   title: "Bulk Upload",
        //   path: "bulk-product",
        //   isAllowed: isAllowedRoute("bulk-product"),
        //   icon: <GoDash />,
        // },
        // {
        //   title: "Product Ratings And Review",
        //   path: "ratings-review",
        //   isAllowed: isAllowedRoute("ratings-review"),
        //   icon: <GoDash />,
        // },
      ],
    },
    // Orders
    {
      title: "Manage Orders",
      icon: <FaBoxOpen />, // Replace with the actual SVG icon
      list: [
        {
          title: "All Orders",
          path: "all-orders",
          isAllowed: isAllowedRoute("all-orders"),
          icon: <GoDash />, // Replace with the actual SVG icon
        },
        {
          title: "Pending Orders",
          path: "pending-orders",
          isAllowed: isAllowedRoute("pending-orders"),
          icon: <GoDash />,
        },
        {
          title: "Packaging",
          path: "approved-orders",
          isAllowed: isAllowedRoute("approved-orders"),
          icon: <GoDash />,
        },
        {
          title: "Ready To Deliver",
          path: "personalized-orders",
          isAllowed: isAllowedRoute("personalized-orders"),
          icon: <GoDash />,
        },

        {
          title: "Delivered",
          path: "delivered-orders",
          isAllowed: isAllowedRoute("delivered-orders"),
          icon: <GoDash />,
        },
        {
          title: "Successful Orders",
          path: "completed-orders",
          isAllowed: isAllowedRoute("completed-orders"),
          icon: <GoDash />,
        },
        {
          title: "Return Orders",
          path: "cancelled-orders",
          isAllowed: isAllowedRoute("cancelled-orders"),
          icon: <GoDash />,
        },
        // {
        //   title: "Payment History",
        //   path: "payment-history",
        //   isAllowed: isAllowedRoute("payment-history"),
        //   icon: <GoDash />,
        // },
      ],
    },
    {
      title: "Couriers",
      icon: <RiEBike2Fill />, // Replace with the actual SVG icon
      list: [
        {
          title: "Pathao Courier Settings",
          path: "courier-pathao-settings",
          isAllowed: isAllowedRoute("courier-pathao-settings"),
          icon: <GoDash />,
        },
        {
          title: "SteadFast Courier Settings",
          path: "courier-steadfast-settings",
          isAllowed: isAllowedRoute("courier-steadfast-settings"),
          icon: <GoDash />,
        },
        // {
        //   title: "Store",
        //   path: "view-all-stores",
        //   isAllowed: isAllowedRoute("view-all-stores"),
        //   icon: <GoDash />, // Replace with the actual SVG icon
        // },
        {
          title: "Cities",
          path: "view-all-cities",
          isAllowed: isAllowedRoute("view-all-stores"),
          icon: <GoDash />, // Replace with the actual SVG icon
        },
        // {
        //   title: "Create Store",
        //   path: "create-store",
        //   isAllowed: isAllowedRoute("create-store"),
        //   icon: <GoDash />,
        // },
      ],
    },
    {
      title: "Customers",
      icon: <BsFillPeopleFill />, // Replace with the actual SVG icon
      list: [
        {
          title: "View All Customers",
          path: "all-customers",
          isAllowed: isAllowedRoute("all-customers"),
          icon: <GoDash />, // Replace with the actual SVG icon
        },
        {
          title: "Customer's Wishlist",
          path: "customers-wishlist",
          isAllowed: isAllowedRoute("customers-wishlist"),
          icon: <GoDash />, // Replace with the actual SVG icon
        },
        {
          title: "Delivery Charges",
          path: "delivery-charges",
          isAllowed: isAllowedRoute("delivery-charges"),
          icon: <GoDash />,
        },
        // {
        //   title: "Upazila & Thana",
        //   path: "upazila-thana",
        //   isAllowed: isAllowedRoute("upazila-thana"),
        //   icon: <GoDash />,
        // },
        // {
        //   title: "Payment History",
        //   path: "payment-history",
        //   isAllowed: isAllowedRoute("payment-history"),
        //   icon: <GoDash />,
        // },
      ],
    },
    // Customers
    // {
    //   title: "Promo",
    //   icon: <GoDash />, // Replace with the actual SVG icon
    //   list: [
    //     {
    //       title: "Create Promo Code",
    //       path: "create-promo-code",
    //       isAllowed: isAllowedRoute("create-promo-code"),
    //       icon: <GoDash />, // Replace with the actual SVG icon
    //     },
    //     {
    //       title: "View All Promo Code",
    //       path: "view-all-promo-code",
    //       isAllowed: isAllowedRoute("view-all-promo-code"),
    //       icon: <GoDash />,
    //     },
    //   ],
    // },
    // Sms Service
    // {
    //   title: "SMS Service",
    //   icon: <GoDash />, // Replace with the actual SVG icon
    //   list: [
    //     {
    //       title: "Send SMS",
    //       path: "send-sms",
    //       isAllowed: isAllowedRoute("send-sms"),
    //       icon: <GoDash />, // Replace with the actual SVG icon
    //     },
    //     {
    //       title: "SMS Templates",
    //       path: "sms-templates",
    //       isAllowed: isAllowedRoute("sms-templates"),
    //       icon: <GoDash />,
    //     },
    //     {
    //       title: "SMS History",
    //       path: "sms-history",
    //       isAllowed: isAllowedRoute("sms-history"),
    //       icon: <GoDash />, // Replace with the actual SVG icon
    //     },
    //   ],
    // },

    //
    // {
    //   title: "Gateway & API",
    //   icon: <GoDash />, // Replace with the actual SVG icon
    //   list: [
    //     {
    //       title: "Email Configurations",
    //       path: "email-configurations",
    //       isAllowed: isAllowedRoute("email-configurations"),
    //       icon: <GoDash />,
    //     },
    //     {
    //       title: "Email Templates",
    //       path: "email-templates",
    //       isAllowed: isAllowedRoute("email-templates"),
    //       icon: <GoDash />,
    //     },
    //     {
    //       title: "Payment Gateway",
    //       path: "payment-gateway",
    //       isAllowed: isAllowedRoute("payment-gateway"),

    //       icon: <GoDash />,
    //     },
    //     {
    //       title: "SMS Gateway",
    //       path: "sms-gateway",
    //       isAllowed: isAllowedRoute("sms-gateway"),

    //       icon: <GoDash />,
    //     },
    //   ],
    // },
    // Generate Report
    // {
    //   title: "Generate Report",
    //   icon: <GoDash />, // Replace with the actual SVG icon
    //   list: [
    //     {
    //       title: "Sales Report",
    //       path: "sales-report",
    //       isAllowed: isAllowedRoute("sales-report"),
    //       icon: <GoDash />,
    //     },
    //     {
    //       title: "Transactions",
    //       path: "transactions",
    //       isAllowed: isAllowedRoute("transactions"),
    //       icon: <GoDash />,
    //     },
    //   ],
    // },

    // Download Backup
    // {
    //   title: "Download Backup",
    //   icon: <GoDash />, // Replace with the actual SVG icon
    //   list: [
    //     {
    //       title: "Database Backup",
    //       path: "database-backup",
    //       isAllowed: isAllowedRoute("database-backup"),
    //       icon: <GoDash />,
    //     },
    //     {
    //       title: "Product Images Backup",
    //       path: "product-images-backup",
    //       isAllowed: isAllowedRoute("product-images-backup"),
    //       icon: <GoDash />,
    //     },
    //     {
    //       title: "User Images Backup",
    //       path: "user-images-backup",
    //       isAllowed: isAllowedRoute("user-images-backup"),
    //       icon: <GoDash />,
    //     },
    //     {
    //       title: "Banner Images Backup",
    //       path: "banner-images-backup",
    //       isAllowed: isAllowedRoute("banner-images-backup"),
    //       icon: <GoDash />,
    //     },
    //     {
    //       title: "Category Icon Backup",
    //       path: "category-icon-backup",
    //       isAllowed: isAllowedRoute("category-icon-backup"),
    //       icon: <GoDash />,
    //     },
    //     {
    //       title: "Subcategory Backup",
    //       path: "subcategory-backup",
    //       isAllowed: isAllowedRoute("subcategory-backup"),
    //       icon: <GoDash />,
    //     },
    //     {
    //       title: "Flag Icon Backup",
    //       path: "flag-icon-backup",
    //       isAllowed: isAllowedRoute("flag-icon-backup"),
    //       icon: <GoDash />,
    //     },
    //     // {
    //     //   title: "Ticket Files Backup",
    //     //   path: "ticket-files-backup",
    //     //   isAllowed: isAllowedRoute("ticket-files-backup"),
    //     //   icon: <GoDash />,
    //     // },
    //     {
    //       title: "Blog Files Backup",
    //       path: "blog-files-backup",
    //       isAllowed: isAllowedRoute("blog-files-backup"),
    //       icon: <GoDash />,
    //     },
    //     {
    //       title: "Other Images Backup",
    //       path: "other-images-backup",
    //       isAllowed: isAllowedRoute("other-images-backup"),
    //       icon: <GoDash />,
    //     },
    //   ],
    // },

    // CRM Modules
    // {
    //   title: "Support Ticket",
    //   icon: <GoDash />, // Replace with the actual SVG icon
    //   list: [
    //     {
    //       title: "Pending Supports",
    //       path: "pending-supports",
    //       isAllowed: isAllowedRoute("pending-supports"),
    //       icon: <GoDash />,
    //     },
    //     {
    //       title: "Solved Supports",
    //       path: "solved-supports",
    //       isAllowed: isAllowedRoute("solved-supports"),
    //       icon: <GoDash />,
    //     },
    //     {
    //       title: "On Hold Supports",
    //       path: "on-hold-supports",
    //       isAllowed: isAllowedRoute("on-hold-supports"),
    //       icon: <GoDash />,
    //     },
    //     {
    //       title: "Rejected Supports",
    //       path: "rejected-supports",
    //       isAllowed: isAllowedRoute("rejected-supports"),
    //       icon: <GoDash />,
    //     },
    //   ],
    // },

    {
      title: "Contact Request",
      icon: <IoCallSharp />, // Replace with the actual SVG icon
      list: [
        {
          title: "Contact Request",
          path: "contact-request",
          isAllowed: isAllowedRoute("contact-request"),
          icon: <GoDash />,
        },
        // {
        //   title: "Subscribed Users",
        //   path: "subscribed-users",
        //   isAllowed: isAllowedRoute("subscribed-users"),
        //   icon: <GoDash />,
        // },
      ],
    },

    // Content Management
    {
      title: "Sliders & Banners",
      icon: <FaImage />, // Replace with the actual SVG icon
      list: [
        {
          title: "View All Bag Banners",
          path: "view-all-bag-banners",
          isAllowed: isAllowedRoute("view-all-bag-banners"),
          icon: <GoDash />,
        },
        {
          title: "View All Popular Banners",
          path: "view-all-popular-banners",
          isAllowed: isAllowedRoute("view-all-popular-banners"),
          icon: <GoDash />,
        },
        {
          title: "View All Best Selling Banners",
          path: "view-all-best-selling-banners",
          isAllowed: isAllowedRoute("view-all-best-selling-banners"),
          icon: <GoDash />,
        },
        {
          title: "View All Special Discount Banners",
          path: "view-all-special-discount-banners",
          isAllowed: isAllowedRoute("view-all-special-discount-banners"),
          icon: <GoDash />,
        },
        {
          title: "View New Arrivals Banners",
          path: "new-arrival-banner",
          isAllowed: isAllowedRoute("new-arrival-banner"),
          icon: <GoDash />,
        },
        {
          title: "View All Shoes Banners",
          path: "view-all-shoes-banners",
          isAllowed: isAllowedRoute("view-all-shoes-banners"),
          icon: <GoDash />,
        },
        {
          title: "View All Banners",
          path: "view-all-banners",
          isAllowed: isAllowedRoute("view-all-banners"),
          icon: <GoDash />,
        },
        {
          title: "Promotional Banner",
          path: "promotional-banner",
          isAllowed: isAllowedRoute("promotional-banner"),
          icon: <GoDash />,
        },
      ],
    },

    {
      title: "Testimonials",
      icon: <FaQuoteLeft />, // Replace with the actual SVG icon
      list: [
        {
          title: "Add New Testimonial",
          path: "add-new-testimonial",
          isAllowed: isAllowedRoute("add-new-testimonial"),
          icon: <GoDash />,
        },
        {
          title: "View All Testimonials",
          path: "view-all-testimonials",
          isAllowed: isAllowedRoute("view-all-testimonials"),
          icon: <GoDash />,
        },
      ],
    },

    {
      title: "Manage Blogs",
      icon: <FaBlogger />, // Replace with the actual SVG icon
      list: [
        {
          title: "Blog Categories",
          path: "blog-categories",
          isAllowed: isAllowedRoute("blog-categories"),
          icon: <GoDash />,
        },
        {
          title: "Write a Blog",
          path: "write-blog",
          isAllowed: isAllowedRoute("write-blog"),
          icon: <GoDash />,
        },
        {
          title: "View All Blogs",
          path: "view-all-blogs",
          isAllowed: isAllowedRoute("view-all-blogs"),
          icon: <GoDash />,
        },
      ],
    },

    {
      title: "Terms & Policies",
      icon: <FaBalanceScaleRight />, // Replace with the actual SVG icon
      list: [
        {
          title: "Terms & Condition",
          path: "terms-condition",
          isAllowed: isAllowedRoute("terms-condition"),
          icon: <GoDash />,
        },
        {
          title: "Privacy Policy",
          path: "privacy-policy",
          isAllowed: isAllowedRoute("privacy-policy"),
          icon: <GoDash />,
        },
        {
          title: "Shipping Policy",
          path: "shipping-policy",
          isAllowed: isAllowedRoute("shipping-policy"),
          icon: <GoDash />,
        },
        {
          title: "Return Policy",
          path: "return-policy",
          isAllowed: isAllowedRoute("return-policy"),
          icon: <GoDash />,
        },
      ],
    },

    {
      title: "Custom Pages",
      icon: <AiOutlineFileAdd />, // Replace with the actual SVG icon
      list: [
        {
          title: "View All Pages",
          path: "view-all-pages",
          isAllowed: isAllowedRoute("view-all-pages"),
          icon: <GoDash />,
        },
      ],
    },

    {
      title: "About Us",
      icon: <FaCircleInfo />, // Replace with the actual SVG icon
      list: [
        {
          title: "About Us",
          path: "about-us",
          isAllowed: isAllowedRoute("about-us"),
          icon: <GoDash />,
        },
        {
          title: "FAQ's",
          path: "faqs",
          isAllowed: isAllowedRoute("faqs"),
          icon: <GoDash />,
        },
      ],
    },

    // User Role Permission
    {
      title: "System Users",
      icon: <FaUsers />, // Replace with the actual SVG icon
      list: [
        {
          title: "System Users",
          path: "system-users",
          isAllowed: isAllowedRoute("system-users"),
          icon: <GoDash />,
        },
        {
          title: "Permission Routes",
          path: "permission-routes",
          isAllowed: isAllowedRoute("permission-routes"),
          icon: <GoDash />,
        },
        {
          title: "User Roles",
          path: "user-roles",
          isAllowed: isAllowedRoute("user-roles"),
          icon: <GoDash />,
        },
        // {
        //   title: "Assign Role Permission",
        //   path: "assign-role-permission",
        //   isAllowed: isAllowedRoute("assign-role-permission"),
        //   icon: <GoDash />,
        // },
      ],
    },

    // Demo Products
    // {
    //   title: "Demo Products",
    //   icon: <GoDash />, // Replace with the actual SVG icon
    //   list: [
    //     {
    //       title: "Generate Products",
    //       path: "generate-products",
    //       isAllowed: isAllowedRoute("generate-products"),
    //       icon: <GoDash />,
    //     },
    //     {
    //       title: "Remove Demo Products",
    //       path: "remove-demo-products",
    //       isAllowed: isAllowedRoute("remove-demo-products"),
    //       icon: <GoDash />,
    //     },
    //   ],
    // },

    // Dashboard
    // {
    //   title: "Dashboard",
    //   icon: <GoDash />, // Replace with the actual SVG icon
    //   path: "dashboard",
    //   isAllowed: isAllowedRoute("dashboard"),
    // },
  ];
  const filterMenuData =
    groupNames &&
    groupNames.length > 0 &&
    allMenuItems.filter((item) => groupNames.includes(item.title));

  const filterMenuData2 =
    groupNames &&
    groupNames.length > 0 &&
    filterMenuData.map((item) => {
      const filteredItem = item.list.filter((item2) => {
        return item2.isAllowed === true;
      });
      return {
        title: item.title,
        icon: item.icon,
        list: filteredItem,
      };
    });

  // setFilteredMenuItems(filterMenuData2);

  if (user?.role === "admin") {
    return allMenuItems;
  } else {
    // return filterMenuData2 && filterMenuData2;
    if (filterMenuData2?.length > 0) {
      return filterMenuData2;
    } else {
      return [];
    }
  }

  return allMenuItems;
}

export default MenuItemsList;
