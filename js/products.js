// Sample product data
const products = [
    // Beauty Products
    {
        id: 1,
        name: "Mignonne™ Hydrating Face Serum",
        category: "beauty",
        price: 49.99,
        wholesalePrice: 34.99,
        description: "Intensive hydration serum with hyaluronic acid",
        icon: "fa-tint",
        rating: 4.8,
        reviewCount: 234,
        itemCode: "MIG-HS-001",
        availability: "in-stock",
        stockCount: 45
    },
    {
        id: 2,
        name: "Mignonne™ Anti-Aging Night Cream",
        category: "beauty",
        price: 59.99,
        wholesalePrice: 41.99,
        description: "Rich night cream with retinol and peptides",
        icon: "fa-moon",
        rating: 4.6,
        reviewCount: 189,
        itemCode: "MIG-NC-002",
        availability: "in-stock",
        stockCount: 28
    },
    {
        id: 3,
        name: "Mignonne™ Vitamin C Brightening Mask",
        category: "beauty",
        price: 39.99,
        wholesalePrice: 27.99,
        description: "Illuminating face mask with vitamin C",
        icon: "fa-star",
        rating: 4.7,
        reviewCount: 156,
        itemCode: "MIG-VM-003",
        availability: "low-stock",
        stockCount: 8
    },
    {
        id: 4,
        name: "Mignonne™ Natural Lip Gloss Set",
        category: "beauty",
        price: 29.99,
        wholesalePrice: 20.99,
        description: "Set of 3 nourishing lip glosses",
        icon: "fa-kiss",
        rating: 4.5,
        reviewCount: 98,
        itemCode: "MIG-LG-004",
        availability: "out-of-stock",
        stockCount: 0
    },
    {
        id: 5,
        name: "Mignonne™ Matte Foundation",
        category: "beauty",
        price: 44.99,
        wholesalePrice: 31.49,
        description: "Long-lasting matte finish foundation",
        icon: "fa-palette",
        rating: 4.4,
        reviewCount: 167,
        itemCode: "MIG-MF-005",
        availability: "in-stock",
        stockCount: 32
    },
    {
        id: 6,
        name: "Mignonne™ Eye Shadow Palette",
        category: "beauty",
        price: 54.99,
        wholesalePrice: 38.49,
        description: "12 colors professional eye shadow palette",
        icon: "fa-eye",
        rating: 4.9,
        reviewCount: 312,
        itemCode: "MIG-EP-006",
        availability: "discontinued",
        stockCount: 0
    },

    // Vitamins & Supplements
    {
        id: 7,
        name: "Nature™ Multivitamin Complex",
        category: "vitamins",
        price: 34.99,
        wholesalePrice: 24.49,
        description: "Daily multivitamin with essential nutrients",
        icon: "fa-capsules",
        rating: 4.6,
        reviewCount: 287,
        itemCode: "NAT-MV-007",
        availability: "in-stock",
        stockCount: 67
    },
    {
        id: 8,
        name: "Nature™ Omega-3 Fish Oil",
        category: "vitamins",
        price: 29.99,
        wholesalePrice: 20.99,
        description: "Premium omega-3 fatty acids supplement",
        icon: "fa-fish",
        rating: 4.7,
        reviewCount: 198,
        itemCode: "NAT-FO-008",
        availability: "in-stock",
        stockCount: 89
    },
    {
        id: 9,
        name: "Nature™ Vitamin D3 + K2",
        category: "vitamins",
        price: 24.99,
        wholesalePrice: 17.49,
        description: "Bone health support formula",
        icon: "fa-bone",
        rating: 4.5,
        reviewCount: 143,
        itemCode: "NAT-VD-009",
        availability: "low-stock",
        stockCount: 12
    },
    {
        id: 10,
        name: "Nature™ Probiotic Complex",
        category: "vitamins",
        price: 39.99,
        wholesalePrice: 27.99,
        description: "Digestive health probiotic blend",
        icon: "fa-heartbeat",
        rating: 4.8,
        reviewCount: 201,
        itemCode: "NAT-PC-010",
        availability: "in-stock",
        stockCount: 54
    },
    {
        id: 11,
        name: "Nature™ Collagen Peptides",
        category: "vitamins",
        price: 44.99,
        wholesalePrice: 31.49,
        description: "Skin, hair, and nail support",
        icon: "fa-hand-sparkles",
        rating: 4.6,
        reviewCount: 176,
        itemCode: "NAT-CP-011",
        availability: "pre-order",
        stockCount: 0
    },
    {
        id: 12,
        name: "Nature™ B-Complex Vitamins",
        category: "vitamins",
        price: 19.99,
        wholesalePrice: 13.99,
        description: "Energy and metabolism support",
        icon: "fa-bolt",
        rating: 4.3,
        reviewCount: 134,
        itemCode: "NAT-BC-012",
        availability: "in-stock",
        stockCount: 78
        description: "Energy and metabolism support",
        icon: "fa-bolt"
    },

    // Personal Care
    {
        id: 13,
        name: "Organic Body Lotion",
        category: "personal",
        price: 24.99,
        wholesalePrice: 17.49,
        description: "Nourishing body lotion with shea butter",
        icon: "fa-pump-soap"
    },
    {
        id: 14,
        name: "Charcoal Detox Soap",
        category: "personal",
        price: 14.99,
        wholesalePrice: 10.49,
        description: "Deep cleansing activated charcoal soap",
        icon: "fa-soap"
    },
    {
        id: 15,
        name: "Herbal Shampoo & Conditioner",
        category: "personal",
        price: 32.99,
        wholesalePrice: 23.09,
        description: "Natural hair care duo set",
        icon: "fa-shower"
    },
    {
        id: 16,
        name: "Deodorant Cream",
        category: "personal",
        price: 18.99,
        wholesalePrice: 13.29,
        description: "Natural aluminum-free deodorant",
        icon: "fa-spray-can"
    },
    {
        id: 17,
        name: "Hand Cream Set",
        category: "personal",
        price: 26.99,
        wholesalePrice: 18.89,
        description: "Moisturizing hand cream trio",
        icon: "fa-hands"
    },
    {
        id: 18,
        name: "Body Scrub",
        category: "personal",
        price: 22.99,
        wholesalePrice: 16.09,
        description: "Exfoliating sugar body scrub",
        icon: "fa-hand-sparkles"
    },

    // Home Care
    {
        id: 19,
        name: "All-Purpose Cleaner",
        category: "home",
        price: 16.99,
        wholesalePrice: 11.89,
        description: "Natural multi-surface cleaner",
        icon: "fa-spray-can"
    },
    {
        id: 20,
        name: "Laundry Detergent",
        category: "home",
        price: 21.99,
        wholesalePrice: 15.39,
        description: "Eco-friendly laundry detergent pods",
        icon: "fa-tshirt"
    },
    {
        id: 21,
        name: "Dish Soap",
        category: "home",
        price: 12.99,
        wholesalePrice: 9.09,
        description: "Plant-based dish washing liquid",
        icon: "fa-utensils"
    },
    {
        id: 22,
        name: "Glass Cleaner",
        category: "home",
        price: 14.99,
        wholesalePrice: 10.49,
        description: "Streak-free glass cleaner",
        icon: "fa-window-maximize"
    },
    {
        id: 23,
        name: "Floor Cleaner",
        category: "home",
        price: 18.99,
        wholesalePrice: 13.29,
        description: "Wood and tile floor cleaning solution",
        icon: "fa-broom"
    },
    {
        id: 24,
        name: "Air Freshener Set",
        category: "home",
        price: 19.99,
        wholesalePrice: 13.99,
        description: "Natural essential oil air fresheners",
        icon: "fa-wind"
    }
];

// Export products for use in main script
window.productsData = products;
