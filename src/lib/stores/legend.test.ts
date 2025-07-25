import { beforeEach, describe, expect, it } from "vitest";
import { legendStore } from "$lib/stores";
import { get } from "svelte/store";


describe('legendStore', () => {
    // reset the store value before each test
    beforeEach(() => {
        legendStore.clearItems()
    });

    it('should init with default legend item', () => {
        const currentItems = get(legendStore);
        const keys = Object.keys(currentItems);
        expect(keys.length).toBe(1);
        expect(currentItems[keys[0]].name).toBe('Visited');
    });
})