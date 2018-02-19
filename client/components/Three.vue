<template>
  <div>
    <div id="stage"></div>
  </div>
</template>

<script>
  import * as THREE from 'three'
  import oc from 'three-orbit-controls'
  const OrbitControls = oc(THREE)

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(45, 1.777, 1, 1000) // 画角、縦横比、？、描画限界
  const light = new THREE.DirectionalLight(0xffffff, 1) // 指向性光源（色、強さ）
  const ambientLight = new THREE.AmbientLight(0x333333) // 全方位光源
  const renderer = new THREE.WebGLRenderer({ antialias: false })
  const controls = new OrbitControls(camera) // eslint-disable-line no-unused-vars
  const box = new THREE.Mesh(
    new THREE.BoxGeometry(50, 50, 50),
    new THREE.MeshLambertMaterial({ color: 0x444444 })
  )

  export default {
    mounted() {
      document.getElementById('stage').appendChild(renderer.domElement)

      // camera
      camera.position.set(200, 100, 300) // カメラ位置
      camera.lookAt(scene.position) // カメラ視野中心座標{x,y,z}

      // light
      light.position.set(0, 100, 30)
      scene.add(light)
      scene.add(ambientLight)

      // renderer
      renderer.setClearColor(0xffffff)
      renderer.setPixelRatio(window.devicePixelRatio)

      // box
      box.position.set(0, 0, 0)
      scene.add(box)

      // execute
      window.addEventListener('resize', resize)

      const socket = window.io()
      socket.on('changeColor', (hex) => {
        console.log('debug:fire!!!!!!!!!!!!!!!!!!')
        box.material.color.setHex(hex)
      })

      resize()
      render()
    }
  }

  function resize() {
    const width = document.documentElement.clientWidth
    const height = document.documentElement.clientHeight - 5
    renderer.setSize(width, height)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
  }
  function render() {
    requestAnimationFrame(render)
    renderer.render(scene, camera)
  }
</script>

<style>

</style>
