let dialogbox = document.getElementById("dialog");
let pwfield = document.querySelector(".dialog-pw");
let submit = document.querySelector("#dialog-form>button");
import postFetch from "./postFetch.js";

const compareHeaderToBtn = (o, h) => o.includes(h);
const authenticateChange = async (setting) => {
  dialogbox.setAttribute("open", true);
  let title = `Verify password to update: ${setting}`,
    para = dialogbox.children[0],
    authenticated;
  para.textContent = title;
  submit.onclick = async (e) => {
    let payload = {
      password: document.querySelector("#dialog-form>input").value,
    };

    authenticated = await postFetch("/read/auth/verify", payload)
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
        return data.verified;
      });
    pwfield.value = "";
  };
};

const settingsController = (setting, inputs) => {
  // authenticate after changing a setting
  // spawn modal
  authenticateChange(setting);
};
export default function updateSettings(btn, option) {
  let setting;
  btn.onclick = (e) => {
    let inputs = [...e.target.parentElement.children].filter((x, y) =>
      /input/.test(x.localName)
    );
    let inputsCompleted = inputs.every((input) => input.value.length > 0);
    let header = [
      ...e.target.parentElement.children,
    ][1].textContent.toLowerCase();
    if (compareHeaderToBtn(option, header) && inputsCompleted) {
      setting = header;
      settingsController(setting, inputs);
    }
  };
}
