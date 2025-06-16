<template>
  <div class="my-10">
    <h2 class="text-2xl font-bold text-gray-900 mb-6">Where you'll be</h2>
    <div
      id="map"
      class="w-full h-96 rounded-xl overflow-hidden transform shadow-lg"
    ></div>
    <p class="text-sm text-gray-600 mt-4">
      Click on the marker to zoom in and explore the area. The exact location will be provided after booking confirmation.
    </p>
  </div>
</template>

<script lang="ts" setup>
  import "mapbox-gl/dist/mapbox-gl.css";
  import mapboxgl, { type LngLatLike, type Map } from "mapbox-gl";

  const props = defineProps({
    latlng: {
      type: Object,
      required: true,
    },
    home: {
      type: Object,
      default: null,
    },
  });

  const runtimeConfig = useRuntimeConfig();

  mapboxgl.accessToken = runtimeConfig.public.mapbox.accessToken as string;

  let map: Map;
  function addMarker() {
    const markerBounds = new mapboxgl.LngLatBounds();

    const coords: LngLatLike = [props.latlng.lng, props.latlng.lat];
    
    // Create a more visible marker element
    const el = document.createElement("div");
    el.classList.add("marker");
    
    // Add marker icon
    const markerIcon = document.createElement("div");
    markerIcon.className = "w-8 h-8 bg-red-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center transform -translate-y-1/2 hover:scale-110 transition-transform cursor-pointer";
    markerIcon.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
    `;
    el.appendChild(markerIcon);

    const marker = new mapboxgl.Marker(el).setLngLat(coords).addTo(map);
    
    // Create popup with location information
    const popup = new mapboxgl.Popup({
      closeButton: true,
      closeOnClick: false,
      offset: 25,
    });
    
    // Set popup content
    const popupContent = props.home 
      ? `
        <div class="p-2 min-w-[200px]">
          <h3 class="font-bold text-gray-900 mb-1">${props.home.title || 'Property Location'}</h3>
          <p class="text-sm text-gray-600 mb-2">
            ${props.home.location?.address || ''}<br>
            ${props.home.location?.city || ''}, ${props.home.location?.state || ''}
          </p>
          <div class="text-xs text-gray-500">
            📍 Lat: ${props.latlng.lat.toFixed(4)}, Lng: ${props.latlng.lng.toFixed(4)}
          </div>
        </div>
      `
      : `
        <div class="p-2">
          <h3 class="font-bold text-gray-900 mb-1">Property Location</h3>
          <div class="text-xs text-gray-500">
            📍 Lat: ${props.latlng.lat.toFixed(4)}, Lng: ${props.latlng.lng.toFixed(4)}
          </div>
        </div>
      `;
    
    popup.setHTML(popupContent);
    marker.setPopup(popup);
    
    el.addEventListener("click", () => {
      map.flyTo({
        center: coords,
        zoom: 18,
        offset: [0, -100],
      });
    });
    
    markerBounds.extend(coords);
    map.fitBounds(markerBounds, { padding: 80, maxZoom: 15, linear: true });
  }

  onMounted(() => {
    map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v12",
      zoom: 15,
      scrollZoom: true,
    });
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
      }),
      "bottom-left"
    );
    map.addControl(
      new mapboxgl.NavigationControl({ showCompass: false }),
      "bottom-left"
    );
    map.addControl(new mapboxgl.FullscreenControl(), "top-right");

    addMarker();
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
    @apply w-5 h-7 cursor-pointer bg-marker;
  }

  .marker:hover:before {
    @apply bg-opacity-40;
  }

  .marker:before,
  .marker:after {
    content: "";
    @apply absolute rounded-full left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2;
  }

  .marker:before {
    @apply w-12 h-12 bg-primary bg-opacity-20 transition-colors;
  }
</style>
