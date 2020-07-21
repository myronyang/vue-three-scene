export const Group = {
  props: {
    position: Array,
    rotation: Array,
    scale: Array,
    rotate: Object,
    option: Object
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