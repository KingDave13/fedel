import { useState, useEffect } from 'react';
import { client } from '../sanity';

const Announcement = () => {
    const [bannerText, setBannerText] = useState([]);

    useEffect(() => {
        const query = `
            *[_type == "banner"] | {
                text,
            }
        `;
    
        client.fetch(query)
            .then((data) => setBannerText(data))
    }, []);
    
  return (
    <div className='w-full bg-primary sticky top-0 z-50 font-encode-sans'>
        {bannerText.length > 0 && (
            <div className='md:py-4 ss:py-5 py-4 overflow-hidden flex gap-3'>
                <div className='flex justify-between gap-3 animate-slide-left'>
                    <h2 className="text-white whitespace-nowrap 
                    md:text-[15px] ss:text-[16px] text-[14px]">
                        {bannerText[0].text}
                    </h2>
                    <h2 className="text-white whitespace-nowrap
                    md:text-[15px] ss:text-[16px] text-[14px]">
                        {bannerText[0].text}
                    </h2>
                    <h2 className="text-white whitespace-nowrap
                    md:text-[15px] ss:text-[16px] text-[14px]">
                        {bannerText[0].text}
                    </h2>
                </div>

                <div className='flex justify-between gap-3 animate-slide-left'
                aria-hidden="true">
                    <h2 className="text-white whitespace-nowrap
                    md:text-[15px] ss:text-[16px] text-[14px]">
                        {bannerText[0].text}
                    </h2>
                    <h2 className="text-white whitespace-nowrap
                    md:text-[15px] ss:text-[16px] text-[14px]">
                        {bannerText[0].text}
                    </h2>
                    <h2 className="text-white whitespace-nowrap
                    md:text-[15px] ss:text-[16px] text-[14px]">
                        {bannerText[0].text}
                    </h2>
                </div>
            </div>
        )}
    </div>
  )
};

export default Announcement;