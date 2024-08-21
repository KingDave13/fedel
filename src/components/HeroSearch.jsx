import { SectionWrapper } from '../hoc';

const HeroSearch = ({ query }) => {
  
  return (
    <section className='relative w-full md:min-h-[50px] ss:min-h-[50px] 
    items-center flex'>
        <div className='relative items-center w-full max-w-[86rem]
        md:mt-28 ss:mt- mt-12 flex'
        >
          <h1 className="text-primary font-bold md:text-[22px]
          ss:text-[20px] text-[15px]">
              Showing results for "{query}"
          </h1>
        </div>
    </section>  
  )
};

export default SectionWrapper(HeroSearch, '');