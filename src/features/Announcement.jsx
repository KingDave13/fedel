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
    <div className='w-full bg-primary sticky top-0 z-50'>
        {bannerText.length > 0 && (
            <div className='md:py-4 ss:py-5 py-4 text-white'>
                {bannerText[0].text}
            </div>
        )}
    </div>
  )
};

export default Announcement;