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
                <div className="collapse collapse-arrow">
                    <input type="checkbox" />
                    <div className="collapse-title">
                        Categories
                    </div>
                    <div className="collapse-content space-y-5">
                        <p><Link>-  Men Wear</Link></p>
                        <p><Link>-  Women Wear</Link></p>
                        <p><Link>-  Kids Wear</Link></p>
                        <p><Link>-  Sports Wear</Link></p>
                        <p><Link>-  Swim Wear</Link></p>
                    </div>
                </div>
                <div className='flex flex-col px-4 gap-4'>
                    <Link>Shops</Link>
                    <Link>New Arrivals</Link>
                    <Link>Popular</Link>
                    <Link>Best Selling</Link>
                </div>
                <div className="collapse collapse-arrow">
                    <input type="checkbox" />
                    <div className="collapse-title">
                        More
                    </div>
                    <div className="collapse-content space-y-5">
                        <p><Link>-  Shops</Link></p>
                        <p><Link>-  About Us</Link></p>
                        <p><Link>-  Contact</Link></p>
                        <p><Link>-  Blogs</Link></p>
                        <p><Link>-  Career</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SidebarContainer;
