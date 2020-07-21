<template>
  <div class="demo-block" id="demo">
    <three-scene :option="sceneOption">
      <three-camera :option="perspectiveCamera" />
      <three-controls />
      <three-light :option="hemisphereLightOption" />
      <three-light :option="directionalLightOption" />
      <three-mtl-obj
        :base-url="mtjObjOption.baseUrl"
        :mtl-url="mtjObjOption.mtlUrl"
        :obj-url="mtjObjOption.objUrl"
        :position="mtjObjOption.position"
        :scale="mtjObjOption.scale"
        :rotate="mtjObjOption.rotate"
      />
    </three-scene>

    <three-scene>
      <three-model-group>
        <three-mtl-obj :option="mtjObjOption" @progress="onMtlObjProgress" />
      </three-model-group>
    </three-scene>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sceneOption: {
        backgroundColor: 0x0e0e0e
      },
      hemisphereLightOption: {
        type: 'HemisphereLight',
        args: [0xffffff, 0x0f0e0d, 1],
        position: [0, 1, 0]
      },
      perspectiveCamera: {
        type: 'PerspectiveCamera',
        args: [50, 500 / 300, 1, 10000],
        position: [15, 10, 20]
      },
      directionalLightOption: {
        type: 'DirectionalLight',
        args: [0xffffff, 0.25]
      },
      mtjObjOption: {
        baseUrl: 'static/',
        mtlUrl: 'XXL_add.mtl',
        objUrl: 'XXL_add.obj',
        position: [0, -10, 0],
        scale: [0.011, 0.011, 0.011],
        rotate: {
          direction: 'y',
          speed: 0.008
        }
      }
    }
  },

  methods: {
    onMtlObjProgress(progress) {
      console.log('读取进度：' + progress + '%')
    }
  }
}
</script>

<style scope>
#demo .three-scene {
  width: 800px;
  margin: 0 auto 50px;
}
</style>