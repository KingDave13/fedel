import {
    Navbar,
    About,
    CTA,
    Footer,
} from '../components';

import { Helmet } from 'react-helmet';

const AboutPage = () => {

    return (
        <div className='font-encode-sans'>
            <Helmet>
                <title>About- Shoptiles.ng | Online Shopping For Tiles, Sanitary Wares, Doors, Wall & Flooring Materials And Others</title>
                <meta name="description" content="The best tile and building materials dealer." />
            </Helmet>

            <Navbar />

            <About />
            
            <CTA />

            <div className='footer'>
                <Footer />
            </div>
        </div>
    )
};

export default AboutPage;