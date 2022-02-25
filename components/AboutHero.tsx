import React from "react";


const AboutHero = ({tagLine}: { tagLine: string }) => {
    return (
        <div id="product">
            <div style={{textShadow: '0px 1px 1px gray'}}
                 className="flex flex-col items-center justify-start font-sans bg-gray-50 lg:pt-10 lg:pb-20 lg:bg-hero lg:bg-cover">
                <div className="h-full flex items-center">
                    <p className="p-56 text-4xl font-bold text-center text-blue-800 lg:mx-auto lg:w-6/6 lg:text-8xl lg:text-gray-100">
                        {tagLine}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutHero;
