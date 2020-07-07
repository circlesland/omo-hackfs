import App from './App.svelte';
import { Textile } from './Textile';

var app;

var textile = Textile.getInstance();
textile.init().then(() => {
    app = new App({
        target: document.body,
    });
});

export default app;