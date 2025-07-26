// src/lib/stores/modal.ts
import { writable } from "svelte/store";

export const showModal = writable<boolean>(false);