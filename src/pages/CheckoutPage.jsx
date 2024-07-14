import {
    Navbar,
    Footer,
    Checkout,
    HeroCheckout,
} from '../components';

import { Helmet } from 'react-helmet';

const CheckoutPage = () => {
   
    return (
        <div className='font-encode-sans'>
            <Helmet>
                <title>Checkout | Shoptiles.ng</title>
                <meta name="description" content="Checkout" />
            </Helmet>

            <Navbar />
            <HeroCheckout />
            
            <Checkout />

           <div className='footer'>
                <Footer />
            </div>
        </div>
    );
};

export default CheckoutPage;