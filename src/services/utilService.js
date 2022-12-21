export default {
    formatCurrency: value => value?.toLocaleString('es-CO', {
        style: 'currency',
        currency: 'COP',
    })
}