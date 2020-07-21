<script>
import { generateUUID } from '@/assets/script/utils'
import { Common } from '@/assets/mixins/common'
export default {
  name: 'three-texture',
  mixins: [Common],
  props: {
    type: {
      type: String,
      default: 'map'
    },
    name: String,
    mapping: {
      type: Number,
      default: 305
    },
    repeat: {
      type: Array,
      default: () => [10, 10]
    },
    offset: {
      type: Array,
      default: () => [0, 0]
    },
    wrap: {
      type: Array,
      default: () => [null, null]
    },
    minFilter: {
      type: Number,
      default: 1008
    },
    magFilter: {
      type: Number,
      default: 1006
    },
    anisotropy: {
      type: Number,
      default: 1
    },
    flipY: {
      type: Boolean,
      default: true
    },
    imageUrl: String,
    option: Object
  },
  data() {
    return {
      texture: {
        uuid: generateUUID(),
        name: this.name,
        mapping: this.mapping,
        repeat: this.repeat,
        offset: this.offset,
        wrap: this.wrap,
        minFilter: this.minFilter,
        magFilter: this.magFilter,
        anisotropy: this.anisotropy,
        flipY: this.flipY,
        image: {
          uuid: generateUUID(),
          url: this.imageUrl
        }
      }
    }
  },
  created() {
    const { texture, option } = this
    this.texture = Object.assign(texture, option)
  },
  watch: {
    $props: {
      handler() {
        for (const key in this.texture) {
          if (this.$props[key]) {
            this.texture[key] = this.$props[key]
          }
        }
        this.$parent.reRender('texture')
      },
      deep: true
    }
  }
}
</script>