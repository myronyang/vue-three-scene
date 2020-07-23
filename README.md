# vue-threejs

> three.js的Vue插件库

## Build Setup

```html
<three-scene :option="sceneOption">
  <three-camera :option="cameraOption" />
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
```


import VueThreeScene from 'vue-three-scene'

Vue.use(VueThreeScene)

### three-scene
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| width | 视图宽度 | number | | 800 |
| height | 按钮圆角 | number | | 500 |
| backgroundColor | 背景颜色 | string | | |
| option | 以上参数合集 | object | | |