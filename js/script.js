// Global variables
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentFilter = 'all';
let isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
let isMember = localStorage.getItem('isMember') === 'true';
let isChatActive = false;
let chatUserName = '';
let chatUserEmail = '';
let chatUserPhone = '';

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    initializeProducts();
    updateCartCount();
    setupEventListeners();
    updateUserInterface();
});

// Initialize products display
function initializeProducts() {
    displayProducts(currentFilter);
}

// Display products based on filter
function displayProducts(filter) {
    const productGrid = document.getElementById('productGrid');
    const products = window.productsData;
    
    let filteredProducts = products;
    if (filter !== 'all') {
        filteredProducts = products.filter(product => product.category === filter);
    }
    
    productGrid.innerHTML = '';
    
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productGrid.appendChild(productCard);
    });
}

// Create product card element
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.category = product.category;
    
    card.innerHTML = `
        <div class="product-image">
            <i class="fas ${product.icon}"></i>
        </div>
        <div class="product-info">
            <span class="product-category">${getCategoryName(product.category)}</span>
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="product-footer">
                <div>
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    ${isMember ? `<div class="wholesale-price">Member: $${product.wholesalePrice.toFixed(2)}</div>` : ''}
                </div>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    <i class="fas fa-cart-plus"></i> Add
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// Get category display name
function getCategoryName(category) {
    const names = {
        'beauty': 'Beauty',
        'vitamins': 'Vitamins',
        'personal': 'Personal Care',
        'home': 'Home Care'
    };
    return names[category] || category;
}

// Add product to cart
function addToCart(productId) {
    const product = window.productsData.find(p => p.id === productId);
    if (!product) return;
    
    const price = isMember ? product.wholesalePrice : product.price;
    
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: price,
            icon: product.icon,
            quantity: 1
        });
    }
    
    saveCart();
    updateCartCount();
    showNotification('Product added to cart!');
}

// Remove product from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartCount();
    displayCartItems();
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Update cart count badge
function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
    }
}

// Display cart items in modal
function displayCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalElement = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        cartTotalElement.textContent = '$0.00';
        return;
    }
    
    let total = 0;
    cartItemsContainer.innerHTML = '';
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <i class="fas ${item.icon}"></i>
            </div>
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <div class="cart-item-price">$${item.price.toFixed(2)} x ${item.quantity}</div>
            </div>
            <div class="cart-item-remove" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });
    
    cartTotalElement.textContent = `$${total.toFixed(2)}`;
}

// Setup event listeners
function setupEventListeners() {
    // Hamburger menu
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
    
    // Filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentFilter = button.dataset.filter;
            displayProducts(currentFilter);
        });
    });
    
    // Category cards
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;
            document.querySelector(`[data-filter="${category}"]`).click();
            document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    // Cart button
    const cartBtn = document.getElementById('cartBtn');
    const cartModal = document.getElementById('cartModal');
    
    if (cartBtn && cartModal) {
        cartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            displayCartItems();
            cartModal.classList.add('active');
        });
    }
    
    // User button
    const userBtn = document.getElementById('userBtn');
    const authModal = document.getElementById('authModal');
    const userDropdown = document.getElementById('userDropdown');
    
    if (userBtn && userDropdown) {
        userBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            userDropdown.classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!userBtn.contains(e.target) && !userDropdown.contains(e.target)) {
                userDropdown.classList.remove('active');
            }
        });
    }
    
    // Dropdown menu items
    const profileLink = document.getElementById('profileLink');
    const accountLink = document.getElementById('accountLink');
    const signupDropLink = document.getElementById('signupDropLink');
    const loginDropLink = document.getElementById('loginDropLink');
    const referralLink = document.getElementById('referralLink');
    const storeLocatorLink = document.getElementById('storeLocatorLink');
    const logoutLink = document.getElementById('logoutLink');
    
    if (profileLink) {
        profileLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (isLoggedIn) {
                showNotification('Profile page - Coming soon!');
            } else {
                showNotification('Please login to view your profile');
                authModal.classList.add('active');
            }
            userDropdown.classList.remove('active');
        });
    }
    
    if (accountLink) {
        accountLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (isLoggedIn) {
                showNotification('Account settings - Coming soon!');
            } else {
                showNotification('Please login to access account settings');
                authModal.classList.add('active');
            }
            userDropdown.classList.remove('active');
        });
    }
    
    if (signupDropLink) {
        signupDropLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (isLoggedIn) {
                showNotification('You are already logged in');
            } else {
                // Switch to signup mode
                document.getElementById('authTitle').textContent = 'Sign Up';
                document.getElementById('authSubmit').textContent = 'Sign Up';
                document.getElementById('switchAuth').innerHTML = 'Already have an account? <a href="#">Login</a>';
                document.getElementById('nameGroup').style.display = 'block';
                authModal.classList.add('active');
            }
            userDropdown.classList.remove('active');
        });
    }
    
    if (loginDropLink) {
        loginDropLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (isLoggedIn) {
                showNotification('You are already logged in');
            } else {
                // Switch to login mode
                document.getElementById('authTitle').textContent = 'Login';
                document.getElementById('authSubmit').textContent = 'Login';
                document.getElementById('switchAuth').innerHTML = 'Don\'t have an account? <a href="#">Sign up</a>';
                document.getElementById('nameGroup').style.display = 'none';
                authModal.classList.add('active');
            }
            userDropdown.classList.remove('active');
        });
    }
    
    if (referralLink) {
        referralLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (isLoggedIn && isMember) {
                showNotification('Your referral code: MEMBER' + Math.floor(Math.random() * 10000) + ' - Share with friends!');
            } else if (isLoggedIn) {
                showNotification('Join our reseller program to get your referral code!');
                document.getElementById('membership').scrollIntoView({ behavior: 'smooth' });
            } else {
                showNotification('Please login to access the referral program');
                authModal.classList.add('active');
            }
            userDropdown.classList.remove('active');
        });
    }
    
    if (storeLocatorLink) {
        storeLocatorLink.addEventListener('click', (e) => {
            e.preventDefault();
            showNotification('Store locator - Coming soon! We are expanding to your area.');
            userDropdown.classList.remove('active');
        });
    }
    
    if (logoutLink) {
        logoutLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (isLoggedIn) {
                handleLogout();
            } else {
                showNotification('You are not logged in');
            }
            userDropdown.classList.remove('active');
        });
    }
    
    // Membership signup button
    const signupBtn = document.getElementById('signupBtn');
    const membershipModal = document.getElementById('membershipModal');
    
    if (signupBtn && membershipModal) {
        signupBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (isLoggedIn) {
                membershipModal.classList.add('active');
            } else {
                showNotification('Please login first to become a reseller');
                authModal.classList.add('active');
            }
        });
    }
    
    // Close modals
    const closeButtons = document.querySelectorAll('.close-modal');
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.closest('.modal').classList.remove('active');
        });
    });
    
    // Close modal on outside click
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });
    
    // Auth form switch
    const switchAuth = document.getElementById('switchAuth');
    const authTitle = document.getElementById('authTitle');
    const authSubmit = document.getElementById('authSubmit');
    const nameGroup = document.getElementById('nameGroup');
    
    let isLoginMode = true;
    
    if (switchAuth) {
        switchAuth.addEventListener('click', (e) => {
            e.preventDefault();
            isLoginMode = !isLoginMode;
            
            if (isLoginMode) {
                authTitle.textContent = 'Login';
                authSubmit.textContent = 'Login';
                switchAuth.innerHTML = 'Don\'t have an account? <a href="#">Sign up</a>';
                nameGroup.style.display = 'none';
            } else {
                authTitle.textContent = 'Sign Up';
                authSubmit.textContent = 'Sign Up';
                switchAuth.innerHTML = 'Already have an account? <a href="#">Login</a>';
                nameGroup.style.display = 'block';
            }
        });
    }
    
    // Auth form submit
    const authForm = document.getElementById('authForm');
    if (authForm) {
        authForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleAuth(isLoginMode);
        });
    }
    
    // Membership form submit
    const membershipForm = document.getElementById('membershipForm');
    if (membershipForm) {
        membershipForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleMembershipSignup();
        });
    }
    
    // Contact form submit
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showNotification('Thank you! We will get back to you soon.');
            contactForm.reset();
        });
    }
    
    // Checkout button
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                showNotification('Your cart is empty!');
                return;
            }
            handleCheckout();
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Product Updates Tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.dataset.tab;
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Notify Me buttons
    const notifyButtons = document.querySelectorAll('.notify-btn');
    notifyButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const productName = button.closest('.upcoming-card').querySelector('h3').textContent;
            if (isLoggedIn) {
                showNotification(`We'll notify you when ${productName} launches!`);
                button.textContent = 'Notification Set!';
                button.disabled = true;
            } else {
                showNotification('Please login to get launch notifications');
                document.getElementById('authModal').classList.add('active');
            }
        });
    });

    // Suggestion form
    const suggestionForm = document.getElementById('suggestionForm');
    if (suggestionForm) {
        suggestionForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (!isLoggedIn) {
                // Check if guest info is provided
                const guestName = suggestionForm.querySelector('.guest-name');
                const guestEmail = suggestionForm.querySelector('.guest-email');
                const guestPhone = suggestionForm.querySelector('.guest-phone');
                
                if (!guestName.value || !guestEmail.value || !guestPhone.value) {
                    showNotification('Please login or provide your full contact information (name, email, and phone) to submit a suggestion');
                    return;
                }
                
                showNotification(`Thank you ${guestName.value}! Your suggestion has been submitted.`);
            } else {
                showNotification('Thank you for your suggestion! We\'ll review it soon.');
            }
            
            suggestionForm.reset();
        });
    }

    // Bring Back buttons
    const bringBackButtons = document.querySelectorAll('.bring-back-btn');
    bringBackButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const productName = button.dataset.product;
            
            if (!isLoggedIn) {
                const proceed = confirm(`Would you like to login to request ${productName}?\n\nClick OK to login or Cancel to continue as guest`);
                if (proceed) {
                    document.getElementById('authModal').classList.add('active');
                    return;
                } else {
                    // Show guest form for bring back request
                    showGuestRequestForm(productName, 'bringback');
                    return;
                }
            }
            
            showNotification(`Your request to bring back ${productName} has been recorded!`);
            button.textContent = 'Request Submitted';
            button.disabled = true;
        });
    });

    // Bring Back Request form
    const bringbackForm = document.getElementById('bringbackForm');
    if (bringbackForm) {
        bringbackForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (!isLoggedIn) {
                const guestName = bringbackForm.querySelector('.guest-name');
                const guestEmail = bringbackForm.querySelector('.guest-email');
                const guestPhone = bringbackForm.querySelector('.guest-phone');
                
                if (!guestName.value || !guestEmail.value || !guestPhone.value) {
                    showNotification('Please login or provide your full contact information (name, email, and phone) to submit a request');
                    return;
                }
                
                showNotification(`Thank you ${guestName.value}! Your request has been submitted.`);
            } else {
                showNotification('Thank you! Your request has been submitted.');
            }
            
            bringbackForm.reset();
        });
    }

    // Vote buttons
    const voteButtons = document.querySelectorAll('.vote-btn');
    voteButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            if (isLoggedIn) {
                const currentVotes = parseInt(button.textContent.match(/\d+/)[0]);
                button.innerHTML = `<i class="fas fa-thumbs-up"></i> ${currentVotes + 1}`;
                showNotification('Thanks for voting!');
                button.disabled = true;
            } else {
                showNotification('Please login to vote');
                document.getElementById('authModal').classList.add('active');
            }
        });
    });

    // Chat functionality
    const chatButton = document.getElementById('chatButton');
    const chatWidget = document.getElementById('chatWidget');
    const chatLoginModal = document.getElementById('chatLoginModal');
    const minimizeChat = document.getElementById('minimizeChat');
    const chatInput = document.getElementById('chatInput');
    const chatSend = document.getElementById('chatSend');
    const chatMessages = document.getElementById('chatMessages');
    const chatBtn = document.getElementById('chatBtn');
    
    // Open chat from button or nav icon
    function openChat() {
        if (!isChatActive) {
            chatLoginModal.classList.add('active');
        } else {
            chatWidget.classList.add('active');
            chatButton.style.display = 'none';
        }
    }
    
    if (chatButton) {
        chatButton.addEventListener('click', openChat);
    }
    
    if (chatBtn) {
        chatBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openChat();
        });
    }
    
    if (minimizeChat) {
        minimizeChat.addEventListener('click', () => {
            chatWidget.classList.remove('active');
            chatButton.style.display = 'flex';
        });
    }
    
    // Chat login button
    const chatLoginBtn = document.getElementById('chatLoginBtn');
    if (chatLoginBtn) {
        chatLoginBtn.addEventListener('click', () => {
            chatLoginModal.classList.remove('active');
            if (isLoggedIn) {
                startChat();
            } else {
                document.getElementById('authModal').classList.add('active');
                showNotification('Please login to start chatting');
            }
        });
    }
    
    // Chat guest form
    const chatGuestForm = document.getElementById('chatGuestForm');
    if (chatGuestForm) {
        chatGuestForm.addEventListener('submit', (e) => {
            e.preventDefault();
            chatUserName = document.getElementById('chatGuestName').value;
            chatUserEmail = document.getElementById('chatGuestEmail').value;
            chatUserPhone = document.getElementById('chatGuestPhone').value;
            
            if (chatUserName && chatUserEmail && chatUserPhone) {
                chatLoginModal.classList.remove('active');
                startChat(true);
            } else {
                showNotification('Please fill in all fields to continue');
            }
        });
    }
    
    // Start chat
    function startChat(isGuest = false) {
        isChatActive = true;
        chatWidget.classList.add('active');
        chatButton.style.display = 'none';
        chatInput.disabled = false;
        chatSend.disabled = false;
        
        // Welcome message
        setTimeout(() => {
            const userName = isGuest ? chatUserName : (localStorage.getItem('userEmail') || 'there');
            addBotMessage(`Great to have you here, ${userName}! How can I assist you with our beauty products, vitamins, or membership program?`);
        }, 1000);
        
        // Remove badge
        const badge = document.querySelector('.chat-badge');
        if (badge) badge.style.display = 'none';
    }
    
    // Send message
    function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;
        
        // Add user message
        addUserMessage(message);
        chatInput.value = '';
        
        // Simulate bot response
        setTimeout(() => {
            showTypingIndicator();
            setTimeout(() => {
                removeTypingIndicator();
                getBotResponse(message);
            }, 1500);
        }, 500);
    }
    
    if (chatSend) {
        chatSend.addEventListener('click', sendMessage);
    }
    
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    // Add user message
    function addUserMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chat-message user-message';
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-user"></i>
            </div>
            <div class="message-content">
                <p>${text}</p>
                <span class="message-time">${getCurrentTime()}</span>
            </div>
        `;
        chatMessages.appendChild(messageDiv);
        scrollChatToBottom();
    }
    
    // Add bot message
    function addBotMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chat-message bot-message';
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <p>${text}</p>
                <span class="message-time">${getCurrentTime()}</span>
            </div>
        `;
        chatMessages.appendChild(messageDiv);
        scrollChatToBottom();
    }
    
    // Show typing indicator
    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chat-message bot-message typing-indicator';
        typingDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <div class="chat-typing">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        chatMessages.appendChild(typingDiv);
        scrollChatToBottom();
    }
    
    // Remove typing indicator
    function removeTypingIndicator() {
        const typingIndicator = document.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    // Get bot response
    function getBotResponse(userMessage) {
        const message = userMessage.toLowerCase();
        let response = '';
        
        if (message.includes('product') || message.includes('buy')) {
            response = 'We offer beauty products (Mignonne™), vitamins (Nature™), personal care, and home care items. Would you like to browse our catalog or learn about specific products?';
        } else if (message.includes('member') || message.includes('reseller') || message.includes('sell')) {
            response = 'Our reseller membership is $99/year and gives you 20-30% wholesale pricing on all products. You can resell for profit! Would you like to sign up or learn more?';
        } else if (message.includes('price') || message.includes('cost')) {
            response = 'Our products range from $12.99 to $59.99. As a reseller member, you get wholesale prices 20-30% off. What category interests you?';
        } else if (message.includes('shipping') || message.includes('delivery')) {
            response = 'We offer free shipping on orders over $50. Standard delivery takes 3-5 business days. Express shipping is available at checkout.';
        } else if (message.includes('return') || message.includes('refund')) {
            response = 'We have a 30-day return policy for unopened products. Refunds are processed within 5-7 business days. Would you like help with a return?';
        } else if (message.includes('help') || message.includes('support')) {
            response = 'I\'m here to help! You can ask about products, membership, shipping, returns, or anything else. What would you like to know?';
        } else if (message.includes('thanks') || message.includes('thank you')) {
            response = 'You\'re welcome! Is there anything else I can help you with today?';
        } else {
            response = 'Thanks for reaching out! I can help you with product information, membership details, orders, or general questions. What would you like to know?';
        }
        
        addBotMessage(response);
    }
    
    // Scroll chat to bottom
    function scrollChatToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Get current time
    function getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    }
}

// Handle authentication
function handleAuth(isLogin) {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (!email || !password) {
        showNotification('Please fill in all fields');
        return;
    }
    
    // Simulate authentication
    isLoggedIn = true;
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', email);
    
    showNotification(isLogin ? 'Login successful!' : 'Account created successfully!');
    document.getElementById('authModal').classList.remove('active');
    document.getElementById('authForm').reset();
    updateUserInterface();
}

// Handle membership signup
function handleMembershipSignup() {
    // Simulate payment processing
    setTimeout(() => {
        isMember = true;
        localStorage.setItem('isMember', 'true');
        
        showNotification('Welcome to our Reseller Program! You now have access to wholesale pricing.');
        document.getElementById('membershipModal').classList.remove('active');
        document.getElementById('membershipForm').reset();
        updateUserInterface();
        
        // Refresh products to show wholesale prices
        displayProducts(currentFilter);
    }, 1000);
}

// Handle checkout
function handleCheckout() {
    if (!isLoggedIn) {
        showNotification('Please login to proceed with checkout');
        document.getElementById('authModal').classList.add('active');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Simulate checkout process
    showNotification(`Processing order for $${total.toFixed(2)}...`);
    
    setTimeout(() => {
        showNotification('Order placed successfully! Thank you for your purchase.');
        cart = [];
        saveCart();
        updateCartCount();
        document.getElementById('cartModal').classList.remove('active');
    }, 2000);
}

// Update user interface based on login/membership status
function updateUserInterface() {
    const userBtn = document.getElementById('userBtn');
    const signupDropLink = document.getElementById('signupDropLink');
    const loginDropLink = document.getElementById('loginDropLink');
    const logoutLink = document.getElementById('logoutLink');
    const profileLink = document.getElementById('profileLink');
    const accountLink = document.getElementById('accountLink');
    
    if (isLoggedIn) {
        userBtn.innerHTML = '<i class="fas fa-user-check"></i>';
        userBtn.title = 'Account';
        
        // Show/hide appropriate menu items
        if (signupDropLink) signupDropLink.style.display = 'none';
        if (loginDropLink) loginDropLink.style.display = 'none';
        if (logoutLink) logoutLink.style.display = 'flex';
        if (profileLink) profileLink.style.display = 'flex';
        if (accountLink) accountLink.style.display = 'flex';
    } else {
        userBtn.innerHTML = '<i class="fas fa-user"></i>';
        userBtn.title = 'Login/Signup';
        
        // Show/hide appropriate menu items
        if (signupDropLink) signupDropLink.style.display = 'flex';
        if (loginDropLink) loginDropLink.style.display = 'flex';
        if (logoutLink) logoutLink.style.display = 'none';
        if (profileLink) profileLink.style.display = 'none';
        if (accountLink) accountLink.style.display = 'none';
    }
    
    if (isMember) {
        // Show wholesale prices on products
        displayProducts(currentFilter);
    }
}

// Handle logout
function handleLogout() {
    isLoggedIn = false;
    isMember = false;
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('isMember');
    localStorage.removeItem('userEmail');
    
    showNotification('Logged out successfully');
    updateUserInterface();
    displayProducts(currentFilter);
}

// Show user menu (deprecated - kept for compatibility)
function showUserMenu() {
    const userDropdown = document.getElementById('userDropdown');
    if (userDropdown) {
        userDropdown.classList.toggle('active');
    }
}

// Show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background-color: #333;
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Show guest request form
function showGuestRequestForm(productName, requestType) {
    const existingModal = document.getElementById('guestRequestModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.id = 'guestRequestModal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Continue as Guest</h3>
                <span class="close-modal">&times;</span>
            </div>
            <div class="modal-body">
                <p style="margin-bottom: 1.5rem; color: #666;">Please provide your contact information to submit this request.</p>
                <form id="guestRequestForm">
                    <div class="form-group">
                        <input type="text" id="guestName" placeholder="Full Name" required>
                    </div>
                    <div class="form-group">
                        <input type="email" id="guestEmail" placeholder="Email Address" required>
                    </div>
                    <div class="form-group">
                        <input type="tel" id="guestPhone" placeholder="Phone Number" required>
                    </div>
                    <input type="hidden" id="guestProductName" value="${productName}">
                    <input type="hidden" id="guestRequestType" value="${requestType}">
                    <button type="submit" class="btn btn-primary btn-block">Submit Request</button>
                </form>
                <p style="margin-top: 1rem; text-align: center; color: #666;">
                    Already have an account? <a href="#" id="guestLoginLink" style="color: var(--primary-color); font-weight: 600;">Login here</a>
                </p>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal handlers
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => modal.remove());
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // Login link handler
    const loginLink = modal.querySelector('#guestLoginLink');
    loginLink.addEventListener('click', (e) => {
        e.preventDefault();
        modal.remove();
        document.getElementById('authModal').classList.add('active');
    });
    
    // Form submit handler
    const guestForm = modal.querySelector('#guestRequestForm');
    guestForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('guestName').value;
        const email = document.getElementById('guestEmail').value;
        const phone = document.getElementById('guestPhone').value;
        const product = document.getElementById('guestProductName').value;
        
        showNotification(`Thank you ${name}! Your request for ${product} has been submitted.`);
        modal.remove();
        
        // Update the button if it came from bring back button
        const bringBackBtn = Array.from(document.querySelectorAll('.bring-back-btn'))
            .find(btn => btn.dataset.product === product);
        if (bringBackBtn) {
            bringBackBtn.textContent = 'Request Submitted';
            bringBackBtn.disabled = true;
        }
    });
}

// Make addToCart and removeFromCart available globally
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
