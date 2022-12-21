<template>  <!-- Modal -->
  <div class="modal fade" :id="idModal" tabindex="-1" role="dialog">
    <div :class="`modal-dialog ${'modal-' + size ?? ''}`" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{title}}</h5>
          <button type="button" class="close" data-dismiss="modal">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <slot name="modal-body"></slot>
        </div>
        <div class="modal-footer">
          <slot name="modal-footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalComponent",
  props: ["idModal", "title", "size"]
}
</script>
