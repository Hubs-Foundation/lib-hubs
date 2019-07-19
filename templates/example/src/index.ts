import {
  WebGLRenderer,
  Scene,
  PCFSoftShadowMap,
  AmbientLight,
  PerspectiveCamera,
  DirectionalLight,
  AxesHelper
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const context = canvas.getContext("webgl2", { antialias: true })  as WebGL2RenderingContext;

const renderer = new WebGLRenderer({ canvas, context });
renderer.debug.checkShaderErrors = true;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = false;
renderer.shadowMap.type = PCFSoftShadowMap;

const scene = new Scene();

scene.add(new AmbientLight(0x404040));

const directionalLight = new DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 10, 0);
directionalLight.castShadow = true;
directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 100;
directionalLight.shadow.camera.right = 10;
directionalLight.shadow.camera.left = -10;
directionalLight.shadow.camera.top = 10;
directionalLight.shadow.camera.bottom = -10;
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
directionalLight.shadow.bias = -0.00025;
scene.add(directionalLight);

const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(3.42, 3.4, 2.38);
camera.lookAt(0, 0, 0);
scene.add(camera);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);

scene.add(new AxesHelper());

function render() {
  renderer.render(scene, camera);
  controls.update();
}

renderer.setAnimationLoop(render);

(window as any).renderer = renderer;
(window as any).scene = scene;
