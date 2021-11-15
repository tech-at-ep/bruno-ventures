import React, {useState, useEffect, useRef} from "react";

function useOutsideAlerter(ref, setOpenNav) {
  useEffect(() => {

      function handleClickOutside(event) {
          if (ref.current && !ref.current.contains(event.target)) {
              setOpenNav(false);
          }
      }

      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
          // Unbind the event listener on clean up
          document.removeEventListener("mousedown", handleClickOutside);
      };
  }, [ref]);
}

const Navbar = () => {

  const [openNav, setOpenNav] = useState(false);

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setOpenNav);

  return (
    <div className="flex flex-auto justify-end items-center h-28 absolute left-0 right-0 top-0">
          
          {/* Desktop Nav */}

          <div className="flex justify-evenly w-1/5 mr-12 lg:visible sm:invisible">
              <a href="#startups" className="text-lg font-light text-white transition-all hover:text-red-500">For Startups</a>
              <a href="#about" className="text-lg font-light text-white transition-all hover:text-red-500">About Us</a>
          </div>

    </div>
  );
};

export default Navbar;
