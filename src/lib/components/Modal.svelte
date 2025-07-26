<script lang="ts">
	// src/lib/components/Modal.svelte
	/**
	 * Modal Component
	 * @description opens an HTML dialog on top of the page, this is where settings, alerts, etc live
	 */
	export let open: boolean = false;
	let dialog: HTMLDialogElement;

	// this handles the closing of the actual showModal store
	const closeModal = () => {
		open = false;
	};

	// this handles the closing of the HTML dialog
	const closeDialog = () => {
		dialog.close();
	};

	// this ensures there is reactivity between the dialog status and svelte store
	$: if (dialog) {
		if (open) {
			if (!dialog.open) {
				dialog.showModal();
			}
		} else {
			if (dialog.open) {
				closeDialog();
			}
		}
	}
</script>

<dialog
	bind:this={dialog}
	on:close={closeModal}
	on:click|self={closeDialog}
	class="max-w-lg scale-95 transform-gpu border-r-2 border-none p-0 duration-300 ease-in-out backdrop:bg-white/30 backdrop:backdrop-blur-sm open:scale-100"
>
	<div class="p-4" on:click|stopPropagation>
		<slot name="header" />
		<hr />
		<slot />
		<hr />
		<button class="block" autofocus on:click={closeDialog}>close</button>
	</div>
</dialog>
