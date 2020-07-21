<script>
import * as THREE from 'three'
import { Common } from '@/assets/mixins/common'
import { Group } from '@/assets/mixins/group'
import { deepClone } from '@/assets/script/utils'

const COMPONENT_NAME = {
  GROUP: 'three-model-group',
  MATERIAL: 'three-material'
}

export default {
  name: 'three-geometry',
  mixins: [Common, Group],
  props: {
    type: String,
    args: Array
  },

  computed: {
    parentGroup () {
      let parent = this.$parent
      const has = parent && parent.$options.name === COMPONENT_NAME.GROUP
      return {
        has,
        group: parent.group
      }
    },

    material () {
      const children = this.$children
      const materials = children.filter(
        child => child.$options.name === COMPONENT_NAME.MATERIAL
      )
      return materials.map(item => item.material)
    }
  },

  mounted () {
    this.init()
  },

  methods: {
    init () {
      const { type, args } = this.mergeOption

      const geometry = new THREE[type](...args)
      const material = new THREE.MeshBasicMaterial()

      this.mesh = new THREE.Mesh(geometry, material)

      if (this.material.length > 0) {
        const object3D = this.setModel(this.mesh.toJSON())

        const objectLoader = new THREE.ObjectLoader()
        objectLoader.parse(object3D, group => {
          const hasParentGroup = this.parentGroup.has
          if (hasParentGroup) {
            this.parentGroup.group.add(group)
          }
          this.setGroup(group, hasParentGroup)
        })

      } else {
        setTimeout(() => {
          this.setGroup(this.mesh)
        }, 0)
      }
    },

    setModel (object3D) {
      const material = deepClone(this.material)
      const object = this.separateObject(material)
      object3D.object.material = object.materials[0].uuid

      for (const key in object) {
        object3D[key] = object[key]
      }
      return object3D
    },

    separateObject (materials) {
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
    }
  }
}
</script>