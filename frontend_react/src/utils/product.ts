// Local mapping to mirror backend/product_mapping.py so the UI never shows raw grozi codes
const PRODUCT_NAME_MAP: Record<string, string> = {
  grozi_6: "Barilla Spaghetti",
  grozi_19: "Coca Cola",
  grozi_29: "Nutella Hazelnut Spread",
  grozi_31: "Pringles Original",
  grozi_32: "Lay's Classic Chips",
  grozi_33: "Doritos Nacho Cheese",
  grozi_69: "Kellogg's Corn Flakes",
  grozi_110: "Philadelphia Cream Cheese",
  grozi_115: "Heinz Tomato Ketchup",

  grozi_7: "Ritz Crackers",
  grozi_8: "Oreo Cookies",
  grozi_16: "Campbell's Chicken Noodle Soup",
  grozi_17: "Hershey's Milk Chocolate",
  grozi_22: "Folgers Classic Roast Coffee",
  grozi_25: "Smucker's Strawberry Jam",
  grozi_51: "Kraft Mac & Cheese",
  grozi_58: "Betty Crocker Cake Mix",
  grozi_62: "Starbucks Mocha Frappuccino",
  grozi_66: "Nestle Pure Life Water (24-pack)",
  grozi_68: "General Mills Cheerios",
  grozi_91: "Gatorade Orange",
  grozi_101: "Quaker Instant Oatmeal",
  grozi_106: "Tropicana Orange Juice",
  grozi_114: "Campbell's Tomato Soup",
  grozi_116: "Skippy Creamy Peanut Butter",
};

export function prettyProductName(displayName?: string, productName?: string): string {
  // Prefer display name when it's meaningful (not a raw grozi code)
  const name = displayName || productName || "Unknown Product";
  if (!name.startsWith("grozi_")) return name;

  // Use mapping when available
  if (PRODUCT_NAME_MAP[name]) return PRODUCT_NAME_MAP[name];

  // Humanize grozi codes -> "Grocery Item 22"
  const parts = name.split("_");
  if (parts.length === 2 && !Number.isNaN(Number(parts[1]))) {
    return `Grocery Item ${parts[1]}`;
  }
  return name;
}
