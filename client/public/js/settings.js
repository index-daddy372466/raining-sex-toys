const nav = document.querySelector("nav");
const edits = document.querySelectorAll(".edit-btn");

edits.forEach((edit, index) => {
  let input;
  input = [...edit.parentElement.children][
    edit.parentElement.children.length - 1
  ];
  edit.onclick = (e) => {
    let header = e.target.parentElement.children[1];
    let pwInputs = [...edit.parentElement.children].slice(-3);
    if (header.textContent == "Password") {
      pwInputs.forEach((pw) => pw.classList.remove("no-display"));
    }

    input.disabled = false;
    input.value = input.placeholder;
  };
});
