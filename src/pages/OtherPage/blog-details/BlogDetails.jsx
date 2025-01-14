import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { FaClock } from 'react-icons/fa';
import { CiFacebook } from "react-icons/ci";
import { SlSocialInstagram, SlSocialReddit, SlSocialTwitter } from "react-icons/sl";
import useGetSocialLink from "../../../Hook/GetPublicDataHook/useGetSocialLink";
const BlogDetails = () => {
    const id = useParams().id
    const content = useGetSocialLink({});
    const axiosSecure = useAxiosSecure()
    // const [blog , setBlog] = useState({})
    const blog = {
        "title": "Top 10 Winter Fashion Trends of 2025",
        "image": "https://www.topteny.com/wp-content/uploads/2024/09/Top-10-fashion-trends-for-winter-2025-780x470.jpg",
        "writer": "Sophia Green",
        "shortDescription": "Discover the must-have styles to keep you warm and stylish this winter.",
        "fullDescription": "As winter approaches, staying fashionable while keeping warm is key. This season, oversized scarves, faux fur coats, and chunky knit sweaters dominate the fashion scene. We've curated the top 10 trends that will elevate your winter wardrobe. From classic neutrals to bold patterns, these styles ensure you stay trendy and cozy.As winter approaches, staying fashionable while keeping warm is key. This season, oversized scarves, faux fur coats, and chunky knit sweaters dominate the fashion scene. We've curated the top 10 trends that will elevate your winter wardrobe. From classic neutrals to bold patterns, these styles ensure you stay trendy and cozy.As winter approaches, staying fashionable while keeping warm is key. This season, oversized scarves, faux fur coats, and chunky knit sweaters dominate the fashion scene. We've curated the top 10 trends that will elevate your winter wardrobe. From classic neutrals to bold patterns, these styles ensure you stay trendy and cozy.",
        "blogCategory": "Fashion"
    }
    useEffect(() => {
        const fetchBlogData = async () => {
            try {
                const res = await axiosSecure.get(`/blog/${id}`)
                if (res.status === 200 || res.status === 201) {
                    setBlog(res.data.data)
                }
            } catch (error) {
                console.log(error.message)
            }
        }
        fetchBlogData()
    }, [])
    const navigate = useNavigate();
    const readingTime = Math.ceil(blog?.fullDescription?.split(' ').length / 200);
    // blogCategory , fullDescription , image , shortDescription , title , writer
    return (
        <div className="max-w-[1440px] mx-auto mt-10 px-6">

            {/* Blog Content */}
            <div className="grid md:grid-cols-3 mt-10 gap-10">
                {/* Blog Details */}
                <div className="col-span-2 pr-20">
                    <h1 className="text-4xl font-semibold mb-5">{blog?.title}</h1>
                    <p className="text-lg mb-9 text-gray-500">
                        By {blog?.writer} | <FaClock className="inline-block ml-2 mr-1" /> {readingTime} min read
                    </p>
                    <p className="text-xl mb-3 text-gray-600">{blog?.shortDescription}</p>
                    <div dangerouslySetInnerHTML={{ __html: blog?.fullDescription }} className="text-xl font-thin leading-8 mt-3" />
                    <p className="text-red-500 mt-3 text-lg font-thin cursor-pointer max-w-fit" onClick={() => navigate(-1)}>Go Back</p>
                </div>

                {/* Blog Sidebar */}
                <div>
                    <img src={blog?.image} className="w-full rounded-t-md" alt={blog?.title} />
                    <div className="bg-slate-50 p-8">
                        <p className="font-bold text-red-600 text-lg">CATEGORY</p>
                        <p className="text-red-600 my-4 font-thin">{blog?.blogCategory}</p>
                        <p className="font-bold text-red-600 text-lg">FOLLOW THE LATEST</p>
                        <div className="flex my-5 justify-start gap-4 items-center text-4xl">
                            <Link to={content?.facebook}>
                                <CiFacebook className="text-gray-600 cursor-pointer hover:text-red-600" />
                            </Link>
                            <Link to={content.twitter}>
                                <SlSocialTwitter className="text-gray-600 cursor-pointer hover:text-red-600 text-3xl" />
                            </Link>
                            <Link to={content?.instagram}>
                                <SlSocialInstagram className="text-gray-600 text-3xl cursor-pointer hover:text-red-600" />
                            </Link>

                        </div>
                        <p className="font-bold text-red-600 text-lg">GET UPDATES</p>
                        <input type="text" placeholder="Email" className="outline-none p-2 px-3 w-full rounded my-4 border" />
                        <button className="btn w-full rounded-xl text-white bg-red-500 hover:text-red-500 hover:bg-transparent border hover:border-red-500">Subscribe</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetails;