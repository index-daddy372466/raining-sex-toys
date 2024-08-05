const nav = document.querySelector("nav");
const edits = document.querySelectorAll(".edit-btn");
import updateSettings from "../func/updateSettings.js";
// helper functions
const handleSubmit = (button) => {
  let options = ['name','email','password']
    updateSettings(button,options)
}
const disableInput = (arr) => {
  arr.forEach((btn, idx) => {
    let parent = btn.parentElement;
    let children = [...parent.children];
    let inputs = children.filter((element) => /input/.test(element.localName));
    inputs.every((input) => {
      input.disabled = true
      input.value = '';
    });
    if (/password/g.test(btn.id)) {
      inputs.map((x) => {
        x.classList.add("no-display")
        x.value = ''
      });
    }
    if(children[children.length-1].localName=='button'){
      let submit = children[children.length-1];
      parent.removeChild(submit)
    }
  });
};
const enableInput = (inputs, index) => {
  let button = document.createElement('button')
  button.textContent = 'Submit'
  button.classList.add('input-submit')
  let testButtonPresence = ([...inputs[0].parentElement.children].filter(x=>x.classList.contains('input-submit')).length<1)
  if(testButtonPresence){
    inputs[0].parentElement.appendChild(button);
    handleSubmit(button)
  }
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


// settings - on edit click
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
// settings - on window click
window.onclick = e => {
if(e.target.id=='settings-container'){
  disableInput(edits)
}
}