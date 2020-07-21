<template>
  <div class="page-wrap">
    <three-scene :width="width" :height="height" :background-color="0x000000">
      <!-- <three-model-group :option="modelGroup"> -->
        <three-geometry v-for="(item, index) in geometries" :key="index" :option="item">
          <three-material>
            <three-texture :repeat="[1, 1]" image-url="static/uv_grid_opengl.jpg"/>
          </three-material>
        </three-geometry>
      <!-- </three-model-group> -->
    </three-scene>
  </div>
</template>

<script>
export default {
  data () {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      modelGroup: {
        scale: [0.7, 0.7, 0.7],
      },
      geometries: [
        {
          type: 'SphereBufferGeometry',
          args: [75, 20, 10],
          scale: [0.05, 0.05, 0.05],
          position: [-15, 0, 10]
        },
        {
          type: 'IcosahedronBufferGeometry',
          args: [75, 1],
          scale: [0.05, 0.05, 0.05],
          position: [-5, 0, 10]
        },
        {
          type: 'CylinderBufferGeometry',
          args: [25, 75, 100, 40, 5],
          scale: [0.05, 0.05, 0.05],
          position: [5, 0, 10]
        },
        {
          type: 'TetrahedronBufferGeometry',
          args: [75, 0],
          scale: [0.05, 0.05, 0.05],
          position: [15, 0, 10]
        },
        {
          type: 'PlaneBufferGeometry',
          args: [100, 100, 4, 4],
          scale: [0.05, 0.05, 0.05],
          position: [-15, 0, 0]
        },
        {
          type: 'BoxBufferGeometry',
          args: [100, 100, 100, 4, 4, 4],
          scale: [0.05, 0.05, 0.05],
          position: [-5, 0, 0]
        },
        {
          type: 'CircleBufferGeometry',
          args: [50, 20, 0, Math.PI * 2],
          scale: [0.05, 0.05, 0.05],
          position: [5, 0, 0]
        },
        {
          type: 'CircleBufferGeometry',
          args: [50, 20, 0, Math.PI * 2],
          scale: [0.05, 0.05, 0.05],
          position: [5, 0, 0]
        },
        {
          type: 'RingBufferGeometry',
          args: [10, 50, 20, 5, 0, Math.PI * 2],
          scale: [0.05, 0.05, 0.05],
          position: [15, 0, 0]
        }
      ]
    }
  },

  mounted () {
    setTimeout(() => {
      console.log(222);

      this.geometries[8].scale = [0.02, 0.02, 0.02]

    }, 4000);
  },
}
</script>>