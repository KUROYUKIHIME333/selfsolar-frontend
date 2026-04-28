<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import Input from '$components/atoms/Input.svelte';
	import Button from '$components/atoms/Button.svelte';
	import type * as LType from 'leaflet';

	let {
		lat = $bindable(48.85),
		long = $bindable(2.35),
		zoom = 14,
		altitude = $bindable(0) // Fallback à 0
	}: {
		lat: number;
		long: number;
		zoom?: number;
		altitude: number | undefined; // Autorise undefined dans l'objet passé
	} = $props();

	let mapElement: HTMLDivElement | undefined = $state();
	let map: LType.Map | undefined = $state();
	let L: typeof LType | undefined = $state();
	let marker: LType.Marker | undefined = $state();

	let query = $state('');
	let loading = $state(false);

	const fetchAltitude = async (lati: number, lng: number) => {
		try {
			const res = await fetch(
				`https://api.open-elevation.com/api/v1/lookup?locations=${lati},${lng}`
			);
			const data = await res.json();
			if (data.results?.[0]) {
				altitude = Math.round(data.results[0].elevation);
			}
		} catch (e) {
			console.error('Erreur altitude:', e);
		}
	};

	const handleSearch = async () => {
		if (!query || !map || !L) return;
		loading = true;
		try {
			const res = await fetch(
				`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
			);
			const data = await res.json();
			if (data[0]) {
				const newLat = parseFloat(data[0].lat);
				const newLng = parseFloat(data[0].lon);
				updatePos(newLat, newLng);
				map.setView([newLat, newLng], zoom);
			}
		} catch (e) {
			console.error('Erreur recherche:', e);
		} finally {
			loading = false;
		}
	};

	const updatePos = (newLat: number, newLng: number) => {
		lat = newLat;
		long = newLng;
		if (marker) marker.setLatLng([newLat, newLng]);
		fetchAltitude(newLat, newLng);
	};

	onMount(async () => {
		const Leaflet = await import('leaflet');
		import('leaflet/dist/leaflet.css');
		L = Leaflet.default;

		if (!mapElement || !L) return;

		/**
		 * Fix for Leaflet default icon paths in SvelteKit/Vite environments.
		 * @ts-expect-error - Accessing internal/private Leaflet property for path fix.
		 */
		//@ts-expect-error
		delete L.Icon.Default.prototype._getIconUrl;
		L.Icon.Default.mergeOptions({
			iconRetinaUrl:
				'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
			iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
			shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
		});

		map = L.map(mapElement).setView([lat, long], lat === 48.85 ? 5 : zoom);

		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '© OpenStreetMap'
		}).addTo(map);

		marker = L.marker([lat, long]).addTo(map);

		map.on('click', (e: LType.LeafletMouseEvent) => {
			updatePos(e.latlng.lat, e.latlng.lng);
		});

		fetchAltitude(lat, long);
	});

	onDestroy(() => {
		if (map) {
			map.remove();
			map = undefined;
		}
	});
</script>

<div class="map-selector">
	<div bind:this={mapElement} class="map-frame"></div>
	<div class="controls">
		<div class="search-box">
			<Input
				type="text"
				name="map-search"
				label="Chercher une adresse"
				bind:bindValue={query}
				keydownAction={(e) => e.key === 'Enter' && handleSearch()}
				L="100%"
			/>
			<Button variant="primary" label="🔍" {loading} clickAction={handleSearch} L="50px" />
		</div>
		<div class="info-grid">
			<div class="info-card">
				<span class="label">Latitude</span>
				<span class="val">{lat.toFixed(6)}°</span>
			</div>
			<div class="info-card">
				<span class="label">Longitude</span>
				<span class="val">{long.toFixed(6)}°</span>
			</div>
			<div class="info-card highlight">
				<span class="label">Altitude</span>
				<span class="val">{altitude ?? '--'} m</span>
			</div>
		</div>
	</div>
</div>

<style>
	/* ... votre CSS reste identique ... */
	.map-frame {
		height: 350px;
		width: 100%;
		border-radius: 1rem;
		border: 2px solid var(--back-dark);
		z-index: 1;
	}
	:global(.leaflet-marker-icon) {
		filter: hue-rotate(150deg) saturate(2) brightness(0.9);
	}
</style>
