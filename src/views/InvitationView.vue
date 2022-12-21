<template>
  <div class="row">
    <div class="col-sm-12 col-md-6">
      <div class="form-group w-100">
        <div class="input-group">
          <input type="text" class="form-control" placeholder="Buscar..."
                 @keyup="ev => filterSearch(ev, 'nombres_apellidos')">
          <div class="input-group-append">
            <button class="btn btn-sm btn-primary" type="button"><i class="bx bx-search"></i></button>
          </div>
        </div>
      </div>
    </div>
    <div class="col-sm-12">&nbsp;</div>
    <div class="col-md-6 stretch-card grid-margin">
      <div class="card">
        <div class="card-body">
          <p class="card-title">Invitados</p>
          <ul class="icon-data-list w-100" v-if="guests.filter(x => x.cod_reservaciones === this.id.toString()).length > 0">
            <li v-for="(invitation, index) in guests.filter(x => x.cod_reservaciones === this.id.toString())" :key="index">
              <div class="d-flex">
                <img src="../assets/images/avatar.png" alt="user">
                <div class="w-100">
                  <div class="badge badge-warning mb-3" v-if="invitation.confirmo_invitacion === 'NO'">Confirmo invitación: No</div>
                  <div class="badge badge-success mb-3" v-else>Confirmo invitación: Sí</div>
                  <p class="text-info mb-1">{{ invitation.nombres_apellidos }}</p>
                  <br/>
                  <small>Fecha vigencia: {{ moment(invitation.fec_vigencia).locale("es").format("LLL") }}</small>
                  <br/>
                  <small>Teléfono: {{invitation.telefono_invitado }}</small>
                  <br/>
                  <small>Observaciones: {{invitation.obs }}</small>
                  <div class="text-right" v-if="invitation.asistio_evento === 'NO'">
                    <button type="button"
                            data-toggle="modal"
                            data-target="#modal-confirm"
                            v-if="invitation.confirmo_invitacion === 'NO'"
                            @click="guestConfirm = invitation"
                            class="btn btn-social-icon btn-outline-success"> <i class='bx bx-check-double' /></button>
                  </div>
                  <br/>
                  <div class="badge badge-success mb-3" v-if="invitation.asistio_evento=== 'SI'">Asistió al evento: Sí</div>
                </div>
              </div>
              <hr v-if="index < guests.filter(x => x.cod_reservaciones === this.id.toString()).length - 1"/>
            </li>
          </ul>
          <p v-else>Sin invitados para listar en éste evento.</p>
        </div>
      </div>
    </div>
    <div class="col-sm-12 col-md-4">
      <div class="card card-tale">
        <div class="card-body">
          <p class="mb-4"><b>{{ event.cliente }}</b></p>
          <p class="mb-2">{{ event.fecha }}</p>
          <p>Personas: {{ event.cantidad_persona }} - Cod. Reservación: {{ event.cod_reservaciones }}</p>
        </div>
      </div>
    </div>
    <br/>
  </div>
  <modal-component id-modal="modal-confirm" title="Confirmar asistencia">
    <template v-slot:modal-body>
      <p>¿Desea confirmar la asistencia del invitad@ {{guestConfirm.nombres_apellidos}}?</p>
    </template>
    <template v-slot:modal-footer>
      <button type="submit" class="btn btn-primary" @click="sendConfirm">Ok</button>
    </template>
  </modal-component>
</template>

<script>
import {mapGetters} from "vuex";
import httpService from "@/services/httpService";
import moment from "moment";
import modalComponent from "@/components/ModalComponent";
import modalService from "@/services/modalService";

export default {
  name   : "InvitationView",
  props  : ['id'],
  data:()=>({
    moment,
    event        :{},
    guests       : [],
    guestOriginal : [],
    guestConfirm : {},

  }),
  components:{modalComponent},
  computed:{...mapGetters(['getEventList'])},
  mounted() {
    this.getInvitationList();
  },
  methods:{
    filterSearch(ev, ...args) {
      this.guests = [...this.guestOriginal]
      if (ev.target.value !== "") {
        let dataFounded = []
        args.forEach(arg => {
          this.guestOriginal.forEach(x => {
            const dataResult = {...x}
            const argument = arg.split(".")
            argument.forEach(item => x = x[item])
            x?.toString().toLowerCase().indexOf(ev.target.value.toString().toLowerCase()) > -1 && dataFounded.push(dataResult)
          })
        })
        this.guests = [...dataFounded]
      }else{
        this.guests = [...this.guestOriginal]
      }
    },
    getInvitationList(){
      this.event = this.getEventList.data.find(x => x.cod_reservaciones === this.id.toString());
      httpService.get("guests", false)
          .then(res => {
            this.guests = res.data;
            this.guestOriginal = res.data;
          })
    },
    sendConfirm(){
      httpService.post("confirm", {...this.guestConfirm})
          .then(()=> {
            this.guestConfirm = {};
            this.getInvitationList();
            modalService.hideModal("modal-confirm");
          })
    }
  }
}
</script>
