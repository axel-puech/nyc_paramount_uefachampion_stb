//@input SceneObject parent

//@input Component.VFXComponent vfxConfettis

//_________________________Director Setup_________________________//
script.subScene = new global.SubScene(script, script.parent);
script.subScene.OnStart = Start;
script.subScene.OnLateStart = OnLateStart;
script.subScene.OnStop = Stop;
script.subScene.SetUpdate(Update);
//__________________________Variables_____________________________//
//________Caller________//
//________Listener________//
//________DelayEvent________//

//_________________________Director_Functions_____________________//
function Start() {}
function OnLateStart() {
  animSpawnAmount.GoTo(0.2);
}
function Update() {}
function Stop() {
  script.vfxConfettis.asset.properties["killParticles"] = 0;
  animSpawnAmount.Reset();
}
//___________________________Functions__________________________//

//___________________________Animations_________________________//

const animSpawnAmount = new Animation(script.getSceneObject(), 1, (ratio) => {
  script.vfxConfettis.asset.properties["spawnAmount"] = ratio;
});
