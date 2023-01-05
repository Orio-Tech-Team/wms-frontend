export const numberValidatorFunction = (value, func) => {
  var validationRegex = /^[-+]?[0-9]+$/;
  if (value.match(validationRegex) || value === "") {
    func(value);
  }
};
