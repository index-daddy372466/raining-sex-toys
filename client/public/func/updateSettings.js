let dialogbox = document.getElementById("dialog");
let pwfield = document.querySelector(".dialog-pw");
let submit = document.querySelector("#dialog-form>button");
import postFetch from "./postFetch.js";

const compareHeaderToBtn = (o, h) => o.includes(h);

const authenticateChange = async (setting) => {
  dialogbox.setAttribute("open", true);
  dialogbox.style = `position:absolute;left:${(window.innerWidth/2)-dialogbox.clientWidth}px;`
  let title = `Type in your <i style="font-size:18px;text-decoration:underline;">password</i> to update: <b style="color:red;">${setting}</b>`,
      para = dialogbox.children[0]
  para.innerHTML = title;
  submit.onclick = async (e) => {
    let payload = {
      password: document.querySelector("#dialog-form>input").value,
    };

    let authenticated = await postFetch("/read/auth/verify", payload)
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
