
const Announcement = ({ bannerText }) => {


    const bannerTextPresent = bannerText.length > 0
    
  return (
    <div className='w-full bg-primary sticky top-0 z-50 font-encode-sans'>
        {bannerTextPresent && (
            <div className='py-4 overflow-hidden flex gap-3'>
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