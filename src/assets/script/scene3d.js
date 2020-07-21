import * as THREE from 'three'
import OrbitControls from '@/assets/three/controls/OrbitControls'

export class Scene3d {

  constructor(options) {
    // 视角
    this._camera
    // 控制器
    this._controls
    // 光源
    this._light
    // 场景
    this._scene
    // 渲染器
    this._renderer
    // 是否旋转
    this._isRotate = true
    // 帧动画
    this._timer
    // 时间
    this._clock = new THREE.Clock()

    this.init(options)
  }

  // 运行
  run() {
    const animate = () => {
      this._timer = requestAnimationFrame(animate)
      if (this._isRotate) this.groupRotate()
      this.render()
    }
    animate()
  }

  //初始化
  init(options) {
    // 默认参数
    const _default = {
      // 场景宽
      width: options.container.clientWidth,
      // 场景搞
      height: options.container.clientHeight,
      // 像素比
      pixelRatio: window.devicePixelRatio,
      // 场景背景色
      backgroundColor: 0x444444
    }

    this._options = Object.assign(_default, options)

    this.initScene()
    this.initRenderer()
    this._options.container.appendChild(this._renderer.domElement)
  }

  // 初始化渲染器
  initRenderer() {
    const options = this._options
    this._renderer = new THREE.WebGLRenderer({
      antialias: true
    })
    this._renderer.setPixelRatio(options.pixelRatio)
    //设置渲染器的宽和高
    this._renderer.setSize(options.width, options.height)
    this._renderer.setClearColor(options.backgroundColor, 1)
  }

  // 初始化场景
  initScene() {
    this._scene = new THREE.Scene()
  }

  // 初始控制器
  initControls() {
    this._controls = new OrbitControls(this._camera, this._renderer.domElement)
  }

  // 初始化视角
  initCamera(width, height) {
    const options = this._options
    this._camera = new THREE.PerspectiveCamera(50, options.width / options.height, 1, 10000)
    this._camera.position.set(15, 10, 20)

    this._scene.add(this._camera)
  }

  // 光源
  initLight() {
    // 半球光
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x0f0e0d, 1)
    this._scene.add(hemiLight)

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.25)
    dirLight.position.set(200, 100, 1000).normalize()
    this._scene.add(dirLight)
  }

  // 模型旋转
  groupRotate() {
    const childrens = this._scene.children

    for (let i = 0; i < childrens.length; i++) {
      const child = childrens[i],
        rotate = child.rotateAuto

      if (child.type === 'Group' && rotate) {
        child.rotation[rotate.direction] += rotate.speed
      }
    }
  }

  // 渲染
  render() {
    this._renderer.render(this._scene, this._camera)
  }

  // 设置显示区域
  resize(width, height) {
    this._camera.aspect = width / height
    this._camera.updateProjectionMatrix()

    this._renderer.setSize(width, height)
  }

  // 添加group
  add(group) {
    this._scene.add(group)
  }

  // 删除group
  remove(group) {
    // group.children.forEach(child => {
    //   child.geometry.dispose()
    // })
    this._scene.remove(group)
  }

  // 删除全部group
  removeAll() {
    this._scene.children.forEach(child => {
      if (child.type === 'Group') {
        this.remove(child)
      }
    })
  }
}

