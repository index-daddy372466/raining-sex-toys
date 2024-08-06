import updateSettings from "../func/updateSettings.js";
const edits = document.querySelectorAll(".edit-btn");
const dialogbox = document.getElementById("dialog");
const pwfield = document.querySelector(".dialog-pw");

// const nav = document.querySelector("nav");
// const dialogbox = document.getElementById('dialog')
// const settingsWrapper = document.querySelector('#settings-wrapper')

// helper functions

// handle submit on on edit
const handleSubmit = (button) => {
  let options = ["name", "email", "password"];
  updateSettings(button, options);
};

// disable edit
const disableEdit = (arr) => {
  arr.forEach((btn, idx) => {
    let parent = btn.parentElement;
    let children = [...parent.children];
    let inputs = children.filter((element) => /input/.test(element.localName));
    inputs.every((input) => {
      input.disabled = true;
      input.value = "";
    });
    if (/password/g.test(btn.id)) {
      inputs.map((x) => {
        x.classList.add("no-display");
        x.value = "";
      });
    }
    if (children[children.length - 1].localName == "button") {
      let submit = children[children.length - 1];
      parent.removeChild(submit);
    }
  });
};

// enable edit
const enableEdit = (inputs, index) => {
  let button = document.createElement("button");
  button.textContent = "Submit";
  button.classList.add("input-submit");
  let testButtonPresence =
    [...inputs[0].parentElement.children].filter((x) =>
      x.classList.contains("input-submit")
    ).length < 1;
  if (testButtonPresence) {
    inputs[0].parentElement.appendChild(button);
    handleSubmit(button);
  }
  if (index == 2) {
    // After pressing edit button, configure focus dependent on previous inputs' value
    inputs.map((x, y) => {
      x.classList.remove("no-display");
      x.disabled = false;
      if (y == 0 && inputs[0].value.length < 1) {
        inputs[y].focus();
      } else if (y == 1 && inputs[0].value.length > 0) {
        inputs[y].focus();
      } else {
        if (y == 2 && inputs[1].value.length > 0) {
          inputs[y].focus();
        }
      }
    });
  } else {
    inputs.every((input) => {
      input.disabled = false;
      input.focus();
    });
  }
};

// settings - on edit click
edits.forEach((edit, index) => {
  edit.onclick = (e) => {
    // disable input
    let notTarget = [...edits].filter((ed, i) => i != index);
    disableEdit(notTarget);

    // enable input
    let children = [...e.target.parentElement.children];
    let inputs = children.filter((element) => /input/.test(element.localName));
    enableEdit(inputs, index);
  };
});

// settings - on window click
window.onclick = (e) => {
  // if window click-target is equal to settings container , disable edits (UI)
  if (e.target.id == "settings-container") {
    disableEdit(edits);
    dialogbox.removeAttribute("open");
  }
};
