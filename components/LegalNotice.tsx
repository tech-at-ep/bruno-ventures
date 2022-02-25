import { useRouter } from "next/router";
import React from "react";
import { useAuth, User } from "../util/firebaseAuthHelpers";

const headlineStyle = {
  color: 'rgb(239, 68, 68)'
};

const LegalNotice = () => {
	return (
		<div id="product">
			<div style={{backgroundImage: `url("../images/thisisatest.png")`}} className="flex flex-col items-center justify-start font-sans bg-gray-50 lg:pt-10 lg:pb-20 lg:bg-hero lg:bg-cover">
				<div className="items-center">
					<p className="p-0 text-3xl font-bold text-center text-blue-800 lg:mx-auto lg:w-6/6 lg:text-8xl lg:text-gray-90">
                        <p className="p-8 text-4xl text-center">
                        	Legal Language — TO BE REVIEWED WITH LIZ MALONE: 
                        </p>
                        <p className="p-8 text-2xl text-center">
						The sole purpose of this website is to recognize the existing work of Brown University student ventures. Furthermore, Brown EP and the Nelson Center for Entrepreneurship are not liable for any unwarranted copying of current ventures.                        </p>
                    	</p>
				</div>
			</div>
		</div>
	)
};
export default LegalNotice;