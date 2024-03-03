import { renderApp } from "./render.js";

export const init = (containerSelector) => {
	const container = document.querySelector(containerSelector);

	if (!container) {
		console.error(`Container with selector ${containerSelector} not found`);
	}

	const app = renderApp();
	container.appendChild(app);
};

// Inicjalizacja aplikacji
init(".card");
