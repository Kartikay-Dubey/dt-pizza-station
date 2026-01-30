export type MenuItem = {
    name: string;
    price: {
        s?: number;
        m?: number;
        l?: number;
        single?: number;
    };
    description?: string;
    isVeg: boolean;
    image?: string;
    customizable?: boolean;
};

export type MenuCategory = {
    title: string;
    items: MenuItem[];
};

export const MENU_ITEMS: MenuCategory[] = [
    {
        title: "Classic Pizzas",
        items: [
            {
                name: "Corn Pizza",
                price: { s: 59, m: 119, l: 199 },
                isVeg: true,
                description: "Golden corn kernels with our signature tomato sauce.",
                customizable: true
            },
            {
                name: "Onion Pizza",
                price: { s: 59, m: 119, l: 199 },
                isVeg: true,
                description: "Crunchy sliced onions on a cheesy base.",
                customizable: true
            },
            {
                name: "Tomato Pizza",
                price: { s: 59, m: 119, l: 199 },
                isVeg: true,
                description: "Juicy tomato slices paired with mozzarella.",
                customizable: true
            },
            {
                name: "Capsicum Pizza",
                price: { s: 59, m: 119, l: 199 },
                isVeg: true,
                description: "Fresh capsicum chunks for that perfect crunch.",
                customizable: true
            },
            {
                name: "Tomato & Corn",
                price: { s: 79, m: 149, l: 229 },
                isVeg: true,
                description: "A delightful mix of sweet corn and tangy tomatoes.",
                customizable: true
            },
            {
                name: "Onion & Corn",
                price: { s: 79, m: 149, l: 229 },
                isVeg: true,
                description: "Sweet corn and onion for a balanced flavor.",
                customizable: true
            },
            {
                name: "Capsicum & Corn",
                price: { s: 79, m: 149, l: 229 },
                isVeg: true,
                description: "The classic duo of capsicum and golden corn.",
                customizable: true
            },
            {
                name: "Tomato & Capsicum",
                price: { s: 79, m: 149, l: 229 },
                isVeg: true,
                description: "Tangy tomato meets crunchy capsicum.",
                customizable: true
            },
        ],
    },
    {
        title: "Specialty Pizzas",
        items: [
            {
                name: "Veggie Crunch",
                price: { s: 79, m: 149, l: 229 },
                isVeg: true,
                description: "Onion and capsicum overload for veggie lovers.",
                customizable: true
            },
            {
                name: "Spicy Veggie",
                price: { s: 79, m: 149, l: 229 },
                isVeg: true,
                description: "Red paprika and spicy herbs for a kick.",
                customizable: true
            },
            {
                name: "Jalapeno & Onion",
                price: { s: 89, m: 179, l: 249 },
                isVeg: true,
                description: "Spicy jalapenos with crunchy onions.",
                customizable: true
            },
            {
                name: "Jalapeno & Olive",
                price: { s: 99, m: 189, l: 259 },
                isVeg: true,
                description: "Exotic black olives and jalapenos.",
                customizable: true
            },
            {
                name: "Margherita Pizza",
                price: { s: 99, m: 189, l: 259 },
                isVeg: true,
                description: "Classic cheese pizza with extra mozzarella.",
                customizable: true
            },
            {
                name: "Mix Veg Pizza",
                price: { s: 109, m: 199, l: 299 },
                isVeg: true,
                description: "Loaded with onion, capsicum, tomato & corn.",
                customizable: true
            },
        ],
    },
    {
        title: "Paneer Pizzas",
        items: [
            {
                name: "Paneer & Onion",
                price: { s: 99, m: 159, l: 249 },
                isVeg: true,
                description: "Soft paneer cubes with onion slices.",
                customizable: true
            },
            {
                name: "Paneer & Tomato",
                price: { s: 99, m: 159, l: 249 },
                isVeg: true,
                description: "Tangy tomato and paneer combination.",
                customizable: true
            },
            {
                name: "Paneer & Capsicum",
                price: { s: 99, m: 159, l: 249 },
                isVeg: true,
                description: "Spiced paneer with fresh capsicum.",
                customizable: true
            },
            {
                name: "Paneer & Corn",
                price: { s: 99, m: 159, l: 249 },
                isVeg: true,
                description: "Sweet corn and soft paneer delight.",
                customizable: true
            },
            {
                name: "Paneer Mix Veg",
                price: { s: 129, m: 249, l: 329 },
                isVeg: true,
                description: "Paneer loaded with mix veggies.",
                customizable: true
            },
            {
                name: "Double Cheese Paneer",
                price: { s: 199, m: 299, l: 399 },
                isVeg: true,
                description: "Double the cheese, double the paneer.",
                customizable: true
            },
            {
                name: "Spicy Veggie Paneer",
                price: { s: 199, m: 299, l: 399 },
                isVeg: true,
                description: "Spicy herbs, veggies and paneer.",
                customizable: true
            },
        ],
    },
    {
        title: "Burgers",
        items: [
            {
                name: "Aloo Tikki Burger",
                price: { single: 39 },
                isVeg: true,
                description: "Classic potato patty with fresh veggies.",
                customizable: true
            },
            {
                name: "Cheese Burger",
                price: { single: 49 },
                isVeg: true,
                description: "Aloo tikki topped with a cheese slice.",
                customizable: true
            },
            {
                name: "Corn & Cheese Topping",
                price: { single: 69 },
                isVeg: true,
                description: "Burger with corn and melted cheese.",
                customizable: true
            },
            {
                name: "Veg Special Double Cheese",
                price: { single: 79 },
                isVeg: true,
                description: "Double cheese goodness in a bun.",
                customizable: true
            },
            {
                name: "Veg & Cheese Paneer",
                price: { single: 79 },
                isVeg: true,
                description: "Paneer patty with cheese.",
                customizable: true
            },
            {
                name: "Extra Topping Burger",
                price: { single: 99 },
                isVeg: true,
                description: "Loaded with extra veggies and sauces.",
                customizable: true
            },
            {
                name: "DT Pizza Station Special",
                price: { single: 109 },
                isVeg: true,
                description: "Our signature chef's special burger.",
                customizable: true
            },
        ],
    },
    {
        title: "Garlic Bread & More",
        items: [
            { name: "Plain Garlic Bread", price: { single: 69 }, isVeg: true, description: "Buttery garlic sticks." },
            { name: "Veg Garlic Bread", price: { single: 79 }, isVeg: true, description: "Garlic bread topped with veggies." },
            { name: "Cheese Garlic Bread", price: { single: 89 }, isVeg: true, description: "Garlic bread loaded with mozzarella." },
            { name: "Paneer Garlic Bread", price: { single: 99 }, isVeg: true, description: "Spiced paneer on garlic bread." },
            { name: "Cheese Dip", price: { single: 20 }, isVeg: true, description: "Perfect creamy dip for your sides." },
            { name: "Jalapeno Dip", price: { single: 20 }, isVeg: true, description: "Spicy kick for your tastebuds." },
        ],
    },
    {
        title: "Shakes",
        items: [
            { name: "Butterscotch Shake", price: { single: 79 }, isVeg: true, description: "Rich butterscotch flavor." },
            { name: "Strawberry Shake", price: { single: 79 }, isVeg: true, description: "Fresh strawberry delight." },
            { name: "Mango Shake", price: { single: 79 }, isVeg: true, description: "Tropical mango goodness." },
            { name: "Pineapple Shake", price: { single: 79 }, isVeg: true, description: "Tangy pineapple refresher." },
            { name: "Kiwi Shake", price: { single: 79 }, isVeg: true, description: "Exotic kiwi blend." },
            { name: "Kitkat Shake", price: { single: 99 }, isVeg: true, description: "Crunchy Kitkat chocolate shake." },
            { name: "Oreo Shake", price: { single: 99 }, isVeg: true, description: "Creamy Oreo biscuit shake." },
            { name: "Dark Chocolate Shake", price: { single: 179 }, isVeg: true, description: "Intense dark chocolate indulgence." },
        ],
    },
];
