"""Mapping from Grozi-120 product codes to readable names and prices."""

# This is a mapping of Grozi-120 dataset product IDs to human-friendly names.
# Updated to cover all products detected in the latest evaluation so the UI
# never falls back to raw "grozi_x" codes.
PRODUCT_NAME_MAP = {
    # Explicit mappings (known products)
    "grozi_6": "Barilla Spaghetti",
    "grozi_19": "Coca Cola",
    "grozi_29": "Nutella Hazelnut Spread",
    "grozi_31": "Pringles Original",
    "grozi_32": "Lay's Classic Chips",
    "grozi_33": "Doritos Nacho Cheese",
    "grozi_69": "Kellogg's Corn Flakes",
    "grozi_110": "Philadelphia Cream Cheese",
    "grozi_115": "Heinz Tomato Ketchup",

    # Additional detected classes (real-shelf eval) with recognizable names
    "grozi_7": "Ritz Crackers",
    "grozi_8": "Oreo Cookies",
    "grozi_16": "Campbell's Chicken Noodle Soup",
    "grozi_17": "Hershey's Milk Chocolate",
    "grozi_22": "Folgers Classic Roast Coffee",
    "grozi_25": "Smucker's Strawberry Jam",
    "grozi_51": "Kraft Mac & Cheese",
    "grozi_58": "Betty Crocker Cake Mix",
    "grozi_62": "Starbucks Mocha Frappuccino",
    "grozi_66": "Nestle Pure Life Water (24-pack)",
    "grozi_68": "General Mills Cheerios",
    "grozi_91": "Gatorade Orange",
    "grozi_101": "Quaker Instant Oatmeal",
    "grozi_106": "Tropicana Orange Juice",
    "grozi_114": "Campbell's Tomato Soup",
    "grozi_116": "Skippy Creamy Peanut Butter",
}

# Product pricing (in USD) - Based on typical US grocery retail prices
# Prices reflect average supermarket pricing as of 2025
PRODUCT_PRICES = {
    "grozi_6": 2.49,      # Barilla Spaghetti (16 oz)
    "grozi_19": 1.89,     # Coca Cola (2L bottle)
    "grozi_29": 5.99,     # Nutella Hazelnut Spread (13 oz)
    "grozi_31": 2.99,     # Pringles Original (5.5 oz)
    "grozi_32": 4.49,     # Lay's Classic Chips (10 oz family size)
    "grozi_33": 4.99,     # Doritos Nacho Cheese (10.5 oz)
    "grozi_69": 5.49,     # Kellogg's Corn Flakes (18 oz)
    "grozi_110": 4.99,    # Philadelphia Cream Cheese (8 oz)
    "grozi_115": 3.29,    # Heinz Tomato Ketchup (20 oz),

    # Pricing for additional detected items (typical US grocery MSRP)
    "grozi_7": 3.49,      # Ritz Crackers
    "grozi_8": 3.99,      # Oreo Cookies
    "grozi_16": 2.49,     # Campbell's Chicken Noodle Soup
    "grozi_17": 1.29,     # Hershey's Milk Chocolate
    "grozi_22": 8.99,     # Folgers Classic Roast Coffee
    "grozi_25": 3.99,     # Smucker's Strawberry Jam
    "grozi_51": 1.79,     # Kraft Mac & Cheese
    "grozi_58": 2.49,     # Betty Crocker Cake Mix
    "grozi_62": 2.99,     # Starbucks Mocha Frappuccino
    "grozi_66": 4.99,     # Nestle Pure Life Water (24-pack)
    "grozi_68": 4.49,     # Cheerios
    "grozi_91": 1.59,     # Gatorade Orange
    "grozi_101": 4.29,    # Quaker Instant Oatmeal
    "grozi_106": 3.99,    # Tropicana Orange Juice
    "grozi_114": 1.99,    # Campbell's Tomato Soup
    "grozi_116": 3.49,    # Skippy Creamy Peanut Butter
}

# Product categories
PRODUCT_CATEGORIES = {
    "grozi_6": "Pasta & Grains",
    "grozi_19": "Beverages",
    "grozi_29": "Spreads & Condiments",
    "grozi_31": "Snacks",
    "grozi_32": "Snacks",
    "grozi_33": "Snacks",
    "grozi_69": "Breakfast & Cereal",
    "grozi_110": "Dairy",
    "grozi_115": "Spreads & Condiments",

    # Categories for detected items
    "grozi_7": "Snacks",
    "grozi_8": "Snacks",
    "grozi_16": "Soups & Canned",
    "grozi_17": "Confectionery",
    "grozi_22": "Coffee & Tea",
    "grozi_25": "Spreads & Condiments",
    "grozi_51": "Pasta & Grains",
    "grozi_58": "Baking",
    "grozi_62": "Beverages",
    "grozi_66": "Beverages",
    "grozi_68": "Breakfast & Cereal",
    "grozi_91": "Beverages",
    "grozi_101": "Breakfast & Cereal",
    "grozi_106": "Beverages",
    "grozi_114": "Soups & Canned",
    "grozi_116": "Spreads & Condiments",
}

def get_display_name(grozi_code: str) -> str:
    """Get the display name for a grozi product code."""
    # Fallback: humanize the code if no mapping exists
    name = PRODUCT_NAME_MAP.get(grozi_code)
    if name:
        return name
    if grozi_code.startswith("grozi_"):
        return f"Grocery Item {grozi_code.split('_')[1]}"
    return grozi_code

def get_grozi_code(display_name: str) -> str:
    """Get the grozi code for a display name (reverse lookup)."""
    # Create reverse mapping
    reverse_map = {v.lower(): k for k, v in PRODUCT_NAME_MAP.items()}
    return reverse_map.get(display_name.lower(), display_name)

def get_price(grozi_code: str) -> float:
    """Get the price for a grozi product code."""
    return PRODUCT_PRICES.get(grozi_code, 0.0)

def get_category(grozi_code: str) -> str:
    """Get the category for a grozi product code."""
    return PRODUCT_CATEGORIES.get(grozi_code, "Other")
