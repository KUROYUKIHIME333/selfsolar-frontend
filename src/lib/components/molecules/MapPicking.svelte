<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import L from 'leaflet';
	import 'leaflet/dist/leaflet.css';

    export let lat:number = 0
    export let lng:number = 0
    export let zoom:number = 12

    let mapElement
    let map 
    let marker

    onMount(()=>{
        // INIT THE MAP
        map = L.map(mapElement).setView([lat, lng], zoom);

        // 
L.tileLayer()
    })

</script>

<style></style>
