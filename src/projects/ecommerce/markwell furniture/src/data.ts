import type { Product, Category, BlogPost, Testimonial, ErgonomicFeature } from './types';
import ergoChairFrontImg from './assets/images/ergo_chair_front_1789335622198.jpg';
import ergoChairSideImg from './assets/images/ergo_chair_side_1789335636307.jpg';
import ergoChairBackImg from './assets/images/ergo_chair_back_1789335649130.jpg';
import ergoChairThreeQtrImg from './assets/images/ergo_chair_three_qtr_1789335668046.jpg';
import womanErgoPostureImg from './assets/images/woman_ergo_posture_1789337139503.jpg';
import standingDeskImg from './assets/images/standing_desk_shot_1789337872386.jpg';
import confTableImg from './assets/images/conf_table_shot_1789337885116.jpg';
import execDeskImg from './assets/images/exec_desk_shot_1789337899461.jpg';
import storageCabinetImg from './assets/images/storage_cabinet_shot_1789337912448.jpg';
import loungeChairImg from './assets/images/lounge_chair_shot_1789337923984.jpg';
import redwoodChairImg from './assets/images/redwood_lounge_chair_1789334472223.jpg';
import woodDeskChairImg from './assets/images/wood_desk_chair_1789334500077.jpg';
import teakCredenzaImg from './assets/images/teak_credenza_1789334512576.jpg';
import bookshelfRoomImg from './assets/images/wooden_bookshelf_room_1789334485985.jpg';
import jamesCarterAvatar from './assets/images/james_carter_avatar_1789339402551.jpg';
import blogDeskImg from './assets/images/blog_ergo_desk_1789339906773.jpg';
import blogCollabImg from './assets/images/blog_team_collab_1789339918556.jpg';
import blogCraftImg from './assets/images/blog_craft_wood_1789339930285.jpg';
import blogChairImg from './assets/images/blog_ergo_chair_1789339941641.jpg';

export const CATEGORIES: Category[] = [
  {
    id: 'office-desks',
    title: 'Office Desks',
    description: 'Executive, standing and minimalist workstation desks',
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80',
    itemCount: 42,
  },
  {
    id: 'ergonomic-chairs',
    title: 'Ergonomic Chairs',
    description: 'Scientifically engineered for posture, spinal health and flow',
    image: 'https://images.unsplash.com/photo-1505797149-43b0069ec26b?auto=format&fit=crop&w=800&q=80',
    itemCount: 38,
  },
  {
    id: 'conference-meeting',
    title: 'Conference & Meeting',
    description: 'Statement tables and collaborative boardroom settings',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    itemCount: 24,
  },
  {
    id: 'storage-filing',
    title: 'Storage & Wardrobes',
    description: 'Architectural credenzas, modular wardrobes and filing units',
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80',
    itemCount: 29,
  },
  {
    id: 'workstations',
    title: 'Workstations',
    description: 'Modular pod systems designed for team agility',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80',
    itemCount: 31,
  },
  {
    id: 'handcrafted-furniture',
    title: 'Handcrafted Furniture',
    description: 'Artisanal tables, solid oak wardrobes, and bespoke chairs',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
    itemCount: 19,
  },
  {
    id: 'lounge-chairs',
    title: 'Lounge & Accent Chairs',
    description: 'Ergonomic relaxation and master-crafted reception seating',
    image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=800&q=80',
    itemCount: 22,
  },
  {
    id: 'executive-wardrobes',
    title: 'Executive Wardrobes',
    description: 'Full-height acoustic wardrobes and architectural cabinetry',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
    itemCount: 16,
  },
];

export const FEATURED_PRODUCTS: Product[] = [
  {
    id: 'ww-mesh-chair-01',
    name: 'Ergonomic Mesh Chair',
    category: 'chairs',
    price: 499.00,
    originalPrice: 599.00,
    rating: 5.0,
    reviewCount: 124,
    image: ergoChairFrontImg,
    secondaryImage: ergoChairSideImg,
    images: [
      ergoChairFrontImg,
      ergoChairSideImg,
      ergoChairBackImg,
      ergoChairThreeQtrImg,
      womanErgoPostureImg,
    ],
    isSale: true,
    isBestSeller: true,
    tag: 'Sale',
    description: 'Engineered with responsive dynamic lumbar support, breathable 3D elastic mesh, and 4D omnidirectional armrests for 12+ hours of posture-perfect comfort.',
    features: [
      'Self-adjusting dynamic lumbar balance system',
      'High-tensile breathable elastomeric mesh matrix',
      '4-way synchronized tilt mechanism with 4 lockable angles',
      'Padded 4D armrests adjustable in height, angle, and depth',
      'Class-4 heavy duty pneumatic gas cylinder tested to 350 lbs'
    ],
    dimensions: '26"W x 26"D x 46-51"H',
    materials: ['Aviation-grade Aluminum Base', 'Breathable Elastomer Mesh', 'PU Silent Casters'],
  },
  {
    id: 'ww-standing-desk-02',
    name: 'Adjustable Standing Desk',
    category: 'desks',
    price: 799.00,
    originalPrice: 899.00,
    rating: 5.0,
    reviewCount: 94,
    image: standingDeskImg,
    secondaryImage: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=800&q=80',
    images: [
      standingDeskImg,
      'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?auto=format&fit=crop&w=800&q=80',
    ],
    isSale: false,
    tag: 'Popular',
    description: 'Dual-motor ultra-silent motorized lift frame paired with sustainably harvested FSC-certified solid walnut desktop. Features 4 programmable memory presets and anti-collision technology.',
    features: [
      'Dual German-engineered motors with <45dB whisper-quiet operation',
      '1.25" thick solid American walnut with bevel edge finish',
      'Integrated under-desk wire raceway & cable management tray',
      'LED memory keypad with 4 height presets and USB-C fast charging',
      'Height range from 24.5" to 50.2" accommodating users of all heights'
    ],
    dimensions: '60"W x 30"D x 24.5"-50.2"H',
    materials: ['Solid American Walnut', 'Heavy Gauge Rolled Steel Frame', 'Anti-Fingerprint Finish'],
  },
  {
    id: 'ww-conference-table-03',
    name: 'Conference Table (8 Seater)',
    category: 'conference',
    price: 2499.00,
    rating: 5.0,
    reviewCount: 76,
    image: confTableImg,
    secondaryImage: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=800&q=80',
    images: [
      confTableImg,
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
    ],
    isSale: false,
    isBestSeller: true,
    tag: 'Best Seller',
    description: 'Monumental boardroom centerpiece crafted from live-edge sustainably sourced European oak, integrated with hidden motorized power hubs, HDMI, and AC breakouts.',
    features: [
      'Accommodates 8-10 executive chairs comfortably',
      'Dual pop-up flush power distribution modules with USB-C PD & AC',
      'Matte architectural powder-coated steel trestle base',
      'Hand-rubbed natural organic wax and oil protective seal'
    ],
    dimensions: '96"W x 44"D x 30"H',
    materials: ['Sustainably Sourced European Oak', 'Industrial Steel Base'],
  },
  {
    id: 'ww-executive-desk-04',
    name: 'Executive Desk',
    category: 'desks',
    price: 1899.00,
    originalPrice: 2199.00,
    rating: 5.0,
    reviewCount: 90,
    image: execDeskImg,
    secondaryImage: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80',
    images: [
      execDeskImg,
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80',
    ],
    isSale: false,
    tag: 'Executive',
    description: 'The definitive command post for the modern leader. Finished with hand-matched quartersawn walnut veneers, soft-close velvet-lined drawers, and integrated inductive desk charger.',
    features: [
      'Concealed wireless fast charging station embedded flush in desktop',
      'Lockable privacy drawer with biometric fingerprint sensor',
      'Spacious modesty panel with acoustic felt backing',
      'Modular return wing allows left or right L-shape orientation'
    ],
    dimensions: '72"W x 36"D x 30"H',
    materials: ['Select Quartersawn Walnut', 'Brushed Brass Hardware', 'Leather Blotter Pad'],
  },
  {
    id: 'ww-storage-cabinet-05',
    name: 'Storage Cabinet',
    category: 'storage',
    price: 849.00,
    rating: 5.0,
    reviewCount: 43,
    image: storageCabinetImg,
    secondaryImage: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80',
    images: [
      storageCabinetImg,
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    ],
    isSale: false,
    tag: 'Storage',
    description: 'Architectural credenza featuring fluted acoustic wooden tambour doors, adjustable shelving, and lockable filing suspension rails for legal and letter documents.',
    features: [
      'Sliding fluted tambour doors with seamless soft glide tracks',
      'Adjustable internal shelving with 120 lb weight capacity per shelf',
      'Anti-tip safety interlock system with counterweighted stabilization',
      'Cable routing grommets allowing hidden internal printer/tech storage'
    ],
    dimensions: '48"W x 18"D x 34"H',
    materials: ['Acoustic Ribbed Wood Veneer', 'Powder Coated Steel Legs'],
  },
  {
    id: 'ww-wooden-lounge-06',
    name: 'Wooden Lounge Chair',
    category: 'handcrafted',
    price: 1249.00,
    rating: 5.0,
    reviewCount: 52,
    image: loungeChairImg,
    secondaryImage: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80',
    images: [
      loungeChairImg,
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80',
    ],
    isSale: false,
    tag: 'Artisan',
    description: 'Sculpted by hand using traditional mortise-and-tenon joinery. Premium vegetable-tanned saddle leather paired with solid steam-bent American black cherry wood.',
    features: [
      'Steam-bent solid cherry wood frame hand-sanded to 400 grit',
      'Full-grain Tuscan saddle leather with reinforced saddle stitching',
      'High-density memory foam core tailored for ergonomic lounge relaxation',
      'Each chair individually numbered and branded by the master artisan'
    ],
    dimensions: '32"W x 34"D x 33"H',
    materials: ['Solid Steam-bent American Cherry', 'Full-Grain Italian Saddle Leather'],
  },
  {
    id: 'ww-redwood-lounge-07',
    name: 'Redwood Lounge Chair',
    category: 'handcrafted',
    price: 1299.00,
    rating: 5.0,
    reviewCount: 24,
    image: redwoodChairImg,
    secondaryImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
    images: [
      redwoodChairImg,
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
    ],
    isSale: false,
    tag: 'Handcrafted',
    description: 'Hand-sculpted old-growth redwood lounge chair featuring an organic lumbar contour, hand-rubbed Danish oil finish, and cognac full-grain leather cushions.',
    features: [
      'Artisan mortise and tenon joinery with solid brass dowel pins',
      'Sustainably harvested old-growth reclaimed redwood',
      'Hand-stitched aniline full-grain leather upholstery',
      'Ergonomic 105-degree reclined posture angle'
    ],
    dimensions: '30"W x 33"D x 34"H',
    materials: ['Reclaimed California Redwood', 'Aniline Full Grain Leather', 'Solid Brass Pins'],
  },
  {
    id: 'ww-teak-credenza-08',
    name: 'Artisan Teak Credenza',
    category: 'handcrafted',
    price: 1850.00,
    originalPrice: 2100.00,
    rating: 5.0,
    reviewCount: 31,
    image: teakCredenzaImg,
    secondaryImage: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80',
    images: [
      teakCredenzaImg,
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    ],
    isSale: true,
    tag: 'Sale',
    description: 'Architectural credenza in sustainably harvested teak wood with sliding fluted tambour doors, hand-carved concealed drawer pulls, and solid brass joinery.',
    features: [
      'Sustainably harvested Grade-A plantation teak',
      'Sliding fluted tambour doors with silent hidden wood glides',
      'Dovetail joinery throughout all interior drawers',
      'Finished with natural plant-based organic hardwax oils'
    ],
    dimensions: '64"W x 20"D x 30"H',
    materials: ['Solid Grade-A Teak', 'Acoustic Fluted Tambour', 'Solid Brass Hardware'],
  },
  {
    id: 'ww-kyoto-desk-09',
    name: 'Kyoto Solid Oak Desk',
    category: 'handcrafted',
    price: 1420.00,
    rating: 5.0,
    reviewCount: 36,
    image: woodDeskChairImg,
    secondaryImage: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80',
    images: [
      woodDeskChairImg,
      'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80',
    ],
    isSale: false,
    tag: 'Artisan',
    description: 'Handcrafted Japanese white oak study desk featuring traditional exposed mortise-and-tenon joints, integrated pencil tray, and concealed cable routing channel.',
    features: [
      'Solid quarter-sawn Japanese white oak',
      'Exposed wedged through-tenon artisan joints',
      'Integrated carved wooden pen trough and laptop wire slot',
      'Hand-planed satin surface sealed with natural botanical oil'
    ],
    dimensions: '54"W x 28"D x 29.5"H',
    materials: ['Quarter-Sawn Japanese White Oak', 'Hand-Rubbed Tung Oil'],
  },
  {
    id: 'ww-reclaimed-bookshelf-10',
    name: 'Artisan Solid Oak Bookshelf',
    category: 'handcrafted',
    price: 1150.00,
    rating: 4.9,
    reviewCount: 29,
    image: bookshelfRoomImg,
    secondaryImage: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80',
    images: [
      bookshelfRoomImg,
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    ],
    isSale: false,
    tag: 'Handcrafted',
    description: 'Free-standing open architectural shelving unit built from solid European white oak. Designed with asymmetric compartments accommodating books, awards, and indoor plants.',
    features: [
      'Solid European white oak uprights and shelves',
      'Architectural asymmetric staggered shelving layout',
      'Heavy-duty load capacity of 100 lbs per shelf',
      'Hand-beveled edges and organic beeswax protective polish'
    ],
    dimensions: '42"W x 15"D x 72"H',
    materials: ['Solid European White Oak', 'Organic Beeswax Finish'],
  }
];

export const HANDCRAFTED_FEATURE_ITEM: Product = {
  id: 'ww-redwood-lounge-07',
  name: 'Redwood Lounge Chair',
  category: 'handcrafted',
  price: 1299.00,
  rating: 5.0,
  reviewCount: 24,
  image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80',
  secondaryImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
  description: 'Hand-sculpted redwood lounge chair featuring ergonomic lumbar curve, hand-rubbed Danish oil finish, and top-grain amber leather cushions.',
  features: [
    'Artisan mortise and tenon joinery with brass dowel accents',
    'Sustainably harvested old-growth reclaimed redwood',
    'Custom hand-stitched aniline leather upholstery',
    'Ergonomic 105-degree reclined posture angle for executive relaxation'
  ],
  dimensions: '30"W x 33"D x 34"H',
  materials: ['Reclaimed California Redwood', 'Aniline Full Grain Leather', 'Solid Brass Pins'],
  colors: [
    { name: 'Cognac Amber', hex: '#b86b2d' },
    { name: 'Dark Roast', hex: '#2b1d16' },
    { name: 'Natural Sand', hex: '#d6be9a' }
  ]
};

export const ERGONOMIC_HOTSPOTS: ErgonomicFeature[] = [
  {
    id: 'headrest',
    title: 'Adjustable Headrest',
    description: '3D biomechanical pivot with 2.5" height and 45° angle adjustment for cervical spine decompression.',
    top: '12%',
    left: '52%',
  },
  {
    id: 'mesh',
    title: 'Breathable Mesh',
    description: 'AeroWave™ 4D mesh allows continuous passive thermoregulation, eliminating heat buildup during long focus blocks.',
    top: '28%',
    left: '60%',
  },
  {
    id: 'lumbar',
    title: 'Lumbar Support',
    description: 'Dynamic reactive lumbar cushion tracks your natural lordotic curve with 5-position tension settings.',
    top: '46%',
    left: '63%',
  },
  {
    id: 'armrests',
    title: 'Adjustable Armrests',
    description: '4D multi-directional arm supports relieve shoulder trapezius tension across typing, drafting, and meeting modes.',
    top: '52%',
    left: '72%',
  },
  {
    id: 'swivel',
    title: '360° Swivel',
    description: 'Fluid silent bearing core allows effortless 360-degree rotation with zero axial play or wobble.',
    top: '68%',
    left: '64%',
  },
  {
    id: 'wheels',
    title: 'Smooth Rolling Wheels',
    description: '65mm twin-polyurethane rollerblade casters glide noiselessly over hardwood, tile, and high-pile carpet.',
    top: '84%',
    left: '68%',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    quote: 'MarkWell transformed our office space. The ergonomic chairs and desks have made a huge difference in our team\'s productivity and comfort.',
    author: 'James Carter',
    role: 'Operations Lead',
    company: 'TechGlobal',
    avatar: jamesCarterAvatar,
  },
  {
    id: 'test-2',
    quote: 'The craftsmanship on our boardroom table is second to none. Clients frequently comment on the live-edge European oak. MarkWell delivered customized solutions on time and on budget.',
    author: 'Elena Rostova',
    role: 'Managing Director',
    company: 'Vanguard Architecture',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 'test-3',
    quote: 'From bulk B2B procurement to white-glove assembly across three regional branches, the dedicated account management team made outfitting 240 workstations completely frictionless.',
    author: 'Marcus Vance',
    role: 'VP Operations',
    company: 'Apex Capital Partners',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 'test-4',
    quote: 'Investing in MarkWell standing desks and ergonomic seating drastically cut our team\'s reported fatigue. The design elevates our open-plan studio aesthetics beautifully.',
    author: 'Sophia Lin',
    role: 'Studio Director',
    company: 'Kroma Design Lab',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'The Benefits of Ergonomic Furniture',
    snippet: 'See how investing in ergonomic furniture transforms daily employee benchmarks, spinal health, and focus.',
    content: `In the modern workplace, the boundaries between intense focus and physical strain are tested daily. Ergonomic engineering is not merely an aesthetic choice—it is a critical investment in sustained cognitive performance. 

When you spend 8 to 12 hours seated, standard chairs cause the pelvic tilt to flatten the natural lumbar lordosis, increasing intradiscal pressure by over 40%. The MarkWell dynamic lumbar matrix continuously counterbalances postural shifts, ensuring micro-movements that preserve spinal hydration and circulation.

Combining this with scheduled 15-minute standing intervals using motorized lift desks reduces afternoon fatigue dips by up to 32%, creating a more energized, resilient team culture.`,
    author: 'Dr. Katherine Hayes',
    date: 'Sep 08, 2026',
    readTime: '5 min read',
    image: blogDeskImg,
    category: 'Ergonomics & Health',
  },
  {
    id: 'blog-collab',
    title: 'Designing Collaborative Workspaces',
    snippet: 'How agile meeting configurations and warm natural wood tables spark organic brainstorming and team synergy.',
    content: `Effective collaboration demands spatial versatility. When teams gather around cold, static tables, communication tends to be formal and guarded. By contrast, organic solid wood conference surfaces and modular layouts lower psychological barriers to open ideation.

Natural light, integrated hidden wire management, and acoustics-dampening wood textures encourage longer, more immersive problem-solving sessions where every voice can contribute comfortably.`,
    author: 'Elena Rostova',
    date: 'Sep 02, 2026',
    readTime: '6 min read',
    image: blogCollabImg,
    category: 'Workplace Design',
  },
  {
    id: 'blog-2',
    title: 'How Handcrafted Furniture Adds Value to Your Workspace',
    snippet: 'Exploring traditional mortise-and-tenon craftsmanship, biophilic grain textures, and enduring solid hardwoods.',
    content: `Fast furniture has flooded contemporary offices with hollow chipboard and synthetic veneers that degrade within months. In contrast, heirloom handcrafted furniture communicates permanence, stability, and thoughtful values.

Our master woodworkers select single-plank European oak and American walnut, allowing natural growth rings and grain swirls to inform every cut. Biophilic design studies consistently demonstrate that natural organic textures reduce cortisol levels and encourage mindful focus. When you invest in heirloom craftsmanship, you are not outfitting an office for the next fiscal quarter—you are crafting an inspiring environment built to outlive trends.`,
    author: 'Julian Thorne',
    date: 'Aug 28, 2026',
    readTime: '7 min read',
    image: blogCraftImg,
    category: 'Artisan Craftsmanship',
  },
  {
    id: 'blog-3',
    title: 'Choosing the Right Furniture for Remote Teams',
    snippet: 'Strategic guidance on task seating, lumbar support standards, and turnkey enterprise home office stipends.',
    content: `Empowering distributed workforces requires more than giving employees a laptop stipend. Without dedicated ergonomic setups, remote team members inevitably default to kitchen stools and soft couches, leading to repetitive strain injuries.

At MarkWell, our B2B team portal allows enterprises to deploy curated home-office bundles with custom dimensions suitable for compact city apartments or dedicated studies. Employees choose finish colors and dimensions while the employer enjoys consolidated corporate invoicing and commercial-grade 10-year warranties.`,
    author: 'Marcus Chen',
    date: 'Aug 14, 2026',
    readTime: '4 min read',
    image: blogChairImg,
    category: 'Remote Strategy',
  },
];
