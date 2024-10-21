/**
 * Splits a string substitution into an array by the provided splitBy substring, only if the string contains the splitBy substring.
 */
const splitStringTransformer = (splitBy) => {
  if (typeof splitBy !== "string") {
    throw new Error("You need to specify a string character to split by.");
  }

  return {
    onSubstitution(substitution) {
      if (typeof substitution === "string" && substitution.includes(splitBy)) {
        return substitution.split(splitBy);
      }
      return substitution;
    },
  };
};

export { splitStringTransformer };
