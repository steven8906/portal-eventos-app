<template>
  <div class="assistance__layout d-flex align-items-center p-sm-1 p-md-5">
    <div class="container-fluid ">
      <div class="card">
        <div class="card-body p-5">
          <div class="p-3">
            <div class="d-flex">
              <div class="w-50">
                <h1>Viva Eventos</h1>
              </div>
            </div>
          </div>
          <br/>
          <br/>
          <p class="mt-5 px-3 text-primary d-block" style="font-size: 3rem"><b>Confirma tu asistencia.</b></p>
          <div class="mt-3 p-3">
            <p class="text-muted" style="font-size: 1.2rem"><b>Aquí podrás confirmar tu asistencia al evento.</b></p>
          </div>
          <div class="col-sm-12 col-md-3 mt-2 p-3 px-4">
            <div class="form-group w-100">
              <label><b>Confirma con número de teléfono</b></label>
              <div class="input-group">
                <input type="tel"
                       class="form-control"
                       name="tel"
                       placeholder="Buscar con número de teléfono..."
                       data-number="true"
                       v-model="model.tel"
                       :data-number-msg="validatorMessages.NUMBER"
                       @blur="findGuests">
                <div class="input-group-append">
                  <button class="btn btn-sm btn-primary" type="button" @click="findGuests"><i class="bx bx-search"></i></button>
                </div>
              </div>
              <transition>
                <div v-if="Object.keys(founded).length > 0" class="mt-2 bg-light rounded p-3 founded">
                  <ul class="icon-data-list w-100">
                    <li>
                      <div class="d-flex">
                        <img src="../assets/images/avatar.png" alt="user">
                        <div>
                          <p class="text-info mb-1">Nombre: {{ founded.nombres_apellidos }}</p>
                          <p class="mb-0">Teléfono: {{ founded.telefono_invitado }}</p>
                          <small>Vigencia: {{ founded.fec_vigencia }}</small>
                        </div>
                      </div>
                      <br/>
                      <button class="btn btn-sm btn-primary float-right" @click="sendConfirm">Comfirmar asistencia</button>
                      <span class="clearfix"></span>
                    </li>
                  </ul>
                </div>
              </transition>
            </div>
          </div>
          <div class="row justify-content-center w-100 align-items-center">
            <div class="col-sm-12">&nbsp;</div>
            <div class="col-sm-12 col-md-6">
              <div class="d-flex justify-content-around" style="gap: 2rem">
                <div class="d-flex align-items-center" style="gap: 1rem">
                  <div class="p-3 rounded-circle" style="background-color: #D5FFF0">
                    <i class='bx bx-calendar-check' style="font-size: 2rem; color: #00B073"></i>
                  </div>
                  <div class="d-flex flex-column justify-content-center">
                    <p class="card-title" style="margin: 0!important;">Fecha del evento</p>
                    <p class="text-muted"><b>{{ event.fecha }}</b></p>
                  </div>
                </div>
                <div class="d-flex align-items-center" style="gap: 1rem">
                  <div class="p-3 rounded-circle" style="background-color: #D5FFF0">
                    <i class='bx bx-info-circle' style="font-size: 2rem; color: #00B073"></i>
                  </div>
                  <div class="d-flex flex-column justify-content-center">
                    <p class="card-title" style="margin: 0!important;">Importante</p>
                    <p class="text-muted"><b>{{ event.obs }}</b></p>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-12 col-md-6">
              <img src="../assets/images/invitacion.webp" alt="" class="d-block w-50 m-auto"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <loading-component/>
</template>
<script>
import md5 from "blueimp-md5";
import httpService from "@/services/httpService";
import LoadingComponent from "@/components/LoadingComponent";
import validatorService, {validatorMessages} from "@/services/validatorService";
import toastService from "@/services/toastService";

const fieldsToValidate = [
  "tel",
]

export default {
  name: "AssistanceConfirmView",
  data: () => ({
    md5,
    validatorService,
    validatorMessages,
    event   : {},
    guests  : [],
    model   : {},
    founded : {},
  }),
  watch: {
    ...validatorService.init(fieldsToValidate),
  },
  components: {LoadingComponent},
  props: ['id'],
  mounted() {
    this.getEvents();
    this.getGuests();
  },
  methods: {
    getEvents() {
      httpService.get("events", false)
          .then(res => this.event = res.data.find(x => md5(x?.cod_reservaciones) === this.id))
    },
    getGuests() {
      httpService.get("guests", false)
          .then(res => this.guests = res.data)
    },
    findGuests(){
      const founded = this.guests.find(x => x.telefono_invitado === this.model.tel && md5(x.cod_reservaciones) === this.id && x.confirmo_invitacion === "NO");
      this.founded = founded ?? {};
      Object.keys(this.founded).length === 0 && toastService.error("Número celular no encontrado en el evento.")
    },
    sendConfirm(){
      httpService.post("confirm-invitation", {...this.founded})
          .then(()=> {
            alert("Gracias por confirmar su invitación " + this.founded.nombres_apellidos)
            this.founded = {};
            this.model = {};
            this.getEvents();
            this.getGuests();
          })
    }
  }
}
</script>

<style scoped>
.assistance__layout {
  height           : 100vh;
  width            : 100vw;
  background-color : #E4E8EA;
  overflow-y       : auto;
}

p {
  font-size     : 0.875rem;
  margin-bottom : 0.5rem;
  line-height   : 2.5rem;
}
.founded{
  transition: .3s;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
