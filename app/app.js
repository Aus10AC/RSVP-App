// Calls all needed elements
const form = document.getElementById('registrar');
const input = form.querySelector('input');

const mainDiv = document.querySelector('.main');
const ul = document.getElementById('invitedList');

const div = document.createElement('div');
const filterLabel = document.createElement('label');
const filterCheckBox = document.createElement('input');

filterLabel.textContent = "Hide those who haven't responded";
filterCheckBox.type = 'checkbox';
div.appendChild(filterLabel);
div.appendChild(filterCheckBox);
mainDiv.insertBefore(div, ul);
// Filters through any recipient that has a 'confirmed' status
filterCheckBox.addEventListener('change', (e) => {
  const isChecked = e.target.checked;
  const lis = ul.children;
  // Loops through all recipients, finds the ones who have 'responded' and then filters out those who haven't responded
  if ( isChecked ) {
    for ( let i = 0; i < lis.length; i += 1 ) {
      let li = lis[i];
      if ( li.className === 'responded' ) {
        li.style.display = '';
      } else {
        li.style.display = 'none';
      }
    }
  } else {
    for ( let i = 0; i < lis.length; i += 1 ) {
      let li = lis[i];
      li.style.display = '';
    }
  }
});
// Function for creating and appending List Items
function createLI( text ) {
  // Creates element
  function createElement( elementName, property, value ) {
    const element = document.createElement(elementName);
    element[property] = value;
    return element;
  }
  // appends element Name, Property and Value to a List Item
  function appendToLI( elementName, property, value ) {
    const element = createElement(elementName, property, value);
    li.appendChild(element);
    return element;
  }
  // Creates all the needed Elements/Values to give functionality to the app
  const li = document.createElement('li');
  appendToLI('span', 'textContent', text);
  appendToLI('label', 'textContent', 'Confirmed')
    .appendChild(createElement('input', 'type', 'checkbox'));
  appendToLI('button', 'textContent', 'edit');
  appendToLI('button', 'textContent', 'remove');
  return li;
}
// Captures the input elements value and then clears the input area after the user submits
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value;
  input.value = '';
  const li = createLI(text);
  ul.appendChild(li);
  if ( text === '' ) {
    alert('Please provide a name');
    return false;
  }
});
// listens for checkbox click then saves 'checked' recipients
ul.addEventListener('change', (e) => {
  const checkbox = event.target;
  const checked = checkbox.checked;
  const listItem = checkbox.parentNode.parentNode;
  if ( checked ) {
    listItem.className = 'responded';
  } else {
    listItem.className = '';
  }
});
// listens for the editing, removing and saving of an invitees name
ul.addEventListener('click', (e) => {
  if ( e.target.tagName === 'BUTTON' ) {
    const button = e.target;
    const li = e.target.parentNode;
    const ul = li.parentNode;
    const action = button.textContent;
    const nameActions = { // removes invitees
      remove: () => {
        ul.removeChild(li);
      }, // edits invitees name
      edit: () => {
        const span = li.firstElementChild;
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = span.innerHTML + '...';
        li.insertBefore(input, span);
        li.removeChild(span);
        button.textContent = 'save';
      }, // Saves new invitee name
      save: () => {
        const input = li.firstElementChild;
        const span = document.createElement('span');
        span.textContent = input.value;
        li.insertBefore(span, input);
        li.removeChild(input);
        button.textContent = 'edit';
      }
    };
    // select and run action in button's name
    nameActions[action]();
  }
});
