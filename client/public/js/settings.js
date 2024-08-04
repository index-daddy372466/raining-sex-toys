const nav = document.querySelector("nav");
const edits = document.querySelectorAll(".edit-btn");

const disableInput = (arr) => {
  arr.forEach((btn, idx) => {
    let parent = btn.parentElement;
    let children = [...parent.children];
    let inputs = children.filter((element) => /input/.test(element.localName));
    inputs.every((input) => (input.disabled = true));
    if (/password/g.test(btn.id)) {
      inputs.map((x) => x.classList.add("no-display"));
    }
  });
};
const enableInput = (inputs, index) => {
  if (index == 2) {
    inputs.map((x) => {
      x.classList.remove("no-display");
      x.disabled = false;
    });
  } else {
    inputs.every((input) => {
      input.disabled = false;
    });
  }
};

edits.forEach((edit, index) => {
  edit.onclick = (e) => {
    // disable input
    let notTarget = [...edits].filter((ed, i) => i != index);
    disableInput(notTarget);

    // enable input
    let children = [...e.target.parentElement.children];
    let inputs = children.filter((element) => /input/.test(element.localName));
    enableInput(inputs, index);
  };
});
