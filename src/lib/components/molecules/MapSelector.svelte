<script lang="ts">
	import { onMount } from 'svelte';
	import Input from '$components/atoms/Input.svelte';
	import Button from '$components/atoms/Button.svelte';

	import maplibregl, { Map, Marker, MapMouseEvent } from 'maplibre-gl';

	export let initialLat: number = 0;
	export let initialLong: number = 0;
	export let zoom: number = 14;

	let map: Map;
	let marker: Marker;
	let mapContainer: HTMLDivElement;

	let lat: number = initialLat;
	let long: number = initialLong;

	let query: string = '';
	let loading: boolean = false;

	const locateUser = (): void => {
		if (!navigator.geolocation) {
			return;
		}

		navigator.geolocation.getCurrentPosition(
			(position: GeolocationPosition) => {
				const { latitude, longitude } = position.coords;
				lat = latitude;
				long = longitude;
				map.setCenter([longitude, latitude]);
				marker.setLngLat([longitude, latitude]);
				map.setZoom(zoom);
			},
			(error) => {
				console.error('Error getting user location:', error);
			}
		);
	};

	type NominatimResult = {
		lat: string;
		lon: string;
		display_name: string;
	};

	const searchPlace = async (): Promise<void> => {
		if (!query) {
			return;
		}

		loading = true;

		try {
			const response = await fetch(
				`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
			);

			const data: NominatimResult[] = await response.json();

			if (data.length > 0) {
				const place = data[0];
				const latitude = parseFloat(place.lat);
				const longitude = parseFloat(place.lon);

				lat = latitude;
				long = longitude;

				marker.setLngLat([longitude, latitude]);
			}
		} catch (error) {
			console.error(error);
		} finally {
			loading = false;
		}

		onMount(() => {
			map = new maplibregl.Map({
				container: mapContainer,
				style: 'https://demotiles.maplibre.org/style.json',
				center: [initialLong, initialLat],
				zoom
			});

			marker = new maplibregl.Marker().setLngLat([initialLong, initialLat]).addTo(map);

			// Click on the map
			map.on('click', (e: MapMouseEvent) => {
				long = e.lngLat.lng;
				lat = e.lngLat.lat;
				marker.setLngLat([long, lat]);
			});

			// Auto location at the begining
			locateUser();
		});
	};
</script>

<div bind:this={mapContainer} class="map"></div>
<div class="controls">
	<Input
		type="text"
		name="addressSearch"
		label="Chercher une ville ou un lieu ..."
		bindValue={query}
		keydownAction={(e: KeyboardEvent) => e.key === 'Enter' && searchPlace()}
	/>

	<Button variant="secondary" label="Rechercher" {loading} clickAction={searchPlace}></Button>
	<Button variant="secondary" label="Ma position" {loading} clickAction={locateUser}></Button>
</div>
<div class="controls">
	<Input type="number" name="lat" bindValue={lat} label="Latitude" isLabeled={false} />
	<Input type="number" name="long" bindValue={long} label="Longitude" isLabeled={false} />
</div>

<style>
	.map {
		height: 400px;
		width: 100%;
		border-radius: 10px;
	}

	.controls {
		margin-top: 10px;
		display: flex;
		gap: 10px;
		flex-wrap: wrap;
	}
</style>
