<template>
  <div class="w-full h-full relative">
    <!-- Loading Overlay -->
    <div v-if="isLoading" class="absolute inset-0 bg-gray-100 flex items-center justify-center z-10">
      <div class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p class="text-gray-600 font-medium">Loading map...</p>
      </div>
    </div>
    
    <!-- Map Container -->
    <div id="map" class="w-full h-full rounded-2xl overflow-hidden shadow-lg"></div>
    
    <!-- Hidden Card Template -->
    <template v-show="false">
      <map-popup-card :home="currentPopupEl" ref="popupEl" />
    </template>
    
    <!-- Map Info Overlay -->
    <div class="absolute top-4 left-4 bg-white rounded-xl shadow-lg p-3 z-10">
      <div class="flex items-center space-x-2">
        <div class="w-3 h-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
        <span class="text-sm font-medium text-gray-700">{{ homes?.length || 0 }} properties found</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import type { PropType } from "vue";
  import "mapbox-gl/dist/mapbox-gl.css";
  import mapboxgl, { Map, Marker, Popup } from "mapbox-gl";
  import type { LngLatLike } from "mapbox-gl";

  import MapPopupCard from "~/components/search/mapPopupCard.vue";

  const props = defineProps({
    homes: {
      type: Array as PropType<any>,
      required: true,
    },
  });

  const runtimeConfig = useRuntimeConfig();

  mapboxgl.accessToken = runtimeConfig.public.mapbox.accessToken as string;

  const popupEl = ref<typeof MapPopupCard>();
  const currentPopupEl = ref();
  const isLoading = ref(true);
  let map: Map;
  const markers: Marker[] = [];
  const popup: Popup = new mapboxgl.Popup({
    closeButton: true,
    closeOnClick: false,
    offset: 15,
    maxWidth: "320px",
  });
  let lastClickedMarker: Element;

  function addMarkers() {
    if (!props.homes || props.homes.length === 0) {
      console.log('No homes data available for markers');
      return;
    }

    const markerBounds = new mapboxgl.LngLatBounds();
    
    props.homes.forEach((home: any, index: number) => {
      if (!home._geoloc || !home._geoloc.lng || !home._geoloc.lat) {
        console.warn(`Home ${home.objectID} missing geolocation data`);
        return;
      }

      const coords: LngLatLike = [home._geoloc.lng, home._geoloc.lat];

      const el = document.createElement("div");
      el.classList.add("marker");
      
      // Add price indicator
      const priceEl = document.createElement("div");
      priceEl.innerHTML = `$${home.pricePerNight}`;
      priceEl.className = "absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded-lg shadow-md text-xs font-semibold text-gray-800 whitespace-nowrap";
      el.appendChild(priceEl);

      const marker = new mapboxgl.Marker(el).setLngLat(coords).addTo(map);
      home.marker = marker;
      markers.push(marker);

      el.addEventListener("click", () => onMarkerClick(marker, home));

      markerBounds.extend(coords);
    });

    if (markers.length > 0) {
      map.fitBounds(markerBounds, { 
        padding: { top: 80, bottom: 80, left: 80, right: 80 }, 
        maxZoom: 15, 
        linear: false,
        duration: 1000
      });
    }
  }

  function updateMarkerState(marker: Marker) {
    if (lastClickedMarker) {
      lastClickedMarker.classList.remove("marker-active");
    }
    const markerEl = marker.getElement();
    markerEl.classList.add("marker-active");

    lastClickedMarker = markerEl;
  }

  function updatePopup(marker: Marker) {
    if (popupEl.value) {
      popup
        .setLngLat(marker.getLngLat())
        .setDOMContent(popupEl.value.$el)
        .addTo(map);
    }
  }

  function flyToMarker(marker: Marker) {
    map.flyTo({
      center: marker.getLngLat(),
      zoom: Math.max(map.getZoom(), 14), // Don't zoom out, only zoom in if needed
      offset: [0, -100],
      duration: 800,
    });
  }

  function onMarkerClick(marker: Marker, home: any) {
    currentPopupEl.value = home;

    updateMarkerState(marker);
    flyToMarker(marker);
    updatePopup(marker);
  }

  onUpdated(() => {
    markers.forEach((marker) => marker.remove());
    map.setZoom(12);
    addMarkers();
  });
  onMounted(() => {
    map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v12",
      zoom: 12,
      scrollZoom: true,
      attributionControl: false,
    });

    // Add a loading indicator
    map.on('load', () => {
      console.log('Map loaded successfully');
      isLoading.value = false;
    });

    // Add error handling
    map.on('error', (e) => {
      console.error('Map error:', e);
      isLoading.value = false;
    });

    // Enhanced controls
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
      }),
      "bottom-left"
    );
    
    map.addControl(
      new mapboxgl.NavigationControl({ 
        showCompass: true,
        showZoom: true,
        visualizePitch: true 
      }),
      "bottom-left"
    );
    
    map.addControl(new mapboxgl.FullscreenControl(), "top-right");

    // Add scale control
    map.addControl(new mapboxgl.ScaleControl({
      maxWidth: 100,
      unit: 'metric'
    }), 'bottom-right');

    addMarkers();
  });
</script>

<style lang="postcss">
  .mapboxgl-canvas {
    @apply focus:outline-none;
  }
  .mapboxgl-ctrl-group:not(:empty) {
    @apply shadow-md rounded-xl p-2;
  }

  .mapboxgl-ctrl-group button {
    @apply w-8 h-8 focus:outline-hidden transition-colors rounded-md;
  }
  .mapboxgl-ctrl-group button:focus:first-child,
  .mapboxgl-ctrl-group button:focus:last-child,
  .mapboxgl-ctrl-group button:focus:only-child {
    @apply rounded-md;
  }

  .mapboxgl-ctrl button.mapboxgl-ctrl-zoom-out .mapboxgl-ctrl-icon {
    @apply bg-minus-icon;
  }

  .mapboxgl-ctrl button.mapboxgl-ctrl-zoom-in .mapboxgl-ctrl-icon {
    @apply bg-plus-icon;
  }

  .mapboxgl-ctrl button.mapboxgl-ctrl-geolocate .mapboxgl-ctrl-icon {
    @apply bg-location-icon;
  }

  .mapboxgl-ctrl button.mapboxgl-ctrl-fullscreen .mapboxgl-ctrl-icon {
    @apply bg-arrows-expand-icon;
  }

  .mapboxgl-ctrl button.mapboxgl-ctrl-shrink .mapboxgl-ctrl-icon {
    @apply bg-arrows-shrink-icon;
  }

  .mapboxgl-ctrl-group button + button {
    @apply border-none;
  }

  .mapboxgl-ctrl-bottom-left .mapboxgl-ctrl {
    @apply ml-6 mb-3;
  }

  .mapboxgl-ctrl-top-right .mapboxgl-ctrl {
    @apply mt-6 mr-6;
  }

  .mapboxgl-ctrl-attrib {
    @apply hidden;
  }

  .marker {
    @apply w-8 h-8 cursor-pointer rounded-full shadow-lg;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: 3px solid white;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .marker:hover {
    @apply scale-110 shadow-xl;
    z-index: 10;
  }

  .marker-active {
    @apply scale-125 shadow-2xl;
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    z-index: 20;
  }

  .marker:before {
    content: "";
    @apply absolute rounded-full left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2;
    @apply w-16 h-16 bg-blue-500 bg-opacity-20 transition-all duration-300;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }
    70% {
      transform: translate(-50%, -50%) scale(1.4);
      opacity: 0;
    }
    100% {
      transform: translate(-50%, -50%) scale(1.4);
      opacity: 0;
    }
  }

  .mapboxgl-popup-content {
    @apply rounded-2xl p-0 shadow-2xl border-0;
    max-width: 320px;
    background: white;
    overflow: hidden;
  }
  
  .mapboxgl-popup-close-button {
    @apply outline-none w-6 h-6 p-0 m-2 top-2 right-2 rounded-full flex items-center justify-center;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    font-size: 14px;
    font-weight: bold;
    transition: all 0.2s;
  }

  .mapboxgl-popup-close-button:hover {
    @apply scale-110;
    background: rgba(0, 0, 0, 0.9);
  }

  .mapboxgl-popup-tip {
    border-top-color: white;
  }
</style>
