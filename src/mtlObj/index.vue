<script>
import { LoadingManager } from 'three'
import MTLLoader from '@/assets/three/loaders/MTLLoader'
import OBJLoader from '@/assets/three/loaders/OBJLoader'
import { Common } from '@/assets/mixins/common'
import { Group } from '@/assets/mixins/group'

export default {
  name: 'three-mtl-obj',
  mixins: [Common, Group],
  props: {
    baseUrl: String,
    mtlUrl: String,
    objUrl: String
  },
  created() {
    this.loadModel()
  },

  methods: {
    loadModel() {
      const { baseUrl, mtlUrl, objUrl } = this.mergeOption

      const manager = new LoadingManager()
      const mtlLoader = new MTLLoader(manager)

      if (baseUrl) {
        mtlLoader.setBaseUrl(baseUrl)
        mtlLoader.setPath(baseUrl)
      }

      mtlLoader.load(mtlUrl, materials => {
        materials.preload()

        const objLoader = new OBJLoader(manager)
        objLoader.setMaterials(materials)

        if (baseUrl) {
          objLoader.setPath(baseUrl)
        }

        objLoader.load(
          objUrl,
          group => {
            const _has = this.parentGroup.has
            if (_has) this.parentGroup.group.add(group)
            this.setGroup(group, _has)
          },
          this.onProgress,
          this.onError
        )
      })
    },

    reRender() {
      this.scene.remove(this.group)
      this.loadModel()
    },

    onProgress(xhr) {
      const percentComplete = (xhr.loaded / xhr.total) * 100
      this.$emit('progress', percentComplete)
    },

    onError(err) {
      this.$emit('error', err)
    }
  },

  watch: {
    $props: {
      handler() {
        this.reRender()
      },
      deep: true
    }
  }
}
</script>