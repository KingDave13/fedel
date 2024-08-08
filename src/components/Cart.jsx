import { motion } from 'framer-motion';
import { fadeIn } from '../utils/motion';
import { SectionWrapperAlt } from '../hoc';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart, incrementQuantity, decrementQuantity, updateQuantity } from '../redux/cartSlice';
import { add, subtract, trash } from '../assets';
import { urlFor } from '../sanity';

const ItemCard = ({ item, index, image }) => {
    const imageUrl = urlFor(image).url();
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(item.quantity);

    useEffect(() => {
        setQuantity(item.quantity);
    }, [item.quantity]);

    const handleQuantityChange = (e) => {
        const value = e.target.value;
        const newQuantity = parseInt(value, 10);
    
        // Update quantity if the input is a valid number greater than or equal to 1
        if (!isNaN(newQuantity) && newQuantity >= 1) {
            setQuantity(newQuantity);
            dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
        } else if (value === '') {
            // Set quantity to 1 if the input is cleared
            setQuantity(1);
            dispatch(updateQuantity({ id: item.id, quantity: 1 }));
        }
    };

    return (
        <motion.div variants={fadeIn('', 'spring', index * 0.5, 0.75)}>
            <div className='bg-main2 md:rounded-2xl ss:rounded-2xl 
            rounded-xl md:p-7 ss:p-7 p-4 flex flex-col gap-3'>
                <div className='flex md:flex-row flex-col w-full 
                justify-between'>
                    <div className='flex md:gap-6 ss:gap-6 gap-3'>
                        <img 
                            src={imageUrl}
                            alt={item.name}
                            className='md:rounded-xl ss:rounded-xl
                            rounded-lg md:w-32 ss:w-32 w-20 md:h-32 ss:h-32 
                            h-20 object-cover'
                        />

                        <div className='flex flex-col md:gap-1 ss:gap-1
                        gap-0.5'>
                            <h2 className='text-main font-bold md:text-[20px]
                            ss:text-[20px] text-[15px]'>
                                {item.name}
                            </h2>
                            <p className='text-mainalt md:text-[16px]
                            ss:text-[16px] text-[12px]'>
                                {item.type}
                            </p>
                            <p className='text-mainalt md:text-[16px]
                            ss:text-[16px] text-[12px]'>
                                {item.manufacturer}
                            </p>
                            <p className='text-main font-semibold 
                            md:text-[14px] ss:text-[14px] text-[12px] 
                            flex flex-wrap md:gap-3 ss:gap-3 gap-2'>
                                {item.variations.map((variation, index) => (
                                    <span key={index}>
                                        {variation}
                                    </span>
                                ))}
                            </p>
                        </div>
                    </div>

                    <div className='flex flex-col md:gap-1 gap-0 
                    md:text-right md:mt-0 ss:mt-3 mt-3'>
                        <h1 className='text-greenDeep md:text-[22px] 
                        ss:text-[21px] text-[17px] font-bold'>
                            <div>
                                <span className='line-through'>
                                    N
                                </span>
                                {item.price}.00
                            </div>
                        </h1>

                        <h1 className='text-main3 font-medium md:text-[18px] 
                        ss:text-[17px] text-[14px] line-through'>
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
                            className='text-brightRed md:w-6 ss:w-6 w-5 
                            md:h-6 ss:h-6 h-5'
                        />
                        <p className='text-main md:text-[13px] ss:text-[13px]
                        text-[12px] mt-1'>
                            Remove Item
                        </p>
                    </div>

                    <div className='flex items-center gap-3'>
                        <img
                            src={add}
                            alt='add'
                            className='cursor-pointer grow2 md:w-7 ss:w-7 
                            w-6 md:h-7 ss:h-7 h-6'
                            onClick={() => dispatch(incrementQuantity(item.id))}
                        />

                        <input
                            type='text'
                            min='1'
                            value={quantity}
                            onChange={handleQuantityChange}
                            className='text-main font-semibold text-[14px] 
                            bg-transparent w-8 text-center'>
                        </input>

                        <img
                            src={subtract}
                            alt='subtract'
                            className='cursor-pointer grow2 md:w-7 ss:w-7 
                            w-6 md:h-7 ss:h-7 h-6'
                            onClick={() => dispatch(decrementQuantity(item.id))}
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const Cart = () => {
    const cartItems = useSelector((state) => state.cart.items);
    const itemCount = cartItems.length;
    const totalAmount = cartItems.reduce((total, item) => total + (parseFloat(item.price.replace(',', '')) * item.quantity), 0);
    const dispatch = useDispatch();

    return (
        <section className='relative w-full min-h-[60px] mx-auto flex
        items-center md:px-0 ss:px-16 px-6 md:py-0 ss:py-0 py-3'>
            <div className='max-w-[86rem] mx-auto flex flex-col md:gap-8
            ss:gap-8 gap-6 w-full'>
                <h1 className='text-primary font-bold md:text-[22px]
                ss:text-[20px] text-[17px]'>
                    Cart {`(${itemCount})`}
                </h1>
                
                {cartItems.length === 0 ? (
                    <p className='text-primary font-medium text-[17px]'>
                        No items in cart
                    </p>
                ) : (
                    <div className='w-full flex md:flex-row ss:flex-row 
                    flex-col md:gap-10 gap-6'>
                        <div className='flex flex-col w-full md:gap-6
                        ss:gap-6 gap-4'>
                            {cartItems.map((item, index) => (
                                <ItemCard 
                                    key={item.id}
                                    item={item}
                                    index={index}
                                    image={item.image}
                                />
                            ))}
                        </div>
                        
                        <div className=''>
                            <div className='bg-main2 md:p-7 ss:p-7 p-4 
                            flex flex-col md:gap-3 ss:gap-3 gap-2 sticky-cart
                            md:rounded-2xl ss:rounded-2xl rounded-xl'>
                                <h2 className='text-main font-bold 
                                md:text-[18px] ss:text-[18px] text-[15px]'>
                                    Cart Summary
                                </h2>

                                <div className='flex w-full justify-between
                                items-center'>
                                    <p className='text-mainalt md:text-[16px]
                                    ss:text-[16px] text-[13px]'>
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
                                
                                <p className='text-main3 md:text-[14px]
                                ss:text-[14px] text-[11px] border-t-[1px] 
                                border-primaryalt md:pt-4 ss:pt-4 pt-3 
                                md:mt-2 ss:mt-2 mt-1 md:leading-0
                                ss:leading-[20px] leading-[16px]'>
                                    This figure does not include any other 
                                    extra fees that may be incurred via 
                                    logistics, etc.
                                </p>

                                <a href='/cart/checkout' 
                                className='bg-primary md:text-[14px] 
                                ss:text-[14px] text-[12px] py-3.5 flex
                                items-center justify-center text-white rounded-lg 
                                grow2 cursor-pointer w-full md:mt-3
                                ss:mt-3 mt-2'>
                                    <p>
                                        Checkout
                                    </p>
                                </a>
                            </div>
                        </div>
                    </div>
                )}

                <div className='md:mt-6 ss:mt-6 mt-4'>
                    <button onClick={() => dispatch(clearCart())}
                    className='text-white bg-primary py-2.5 px-10 grow2
                    rounded-lg md:text-[14px] ss:text-[14px] text-[12px]'>
                        Clear Cart
                    </button>
                </div>
            </div>
        </section>
    );
};

export default SectionWrapperAlt(Cart, '');