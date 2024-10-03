export const validateText = (value: string) => {
	if (!value || value.trim() === "") {
		return "Это поле обязательно для заполнения";
	}
	if (value.length < 3) {
		return "Текст должен содержать не менее 3 символов";
	}
	if (value.length > 50) {
		return "Текст должен содержать не более 50 символов";
	}
	return undefined;
};

export const validateNumber = (value: number) => {
	if (value === undefined || value === null) {
		return "Это поле обязательно для заполнения";
	}
	if (isNaN(Number(value))) {
		return "Значение должно быть числом";
	}
	if (Number(value) <= 0) {
		return "Значение должно быть положительным числом";
	}
	return undefined;
};

export const validateEmail = (value: string) => {
	if (!value || value.trim() === "") {
		return "Email обязателен для заполнения";
	}
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(value)) {
		return "Введите корректный email";
	}
	return undefined;
};

// Валидация select
export const validateSelect = (value: string) => {
	if (!value) {
		return "Необходимо выбрать значение";
	}
	return undefined;
};
