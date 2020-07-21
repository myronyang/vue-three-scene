import Scene from './scene/index'
import MtlObj from './mtlObj/index'
import Light from './light/index'
import Camera from './camera/index'
import Controls from './controls/index'
import ModelGroup from './model-group/index'
import Model from './model/index'
import Material from './material/index'
import Texture from './texture/index'
import Geometry from './geometry/index'

const components = [
  Scene,
  MtlObj,
  Light,
  Camera,
  Controls,
  ModelGroup,
  Model,
  Material,
  Texture,
  Geometry
]

const install = (Vue, opts = {}) => {
  components.map(component => {
    Vue.component(component.name, component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  Scene,
  MtlObj,
  Light,
  Camera,
  Controls,
  ModelGroup,
  Model,
  Material,
  Texture,
  Geometry
}
