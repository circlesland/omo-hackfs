import { writable } from "svelte/store";

export var curRoute = writable("?page=home");
export const curId = writable(0);