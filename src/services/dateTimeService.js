import moment from "moment";
export default {
    formats:{
        spanish: "LLL"
    },
    formatDate:(dateTime, formatType)=> {
        const date = moment(dateTime).locale("es").format(formatType);
        let auxDateCompleted = null;
        if(dateTime){
            const auxDate = dateTime.split(" ")[0];
            const auxHour = dateTime.split(" ")[1];
            const auxAMPM = dateTime.split(" ")[2];
            auxDateCompleted = moment(auxDate, auxHour + ' ' + auxAMPM).locale("es").format("LLL")
        }


        return date === "Fecha inválida" ? auxDateCompleted : date;
    },
    getMoment: function (){
        return moment().locale("es")
    }
}
