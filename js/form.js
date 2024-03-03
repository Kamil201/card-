import { createElement } from "./createElement.js";;
import {
	createInput,
	createLabel,
	createDiv,
	createParagraph,
	createErrorMessage,
	createImageElement,
	createSpanElement,
	createPopup,
	popupElm
} from "./createTagElements.js";
export const checkIsAnyFieldEmpty = (
	inputs,
	cardInputNameEl,
	cardErrorMessageName,
	cardInputNumberEl,
	cardErrorMessageNumber,
	cardInputMonthEl,
	cardErrorMessageMonth,
	cardInputCodeEl,
	cardErrorMessageCode,
	cardInputYearEl,
	cardErrorMessageYear,
	popupEl,
	cardEl
) => {
	const isAnyInputEmpty = inputs.some(
		({ inputField }) => inputField.value.trim() === ""
	);

	inputs.forEach(({ inputField, message, text }) => {
		isAnyInputEmpty
			? (inputField.parentElement.classList.add("error"),
			  (message.innerText = text))
			: (inputField.parentElement.classList.remove("error"),
			  inputField.parentElement.classList.add("success"),
			  (message.innerText = ""));
	});

	if (!isAnyInputEmpty) {
		// Update popup content dynamically
		const popupMessage = popupEl.querySelector(".card__pop-up--message");

		popupMessage.innerHTML = "";

		const thankYouSpan = createElement(
			"span",
			{ class: "card__pop-up--thank-you" },
			[document.createTextNode("Thank you!")]
		);
		const infoParagraph = createElement("p", { class: "card__pop-up--info" }, [
			document.createTextNode("We've added your card details"),
		]);

		const infoButton = createElement("button", { class: "card__pop-up--btn" }, [
			document.createTextNode("Continue"),
		]);

		popupMessage.append(thankYouSpan, infoParagraph, infoButton);

		// Show the popup
		popupEl.append(thankYouSpan, infoParagraph, infoButton);
		popupEl.style.display = "block";
		cardEl.style.display = "none";

		const continueBtn = document.querySelector(".card__pop-up--btn");

		if (!infoButton) {
			console.error("Continue button not found");
		}
		infoButton.addEventListener("click", () => {
			popupEl.style.display = "none";
			cardEl.style.display = "block";
		});
	}
};
