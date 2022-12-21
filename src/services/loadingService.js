export default {
    show:()=> {
        const loading = document.querySelector(".container-loading")
        loading.style.display = 'table'
        loading.style.opacity = 1
    },
    hide:()=> {
        const loading = document.querySelector(".container-loading")
        setTimeout(()=>{
            loading.addEventListener("transitionend", ()=> loading.style.display = 'none')
            loading.style.opacity = 0
        }, 1000)
    }
}
