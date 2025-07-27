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
	class="max-w-lg scale-95 absolute m-auto rounded-md shadow-md border-none p-0 transform-gpu duration-300 ease-in-out backdrop:bg-white/50 backdrop:backdrop-blur-md open:scale-100"
>
	<div class="p-4 max-w-lg w-full" on:click|stopPropagation>
		<div class="p-1 flex justify-between">
			<div>
				<slot name="header" />
			</div>
			<div class="w-auto h-full">
				<button class="cursor-pointer rounded-full border-2 border-solid border-red-600 w-8 h-8 text-red-600 transition-all duration-300 ease-in-out hover:text-white hover:bg-red-600" autofocus on:click={closeDialog}>
					<i class="fa-solid fa-x"></i>
				</button>
			</div>
		</div>
		<hr />
		<slot />
	</div>
</dialog>
