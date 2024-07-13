import { motion } from 'framer-motion';
import { textVariant } from '../utils/motion';
import { SectionWrapper } from '../hoc';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../redux/cartSlice';
import { Link } from 'react-router-dom';

const Cart = () => {
    const cartItems = useSelector((state) => state.cart.items);
    const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    const dispatch = useDispatch();

    return (
        <section className='relative w-full min-h-[60px] mx-auto flex
        items-center'>
            <div className='max-w-[86rem] mx-auto flex flex-col md:gap-8
            ss:gap-8 gap-6 w-full'>
                <h1 className='text-primary font-bold md:text-[22px]
                ss:text-[20px] text-[16px]'>
                    Cart {`(${itemCount})`}
                </h1>
                
                {cartItems.length === 0 ? (
                    <p className='text-primary font-medium text-[17px]'>
                        No items in cart
                    </p>
                ) : (
                    <div className='w-full flex gap-5'>
                        <div className='flex flex-col w-3/4 gap-5'>
                            {cartItems.map(item => (
                                <ItemCard 
                                    key={item.id}
                                    item={item}
                                    // <img src={item.image} alt={item.name} />
                                    // <p>{item.name}</p>
                                    // <p>Price: {item.price}</p>
                                    // <p>Quantity: {item.quantity}</p>
                                    // <button onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
                                />
                            ))}
                        </div>
                        
                        <div className='bg-main2 p-6 flex flex-col gap-3
                        rounded-lg w-full'>
                            <h2 className='text-main font-bold 
                            text-[18px]'>
                                Cart Summary
                            </h2>

                            <div className='flex w-full justify-between
                            items-center'>
                                <p className='text-mainalt text-[15px]'>
                                    Subtotal:
                                </p>

                                <p className='text-greenDeep md:text-[17px] 
                                font-bold'>
                                    Total Amount
                                </p>
                            </div>
                            
                            <p className='text-main3 text-[14px]
                            border-t-[1px] border-primaryalt pt-4 mt-2'>
                                This figure does not include any other 
                                extra fees that may be incurred via 
                                logistics, etc.
                            </p>

                            <Link to='/cart/checkout' 
                            className='bg-primary text-[14px] py-3.5 flex
                            items-center justify-center text-white rounded-lg 
                            grow2 cursor-pointer w-full mt-3'>
                                <p>
                                    Checkout
                                </p>
                            </Link>
                        </div>
                    </div>
                )}
                <button onClick={() => dispatch(clearCart())}>Clear Cart</button>
            </div>
        </section>
    );
};

export default SectionWrapper(Cart, '');