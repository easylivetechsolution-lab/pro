import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronRight, RotateCcw } from 'lucide-react';
import L from 'leaflet';
import { FARM_ESTATES } from '../data';
import { FarmEstate } from '../types';

interface FarmsAndEstatesProps {
  onExploreAll: () => void;
  onSelectEstate: (estate: FarmEstate) => void;
}

interface GeoHub {
  id: string;
  name: string;
  region: string;
  coords: [number, number]; // [lat, lng]
  estateId?: string;
  subtext: string;
}

const GLOBAL_HUBS: GeoHub[] = [
  {
    id: 'green-valley',
    name: 'Green Valley Estate',
    region: 'Sacramento Delta, California',
    coords: [38.3004, -121.5878],
    estateId: 'green-valley',
    subtext: '1,850 acres - Grains, Vegetables',
  },
  {
    id: 'coastal-fields',
    name: 'Coastal Fields',
    region: 'Salinas Coastal Fog Belt, California',
    coords: [36.6777, -121.6555],
    estateId: 'coastal-fields',
    subtext: '1,980 acres - Vegetables, Herbs',
  },
  {
    id: 'sunrise-farm',
    name: 'Sunrise Farm',
    region: 'Okanagan Sunbelt Region, BC',
    coords: [49.888, -119.496],
    estateId: 'sunrise-farm',
    subtext: '2,400 acres - Fruits, Specialty',
  },
  {
    id: 'riverbend-ranch',
    name: 'Riverbend Ranch',
    region: 'Pampas Grassland Basin, Argentina',
    coords: [-34.6037, -58.3816],
    estateId: 'riverbend-ranch',
    subtext: '3,250 acres - Livestock, Forage',
  },
  {
    id: 'mediterranean-hub',
    name: 'Mediterranean Basin Hub',
    region: 'Southern Europe Gateway, Spain',
    coords: [37.3891, -5.9845],
    subtext: 'Global Distribution & Cold-Chain',
  },
  {
    id: 'asia-pacific-hub',
    name: 'Asia-Pacific Gateway',
    region: 'Yokohama Maritime Hub, Japan',
    coords: [35.4437, 139.638],
    subtext: 'Pacific Rim Trade Link',
  },
  {
    id: 'oceania-hub',
    name: 'Oceania Research Station',
    region: 'New South Wales, Australia',
    coords: [-33.8688, 151.2093],
    subtext: 'Regenerative Pasture & Soil Trials',
  },
];

const DEFAULT_WORLD_CENTER: [number, number] = [20, 0];
const DEFAULT_WORLD_ZOOM = 1.8;

export const FarmsAndEstates: React.FC<FarmsAndEstatesProps> = ({
  onExploreAll,
  onSelectEstate,
}) => {
  const [selectedEstate, setSelectedEstate] = useState<FarmEstate | null>(null);

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());
  const selectedEstateRef = useRef<FarmEstate | null>(null);

  // Sync ref with state for event handlers
  useEffect(() => {
    selectedEstateRef.current = selectedEstate;
  }, [selectedEstate]);

  // Crisp golden teardrop pin icon
  const createGoldPinIcon = (isHighlight: boolean) => {
    const pinSize = isHighlight ? 26 : 20;
    const pinHeight = isHighlight ? 34 : 26;

    return L.divIcon({
      className: 'custom-gold-pin-icon',
      html: `
        <div style="position: relative; width: ${pinSize}px; height: ${pinHeight}px; transform: translate(-50%, -100%); cursor: pointer;">
          <svg width="${pinSize}" height="${pinHeight}" viewBox="0 0 24 32" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.6));">
            <defs>
              <linearGradient id="pinGradRef" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#fffbeb" />
                <stop offset="35%" stop-color="#fde047" />
                <stop offset="70%" stop-color="#eab308" />
                <stop offset="100%" stop-color="#ca8a04" />
              </linearGradient>
            </defs>
            <path
              d="M12 0C5.373 0 0 5.373 0 12C0 20 12 32 12 32C12 32 24 20 24 12C24 5.373 18.627 0 12 0Z"
              fill="url(#pinGradRef)"
              stroke="#ffffff"
              stroke-width="1.1"
            />
            <circle cx="12" cy="11" r="5" fill="#ffffff" />
            <circle cx="12" cy="11" r="3" fill="#ca8a04" />
          </svg>
        </div>
      `,
      iconSize: [pinSize, pinHeight],
      iconAnchor: [pinSize / 2, pinHeight],
      popupAnchor: [0, -pinHeight],
    });
  };

  // Initialize Real Leaflet Map with World View as Default
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const container = mapContainerRef.current;
    if (container.clientWidth === 0 || container.clientHeight === 0) {
      container.style.width = '100%';
      container.style.height = '100%';
    }

    const map = L.map(container, {
      center: DEFAULT_WORLD_CENTER,
      zoom: DEFAULT_WORLD_ZOOM,
      minZoom: 1.3,
      maxZoom: 18,
      worldCopyJump: true,
      zoomControl: true,
      attributionControl: false,
    });

    // Real high-definition satellite imagery
    const satelliteUrl =
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
    L.tileLayer(satelliteUrl, { maxZoom: 18 }).addTo(map);

    mapInstanceRef.current = map;

    // Trigger invalidateSize to fit container cleanly
    const timers = [50, 150, 300, 600].map((delay) =>
      setTimeout(() => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.invalidateSize();
        }
      }, delay)
    );

    // Add Real Location Teardrop Pins with onHover Information Popup
    GLOBAL_HUBS.forEach((hub) => {
      const marker = L.marker(hub.coords, {
        icon: createGoldPinIcon(false),
      }).addTo(map);

      // Rich Information Popup
      const popupContent = `
        <div style="font-family: inherit; padding: 4px 6px; min-width: 175px;">
          <div style="display: inline-block; padding: 1px 6px; border-radius: 9999px; background: rgba(223, 197, 153, 0.15); border: 1px solid rgba(223, 197, 153, 0.35); font-size: 9px; font-weight: 700; color: #dfc599; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">
            ${hub.estateId ? 'Farm Estate' : 'Global Hub'}
          </div>
          <div style="font-weight: 700; font-size: 13px; color: #ffffff; line-height: 1.2; margin-bottom: 2px;">
            ${hub.name}
          </div>
          <div style="font-size: 11px; color: #dfc599; margin-bottom: 4px; font-weight: 500;">
            ${hub.region}
          </div>
          <div style="font-size: 11px; color: #b2c4ba; line-height: 1.35; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 4px;">
            ${hub.subtext}
          </div>
        </div>
      `;

      marker.bindPopup(popupContent, {
        closeButton: false,
        className: 'custom-gold-popup',
        autoPan: false,
        offset: [0, -8],
      });

      // Show information on HOVER
      marker.on('mouseover', () => {
        marker.openPopup();
      });

      // Close information on MOUSEOUT (unless currently selected)
      marker.on('mouseout', () => {
        if (selectedEstateRef.current?.id !== hub.estateId) {
          marker.closePopup();
        }
      });

      // On Click: Select Estate & Fly to location
      marker.on('click', () => {
        if (hub.estateId) {
          const match = FARM_ESTATES.find((e) => e.id === hub.estateId);
          if (match) {
            setSelectedEstate(match);
            onSelectEstate(match);
            map.flyTo(hub.coords, 4.5, { duration: 1.2 });
          }
        }
        marker.openPopup();
      });

      markersRef.current.set(hub.id, marker);
    });

    return () => {
      timers.forEach(clearTimeout);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Pin Icons & Keep Open when selectedEstate changes
  useEffect(() => {
    markersRef.current.forEach((marker, id) => {
      const isMatch = selectedEstate && id === selectedEstate.id;
      marker.setIcon(createGoldPinIcon(!!isMatch));
      if (isMatch) {
        marker.openPopup();
      }
    });
  }, [selectedEstate]);

  // When card in right list is clicked: fly to estate and open info popup
  const handleCardClick = (estate: FarmEstate) => {
    setSelectedEstate(estate);
    onSelectEstate(estate);

    const hub = GLOBAL_HUBS.find((h) => h.id === estate.id);
    if (hub && mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(hub.coords, 4.5, {
        duration: 1.2,
      });
      const marker = markersRef.current.get(hub.id);
      if (marker) {
        marker.openPopup();
      }
    }
  };

  // Reset to World View
  const handleResetWorldView = () => {
    setSelectedEstate(null);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(DEFAULT_WORLD_CENTER, DEFAULT_WORLD_ZOOM, {
        duration: 1.2,
      });
    }
    // Close any open popups
    markersRef.current.forEach((marker) => {
      marker.closePopup();
      marker.setIcon(createGoldPinIcon(false));
    });
  };

  return (
    <section
      id="farms"
      className="relative py-8 sm:py-10 lg:py-12 bg-[#031109] text-white overflow-hidden select-none"
    >
      {/* Dark Botanical Vignette & Ambient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#020b06] via-[#04160d] to-[#020b06] pointer-events-none" />

      {/* Atmospheric Foliage Accents on Left & Right Margins */}
      <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-32 pointer-events-none opacity-15 z-10">
        <svg viewBox="0 0 200 600" fill="#0d3b24" className="w-full h-full object-cover">
          <path d="M0,0 Q60,150 10,300 Q90,450 0,600 L0,600 Z" />
          <path d="M10,80 Q90,130 30,220 Q110,290 20,380 Q100,470 10,540" stroke="#165b38" strokeWidth="4" fill="none" />
        </svg>
      </div>
      <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-32 pointer-events-none opacity-15 z-10">
        <svg viewBox="0 0 200 600" fill="#0d3b24" className="w-full h-full object-cover transform scale-x-[-1]">
          <path d="M0,0 Q60,150 10,300 Q90,450 0,600 L0,600 Z" />
          <path d="M10,80 Q90,130 30,220 Q110,290 20,380 Q100,470 10,540" stroke="#165b38" strokeWidth="4" fill="none" />
        </svg>
      </div>

      <div className="max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-20">
        {/* Streamlined Section Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-4 sm:mb-5 gap-3">
          <div className="space-y-1 sm:space-y-1.5 max-w-xl">
            {/* Eyebrow */}
            <div
              id="farms-eyebrow"
              className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-[#dfc599] uppercase"
            >
              OUR FARMS
            </div>

            {/* Serif Display Title */}
            <h2
              id="farms-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight font-serif"
            >
              Our Farms & Estates
            </h2>

            {/* Description */}
            <p
              id="farms-description"
              className="text-xs sm:text-[13px] text-[#b2c4ba] leading-relaxed font-normal"
            >
              Multiple locations. Optimal growing conditions. A global footprint.
            </p>
          </div>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-2.5">
            <button
              id="explore-all-locations-btn"
              onClick={onExploreAll}
              className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full border border-[#dfc599]/60 bg-[#071d13]/90 hover:bg-[#dfc599] text-[#dfc599] hover:text-[#04140d] font-medium text-xs tracking-wide transition-all duration-300 cursor-pointer shadow-md group"
            >
              <span>Explore All Locations</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#dfc599] group-hover:text-[#04140d] group-hover:translate-x-0.5 transition-all" />
            </button>

            {/* Reset World View Button */}
            <button
              onClick={handleResetWorldView}
              title="Reset to World View"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full border border-white/10 bg-[#06180f]/90 hover:bg-[#0e2f21] text-gray-300 hover:text-white text-xs font-mono transition-colors shadow-sm"
            >
              <RotateCcw className="w-3 h-3 text-[#dfc599]" />
              <span>World View</span>
            </button>
          </div>
        </div>

        {/* Compact Containers Side-by-Side with World View Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-stretch h-[320px] sm:h-[350px] lg:h-[370px]">
          
          {/* Left Container: Real Leaflet Map */}
          <div className="lg:col-span-7 xl:col-span-8 relative h-full rounded-xl sm:rounded-2xl overflow-hidden shadow-xl border border-[#c5a86a]/40 bg-[#061e14]">
            {/* Leaflet Map Target DOM */}
            <div
              ref={mapContainerRef}
              className="w-full h-full"
            />

            {/* Gold Border Frame */}
            <div className="absolute inset-0 pointer-events-none rounded-xl sm:rounded-2xl border border-[#dfc599]/30" />
          </div>

          {/* Right Container: Framed 4-Estate List Panel */}
          <div className="lg:col-span-5 xl:col-span-4 relative h-full">
            <div
              id="estates-framed-panel"
              className="relative h-full rounded-xl sm:rounded-2xl border border-[#c5a86a]/40 bg-[#06180f]/90 backdrop-blur-md p-2 sm:p-2.5 shadow-xl flex flex-col justify-between overflow-hidden"
            >
              {/* Corner Notched Decorative Accents */}
              <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t-2 border-l-2 border-[#dfc599] pointer-events-none" />
              <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t-2 border-r-2 border-[#dfc599] pointer-events-none" />
              <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b-2 border-l-2 border-[#dfc599] pointer-events-none" />
              <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b-2 border-r-2 border-[#dfc599] pointer-events-none" />

              {/* 4 Stacked Estate Items */}
              <div className="divide-y divide-[#c5a86a]/15 flex flex-col justify-around h-full">
                {FARM_ESTATES.map((estate) => {
                  const isSelected = selectedEstate?.id === estate.id;
                  return (
                    <div
                      key={estate.id}
                      id={`estate-item-${estate.id}`}
                      onClick={() => handleCardClick(estate)}
                      className={`group p-1.5 sm:p-2 rounded-lg transition-all duration-200 cursor-pointer flex items-center justify-between gap-2.5 sm:gap-3 ${
                        isSelected
                          ? 'bg-[#0e2f21]/90 shadow-md border border-[#dfc599]/30'
                          : 'hover:bg-[#0a2317]/60'
                      }`}
                    >
                      {/* Reduced Estate Thumbnail Image */}
                      <div className="relative w-14 h-10 sm:w-16 sm:h-11 md:w-18 md:h-12 rounded-md sm:rounded-lg overflow-hidden flex-shrink-0 bg-[#04140d] border border-white/10 shadow-sm">
                        <img
                          src={estate.imageUrl}
                          alt={estate.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/15" />
                      </div>

                      {/* Estate Name & Crop/Acres Subtitle */}
                      <div className="flex-1 min-w-0 pr-1">
                        <h3 className={`text-xs sm:text-sm font-bold tracking-tight transition-colors truncate ${
                          isSelected
                            ? 'text-[#dfc599]'
                            : 'text-white group-hover:text-[#dfc599]'
                        }`}>
                          {estate.name}
                        </h3>
                        
                        <p className="text-[10px] sm:text-[11px] text-[#a0b5a8] leading-tight mt-0.5 truncate">
                          <span>{estate.acres.toLocaleString()} acres</span>
                          <span className="mx-1 text-[#dfc599]/60">-</span>
                          <span>{estate.crops.join(', ')}</span>
                        </p>
                      </div>

                      {/* Right Chevron Arrow */}
                      <div className="flex-shrink-0 text-[#dfc599] group-hover:translate-x-0.5 transition-transform">
                        <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2]" />
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
