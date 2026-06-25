"use client"
import { CiSearch } from "react-icons/ci";
import { FaCartShopping } from "react-icons/fa6";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useSelector } from "react-redux";

export default function Header() {

    const isLogin = useSelector((data) => {
        return data.login.value;
    })

    return (
        <>
            <div className="flex justify-between text-sm pt-2 border-b border-b-zinc-200">
                <div className="ml-20 py-3">Contact us 24/7 : +91-98745612330 / furniture@gmail.com</div>

                {
                    isLogin
                    ?
                    <a href="/my-dashboard" className="mr-20 py-3 hover:text-[#b5845a]" >My Dashboard</a>
                    :
                    <a href="/login-register" className="mr-20 py-3 hover:text-[#b5845a]" >Login / Register</a>
                }
                
            </div>

            <div className="flex justify-between mt-5 border-b border-b-zinc-200 pb-4">
                <div className="ml-20">
                    <a href="/">
                        <img src="/logo.png" width={162} />
                    </a>
                </div>
                <div className="flex items-center">
                    <div className="flex border-1 border-zinc-200 p-3">
                        <input type="text" placeholder="Search Product...." className="text-sm pr-20"></input>
                        <CiSearch size={20} />
                    </div>
                    <div className="border-1 border-zinc-200 ml-5 p-2">
                        <img src="/heart-regular.svg" width={25} />
                    </div>
                    <div className="flex p-2 mt-1 items-center mr-20 border-1 ml-5 border-zinc-200">
                        <FaCartShopping size={30} className="p-1 border-r-1 border-zinc-200" />
                        <div className="text-md pl-2">Rs.2300</div>
                    </div>
                </div>
            </div>

            <nav>
                <ul className="flex gap-8 justify-center pt-5">
                    <li>
                        <a href="/" className="text-yellow-600">HOME</a>
                    </li>
                    <div className="relative group flex items-center">
                        <li>
                            <a href="#">LIVING</a>
                        </li>
                        <p><RiArrowDropDownLine size={25} /></p>
                        <div className="absolute left-0 top-full w-[600px] bg-white pt-4  border-t-1 border-zinc-200 shadow-lg mt-5 p-8 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                            <div className="grid grid-cols-3 gap-10">
                                <div>
                                    <h5 className="font-bold mb-4">TABLES</h5>
                                    <ul className="space-y-2 text-gray-500 text-sm">
                                        <li>
                                            <a href="/categories/sideandendtables">Side And End Tables</a></li>
                                        <li>Nest Of Tables</li>
                                        <li>Coffee Table Sets</li>
                                        <li>Coffee Tables</li>
                                    </ul>
                                </div>

                                <div>
                                    <h5 className="font-bold mb-4">MIRROR</h5>
                                    <ul className="space-y-2 text-gray-500 text-sm">
                                        <li>Wooden Mirrors</li>
                                    </ul>
                                </div>

                                <div>
                                    <h5 className="font-bold mb-4">LIVING STORAGE</h5>
                                    <ul className="space-y-2 text-gray-500 text-sm">
                                        <li>Prayer Units</li>
                                        <li>Display Unit</li>
                                        <li>Shoe Racks</li>
                                        <li>Bookshelves</li>
                                    </ul>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="relative group flex items-center">
                        <li>
                            <a href="#">SOFA</a>
                        </li>
                        <p><RiArrowDropDownLine size={25} /></p>
                        <div className="absolute left-0 top-full w-[600px] bg-white pt-4  border-t-1 border-zinc-200 shadow-lg mt-5 p-8 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                            <div className="grid grid-cols-3 gap-10">
                                <div>
                                    <h5 className="font-bold mb-4">SOFA CUM BED</h5>
                                    <ul className="space-y-2 text-gray-500 text-sm">
                                        <li>Wooden Sofa Cum Bed</li>
                                    </ul>
                                </div>

                                <div>
                                    <h5 className="font-bold mb-4">SOFA SETS</h5>
                                    <ul className="space-y-2 text-gray-500 text-sm">
                                        <li>Sofa Cover</li>
                                        <li>L Shape Sofa</li>
                                        <li>1 Seater Sofa</li>
                                        <li>2 Seater Sofa</li>
                                        <li>3 Seater Sofa</li>
                                        <li>Wooden Sofa Sets</li>
                                        <li>Normal</li>
                                    </ul>
                                </div>

                                <div>
                                    <h5 className="font-bold mb-4">SWING JHULA</h5>
                                    <ul className="space-y-2 text-gray-500 text-sm">
                                        <li>Wooden Jhoola</li>
                                    </ul>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="relative group flex items-center">
                        <li>
                            <a>PAGES</a>
                        </li>
                        <p><RiArrowDropDownLine size={25} /></p>
                        <div className="absolute left-0 top-full w-[200px] bg-white pt-4  border-t-1 border-zinc-200 shadow-lg mt-5 p-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                            <ul className="space-y-2 text-gray-500 text">
                                <li>
                                    <a href="/about-us">About Us</a></li>
                                <li>
                                    <a href="/cart">Cart</a></li>
                                <li>Checkout</li>
                                <li>
                                    <a href="/faq">Frequently Questions</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <li>
                            <a href="/contact-us">CONTACT US</a>
                        </li>
                    </div>
                </ul>
            </nav>

        </>
    );
}