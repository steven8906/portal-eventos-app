import { useToast } from 'vue-toastification'

const toast = useToast()
export default {
    success:(text = "Solicitud exitosa.")=> toast.success(text),
    error: (text = "Ha ocurrido un error interno, por favor inténtenlo más tarde.") => toast.error(text)
}
