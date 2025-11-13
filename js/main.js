// Main JavaScript file for common functionality across all pages

// Cart management functions
class CartManager {
    constructor() {
        this.initCart();
    }
    
    // Initialize cart in localStorage if it doesn't exist
    initCart() {
        if (!localStorage.getItem('cart')) {
            localStorage.setItem('cart', JSON.stringify([]));
        }
    }
    
    // Get current cart from localStorage
    getCart() {
        return JSON.parse(localStorage.getItem('cart'));
    }
    
    // Save cart to localStorage
    saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    
    // Add item to cart
    addToCart(id, name, price) {
        let cart = this.getCart();
        const existingItem = cart.find(item => item.id === id);
        
        if (existingItem) {
            // If item exists, increase quantity
            existingItem.quantity += 1;
        } else {
            // If item doesn't exist, add it to cart
            cart.push({
                id: id,
                name: name,
                price: price,
                quantity: 1
            });
        }
        
        this.saveCart(cart);
        this.updateCartCount();
        return cart;
    }
    
    // Update item quantity in cart
    updateQuantity(id, change, setValue = null) {
        let cart = this.getCart();
        const itemIndex = cart.findIndex(item => item.id === id);
        
        if (itemIndex !== -1) {
            if (setValue !== null) {
                cart[itemIndex].quantity = setValue;
            } else {
                cart[itemIndex].quantity += change;
                
                // Ensure quantity doesn't go below 1
                if (cart[itemIndex].quantity < 1) {
                    cart[itemIndex].quantity = 1;
                }
            }
            
            this.saveCart(cart);
            this.updateCartCount();
        }
        
        return cart;
    }
    
    // Remove item from cart
    removeFromCart(id) {
        let cart = this.getCart();
        cart = cart.filter(item => item.id !== id);
        this.saveCart(cart);
        this.updateCartCount();
        return cart;
    }
    
    // Clear entire cart
    clearCart() {
        localStorage.setItem('cart', JSON.stringify([]));
        this.updateCartCount();
        return [];
    }
    
    // Calculate total items in cart
    getTotalItems() {
        const cart = this.getCart();
        let totalItems = 0;
        cart.forEach(item => {
            totalItems += item.quantity;
        });
        return totalItems;
    }
    
    // Update cart count in navbar
    updateCartCount() {
        const cartCount = document.getElementById('cart-count');
        if (cartCount) {
            const totalItems = this.getTotalItems();
            
            if (totalItems > 0) {
                cartCount.textContent = totalItems;
                cartCount.classList.remove('d-none');
            } else {
                cartCount.classList.add('d-none');
            }
        }
    }
    
    // Calculate cart total
    calculateTotal() {
        const cart = this.getCart();
        let subtotal = 0;
        cart.forEach(item => {
            subtotal += item.price * item.quantity;
        });
        return {
            subtotal: subtotal,
            total: subtotal + 10 // $10 shipping
        };
    }
}

// Initialize cart manager
const cartManager = new CartManager();

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Update cart count on page load
    cartManager.updateCartCount();
    
    // Add event listeners to all "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            const productName = this.getAttribute('data-name');
            const productPrice = parseFloat(this.getAttribute('data-price'));
            
            cartManager.addToCart(productId, productName, productPrice);
            
            // Show confirmation message
            showAlert(`${productName} has been added to your cart!`, 'success');
        });
    });
});

// Utility function to show alerts
function showAlert(message, type = 'info') {
    // Create alert element
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    // Add styles for fixed positioning
    alertDiv.style.position = 'fixed';
    alertDiv.style.top = '20px';
    alertDiv.style.right = '20px';
    alertDiv.style.zIndex = '1050';
    alertDiv.style.minWidth = '300px';
    
    // Add to page
    document.body.appendChild(alertDiv);
    
    // Remove after 3 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.parentNode.removeChild(alertDiv);
        }
    }, 3000);
}
