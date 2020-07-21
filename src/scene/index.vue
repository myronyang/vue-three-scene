<script>
import * as THREE from 'three'
import { Scene3d } from '@/assets/script/scene3d'
import MTLLoader from '@/assets/three/loaders/MTLLoader'
import OBJLoader from '@/assets/three/loaders/OBJLoader'

const DEFAULT_MODULES = ['three-camera', 'three-light', 'three-controls']

export default {
  name: 'three-scene',
  props: {
    width: {
      type: Number,
      default: 800
    },
    height: {
      type: Number,
      default: 500
    },
    backgroundColor: {
      type: Number,
      default: 0x1b93d5
    },
    option: Object
  },

  data () {
    return {
      scene: null
    }
  },

  mounted () {
    const option = Object.assign({ ...this.$props }, this.option)
    const { width, height, backgroundColor, gridHelper } = option

    this.scene = new Scene3d({
      container: this.$refs.scene,
      backgroundColor: backgroundColor,
      width: width,
      height: height
    })

    if (gridHelper) {
      const { size, divisions, colorCenterLine, colorGrid } = gridHelper
      const _gridHelper = new THREE.GridHelper(
        size,
        divisions,
        colorCenterLine,
        colorGrid
      )
      this.scene.add(_gridHelper)
    }

    setTimeout(() => {
      this.setDefaultModule()
    }, 0)
  },
  methods: {
    setDefaultModule () {
      const components = []

      this.$children.forEach(child => {
        components.push(child.$options.name)
      })

      const modules = DEFAULT_MODULES.filter(item => {
        const index = components.indexOf(item)
        return index === -1
      })

      modules.forEach(item => {
        switch (item) {
          case 'three-controls':
            this.scene.initControls()
            break
          case 'three-light':
            this.scene.initLight()
            break
          case 'three-camera':
            this.scene.initCamera()
            break
        }
      })
    }
  },

  render (h) {
    return (
      <div class="three-scene" ref="scene">
        {this.scene ? this.$slots.default : ''}
      </div>
    )
  }
}
</script>