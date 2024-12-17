import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import PropTypes from "prop-types";
import React, { createContext, useContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import useAxiosSecure from "../Hook/useAxiosSecure";
import toast from "react-hot-toast";
import useAxiosPublic from "../Hook/useAxiosPublic";
import { set } from "react-hook-form";

export const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState("Survey Participant");
  const [themMode, setThemMode] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [wishlist, setWishlist] = useState([]);

  const [cartItems, setCartItems] = useState([]);
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();

  // Update cart totals whenever cart items change
  useEffect(() => {
    const totalItemsInfo = cartItems.reduce(
      (acc, item) => acc + item.quantity,
      0
    );
    const totalPriceInfo = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    setTotalItems(totalItemsInfo);
    setTotalPrice(totalPriceInfo);

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Update quantity
  const updateCartQuantity = (id, quantity, color, size) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id && item.color === color && item.size === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  // Add item to cart
  const addToCart = (product, color, size) => {
    if (!color || !size) {
      toast.error("Please select color and size");
      return;
    }

    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) =>
          item._id === product._id && item.color === color && item.size === size
      );

      if (existingItem) {
        // Update quantity for existing item
        return prevItems.map((item) =>
          item._id === product._id && item.color === color && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Add new item to cart
        return [...prevItems, { ...product, color, size, quantity: 1 }];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (id, color, size) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) =>
          !(item._id === id && item.color === color && item.size === size)
      )
    );
  };

  // Load wishlist from localStorage on component mount
  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);
  }, []);

  const addToWishlist = async (product) => {
    const existingProduct = wishlist.find((item) => item._id === product._id);

    if (!existingProduct) {
      const updatedWishlist = [...wishlist, product];
      setWishlist(updatedWishlist);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      try {
        const res = await axiosPublic.get(
          `/products/wish-count/${product?._id}`
        );

        if (res.status === 200 || res.status === 201) {
          toast.success("Added to wishlist!");
        }
      } catch (error) {
        console.log(error);
        toast.error("Error adding to wishlist!");
      }
    }
  };

  const removeFromWishlist = (productId) => {
    console.log(productId, "productId");
    const updatedWishlist = wishlist.filter((item) => item._id !== productId);
    console.log("updatedWishlist", updatedWishlist);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const signInWithGithub = () => {
    return signInWithPopup(auth, githubProvider);
  };

  const logOut = () => {
    localStorage.removeItem("user");
    setUser(null);
    return true;
  };

  // useEffect(() => {
  //   const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
  //     setUser(currentUser);
  //     setLoading(false);
  //     const getUserRole = async () => {
  //       try {
  //         if (currentUser) {
  //           const res = await axiosSecure.get(
  //             `/users/admin/${currentUser.email}`
  //           );
  //           // get current user from the surver
  //           const response = await axiosSecure.get(
  //             `/users/${currentUser.email}`
  //           );

  //           localStorage.setItem("user", JSON.stringify(response.data));

  //           setCurrentUser(response.data);
  //           setUserRole(res.data);
  //           setLoading(false);
  //         } else {
  //           setUserRole(null);
  //         }
  //       } catch (error) {
  //         console.error("Error fetching user type:", error);
  //       }
  //     };
  //     getUserRole();

  //     if (!currentUser) {
  //       localStorage.removeItem("user");
  //     }

  //     const cartItemData = localStorage.getItem("cart");

  //     if (cartItemData) {
  //       setCartItems(JSON.parse(cartItemData));
  //     } else {
  //       setCartItems([]);
  //     }

  //     const storedCart = localStorage.getItem("cartItems");

  //     if (storedCart) {
  //       setCartItems(JSON.parse(storedCart));

  //       const totalPriceInfo = JSON.parse(storedCart).reduce(
  //         (acc, item) => acc + item.price * item.quantity,
  //         0
  //       );
  //       const totalItemsInfo = JSON.parse(storedCart).reduce(
  //         (acc, item) => acc + item.quantity,
  //         0
  //       );
  //       setTotalItems(totalItemsInfo);

  //       setTotalPrice(totalPriceInfo);
  //     }
  //   });
  //   return () => {
  //     unSubscribe();
  //   };
  // }, [axiosSecure]);

  useEffect(() => {
    const get_user = () => {
      const storedUser = localStorage.getItem("user");
      return storedUser == "undefined" || storedUser == null
        ? null
        : JSON.parse(storedUser);
    };

    console.log(get_user(), "get_user");

    const currentUser = get_user();

    setUser(currentUser);
  }, []);

  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    createUser,
    signInUser,
    signInWithGoogle,
    signInWithGithub,
    logOut,
    userRole,
    setUserRole,
    themMode,
    setThemMode,
    removeFromCart,
    addToCart,
    updateCartQuantity,
    cartItems,
    setCartItems,
    totalItems,
    totalPrice,
    addToWishlist,
    removeFromWishlist,
    wishlist,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      <main
        className={themMode ? "bg-neutral-800" : ""}
        data-mode={themMode ? "dark" : "light"}
      >
        {children}
      </main>
    </AuthContext.Provider>
  );
};

export default AuthProvider;

AuthProvider.propTypes = {
  children: PropTypes.node,
};
