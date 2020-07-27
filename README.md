# vue-threejs

> threejs 的 Vue 插件库

> 组件化创建 threejs 场景

> 双向绑定支持实时更新模型

## 使用

```js
npm install vue-three-scene --save

yarn add vue-three-scene

import VueThreeScene from 'vue-three-scene'

Vue.use(VueThreeScene)
```

## 示例

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

## 组件

### three-scene

| 参数            | 说明         | 类型   | 可选值 | 默认值 |
| --------------- | ------------ | ------ | ------ | ------ |
| width           | 视图宽度     | number |        | 800    |
| height          | 按钮圆角     | number |        | 500    |
| backgroundColor | 背景颜色     | string |        |        |
| option          | 以上参数合集 | object |        |        |

### three-scene

| 参数     | 说明                   | 类型   | 可选值                                | 默认值 |
| -------- | ---------------------- | ------ | ------------------------------------- | ------ |
| url      | 加载的模型地址         | string | 目前仅支持 obj fbx 格式               |        |
| position | 模型位置               | array  | [x, y, z]                             |        |
| rotation | 模型沿中心点旋转       | array  | [x, y, z]                             |        |
| scale    | 模型尺寸               | array  | [x, y, z]                             |        |
| rotate   | 模型自动旋转方向及速度 | object | { direction: 'x/y/z', speed: number } |        |
| option   | 以上参数合集           | object |                                       |        |
