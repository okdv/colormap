<script lang="ts">
	/** src/lib/components/SettingsModal.svelte
	 * SettingsModal Component
	 * @description A specific instance of Modal for the Settings Form
	 * @todo add more settings (base style enhance, map style, etc)
	 * @todo dynamically set feature select options
	 */
	import Modal from './Modal.svelte';
	import { settingsStore } from '$lib/stores';
	import type { Settings } from '$lib/types';
	export let open: boolean = false;

	let settingsForm: Settings = settingsStore.getCurrentValue();

	// handle settings form submission by updating store (which has side effects)
	const handleSubmit = () => {
		settingsStore.updateSettings(settingsForm);
	};
</script>

<Modal bind:open>
	<div slot="header" class="text-left">
		<h2 class="text-2xl">Settings</h2>
	</div>
	<div>
		<form on:submit|preventDefault={handleSubmit}>
			<label class="block">
				<span>Interactive Map Layer: </span>
				<select bind:value={settingsForm.featureLayerFilename} class="cursor-pointer">
					<option value="us_counties_2023.geojson">US Counties</option>
					<option value="us_states_2024.geojson">US States</option>
				</select>
			</label>
			<!-- 
                @todo coming soon...     
                <label class="block">
                    <span>Map Base Layer: </span>
                    <select disabled class="cursor-pointer">
                        <option>OpenStreetMap</option>
                    </select>
                </label>
            -->
			<label class="block">
				<span>Selected Feature Opacity: </span>
				<input type="number" min="0" max="1" step=".1" placeholder=".3" bind:value={settingsForm.baseStyle.selected.fillOpacity} />
			</label>
			<div class="flex w-full justify-center gap-2">
				<button
					class="m-w-auto cursor-pointer rounded-sm p-1 px-2 text-gray-700 transition-all duration-300 ease-in-out hover:bg-gray-700 hover:text-white"
				>
					<span>Cancel</span>
				</button>
				<button
					type="submit"
					class="m-w-auto cursor-pointer rounded-sm p-1 px-2 text-green-500 transition-all duration-300 ease-in-out hover:bg-green-500 hover:text-white"
				>
					<i class="fa-solid fa-save"></i>
					<span>Save</span>
				</button>
			</div>
		</form>
	</div>
</Modal>
