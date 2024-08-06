let dialogcontainer = document.getElementById("dialog-container");
let dialogbox = document.getElementById("dialog");
let pwfield = document.querySelector(".dialog-pw");
let submit = document.getElementById("submit-btn");
let cancel = document.getElementById("cancel-btn");
const verifyMe = "/update/auth/verify";
import postFetch from "./postFetch.js";

const compareHeaderToBtn = (o, h) => o.includes(h);

const authenticateChange = async (setting) => {
  dialogbox.setAttribute("open", true);
  dialogcontainer.classList.remove("no-display");
  dialogcontainer.classList.add("add-flex");
  dialogbox.style = `position:fixed;left:${
    dialogbox.parentElement.clientWidth / 2 - dialogbox.clientWidth / 2
  }px`;
  let title = `Type in your <i style="font-size:18px;text-decoration:underline;">password</i> to update: <b style="color:red;">${setting}</b>`,
    para = dialogbox.children[0];
  para.innerHTML = title;

  submit.onclick = async (e) => {
    dialogcontainer.classList.add("no-display");
    dialogcontainer.classList.remove("add-flex");
    let payload = {
      password: document.querySelector("#dialog-form>input").value,
    };
    console.log(payload)
    await postFetch(verifyMe, payload)
  };
  cancel.onclick = (e) => {
    e.preventDefault();
    dialogcontainer.classList.add("no-display");
    dialogcontainer.classList.remove("add-flex");
    dialogbox.removeAttribute("open");
  };
  pwfield.value = "";
};

const settingsController = (setting, inputs) => {
  // authenticate after changing a setting
  // spawn modal
  authenticateChange(setting);
};
export default function updateSettings(btn, option) {
  btn.onclick = async (e) => {
    let inputs = [...e.target.parentElement.children].filter((x, y) =>
        /input/.test(x.localName)
      ),
      payload = {},
      setting;
    let names = inputs.map((n) => n.name);
    names.forEach((name, idx) => (payload[name] = inputs[idx].value));
    await postFetch("/read/set-aside", payload)

    let inputsCompleted = inputs.every((input) => input.value.length > 0);
    let header = [
      ...e.target.parentElement.children,
    ][1].textContent.toLowerCase();
    if (compareHeaderToBtn(option, header) && inputsCompleted) {
      setting = header;
      if (/password/i.test(inputs[0].parentElement.children[1].textContent)) {
        if (inputs[0].value != inputs[1].value) {
          console.log('new & confirm does not match')
          inputs.forEach(i=>i.value='')
          inputs[0].focus();
          return null;
        } else {
          settingsController(setting, inputs);
          setTimeout(() => {
            pwfield.focus();
          }, 50);
        }
      }
      else{
        settingsController(setting, inputs);
        setTimeout(() => {
          pwfield.focus();
        }, 50);
      }
    }
  };
}
