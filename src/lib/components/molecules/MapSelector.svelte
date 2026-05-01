<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import Input from '$components/atoms/Input.svelte';
	import Button from '$components/atoms/Button.svelte';
	import type * as LType from 'leaflet';
	import { DEFAULT_COORDINATES } from '$lib/utils/textConstantes';

	import { toCardinalDirections } from '$lib/utils/conversions';

	let {
		lat = $bindable(DEFAULT_COORDINATES.lat),
		long = $bindable(DEFAULT_COORDINATES.long),
		zoom = 14,
		altitude = $bindable(DEFAULT_COORDINATES.altitude) // Fallback à 0
	}: {
		lat: number;
		long: number;
		zoom?: number;
		altitude: number | undefined;
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

		//Fix for Leaflet default icon paths in SvelteKit/Vite environments.
		//@ts-expect-error - Accessing internal/private Leaflet property for path fix.
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
				customClass="search-box-child"
				type="text"
				name="map-search"
				label="Chercher une adresse"
				bind:bindValue={query}
				keydownAction={(e) => e.key === 'Enter' && handleSearch()}
				L="93%"
			/>
			<Button
				customClass="search-box-child justify-self-end"
				variant="transparent-back"
				label="🔍"
				{loading}
				clickAction={handleSearch}
				L="50px"
			/>
		</div>

		<div class="info-grid">
			<p class="info-grid-fields">
				<span>Coordonnées : </span><span
					>{toCardinalDirections(parseFloat(lat.toFixed(6)), 'latitude')}; {toCardinalDirections(
						parseFloat(long.toFixed(6)),
						'longitude'
					)}</span
				>
			</p>

			{#if altitude}
				<p class="info-grid-fields">
					<span>Altitude : </span><span>{` ${altitude} m`}</span>
				</p>
			{/if}
		</div>
	</div>
</div>

<style>
	.map-frame {
		height: 90vh;
		width: 100%;
		border-radius: 1rem;
		border: none;
		z-index: 1;
	}

	.map-selector {
		display: flex;
		flex-direction: column;
		gap: 10vh;
	}

	:global(.leaflet-marker-icon) {
		filter: hue-rotate(150deg) saturate(2) brightness(0.9);
	}

	@media (max-width: 768px) {
		.info-grid-fields {
			display: flex;
			flex-direction: column;
		}
	}
</style>
