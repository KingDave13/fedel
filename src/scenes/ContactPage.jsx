import {
    Navbar,
    Contact,
    Footer,
} from '../components';

import { Helmet } from 'react-helmet';

const ContactPage = () => {

    return (
        <div className='font-encode-sans'>
            <Helmet>
                <title>Contact- Shoptiles.ng | Online Shopping For Tiles, Sanitary Wares, Doors, Wall & Flooring Materials And Others</title>
                <meta name="description" content="The best tile and building materials dealer." />
            </Helmet>

            <Navbar />

            <Contact />
            
            <div className='footer'>
                <Footer />
            </div>
        </div>
    )
};

export default ContactPage;