document.querySelector("head").append(
  `<script src="https://kit.fontawesome.com/6e0b41a7b2.js"
        crossorigin="anonymous"
      ></script>`
);

const HTMLElement = document.querySelector("html");
const keyboardContainerElement = document.createElement("div");
const keyboardToggleButton = document.createElement("div");
let isOpen = false;

let fieldToWrite = null;

const renderKeyboard = (pos) => {
  if (!isOpen) {
    HTMLElement.appendChild(keyboardToggleButton);
    buildKeyboardToggleButton(keyboardToggleButton, pos);
  } else {
    HTMLElement.appendChild(keyboardContainerElement);
    buildKeyboard(keyboardContainerElement);
  }
};

const clearKeyboard = () => {
  if (HTMLElement.contains(keyboardContainerElement)) {
    HTMLElement.removeChild(keyboardContainerElement);
    keyboardContainerElement.innerHTML = null;
  }

  if (HTMLElement.contains(keyboardToggleButton)) {
    HTMLElement.removeChild(keyboardToggleButton);
    keyboardContainerElement.innerHTML = null;
  }
};

HTMLElement.addEventListener("click", (e) => {
  if (
    e.target.getAttribute("button-type") === "mugkey-button" ||
    e.target.getAttribute("type") === "mugkey-keyboard-container"
  ) {
    return;
  }
  // if (
  //   e.target.getAttribute("type") === "button" ||
  //   e.target.tagName !== ("TEXTAREA" && "INPUT")
  // )
  //   return;

  clearKeyboard();

  fieldToWrite = e.target;
  console.log(fieldToWrite.tagName);
  console.log;
  if (
    (fieldToWrite.tagName === "INPUT" || fieldToWrite.tagName === "TEXTAREA") &&
    fieldToWrite.getAttribute("type") !== "button"
  ) {
    renderKeyboard({ x: e.clientX, y: e.clientY });
  } else {
    isOpen = false;
  }
});

function buildKeyboardToggleButton(container, pos) {
  console.log(pos);
  // style container
  const containerDefaultStyle = {
    position: "fixed",
    top: pos.y + "px",
    left: pos.x + "px",
    borderRadius: "50%",
    background: "rgba(0, 0, 0, 0.2)",
    fontSize: "1.4rem",
    width: "3rem",
    height: "3rem",
    margin: "1rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "1000000000",
  };
  container.setAttribute("type", "button");
  container.setAttribute("button-type", "mugkey-button");

  container.addEventListener("click", () => {
    isOpen = true;

    clearKeyboard();
    renderKeyboard();
  });

  container.innerText = "⌘";

  Object.assign(container.style, containerDefaultStyle);
}

function buildKeyboard(container) {
  // style container
  const containerDefaultStyle = {
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100vw",
    height: "40vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "rgba(0, 0, 0, 0.2)",
    padding: "2rem",
    zIndex: "1000000000",
  };

  container.setAttribute("type", "mugkey-keyboard-container");

  Object.assign(container.style, containerDefaultStyle);

  const keyboardElement = document.createElement("div");
  // style keyboard
  const keyboardDefaultStyle = {
    position: "relative",
    height: "100%",
    width: "50%",
    minWidth: "500px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  };

  Object.assign(keyboardElement.style, keyboardDefaultStyle);

  // build close keyboard button

  const closeElement = document.createElement("div");
  // style keyboard
  const closeElementStyle = {
    background: "rgba(0, 0, 0, 0.6)",
    color: "white",
    borderRadius: "50%",
    display: "flex",
    marginLeft: "2rem",
    marginTop: "-1rem",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
    width: "2.5rem",
    height: "2.5rem"
  };

  Object.assign(closeElement.style, closeElementStyle);
  closeElement.innerText = "×";
  container.appendChild(keyboardElement);
  container.appendChild(closeElement);

  const keyboardMap1 = [
    [
      { type: "key", value: "й" },
      { type: "key", value: "ц" },
      { type: "key", value: "у" },
      { type: "key", value: "к" },
      { type: "key", value: "е" },
      { type: "key", value: "н" },
      { type: "key", value: "г" },
      { type: "key", value: "ш" },
      { type: "key", value: "щ" },
      { type: "key", value: "з" },
      { type: "key", value: "х" },
    ],
    [
      { type: "key", value: "ф" },
      { type: "key", value: "ы" },
      { type: "key", value: "в" },
      { type: "key", value: "а" },
      { type: "key", value: "п" },
      { type: "key", value: "р" },
      { type: "key", value: "о" },
      { type: "key", value: "л" },
      { type: "key", value: "д" },
      { type: "key", value: "ж" },
      { type: "key", value: "э" },
    ],
    [
      { type: "func", value: "↑", func: "toUpper", width: 1 },
      { type: "key", value: "я" },
      { type: "key", value: "ч" },
      { type: "key", value: "с" },
      { type: "key", value: "м" },
      { type: "key", value: "и" },
      { type: "key", value: "т" },
      { type: "key", value: "ь" },
      { type: "key", value: "б" },
      { type: "key", value: "ю" },
      { type: "func", value: "‹", func: "backspace", width: 1 },
    ],
    [
      { type: "func", value: "?123", func: "toggleMap", width: 3 },
      { type: "key", value: "," },
      { type: "key", value: " ", width: 4 },
      { type: "key", value: "." },
      { type: "func", value: "↵", func: "break", width: 2 },
    ],
  ];

  mapToElements(keyboardMap1, keyboardElement);
}

function mapToElements(map, keyboardElement) {
  keyboardElement.innerHTML = null;
  map.forEach((row) => {
    const singleWidth = keyboardElement.clientWidth / 11;
    const singleHeight = keyboardElement.clientHeight / map.length;
    const container = document.createElement("div");
    const containerDefaultStyle = {
      display: "flex",
      width: "100%",
      justifyContent: "space-between",
      alignItems: "center",
    };
    Object.assign(container.style, containerDefaultStyle);
    container.setAttribute("type", "mugkey-keyboard-container");
    row.forEach((elem) => {
      const buttonElement = document.createElement("button");
      buttonElement.setAttribute("type", "button");
      buttonElement.setAttribute("button-type", "mugkey-button");
      if (elem.icon) buttonElement.innerHTML = `<i class="${elem.icon}"></i>`;
      else buttonElement.innerHTML = elem.value;

      if (!elem.width) elem.width = 1;

      // style button
      const buttonDefaultStyle = {
        width: singleWidth * elem.width - 2 + "px",
        height: singleHeight - 2 + "px",
        dropShadow: "none",
        borderRadius: "0.2rem",
        border: 0,
        margin: 0,
        padding: 0,
        fontSize: "1.4rem",
        background: "rgba(255, 255, 255, 0.9)",
        color: "rgba(0, 0, 0, 1)",
      };

      buttonElement.addEventListener("click", () => {
        if (elem.type === "func") {
          switch (elem.func) {
            case "break":
              fieldToWrite.value = fieldToWrite.value + "\n";
              break;
            case "backspace":
              fieldToWrite.value = fieldToWrite.value.slice(0, -1);
              break;
            case "toUpper":
              convertLetters("upper", map, () =>
                mapToElements(map, keyboardElement)
              );
              break;
            case "toLower":
              convertLetters("lower", map, () =>
                mapToElements(map, keyboardElement)
              );
              break;
            default:
              fieldToWrite.value = fieldToWrite.value + elem.value;
          }
        } else {
          fieldToWrite.value = fieldToWrite.value + elem.value;
        }
      });

      Object.assign(buttonElement.style, buttonDefaultStyle);
      container.appendChild(buttonElement);
    });
    keyboardElement.appendChild(container);
  });
}

function convertLetters(type, map, updateFunc) {
  map.forEach((row) => {
    row.forEach((elem) => {
      if (type === "upper") {
        console.log("toupper");
        if (elem.type === "key") {
          elem.value = elem.value.toUpperCase();
        } else {
          if (elem.func === "toUpper") {
            elem.func = "toLower";
            elem.value = "↓";
          }
        }
      } else {
        console.log("tolower");
        if (elem.type === "key") {
          elem.value = elem.value.toLowerCase();
        } else {
          if (elem.func === "toLower") {
            elem.func = "toUpper";
            elem.value = "↑";
          }
        }
      }
    });
  });
  updateFunc();
}
