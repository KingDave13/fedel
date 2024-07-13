import { motion } from 'framer-motion';
import { textVariant } from '../utils/motion';
import { SectionWrapper } from '../hoc';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../redux/cartSlice';

const Cart = () => {
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();

    return (
        <div>
            <h1>Your Cart</h1>
            {/* {cartItems.length === 0 ? (
                <p>No items in cart</p>
            ) : (
                <ul>
                    {cartItems.map(item => (
                        <li key={item.id}>
                            <img src={item.image} alt={item.name} />
                            <p>{item.name}</p>
                            <p>Price: {item.price}</p>
                            <p>Quantity: {item.quantity}</p>
                            <button onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
                        </li>
                    ))}
                </ul>
            )} */}
            <button onClick={() => dispatch(clearCart())}>Clear Cart</button>
        </div>
    );
};

export default SectionWrapper(Cart, '');