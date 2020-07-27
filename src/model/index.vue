<script>
import * as THREE from 'three'
import { Common } from '@/assets/mixins/common'
import { Group } from '@/assets/mixins/group'
import OBJLoader from '@/assets/three/loaders/OBJLoader'
import { FBXLoader } from '@/assets/three/loaders/FBXLoader'
import { extname, deepClone } from '@/assets/script/utils'
import Model from '@/controller/model'
import { log } from 'three'

export default {
  name: 'three-model',
  mixins: [Common, Group],
  props: {
    url: String
  },
  mounted() {
    this.init()
  },

  methods: {
    async init(type) {
      let group = null
      if (type !== 'material') {
        group = await this.loadModel()
        this.model = new Model(group)
      }

      if (this.material[0]) {
        await this.model.addMaterial(this.material)
        group = this.model.getGroup()
      }

      const _has = this.parentGroup.has
      if (_has) {
        this.parentGroup.group.add(group)
      }
      this.setGroup(group, _has)
    },

    loadModel() {
      return new Promise((resolve, reject) => {
        const fileName = extname(this.mergeOption.url)
        let loader = null

        switch (fileName) {
          case 'obj':
            loader = new OBJLoader()
            break
          case 'fbx':
            loader = new FBXLoader()
            break
          default:
            console.error(`'${fileName}' file format is not supported`)
            return
            break
        }

        loader.load(
          this.mergeOption.url,
          group => {
            resolve(group)
          },
          this.onProgress,
          this.onError
        )
      })
    },

    reRender(type) {
      const { parentGroup, model } = this
      if (parentGroup.has) {
        parentGroup.group.remove(model.getGroup())
      } else {
        this.scene.remove(model.getGroup())
      }
      this.init(type)
    },

    onProgress(xhr) {
      const percentComplete = (xhr.loaded / xhr.total) * 100
      this.$emit('progress', percentComplete)
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