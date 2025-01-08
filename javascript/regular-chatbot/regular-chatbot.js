// @ts-check

/**
 * Given a certain command, help the chatbot recognize whether the command is valid or not.
 *
 * @param {string} command
 * @returns {boolean} whether or not is the command valid
 */

export function isValidCommand(command) {
  const chatBotRegex = /^chatbot/i;
  return chatBotRegex.test(command);
}

/**
 * Given a certain message, help the chatbot get rid of all the emoji's encryption through the message.
 *
 * @param {string} message
 * @returns {string} The message without the emojis encryption
 */
export function removeEmoji(message) {
    const emojiRegex = new RegExp('emoji\\d+', 'g');
    return message.replace(emojiRegex, '');
}

/**
 * Given a certain phone number, help the chatbot recognize whether it is in the correct format.
 *
 * @param {string} number
 * @returns {string} the Chatbot response to the phone Validation
 */
export function checkPhoneNumber(number) {
  const phoneRegex = /^\(\+\d{2}\) \d{3}-\d{3}-\d{3}$/;
  return phoneRegex.test(number) 
    ? "Thanks! You can now download me to your phone." 
    : `Oops, it seems like I can't reach out to ${number}`;
}

/**
 * Given a certain response from the user, help the chatbot get only the URL.
 *
 * @param {string} userInput
 * @returns {string[] | null} all the possible URL's that the user may have answered
 */
export function getURL(userInput) {
  const urlRegex = /\b(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})(?:\/[^\s]*)?\b/g;
  const matches = [];
  let match;
  while ((match = urlRegex.exec(userInput)) !== null) {
    matches.push(match[1]);
  }
  return matches.length > 0 ? matches : [];
}

/**
 * Greet the user using the full name data from the profile.
 *
 * @param {string} fullName
 * @returns {string} Greeting from the chatbot
 */
export function niceToMeetYou(fullName) {
  const nameRegex = /(\w+), (\w+)/;
  let formattedName = fullName.replace(nameRegex, '$2 $1');
    return `Nice to meet you, ${formattedName}`;
}
