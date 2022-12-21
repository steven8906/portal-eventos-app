const lengthTypes = {
    text     : true,
    number   : false,
    email    : true,
    password : true,
    checkbox : true,
    date     : true,
}

function isNullUndefinedEmpty(element){
    return Object.is(element, null)
}

function handleChecks(element, checkValid = false) {
    let toReturn = [];

    if (Object.keys(element.dataset)?.includes("required") && (element?.type in lengthTypes))
        if (element.dataset["required"] === 'true') toReturn = [...toReturn, checkRequired(element)]

    if (Object.keys(element.dataset)?.includes("required") && (element?.type?.indexOf("select") >= 0) && checkValid)
        if (element.dataset["required"] === 'true') toReturn = [...toReturn, checkRequiredSelect(element)]

    if (Object.keys(element.dataset)?.includes("required") && (element?.type?.indexOf("checkbox") >= 0) && checkValid){
        if (element.dataset["required"] === 'true') toReturn = [...toReturn, checkRequiredCheckbox(element)]
    }

    if (Object.keys(element.dataset)?.includes("number") && (element.dataset["number"] === 'true')) toReturn = [...toReturn, checkNumber(element)]

    if (Object.keys(element.dataset)?.includes("regex") && (element.dataset["regex"].length > 0)) toReturn = [...toReturn, checkRegex(element)]

    if (Object.keys(element.dataset)?.includes("if") && (element.dataset["if"].length > 0)) toReturn = [...toReturn, checkIf(element)]

    return !toReturn.includes(false)
}

function checkRequired(element) {
    if (element.value.length > 0) {
        const elementToChange = removeInvalid(element.name)
        hideMsg(elementToChange, "required")
    } else {
        const elementToChange = addIsInvalid(element.name)
        showMsg(elementToChange, element.dataset["requiredMsg"], "required")
        return false
    }
    return true
}

function checkRequiredCheckbox(element) {
    if (element.checked) {
        const elementToChange = removeInvalid(element.name)
        hideMsg(elementToChange, "required")
    }
    else {
        const elementToChange = addIsInvalid(element.name)
        showMsg(elementToChange, element.dataset["requiredMsg"], "required")
        return false
    }
    return true
}

function checkRequiredSelect(element) {
    if (element.selectedIndex === 0 || element.value === "") {
        const elementToChange = addIsInvalid(element.name)
        showMsg(elementToChange, element.dataset["requiredMsg"], "required")
        document.querySelector(`select[name=${element.name}]`).addEventListener("change", e => {
            if (e.target.selectedIndex > 0) {
                const elementToChange = removeInvalid(element.name)
                hideMsg(elementToChange, "required")
                return true
            }
        })
        return false
    }
}

function checkNumber(element) {
    if (!(element.value.match(/^\d*$/)?.length > 0)) {
        // element.value = element.value.replace(/\D+/g, '')
        addIsInvalid(element.name)
        showMsg(element, element.dataset["numberMsg"], "number")
        element.addEventListener("blur", () => {
            const elementMsg = document.getElementById(`data-number-msg-${element.name}`)
            !isNullUndefinedEmpty(elementMsg) && element.parentNode.removeChild(elementMsg)
            element.dataset["required"] === 'true' && checkRequired(element)
        })
        return false
    } else {
        const elementMsg = document.getElementById(`data-number-msg-${element.name}`)
        !isNullUndefinedEmpty(elementMsg) && element.parentNode.removeChild(elementMsg)
        return true
    }
}

function checkRegex(element) {
    const regex = new RegExp(element.dataset["regex"])

    if (regex.test(element.value)) {
        removeInvalid(element.name)
        hideMsg(element, "regex")
        return true
    } else {
        addIsInvalid(element.name)
        showMsg(element, element.dataset["regexMsg"], "regex")
        return false
    }
}

function checkIf(element) {
    if (element.dataset["if"] === "false") {
        addIsInvalid(element.name)
        showMsg(element, element.dataset["ifMsg"], "if")
        return false
    } else {
        removeInvalid(element.name)
        hideMsg(element, "if")
        return true
    }
}

function addIsInvalid(name) {
    const elementToChange = document.querySelector(`[name=${name}]`)
    elementToChange.classList.add("is-invalid")
    // elementToChange.classList.remove("is-valid")
    return elementToChange
}

function removeInvalid(name) {
    const elementToChange = document.querySelector(`[name=${name}]`)
    elementToChange.classList.remove("is-invalid")
    // elementToChange.classList.add("is-valid")
    return elementToChange
}

function showMsg(element, msg, type) {
    const elementFounded = document.getElementById(`data-${type}-msg-${element.name}`)
    if (isNullUndefinedEmpty(elementFounded)) {
        let elementMsg = document.createElement("span")
        elementMsg.setAttribute("id", `data-${type}-msg-${element.name}`)
        elementMsg.classList.add("text-danger")
        elementMsg.classList.add("float-start")
        elementMsg.classList.add("d-block")
        elementMsg.innerText = msg
        element.parentElement.appendChild(elementMsg)
    }
}

function hideMsg(element, type) {
    const elementToChange = document.querySelector(`[name=${element.name}]`)
    const elementMsg = document.getElementById(`data-${type}-msg-${element.name}`)
    !isNullUndefinedEmpty(elementMsg) && elementToChange.parentElement.removeChild(elementMsg)
}

export default {
    init: function (fields = [], resetWatcher) {
        let watchers = {}
        fields.forEach(field => {
            watchers = {
                ...watchers, ['model.'+ field]: {
                    deep      : true,
                    handler(/*newValue, oldValue*/) {
                        !resetWatcher && handleChecks(document.querySelector(`[name=${field}]`), true)
                    }
                }
            }
        })
        return watchers
    },
    validateAll: function (elements = []){
        return !elements.map(element => handleChecks(document.querySelector(`[name=${element}]`), true)).includes(false)
    },
    reset: function (model){
        Object.keys(model).forEach(field => {
            const element = document.querySelector(`[name=${field}]`)
            element !== undefined && element !== null && (()=> element.value = model[field])()
        });
    }
}

export const validatorMessages = {
    REQUIRED : "Campo requerido.",
    NUMBER   : "Sólo se permiten caracteres numéricos.",
    EMAIL    : "Debe ingresar un e-mail válido.",
}

export const regexValidator = {
    URL: "[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)"
}