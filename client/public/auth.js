const form = document.querySelector('form')
let children = [...form.children]
console.log(children)

// focus on first input of form
window.onload = e => {
    children[0].focus()
}