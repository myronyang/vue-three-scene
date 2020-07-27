const COMPONENT_NAME = {
  GROUP: 'three-model-group',
  MATERIAL: 'three-material'
}

export const Group = {
  props: {
    position: Array,
    rotation: Array,
    scale: Array,
    rotate: Object,
    option: Object
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
      const parent = this.$parent
      const children = this.$children
      if (parent.$options.name === COMPONENT_NAME.GROUP && parent.material[0]) {
        return parent.material
      }
      const materials = children.filter(
        child => child.$options.name === COMPONENT_NAME.MATERIAL
      )
      return materials.map(item => item.material)
    }
  },

  methods: {
    setGroup(group, hasGroup) {
      const { position, rotation, scale, rotate } = this.mergeOption

      position && group.position.set(...position)
      rotation && group.rotation.set(...rotation)
      scale && group.scale.set(...scale)

      if (rotate) {
        group.rotateAuto = rotate
      }
      group.traverse(child => {
        if (child.isMesh) {
          child.castShadow = true
          child.receiveShadow = true
        }
      })

      if (!hasGroup) {
        this.scene.add(group)
        this.scene.run()
      }
    }
  }
}