import "./Cart.css";
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";

const formatCurrency = (value) => `$${Number(value || 0).toFixed(2)}`;

const Cart = ({
    cartItems = [],
    handleIncrease = () => { },
    handleClearCart = () => { },
    handleDecrease = () => { },
    handleDelete = () => { },
    taxRate = 0.08,
    onProcessPayment = () => { },
}) => {
    const subtotal = cartItems.reduce(
        (acc, item) => acc + (item.price || 0) * (item.qty || 0),
        0
    );
    const tax = subtotal * taxRate;
    const total = subtotal + tax;
    const itemCount = cartItems.reduce((acc, item) => acc + (item.qty || 0), 0);

    return (
        <aside className="current-order-card">
            <header className="co-header">
                <h3>Current Order</h3>
                <span className="badge">
                    {itemCount} {itemCount === 1 ? "item" : "items"}
                </span>
            </header>

            <div className="co-body">
                {cartItems.length === 0 ? (
                    <p className="empty">No items in cart</p>
                ) : (
                    <div className="cart-items-container">
                        {cartItems.map((item) => (
                            <div key={item.id} className="co-item">
                                <div className="co-item-left">
                                    <div className="co-name">{item.title || item.name}</div>
                                    <div className="co-price">
                                        {formatCurrency(item.price)} each
                                    </div>
                                </div>

                                <div className="co-controls">
                                    <button
                                        className="qty-btn"
                                        aria-label="decrease"
                                        onClick={() => handleDecrease(item)}
                                    >
                                        <CiSquareMinus />
                                    </button>
                                    <div className="qty">{item.qty}</div>
                                    <button
                                        className="qty-btn"
                                        aria-label="increase"
                                        onClick={() => handleIncrease(item)}
                                    >
                                        <CiSquarePlus />
                                    </button>

                                    <button
                                        className="delete-btn"
                                        aria-label="delete"
                                        onClick={() => handleDelete(item)}
                                    >
                                        <RiDeleteBin5Line />
                                    </button>
                                </div>

                                <div className="co-line-total">
                                    {formatCurrency((item.price || 0) * (item.qty || 0))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>


            <footer className="co-footer">
                <div className="co-row">
                    <span>Subtotal:</span>
                    <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="co-row">
                    <span>Tax ({Math.round(taxRate * 100)}%):</span>
                    <span>{formatCurrency(tax)}</span>
                </div>
                <div className="co-row total">
                    <strong>Total:</strong>
                    <strong>{formatCurrency(total)}</strong>
                </div>


                <button
                    className="process-btn"
                    disabled={cartItems.length === 0}
                    onClick={() => onProcessPayment(total)}
                >
                    Process Payment
                </button>
                <button
                    className="clear-btn"
                    disabled={cartItems.length === 0}
                    onClick={handleClearCart}
                >
                    Clear
                </button>
            </footer>
        </aside >
    );
};

export default Cart;
