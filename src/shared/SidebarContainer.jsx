import React from 'react';
import { Link } from 'react-router-dom';

const SidebarContainer = () => {
    return (
        <div className="text-base">
            {/* Sidebar Header */}
            <div className="px-7 py-4 text-lg border-b">
                <p>MultiSports</p>
            </div>

            {/* Collapsible Menu */}
            <div className="p-4">
                {/* Categories */}
                <div className="collapse collapse-arrow">
                    <input type="checkbox" />
                    <div className="collapse-title">
                        Categories
                    </div>
                    <div className="collapse-content space-y-5">
                        <p><Link to="/products/mens-wear">- Men Wear</Link></p>
                        <p><Link to="/products/womens-wear">- Women Wear</Link></p>
                        <p><Link to="/products/kids-wear">- Kids Wear</Link></p>
                        <p><Link to="/products/sports-wear">- Sports Wear</Link></p>
                        <p><Link to="/products/swim-wear">- Swim Wear</Link></p>
                    </div>
                </div>

                {/* Additional Links */}
                <div className="flex flex-col px-4 gap-4">
                    <Link to="/shop_adress">Shops</Link>
                    <Link to="/see_all/new_arrivals">New Arrivals</Link>
                    <Link to="/see_all/popular">Popular</Link>
                    <Link to="/see_all/best_selling">Best Selling</Link>
                </div>

                {/* More Links */}
                <div className="collapse collapse-arrow">
                    <input type="checkbox" />
                    <div className="collapse-title">
                        More
                    </div>
                    <div className="collapse-content space-y-5">
                        <p><Link to="/shop_adress">- Shops</Link></p>
                        <p><Link to="/about">- About Us</Link></p>
                        <p><Link to="/contactus">- Contact</Link></p>
                        <p><Link to="/blogs">- Blogs</Link></p>
                        <p><Link to="/career">- Career</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SidebarContainer;
