const sayForm = document.querySelector("#feedContainer");
const sayInput = sayForm.querySelectorAll("input");
const sayButtons = sayForm.querySelectorAll("button");

const SAY_NANA_KEY = "saynana";

let sayNanaList = [];

function saveSayNana() {
  localStorage.setItem(SAY_NANA_KEY, JSON.stringify(sayNanaList));
}

function deleteSayNana(event) {
  const list = event.target.parentElement;
  list.remove();
  sayNanaList = sayNanaList.filter((say) => say.id !== parseInt(list.id));
  saveSayNana();
}

function paintSayNana(sayNana) {
  const { text, id, parentElement } = sayNana;
  const list = document.createElement("div");
  list.id = id;
  const span = document.createElement("span");
  span.innerText = text;
  const button = document.createElement("button");
  button.innerText = "✖️";
  button.addEventListener("click", deleteSayNana);
  list.appendChild(span);
  list.appendChild(button);
  parentElement.appendChild(list);
}

function handleSayNana(event) {
  event.preventDefault();
  const parentElement = event.target.parentElement;
  const newSay = sayInput.value;
  newSay.length > 0 ? (btn.disabled = false) : (btn.disabled = true);
  sayInput.value = "";
  const newSayObj = {
    text: newSay,
    id: Date.now(),
    parentElement,
  };
  sayNanaList.push(newSayObj);
  paintSayNana(newSayObj);
  saveSayNana();
}

sayForm.addEventListener("submit", handleSayNana);

const savedSayNana = localStorage.getItem(SAY_NANA_KEY);

if (savedSayNana !== null) {
  const parsedSayNana = JSON.parse(savedSayNana);
  sayNanaList = parsedSayNana;
  parsedSayNana.forEach(paintSayNana);
}

function handleInputChange(event) {
  const input = event.target;
  const button = input.nextElementSibling;
  input.value.length > 0 ? (button.disabled = false) : (button.disabled = true);
}

sayInput.forEach((input) => {
  input.addEventListener("change", handleInputChange);
});
