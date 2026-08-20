//@input SceneObject parent
//@input Component.AudioComponent[] LOOP_music
//@input Component.AudioComponent finalReveal

//_________________________Director Setup_________________________//
script.subScene = new global.SubScene(script, script.parent);
script.subScene.OnStart = Start;
script.subScene.OnLateStart = OnLateStart;
script.subScene.OnStop = Stop;
script.subScene.SetUpdate(Update);
//__________________________Variables_____________________________//
//________Caller________//
//________Listener________//
// const gameEndListener = script.subScene.CreateListener("gameEndEvent", OnGameEnd);
//________DelayEvent________//

//_________________________Director_Functions_____________________//
function Start() {
  crossFadeMusic.Reset();
}
function OnLateStart() {
  print("fading music");
  crossFadeMusic.GoTo(1);
  script.finalReveal.play(1);
}
function Update() {}
function Stop() {
  script.LOOP_music[0].volume = 1;
  script.LOOP_music[1].volume = 0;
}
//___________________________Functions__________________________//
// function OnGameEnd() {
//   print("fading music");
//   crossFadeMusic.GoTo(1);
// }

//___________________________Animations_________________________//

const crossFadeMusic = new Animation(script.getSceneObject(), 1, (ratio) => {
  script.LOOP_music[0].volume = 1 - ratio;
  script.LOOP_music[1].volume = ratio;
});
