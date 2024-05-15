import {
    Navbar,
    HeroProducts,
    Help,
    CTA,
    Footer
} from '../components';

import { Helmet } from 'react-helmet';

const ProductsPage = () => {

    return (
        <div className='font-encode-sans'>
            <Helmet>
                <title>Products | Fedel Tiles Limited</title>
                <meta name="description" content="The best tile and building materials dealer." />
            </Helmet>

            <Navbar />
            <HeroProducts />
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

export default ProductsPage;