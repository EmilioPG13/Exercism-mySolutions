// Helper function to wrap text in HTML tags
function wrapInTag(text, tag) {
  return `<${tag}>${text}</${tag}>`;
}

// Helper function to check if text starts with a specific HTML tag
function startsWithTag(text, tag) {
  return text.startsWith(`<${tag}>`);
}

// Helper function to parse Markdown with a specific delimiter and convert to HTML tag
function parseWithDelimiter(markdown, delimiter, tag) {
  const pattern = new RegExp(`${delimiter}(.+?)${delimiter}`, 'g');
  const replacement = `<${tag}>$1</${tag}>`;
  return markdown.replace(pattern, replacement);
}

// Function to parse strong tags
function parseStrong(markdown) {
  return parseWithDelimiter(markdown, '__', 'strong');
}

// Function to parse emphasis tags
function parseEmphasis(markdown) {
  return parseWithDelimiter(markdown, '_', 'em');
}

// Function to parse text and wrap in paragraph tags if not a list
function parseText(markdown, isList) {
  let parsedText = parseEmphasis(parseStrong(markdown));
  if (!isList) {
    parsedText = wrapInTag(parsedText, 'p');
  }
  return parsedText;
}

// Function to parse headers
function parseHeader(markdown) {
  let count = 0;
  while (markdown[count] === '#') {
    count++;
  }
  if (count > 0 && count <= 6) {
    const headerText = markdown.slice(count).trim();
    return wrapInTag(headerText, `h${count}`);
  }
  return wrapInTag(markdown, 'p');
}

// Function to parse unordered lists
function parseUnorderedList(lines) {
  const listItems = lines.map(line => {
    const itemText = line.slice(2).trim();
    return wrapInTag(parseText(itemText, true), 'li');
  }).join('');
  return wrapInTag(listItems, 'ul');
}

// Function to parse the entire Markdown input
export function parse(markdown) {
  const lines = markdown.split('\n'); // Split Markdown by lines
  let inList = false; // Track whether we are inside a list
  let listLines = []; // Store lines that are part of a list
  let result = ''; // Store the resulting HTML

  lines.forEach((line, index) => {
    if (line.startsWith('#')) {
      // Handle headers
      if (inList) {
        result += parseUnorderedList(listLines);
        listLines = [];
        inList = false;
      }
      result += parseHeader(line);
    } else if (line.startsWith('* ')) {
      // Handle list items
      inList = true;
      listLines.push(line);
    } else {
      // Handle paragraphs or plain text
      if (inList) {
        result += parseUnorderedList(listLines);
        listLines = [];
        inList = false;
      }
      result += parseText(line, false);
    }
  });

  // If the last lines were part of a list, close it
  if (inList) {
    result += parseUnorderedList(listLines);
  }

  return result.trim(); // Trim to ensure no trailing newlines
}