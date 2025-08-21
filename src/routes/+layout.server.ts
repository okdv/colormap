import { getManifest } from '$lib/server/utils.server';
import type { InteractiveLayer } from "$lib/types";

export const ssr = false;
export const prerender = true;

const manifest: InteractiveLayer[] = getManifest()