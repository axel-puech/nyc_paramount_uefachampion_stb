//@input SceneObject parent
//@input Component.AudioComponent[] LOOP_music

//_________________________Director Setup_________________________//
script.subScene = new global.SubScene(script, script.parent);
script.subScene.OnStart = Start;
script.subScene.OnLateStart = OnLateStart;
script.subScene.OnStop = Stop;
script.subScene.SetUpdate(Update);
//__________________________Variables_____________________________//
//________Caller________//
//________Listener________//
const gameEndListener = script.subScene.CreateListener("gameEndEvent", OnGameEnd);
//________DelayEvent________//

//_________________________Director_Functions_____________________//
function Start() {}
function OnLateStart() {}
function Update() {}
function Stop() {
  crossFadeMusic.Reset();
}
//___________________________Functions__________________________//
function OnGameEnd() {
  print("fading music");
  crossFadeMusic.GoTo(1);
}

//___________________________Animations_________________________//

const crossFadeMusic = new Animation(script.getSceneObject(), 0.5, (ratio) => {
  script.LOOP_music[0].volume = 1 - ratio;
  script.LOOP_music[1].volume = ratio;
});
