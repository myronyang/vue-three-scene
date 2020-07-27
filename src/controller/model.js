import * as THREE from 'three'
import { deepClone } from '@/assets/script/utils'

class Model {
  constructor(group) {
    this.group = group || null
  }

  create() {
    this.group = new THREE.Group()
  }

  getGroup() {
    return this.group
  }

  getObject3D() {
    return this.group.toJSON()
  }

  objectToGroup(obejct) {
    return new Promise((resolve, reject) => {
      const loader = new THREE.ObjectLoader()
      loader.parse(obejct, group => {
        resolve(group)
      })
    })
  }

  async addMaterial(material) {
    const result = this.group.toJSON()
    const object = this.setMaterial(material),
      childrens = result.object.children

    for (const key in object) {
      result[key] = object[key]
    }
    for (let i = 0; i < childrens.length; i++) {
      childrens[i].material = object.materials[0].uuid
    }
    this.group = await this.objectToGroup(result)
  }

  setMaterial(material) {
    const materials = deepClone(material)
    const textures = [],
      images = []

    materials.forEach(item => {
      for (const key in item) {
        if (key.toLowerCase().search('map') > -1) {
          textures.push({ ...item[key] })
          item[key] = item[key].uuid
        }
      }
    })

    textures.forEach(item => {
      images.push(item.image)
      item.image = item.image.uuid
    })

    return {
      materials,
      textures,
      images
    }
  }

}

export default Model