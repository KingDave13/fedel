import { motion } from 'framer-motion';
import { fadeIn } from '../utils/motion';
import { SectionWrapper } from '../hoc';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../redux/cartSlice';
import { Link } from 'react-router-dom';

const ItemCard = ({ item, index }) => {
    return (
        <motion.div variants={fadeIn('', 'spring', index * 0.5, 0.75)}>
            <div className='bg-main2 rounded-2xl p-6 flex flex-col gap-3'>
                <div className='flex w-full justify-between'>
                    <div className='flex gap-4'>
                        <img />

                        <div className='flex flex-col gap-2'>
                            <h2 className='text-main font-bold text-[18px]'>
                                {item.name}
                            </h2>
                            <p className='text-main text-[14px]'>
                                {item.type}
                            </p>
                            <p className='text-main text-[14px]'>
                                {item.manufacturer}
                            </p>
                            <p className='text-main font-semibold text-[14px]'>
                                {item.variations}
                            </p>
                        </div>
                    </div>

                    <div className='flex flex-col gap-3'>
                        <h1 className='text-greenDeep text-[20px] 
                        font-bold'>
                            <div>
                                <span className='line-through'>
                                    N
                                </span>
                                {item.price}.00
                            </div>
                        </h1>

                        <h1 className='text-main3 font-medium text-[18px] 
                        line-through'>
                            <div>
                                N{item.OriginalPrice}.00
                            </div>
                        </h1>
                    </div>
                </div>

                <div className='flex w-full justify-between items-center'>
                    <div className='flex items-center gap-2'>

                        <p className='text-main text-[13px]'>
                            Remove Item
                        </p>
                    </div>

                    <div className='flex items-center gap-2'>
                        <div className='bg-primary rounded-md p-2
                        text-[14px] cursor-pointer grow2'>
                            +
                        </div>

                        <p className='text-main text-[14px]'>
                            1
                        </p>

                        <div className='bg-primary rounded-md p-2
                        text-[14px] cursor-pointer grow2'>
                            -
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

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
                            {cartItems.map((item, index) => (
                                <ItemCard 
                                    key={item.id}
                                    item={item}
                                    index={index}
                                    // <img src={item.image} alt={item.name} />
                                    // <p>{item.name}</p>
                                    // <p>Price: {item.price}</p>
                                    // <p>Quantity: {item.quantity}</p>
                                    // <button onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
                                />
                            ))}
                        </div>
                        
                        <div className='bg-main2 p-6 flex flex-col gap-3
                        rounded-2xl w-full'>
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