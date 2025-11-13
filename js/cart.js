// Cart page specific functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart display
    displayCartItems();
    
    // Add event listeners for checkout and clear cart buttons
    document.getElementById('checkout-btn').addEventListener('click', handleCheckout);
    document.getElementById('clear-cart-btn').addEventListener('click', handleClearCart);

    // Function to display cart items
    function displayCartItems() {
        const cart = cartManager.getCart();
        const cartItemsContainer = document.getElementById('cart-items');
        const emptyCartMessage = document.getElementById('empty-cart');
        const cartWithItems = document.getElementById('cart-with-items');
        
        // Clear previous cart items
        cartItemsContainer.innerHTML = '';
        
        // Check if cart is empty
        if (cart.length === 0) {
            emptyCartMessage.classList.remove('d-none');
            cartWithItems.classList.add('d-none');
            return;
        }
        
        // Show cart with items
        emptyCartMessage.classList.add('d-none');
        cartWithItems.classList.remove('d-none');
        
        let subtotal = 0;
        
        // Create HTML for each cart item
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;
            
            const productImage = getProductImage(item.id);
            
            const cartItemHTML = `
                <div class="card mb-3 cart-item" data-id="${item.id}">
                    <div class="card-body">
                        <div class="row align-items-center">
                            <div class="col-md-2">
                                <img src="${productImage}" 
                                     class="img-fluid rounded" alt="${item.name}">
                            </div>
                            <div class="col-md-3">
                                <h5 class="card-title">${item.name}</h5>
                                <p class="card-text text-muted">$${item.price.toFixed(2)} each</p>
                            </div>
                            <div class="col-md-3">
                                <div class="input-group" style="max-width: 150px;">
                                    <button class="btn btn-outline-secondary decrease-quantity" type="button" data-id="${item.id}">
                                        <i class="bi bi-dash"></i>
                                    </button>
                                    <input type="number" class="form-control text-center quantity-input" 
                                           value="${item.quantity}" min="1" data-id="${item.id}">
                                    <button class="btn btn-outline-secondary increase-quantity" type="button" data-id="${item.id}">
                                        <i class="bi bi-plus"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <h5 class="text-primary item-total">$${itemTotal.toFixed(2)}</h5>
                            </div>
                            <div class="col-md-2">
                                <button class="btn btn-danger remove-item" data-id="${item.id}" title="Remove item">
                                    <i class="bi bi-trash"></i> Remove
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            cartItemsContainer.innerHTML += cartItemHTML;
        });
        
        // Update cart summary
        updateCartSummary(subtotal);
        
        // Add event listeners to all interactive elements
        addCartEventListeners();
    }
    
    // Function to get product image based on ID
    function getProductImage(productId) {
        const productImages = {
            '1': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            '2': 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            '3': 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            '4': 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            '5': 'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            '6': 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
        };
        
        return productImages[productId] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';
    }
    
    // Function to update cart summary
    function updateCartSummary(subtotal) {
        const shipping = 10.00;
        const tax = subtotal * 0.08; // 8% tax
        const total = subtotal + shipping + tax;
        
        document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
        document.getElementById('shipping').textContent = `$${shipping.toFixed(2)}`;
        document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
        document.getElementById('total').textContent = `$${total.toFixed(2)}`;
    }
    
    // Function to add event listeners to cart buttons
    function addCartEventListeners() {
        // Increase quantity buttons
        const increaseButtons = document.querySelectorAll('.increase-quantity');
        increaseButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productId = this.getAttribute('data-id');
                updateItemQuantity(productId, 1);
            });
        });
        
        // Decrease quantity buttons
        const decreaseButtons = document.querySelectorAll('.decrease-quantity');
        decreaseButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productId = this.getAttribute('data-id');
                updateItemQuantity(productId, -1);
            });
        });
        
        // Quantity input fields
        const quantityInputs = document.querySelectorAll('.quantity-input');
        quantityInputs.forEach(input => {
            input.addEventListener('change', function() {
                const productId = this.getAttribute('data-id');
                const newQuantity = parseInt(this.value);
                
                if (isNaN(newQuantity) || newQuantity < 1) {
                    this.value = 1;
                    updateItemQuantity(productId, 0, 1);
                } else {
                    updateItemQuantity(productId, 0, newQuantity);
                }
            });
            
            // Prevent negative numbers
            input.addEventListener('keydown', function(e) {
                if (e.key === '-' || e.key === 'e' || e.key === 'E') {
                    e.preventDefault();
                }
            });
        });
        
        // Remove item buttons
        const removeButtons = document.querySelectorAll('.remove-item');
        removeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productId = this.getAttribute('data-id');
                removeItemFromCart(productId);
            });
        });
    }
    
    // Function to update item quantity
    function updateItemQuantity(id, change, setValue = null) {
        const cart = cartManager.updateQuantity(id, change, setValue);
        displayCartItems(); // Refresh display
        
        // Find the updated item for the alert message
        const updatedItem = cart.find(item => item.id === id);
        if (updatedItem) {
            showAlert(`Updated ${updatedItem.name} quantity to ${updatedItem.quantity}`, 'info');
        }
    }
    
    // Function to remove item from cart
    function removeItemFromCart(id) {
        const cart = cartManager.getCart();
        const itemToRemove = cart.find(item => item.id === id);
        
        if (itemToRemove) {
            cartManager.removeFromCart(id);
            displayCartItems(); // Refresh display
            showAlert(`${itemToRemove.name} removed from cart`, 'warning');
        }
    }
    
    // Function to handle checkout
    function handleCheckout() {
        const cart = cartManager.getCart();
        
        if (cart.length === 0) {
            showAlert('Your cart is empty! Add some items before checking out.', 'warning');
            return;
        }
        
        // Calculate total for confirmation
        const totals = cartManager.calculateTotal();
        const tax = totals.subtotal * 0.08;
        const finalTotal = totals.total + tax;
        
        // Show checkout confirmation
        const confirmed = confirm(`Proceed to checkout?\n\nTotal: $${finalTotal.toFixed(2)}\n\nThis is a demo site. In a real application, you would be redirected to a secure payment page.`);
        
        if (confirmed) {
            // In a real application, this would process the order
            showAlert('Thank you for your order! This is a demo - no actual payment was processed.', 'success');
            
            // Clear cart after successful "checkout"
            setTimeout(() => {
                cartManager.clearCart();
                displayCartItems();
            }, 2000);
        }
    }
    
    // Function to handle clear cart
    function handleClearCart() {
        const cart = cartManager.getCart();
        
        if (cart.length === 0) {
            showAlert('Your cart is already empty!', 'info');
            return;
        }
        
        const confirmed = confirm('Are you sure you want to clear your entire cart?');
        
        if (confirmed) {
            cartManager.clearCart();
            displayCartItems();
            showAlert('Your cart has been cleared', 'warning');
        }
    }
});

// Add clearCart method to CartManager class in main.js
// Update the main.js file to include this method:

// In js/main.js, add this method to the CartManager class:
/*
clearCart() {
    localStorage.setItem('cart', JSON.stringify([]));
    this.updateCartCount();
    return [];
}
*/
