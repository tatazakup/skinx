export const replaceWords = (
  inputString: string,
  replacements: Record<string, string>
): string => {
  // Create a regular expression pattern with all the words to be replaced
  const pattern = new RegExp(Object.keys(replacements).join("|"), "g");

  // Use the replace method with the pattern to replace all occurrences
  const resultString = inputString.replace(
    pattern,
    (match) => replacements[match]
  );

  return resultString;
};
