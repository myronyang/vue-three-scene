<script>
import * as THREE from 'three'
import { Common } from '@/assets/mixins/common'

export default {
  name: 'three-light',
  mixins: [Common],
  props: {
    type: String,
    args: Array,
    position: Array,
    option: Object
  },

  created() {
    const { type, args, position } = this.mergeOption

    const light = new THREE[type](...args)

    if (position) {
      light.position.set(...position)
    }

    this.scene.add(light)
  }
}
</script>