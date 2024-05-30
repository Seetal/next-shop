export const containsStringValidation = (string: string, subString: string) => {
	if (!string.includes(subString)) {
		return true;
	}
	return false;
}