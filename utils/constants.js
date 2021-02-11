export const urlRegEx = /^(https?:\/\/)(www\.)?([\da-z-.]+)\.([a-z.]{2,6})[\da-zA-Z-._~:?#[\]@!$&'()*+,;=/]*\/?#?$/;
export const urlValidatorMessage = 'Строка должна содержать ссылку!';
export const incorrectAuthDataMessage = 'Неправильные почта или пароль';
export const requiredValidationMessage = (name) => `Поле "${name}" обязательно`;

export const documentNotFoundErrorMessage = 'Документ не найден';
export const userExistErrorMessage = 'Пользователь с таким email уже существует';
export const forbiddenErrorMessage = 'Нет прав для совершения данной операции';
export const BadRequestErrorMessage = 'Переданы некорректные данные';
