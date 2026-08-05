import { Product, Ingredient, Testimonial, BlogPost, QuizQuestion } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Renaissance Cleansing Powder',
    subtitle: 'Soothing Barrier Repair Drops & Powder Formula',
    category: 'Skin',
    concern: ['Sensitive Skin', 'Dry & Dehydrated', 'Uneven Texture'],
    price: 24.00,
    originalPrice: 28.00,
    rating: 4.9,
    reviewCount: 142,
    badge: 'Award Winner',
    image: 'https://images.unsplash.com/photo-1608248597263-000799965d13?q=80&w=800&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1608248597263-000799965d13?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'An innovative waterless cleansing powder crafted with French Pink Clay, Organic Colloidal Oatmeal, and Rosehip. Activates with water into a creamy paste that gently exfoliates without stripping natural barrier oils.',
    whyItWorks: [
      'Colloidal Oatmeal calms redness and itchy barrier inflammation',
      'Pink Clay draws out pore impurities without moisture loss',
      'Rosehip & Matcha Tea deliver potent antioxidants',
      'Zero liquid weight means 100% plastic-free packaging'
    ],
    howToUse: [
      '1. Tap a half-teaspoon into clean, wet palms.',
      '2. Add a few drops of warm water and rub hands together to form a silky foam.',
      '3. Gently massage onto damp face in circular motions.',
      '4. Rinse thoroughly with lukewarm water.'
    ],
    ingredients: ['French Pink Clay', 'Organic Colloidal Oatmeal', 'Rosehip Fruit Powder', 'Matcha Green Tea', 'Lavender Flower Oil'],
    isRefillable: true,
    isVegan: true,
    award: 'Beauty Shortlist Awards 2024 Winner',
    variants: [
      { id: 'v1-1', name: 'Full Metal Aluminium Tin (70g)', type: 'full', price: 24.00, weightOrVolume: '70g', inStock: true },
      { id: 'v1-2', name: 'Paper Bag Refill (70g)', type: 'refill_paper_bag', price: 20.00, weightOrVolume: '70g', inStock: true, savingsPercentage: 17 },
      { id: 'v1-3', name: 'Bulk Eco Refill Pack (140g)', type: 'refill_paper_bag', price: 36.00, weightOrVolume: '140g', inStock: true, savingsPercentage: 25 }
    ]
  },
  {
    id: 'prod-2',
    name: 'Hibiscus Dream Hair Potion',
    subtitle: 'Nourishing Scalp & End Barrier drops',
    category: 'Hair',
    concern: ['Dry Scalp', 'Frizz & Split Ends', 'Thinning Hair'],
    price: 32.00,
    rating: 5.0,
    reviewCount: 98,
    badge: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'A deeply restorative botanical oil infusion of Wild Hibiscus flowers, Argan, Camellia seed, and Rosemary. Strengthens strands, quenches thirsty scalps, and leaves hair luminous.',
    whyItWorks: [
      'Hibiscus alpha-hydroxy acids clear hair follicle build-up',
      'Organic Rosemary stimulates healthy hair growth',
      'Cold-pressed Camellia Seed seals split ends without heaviness'
    ],
    howToUse: [
      'For scalp treatment: Massage 4-6 drops into scalp 30 mins before washing.',
      'For daily shine: Warm 2 drops between palms and smooth through damp ends.'
    ],
    ingredients: ['Wild Hibiscus Petals', 'Organic Argan Kernel Oil', 'Camellia Oleifera Seed Oil', 'Rosemary Leaf Extract', 'Frankincense Oil'],
    isRefillable: true,
    isVegan: true,
    award: 'Natural Health Beauty Awards Finalist',
    variants: [
      { id: 'v2-1', name: 'Amber Glass Bottle with Dropper (50ml)', type: 'full', price: 32.00, weightOrVolume: '50ml', inStock: true },
      { id: 'v2-2', name: 'Aluminium Refill Bottle with Screw Cap (50ml)', type: 'refill_paper_bag', price: 27.00, weightOrVolume: '50ml', inStock: true, savingsPercentage: 15 }
    ]
  },
  {
    id: 'prod-3',
    name: 'Zero-Waste Tooth Powder',
    subtitle: 'Mineralizing Mint & Cacao Tooth Polish',
    category: 'Teeth',
    concern: ['Enamel Support', 'Stain Removal', 'Sensitive Teeth'],
    price: 16.00,
    rating: 4.8,
    reviewCount: 76,
    badge: 'Refillable',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop',
    description: 'Formulated with Hydroxyapatite (natural mineral enamel rebuild), Bentonite Clay, Peppermint, and Fairtrade Cacao. Cleans teeth deeply while refreshing breath without artificial foaming agents.',
    whyItWorks: [
      'Hydroxyapatite remineralizes micro-defects in enamel',
      'Bentonite clay gently removes coffee and tea stains',
      'Organic Peppermint oil leaves long-lasting herbal freshness'
    ],
    howToUse: [
      'Dip dry toothbrush bristles lightly into the powder container.',
      'Brush thoroughly for 2 minutes and rinse as normal.'
    ],
    ingredients: ['Nano-Hydroxyapatite', 'Calcium Carbonate', 'Bentonite Clay', 'Peppermint Essential Oil', 'Raw Cacao Extract'],
    isRefillable: true,
    isVegan: true,
    variants: [
      { id: 'v3-1', name: 'Glass Jar with Aluminium Lid (60g)', type: 'full', price: 16.00, weightOrVolume: '60g', inStock: true },
      { id: 'v3-2', name: 'Compostable Paper Bag Refill (60g)', type: 'refill_paper_bag', price: 13.00, weightOrVolume: '60g', inStock: true, savingsPercentage: 18 }
    ]
  },
  {
    id: 'prod-4',
    name: 'Overnight Renaissance Magic Balm',
    subtitle: 'Ultra-Nourishing Multi-Purpose Skin Butter',
    category: 'Skin',
    concern: ['Dry & Dehydrated', 'Barrier Repair', 'Chapped Hands & Lips'],
    price: 28.00,
    originalPrice: 32.00,
    rating: 4.9,
    reviewCount: 215,
    badge: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800&auto=format&fit=crop',
    description: 'A rich, melting salve packed with Raw Shea, Sea Buckthorn, Calendula, and Evening Primrose. Acts as an emergency moisture seal for stressed skin, dry cuticles, and cracked heels.',
    whyItWorks: [
      'Sea Buckthorn oil delivers rare Omega-7 fatty acids',
      'Solar-infused Calendula relieves eczema-prone patches',
      '100% water-free concentrate lasts twice as long as cream'
    ],
    howToUse: [
      'Wipe a small pea-sized amount onto fingers.',
      'Press gently onto dry patches, lips, or cheekbones overnight.'
    ],
    ingredients: ['Wild Harvested Shea Butter', 'Calendula Flower Infusion', 'Sea Buckthorn Berry Oil', 'Evening Primrose Oil', 'Sweet Orange Essential Oil'],
    isRefillable: true,
    isVegan: true,
    award: 'Green Parent Beauty Gold Award',
    variants: [
      { id: 'v4-1', name: 'Aluminium Pocket Tin (60ml)', type: 'full', price: 28.00, weightOrVolume: '60ml', inStock: true },
      { id: 'v4-2', name: 'Refill Pouch (60ml)', type: 'refill_paper_bag', price: 23.00, weightOrVolume: '60ml', inStock: true, savingsPercentage: 17 }
    ]
  },
  {
    id: 'prod-5',
    name: 'Wild Rose & Tea Clay Facial Polish',
    subtitle: 'Gentle Botanical Exfoliant & Mask Duo',
    category: 'Skin',
    concern: ['Dullness', 'Uneven Texture', 'Congested Pores'],
    price: 26.00,
    rating: 4.8,
    reviewCount: 64,
    badge: 'New Arrival',
    image: 'https://images.unsplash.com/photo-1567928269917-a89fc7504f76?q=80&w=800&auto=format&fit=crop',
    description: 'Crushed Organic Damask Rose petals paired with White Kaolin clay and Green Tea powder. Works double duty as a gentle daily polish or a 10-minute clarifying face mask.',
    whyItWorks: [
      'Kaolin clay purifies pores without tightness',
      'Crushed rose petals provide delicate physical polish',
      'Green tea polyphenols soothe sensitive complexions'
    ],
    howToUse: [
      'Mix 1 tablespoon with floral water or honey into a paste.',
      'Apply to skin, leave for 10 mins as a mask, then rinse with warm water.'
    ],
    ingredients: ['White Kaolin Clay', 'Damask Rose Petal Powder', 'Organic Camellia Sinensis', 'Marshmallow Root Extract'],
    isRefillable: true,
    isVegan: true,
    variants: [
      { id: 'v5-1', name: 'Amber Glass Jar (80g)', type: 'full', price: 26.00, weightOrVolume: '80g', inStock: true },
      { id: 'v5-2', name: 'Paper Bag Refill (80g)', type: 'refill_paper_bag', price: 21.00, weightOrVolume: '80g', inStock: true, savingsPercentage: 19 }
    ]
  },
  {
    id: 'prod-6',
    name: 'The Good Day Ritual Kit',
    subtitle: 'Complete 3-Step Morning Skincare & Haircare Bundle',
    category: 'Bundles',
    concern: ['Daily Care', 'Gifting', 'Routine Start'],
    price: 64.00,
    originalPrice: 82.00,
    rating: 5.0,
    reviewCount: 52,
    badge: 'Plastic Free',
    image: 'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?q=80&w=800&auto=format&fit=crop',
    description: 'Save £18 with our signature morning ritual kit! Includes the Renaissance Cleansing Powder (70g), Hibiscus Dream Hair Potion (50ml), and Overnight Magic Balm (60ml) packaged in a reusable organic cotton wash bag.',
    whyItWorks: [
      'Covers cleansing, hydration, and hair nutrition in one simplified routine',
      'Includes free Organic Cotton travel canvas pouch',
      'Saves 22% compared to purchasing individually'
    ],
    howToUse: [
      'Follow the 3-step ritual daily: Cleanse with Powder, Hydrate ends with Potion, and seal skin with Balm.'
    ],
    ingredients: ['Includes all ingredients from Renaissance Powder, Hibiscus Potion & Magic Balm'],
    isRefillable: false,
    isVegan: true,
    variants: [
      { id: 'v6-1', name: 'Complete 3-Piece Kit + Free Canvas Bag', type: 'bundle', price: 64.00, weightOrVolume: 'Kit', inStock: true, savingsPercentage: 22 }
    ]
  },
  {
    id: 'prod-7',
    name: 'Oxfordshire Tea & Cedar Botanical Candle',
    subtitle: 'Hand-Poured Rapeseed & Soy Wax Candle',
    category: 'Home',
    concern: ['Relaxation', 'Aromatherapy', 'Home Sanctuary'],
    price: 22.00,
    rating: 4.9,
    reviewCount: 38,
    badge: 'New Arrival',
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=800&auto=format&fit=crop',
    description: 'Hand-poured in small batches in our Oxfordshire studio using 100% natural UK-grown rapeseed and soy wax. Scented exclusively with pure essential oils of Earl Grey Tea, Atlas Cedarwood, and Bergamot.',
    whyItWorks: [
      'Clean 45-hour burn time with zero synthetic paraffin fumes',
      'Cotton wick in amber apothecary glass jar',
      'Soothing tea and grounding wood notes'
    ],
    howToUse: [
      'Trim wick to 5mm before lighting. Burn for at least 2 hours on first use.'
    ],
    ingredients: ['UK Rapeseed Wax', 'Soy Wax', 'Atlas Cedarwood Oil', 'Bergamot Essential Oil', 'Black Tea Extract'],
    isRefillable: true,
    isVegan: true,
    variants: [
      { id: 'v7-1', name: 'Amber Glass Vessel (200g)', type: 'full', price: 22.00, weightOrVolume: '200g', inStock: true },
      { id: 'v7-2', name: 'Wax Pillar Refill Block (200g)', type: 'refill_paper_bag', price: 17.00, weightOrVolume: '200g', inStock: true, savingsPercentage: 23 }
    ]
  },
  {
    id: 'prod-8',
    name: 'Shikakai Scalp & Hair Powder Cleanser',
    subtitle: 'Ayurvedic Herbal Shampoo Alternative',
    category: 'Hair',
    concern: ['Oily Scalp', 'Hair Loss Support', 'Sulphate Free'],
    price: 19.00,
    rating: 4.9,
    reviewCount: 88,
    badge: 'Refillable',
    image: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=800&auto=format&fit=crop',
    description: '100% natural fruit pod powder derived from Acacia Concinna (Shikakai) and Reetha. Cleanses hair gently while balancing scalp oils and maintaining natural pH balance.',
    whyItWorks: [
      'Natural plant saponins lather softly without harsh sulphates',
      'pH balanced (4.5-5.5) protects scalp micro-biome',
      'Strengthens roots and reduces excess sebum output'
    ],
    howToUse: [
      'Mix 2 tablespoons of powder with warm water to create a smooth tea paste.',
      'Massage into roots, leave for 3 mins, then rinse completely.'
    ],
    ingredients: ['Organic Shikakai Fruit Pod Powder', 'Reetha (Soapnut) Powder', 'Amla Fruit Extract'],
    isRefillable: true,
    isVegan: true,
    variants: [
      { id: 'v8-1', name: 'Aluminium Shaker Tin (100g)', type: 'full', price: 19.00, weightOrVolume: '100g', inStock: true },
      { id: 'v8-2', name: 'Paper Bag Refill (100g)', type: 'refill_paper_bag', price: 15.00, weightOrVolume: '100g', inStock: true, savingsPercentage: 21 }
    ]
  }
];

export const INGREDIENTS: Ingredient[] = [
  {
    id: 'ing-1',
    commonName: 'French Pink Clay',
    botanicalName: 'Kaolinite / Illite',
    description: 'A delicate blend of red and white clays mined naturally in France. Perfect for sensitive skin needing gentle detox without dehydration.',
    benefits: ['Draws out pore impurities', 'Boosts circulation & glow', 'Calms delicate reactive skin'],
    foundInProducts: ['Renaissance Cleansing Powder', 'Wild Rose & Tea Clay Facial Polish']
  },
  {
    id: 'ing-2',
    commonName: 'Colloidal Oatmeal',
    botanicalName: 'Avena Sativa Kernel Flour',
    description: 'Whole oat kernels finely milled to retain active beta-glucans and lipids. Globally recognized for relieving dry, itchy skin conditions.',
    benefits: ['Binds moisture to barrier', 'Reduces redness & stinging', 'Forms protective natural shield'],
    foundInProducts: ['Renaissance Cleansing Powder', 'Overnight Renaissance Magic Balm']
  },
  {
    id: 'ing-3',
    commonName: 'Shikakai Fruit Pods',
    botanicalName: 'Acacia Concinna',
    description: 'An ancient Asian botanical known as "fruit for the hair". Packed with natural saponins, vitamins A, C, D, E, and antioxidants.',
    benefits: ['Sulphate-free natural lather', 'Detangles long hair', 'Maintains scalp pH balance'],
    foundInProducts: ['Shikakai Scalp & Hair Powder Cleanser']
  },
  {
    id: 'ing-4',
    commonName: 'Wild Hibiscus',
    botanicalName: 'Hibiscus Sabdariffa',
    description: 'Often called the "botox plant", Hibiscus is rich in gentle mucilage and natural AHAs that encourage cell turnover and elastic bounce.',
    benefits: ['Rich in natural vitamin C', 'Encourages scalp collagen', 'Imparts natural shine'],
    foundInProducts: ['Hibiscus Dream Hair Potion']
  },
  {
    id: 'ing-5',
    commonName: 'Sea Buckthorn Berry',
    botanicalName: 'Hippophae Rhamnoides',
    description: 'Vibrant orange oil extracted from wild berries in Northern Europe. One of the richest botanical sources of rare Omega-7 and palmitoleic acid.',
    benefits: ['Accelerates tissue repair', 'Restores damaged moisture barriers', 'Provides golden glowing tone'],
    foundInProducts: ['Overnight Renaissance Magic Balm']
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    customerName: 'Sara Jahan',
    location: 'Oxford, UK',
    productName: 'Renaissance Cleansing Powder',
    rating: 5,
    quote: 'My skin feels incredibly soft and hydrated after just a few days. I can actually see the glow coming back without any harsh redness!',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    customerPhoto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop',
    verified: true
  },
  {
    id: 'test-2',
    customerName: 'Emma Richardson',
    location: 'Bristol, UK',
    productName: 'Hibiscus Dream Hair Potion',
    rating: 5,
    quote: 'I converted from liquid shampoo bottles to Leafology powders 6 months ago. My scalp psoriasis has completely calmed down, and the paper bag refills are genius.',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop',
    customerPhoto: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=600&auto=format&fit=crop',
    verified: true
  },
  {
    id: 'test-3',
    customerName: 'Dr. Michael Vance',
    location: 'Edinburgh, UK',
    productName: 'Zero-Waste Tooth Powder',
    rating: 5,
    quote: 'The hydroxyapatite tooth powder is outstanding. Clean teeth, fresh breath, and zero plastic toothpaste tubes going into landfill.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    customerPhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop',
    verified: true
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Why Gentle Powder Cleansers Are Better for Your Skin Every Day',
    slug: 'powder-cleansers-benefits',
    category: 'Skin Education',
    date: 'October 10, 2026',
    readTime: '3 min read',
    excerpt: 'Traditional liquid cleansers are 80% water and require synthetic preservatives. Discover why dry botanical powders are purer, more concentrated, and kinder to sensitive barriers.',
    content: 'Water in skincare requires heavy synthetic preservatives to prevent bacterial growth. By removing water from the manufacturing process, Leafology powder formulas remain 100% active, highly concentrated, and completely free of liquid micro-plastics...',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop',
    author: 'Leafy Founder'
  },
  {
    id: 'blog-2',
    title: 'The Zero-Waste Refill Guide: Glass, Metal & Paper Bags',
    slug: 'zero-waste-refill-guide',
    category: 'Sustainability',
    date: 'October 14, 2026',
    readTime: '4 min read',
    excerpt: 'How our Oxfordshire studio redesigned cosmetic packaging so you can buy a durable tin once, and refill endlessly with recyclable paper pouches.',
    content: 'Every year, 120 billion units of plastic cosmetic packaging are thrown into landfill. Our refill system offers a practical, elegant solution: purchase our signature aluminium tins or amber glass jars once, and top up with lightweight paper refills...',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=800&auto=format&fit=crop',
    author: 'Sustainability Lead'
  },
  {
    id: 'blog-3',
    title: 'Understanding Shikakai & Ancient Botanical Hair Rituals',
    slug: 'shikakai-hair-rituals',
    category: 'Hair Care',
    date: 'October 18, 2026',
    readTime: '3 min read',
    excerpt: 'How fruit pod saponins clean your hair while preserving natural sebum balance — no harsh SLS needed.',
    content: 'Acacia Concinna, known as Shikakai, has been used for over 4,000 years across Asia for hair cleansing. Rich in natural plant saponins and low pH, it cleanses without stripping natural protective scalp oils...',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop',
    author: 'Botanical Formulator'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    title: 'What is your primary care focus today?',
    subtitle: 'Select the area you would like to nourish or transform',
    options: [
      { label: 'Facial Skincare', description: 'Calm redness, hydration, or gentle polish', icon: 'Sparkles', value: 'Skin' },
      { label: 'Hair & Scalp Care', description: 'Scalp comfort, end repair, or volume', icon: 'Scissors', value: 'Hair' },
      { label: 'Zero-Waste Teeth', description: 'Enamel support, natural stain removal', icon: 'Smile', value: 'Teeth' },
      { label: 'Full Routine / Gifting', description: 'Complete eco kit or thoughtful bundle', icon: 'Gift', value: 'Bundles' }
    ]
  },
  {
    id: 2,
    title: 'How would you describe your skin or hair condition?',
    subtitle: 'Helps us pinpoint gentle botanical actives',
    options: [
      { label: 'Sensitive & Reactive', description: 'Prone to redness, tightness, or inflammation', icon: 'ShieldCheck', value: 'Sensitive Skin' },
      { label: 'Dry & Dehydrated', description: 'Needs deep oil-seal moisture & barrier repair', icon: 'Droplets', value: 'Dry & Dehydrated' },
      { label: 'Dull or Congested', description: 'Wants natural radiance, smooth texture, pore clarify', icon: 'Sun', value: 'Dullness' }
    ]
  },
  {
    id: 3,
    title: 'What packaging format do you prefer?',
    subtitle: 'All our packaging is plastic-free and refillable',
    options: [
      { label: 'Waterless Powder', description: 'Concentrated dry powders activated with water', icon: 'Feather', value: 'powder' },
      { label: 'Melting Salve / Balm', description: 'Water-free butter salves & rich herbal oils', icon: 'Heart', value: 'balm' },
      { label: 'Complete Starter Kit', description: 'Aluminium tins + free paper bag refills', icon: 'Package', value: 'kit' }
    ]
  }
];
