import { Link } from "react-router";
import { useCart } from "../context/CartContext";

export default function ProductCard({product}) {
    const {cartItems, addToCart} = useCart();
    const productInCart = cartItems.find((cartItem) => cartItem.id === product.id);

    const productQuantityLabel = productInCart ? <p>{productInCart.quantity}</p>
    : "";
    
    return(
        <div className='products-card'>
            <img src={product.image} className='product-card-image' />
            <div className='product-card-content'>
                <h3 className='product-card-name'>{product.name}</h3>
                <p className='product-card-price'>${product.price}</p>
                <div className='product-card-actions'>
                <Link className='btn btn-secondary' to={`/products/${product.id}`} >View Details</Link>
                <button className='btn btn-primary' onClick={() => {
                    addToCart(product.id);
                }}>
                    Add to cart {productQuantityLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}