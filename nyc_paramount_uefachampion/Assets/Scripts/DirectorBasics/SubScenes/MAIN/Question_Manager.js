//@input SceneObject parent
//@ui {"widget":"separator"}
//@ui {"widget":"label", "label":"PARAMETERS "}
//@input float fadeDuration=0.5
//@input float mixDuration=0.5
//@input float delayBetweenRounds=1
//@input int numberRounds=6

//@ui {"widget":"separator"}
//@ui {"widget":"label", "label":"QUESTIONS "}
//@input SceneObject questionSceneObject
//@input Asset.Texture[] questionTextures
//@ui {"widget":"separator"}
//@ui {"widget":"label", "label":"ANSWER_A "}
//@input SceneObject answerASceneObject
//@input Asset.Texture[] answerATextures_0
//@input Asset.Texture[] answerATextures_1
//@ui {"widget":"separator"}
//@ui {"widget":"label", "label":"ANSWER_B "}
//@input SceneObject answerBSceneObject
//@input Asset.Texture[] answerBTextures_0
//@input Asset.Texture[] answerBTextures_1
//@ui {"widget":"separator"}
//@ui {"widget":"label", "label":"ANSWER_C "}
//@input SceneObject answerCSceneObject
//@input Asset.Texture[] answerCTextures_0
//@input Asset.Texture[] answerCTextures_1

//_________________________Director Setup_________________________//
script.subScene = new global.SubScene(script, script.parent);
script.subScene.OnStart = Start;
script.subScene.OnLateStart = OnLateStart;
script.subScene.OnStop = Stop;
script.subScene.SetUpdate(Update);
//__________________________Variables_____________________________//

let currentRound = 0;
let answerImageList = [script.answerASceneObject, script.answerBSceneObject, script.answerCSceneObject];
let answerTextureList = [
  [script.answerATextures_0, script.answerATextures_1],
  [script.answerBTextures_0, script.answerBTextures_1],
  [script.answerCTextures_0, script.answerCTextures_1],
];
let answerArray = [];
const numberRounds = script.numberRounds;
global.numberRounds = script.numberRounds;

//________Caller________//

const answerCaller = script.subScene.CreateCaller("AnswerEvent", null);
//________Listener________//
//________DelayEvent________//

//____FadeImageDelay____//
const nextAnswetEvent = script.subScene.CreateEvent("DelayedCallbackEvent", nextAnswer);
const endAnswerEvent = script.subScene.CreateEvent("DelayedCallbackEvent", endAnswer);

const questionImage = script.questionSceneObject.getComponent("Component.Image");

//_________________________Director_Functions_____________________//
function Start() {
  Instantiation();
}

function OnLateStart() {
  fadeQuestion.GoTo(1);
  setQuestionTexture();

  answerArray.forEach((element) => {
    element._anims.fade.GoTo(1);
    element.setTexture();
  });
}

function Update() {}
function Stop() {
  currentRound = 0;
  fadeQuestion.Reset();
  answerArray.forEach((element) => {
    element.Reset();
  });
}

//___________________________Functions__________________________//

function setQuestionTexture(currentRound = 0) {
  questionImage.mainPass.baseTex = script.questionTextures[currentRound];
}

function answerClicked() {
  if (currentRound < numberRounds) {
    answerArray.forEach((element) => {
      element.ToggleInteraction(false);
    });
    nextAnswetEvent.event.reset(script.delayBetweenRounds);
  } else {
    endAnswerEvent.event.reset(script.delayBetweenRounds);
  }
}

function nextAnswer() {
  answerArray.forEach((element) => {
    element._anims.fade.GoTo(0);
  });
  fadeQuestion.GoTo(0);
  currentRound++;
}

function endAnswer() {
  answerArray.forEach((element) => {
    element._anims.fade.GoTo(0);
  });
}

function resetAnswer() {
  if (currentRound < numberRounds) {
    answerArray.forEach((element) => {
      element.setTexture(currentRound);
      element.Reset();
      element._anims.fade.GoTo(1);
    });
    fadeQuestion.Reset();
    setQuestionTexture(currentRound);
    fadeQuestion.GoTo(1);
  } else {
    script.subScene.CallEnd(null);
  }
}

//___________________________Animations_________________________//

const fadeQuestion = new Animation(script.getSceneObject(), script.fadeDuration, (ratio) => {
  questionImage.mainPass.baseColor = new vec4(1, 1, 1, ratio);
});

//__________________________Classes_____________________________//
class Answer {
  constructor(obj, id, texturesNormal, textureSelected) {
    this._obj = obj;
    this._id = id;
    this._transform = this._obj.getComponent("Component.ScreenTransform");
    this._image = this._obj.getComponent("Component.Image");
    this._textureNormal = texturesNormal;
    this._textureSelected = textureSelected;
    this._interaction = this._obj.getComponent("Component.InteractionComponent");
    this._interaction.onTap.add(this.OnTap.bind(this));
    this._activeInteraction = false;

    this._anims = {
      fade: null,
      mix: null,
    };

    this.initAnimations();
    this.Reset();
  }

  initAnimations() {
    this._anims.fade = new Animation(script.getSceneObject(), script.fadeDuration, (ratio) => {
      this._image.mainPass.alphaRatio = ratio;
    });
    this._anims.fade.OnEnd = this.OnFadeAnimEnd.bind(this);

    this._anims.mix = new Animation(script.getSceneObject(), script.mixDuration, (ratio) => {
      this._image.mainPass.mixRatio = ratio;
    });
    this._anims.mix.Easing = QuadraticInOut;
    this._anims.mix.OnEnd = this.OnMixAnimEnd.bind(this);
  }

  OnFadeAnimEnd(ratio) {
    if (ratio === 1) {
      this.ToggleInteraction(true);
    } else if (ratio === 0) {
      resetAnswer();
    }
  }

  OnMixAnimEnd(ratio) {
    if (ratio === 1) {
      //
    } else if (ratio === 0) {
      //
    }
  }

  setTexture(currentRound = 0) {
    this._image.mainPass.currentTexture = this._textureNormal[currentRound];
    this._image.mainPass.nextTexture = this._textureSelected[currentRound];
  }

  ToggleInteraction(status) {
    this._activeInteraction = status;
  }

  OnTap() {
    if (!this._activeInteraction) return;
    this._anims.mix.GoTo(1);
    answerClicked();
    answerCaller.Call(this._id);
  }

  Reset() {
    this._anims.fade.Reset();
    this._anims.mix.Reset();
  }
}
function Instantiation() {
  answerArray = [];

  answerImageList.forEach((answerImage, index) => {
    let answer = new Answer(answerImage, index, answerTextureList[index][0], answerTextureList[index][1]);

    answerArray.push(answer);
  });
}
