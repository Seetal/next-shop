export const isMinLengthValidation = (string: string, length: number) => {
	if(string.length < length) {
		return true;
	}
	return false;
}