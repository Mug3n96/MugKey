document.querySelector("head").append(
  `<script src="https://kit.fontawesome.com/6e0b41a7b2.js"
      crossorigin="anonymous"
      ></script>`
);

const bodyElement = document.querySelector("html");
const keyboardContainerElement = document.createElement("div");

let fieldToWrite = null;

bodyElement.append(keyboardContainerElement);
buildKeyboard(keyboardContainerElement);

bodyElement.addEventListener("click", (e) => {
  if (
    e.target.getAttribute("type") === "button" ||
    e.target.tagName !== ("TEXTAREA" && "INPUT")
  )
    return;
  fieldToWrite = e.target;
  console.log(fieldToWrite);
});

function buildKeyboard(container) {
  // style container
  const containerDefaultStyle = {
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100vw",
    height: "40vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "rgba(0, 0, 0, 0.2)",
    padding: "2rem",
    zIndex: "1000000000",
  };

  Object.assign(container.style, containerDefaultStyle);

  const keyboardElement = document.createElement("div");
  // style keyboard
  const keyboardDefaultStyle = {
    height: "100%",
    width: "50%",
    minWidth: "500px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  };

  Object.assign(keyboardElement.style, keyboardDefaultStyle);

  container.appendChild(keyboardElement);

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
  keyboardElement.innerHTML = "";
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
    row.forEach((elem) => {
      const buttonElement = document.createElement("button");
      buttonElement.setAttribute("type", "button");
      buttonElement.setAttribute("button-type", "vb");
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
