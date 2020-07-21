export const Common = {
  computed: {
    scene() {
      let parent = this.$parent
      while (parent && parent.$options.name !== 'three-scene') {
        parent = parent.$parent
      }
      return parent.scene
    },
    mergeOption() {
      return Object.assign({ ...this.$props }, this.option)
    }
  },
  render(h) {
    return <div>{this.$slots.default}</div>
  }
}