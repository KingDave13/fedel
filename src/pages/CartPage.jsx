import {
    Navbar,
    Footer,
    Cart,
    HeroCart,
} from '../components';

import { Helmet } from 'react-helmet';

const CartPage = () => {
   
    return (
        <div className='font-encode-sans'>
            <Helmet>
                <title>Cart | Fedel Tiles Limited</title>
                <meta name="description" content="View your cart" />
            </Helmet>

            <Navbar />
            <HeroCart />
            
            <Cart />

           <div className='footer'>
                <Footer />
            </div>
        </div>
    );
};

export default CartPage;