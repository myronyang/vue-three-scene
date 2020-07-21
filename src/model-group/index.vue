<script>
import * as THREE from 'three'
import { Common } from '@/assets/mixins/common'
import { Group } from '@/assets/mixins/group'

const ADD_GROUP_NAMES = ['three-model', 'three-geometry', 'three-mtl-obj']

export default {
  name: 'three-model-group',
  mixins: [Common, Group],
  data() {
    return {
      group: new THREE.Group(),
      childLength: null
    }
  },

  mounted() {
    const childrens = this.$children.filter(child =>
      ADD_GROUP_NAMES.includes(child.$options.name)
    )
    this.childLength = childrens.length
  },

  watch: {
    'group.children'() {
      const { group, childLength } = this
      if (childLength === group.children.length) {
        this.setGroup(group)
      }
    },

    $props: {
      handler () {
        this.setGroup(this.group)
      },
      deep: true
    }
  }
}
</script>