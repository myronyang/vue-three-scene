<template>
  <div class="page-wrap">
    <div class="menu-box">
      <ul class="menu-items">
        <li
          class="menu-item"
          :class="{'active': item.chekced}"
          v-for="item in sleeveOptions"
          :key="item.name"
          @click="onMenuClick(item, 'sleeveOption')"
        >{{item.name}}</li>
      </ul>
      <ul class="menu-items">
        <li
          class="menu-item"
          :class="{'active': item.chekced}"
          v-for="item in necklineOptions"
          :key="item.name"
          @click="onMenuClick(item, 'necklineOption')"
        >{{item.name}}</li>
      </ul>
    </div>
    <three-scene ref="scene" :option="sceneOption">
      <three-model-group :option="modelGroupOption">
        <three-model :option="item" v-for="(item, index) in fbxOptions" :key="index"/>
        <three-model :option="sleeveOption">
          <three-material :metalness="metalness">
            <three-texture
              type="map"
              :repeat="repeat"
              image-url="http://djitemhd.oss-cn-shanghai.aliyuncs.com/3520d1fd-8206-44ab-84b8-ccab7970149a.jpeg"
            />
            <three-texture
              type="normalMap"
              image-url="http://djitemhd.oss-cn-shanghai.aliyuncs.com/2da5163e-e508-4d8b-8442-f857c345acf3.jpeg"
            />
            <three-texture
              type="metalnessMap"
              image-url="http://djitemhd.oss-cn-shanghai.aliyuncs.com/e9133e9d-ce47-424a-ba10-bffaf8ed59b3.jpeg"
            />
          </three-material>
        </three-model>
        <three-model :url="necklineOption.url" :scale="necklineOption.scale"/>
      </three-model-group>
    </three-scene>
  </div>
</template>

<script>
export default {
  data () {
    return {
      sceneOption: {
        width: window.innerWidth,
        height: window.innerHeight,
        backgroundColor: 0xeeeeee
      },
      metalness: 0.5,
      repeat: [10, 10],
      modelGroupOption: {
        scale: [0.0028, 0.0028, 0.0028]
      },
      fbxOptions: [
        {
          url: 'static/nanshaozhechenyi/hubaixiushen.fbx',
          // scale: [0.0028, 0.0028, 0.0028]
        },
        {
          url: 'static/nanshaozhechenyi/jianpian.fbx',
          // scale: [0.0028, 0.0028, 0.0028]
        },
        {
          url: 'static/nanshaozhechenyi/koudai01.fbx',
          // scale: [0.0028, 0.0028, 0.0028]
        },
        {
          url: 'static/nanshaozhechenyi/menjin03.fbx',
          // scale: [0.0028, 0.0028, 0.0028]
        },
        {
          url: 'static/nanshaozhechenyi/xiukoukouwei.fbx',
          // scale: [0.0028, 0.0028, 0.0028]
        }
      ],
      sleeveOptions: [
        // {
        //   url: 'static/XXL_add.obj',
        //   position: [0, -10, 0],
        //   scale: [0.011, 0.011, 0.011]
        // }
        {
          name: '长袖',
          chekced: true,
          url: 'static/nanshaozhechenyi/xiuzi01.fbx',
          // scale: [0.0028, 0.0028, 0.0028]
        },
        {
          name: '短袖',
          chekced: false,
          url: 'static/nanshaozhechenyi/xiuzi03.fbx',
          // scale: [0.0028, 0.0028, 0.0028]
        },
        {
          name: '长袖2',
          chekced: false,
          url: 'static/nanshaozhechenyi/xiuzi02.fbx',
          // scale: [0.0028, 0.0028, 0.0028]
        }
      ],
      sleeveOption: {},
      necklineOptions: [
        {
          name: '尖领',
          chekced: false,
          url: 'static/nanshaozhechenyi/jianling.fbx',
          // scale: [0.0028, 0.0028, 0.0028]
        },
        {
          name: '方领',
          chekced: false,
          url: 'static/nanshaozhechenyi/fanglingdi.fbx',
          // scale: [0.0028, 0.0028, 0.0028]
        },
        {
          name: '尖领2',
          chekced: false,
          url: 'static/nanshaozhechenyi/fanglinggao.fbx',
          // scale: [0.0028, 0.0028, 0.0028]
        }
      ],
      necklineOption: {}
    }
  },

  mounted () {
    this.sleeveOption = this.sleeveOptions[0]
    this.necklineOption = this.necklineOptions[0]

    setTimeout(() => {
      this.modelGroupOption.scale = [0.003, 0.003, 0.003]
      this.metalness = 7
      this.repeat = [20, 20]
    }, 4000);

  },

  methods: {
    onMenuClick (item, type) {
      this[`${type}s`].forEach(ele => {
        ele.chekced = item.url === ele.url
      })
      this[type] = item
    }
  }
}
</script>

<style>
.page-wrap {
  position: relative;
}
.menu-box {
  position: absolute;
  left: 15px;
  top: 15px;
}
.menu-items {
  margin-bottom: 25px;
}
.menu-item {
  font-size: 18px;
  margin-bottom: 10px;
  list-style-type: none;
  cursor: pointer;
}
.menu-item.active {
  color: red;
}
</style>