import { motion } from 'framer-motion';
import { fadeIn } from '../utils/motion';
import { SectionWrapperAlt } from '../hoc';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../redux/cartSlice';
import { Link } from 'react-router-dom';
import { add, subtract, trash } from '../assets';
import { urlFor } from '../sanity';

const ItemCard = ({ item, index, image }) => {
    const imageUrl = urlFor(image).url();
    const dispatch = useDispatch();

    return (
        <motion.div variants={fadeIn('', 'spring', index * 0.5, 0.75)}>
            <div className='bg-main2 rounded-2xl p-7 flex flex-col gap-3'>
                <div className='flex w-full justify-between'>
                    <div className='flex gap-6'>
                        <img 
                            src={imageUrl}
                            alt={item.name}
                            className='rounded-xl w-32 h-32 object-cover'
                        />

                        <div className='flex flex-col gap-1'>
                            <h2 className='text-main font-bold text-[20px]'>
                                {item.name}
                            </h2>
                            <p className='text-mainalt text-[16px]'>
                                {item.type}
                            </p>
                            <p className='text-mainalt text-[16px]'>
                                {item.manufacturer}
                            </p>
                            <p className='text-main font-bold text-[14px]'>
                                {item.variations}
                            </p>
                        </div>
                    </div>

                    <div className='flex flex-col gap-1 text-right'>
                        <h1 className='text-greenDeep text-[22px] 
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
                    <div className='flex items-center gap-1 cursor-pointer
                    grow2'
                    onClick={() => dispatch(removeFromCart(item.id))}
                    >
                        <img
                            src={trash}
                            alt='delete'
                            className='text-brightRed w-6 h-6'
                        />
                        <p className='text-main text-[13px] mt-1'>
                            Remove Item
                        </p>
                    </div>

                    <div className='flex items-center gap-3'>
                        <img
                            src={add}
                            alt='add'
                            className='cursor-pointer grow2 w-7 h-7'
                        />

                        <p className='text-main text-[14px]'>
                            1
                        </p>

                        <img
                            src={subtract}
                            alt='subtract'
                            className='cursor-pointer grow2 w-7 h-7'
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const Cart = () => {
    const cartItems = useSelector((state) => state.cart.items);
    const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    const totalAmount = cartItems.reduce((total, item) => total + (parseFloat(item.price.replace(',', '')) * item.quantity), 0);
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
                    <div className='w-full flex gap-6'>
                        <div className='flex flex-col w-full gap-6'>
                            {cartItems.map((item, index) => (
                                <ItemCard 
                                    key={item.id}
                                    item={item}
                                    index={index}
                                    image={item.image}
                                />
                            ))}
                        </div>
                        
                        <div>
                            <div className='bg-main2 p-7 flex flex-col gap-3
                            rounded-2xl'>
                                <h2 className='text-main font-bold 
                                text-[18px]'>
                                    Cart Summary
                                </h2>

                                <div className='flex w-full justify-between
                                items-center'>
                                    <p className='text-mainalt text-[16px]'>
                                        Subtotal:
                                    </p>

                                    <p className='text-greenDeep md:text-[20px] 
                                    font-bold'>
                                        <span className='line-through'>
                                            N
                                        </span>
                                        {totalAmount.toLocaleString()}.00
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
                    </div>
                )}

                <div className='mt-6 mb-14'>
                    <button onClick={() => dispatch(clearCart())}
                    className='text-white font-medium bg-primary py-3 px-10
                    rounded-lg grow2'>
                        Clear Cart
                    </button>
                </div>
                
            </div>
        </section>
    );
};

export default SectionWrapperAlt(Cart, '');