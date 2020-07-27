<script>
import * as THREE from 'three'
import { Common } from '@/assets/mixins/common'
import { Group } from '@/assets/mixins/group'
import { deepClone } from '@/assets/script/utils'
import Model from '@/controller/model'

export default {
  name: 'three-geometry',
  mixins: [Common, Group],
  props: {
    type: String,
    args: Array
  },
  mounted() {
    this.init()
  },

  methods: {
    async init() {
      const { type, args } = this.mergeOption

      const geometry = new THREE[type](...args)
      const material = new THREE.MeshBasicMaterial()

      this.mesh = new THREE.Mesh(geometry, material)

      if (this.material[0]) {

        const group = await this.setModel(this.mesh)
        const _has = this.parentGroup.has
        if (_has) this.parentGroup.group.add(group)
        this.setGroup(group, _has)

      } else {
        setTimeout(() => {
          this.setGroup(this.mesh)
        }, 0)
      }
    },

    async setModel(group) {
      const model = new Model(group)
      const object3D = model.getObject3D()
      const material = deepClone(this.material)
      const object = model.setMaterial(material)

      object3D.object.material = object.materials[0].uuid

      for (const key in object) {
        object3D[key] = object[key]
      }
      return await model.objectToGroup(object3D)
    }
  }
}
</script>