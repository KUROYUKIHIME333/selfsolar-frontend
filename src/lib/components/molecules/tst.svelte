<script lang="ts">
	import { onMount } from 'svelte';
	import maplibregl, { Map, Marker, MapMouseEvent } from 'maplibre-gl';

	export let initialLat: number = 0;
	export let initialLng: number = 0;
	export let zoom: number = 13;

	let map: Map;
	let marker: Marker;
	let mapContainer: HTMLDivElement;

	let lat: string = initialLat.toFixed(6);
	let lng: string = initialLng.toFixed(6);
	let query: string = '';
	let loading: boolean = false;

	// 📍 Géolocalisation
	function locateUser(): void {
		if (!navigator.geolocation) return;

		navigator.geolocation.getCurrentPosition((pos: GeolocationPosition) => {
			const latitude = pos.coords.latitude;
			const longitude = pos.coords.longitude;

			lat = latitude.toFixed(6);
			lng = longitude.toFixed(6);

			map.setCenter([longitude, latitude]);
			map.setZoom(14);

			marker.setLngLat([longitude, latitude]);
		});
	}

	// 🔎 Type réponse Nominatim
	type NominatimResult = {
		lat: string;
		lon: string;
		display_name: string;
	};

	// 🔎 Recherche lieu
	async function searchPlace(): Promise<void> {
		if (!query) return;

		loading = true;

		try {
			const res = await fetch(
				`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
			);

			const data: NominatimResult[] = await res.json();

			if (data.length > 0) {
				const place = data[0];

				const latitude = parseFloat(place.lat);
				const longitude = parseFloat(place.lon);

				lat = latitude.toFixed(6);
				lng = longitude.toFixed(6);

				map.setCenter([longitude, latitude]);
				map.setZoom(14);

				marker.setLngLat([longitude, latitude]);
			}
		} catch (err) {
			console.error(err);
		} finally {
			loading = false;
		}
	}

	onMount(() => {
		map = new maplibregl.Map({
			container: mapContainer,
			style: 'https://demotiles.maplibre.org/style.json',
			center: [initialLng, initialLat],
			zoom
		});

		marker = new maplibregl.Marker().setLngLat([initialLng, initialLat]).addTo(map);

		// 🖱️ clic carte
		map.on('click', (e: MapMouseEvent) => {
			const longitude = e.lngLat.lng;
			const latitude = e.lngLat.lat;

			lat = latitude.toFixed(6);
			lng = longitude.toFixed(6);

			marker.setLngLat([longitude, latitude]);
		});

		// 📍 auto géolocalisation
		locateUser();
	});
</script>

<div bind:this={mapContainer} class="map"></div>

<div class="controls">
	<input
		type="text"
		placeholder="Rechercher une ville ou un lieu..."
		bind:value={query}
		on:keydown={(e: KeyboardEvent) => e.key === 'Enter' && searchPlace()}
	/>

	<button on:click={searchPlace}>
		{loading ? 'Recherche...' : 'Rechercher'}
	</button>

	<button on:click={locateUser}> 📍 Ma position </button>
</div>

<div class="controls">
	<input type="text" bind:value={lat} readonly placeholder="Latitude" />
	<input type="text" bind:value={lng} readonly placeholder="Longitude" />
</div>

