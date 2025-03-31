import React from 'react';
import { Link } from 'react-router-dom';
import logo from './../assets/images/logo.png'
import {LuMenu} from 'react-icons/lu';
import{MdClose} from 'react-icons/md';

const Header = () => {
    const[isOpen, setIsOpen] = React.useState(false);

    const toggleMenu = ()=> setIsOpen(prev => !prev);

    const[isFixedClass, setiSFixedClass] = React.useState(false);

    const addFixedClass = ()=> window.pageYOffset > 200 ? setiSFixedClass(true) :setiSFixedClass(false);

    window.addEventListener('scroll', addFixedClass	)
    
    const fixedHeader ={
        backgroundColor:'#1f156e',
        borderBottom: "2px solid #0f419a",
        boxShadow:"0 10px 5px rgba(15, 16, 24, 0.1)",
        zIndex:9999
    }
   
    return(
        <div className={`header fixed w-full border-b-[1px]  border-white/20 z-50 left-0 top-0 ${isFixedClass ? 'animate-fadeInDown' :''}`} style={isFixedClass ? fixedHeader : {}}>
            <div className='max-w-[1140px] mx-auto w-full'> 

                <nav className='flex items-center  justify-between flex-wrap lg:flex-nowrap px-5 py-4 relative'>
                    <Link href="/" className='mr-4 flex items-center'>
                        <img src={logo} alt="" className="h-10"/>
                        <h2 className='text-white font-bold text-xl ml-1'>TradeInvest</h2>
                    </Link>

                    {/*Mobile Nav Icon */}
                    <button className=' border-0 outline-0 shadow-none block lg:hidden' onClick={toggleMenu}>
                       
                        {
                            (!isOpen) ?(
                                    <LuMenu className="text-3xl  inline text-white"/>
                                )
                                
                                :(
                                    <MdClose className="text-3xl  inline-block text-white"/>
                            ) 
                        }
                    </button>

                    <div className={`${isOpen ? 'h-80 bg-primary-light mt-3 rounded ': 'h-0'} overflow-hidden lg:h-auto lg:flex items-center basis-full grow transition-all duration-300 ease-linear`}>
                        <ul className='flex-col lg:flex-row flex lg:items-center ml-auto py-4 lg:py-0' id='header-nav'>
                            <li className=''>
                                <Link to="/" className={`text-base font-bold text-white py-3 px-4 hover:text-gold cursor-pointer flex items-center `} >
                                    Home
                                </Link>
                            </li>

                            <li className=''>
                                <Link to="about_us" className={`text-base font-bold text-white py-3 px-4 hover:text-gold cursor-pointer flex items-center `} >
                                    About
                                </Link>
                            </li>

                            <li className=''>
                                <Link to="services" className={`text-base font-bold text-white py-3 px-4 hover:text-gold cursor-pointer flex items-center `} >
                                    Services
                                </Link>
                            </li>

                            <li className=''>
                                <Link to="investment" className={`text-base font-bold text-white py-3 px-4 hover:text-gold cursor-pointer flex items-center `} >
                                    Investment
                                </Link>
                            </li>

                            <li className=''>
                                <Link to="contact_us" className={`text-base font-bold text-white py-3 px-4 hover:text-gold cursor-pointer flex items-center `} >
                                    Contact Us
                                </Link>
                            </li>

                            <li className=''>
                                <Link to="faqs" className={`text-base font-bold text-white py-3 px-4 hover:text-gold cursor-pointer flex items-center `} >
                                    FAQs
                                </Link>
                            </li>
                        </ul>
                        {/* <li className=''>
                           
                            <Link href="track" className='inline-block text-white bg-gold leading-[46px]  rounded-md font-semibold px-8 border-2 border-transparent lg:ml-4 ps-3 pe-3 transition-all duration-300 ease-in hover:border-gold hover:bg-transparent hover:text-gold'>
                                Track your parcel
                            </Link>
                        </li> */}
                    </div>
                </nav>
            </div>
        </div>
    )
  
}

export default Header