<script>
import * as THREE from 'three'
import { Common } from '@/assets/mixins/common'

export default {
  name: 'three-camera',
  mixins: [Common],
  props: {
    type: {
      type: String,
      default: 'PerspectiveCamera'
    },
    args: Array,
    position: Object,
    option: Object
  },
  created() {
    const { type, args, position } = this.mergeOption

    this.scene._camera = new THREE[type](...args)

    this.scene._camera.position.set(...position)
    this.scene.add(this.scene._camera)
  }
}
</script>