<script>
import * as THREE from 'three'
import { generateUUID } from '../assets/script/utils'
import { Common } from '@/assets/mixins/common'
import MTLLoader from '@/assets/three/loaders/MTLLoader'
import OBJLoader from '@/assets/three/loaders/OBJLoader'

export default {
  name: 'three-material',
  mixins: [Common],
  props: {
    type: {
      type: String,
      default: 'MeshStandardMaterial'
    },
    color: String,
    roughness: {
      type: Number,
      default: 0.5
    },
    metalness: {
      type: Number,
      default: 0.5
    },
    emissive: {
      type: Number,
      default: 0
    },
    bumpScale: {
      type: Number,
      default: 1
    },
    transparent: {
      type: Boolean,
      default: true
    },
    normalScale: {
      type: Array,
      default: () => [1, 1]
    },
    displacementScale: {
      type: Number,
      default: 1
    },
    displacementBias: {
      type: Number,
      default: 0
    },
    depthFunc: {
      type: Number,
      default: 3
    },
    depthTest: {
      type: Boolean,
      default: true
    },
    depthWrite: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      material: {
        uuid: generateUUID(),
        type: this.type,
        color: this.color,
        roughness: this.roughness,
        metalness: this.metalness,
        emissive: this.emissive,
        bumpScale: this.bumpScale,
        opacity: this.opacity,
        transparent: this.transparent,
        normalScale: this.normalScale,
        displacementScale: this.displacementScale,
        displacementBias: this.displacementBias,
        depthFunc: this.depthFunc,
        depthTest: this.depthTest,
        depthWrite: this.depthWrite
      }
    }
  },

  mounted() {
    this.init()
  },

  methods: {
    init() {
      if (this.$children) {
        this.$children.forEach(child => {
          this.material[child.type] = child.texture
        })
      }
    },

    reRender(type) {
      for (const key in this.material) {
        if (this.$props[key]) {
          this.material[key] = this.$props[key]
        }
      }
      if (type !== 'texture') {
        this.$parent.reRender()
      }
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