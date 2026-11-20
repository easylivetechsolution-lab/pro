export interface StorySpaceStage {
  index: string;
  id: string;
  anchorId: string;
  title: string;
  roomLabel: string;
  cleaningFocus: string;
  imageUrl: string;
  /** 3D portal center coordinate in the R3F storytelling corridor */
  portalPos: [number, number, number];
  /** Portal Y rotation in radians so each room angles organically along the path */
  portalRotY: number;
  /** Camera position when arriving at this chapter */
  camPos: [number, number, number];
  /** Camera lookAt target for this chapter */
  lookAt: [number, number, number];
  /** Accent light hex tint for this zone */
  accentHex: string;
}

export const STORY_SPACES: StorySpaceStage[] = [
  {
    index: '01',
    id: 'lobby',
    anchorId: 'top',
    title: 'Marble Executive Lobby',
    roomLabel: 'Stage 01 · Arrival & Reception',
    cleaningFocus: 'Veined stone polishing, acoustic wood conditioning & entry glass clarity',
    imageUrl:
      '/aether-clean/assets/aistudio/qg9ncCJGsczlnvO3EIBB-AsGn_K-p5Gelx_xIRxInE1PYK8UL6mzCHzxXDIq4rnceJSeGwQFe1jhJvSVP2yOPao7wI2AdK9QTONpyVoSUyTLgTDEFTTYki-Lq51OnITaoXu2Iw8rbPDj3yhwxSM1ZoinQ0Gxehg7LVFTRPE8YGSd-HKAX6qIWGhl3j1QPnM6_47591c7e.jpg',
    portalPos: [2.8, 0.4, -4],
    portalRotY: -0.18,
    camPos: [0.3, 0.5, 8.2],
    lookAt: [1.4, 0.35, -4],
    accentHex: '#fff3e0',
  },
  {
    index: '02',
    id: 'atrium',
    anchorId: 'services',
    title: 'Panoramic Glass Atrium',
    roomLabel: 'Stage 02 · Tailored Disciplines',
    cleaningFocus: 'Curved floor-to-ceiling glass, upholstery extraction & iridescent mist bubbles',
    imageUrl:
      '/aether-clean/assets/aistudio/QkGuuPcs-yJFp5ktajDWDe7bQ_1FRrWkcNQAT5n8jCMUQPNH_dPS1bxTOba-pT5uvMMZlqrh8C0-iIRvGCqpHOUkBqLuUWlhLCdkT0qkIPIL_yOXab5icERyw54qcHO5QCBpIForbSVMySEUfCFLJoGHTeOcROOVZ_9dFewFvRZhUkf6cwg5NVCekH9jPqNo_712f2002.jpg',
    portalPos: [-3.4, 0.5, -24],
    portalRotY: 0.22,
    camPos: [-1.2, 0.6, -12.5],
    lookAt: [-2.4, 0.45, -24],
    accentHex: '#e0f2fe',
  },
  {
    index: '03',
    id: 'corridor',
    anchorId: 'process',
    title: 'Symmetrical Glass Corridor',
    roomLabel: 'Stage 03 · 3-Step Precision Workflow',
    cleaningFocus: 'Continuous travertine path care, steel mullion wipe-downs & HEPA air sweep',
    imageUrl:
      '/aether-clean/assets/aistudio/JWuawjNW1mfW8rY40KHvHxgcnchZF4dj3wjbg6EeXj1Drk_ASHakvfH_ScbyzNzT1Cw4mVWfwqka0TSZoOj4pp-dcOowQFKI2vR_Fi5EIQfX5DBpKtC48r0NN6SojFhJX7rjBcplVRRS7zYmV1hjC3DK7z7Xu7m2VJketT6Ompv9_4XW6O2IMt2wbPHQkcL9_ca68dd82.jpg',
    portalPos: [2.6, 0.35, -44],
    portalRotY: -0.15,
    camPos: [0.9, 0.5, -32.5],
    lookAt: [1.8, 0.35, -44],
    accentHex: '#f0f9ff',
  },
  {
    index: '04',
    id: 'studio',
    anchorId: 'proof',
    title: 'Sunlit Open Studio',
    roomLabel: 'Stage 04 · Visual Before & After Proof',
    cleaningFocus: 'Timber mezzanine dusting, sunlight glass restoration & zero-streak finishes',
    imageUrl:
      '/aether-clean/assets/aistudio/XUrFWOSz8Kw3Q6E_SK0Nv3iq5plGMhPwEzIh10hAOB5daiOdh2TZ0mcQhWnWVvdzRa_S8FHarYUfFR3qgP5AQSJhILucnsacD1byp_KS2a845_UfgfXTofZRaGts-ucfFl5IKPz8LFLp9qI5DYIgUen8irp7UEj39T5XGjuq83pPTPpoT8qZYMp6S6azgTit_d98baa82.jpg',
    portalPos: [-3.1, 0.5, -64],
    portalRotY: 0.2,
    camPos: [-1.1, 0.65, -52.5],
    lookAt: [-2.2, 0.45, -64],
    accentHex: '#fef9c3',
  },
  {
    index: '05',
    id: 'workstations',
    anchorId: 'pricing',
    title: 'Precision Workstation Bays',
    roomLabel: 'Stage 05 · Transparent Tiered Packages',
    cleaningFocus: 'Static-free monitor zones, frosted partition sanitization & woven carpet extraction',
    imageUrl: '/aether-clean/assets/aistudio/pexels-artbovich-6794932_b9615851.jpg',
    portalPos: [3.2, 0.4, -84],
    portalRotY: -0.2,
    camPos: [1.1, 0.55, -72.5],
    lookAt: [2.2, 0.4, -84],
    accentHex: '#e0f2fe',
  },
  {
    index: '06',
    id: 'lounge',
    anchorId: 'quote',
    title: 'Acoustic Geometric Lounge',
    roomLabel: 'Stage 06 · AI Quote & Instant Booking',
    cleaningFocus: 'Leather ottoman conditioning, etched conference glass & allergen-free textiles',
    imageUrl: '/aether-clean/assets/aistudio/pexels-mike-van-schoonderwalt-1884800-5511130_a7144c6c.jpg',
    portalPos: [-2.8, 0.4, -104],
    portalRotY: 0.17,
    camPos: [-0.9, 0.55, -92.5],
    lookAt: [-2.0, 0.4, -104],
    accentHex: '#ffedd5',
  },
  {
    index: '07',
    id: 'reset',
    anchorId: 'referrals',
    title: 'Sculpted Reception Reset',
    roomLabel: 'Stage 07 · Verified Reviews & Referrals',
    cleaningFocus: 'Plaster curve detailing, deep-pile chevron floor care & 48-hour spotless sign-off',
    imageUrl: '/aether-clean/assets/aistudio/pexels-mike-van-schoonderwalt-1884800-5511103__1__0849539f.jpg',
    portalPos: [0.0, 0.45, -124],
    portalRotY: 0.0,
    camPos: [0.0, 0.55, -112.5],
    lookAt: [0.0, 0.45, -124],
    accentHex: '#bae6fd',
  },
];
