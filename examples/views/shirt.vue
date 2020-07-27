<template>
  <div class="page-wrap">
    <three-scene ref="scene" :option="scene">
      <three-model-group :scale="modelScale">
        <!-- <three-model :url="item" v-for="(item, index) in models" :key="index" /> -->
        <!-- <three-model :url="part1.url" /> -->
        <three-model :url="part2.url">
        </three-model>

        <three-material>
          <three-texture
            :type="texture.type"
            :repeat="texture.repeat"
            :image-url="texture.imageUrl"
            v-for="(texture, idx) in texture"
            :key="idx"
          />
        </three-material>
      </three-model-group>
    </three-scene>

    <div class="parts-box">
      <ul class="items">
        <li
          class="item"
          :class="{'active': item.chekced}"
          v-for="item in parts1"
          :key="item.name"
          @click="onMenuClick(item, 1)"
        >{{item.name}}</li>
      </ul>
      <ul class="items">
        <li
          class="item"
          :class="{'active': item.chekced}"
          v-for="item in parts2"
          :key="item.name"
          @click="onMenuClick(item, 2)"
        >{{item.name}}</li>
      </ul>
    </div>
    <div class="materials-box">
      <ul class="items">
        <li
          class="item"
          :class="{'active': item.chekced}"
          v-for="item in textures"
          :key="item.name"
          @click="onMaterialClick(item)"
        >
          <img :src="item[0].imageUrl" alt />
        </li>
      </ul>
    </div>
  </div>
</template>
  
<script>
import { log } from 'three'
export default {
  data() {
    return {
      scene: {
        width: window.innerWidth,
        height: window.innerHeight,
        backgroundColor: 0xeeeeee
      },
      modelScale: [0.0028, 0.0028, 0.0028],
      models: [
        'static/nanshaozhechenyi/hubaixiushen.fbx',
        'static/nanshaozhechenyi/jianpian.fbx',
        'static/nanshaozhechenyi/koudai01.fbx',
        'static/nanshaozhechenyi/menjin03.fbx',
        'static/nanshaozhechenyi/xiukoukouwei.fbx'
      ],
      part1: {},
      parts1: [
        {
          name: '尖领',
          chekced: true,
          url: 'static/nanshaozhechenyi/jianling.fbx'
        },
        {
          name: '方领',
          chekced: false,
          url: 'static/nanshaozhechenyi/fanglingdi.fbx'
        }
      ],
      part2: {},
      parts2: [
        {
          name: '长袖',
          chekced: true,
          url: 'static/nanshaozhechenyi/xiuzi01.fbx'
          // scale: [0.0028, 0.0028, 0.0028]
        },
        {
          name: '短袖',
          chekced: false,
          url: 'static/nanshaozhechenyi/xiuzi03.fbx'
          // scale: [0.0028, 0.0028, 0.0028]
        }
      ],
      texture: [],
      textures: [
        [
          {
            type: 'map',
            repeat: [20, 20],
            imageUrl:
              'http://djitemhd.oss-cn-shanghai.aliyuncs.com/3520d1fd-8206-44ab-84b8-ccab7970149a.jpeg'
          },
          {
            type: 'normalMap',
            imageUrl:
              'http://djitemhd.oss-cn-shanghai.aliyuncs.com/2da5163e-e508-4d8b-8442-f857c345acf3.jpeg'
          },
          {
            type: 'metalnessMap',
            imageUrl:
              'http://djitemhd.oss-cn-shanghai.aliyuncs.com/e9133e9d-ce47-424a-ba10-bffaf8ed59b3.jpeg'
          }
        ],
        [
          {
            type: 'map',
            repeat: [20, 20],
            imageUrl:
              'https://gxzn-free.oss-cn-zhangjiakou.aliyuncs.com/clothingWeb/2020/7/17/clothingWeb-20200717-151619-025-6154bb44d2114b4683d49abe76f70d2b.jpg'
          },
          {
            type: 'normalMap',
            imageUrl:
              'https://gxzn-free.oss-cn-zhangjiakou.aliyuncs.com/clothingWeb/2020/7/17/clothingWeb-20200717-151658-769-f699cc8f9d944318930c9c334e011433.jpg'
          },
          {
            type: 'metalnessMap',
            imageUrl:
              'https://gxzn-free.oss-cn-zhangjiakou.aliyuncs.com/clothingWeb/2020/7/17/clothingWeb-20200717-151730-798-b9deba9b65634961b46f2cc1689e1fe2.jpg'
          }
        ]
      ]
    }
  },

  created() {
    this.part1 = this.parts1[0]
    this.part2 = this.parts2[0]
    this.texture = this.textures[0]
  },

  methods: {
    onMenuClick(item, type) {
      this[`parts${type}`].forEach(ele => {
        ele.chekced = item.url === ele.url
      })
      this[`part${type}`] = item
    },

    onMaterialClick(item) {
      setTimeout(() => {
        this.texture = item
        this.$set(this, 'texture', item)
      }, 2000)
    }
  }
}
</script>

<style>
.page-wrap {
  position: relative;
}
.parts-box {
  position: absolute;
  left: 15px;
  top: 15px;
  z-index: 999;
}
.materials-box {
  position: absolute;
  right: 15px;
  bottom: 15px;
  height: 180px;
  z-index: 999;
}
.materials-box img {
  height: 80px;
  width: 80px;
  border-radius: 100%;
}
.items {
  margin-bottom: 35px;
}
.item {
  display: block;
  font-size: 18px;
  margin-bottom: 10px;
  list-style-type: none;
  color: #999;
  cursor: pointer;
}
.item.active {
  color: #2196f3;
}
</style>