<template>
  <div class="home">

    <div class="form-group w-25">
      <div class="input-group">
        <input type="text" class="form-control" placeholder="Buscar..."
               @keyup="ev => filterSearch(ev, 'cliente', 'fecha')">
        <div class="input-group-append">
          <button class="btn btn-sm btn-primary" type="button"><i class="bx bx-search"></i></button>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-6 col-md-4 mb-3" v-for="(event, index) in events.data" :key="index">
        <div class="card p-3">
          <div class="card-body">
            <p class="mb-4"><b>{{ event.cliente }}</b></p>
            <p class="mb-2">{{ event.fecha }}</p>
            <p>Personas: {{ event.cantidad_persona }} - Cod. Reservación: {{ event.cod_reservaciones }}</p>
          </div>
          <div class="dropdown text-right">
            <button class="btn btn-danger btn-sm dropdown-toggle" type="button" :id="'actions'+ index" data-toggle="dropdown">
              <i class='bx bx-wrench'></i>
            </button>
            <div class="dropdown-menu">
              <h6 class="dropdown-header">Acciones</h6>
              <a class="dropdown-item" href="#" @click="copyLink(event.cod_reservaciones)"><i class='bx bx-copy' ></i> &nbsp;&nbsp;&nbsp; Copiar link de invitación</a>
              <RouterLink class="dropdown-item" :to="{ name:'invitations', params: { id:event.cod_reservaciones } }">
                <i class='bx bx-user-check' ></i> &nbsp;&nbsp;&nbsp; Confirmar asistencia de invitados
              </RouterLink>
            </div>
          </div>
          <div class="clearfix"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import httpService from "@/services/httpService";
import {mapMutations} from "vuex";
import md5 from "blueimp-md5";

export default {
  name: 'HomeView',
  data:()=>({
    events         :{},
    originalEvents :{},
  }),
  mounted() {
    this.getEvents();
  },
  methods:{
    ...mapMutations(['SET_EVENT_LIST']),
    filterSearch(ev, ...args) {
      this.events = [...this.originalEvents.data]
      if (ev.target.value !== "") {
        let dataFounded = []
        args.forEach(arg => {
          this.originalEvents.data.forEach(x => {
            const dataResult = {...x}
            const argument = arg.split(".")
            argument.forEach(item => x = x[item])
            x?.toString().toLowerCase().indexOf(ev.target.value.toString().toLowerCase()) > -1 && dataFounded.push(dataResult)
          })
        })
        this.events = {data: [...dataFounded]}
      }else{
        this.events = {...this.originalEvents}
      }
    },
    getEvents(){
      httpService.get("events", false)
          .then(res => {
            this.events         = res;
            this.originalEvents = res;
            this.SET_EVENT_LIST(res);
          })
    },
    copyLink(cod){
      const link = `${window.location.origin}/confirmar-asistencia/${md5(cod)}`;
      if(window.isSecureContext){
        navigator?.clipboard?.writeText(link);
      }else {
        alert(link);
      }
    }
  }
}
</script>
