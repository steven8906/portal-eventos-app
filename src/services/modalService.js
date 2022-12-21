export default {
    showModal: (id) => {
        const element = document.createElement("button")
        element.id = `show-btn-${id}`
        element.hidden = true
        element.setAttribute("data-target", `#${id}`)
        element.setAttribute("data-toggle", `modal`)
        document.querySelector(".main-panel").appendChild(element)
        element.click()
        element.remove()
    },
    hideModal: (id) => {
        const element = document.createElement("button")
        element.id = `dismiss-btn-${id}`
        element.hidden = true
        element.setAttribute("data-dismiss", "modal")
        document.getElementById(id).querySelector(".modal-footer").appendChild(element)
        element.click()
        element.remove()
    },
}
