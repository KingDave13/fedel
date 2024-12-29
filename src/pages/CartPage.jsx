import {
    Navbar,
    Footer,
    Cart,
    HeroCart,
    MoreProducts,
} from '../components';

import { Helmet } from 'react-helmet';

const CartPage = ({ bannerTextPresent }) => {
   
    return (
        <div className='font-encode-sans'>
            <Helmet>
                <title>Cart | Shoptiles.ng</title>
                <meta name="description" content="View your cart" />
            </Helmet>

            <Navbar />
            <HeroCart />
            
            <Cart bannerTextPresent={bannerTextPresent}/>

            <MoreProducts />

           <div className='footer'>
                <Footer />
            </div>
        </div>
    );
};

export default CartPage;