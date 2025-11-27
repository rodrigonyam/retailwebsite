# BeautyHub - Retail Website for Beauty & Wellness Products

A modern, fully-featured e-commerce website for beauty products, vitamins, personal care, and home care items. The platform supports both regular customers and reseller members with wholesale pricing.

## 🌟 Features

### Customer Features
- **Product Catalog**: Browse 24+ products across 4 categories
  - Beauty Products (Mignonne™ brand)
  - Vitamins & Supplements (Nature™ brand)
  - Personal Care
  - Home Care
- **Shopping Cart**: Add products, manage quantities, and checkout
- **Product Filtering**: Filter by category for easy navigation
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **User Authentication**: Login/signup system with persistent sessions

### Reseller Program
- **Membership System**: Annual fee of $99 to become a reseller
- **Wholesale Pricing**: 20-30% discount on all products for members
- **Referral Program**: Get unique referral codes to share
- **Marketing Support**: Access to marketing materials and resources
- **Priority Support**: Dedicated customer service for resellers

### User Interface
- **Navigation Menu**: Easy access to all sections
- **User Dropdown Menu**: Profile, account settings, referral program, store locator, logout
- **Shopping Cart Modal**: View and manage cart items
- **Authentication Modal**: Login and signup forms
- **Membership Modal**: Reseller signup and payment
- **Contact Form**: Get in touch with customer support
- **Newsletter Signup**: Subscribe for updates and offers

## 📁 Project Structure

```
retailwebsite/
├── index.html              # Main HTML file
├── css/
│   └── style.css          # All styling and responsive design
├── js/
│   ├── products.js        # Product data and catalog
│   └── script.js          # Main JavaScript functionality
└── README.md              # This file
```

## 🎨 Design Features

### Color Scheme
- Primary: Pink (#e91e63)
- Secondary: Purple (#9c27b0)
- Accent: Hot Pink (#ff4081)
- Dark: Almost Black (#212121)
- Light: Off White (#f5f5f5)

### Sections
1. **Hero Section**: Eye-catching banner with CTAs
2. **Categories**: Visual category cards for easy navigation
3. **Featured Products**: Grid display with filtering options
4. **Membership Plans**: Comparison between customer and reseller options
5. **About Section**: Company information and statistics
6. **Contact Section**: Form and contact information
7. **Footer**: Links, social media, and newsletter signup

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with flexbox and grid
- **JavaScript (ES6+)**: Interactive functionality
- **Font Awesome 6.4**: Icons throughout the site
- **LocalStorage API**: Cart and user session persistence

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No server required - runs entirely in the browser

### Installation

1. **Download/Clone the project**
   ```
   Simply copy all files to your desired location
   ```

2. **Open in browser**
   ```
   Double-click index.html or open it in your browser
   ```

That's it! No build process or dependencies required.

## 📱 How to Use

### For Customers

1. **Browse Products**
   - Navigate to the Products section
   - Use category filters to find specific items
   - Click on category cards for quick navigation

2. **Add to Cart**
   - Click the "Add" button on any product
   - View cart by clicking the cart icon in navigation
   - Manage quantities and remove items as needed

3. **Checkout**
   - Click "Proceed to Checkout" in the cart modal
   - Login if not already authenticated
   - Complete the checkout process

### For Resellers

1. **Sign Up for Membership**
   - Click "Become a Reseller" button
   - Fill out the membership form
   - Pay the annual fee of $99
   - Get instant access to wholesale pricing

2. **Access Benefits**
   - See wholesale prices on all products (20-30% off)
   - Access referral program through user menu
   - Get your unique referral code
   - Share with friends and earn commissions

3. **Manage Account**
   - Click the user icon in navigation
   - Access Profile, Account Settings, and Referral Program
   - Track your sales and referrals (coming soon)

## 🔐 User Menu Options

Click the user icon to access:
- **Profile**: View and edit your profile information
- **Account Settings**: Manage your account preferences
- **Sign Up**: Create a new account (when logged out)
- **Login**: Sign in to your account (when logged out)
- **Referral Program**: Access your referral code and track referrals
- **Store in Your Area**: Find physical store locations near you
- **Logout**: Sign out of your account

## 💾 Data Persistence

The website uses browser LocalStorage to save:
- **Cart Items**: Your shopping cart persists between sessions
- **Login Status**: Stay logged in across browser sessions
- **Membership Status**: Reseller status is remembered
- **User Email**: Quick access to account information

## 🎯 Product Categories

### Beauty Products (Mignonne™)
- Hydrating Face Serum
- Anti-Aging Night Cream
- Vitamin C Brightening Mask
- Natural Lip Gloss Set
- Matte Foundation
- Eye Shadow Palette

### Vitamins & Supplements (Nature™)
- Multivitamin Complex
- Omega-3 Fish Oil
- Vitamin D3 + K2
- Probiotic Complex
- Collagen Peptides
- B-Complex Vitamins

### Personal Care
- Organic Body Lotion
- Charcoal Detox Soap
- Herbal Shampoo & Conditioner
- Deodorant Cream
- Hand Cream Set
- Body Scrub

### Home Care
- All-Purpose Cleaner
- Laundry Detergent
- Dish Soap
- Glass Cleaner
- Floor Cleaner
- Air Freshener Set

## 💰 Pricing Structure

### Regular Customers
- Standard retail pricing on all products
- Free account creation
- Order tracking and customer support

### Reseller Members ($99/year)
- 20-30% wholesale discount on all products
- Ability to resell products for profit
- Marketing materials included
- Dedicated reseller portal
- Priority customer support
- Monthly promotions and special offers

## 🎨 Customization

### Adding New Products
Edit `js/products.js` and add new product objects:

```javascript
{
    id: 25,
    name: "Product Name",
    category: "beauty", // or "vitamins", "personal", "home"
    price: 49.99,
    wholesalePrice: 34.99,
    description: "Product description",
    icon: "fa-icon-name"
}
```

### Changing Colors
Edit `css/style.css` root variables:

```css
:root {
    --primary-color: #e91e63;
    --secondary-color: #9c27b0;
    --accent-color: #ff4081;
    /* ... */
}
```

### Modifying Membership Fee
Edit the membership modal in `index.html` and related JavaScript in `script.js`.

## 📊 Statistics

- **500+** Products available
- **10K+** Happy customers
- **2K+** Active resellers
- **4** Product categories

## 🔄 Future Enhancements

- Backend integration for real payment processing
- User profile pages with order history
- Advanced search and filtering
- Product reviews and ratings
- Wishlist functionality
- Store locator with maps
- Email notifications
- Inventory management
- Analytics dashboard for resellers
- Mobile app version

## 🐛 Troubleshooting

### Cart items disappear
- Check if LocalStorage is enabled in your browser
- Clear browser cache and try again

### Wholesale prices not showing
- Ensure you're logged in as a member
- Check LocalStorage for 'isMember' value
- Try logging out and back in

### Modal not closing
- Click the X button or outside the modal
- Refresh the page if issues persist

## 📄 License

This project is open source and available for personal and commercial use.

## 👥 Support

For questions or support:
- Email: info@beautyhub.com
- Phone: +1 (555) 123-4567
- Address: 123 Beauty Street, Wellness City, BC 12345

## 🙏 Acknowledgments

- Font Awesome for icons
- Google Fonts for typography
- Modern CSS features for responsive design

---

**Version**: 1.0.0  
**Last Updated**: November 27, 2025  
**Built with**: HTML5, CSS3, JavaScript ES6+
