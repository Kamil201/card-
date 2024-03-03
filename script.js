const createElement = (tagName, attributes = {}, children = []) => {
	const element = document.createElement(tagName);

	for (const [key, value] of Object.entries(attributes)) {
		element.setAttribute(key, value);
	}

	children.forEach((child) => element.appendChild(child));

	return element;
};

const createInput = (type, className, placeholder, maxLength) => {
	return createElement("input", {
		type,
		class: className,
		placeholder,
		maxLength: maxLength,
	});
};

const createLabel = (forAttribute, text) => {
	return createElement("label", { for: forAttribute }, [
		document.createTextNode(text),
	]);
};

const createDiv = (className, children = []) => {
	return createElement("div", { class: className }, children);
};

const createParagraph = (className, text) => {
	return createElement("p", { class: className }, [
		document.createTextNode(text),
		document.createTextNode(text),
	]);
};

const createErrorMessage = (tagName, className, text) => {
	const errorMessage = createElement(tagName, { class: className }, [
		document.createTextNode(text),
	]);

	return errorMessage;
};

const isValidName = (name) => {
	return name.trim() !== "";
};

const isValidNumber = (number) => {
	const regex = /^\d+$/;
	return regex.test(number);
};

const isValidMonth = (month) => {
	const regex = /^\d+$/;
	return regex.test(month);
};

const isValidYear = (year) => {
	const regex = /^\d+$/;
	return regex.test(year);
};

const isValidCode = (code) => {
	const regex = /^\d+$/;
	return regex.test(code);
};

const checkIsAnyFieldEmpty = () => {
	const inputs = [
		{
			inputField: cardInputNameEl,
			message: cardErrorMessageName,
			text: "Can't be blank",
		},
		{
			inputField: cardInputNumberEl,
			message: cardErrorMessageNumber,
			text: "Can't be blank",
		},
		{
			inputField: cardInputMonthEl,
			message: cardErrorMessageMonth,
			text: "Can't be blank",
		},
		{
			inputField: cardInputCodeEl,
			message: cardErrorMessageCode,
			text: "Can't be blank",
		},
		{
			inputField: cardInputYearEl,
			message: cardErrorMessageYear,
			text: "Can't be blank",
		},
	];

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

const formSubmit = () => {
	checkIsAnyFieldEmpty();
};

const renderFormElements = () => {
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

const createImageElement = (src, alt, className) => {
	return createElement("img", { src, alt, class: className });
};

const createSpanElement = (text, className) => {
	return createElement("span", { class: className }, [
		document.createTextNode(text),
	]);
};

const renderHeaderElements = () => {
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

const createPopup = () => {
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

const popupElm = createPopup();
document.body.appendChild(popupElm);

const renderApp = () => {
	const container = createElement("div", { class: "card__content" }, [
		renderHeaderElements(),
		renderFormElements(),
	]);

	return container;
};

const init = (containerSelector) => {
	const container = document.querySelector(containerSelector);

	if (!container) {
		console.error(`Container with selector ${containerSelector} not found`);
	}

	const app = renderApp();

	container.appendChild(app);
};

// Inicjalizacja aplikacji
init(".card");

// Dodawanie listenerów do zmiany informacji na karcie
const cardFormEl = document.querySelector(".card__form");
const cardHolderEl = cardFormEl.querySelector(".card__holder");
const CVCNumbersEl = document.querySelector(".card__CVC-numbers");
const cardNumbers = document.querySelector(".card__heading--numbers");
let cardInfoNameEl = document.querySelector(".card__info--name");
let cardInfoMouthEl = document.querySelector(".card__info--month");
let cardInfoYearEl = document.querySelector(".card__info--year");
const cardInputNameEl = cardFormEl.querySelector(".card__input--name");
const cardInputNumberEl = cardFormEl.querySelector(".card__input--number");
const cardInputMonthEl = cardFormEl.querySelector(".card__input--month");
const cardInputCodeEl = cardFormEl.querySelector(".card__input--code");
const cardInputYearEl = cardFormEl.querySelector(".card__input--year");

const popupEl = document.querySelector(".card__pop-up");
const cardEl = document.querySelector(".card");

const cardErrorMessageName = document.querySelector(
	".card__error-message--name"
);

const cardErrorMessageNumber = document.querySelector(
	".card__error-message--number"
);

const cardErrorMessageMonth = document.querySelector(
	".card__error-message--month"
);

const cardErrorMessageYear = document.querySelector(
	".card__error-message--year"
);

const cardErrorMessageCode = document.querySelector(
	".card__error-message--code"
);

function isValidNameFormat(value) {
	const regex = /^[a-zA-Z\s]+$/;
	return regex.test(value);
}

function handleInputValidation(
	inputElement,
	errorElement,
	isValidFunction,
	errorMessage,
	updateCardInfoFunction = null
) {
	const inputValue = inputElement.value;

	if (!isValidFunction(inputValue)) {
		inputElement.parentElement.classList.add("error");
		errorElement.innerText = errorMessage;
	} else {
		inputElement.parentElement.classList.remove("error");
		errorElement.innerText = "";

		if (updateCardInfoFunction) {
			updateCardInfoFunction(inputElement);
		}
	}
}

function handleCardNameInput(e) {
	handleInputValidation(
		e.target,
		cardErrorMessageName,
		isValidNameFormat,
		"Wrong format, letters only!",
		handleCardNameUpdate
	);
}

function handleCardNameUpdate(inputElement) {
	const cardHolderName = inputElement.value;
	cardInfoNameEl.textContent = cardHolderName;
}

function handleCardNumberInput(e) {
	handleInputValidation(
		e.target,
		cardErrorMessageNumber,
		isValidNumber,
		"Wrong format, numbers only!",
		handleCardNumberUpdate
	);
}

function handleCardNumberUpdate(inputElement) {
	const holderNumber = inputElement.value;
	cardNumbers.textContent = holderNumber;
}

function handleCardMonthInput(e) {
	handleInputValidation(
		e.target,
		cardErrorMessageMonth,
		isValidNumber,
		"Invalid month, numbers only!",
		handleCardMonthUpdate
	);
}

function handleCardMonthUpdate(inputElement) {
	const expMonth = inputElement.value + "/";
	console.log(expMonth);
	cardInfoMouthEl.textContent = expMonth;
}

function handleCardYearInput(e) {
	handleInputValidation(
		e.target,
		cardErrorMessageYear,
		isValidYear,
		"Invalid year, numbers only!",
		handleCardYearUpdate
	);
}

function handleCardYearUpdate(inputElement) {
	const expYear = inputElement.value;
	console.log(inputElement.value);
	cardInfoYearEl.textContent = expYear;
}

function handleCardCodeInput(e) {
	handleInputValidation(
		e.target,
		cardErrorMessageCode,
		isValidCode,
		"Wrong format, numbers only!",
		handleCardCodeUpdate
	);
}

function handleCardCodeUpdate(inputElement) {
	const CVCCode = inputElement.value;
	CVCNumbersEl.textContent = CVCCode;
}

cardInputNumberEl.addEventListener("input", handleCardNumberInput);
cardInputMonthEl.addEventListener("input", handleCardMonthInput);
cardInputYearEl.addEventListener("input", handleCardYearInput);
cardInputCodeEl.addEventListener("input", handleCardCodeInput);
cardInputNameEl.addEventListener("input", handleCardNameInput);
