/**
 * Replaces the result of all substitutions (results of calling ${ ... }) with a new value.
 * Same as for `replaceResultTransformer`, replaceWhat can be a string or regular expression and replaceWith is the new value.
 */
const replaceSubstitutionTransformer = (replaceWhat, replaceWith) => {
  if (replaceWhat == null || replaceWith == null) {
    throw new Error(
      'replaceSubstitutionTransformer requires exactly 2 arguments.',
    );
  }

  return {
    onSubstitution(substitution) {
      // Do not touch if null or undefined
      if (substitution == null) {
        return substitution;
      } else {
        return String(substitution).replace(replaceWhat, replaceWith);
      }
    },
  };
};

export { replaceSubstitutionTransformer };
