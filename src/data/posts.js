// Blog posts, full data used by both the Blogs listing page and the individual BlogPost page.
// Add new posts at the top; each needs a unique `slug` for its URL.

export const posts = [
  {
    slug: 'october-biryani-utsav',
    title: 'October Biryani Utsav, A Month of Eight Biryanis',
    date: 'October 1, 2026',
    readTime: '7 min read',
    cat: 'Events',
    author: 'The Hyderabad House Kitchen',
    img: '/images/biryani.webp',
    excerpt: "This October we are turning our kitchen into a small festival. One biryani on Monday, another on Tuesday, Wednesday, Thursday, each one from a different corner of South India, served as a half-tray built for people to share.",
    body: [
      { type: 'p', text: "In our part of the world, an utsav is not an event you organise. It is a feeling that spills out of a kitchen when something is being cooked that only comes around once a year. The courtyard fills up, children lose interest in whatever they were doing, and the clock quietly stops meaning what it usually means. For a few days, the house runs on the smell of what is in the pot." },
      { type: 'p', text: "That is what we wanted to bring to Omaha this October. Not a promotion. An actual month-long celebration, where the biryani on the menu changes with the weekday, where every tray carries the signature of a different cook, a different city, a different family memory, and where eating one is less about ordering lunch and more about sitting down together." },

      { type: 'h2', text: 'Why Biryani, Why an Utsav' },
      { type: 'p', text: "Biryani is the one dish that holds a whole table together. The rice has to be perfect. The meat has to be marinated the night before. The spices have to be fresh. And the pot, when it is finally opened at the table, has to feel like an occasion. Nothing on an Indian menu asks more of a kitchen, and nothing rewards a kitchen more when it is done right." },
      { type: 'p', text: "The problem is that most restaurants only cook one biryani. The one most people recognise. The one that sells. What that misses is that India has dozens of them. The dum biryanis of Hyderabad are only the beginning. There are the layered pots of Thalapakatti in Tamil Nadu. The fiery red Pachimirchi plates of coastal Andhra. The gentle, lightly spiced beach-style pulavs of the Rayalaseema belt. The jack-fruit biryani of coastal Karnataka, a dish most Americans have never heard of and most Indians have not tasted outside their own grandmother's kitchen." },
      { type: 'quote', text: 'A country this big does not have one biryani. It has thirty, and each one belongs to a place.' },
      { type: 'p', text: "So we built an utsav around that idea. For the whole month of October, Monday through Thursday, we cook eight different biryanis. Four of them vegetarian, four non-vegetarian, each one from a tradition we think more people deserve to taste. Each one served as a half-tray, built for a gathering rather than for one person. Pick a day, pick a biryani, pick it up hot." },

      { type: 'h2', text: 'What a Half-Tray Really Is' },
      { type: 'p', text: "The half-tray is not a portion size we invented for the website. It is the way biryani is actually served when a family in Hyderabad has friends over. You do not plate biryani for eight people. You bring the pot out, you set it down, and everyone works from the same tray. The person who gets the last of the browned onions wins the round." },
      { type: 'p', text: "A half-tray from our kitchen feeds roughly four to six people depending on how committed they are. It is cooked fresh the morning of your pickup, sealed and finished to order, and never pre-made. The dough that seals the pot is pressed on by the same cook, every time, which is why we need you to book ahead." },

      { type: 'h2', text: 'The Eight Biryanis, One by One' },
      { type: 'p', text: "Here is the schedule, with a note on what makes each one worth tasting." },

      { type: 'h2', text: 'Monday, Veg Dum Biryani' },
      { type: 'p', text: "The classic that most people know and the one most people do not know how to cook properly. Our vegetable dum uses the full Hyderabadi method, meaning the rice is parboiled, layered over marinated vegetables with yogurt, mint, fried onion, saffron milk, and ghee, and finished under a dough-sealed lid on slow heat. It is the version of veg biryani that convinces people who claim they do not like vegetable biryani. There is nothing meek about it." },

      { type: 'h2', text: 'Monday, Chicken Dum Biryani' },
      { type: 'p', text: "The signature. The Hyderabadi chicken dum biryani is why most of our regulars come back on weekends. Overnight-marinated chicken, long-grain basmati that still has bite, the whole pot sealed with dough so nothing escapes. When the seal breaks at your table, do not stir. Dig in from the top so you get all three layers in one spoon." },

      { type: 'h2', text: 'Tuesday, Pachimirchi Paneer Biryani' },
      { type: 'p', text: "Pachimirchi means green chilli in Telugu, and this biryani is a love letter to it. Instead of red chilli powder for heat, we use a fresh green chilli paste that keeps the colour of the biryani almost pale, and the heat clean and bright instead of dusty. Paneer cubes are seared, folded in with the rice, and finished in the pot. It is a biryani that tastes like a Guntur summer afternoon, which is to say, hot and herbal and alive." },

      { type: 'h2', text: 'Tuesday, Thalapakatti Goat Biryani' },
      { type: 'p', text: "Thalapakatti is a small town in Tamil Nadu that gave the world one of the great layered biryanis. It is not a dum biryani. It is a pulav-style cook where the goat and rice are cooked together in the same pot, with a very specific spice blend built around jeera samba rice, star anise, stone flower, and nutmeg. The result is drier than a Hyderabadi biryani, more aromatic, and absolutely spoonable. The goat falls off the bone." },

      { type: 'h2', text: 'Wednesday, Beach Style Paneer Pulav' },
      { type: 'p', text: "The pulavs served at beach-side kitchens along the Andhra coast are something else entirely. Milder than a biryani, often finished with coconut milk, cooked with curry leaves and fresh ginger. Our beach-style paneer pulav is cooked exactly that way, with soft paneer, a hint of coconut, and the kind of lightness most Americans do not expect from South Indian food. It is the biryani you order when you want flavour without fire." },

      { type: 'h2', text: 'Wednesday, Vijayawada Chicken Biryani' },
      { type: 'p', text: "If Tuesday is a love letter to green chilli, Wednesday is a love letter to red. The Vijayawada style is unapologetically spicy, built on Guntur red chilli, fried onions, and a slow pulav cook that lets the chicken take on the whole weight of the spice. We temper the heat for Omaha but keep the soul of it, so you still taste the city it comes from. Serve it with a cold raita." },

      { type: 'h2', text: 'Thursday, Panasakkai Biryani' },
      { type: 'p', text: "Panasakkai is tender raw jack fruit. In coastal Karnataka it is treated almost like meat, slow-cooked until it falls apart, and layered into a biryani with the full spice ritual. The first time most people taste it, they do not believe it is a fruit. It is one of the most under-known biryanis in all of India, and one of the best vegetarian dishes we serve all year. If you only try one biryani on this list, make it this one." },

      { type: 'h2', text: 'Thursday, Pachimirchi Chicken Pulav' },
      { type: 'p', text: "A cousin of Tuesday's paneer biryani, built on the same fresh green chilli paste but with chicken thigh. Lighter than the goat biryani, hotter than the chicken dum, and finished with a scatter of curry leaves and a squeeze of lime at the end. This is the one most of our cooks personally eat on a Thursday night after the kitchen closes." },

      { type: 'h2', text: 'How It Works' },
      { type: 'list', items: [
        'Pick a day, Monday through Thursday, between October 1 and October 31, 2026.',
        'Choose the veg or non-veg biryani of that day. One half-tray per booking.',
        'Pick a time between 11 AM and 8:45 PM in 15-minute slots. We will call to confirm.',
        'Flat $50 per half-tray, paid in cash or card when you collect it from the restaurant.',
      ] },
      { type: 'p', text: "You can book your tray at hhoma.com/biryani-utsav, or you can call the restaurant at (402) 505-9209 if you would rather talk to a human. Either works, and either one gets your name in the pot schedule." },

      { type: 'h2', text: 'Come Hungry' },
      { type: 'p', text: "The Utsav runs through October 31. After that, the pots go back to the regular menu until next year. If you have been meaning to introduce someone to real Hyderabadi biryani, or if you have been curious about the biryanis of Tamil Nadu, Andhra, or Karnataka that you have never seen on an American menu, this is the month." },
      { type: 'p', text: "Share the pot. Taste the country." },
    ],
  },
  {
    slug: 'art-of-dum-biryani',
    title: 'The Art of Dum Biryani',
    date: 'March 10, 2026',
    readTime: '6 min read',
    cat: 'Recipes',
    author: 'Chef Sudarsan',
    img: '/images/biryani.webp',
    excerpt: 'Discover the ancient Hyderabadi technique of slow-cooking biryani in a sealed pot, letting the steam and aromatics work their magic over hours.',
    body: [
      { type: 'p', text: "Ask any Hyderabadi to describe the perfect biryani and they'll close their eyes for a moment. What follows is never a recipe. It's a memory, of long weekend afternoons, of a heavy pot sealed with dough, of the moment the lid finally lifts and the whole room fills with saffron, cardamom, and slow-cooked promise." },
      { type: 'h2', text: 'What "Dum" actually means' },
      { type: 'p', text: 'The word comes from the Persian "dum pukht", which loosely translates to "breathing cooking". You layer partially cooked rice over marinated meat, seal the pot so no steam escapes, then let low heat do the work. Nothing stirs. Nothing rushes. Every grain of rice and every strand of meat cooks in the aromatic breath of everything around it.' },
      { type: 'quote', text: 'A great biryani is not made in the pot. It is made in the patience.' },
      { type: 'h2', text: 'The layers that matter' },
      { type: 'p', text: 'A traditional Hyderabadi dum biryani has three layers you can taste, even if you can\'t see them: the marinated meat at the bottom, half-cooked long-grain basmati above it, and a crown of fried onions, mint, coriander, saffron milk, and a final drizzle of ghee.' },
      { type: 'list', items: [
        'The marinade, yogurt, ginger, garlic, green chili, whole spices, is left on the meat for hours, sometimes overnight.',
        'The rice is boiled just to the point where it still has bite, then drained the moment it stops being raw.',
        'The saffron is bloomed in warm milk so it releases both color and perfume before it touches anything else.',
      ] },
      { type: 'h2', text: 'Why the seal is sacred' },
      { type: 'p', text: 'The dough seal, a simple ring of flour and water pressed around the lid, is what makes dum biryani, dum. Without it, steam escapes and the top layer of rice dries out before the meat below has finished cooking. With it, everything cooks together, and the flavors travel up and down until every grain tastes of the pot and every piece of meat tastes of the rice.' },
      { type: 'h2', text: 'How to eat it right' },
      { type: 'p', text: "When the seal breaks at the table, don't stir. Dig gently from the top, taking a little rice, a little meat, a little of the browned onions. Serve with mirchi ka salan on the side and a spoon of raita to balance the heat. And take your time, the pot took hours, so should you." },
      { type: 'p', text: 'Every Sunday at Hyderabad House, we cook our biryani exactly this way. If you order the HH Signature, this is what arrives at your table.' },
    ],
  },
  {
    slug: 'spices-that-define-hyderabadi-cuisine',
    title: 'Spices That Define Hyderabadi Cuisine',
    date: 'February 22, 2026',
    readTime: '5 min read',
    cat: 'Culture',
    author: 'Chef Sudarsan',
    img: '/images/flavors.webp',
    excerpt: 'From star anise to saffron, we explore the iconic spices that give Hyderabadi food its distinctive golden color and bold flavor profile.',
    body: [
      { type: 'p', text: "Hyderabadi food doesn't rely on any one spice. It relies on how a small handful of them are layered, some bloomed in oil, some added late, some left whole so you find them like little surprises. Here are the ones we reach for most, and why." },
      { type: 'h2', text: 'Saffron' },
      { type: 'p', text: 'The most expensive spice in the world and worth every strand. Bloomed in warm milk, saffron gives biryani its golden streaks, its floral top note, and its unmistakable aroma. A pinch is enough for a whole pot.' },
      { type: 'h2', text: 'Green cardamom' },
      { type: 'p', text: 'Cracked open and toasted, cardamom is the sweet-camphor high note in almost every royal dish. It brightens the meat, cuts the ghee, and lingers on the palate long after the meal is over.' },
      { type: 'h2', text: 'Star anise & mace' },
      { type: 'p', text: 'These two are the backbone of a Hyderabadi biryani\'s "warmth." Star anise gives it the deep, almost licorice-like base note. Mace, the lacy red covering of a nutmeg seed, is more delicate, but adds a woody perfume you can never quite pin down.' },
      { type: 'quote', text: "You don't taste each spice. You taste what happens when they agree." },
      { type: 'h2', text: 'Curry leaves' },
      { type: 'p', text: 'A South Indian signature, never dried, always fresh, tossed into hot oil at the very start. They release a nutty, citrusy aroma that no dried herb can replicate.' },
      { type: 'h2', text: 'Kashmiri red chili' },
      { type: 'p', text: 'Deep red, mild heat, huge color. This is what makes a good curry look like a sunset. When we want fire, we reach for Guntur chilies from the Andhra region instead, but for color and depth, Kashmiri is the workhorse.' },
      { type: 'h2', text: 'Fenugreek (methi)' },
      { type: 'p', text: 'Both the seeds and the dried leaves show up in our kitchen. Seeds add a bittersweet earthiness when tempered in ghee. Leaves, kasuri methi, get crumbled over creamy curries at the end, adding a slightly maple-like sweetness.' },
      { type: 'p', text: 'Next time you eat at Hyderabad House, try to notice these one by one. Once you learn to hear them, you can hear them in every bite.' },
    ],
  },
  {
    slug: 'guide-to-indian-breads',
    title: 'A Guide to Indian Breads',
    date: 'January 15, 2026',
    readTime: '4 min read',
    cat: 'Guide',
    author: 'The Hyderabad House Kitchen',
    img: '/images/dishes.webp',
    excerpt: "Naan, roti, paratha, kulcha, the world of Indian breads is rich and varied. Here's how to enjoy each one to the fullest alongside your meal.",
    body: [
      { type: 'p', text: 'Indian meals are built around a shared bowl of curry and a stack of fresh breads. But which bread goes with what? Here\'s a quick, useful field guide the next time you\'re at our table.' },
      { type: 'h2', text: 'Naan' },
      { type: 'p', text: 'Leavened with yogurt and often milk, naan is soft, pillowy, and slightly puffed. It\'s cooked on the wall of a tandoor, which gives it those signature dark spots. Butter naan is the crowd favorite; garlic naan is the friend of every creamy curry.' },
      { type: 'h2', text: 'Roti (chapathi)' },
      { type: 'p', text: 'Unleavened, made from whole wheat, and cooked on a flat griddle. Roti is the everyday bread of most Indian homes, thin, quick, and just barely browned. Perfect for lighter curries and dals when you don\'t want the meal to feel heavy.' },
      { type: 'h2', text: 'Kulcha' },
      { type: 'p', text: 'A close cousin of naan, but usually stuffed. Onion, paneer, spinach, cheese, the filling gets pressed inside the dough before it hits the tandoor. Eat it on its own; it barely needs a curry alongside.' },
      { type: 'quote', text: 'A hot bread on a table is the closest thing to an invitation.' },
      { type: 'h2', text: 'Puri & bhature' },
      { type: 'p', text: 'These are the dramatic ones. Puri is a small round dough that puffs up like a balloon when it hits hot oil. Bhature is bigger, softer, more chewy, the signature partner to chole (spiced chickpeas). Both should be eaten the moment they come out of the pan.' },
      { type: 'h2', text: 'How to pair them' },
      { type: 'list', items: [
        'Rich, creamy curries (Butter Chicken, Dal Makhani), butter or garlic naan',
        'Bold, spicy dry preparations (Kadai, Chettinad), roti or kulcha',
        'Chole and other chickpea dishes, bhature or puri',
        'Any biryani, a small side of raita and a plain naan to catch the last bit of gravy',
      ] },
    ],
  },
  {
    slug: 'story-behind-haleem',
    title: 'The Story Behind Haleem',
    date: 'December 20, 2025',
    readTime: '4 min read',
    cat: 'Culture',
    author: 'Chef Sudarsan',
    img: '/images/gallery3.webp',
    excerpt: 'Once a royal meal reserved for kings, haleem is now a beloved dish across the world. Here\'s the centuries-old story behind that first spoonful.',
    body: [
      { type: 'p', text: 'Every year during Ramadan, giant copper pots start bubbling on the streets of Hyderabad long before sunset. Wheat, meat, and dozens of spices simmer for hours, hand-pounded until the whole thing turns into something between a stew and a memory. This is haleem.' },
      { type: 'h2', text: 'A dish that traveled' },
      { type: 'p', text: 'Haleem started as an Arabic dish called harees, cracked wheat cooked slowly with meat. It moved with traders across Persia, picked up spices along the way, and finally landed in the kitchens of the Nizams of Hyderabad, where it was reinvented as a royal food fit for a court.' },
      { type: 'h2', text: 'Why it takes so long' },
      { type: 'p', text: 'Traditional haleem is cooked for 6 to 8 hours. The wheat has to break down completely. The meat has to shred into strands you can barely see. Every 20 minutes, someone stirs, really stirs, with a wooden paddle, to work the ingredients into a single, unified paste. That labor is the whole point.' },
      { type: 'quote', text: 'It is not stew. It is not porridge. It is patience, in a bowl.' },
      { type: 'h2', text: 'How to eat it right' },
      { type: 'p', text: 'A proper bowl of haleem comes with lime wedges, thinly sliced ginger, fried onions, chopped mint, and a small spoon of ghee floated on top. Squeeze the lime, stir everything in, and eat with a piece of naan on the side. The first bite is always a little surprising, the second one, you understand.' },
      { type: 'p', text: "We serve haleem on select weekends. Follow us on social media to catch it when it's next on the menu." },
    ],
  },
  {
    slug: 'host-your-celebration',
    title: 'Hosting Your Next Celebration at Hyderabad House',
    date: 'November 5, 2025',
    readTime: '3 min read',
    cat: 'Events',
    author: 'Hyderabad House Team',
    img: '/images/interior.webp',
    excerpt: 'Birthdays, anniversaries, engagement parties, corporate lunches, our private hall in Omaha can hold up to 60 guests. Here\'s what you need to know.',
    body: [
      { type: 'p', text: 'For years, our regulars have been asking us the same question: "Can we book the whole place for our party?" We\'re now finally set up to say yes, properly, comfortably, and with a menu built around what your group actually wants to eat.' },
      { type: 'h2', text: 'The space' },
      { type: 'p', text: 'Our private hall seats up to 60 people. It has its own entrance, its own audio, and enough room to move around without feeling packed in. We can arrange it as long dining tables for a family dinner, round tables of eight for a wedding-adjacent event, or a lounge setup for something more casual.' },
      { type: 'h2', text: 'The menu' },
      { type: 'p', text: 'You can pick from any of our regular menu items or ask us to build a custom set-menu for your group. Vegetarian, non-vegetarian, mixed, we\'ll tailor the dishes to your guests\' preferences and spice tolerance.' },
      { type: 'list', items: [
        'Small gatherings (10 – 20 guests), order from the à la carte menu',
        'Medium events (20 – 40 guests), set menu with 2 appetizers, 2 mains, 1 biryani, breads, and dessert',
        'Large events (40 – 60 guests), buffet-style with rotating live counters',
      ] },
      { type: 'quote', text: 'The best events feel like a great dinner party, never like a booked event.' },
      { type: 'h2', text: 'Booking' },
      { type: 'p', text: 'Weekends fill up 4 – 6 weeks in advance, especially during the summer wedding season. We recommend calling us as soon as you have a date in mind so we can hold it while we work out the details.' },
    ],
  },
  {
    slug: 'vegetarian-delights',
    title: 'Vegetarian Delights of India',
    date: 'October 12, 2025',
    readTime: '5 min read',
    cat: 'Recipes',
    author: 'Chef Sudarsan',
    img: '/images/gallery5.webp',
    excerpt: 'India has one of the richest vegetarian food traditions in the world. Here are the dishes to try if you\'ve ever thought "vegetarian" meant "boring."',
    body: [
      { type: 'p', text: 'A big part of Indian food never needed meat to be great. Long before "plant-based" became a marketing word, home cooks in India were building meals around lentils, paneer, root vegetables, and clever spice work. Here are a few dishes that show what vegetarian Indian food can really do.' },
      { type: 'h2', text: 'Dal Makhani' },
      { type: 'p', text: 'Black lentils and kidney beans simmered overnight in butter, cream, and warm spices. The texture is silky, the flavor is deep, and, if you close your eyes, you\'d swear there was meat in it. Order it with a butter naan and be prepared to be quiet for a minute.' },
      { type: 'h2', text: 'Paneer Tikka' },
      { type: 'p', text: 'Cubes of fresh cheese marinated in yogurt and spices, then chargrilled in the tandoor. Smoky on the outside, soft in the middle, and completely worth ordering as an appetizer even when everyone else at the table is going for meat.' },
      { type: 'h2', text: 'Baingan Bharta' },
      { type: 'p', text: 'Whole eggplant roasted over an open flame until the skin is black, then peeled, mashed, and cooked down with onions, tomatoes, and mustard oil. It tastes smoky and rich, nothing like the boiled eggplant most people associate with the word "bharta."' },
      { type: 'quote', text: "Vegetables don't need saving. They need respect." },
      { type: 'h2', text: 'Chana Masala' },
      { type: 'p', text: 'Chickpeas in a tangy tomato-onion gravy sharpened with amchur (dried mango powder) and finished with fresh cilantro. Eat with bhature and you\'ll understand why this dish shows up at every Indian street corner from Delhi to Chennai.' },
      { type: 'h2', text: 'Gutti Vankaya' },
      { type: 'p', text: 'An Andhra classic, small eggplants stuffed with a peanut, sesame, and coconut spice paste, then slow-cooked in a rich tamarind gravy. This is one of our most-ordered vegetarian dishes and one of the ones we\'re proudest of.' },
      { type: 'p', text: 'Next time you\'re at Hyderabad House, try building an entire meal from the vegetarian side of the menu. We think you\'ll be surprised.' },
    ],
  },
]

export function getPostBySlug(slug) {
  return posts.find(p => p.slug === slug)
}

export function getRelatedPosts(slug, count = 3) {
  const current = getPostBySlug(slug)
  if (!current) return posts.slice(0, count)
  return posts.filter(p => p.slug !== slug).slice(0, count)
}
