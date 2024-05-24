import React from "react";
import logo from '../../images/download YouTube Thumbnail 2.png'
const Topbar = () => {
    return (
        <div
            className="navbar py-5 sm:py-10 px-5 md:px-20 lg:px-48 flex flex-col sm:flex-row items-center justify-between">
            {/* Logo and Hamburger Menu */}
            <div className="flex justify-between w-full">
                <div className="logo-text text-2xl sm:text-3xl font-bold mb-2 sm:mb-0 cursor-pointer">
                    <img className='logo' src={logo}/>
                </div>
            </div>
        </div>
    );
};

export default Topbar;
