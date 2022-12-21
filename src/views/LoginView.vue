<template>
  <div class="container-scroller">
    <div class="container-fluid page-body-wrapper full-page-wrapper">
      <div class="content-wrapper d-flex align-items-center auth px-0">
        <div class="row w-100 mx-0">
          <div class="col-lg-4 mx-auto">
            <div class="auth-form-light text-left py-5 px-4 px-sm-5">
              <div class="brand-logo">
                <img src="../assets/login.png" alt="logo">
              </div>
              <h6 class="font-weight-light">Ingrese sus datos para continuar.</h6>
              <form class="pt-3" ref="form-login">
                <div class="form-group">
                  <input type="text" class="form-control"
                         name="userName"
                         placeholder="Nombre de usuario"
                         data-required="true"
                         :data-required-msg="validatorMessages.REQUIRED"
                         v-model.trim="model.userName">
                </div>
                <div class="form-group">
                  <input type="password" class="form-control"
                         name="password"
                         placeholder="Password"
                         data-required="true"
                         :data-required-msg="validatorMessages.REQUIRED"
                         v-model.trim="model.password">
                </div>
                <div class="mt-3">
                  <button type="button" class="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                          @click="login">INGRESAR
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <!-- content-wrapper ends -->
    </div>
    <!-- page-body-wrapper ends -->
  </div>
</template>

<script>
import validatorService, {validatorMessages} from "@/services/validatorService";
import {mapMutations} from "vuex";
import toastService from "@/services/toastService";

const fieldsToValidate = [
  "userName",
  "password",
]

export default {
  name: "LoginView",
  data: () => ({
    model: {},
  }),
  watch: {
    ...validatorService.init(fieldsToValidate),
  },
  computed: {
    validatorMessages() {
      return validatorMessages
    }
  },
  methods: {
    ...mapMutations(['SET_AUTH']),
    login() {
      if (!validatorService.validateAll(fieldsToValidate)) return;

      if (this.model.userName !== "admin" || this.model.password !== "12345") toastService.error("Error de autenticación");
      else {
        this.SET_AUTH({userName: this.model.userName})
        this.$router.push({name: 'home'})
        toastService.success("Autenticación exitosa, Bienvenid@")
      }
    },
  }
}
</script>
<style scoped>
.auth .brand-logo {
  margin-bottom: 0 !important;
}
</style>
