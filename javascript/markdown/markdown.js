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
  const lines = markdown.split('\n');
  let inList = false;
  let listLines = [];
  const parsedLines = lines.map(line => {
    if (line.startsWith('#')) {
      if (inList) {
        inList = false;
        const listHtml = parseUnorderedList(listLines);
        listLines = [];
        return listHtml + '\n' + parseHeader(line);
      }
      return parseHeader(line);
    } else if (line.startsWith('* ')) {
      inList = true;
      listLines.push(line);
      return '';
    } else {
      if (inList) {
        inList = false;
        const listHtml = parseUnorderedList(listLines);
        listLines = [];
        return listHtml + '\n' + parseText(line, false);
      }
      return parseText(line, false);
    }
  });

  if (inList) {
    parsedLines.push(parseUnorderedList(listLines));
  }

  return parsedLines.filter(line => line !== '').join('\n');
}