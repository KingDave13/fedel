import {
    Hero,
    Navbar,
    Discover,
    Steps,
    Help,
    CTA,
    Footer
} from '../components';

import { Helmet } from 'react-helmet';

const HomePage = () => {

    return (
        <div className='font-encode-sans'>
            <Helmet>
                <title>Fedel Tiles Limited | Quality and Experience</title>
                <meta name="description" content="The best tile and building materials dealer." />
            </Helmet>

            <Navbar />
            <Hero />
            <Discover />
            <Steps />

            <div className='help'>
                <Help />
            </div>
            
            <CTA />
            <Footer />
        </div>
    )
};

export default HomePage;