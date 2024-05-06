import {
    Hero,
    Navbar,
    Discover,
    Steps,
    Help
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
            
        </div>
    )
};

export default HomePage;