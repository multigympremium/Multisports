import React from 'react';

const TopBar = () => {
    return (
        <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white h-10 flex items-center justify-center text-sm font-bold shadow-lg relative">
            <div className="absolute top-0 left-0 w-full h-full opacity-25 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')]"></div>
            <span className="relative z-10 text-xs md:text-sm">
                 Exclusive Deal**: Get 30% Off on Your First Order! Use Code: <strong>WELCOME30</strong> 
            </span>
        </div>
    );
};

export default TopBar;
