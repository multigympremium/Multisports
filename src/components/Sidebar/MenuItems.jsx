"use client";
import React, { useState } from "react";
import { IoIosHome } from "react-icons/io";

function MenuItemsList({ userRole }) {
  const [permissionData, setPermissionData] = useState([]);
  const isAllowedRoute = (pathName) => {
    const isAllowed =
      permissionData &&
      permissionData.length > 0 &&
      permissionData.find((item) => item.path === pathName)?.isAllowed;

    if (userRole === "admin") {
      return true;
    }

    return isAllowed || false;
  };

  const allMenuItems = [
    // Website Config
    {
      title: "Website Config",
      icon: <IoIosHome />,
      list: [
        {
          title: "General Info",
          path: "general-info",
          isAllowed: isAllowedRoute("general-info"),
          icon: <IoIosHome />,
        },
        {
          title: "Website Theme Color",
          path: "website-theme-color",
          isAllowed: isAllowedRoute("website-theme-color"),
          icon: <IoIosHome />,
        },
        {
          title: "Social Media Links",
          path: "social-media-links",
          isAllowed: isAllowedRoute("social-media-links"),
          icon: <IoIosHome />,
        },
        {
          title: "Home Page SEO",
          path: "home-page-seo",
          isAllowed: isAllowedRoute("home-page-seo"),
          icon: <IoIosHome />,
        },
        {
          title: "Custom CSS & JS",
          path: "custom-css-js",
          isAllowed: isAllowedRoute("custom-css-js"),
          icon: <IoIosHome />,
        },
        {
          title: "Social & Chat Scripts",
          path: "social-chat-scripts",
          isAllowed: isAllowedRoute("social-chat-scripts"),
          icon: <IoIosHome />,
        },
      ],
    },

    // E-Commerce Config
    {
      title: "E-Commerce Config",
      icon: <IoIosHome />,
      list: [
        {
          title: "Setup Your Config",
          path: "setup-your-config",
          isAllowed: isAllowedRoute("setup-your-config"),
          icon: <IoIosHome />,
        },
        {
          title: "Product Sizes",
          path: "product-sizes",
          isAllowed: isAllowedRoute("product-sizes"),
          icon: <IoIosHome />,
        },
        {
          title: "Product Colors",
          path: "product-colors",
          isAllowed: isAllowedRoute("product-colors"),
          icon: <IoIosHome />,
        },
        {
          title: "Measurement Units",
          path: "measurement-units",
          isAllowed: isAllowedRoute("measurement-units"),
          icon: <IoIosHome />,
        },
        {
          title: "Product Brands",
          path: "product-brands",
          isAllowed: isAllowedRoute("product-brands"),
          icon: <IoIosHome />,
        },
        {
          title: "Models of Brand",
          path: "models-of-brand",
          isAllowed: isAllowedRoute("models-of-brand"),
          icon: <IoIosHome />,
        },
        {
          title: "Product Flags",
          path: "product-flags",
          isAllowed: isAllowedRoute("product-flags"),
          icon: <IoIosHome />,
        },
      ],
    },
    // Category
    {
      title: "Category",
      icon: <IoIosHome />, // Replace with the actual SVG icon
      list: [
        {
          title: "Create Categories",
          path: "create-categories",
          isAllowed: isAllowedRoute("create-categories"),
          icon: <IoIosHome />, // Replace with the actual SVG icon
        },
        {
          title: "View All Categories",
          path: "view-all-categories",
          isAllowed: isAllowedRoute("view-all-categories"),
          icon: <IoIosHome />,
        },
      ],
    },
    // subcategory
    {
      title: "Child Category",
      icon: <IoIosHome />, // Replace with the actual SVG icon
      list: [
        {
          title: "Create Child Categories",
          path: "create-child-categories",
          isAllowed: isAllowedRoute("create-child-categories"),
          icon: <IoIosHome />, // Replace with the actual SVG icon
        },
        {
          title: "View All Child Categories",
          path: "view-all-child-categories",
          isAllowed: isAllowedRoute("view-all-child-categories"),
          icon: <IoIosHome />,
        },
      ],
    },

    // child category
    {
      title: "Subcategory",
      icon: <IoIosHome />, // Replace with the actual SVG icon
      list: [
        {
          title: "Create Subcategories",
          path: "create-subcategories",
          isAllowed: isAllowedRoute("create-subcategories"),
          icon: <IoIosHome />, // Replace with the actual SVG icon
        },
        {
          title: "View All Subcategories",
          path: "view-all-subcategories",
          isAllowed: isAllowedRoute("view-all-subcategories"),
          icon: <IoIosHome />,
        },
      ],
    },

    // Manage Product
    {
      title: "Manage Product",
      icon: <IoIosHome />, // Replace with the actual SVG icon
      list: [
        {
          title: "Create Product",
          path: "create-product",
          isAllowed: isAllowedRoute("create-product"),
          icon: <IoIosHome />, // Replace with the actual SVG icon
        },
        {
          title: "View All Products",
          path: "view-all-products",
          isAllowed: isAllowedRoute("view-all-products"),
          icon: <IoIosHome />,
        },
        {
          title: "Bulk Upload",
          path: "bulk-product",
          isAllowed: isAllowedRoute("bulk-product"),
          icon: <IoIosHome />,
        },
        {
          title: "Product Ratings And Review",
          path: "ratings-review",
          isAllowed: isAllowedRoute("ratings-review"),
          icon: <IoIosHome />,
        },
      ],
    },
    // Orders
    {
      title: "Manage Orders",
      icon: <IoIosHome />, // Replace with the actual SVG icon
      list: [
        {
          title: "All Orders",
          path: "all-orders",
          isAllowed: isAllowedRoute("all-orders"),
          icon: <IoIosHome />, // Replace with the actual SVG icon
        },
        {
          title: "Pending Orders",
          path: "pending-orders",
          isAllowed: isAllowedRoute("pending-orders"),
          icon: <IoIosHome />,
        },
        {
          title: "Delivered Orders",
          path: "approved-orders",
          isAllowed: isAllowedRoute("approved-orders"),
          icon: <IoIosHome />,
        },
        {
          title: "Cancelled Orders",
          path: "cancelled-orders",
          isAllowed: isAllowedRoute("approved-orders"),
          icon: <IoIosHome />,
        },
        {
          title: "Payment History",
          path: "payment-history",
          isAllowed: isAllowedRoute("payment-history"),
          icon: <IoIosHome />,
        },
      ],
    },
    // Customers
    {
      title: "Customers",
      icon: <IoIosHome />, // Replace with the actual SVG icon
      list: [
        {
          title: "View All Customers",
          path: "all-customers",
          isAllowed: isAllowedRoute("all-customers"),
          icon: <IoIosHome />, // Replace with the actual SVG icon
        },
        {
          title: "Customer's Wishlist",
          path: "customers-wishlist",
          isAllowed: isAllowedRoute("customers-wishlist"),
          icon: <IoIosHome />, // Replace with the actual SVG icon
        },
        {
          title: "Delivery Charges",
          path: "delivery-charges",
          isAllowed: isAllowedRoute("delivery-charges"),
          icon: <IoIosHome />,
        },
        {
          title: "Upazila & Thana",
          path: "upazila-thana",
          isAllowed: isAllowedRoute("upazila-thana"),
          icon: <IoIosHome />,
        },
        {
          title: "Payment History",
          path: "payment-history",
          isAllowed: isAllowedRoute("payment-history"),
          icon: <IoIosHome />,
        },
      ],
    },
    // Customers
    {
      title: "Promo",
      icon: <IoIosHome />, // Replace with the actual SVG icon
      list: [
        {
          title: "Create Promo Code",
          path: "create-promo-code",
          isAllowed: isAllowedRoute("create-promo-code"),
          icon: <IoIosHome />, // Replace with the actual SVG icon
        },
        {
          title: "View All Promo Code",
          path: "view-all-promo-code",
          isAllowed: isAllowedRoute("view-all-promo-code"),
          icon: <IoIosHome />,
        },
      ],
    },
    // Sms Service
    {
      title: "SMS Service",
      icon: <IoIosHome />, // Replace with the actual SVG icon
      list: [
        {
          title: "Send SMS",
          path: "send-sms",
          isAllowed: isAllowedRoute("send-sms"),
          icon: <IoIosHome />, // Replace with the actual SVG icon
        },
        {
          title: "SMS Templates",
          path: "sms-templates",
          isAllowed: isAllowedRoute("sms-templates"),
          icon: <IoIosHome />,
        },
        {
          title: "SMS History",
          path: "sms-history",
          isAllowed: isAllowedRoute("sms-history"),
          icon: <IoIosHome />, // Replace with the actual SVG icon
        },
      ],
    },

    //
    {
      title: "Gateway & API",
      icon: <IoIosHome />, // Replace with the actual SVG icon
      list: [
        {
          title: "Email Configurations",
          path: "email-configurations",
          isAllowed: isAllowedRoute("email-configurations"),
          icon: <IoIosHome />,
        },
        {
          title: "Email Templates",
          path: "email-templates",
          isAllowed: isAllowedRoute("email-templates"),
          icon: <IoIosHome />,
        },
        {
          title: "Payment Gateway",
          path: "payment-gateway",
          isAllowed: isAllowedRoute("payment-gateway"),

          icon: <IoIosHome />,
        },
        {
          title: "SMS Gateway",
          path: "sms-gateway",
          isAllowed: isAllowedRoute("sms-gateway"),

          icon: <IoIosHome />,
        },
      ],
    },
    // Generate Report
    {
      title: "Generate Report",
      icon: <IoIosHome />, // Replace with the actual SVG icon
      list: [
        {
          title: "Sales Report",
          path: "sales-report",
          isAllowed: isAllowedRoute("sales-report"),
          icon: <IoIosHome />,
        },
      ],
    },

    // Download Backup
    {
      title: "Download Backup",
      icon: <IoIosHome />, // Replace with the actual SVG icon
      list: [
        {
          title: "Database Backup",
          path: "database-backup",
          isAllowed: isAllowedRoute("database-backup"),
          icon: <IoIosHome />,
        },
        {
          title: "Product Images Backup",
          path: "product-images-backup",
          isAllowed: isAllowedRoute("product-images-backup"),
          icon: <IoIosHome />,
        },
        {
          title: "User Images Backup",
          path: "user-images-backup",
          isAllowed: isAllowedRoute("user-images-backup"),
          icon: <IoIosHome />,
        },
        {
          title: "Banner Images Backup",
          path: "banner-images-backup",
          isAllowed: isAllowedRoute("banner-images-backup"),
          icon: <IoIosHome />,
        },
        {
          title: "Category Icon Backup",
          path: "category-icon-backup",
          isAllowed: isAllowedRoute("category-icon-backup"),
          icon: <IoIosHome />,
        },
        {
          title: "Subcategory Backup",
          path: "subcategory-backup",
          isAllowed: isAllowedRoute("subcategory-backup"),
          icon: <IoIosHome />,
        },
        {
          title: "Flag Icon Backup",
          path: "flag-icon-backup",
          isAllowed: isAllowedRoute("flag-icon-backup"),
          icon: <IoIosHome />,
        },
        {
          title: "Ticket Files Backup",
          path: "ticket-files-backup",
          isAllowed: isAllowedRoute("ticket-files-backup"),
          icon: <IoIosHome />,
        },
        {
          title: "Blog Files Backup",
          path: "blog-files-backup",
          isAllowed: isAllowedRoute("blog-files-backup"),
          icon: <IoIosHome />,
        },
        {
          title: "Other Images Backup",
          path: "other-images-backup",
          isAllowed: isAllowedRoute("other-images-backup"),
          icon: <IoIosHome />,
        },
      ],
    },

    // CRM Modules
    {
      title: "Support Ticket",
      icon: <IoIosHome />, // Replace with the actual SVG icon
      list: [
        {
          title: "Pending Supports",
          path: "pending-supports",
          isAllowed: isAllowedRoute("pending-supports"),
          icon: <IoIosHome />,
        },
        {
          title: "Solved Supports",
          path: "solved-supports",
          isAllowed: isAllowedRoute("solved-supports"),
          icon: <IoIosHome />,
        },
        {
          title: "On Hold Supports",
          path: "on-hold-supports",
          isAllowed: isAllowedRoute("on-hold-supports"),
          icon: <IoIosHome />,
        },
        {
          title: "Rejected Supports",
          path: "rejected-supports",
          isAllowed: isAllowedRoute("rejected-supports"),
          icon: <IoIosHome />,
        },
      ],
    },

    {
      title: "Contact Request",
      icon: <IoIosHome />, // Replace with the actual SVG icon
      list: [
        {
          title: "Contact Request",
          path: "contact-request",
          isAllowed: isAllowedRoute("contact-request"),
          icon: <IoIosHome />,
        },
        {
          title: "Subscribed Users",
          path: "subscribed-users",
          isAllowed: isAllowedRoute("subscribed-users"),
          icon: <IoIosHome />,
        },
      ],
    },

    // Content Management
    {
      title: "Sliders & Banners",
      icon: <IoIosHome />, // Replace with the actual SVG icon
      list: [
        {
          title: "View All Bag Banners",
          path: "view-all-bag-banners",
          isAllowed: isAllowedRoute("view-all-bag-banners"),
          icon: <IoIosHome />,
        },
        {
          title: "View All Shoes Banners",
          path: "view-all-shoes-banners",
          isAllowed: isAllowedRoute("view-all-shoes-banners"),
          icon: <IoIosHome />,
        },
        {
          title: "View All Banners",
          path: "view-all-banners",
          isAllowed: isAllowedRoute("view-all-banners"),
          icon: <IoIosHome />,
        },
        {
          title: "Promotional Banner",
          path: "promotional-banner",
          isAllowed: isAllowedRoute("promotional-banner"),
          icon: <IoIosHome />,
        },
      ],
    },

    {
      title: "Testimonials",
      icon: <IoIosHome />, // Replace with the actual SVG icon
      list: [
        {
          title: "Add New Testimonial",
          path: "add-new-testimonial",
          isAllowed: isAllowedRoute("add-new-testimonial"),
          icon: <IoIosHome />,
        },
        {
          title: "View All Testimonials",
          path: "view-all-testimonials",
          isAllowed: isAllowedRoute("view-all-testimonials"),
          icon: <IoIosHome />,
        },
      ],
    },

    {
      title: "Manage Blogs",
      icon: <IoIosHome />, // Replace with the actual SVG icon
      list: [
        {
          title: "Blog Categories",
          path: "blog-categories",
          isAllowed: isAllowedRoute("blog-categories"),
          icon: <IoIosHome />,
        },
        {
          title: "Write a Blog",
          path: "write-blog",
          isAllowed: isAllowedRoute("write-blog"),
          icon: <IoIosHome />,
        },
        {
          title: "View All Blogs",
          path: "view-all-blogs",
          isAllowed: isAllowedRoute("view-all-blogs"),
          icon: <IoIosHome />,
        },
      ],
    },

    {
      title: "Terms & Policies",
      icon: <IoIosHome />, // Replace with the actual SVG icon
      list: [
        {
          title: "Terms & Condition",
          path: "terms-condition",
          isAllowed: isAllowedRoute("terms-condition"),
          icon: <IoIosHome />,
        },
        {
          title: "Privacy Policy",
          path: "privacy-policy",
          isAllowed: isAllowedRoute("privacy-policy"),
          icon: <IoIosHome />,
        },
        {
          title: "Shipping Policy",
          path: "shipping-policy",
          isAllowed: isAllowedRoute("shipping-policy"),
          icon: <IoIosHome />,
        },
        {
          title: "Return Policy",
          path: "return-policy",
          isAllowed: isAllowedRoute("return-policy"),
          icon: <IoIosHome />,
        },
      ],
    },

    {
      title: "Custom Pages",
      icon: <IoIosHome />, // Replace with the actual SVG icon
      list: [
        {
          title: "Create New Page",
          path: "create-new-page",
          isAllowed: isAllowedRoute("create-new-page"),
          icon: <IoIosHome />,
        },
        {
          title: "View All Pages",
          path: "view-all-pages",
          isAllowed: isAllowedRoute("view-all-pages"),
          icon: <IoIosHome />,
        },
      ],
    },

    {
      title: "About Us",
      icon: <IoIosHome />, // Replace with the actual SVG icon
      list: [
        {
          title: "About Us",
          path: "about-us",
          isAllowed: isAllowedRoute("about-us"),
          icon: <IoIosHome />,
        },
        {
          title: "FAQ's",
          path: "faqs",
          isAllowed: isAllowedRoute("faqs"),
          icon: <IoIosHome />,
        },
      ],
    },

    // User Role Permission
    {
      title: "System Users",
      icon: <IoIosHome />, // Replace with the actual SVG icon
      list: [
        {
          title: "System Users",
          path: "system-users",
          isAllowed: isAllowedRoute("system-users"),
          icon: <IoIosHome />,
        },
        {
          title: "Permission Routes",
          path: "permission-routes",
          isAllowed: isAllowedRoute("permission-routes"),
          icon: <IoIosHome />,
        },
        {
          title: "User Roles",
          path: "user-roles",
          isAllowed: isAllowedRoute("user-roles"),
          icon: <IoIosHome />,
        },
        {
          title: "Assign Role Permission",
          path: "assign-role-permission",
          isAllowed: isAllowedRoute("assign-role-permission"),
          icon: <IoIosHome />,
        },
      ],
    },

    // Demo Products
    {
      title: "Demo Products",
      icon: <IoIosHome />, // Replace with the actual SVG icon
      list: [
        {
          title: "Generate Products",
          path: "generate-products",
          isAllowed: isAllowedRoute("generate-products"),
          icon: <IoIosHome />,
        },
        {
          title: "Remove Demo Products",
          path: "remove-demo-products",
          isAllowed: isAllowedRoute("remove-demo-products"),
          icon: <IoIosHome />,
        },
      ],
    },

    // Dashboard
    {
      title: "Dashboard",
      icon: <IoIosHome />, // Replace with the actual SVG icon
      path: "dashboard",
      isAllowed: isAllowedRoute("dashboard"),
    },
  ];

  return allMenuItems;
}

export default MenuItemsList;
