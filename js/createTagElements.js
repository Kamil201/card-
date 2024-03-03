import { createElement } from "./createElement.js";

export const createInput = (type, className, placeholder, maxLength) => {
	return createElement("input", {
		type,
		class: className,
		placeholder,
		maxLength: maxLength,
	});
};

export const createLabel = (forAttribute, text) => {
	return createElement("label", { for: forAttribute }, [
		document.createTextNode(text),
	]);
};

export const createDiv = (className, children = []) => {
	return createElement("div", { class: className }, children);
};

export const createParagraph = (className, text) => {
	return createElement("p", { class: className }, [
		document.createTextNode(text),
		document.createTextNode(text),
	]);
};

export const createErrorMessage = (tagName, className, text) => {
	const errorMessage = createElement(tagName, { class: className }, [
		document.createTextNode(text),
	]);

	return errorMessage;
};

export const createImageElement = (src, alt, className) => {
	return createElement("img", { src, alt, class: className });
};

export const createSpanElement = (text, className) => {
	return createElement("span", { class: className }, [
		document.createTextNode(text),
	]);
};

export const createPopup = () => {
	const popup = createElement("div", { class: "card__pop-up" }, [
		createElement("img", {
			src: "./assets/images/icon-complete.svg",
			alt: "icon-complete",
			class: "card__pop-up--icon",
		}),
		createElement("p", { class: "card__pop-up card__pop-up--message" }, [
			createElement("span", { class: "card__pop-up card__pop-up--thank-you" }, [
				document.createTextNode("Thank you!"),
			]),
		]),
		createElement("button", { class: "card__pop-up card__pop-up--btn" }, [
			document.createTextNode("Continue"),
		]),
	]);

	return popup;
};

export const popupElm = createPopup();
document.body.appendChild(popupElm);

console.log(createPopup());
