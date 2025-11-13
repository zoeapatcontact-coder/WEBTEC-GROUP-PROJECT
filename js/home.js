// Home page specific functionality
document.addEventListener('DOMContentLoaded', function() {
    // Featured products data
    const featuredProducts = [
        {
            id: 1,
            name: "Wireless Headphones",
            price: 129.99,
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            description: "Premium sound quality with noise cancellation technology."
        },
        {
            id: 2,
            name: "Smart Watch",
            price: 199.99,
            image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            description: "Track your fitness and stay connected with this advanced smartwatch."
        },
        {
            id: 3,
            name: "Bluetooth Speaker",
            price: 79.99,
            image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            description: "Portable speaker with 360° sound and waterproof design."
        }
    ];

    // Display featured products
    displayFeaturedProducts(featuredProducts);

    function displayFeaturedProducts(products) {
        const container = document.getElementById('featured-products');
        
        products.forEach(product => {
            const productHTML = `
                <div class="col-md-4">
                    <div class="card product-card h-100">
                        <img src="${product.image}" class="card-img-top" alt="${product.name}">
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text flex-grow-1">${product.description}</p>
                            <p class="h5 text-primary">$${product.price.toFixed(2)}</p>
                            <button class="btn btn-primary add-to-cart mt-auto" 
                                    data-id="${product.id}" 
                                    data-name="${product.name}" 
                                    data-price="${product.price}">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            `;
            
            container.innerHTML += productHTML;
        });
    }
});
