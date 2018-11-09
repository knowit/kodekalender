const marked = require('marked');

/**
 * Validation of the challenge (eg 'activeTo' after 'activeFrom')
 */
function isValid(challenge) {
  const { activeFrom, activeTo } = challenge;

  if (activeFrom && activeTo && new Date(activeFrom) > new Date(activeTo)) {
    return false;
  }
  return true;
}

/**
 * Compile markdown to HTML before persisting challenges
 */
export default event => {
  try {
    if (!isValid(event.data)) {
      // Currently only one validation error occurs
      return {
        error: 'Validation failed. activeFrom cannot be after activeTo',
      };
    }

    const markup = marked(event.data.markdown);

    event.data.markup = markup;

    return event;
  } catch (err) {
    console.log(err);
    return {
      error: 'An unexpected error occurred when processing the markdown',
    };
  }
};
