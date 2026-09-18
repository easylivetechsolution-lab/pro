import type { ServiceItem, GalleryProject, Testimonial, Hotspot } from '../types';
import heroTurfImg from '../assets/images/hero_resort_turf_1789529071624.jpg';
import guttersImg from '../assets/images/luxury_seamless_gutters_1789532417478.jpg';

// Authentic Matching Before & After Transformation Images
import exteriorBeforeImg from '../assets/images/exterior_remodel_before_1789536729094.jpg';
import exteriorAfterImg from '../assets/images/exterior_remodel_after_1789536713092.jpg';
import kitchenBeforeImg from '../assets/images/kitchen_remodel_before_1789536668785.jpg';
import kitchenAfterImg from '../assets/images/kitchen_remodel_after_1789536653632.jpg';
import bathroomBeforeImg from '../assets/images/bathroom_remodel_before_1789536699323.jpg';
import bathroomAfterImg from '../assets/images/bathroom_remodel_after_1789536684619.jpg';
import backyardBeforeImg from '../assets/images/backyard_turf_before_1789536756768.jpg';
import backyardAfterImg from '../assets/images/backyard_turf_after_1789536741746.jpg';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'roofing',
    title: 'Roofing',
    category: 'exterior',
    tagline: 'Durable, stylish, and built to last. Protect what matters.',
    description: 'Architectural asphalt shingles, standing seam metal roofing, and Spanish clay tiles engineered to endure severe weather while elevating your home\'s curb appeal.',
    image: 'https://images.unsplash.com/photo-1632759145351-1d592919f522?auto=format&fit=crop&w=1000&q=80',
    iconName: 'Home',
    features: ['Class 4 Impact Resistance', 'Lifetime Wind Warranty', 'Energy-Star Underlayment', 'Seamless Ventilation'],
    materials: ['Owens Corning TruDefinition', 'Standing Seam Aluminum', 'Cedar Shake Replica'],
    warranty: '50-Year Non-Prorated Warranty',
    priceRange: '$9,500 – $32,000'
  },
  {
    id: 'windows-doors',
    title: 'Windows & Doors',
    category: 'exterior',
    tagline: 'Better light, improved efficiency, modern style.',
    description: 'Custom energy-efficient double and triple-pane windows, multi-slide patio glass doors, and grand mahogany front entrances designed for comfort and sound reduction.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    iconName: 'LayoutGrid',
    features: ['Low-E Argon Gas Filled', 'Black Powder-Coated Frames', 'Acoustic Sound Dampening', 'Multi-Point Locking Hardware'],
    materials: ['Milgard Ultra Fiberglass', 'Andersen 400 Series', 'Fleetwood Modern Glass'],
    warranty: '20-Year Glass & Hardware Warranty',
    priceRange: '$12,000 – $45,000'
  },
  {
    id: 'exterior-painting',
    title: 'Exterior Painting',
    category: 'exterior',
    tagline: 'Fresh looks. Lasting protection. Boost your curb appeal.',
    description: 'Full multi-stage surface preparation, power washing, wood restoration, elastomeric weatherproofing, and precision spray-and-brush finishes in designer color palettes.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80',
    iconName: 'Paintbrush',
    features: ['UV-Resistant Micro-Shield', 'Mildew & Moisture Resistant', 'Thorough Caulk & Siding Prep', '10-Year Fade Guarantee'],
    materials: ['Benjamin Moore Aura Exterior', 'Sherwin-Williams Emerald', 'Romabio Mineral Masonry'],
    warranty: '10-Year Labor & Product Warranty',
    priceRange: '$5,500 – $18,000'
  },
  {
    id: 'gutters',
    title: 'Gutters',
    category: 'exterior',
    tagline: 'Keep water where it belongs. Prevent costly damage.',
    description: 'Commercial-grade 6-inch seamless aluminum and copper gutters with micro-mesh leaf guards to protect your foundation, fascia, and landscaping from overflow.',
    image: guttersImg,
    iconName: 'Droplets',
    features: ['Seamless K-Style & Half-Round', 'Micro-Mesh Leaf Protection', 'Oversized 3x4 Downspouts', 'Hidden Heavy-Duty Hangers'],
    materials: ['Heavy Gauge 0.032 Aluminum', 'European Mill Copper', 'Galvalume Steel'],
    warranty: '25-Year No-Clog Guarantee',
    priceRange: '$2,200 – $7,500'
  },
  {
    id: 'turf-grass',
    title: 'Turf / Artificial Grass',
    category: 'outdoor',
    tagline: 'Lush, green, low-maintenance. Year-round beauty.',
    description: 'Ultra-realistic synthetic turf systems engineered with antimicrobial infill, rapid-drain backing, and UV-stabilized fibers safe for pets, kids, and putting greens.',
    image: heroTurfImg,
    iconName: 'Flower2',
    features: ['Zero Water & Mowing Needed', 'Pet & Child Friendly Anti-Odor', 'Eco-Flow Perforated Backing', 'Realistic Multi-Tone Blades'],
    materials: ['SYNLawn Precision Turf', 'ZeoFill Organic Odor Control', 'Silica Base Foundation'],
    warranty: '15-Year Manufacturer Warranty',
    priceRange: '$4,800 – $22,000'
  },
  {
    id: 'flooring',
    title: 'Flooring',
    category: 'interior',
    tagline: 'Premium floors for modern living.',
    description: 'European wide-plank white oak, chevron parquetry, waterproof luxury vinyl plank (LVP), and large-format porcelain tile installed with acoustic subfloor underlayment.',
    image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=1000&q=80',
    iconName: 'Layers',
    features: ['Scratch-Resistant Aluminum Oxide Coat', 'Radiant Heat Compatible', 'Zero-VOC Eco Adhesives', 'Sound-Isolating Subfloor'],
    materials: ['French White Oak 9.5" Planks', 'Calacatta Porcelain 24x48', 'Engineered Hickory'],
    warranty: 'Lifetime Structural Warranty',
    priceRange: '$7,000 – $28,000'
  },
  {
    id: 'interior-painting',
    title: 'Interior Painting',
    category: 'interior',
    tagline: 'Fresh colors. A whole new feel at home.',
    description: 'Flawless wall, ceiling, trim, cabinet, and millwork painting using zero-VOC premium paints with crisp laser-guided cut-in lines and satin smooth finishes.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80',
    iconName: 'RollerCoaster',
    features: ['Zero-VOC Eco-Friendly Paints', 'Dust-Free Sanding Systems', 'Cabinet Enamel Spray Finishing', 'Color Consultation Included'],
    materials: ['Farrow & Ball Estate Emulsion', 'Benjamin Moore Scuff-X', 'Sherwin-Williams Cashmere'],
    warranty: '8-Year Quality Guarantee',
    priceRange: '$3,800 – $14,000'
  },
  {
    id: 'other-remodeling',
    title: 'Other Remodeling Services',
    category: 'interior',
    tagline: 'Kitchens, bathrooms, additions and more.',
    description: 'Complete turnkey architectural remodeling: open-concept kitchen reconfigurations, primary spa en-suites, home office conversions, and basement build-outs.',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=80',
    iconName: 'Wrench',
    features: ['Custom Millwork & Cabinetry', 'Quartzite Waterfall Countertops', 'Permit & Architectural Handling', 'Dedicated Project Superintendent'],
    materials: ['Custom Walnut & Shaker Wood', 'Cambria Quartz Countertops', 'Brizo & Kohler Luxury Plumbing'],
    warranty: '10-Year Full Workmanship Warranty',
    priceRange: '$25,000 – $150,000+'
  }
];

export const GALLERY_PROJECTS: GalleryProject[] = [
  {
    id: 'exterior-makeover',
    title: 'Complete Home Exterior Remodel',
    category: 'Exterior',
    tags: ['Roofing', 'Siding', 'Windows', 'Painting'],
    beforeImage: exteriorBeforeImg,
    afterImage: exteriorAfterImg,
    description: 'Transformation of a weathered 1980s suburban home into a contemporary craftsman masterpiece with dark architectural composite roof, crisp board-and-batten siding, warm cedar accents, and energy-efficient black casement windows.',
    duration: '4 Weeks',
    scope: ['Architectural roof replacement', 'White board-and-batten siding', 'Black-trim casement windows', 'Cedar porch columns & stone paver walkway']
  },
  {
    id: 'modern-kitchen',
    title: 'Modern Kitchen Remodel',
    category: 'Interior',
    tags: ['Flooring', 'Cabinets', 'Countertops'],
    beforeImage: kitchenBeforeImg,
    afterImage: kitchenAfterImg,
    description: 'Transformation of an outdated honey oak kitchen into a bright, chef-inspired space with rift-sawn oak and charcoal cabinetry, Calacatta marble waterfall island, designer brass pendants, and wide-plank hardwood floors.',
    duration: '5 Weeks',
    scope: ['Outdated cabinet & wall removal', 'Calacatta waterfall island installation', 'Integrated chef-grade appliances', 'Rift-sawn white oak cabinetry & lighting']
  },
  {
    id: 'spa-bathroom',
    title: 'Bathroom Renovation',
    category: 'Interior',
    tags: ['Tile', 'Fixtures', 'Flooring'],
    beforeImage: bathroomBeforeImg,
    afterImage: bathroomAfterImg,
    description: 'Converted an outdated cramped primary bath into a tranquil spa retreat with a freestanding oval soaking tub, frameless glass walk-in rainfall shower, floating wood dual vanity, and heated porcelain stone tiles.',
    duration: '3 Weeks',
    scope: ['Frameless glass rainfall shower', 'Freestanding soaking tub installation', 'Floating double vanity with backlit mirrors', 'Heated porcelain tile floor system']
  },
  {
    id: 'backyard-turf',
    title: 'Backyard Turf Installation',
    category: 'Outdoor',
    tags: ['Artificial Grass', 'Landscaping'],
    beforeImage: backyardBeforeImg,
    afterImage: backyardAfterImg,
    description: 'Replaced a patchy, mud-ridden yard with 2,400 sq.ft. of ultra-durable pet-safe turf, a custom 3-hole putting green, ivory travertine patio pavers, and modern perimeter cedar privacy fencing.',
    duration: '2 Weeks',
    scope: ['Excavation & road base grading', 'Antimicrobial turf grass installation', 'Custom putting green with cup flags', 'Ivory travertine paver patio & lighting']
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah M.',
    role: 'Homeowner',
    location: 'Westlake Hills',
    rating: 5,
    quote: 'They transformed our outdated home into something amazing! Professional, reliable, and the quality is top-notch.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    projectType: 'Full Home Exterior & Flooring'
  },
  {
    id: '2',
    name: 'James T.',
    role: 'Homeowner',
    location: 'Highland Park',
    rating: 5,
    quote: 'The team was incredible from start to finish. Our new roof and windows look fantastic. Highly recommend!',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    projectType: 'Roofing & Windows Installation'
  },
  {
    id: '3',
    name: 'Lisa R.',
    role: 'Homeowner',
    location: 'Rolling Hills',
    rating: 5,
    quote: 'Excellent service, great communication, and they finished on time. Our backyard looks like a resort!',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    projectType: 'Backyard Turf & Patio Remodel'
  },
  {
    id: '4',
    name: 'David K.',
    role: 'Homeowner',
    location: 'Lakeway',
    rating: 5,
    quote: 'From the initial 3D design to the final punch list, their attention to detail surpassed our highest expectations.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    projectType: 'Chef Kitchen & Interior Painting'
  }
];

export const HOTSPOTS_DATA: Hotspot[] = [
  {
    id: 'roofing',
    title: 'Roofing',
    category: 'Exterior',
    x: 50,
    y: 12,
    description: 'Lifetime architectural shingles with ice & water shield, high-velocity wind resistance, and continuous ridge ventilation.',
    features: ['50-Year Warranty', 'Class A Fire Rating', 'Custom Copper Flashing'],
    image: 'https://images.unsplash.com/photo-1632759145351-1d592919f522?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'windows-doors',
    title: 'Windows & Doors',
    category: 'Exterior',
    x: 71,
    y: 12,
    description: 'Thermally broken aluminum and fiberglass frames with acoustic laminate Low-E glass that cuts energy costs by up to 35%.',
    features: ['Argon Insulated Panes', 'Slim Contemporary Mullions', 'Smart Lock Ready'],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'exterior-painting',
    title: 'Exterior Painting',
    category: 'Exterior',
    x: 88,
    y: 19,
    description: 'Elastomeric ceramic-infused coatings that resist intense sun fading, cracking, and moisture intrusion on all masonry & siding.',
    features: ['10-Year Fade Warranty', 'Full Caulk & Seal Prep', 'Designer Color Consultation'],
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'gutters',
    title: 'Gutters',
    category: 'Exterior',
    x: 89,
    y: 27,
    description: 'Custom seamless heavy-gauge gutters designed to handle torrential downpours with stainless micro-mesh debris shields.',
    features: ['Zero-Spill Sizing', 'Concealed Bracket System', 'Custom Color Matching'],
    image: guttersImg
  },
  {
    id: 'turf-grass',
    title: 'Turf / Artificial Grass',
    category: 'Outdoor',
    x: 45,
    y: 91,
    description: 'Eco-friendly synthetic lawn with multi-tone spring green blades, rapid drainage, and antimicrobial non-compacting infill.',
    features: ['Never Needs Mowing', 'Safe for Children & Pets', '15-Year UV Stability'],
    image: heroTurfImg
  },
  {
    id: 'flooring',
    title: 'Flooring',
    category: 'Interior',
    x: 60,
    y: 91,
    description: 'Hand-selected European white oak planks wire-brushed with matte polyurethane seal for scratch-resistant warmth.',
    features: ['Wide 9.5" Planks', 'Silent Underlayment', 'Zero VOC Emissions'],
    image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'interior-painting',
    title: 'Interior Painting',
    category: 'Interior',
    x: 75,
    y: 91,
    description: 'Museum-grade interior finishes with zero odors, ultra-durable scrubbability, and velvety matte and satin textures.',
    features: ['Zero VOC Formulation', 'Flawless Spray Cabinets', 'Laser Straight Trim Edges'],
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'remodeling',
    title: 'Remodeling',
    category: 'General',
    x: 89,
    y: 91,
    description: 'Comprehensive structural reconfiguration, luxury chef kitchens, spa bathrooms, and illuminated outdoor living rooms.',
    features: ['Turnkey Project Management', 'Licensed Master Trades', 'On-Time Guaranteed'],
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80'
  }
];
