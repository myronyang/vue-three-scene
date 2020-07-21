<script>
import OrbitControls from '@/assets/three/controls/OrbitControls'
import { Common } from '@/assets/mixins/common'

export default {
  name: 'three-controls',
  mixins: [Common],
  props: {
    type: {
      type: String,
      default: 'OrbitControls'
    },
    option: Object
  },
  created() {
    const { type } = this.mergeOption
    
    switch (type) {
      case 'OrbitControls':
        this.scene._controls = new OrbitControls(
          this.scene._camera,
          this.scene._renderer.domElement
        )
        break
    }
  }
}
</script>