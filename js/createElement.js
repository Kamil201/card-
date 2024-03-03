export const createElement = (tagName, attributes = {}, children = []) => {
	const element = document.createElement(tagName);

	for (const [key, value] of Object.entries(attributes)) {
		element.setAttribute(key, value);
	}

	children.forEach((child) => element.appendChild(child));

	return element;
};
