<script lang="ts">
	import { onMount } from 'svelte';
	import Input from '$components/atoms/Input.svelte';
	import Button from '$components/atoms/Button.svelte';
	import maplibregl, { Map, Marker, MapMouseEvent } from 'maplibre-gl';
	import 'maplibre-gl/dist/maplibre-gl.css';

	export let initialLat: number = 0;
	export let initialLong: number = 0;
	export let zoom: number = 14;
	export let lat: number = initialLat;
	export let long: number = initialLong;
	export let altitude: number | undefined = undefined;

	let map: Map;
	let marker: Marker;
	let mapContainer: HTMLDivElement;
	let query: string = '';
	let loading: boolean = false;

	const locateUser = (): void => {
		if (!navigator.geolocation) return;

		loading = true;
		navigator.geolocation.getCurrentPosition(
			(position: GeolocationPosition) => {
				const { latitude, longitude } = position.coords;
				lat = latitude;
				long = longitude;
				map.setCenter([longitude, latitude]);
				marker.setLngLat([longitude, latitude]);
				map.setZoom(zoom);
				loading = false;
			},
			(error) => {
				console.error('Error getting user location:', error);
				loading = false;
			}
		);
	};

	type NominatimResult = {
		lat: string;
		lon: string;
		display_name: string;
	};

	const searchPlace = async (): Promise<void> => {
		if (!query) return;
		loading = true;

		try {
			const response = await fetch(
				`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
			);
			const data: NominatimResult[] = await response.json();

			if (data.length > 0) {
				const place = data[0];
				lat = parseFloat(place.lat);
				long = parseFloat(place.lon);
				marker.setLngLat([long, lat]);
				map.setCenter([long, lat]);
			}
		} catch (error) {
			console.error(error);
		} finally {
			loading = false;
		}
	};

	onMount(() => {
		map = new maplibregl.Map({
			container: mapContainer,
			style: 'https://demotiles.maplibre.org/style.json',
			center: [initialLong || 2.35, initialLat || 48.85],
			zoom: initialLat ? zoom : 5
		});

		marker = new maplibregl.Marker({ color: '#994f08' })
			.setLngLat([initialLong || 2.35, initialLat || 48.85])
			.addTo(map);

		map.on('click', (e: MapMouseEvent) => {
			long = e.lngLat.lng;
			lat = e.lngLat.lat;
			marker.setLngLat([long, lat]);
		});

		if (!initialLat) locateUser();
	});
</script>

<div class="map-selector">
	<div bind:this={mapContainer} class="map-container"></div>

	<div class="map-controls">
		<div class="search-row">
			<Input
				type="text"
				name="addressSearch"
				label="Chercher une ville ou un lieu..."
				bindValue={query}
				keydownAction={(e: KeyboardEvent) => e.key === 'Enter' && searchPlace()}
				L="100%"
			/>
			<Button
				variant="secondary"
				label="🔍"
				{loading}
				clickAction={searchPlace}
				L="48px"
				l="48px"
				borderRadius="0.875rem"
			/>
			<Button
				variant="primary"
				label="📍"
				{loading}
				clickAction={locateUser}
				L="48px"
				l="48px"
				borderRadius="0.875rem"
			/>
		</div>

		<div class="coords-row">
			<div class="coord-field">
				<span class="coord-label">Latitude</span>
				<span class="coord-value">{lat.toFixed(6)}°</span>
			</div>
			<div class="coord-field">
				<span class="coord-label">Longitude</span>
				<span class="coord-value">{long.toFixed(6)}°</span>
			</div>
			{#if altitude !== undefined}
				<div class="coord-field">
					<span class="coord-label">Altitude</span>
					<span class="coord-value">{altitude}m</span>
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	.map-selector {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.map-container {
		height: 320px;
		width: 100%;
		border-radius: 1rem;
		overflow: hidden;
		border: 2px solid var(--back-dark);
	}

	:global(.maplibregl-canvas) {
		border-radius: 1rem;
	}

	.map-controls {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.search-row {
		display: flex;
		gap: 0.5rem;
		align-items: flex-end;
	}

	.coords-row {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
		gap: 0.75rem;
	}

	.coord-field {
		background: var(--back-yellow-gray);
		padding: 0.75rem 1rem;
		border-radius: 0.75rem;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.coord-label {
		font-size: 0.75rem;
		color: var(--gray-text);
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.coord-value {
		font-size: var(--text-size);
		font-weight: 600;
		color: var(--dark-text);
		font-variant-numeric: tabular-nums;
	}
</style>
