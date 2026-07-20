import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import useScrollReveal from '../hooks/useScrollReveal'
import './Menu.css'

const SPICY = 'spicy', VEG = 'veg', SIG = 'signature'

// Category icons — small SVG glyph shown above each section title
const catIcons = {
  soups: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12h18a9 9 0 0 1-9 9 9 9 0 0 1-9-9z" fill="currentColor" fillOpacity="0.15" />
      <path d="M2 12h20" />
      <path d="M8 8c0-1 1-1.5 1-2.5S8 4 8 3" strokeOpacity="0.7" />
      <path d="M12 8c0-1 1-1.5 1-2.5S12 4 12 3" strokeOpacity="0.7" />
      <path d="M16 8c0-1 1-1.5 1-2.5S16 4 16 3" strokeOpacity="0.7" />
    </svg>
  ),
  starters: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="14" rx="10" ry="3" fill="currentColor" fillOpacity="0.15" />
      <path d="M2 14c0-1.5 4-3 10-3s10 1.5 10 3" />
      <path d="M6 11l1.5-3M12 11l1-3M18 11l-1.5-3" strokeOpacity="0.7" />
    </svg>
  ),
  appetizers: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 20c4-2 8-4 12-9 2-2.5 4-4 4-8-3 0-5 1-7 3-4 4-6 8-9 12z" fill="currentColor" fillOpacity="0.15" />
      <path d="M17 3c1 1 2 2 3 3" strokeOpacity="0.7" />
    </svg>
  ),
  andhra: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22c-4 0-7-3-7-7 0-3 2-6 5-9 0 2 1 3 2 3s2-1 2-3c3 3 5 6 5 9 0 4-3 7-7 7z" fill="currentColor" fillOpacity="0.15" />
    </svg>
  ),
  biryani: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 13h16v2a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z" fill="currentColor" fillOpacity="0.15" />
      <ellipse cx="8" cy="11" rx="1" ry="1.5" />
      <ellipse cx="12" cy="10" rx="1" ry="1.5" />
      <ellipse cx="16" cy="11" rx="1" ry="1.5" />
      <ellipse cx="10" cy="8" rx="1" ry="1.5" />
      <ellipse cx="14" cy="8" rx="1" ry="1.5" />
    </svg>
  ),
  tandoori: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3c1.5 3 3 4 3 7a3 3 0 0 1-6 0c0-3 1.5-4 3-7z" fill="currentColor" fillOpacity="0.15" />
      <path d="M6 21c1-3 3-5 6-5s5 2 6 5" strokeOpacity="0.7" />
    </svg>
  ),
  curries: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 11h18v3a6 6 0 0 1-6 6H9a6 6 0 0 1-6-6z" fill="currentColor" fillOpacity="0.15" />
      <path d="M2 11h20" />
      <path d="M9 8c0-1 1-2 1-3M14 8c0-1 1-2 1-3" strokeOpacity="0.7" />
    </svg>
  ),
  vegetarian: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" fill="currentColor" fillOpacity="0.15" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  ),
  breads: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 10c0-3 4-5 8-5s8 2 8 5c0 2-1 3-2 4H6c-1-1-2-2-2-4z" fill="currentColor" fillOpacity="0.15" />
      <path d="M6 14c1 3 3 5 6 5s5-2 6-5" />
      <path d="M10 8v3M14 8v3" strokeOpacity="0.7" />
    </svg>
  ),
  kulcha: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="7" width="16" height="10" rx="5" fill="currentColor" fillOpacity="0.15" />
      <path d="M8 10l1 2M12 10l1 2M16 10l1 2" strokeOpacity="0.7" />
    </svg>
  ),
  'rice-noodles': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 13h16v2a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z" fill="currentColor" fillOpacity="0.15" />
      <path d="M6 10c1-1 2-1 3 0M11 10c1-1 2-1 3 0M15 10c1-1 2-1 3 0" strokeOpacity="0.7" />
    </svg>
  ),
  sides: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3v9a3 3 0 0 0 3 3v6" fill="currentColor" fillOpacity="0.15" />
      <path d="M6 3v9a3 3 0 0 0 3 3v6" />
      <path d="M12 3v18" />
      <path d="M18 8a3 3 0 0 0-3 3v5a3 3 0 0 0 3 3z" fill="currentColor" fillOpacity="0.15" />
    </svg>
  ),
  desserts: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14l-1.5 8a2 2 0 0 1-2 1.5h-7a2 2 0 0 1-2-1.5z" fill="currentColor" fillOpacity="0.15" />
      <path d="M4 12c0-4 3.6-7 8-7s8 3 8 7" />
      <path d="M12 5V2" strokeOpacity="0.7" />
    </svg>
  ),
  shakes: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 8h10l-1.5 12a2 2 0 0 1-2 1.5h-3a2 2 0 0 1-2-1.5z" fill="currentColor" fillOpacity="0.15" />
      <path d="M6 8h12" />
      <path d="M10 8V4c0-1 1-2 2-2s2 1 2 2v4" strokeOpacity="0.7" />
      <circle cx="10" cy="11" r="0.6" fill="currentColor" />
      <circle cx="14" cy="13" r="0.6" fill="currentColor" />
      <circle cx="11" cy="15" r="0.6" fill="currentColor" />
    </svg>
  ),
}

const sections = [
  {
    id: 'soups',
    label: 'Soups',
    intro: 'Warm bowls to start your meal',
    items: [
      { name: 'Corn', desc: 'Sweet corn soup with veggies & mild seasonings', prices: [{ l: 'Veg', v: 6 }, { l: 'Chicken', v: 7 }] },
      { name: 'Mushroom', desc: 'Creamy mushroom soup with earthy flavors', prices: [{ l: 'Veg', v: 6 }, { l: 'Chicken', v: 7 }] },
      { name: 'Hot & Sour', desc: 'Spicy & tangy with veggies and aromatic spices', prices: [{ l: 'Veg', v: 6 }, { l: 'Chicken', v: 7 }], tags: [SPICY] },
      { name: 'Mulligatawny', desc: 'Curry-flavored soup with lentils, herbs & spices', prices: [{ l: 'Veg', v: 6 }, { l: 'Chicken', v: 7 }] },
    ],
  },
  {
    id: 'starters',
    label: 'Starters',
    intro: 'Small plates to share',
    items: [
      { name: 'Samosa (2 pcs)', desc: 'Crispy pastry filled with spiced potatoes & peas', price: 6, tags: [VEG] },
      { name: 'Veg Pakora', desc: 'Mixed vegetable fritters in spiced chickpea batter', price: 9, tags: [VEG] },
      { name: 'Cut Mirchi', desc: 'Jalapeños battered, fried, topped with onions & spices', price: 9, tags: [VEG, SPICY] },
      { name: 'Corn Vepudu', desc: 'Crispy corn tossed with garlic, curry leaves & bold spices', price: 14, tags: [VEG, SPICY] },
      { name: 'Green Salad', desc: 'Fresh greens, cucumber, tomato & onion with tangy yogurt dressing', price: 7, tags: [VEG] },
    ],
  },
  {
    id: 'appetizers',
    label: 'Appetizers',
    intro: 'Signature preparations — pick a style, then choose your protein',
    items: [
      { name: 'Pachi Mirchi', desc: 'Green chilies, garlic & spices for a spicy kick', tags: [SPICY] },
      { name: 'Karam Podi', desc: 'South Indian spices, garlic & curry leaves', tags: [SPICY] },
      { name: 'Monagadi', desc: 'Green chilies, garlic & bold South Indian spices', tags: [SPICY] },
      { name: 'Pepper', desc: 'Black pepper, garlic & spices for a peppery finish' },
      { name: 'Chef Special', desc: "The chef's signature blend of spices & herbs", tags: [SIG] },
      { name: 'Bang Bang', desc: 'Creamy sweet chili sauce — sweet & spicy' },
      { name: 'Hyderabadi 65', desc: 'Yogurt, red chilies & spices for a spicy taste', tags: [SPICY, SIG] },
      { name: 'Manchurian', desc: 'Savory Chinese sauce with garlic, soy & seasoning' },
      { name: 'Chili Style', desc: 'Onions, peppers & chili sauce — bold and spicy', tags: [SPICY] },
      { name: 'Dragon', desc: 'Fiery garlic chili sauce with bold Indo-Chinese flavors', tags: [SPICY] },
    ],
    options: {
      title: 'Choice of Protein',
      prices: [
        { l: 'Baby Corn', v: 14 }, { l: 'Chicken', v: 15 },
        { l: 'Gobi', v: 14 }, { l: 'Fish', v: 17 },
        { l: 'Tofu / Paneer', v: 15 }, { l: 'Shrimp', v: 17 },
      ],
    },
  },
  {
    id: 'andhra',
    label: 'Andhra Specials',
    intro: 'Bold, spicy classics from the Andhra region',
    items: [
      { name: 'Gutti Vankaya Curry', price: 14, tags: [VEG, SPICY] },
      { name: 'Guntur Kodi Vepudu', price: 16, tags: [SPICY, SIG] },
      { name: 'Miryala Mamsam Vepudu', price: 18, tags: [SPICY, SIG] },
      { name: 'Nellore Fish Curry', price: 19, tags: [SPICY] },
      { name: 'Andhra Curry / Gongura Curry', full: true, prices: [{ l: 'Veg', v: 16 }, { l: 'Chicken', v: 17 }, { l: 'Fish', v: 18 }, { l: 'Lamb', v: 18 }, { l: 'Goat', v: 19 }, { l: 'Shrimp', v: 19 }], tags: [SPICY, SIG] },
    ],
  },
  {
    id: 'biryani',
    label: 'Biryani & Pulao',
    intro: 'Slow-cooked in the traditional dum style',
    items: [
      { name: 'Dum Biryani', desc: 'Fragrant basmati slow-cooked with herbs & aromatic spices', prices: [{ l: 'Veg', v: 14 }, { l: 'Egg', v: 15 }, { l: 'Chicken', v: 16 }], tags: [SIG] },
      { name: 'Vijayawada Biryani', desc: 'Spicy Andhra-style biryani packed with bold chilies', prices: [{ l: 'Gobi', v: 16 }, { l: 'Egg', v: 16 }, { l: 'Paneer', v: 17 }, { l: 'Chicken', v: 17 }, { l: 'Shrimp', v: 19 }], tags: [SPICY] },
      { name: 'Fry Biryani', desc: 'Biryani rice stir-fried with spices, herbs & traditional seasonings', prices: [{ l: 'Paneer', v: 17 }, { l: 'Chicken (Bhimavaram)', v: 17 }, { l: 'Goat', v: 19 }, { l: 'Fish', v: 19 }, { l: 'Lamb', v: 19 }, { l: 'Shrimp', v: 19 }] },
      { name: 'Beach Style Biryani', desc: 'Coastal-style biryani with fenugreek leaves & aromatic spices', prices: [{ l: 'Paneer', v: 17 }, { l: 'Chicken', v: 17 }, { l: 'Goat', v: 19 }, { l: 'Lamb', v: 19 }, { l: 'Fish', v: 19 }, { l: 'Shrimp', v: 19 }] },
      { name: 'Satti Babu Pulav', desc: 'Andhra-style pulav with traditional spices & robust flavors', prices: [{ l: 'Paneer', v: 17 }, { l: 'Chicken', v: 17 }, { l: 'Fish', v: 19 }, { l: 'Goat', v: 19 }, { l: 'Shrimp', v: 19 }, { l: 'Lamb', v: 19 }, { l: 'Goat Kheema', v: 19 }] },
      { name: 'HH Signature Biryani', desc: 'Our signature biryani prepared with aromatic spices and herbs', prices: [{ l: 'Veg', v: 15 }, { l: 'Paneer', v: 17 }, { l: 'Egg', v: 17 }, { l: 'Chicken', v: 17 }, { l: 'Fish', v: 19 }, { l: 'Goat', v: 19 }, { l: 'Shrimp', v: 19 }, { l: 'Lamb', v: 19 }, { l: 'Goat Kheema', v: 20 }], tags: [SIG] },
    ],
  },
  {
    id: 'tandoori',
    label: 'Tandoori Grill',
    intro: 'Chargrilled kebabs from the clay oven',
    items: [
      { name: 'Tandoori Chicken Kebab', desc: 'Bone-in chicken marinated with traditional spices & roasted in tandoor', price: 15 },
      { name: 'Chicken Tikka Kebab', desc: 'Boneless chicken marinated in yogurt & spices, grilled in tandoor', price: 16 },
      { name: 'Reshmi Kebab', desc: 'Tender chicken in a creamy blend of yogurt, cashews & mild spices', price: 16 },
      { name: 'Malai Kebab', desc: 'Juicy chicken marinated with cream, cheese & aromatic spices', price: 16 },
      { name: 'Paneer Tikka Kebab', desc: 'Paneer marinated in yogurt & spices, grilled to perfection', price: 16, tags: [VEG] },
      { name: 'Lamb Seekh Kebab', desc: 'Spiced ground lamb skewers with a smoky, flavorful finish', price: 19, tags: [SIG] },
      { name: 'Tandoori Shrimp', desc: 'Shrimp marinated with yogurt & spices, chargrilled in tandoor', price: 19 },
      { name: 'Mixed Grill', desc: 'Tandoori chicken, chicken tikka, reshmi kebab & shrimp kebab', price: 26, tags: [SIG] },
    ],
  },
  {
    id: 'curries',
    label: 'Curries',
    intro: 'Classic curry preparations — pick a style, then choose your protein',
    items: [
      { name: 'Butter', desc: 'Rich buttery tomato sauce with cream & spices', tags: [SIG] },
      { name: 'Tikka Masala', desc: 'Creamy tomato sauce with warm spices and a bold, savory taste', tags: [SIG] },
      { name: 'Vindaloo', desc: 'Spicy and tangy curry with garlic, vinegar & bold flavors', tags: [SPICY] },
      { name: 'Korma', desc: 'Creamy sauce with onion, cream & spices' },
      { name: 'Kadai', desc: 'Tomato sauce with bell peppers & spices' },
      { name: 'Madras Curry', desc: 'South Indian curry with coconut, spices & heat', tags: [SPICY] },
      { name: 'Karaikudi (Chettinad)', desc: 'Bold South Indian curry with roasted spices & rich flavor', tags: [SPICY] },
      { name: 'Methi', desc: 'Creamy curry with fenugreek leaves and a unique savory taste' },
      { name: 'Rogan Josh', desc: 'Kashmiri-style curry with tomatoes & spices' },
      { name: 'Saag', desc: 'Creamy spinach curry with garlic and traditional Indian spices' },
    ],
    options: {
      title: 'Choice of Protein',
      prices: [
        { l: 'Tofu', v: 16 },
        { l: 'Paneer', v: 16 },
        { l: 'Chicken', v: 17 },
        { l: 'Fish / Lamb', v: 18 },
        { l: 'Goat', v: 19 },
        { l: 'Shrimp', v: 19 },
      ],
    },
  },
  {
    id: 'vegetarian',
    label: 'Vegetarian',
    intro: 'Comforting vegetarian classics from every region',
    items: [
      { name: 'Dal Tadka', desc: 'Yellow lentils tempered with garlic & cumin', price: 14, tags: [VEG] },
      { name: 'Dhaba Dal', desc: 'Black lentils cooked with onions & garlic', price: 14, tags: [VEG] },
      { name: 'Dal Makhani', desc: 'Creamy black lentils & kidney beans simmered with butter & spices', price: 15, tags: [VEG, SIG] },
      { name: 'Chana Masala', desc: 'Chickpeas cooked in a tangy tomato gravy', price: 15, tags: [VEG] },
      { name: 'Aloo Gobi', desc: 'Potatoes & cauliflower cooked with spices', price: 15, tags: [VEG] },
      { name: 'Aloo Mutter', desc: 'Potatoes and green peas in a mildly spiced tomato gravy', price: 16, tags: [VEG] },
      { name: 'Malai Kofta', desc: 'Soft paneer in a tomato & cashew sauce', price: 16, tags: [VEG] },
      { name: 'Baingan Bharta', desc: 'Roasted eggplant with onions & tomatoes', price: 17, tags: [VEG] },
      { name: 'Bhindi Masala', desc: 'Okra sautéed with tomatoes & spices', price: 17, tags: [VEG] },
      { name: 'Methi Mutter Malai', desc: 'Creamy curry with peas & fenugreek leaves', price: 17, tags: [VEG] },
      { name: 'Mutter Paneer', desc: 'Paneer & green peas in a tomato gravy', price: 17, tags: [VEG] },
    ],
  },
  {
    id: 'breads',
    label: 'Breads',
    intro: 'Fresh from the tandoor',
    items: [
      { name: 'Plain Naan', price: 4, tags: [VEG] },
      { name: 'Butter Naan', price: 5, tags: [VEG] },
      { name: 'Garlic Naan', price: 6, tags: [VEG] },
      { name: 'Roti', price: 5, tags: [VEG] },
      { name: 'Chapathi', price: 5, tags: [VEG] },
      { name: 'Mixed Basket', note: 'mix of all naan', price: 20, tags: [VEG] },
      { name: 'Chole Bhature', price: 14, tags: [VEG] },
      { name: 'Chole Puri', price: 14, tags: [VEG] },
      { name: 'Puri Bhaji', price: 14, tags: [VEG] },
    ],
  },
  {
    id: 'kulcha',
    label: 'Kulcha',
    intro: 'Stuffed flatbreads · all $7',
    items: [
      { name: 'Spinach Kulcha', price: 7, tags: [VEG] },
      { name: 'Paneer Kulcha', price: 7, tags: [VEG] },
      { name: 'Cheese Kulcha', price: 7, tags: [VEG] },
      { name: 'Onion Kulcha', price: 7, tags: [VEG] },
      { name: 'Kashmiri Kulcha', price: 7, tags: [VEG] },
    ],
  },
  {
    id: 'rice-noodles',
    label: 'Rice & Noodles',
    intro: 'Indo-Chinese fried rice and noodles — pick a style, then choose your protein',
    columns: 3,
    items: [
      { name: 'Hakka Style', desc: 'Stir-fried with light sauces & mild spices' },
      { name: 'Schezwan', desc: 'Bold & spicy with schezwan chili sauce', tags: [SPICY] },
      { name: 'Chili Garlic', desc: 'Flavorful garlic with a spicy chili kick', tags: [SPICY] },
    ],
    options: {
      title: 'Choice of Protein',
      prices: [
        { l: 'Veg', v: 16 }, { l: 'Chicken', v: 18 },
        { l: 'Egg / Tofu', v: 17 }, { l: 'Shrimp', v: 21 },
      ],
    },
  },
  {
    id: 'desserts',
    label: 'Desserts',
    intro: 'A sweet finish — all $7',
    items: [
      { name: 'Gulab Jamun', price: 7, tags: [VEG] },
      { name: 'Rice Kheer', price: 7, tags: [VEG] },
      { name: 'Rasamalai', price: 7, tags: [VEG] },
      { name: 'Mango Kulfi', price: 7, tags: [VEG] },
      { name: 'Kesar Malai Kulfi', price: 7, tags: [VEG] },
    ],
  },
  {
    id: 'shakes',
    label: 'Summer Shakes',
    intro: 'Chilled and creamy — all $8',
    items: [
      { name: 'Chikoo Shake', price: 8, tags: [VEG] },
      { name: 'Sitaphal Shake', price: 8, tags: [VEG] },
      { name: 'Mango Shake', price: 8, tags: [VEG] },
      { name: 'Chocolate Shake', price: 8, tags: [VEG] },
      { name: 'Strawberry & Banana Shake', price: 8, tags: [VEG] },
      { name: 'Rose Milk Shake', price: 8, tags: [VEG] },
      { name: 'Almond Saffron Shake', price: 8, tags: [VEG] },
    ],
  },
  {
    id: 'sides',
    label: 'Extras & Sides',
    intro: 'Little additions to round out your meal',
    items: [
      { name: 'Papad', price: 4 },
      { name: 'Onion', price: 2 },
      { name: 'Lemon', price: 2 },
      { name: 'Mint Chutney', note: '4 oz', price: 2 },
      { name: 'Raita', price: 2.5 },
      { name: 'Egg (1 pc)', price: 2 },
      { name: 'Rice (1 cup)', price: 3 },
    ],
  },
]

const money = v => `$${Number(v) % 1 === 0 ? Number(v).toFixed(0) : Number(v).toFixed(2)}`

function TagBadges({ tags }) {
  if (!tags || !tags.length) return null
  return (
    <span className="menu-tags">
      {tags.includes(VEG) && <span className="menu-tag menu-tag--veg" title="Vegetarian"><span className="menu-tag__dot" /></span>}
      {tags.includes(SPICY) && <span className="menu-tag menu-tag--spicy" title="Spicy"><svg viewBox="0 0 24 24" fill="currentColor" width="11" height="11"><path d="M4 20c4-2 8-4 12-9 2-2.5 4-4 4-8-3 0-5 1-7 3-4 4-6 8-9 12z"/></svg></span>}
      {tags.includes(SIG) && <span className="menu-tag menu-tag--sig" title="Chef's Signature"><svg viewBox="0 0 24 24" fill="currentColor" width="11" height="11"><path d="M12 2l2.4 6.2 6.6.6-5 4.5 1.5 6.5L12 16.6 6.5 19.8 8 13.3l-5-4.5 6.6-.6z"/></svg></span>}
    </span>
  )
}

function WideItem({ item }) {
  const pillsRef = useRef(null)

  useLayoutEffect(() => {
    const container = pillsRef.current
    if (!container) return
    let frame = 0
    const mark = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const pills = container.querySelectorAll('.menu-item__pill')
        let lastTop = null
        pills.forEach(p => {
          const t = p.offsetTop
          p.classList.toggle('is-row-first', t !== lastTop)
          lastTop = t
        })
      })
    }
    mark()
    const ro = new ResizeObserver(mark)
    ro.observe(container)
    // Also re-mark once fonts load so measurements settle
    if (document.fonts?.ready) document.fonts.ready.then(mark)
    return () => {
      ro.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [item.prices])

  return (
    <div className={`menu-item menu-item--wide${item.full ? ' menu-item--full' : ''}`}>
      <div className="menu-item__row">
        <span className="menu-item__name">
          {item.name}
          <TagBadges tags={item.tags} />
        </span>
      </div>
      {item.desc && <p className="menu-item__desc">{item.desc}</p>}
      <div className="menu-item__pills" ref={pillsRef}>
        {item.prices.map((p, i) => (
          <span key={i} className="menu-item__pill">
            <span className="menu-item__pill-lbl">{p.l}</span>
            <span className="menu-item__pill-val">{money(p.v)}</span>
          </span>
        ))}
      </div>
    </div>
  )
}

function CategoryFab({ sections, active, onJump, catIcons }) {
  const [open, setOpen] = useState(false)
  const panelRef = useRef(null)

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const onKey = e => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // Lock body scroll while open (mobile-friendly overlay)
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [open])

  return (
    <>
      <button
        className={`menu-fab${open ? ' menu-fab--open' : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Close menu categories' : 'Open menu categories'}
        aria-expanded={open}
      >
        <span className="menu-fab__icon" aria-hidden="true">
          {open ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
              <path d="M7 2v20" />
              <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7" />
            </svg>
          )}
        </span>
        <span className="menu-fab__label">{open ? 'Close' : 'Menu'}</span>
      </button>

      {open && (
        <div className="menu-fab-backdrop" onClick={() => setOpen(false)} aria-hidden="true" />
      )}

      <div
        ref={panelRef}
        className={`menu-fab-panel${open ? ' open' : ''}`}
        role="dialog"
        aria-label="Menu categories"
        aria-hidden={!open}
      >
        <div className="menu-fab-panel__head">
          <span className="menu-fab-panel__title">Jump to</span>
          <button
            className="menu-fab-panel__close"
            onClick={() => setOpen(false)}
            aria-label="Close"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="menu-fab-panel__grid">
          {sections.map(s => (
            <button
              key={s.id}
              className={`menu-fab-item${active === s.id ? ' active' : ''}`}
              onClick={() => { onJump(s.id); setOpen(false) }}
            >
              <span className="menu-fab-item__ic" aria-hidden="true">{catIcons[s.id]}</span>
              <span className="menu-fab-item__label">{s.label}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  )
}

function Item({ item }) {
  const multi = item.prices && item.prices.length > 0
  const hasPrice = item.price != null
  const wide = multi && item.prices.length >= 3

  if (wide) return <WideItem item={item} />


  return (
    <div className={`menu-item${multi ? ' menu-item--multi' : ''}`}>
      <div className="menu-item__main">
        <div className="menu-item__row">
          <span className="menu-item__name">
            {item.name}
            {item.note && <span className="menu-item__note">{item.note}</span>}
          </span>
          {hasPrice && !multi && <span className="menu-item__price">{money(item.price)}</span>}
        </div>
        {item.desc && <p className="menu-item__desc">{item.desc}</p>}
      </div>
      {multi && (
        <div className="menu-item__prices">
          {item.prices.map((p, i) => (
            <div key={i} className="menu-item__price-row">
              <span className="menu-item__price-lbl">{p.l}</span>
              <span className="menu-item__price-val">{money(p.v)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Menu() {
  const [active, setActive] = useState(sections[0].id)
  useScrollReveal()

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => {
        const vis = entries.filter(e => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (vis[0]) setActive(vis[0].target.id)
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5] },
    )
    sections.forEach(s => {
      const el = document.getElementById(s.id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  const jump = id => {
    const el = document.getElementById(id)
    if (!el) return
    const y = el.getBoundingClientRect().top + window.scrollY - 100
    window.scrollTo({ top: y, behavior: 'smooth' })
  }

  return (
    <main className="menu-page">
      <PageHero
        title="Our Menu"
        subtitle="From slow-cooked biryani to smoky kebabs — every dish crafted with authentic Hyderabadi soul."
        bgImage="/images/dishes.png"
      />

      <CategoryFab sections={sections} active={active} onJump={jump} catIcons={catIcons} />

<div className="container">
        <div className="menu-card">
          {sections.map((s, idx) => (
            <section key={s.id} id={s.id} className={`menu-section${idx === 0 ? ' menu-section--first' : ''}`}>
              <div className="menu-section__head">
                <span className="menu-section__rule" aria-hidden="true" />
                <h2 className="heading menu-section__title">{s.label}</h2>
                <span className="menu-section__rule" aria-hidden="true" />
              </div>
              <div className="menu-grid" style={{ '--menu-cols': s.columns || 2 }}>
                {s.items.map((it, i) => <Item key={i} item={it} />)}
              </div>
              {s.options && (
                <div className="menu-options">
                  <h3 className="menu-options__title">{s.options.title}</h3>
                  <div className="menu-options__grid">
                    {s.options.prices.map((p, i) => (
                      <div key={i} className="menu-options__row">
                        <span>{p.l}</span>
                        <span className="menu-options__v">{money(p.v)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          ))}
        </div>
      </div>

      <section className="menu-notes">
        <div className="container menu-notes__grid reveal">
          <div className="menu-note">
            <h4>Dietary Requirements</h4>
            <p>Please let our team know before ordering if you have any dietary restrictions. We'll happily guide you through the menu.</p>
          </div>
          <div className="menu-note">
            <h4>Custom Spice Level</h4>
            <p>Most dishes can be customized — no spice, mild, medium, hot, or extra hot. Just ask.</p>
          </div>
          <div className="menu-note">
            <h4>Large Parties</h4>
            <p>An 18% gratuity is added for parties of six or more so we can give your group our full attention.</p>
          </div>
        </div>
      </section>

      <section className="menu-cta">
        <div className="menu-cta__glow" />
        <div className="container menu-cta__inner reveal">
          <span className="accent-bar center" />
          <h2 className="heading menu-cta__title">Ready to Order?</h2>
          <p className="menu-cta__text">Reserve our party hall, place a takeout order, or drop by — walk-ins are always welcome.</p>
          <div className="menu-cta__btns">
            <a href="https://www.toasttab.com/nawabis-hyderabad-house" target="_blank" rel="noreferrer" className="btn btn-primary">Order Online</a>
            <Link to="/contact" className="btn btn-outline-light">Contact Us</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
