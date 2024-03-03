// index.js
import { createElement } from "./createElement.js";
import {
	renderFormElements,
	renderHeaderElements,
	renderApp,
} from "./render.js";
import { checkIsAnyFieldEmpty } from "./form.js";

const cardHolderDiv = createDiv("card__holder", [
	createLabel("CardholderName", "Cardholder Name"),
	createInput(
		"text",
		"card__input card__input--name",
		"e.g. Jane Appleseed",
		"20"
	),
	createErrorMessage("p", "card__error-message--name", ""),
]);

console.log(cardHolderDiv);
