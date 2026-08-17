//@input SceneObject parent
//@input SceneObject hintTap

//_________________________Director Setup_________________________//
script.subScene = new global.SubScene(script, script.parent);
script.subScene.OnStart = Start;
script.subScene.OnLateStart = OnLateStart;
script.subScene.OnStop = Stop;
script.subScene.SetUpdate(Update);

//__________________________Variables_____________________________//

const hintTapImage = script.hintTap.getComponent("Component.Image");
let firstAnswer = false;
global.matchingClubId = -1;
//________Caller________//
//________Listener________//

const answerListener = script.subScene.CreateListener("AnswerEvent", OnAnswer);

//________DelayEvent________//

//_________________________Director_Functions_____________________//
function Start() {}
function OnLateStart() {}
function Update() {}

function Stop() {
  firstAnswer = false;
  fadeHintTap.Reset();
  fadeHintTap.JumpTo(1);
  global.matchingClubId = -1;
}

//___________________________Functions__________________________//

function OnAnswer(answerId) {
  if (!firstAnswer) {
    fadeHintTap.GoTo(0);
    firstAnswer = true;
  }

  global.matchingClubId = 2;
}

//___________________________Animations_________________________//

const fadeHintTap = new Animation(script.getSceneObject(), 0.5, (ratio) => {
  hintTapImage.mainPass.baseColor = new vec4(1, 1, 1, ratio);
});
