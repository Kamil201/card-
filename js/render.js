// // render.js

import {
	createElement,
	createImageElement,
	createSpanElement,
	createDiv,
	createInput,
	createLabel,
	createParagraph,
	createErrorMessage,
} from "./createElements.js";

export const renderHeaderElements = () => {
	const header = createElement("header", { class: "card__header" }, [
		createImageElement(
			"./assets/images/bg-main-mobile.png",
			"bg-image",
			"card__bg"
		),
		createImageElement(
			"./assets/images/bg-card-back.png",
			"card back",
			"card__header card__header--back"
		),
		createSpanElement("000", "card__CVC-numbers"),
		createSpanElement(
			"0000 0000 0000 0000",
			"card__heading card__heading--numbers"
		),
		createDiv("card__info", [
			createSpanElement("Jane Appleseed", "card__info card__info--name"),
			createSpanElement("00/", "card__info card__info--month"),
			createSpanElement("00", "card__info card__info--year"),
			createImageElement(
				"./assets/images/card-logo.svg",
				"card logo",
				"card-logo"
			),
		]),
		createImageElement(
			"./assets/images/bg-card-front.png",
			"card front",
			"card__header card__header--front"
		),
	]);

	return header;
};

export const renderApp = () => {
	const container = createElement("div", { class: "card__content" }, [
		renderHeaderElements(),
		renderFormElements(),
	]);

	return container;
};

export const renderFormElements = () => {
	const form = createElement("form", { class: "card__form", action: "#" });

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

	const cardNumberDiv = createDiv("card__number", [
		createLabel("number", "Card Number"),
		createInput(
			"text",
			"card__input card__input--number",
			"e.g. 1234 5678 9123 0000",
			"19"
		),
		createParagraph("card__error-message--number", ""),
		createParagraph("card__success-message", ""),
	]);

	const cardDateExpLabel = createLabel("date", "Exp. Date (MM/YY) CVC");
	const cardDateDiv = createDiv("card__date", [
		createDiv("card__date card__date--exp", [
			createInput("text", "card__input card__input--month", "MM", "2"),
			createErrorMessage("p", "card__error-message--month", ""),
		]),
		createDiv("card__date card__date--years", [
			createInput("text", "card__input card__input--year", "YY", "4"),
			createErrorMessage("p", "card__error-message--year", ""),
		]),
		createDiv("card__date card__date--code", [
			createLabel("", "CVC"),
			createInput("text", "card__input card__input--code", "e.g. 123", "3"),
			createErrorMessage("p", "card__error-message--code", ""),
		]),
	]);

	const confirmButton = createElement("button", { class: "card__btn" }, [
		document.createTextNode("Confirm"),
	]);

	form.append(
		cardHolderDiv,
		cardNumberDiv,
		cardDateExpLabel,
		cardDateDiv,
		confirmButton
	);

	form.addEventListener("submit", formSubmit);

	return form;
};
