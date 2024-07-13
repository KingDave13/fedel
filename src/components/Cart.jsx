import { motion } from 'framer-motion';
import { textVariant } from '../utils/motion';
import { SectionWrapper } from '../hoc';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../redux/cartSlice';

const Cart = () => {
    const cartItems = useSelector((state) => state.cart.items);
    const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    const dispatch = useDispatch();

    return (
        <section className='relative w-full min-h-[600px] mx-auto flex
        items-center'>
            <div className='max-w-[86rem] mx-auto flex flex-col md:gap-8
            ss:gap-8 gap-6'>
                <h1 className='text-primary font-semibold md:text-[18px]
                ss:text-[18px] text-[15px]'>
                    Cart {`(${itemCount})`}
                </h1>
                
                {cartItems.length === 0 ? (
                    <p className='text-primary font-medium text-[15px]'>
                        No items in cart
                    </p>
                ) : (
                    <div className='w-full flex gap-5'>
                        <div>

                        </div>
                    </div>
                    // <ul>
                    //     {cartItems.map(item => (
                    //         <li key={item.id}>
                    //             <img src={item.image} alt={item.name} />
                    //             <p>{item.name}</p>
                    //             <p>Price: {item.price}</p>
                    //             <p>Quantity: {item.quantity}</p>
                    //             <button onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
                    //         </li>
                    //     ))}
                    // </ul>
                )}
                <button onClick={() => dispatch(clearCart())}>Clear Cart</button>
            </div>
        </section>
    );
};

export default SectionWrapper(Cart, '');