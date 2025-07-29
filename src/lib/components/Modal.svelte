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
	class="absolute m-auto max-w-lg scale-95 transform-gpu rounded-md border-none p-0 shadow-md duration-300 ease-in-out backdrop:bg-white/50 backdrop:backdrop-blur-md open:scale-100"
>
	<div class="w-full max-w-lg p-4" on:click|stopPropagation>
		<div class="flex justify-between p-1">
			<div>
				<slot name="header" />
			</div>
			<div class="h-full w-auto">
				<button
					class="h-8 w-8 cursor-pointer rounded-full border-2 border-solid border-red-600 text-red-600 transition-all duration-300 ease-in-out hover:bg-red-600 hover:text-white"
					autofocus
					on:click={closeDialog}
				>
					<i class="fa-solid fa-x"></i>
				</button>
			</div>
		</div>
		<hr />
		<slot />
	</div>
</dialog>
