import {
    Hero,
    Navbar,
    Discover,
    Steps,
    Help,
    CTA,
    Footer,
    Categories,
    Top
} from '../components';

import { Helmet } from 'react-helmet';

const HomePage = () => {

    return (
        <div className='font-encode-sans'>
            <Helmet>
                <title>Shoptiles.ng | Online Shopping For Tiles, Sanitary Wares, Doors, Wall & Flooring Materials And Others</title>
                <meta name="description" content="The best tile and building materials dealer." />
            </Helmet>

            <Navbar />
            <Hero />
            <Categories />

            <div className='footer'>
                <Top />
            </div>

            <Discover />
            <Steps />

            <div className='help'>
                <Help />
            </div>
            
            <CTA />

            <div className='footer'>
                <Footer />
            </div>
        </div>
    )
};

export default HomePage;