<script>
import * as THREE from 'three'
import { Common } from '@/assets/mixins/common'
import { Group } from '@/assets/mixins/group'
import OBJLoader from '@/assets/three/loaders/OBJLoader'
import { FBXLoader } from '@/assets/three/loaders/FBXLoader'
import { extname, deepClone } from '@/assets/script/utils'

const COMPONENT_NAME = {
  GROUP: 'three-model-group',
  MATERIAL: 'three-material'
}

export default {
  name: 'three-model',
  mixins: [Common, Group],
  props: {
    url: String
  },

  computed: {
    parentGroup() {
      let parent = this.$parent
      const has = parent && parent.$options.name === COMPONENT_NAME.GROUP
      return {
        has,
        group: parent.group
      }
    },

    material() {
      const children = this.$children
      const materials = children.filter(
        child => child.$options.name === COMPONENT_NAME.MATERIAL
      )
      return materials.map(item => item.material)
    }
  },

  mounted() {
    this.init()
  },

  methods: {
    async init() {
      const object3D = await this.setModel()

      const loader = new THREE.ObjectLoader()

      loader.parse(object3D, group => {
        const hasParentGroup = this.parentGroup.has
        if (hasParentGroup) {
          this.parentGroup.group.add(group)
        }
        this.group = group
        this.setGroup(group, hasParentGroup)
      })
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
            resolve(group.toJSON())
          },
          this.onProgress,
          this.onError
        )
      })
    },

    async setModel() {
      const result = await this.loadModel()

      const material = deepClone(this.material)

      if (material.length > 0) {
        const object = this.separateObject(material),
          childrens = result.object.children

        for (const key in object) {
          result[key] = object[key]
        }

        for (let i = 0; i < childrens.length; i++) {
          childrens[i].material = object.materials[0].uuid
        }
      }

      return result
    },

    separateObject(materials) {
      const textures = [],
        images = []

      materials.forEach(item => {
        for (const key in item) {
          if (key.toLowerCase().search('map') > -1) {
            textures.push({ ...item[key] })
            item[key] = item[key].uuid
          }
        }
      })

      textures.forEach(item => {
        images.push(item.image)
        item.image = item.image.uuid
      })

      return {
        materials,
        textures,
        images
      }
    },

    reRender() {
      const { parentGroup, group } = this
      if (parentGroup.has) {
        parentGroup.group.remove(group)
      } else {
        this.scene.remove(group)
      }
      this.init()
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