<template>
<div ref="root" class="usj-switch" :class="classes">
    <input ref="native"
           type="checkbox"
           class="usj-switch__native-control"
           @change="fireEvent"
           :checked="value"
          :id="id"
          :aria-labelledby="labelId"
           />
    <div class="usj-switch__background">
      <div class="usj-switch__knob"></div>
    </div>
</div>
</template>

<script lang="babel">
import { MDCCheckboxFoundation } from '@material/checkbox'
const { ANIM_END_EVENT_NAME } = MDCCheckboxFoundation.strings
export default {
  props: ['id', 'labelId', 'value'],
  data () {
    return {
      classes: {},
      changeHandlers: [],
      foundation: null
    }
  },
  mounted () {
    let vm = this
    this.foundation = new MDCCheckboxFoundation({
      addClass (className) {
        vm.$set(vm.classes, className, true)
      },
      removeClass (className) {
        vm.$delete(vm.classes, className)
      },
      registerChangeHandler (handler) {
        vm.changeHandlers.push(handler)
      },
      deregisterChangeHandler (handler) {
        let index = vm.changeHandlers.indexOf(handler)
        if (index >= 0) {
          vm.changeHandlers.splice(index, 1)
        }
      },
      registerAnimationEndHandler (handler) {
        vm.$refs.root.addEventListener(ANIM_END_EVENT_NAME, handler)
      },
      deregisterAnimationEndHandler (handler) {
        vm.$refs.root.removeEventListener(ANIM_END_EVENT_NAME, handler)
      },
      getNativeControl () {
        return vm.$refs.native
      },
      isAttachedToDOM () {
        return Boolean(vm.$el)
      }
    })
    this.foundation.init()
  },
  beforeUnmount () {
    this.foundation.destroy()
  },
  methods: {
    fireEvent (event) {
      this.changeHandlers.forEach((h) => h(event))
      this.$emit('input', event.target.checked)
    }
  }
}
</script>
