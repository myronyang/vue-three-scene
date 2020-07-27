<script>
import * as THREE from 'three'
import { Common } from '@/assets/mixins/common'
import { Group } from '@/assets/mixins/group'
import Model from '@/controller/model'
import { log } from 'three'

const ADD_GROUP_NAMES = ['three-model', 'three-geometry', 'three-mtl-obj']

export default {
  name: 'three-model-group',
  mixins: [Common, Group],
  data() {
    return {
      group: new THREE.Group(),
      groups: [],
      childLength: null
    }
  },

  mounted() {
    this.childrens = this.$children.filter(child =>
      ADD_GROUP_NAMES.includes(child.$options.name)
    )
  },

  watch: {
    async 'group.children'() {
      let { group, childrens } = this
      if (childrens.length === group.children.length) {
        this.setGroup(group)
      }
    },
    $props: {
      handler() {
        this.setGroup(this.group)
      },
      deep: true
    }
  }
}
</script>