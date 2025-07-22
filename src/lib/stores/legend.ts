import type { LegendItem } from "$lib/types/legend";
import { browser } from "$app/environment";
import { get, writable, type Writable } from "svelte/store";

/**
 * Creates legend store and persists it to local storage (or uses an existing local storage if available)
 * @returns a proxy to the store with interactions baked 
 */
const createLegend = () => {
    // local storage key
    const key = "colormap.legend"
    // default legend item
    const defaultItem = {
      id: crypto.randomUUID(),
      name: 'Visited',
      color: '#ff0000'
    }
    // default legend
    let legend: Record<string, LegendItem> = {
      [defaultItem.id]: defaultItem
    };

    // if legend is already in localstorage, use that instead
    if (browser && typeof localStorage !== 'undefined') {
        try {
            const stored = localStorage.getItem(key);
            if (stored != null) {
                legend = JSON.parse(stored)
            }
          } catch (e) {
            console.error(`Error parsing ${key} from localStorage: `, e);
          }
    }

    // Add / Update item in legend
    const add = (newData: LegendItem, store: Writable<Record<string, LegendItem>>) => store.update(data => ({
        [newData.id]: newData,
        ...data
    }));
    
    // Remove from legend
    const remove = (key: string, store: Writable<Record<string, LegendItem>>) => store.update(items => {
        const newItems = { ...items }
        delete newItems[key]
        return newItems
    });

    // create store
    const store = writable(legend);
  
      return {
          subscribe: store.subscribe,
          updateItem: (newItem: LegendItem) => add(newItem, store),
          addItem: (newItem: LegendItem) => add(newItem, store),
          removeItem: (id: string) => remove(id, store),
          clearItems: () => store.set({[defaultItem.id]: defaultItem})
        };
  };
  export const legendStore = createLegend();
  
/**
 * handles what legend item is selected 
 * @returns a legend item or null
 */
  const createSelectedItem = (): LegendItem | null => {
    const currentLegend = get(legendStore);
    const currentLegendValues = Object.values(currentLegend)
    return currentLegendValues.length > 0 ? currentLegendValues[0] : null 
  }
  export const selectedItem = writable<LegendItem | null>(createSelectedItem());