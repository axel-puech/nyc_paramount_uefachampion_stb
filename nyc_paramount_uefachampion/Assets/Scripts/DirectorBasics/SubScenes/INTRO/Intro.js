//@input SceneObject parent
//@input SceneObject[] floatingClub
//@input SceneObject blackOverlay
//@input SceneObject chooseYourClub

//@input SceneObject hintIntro
//@input SceneObject tapToStart
//@input float fade
//@ui {"widget":"separator"}
//@ui {"widget":"label", "label":"FLOATING "}
//@input float amplitude
//@input float duration

// ecran noir a la fin du fade out -> chage de scene
// plusieur images de club, les faire float
// un click -> go to main

//_________________________Director Setup_________________________//
script.subScene = new global.SubScene(script, script.parent);
script.subScene.OnStart = Start;
script.subScene.OnLateStart = OnLateStart;
script.subScene.OnStop = Stop;
script.subScene.SetUpdate(Update);
//__________________________Variables_____________________________//
let hasTapped = false;
let floatingClubArray = [];

//________Caller________//
//________Listener________//
//________DelayEvent________//

let tapEvent = script.subScene.CreateEvent("TapEvent", OnTap);
const blackOverlayImage = script.blackOverlay.getComponent("Image");
const chooseYourClubImage = script.chooseYourClub.getComponent("Image");
const hintIntroImage = script.hintIntro.getComponent("Image");
const tapToStartImage = script.tapToStart.getComponent("Image");

//_________________________Director_Functions_____________________//
function Start() {
  Instantiation();
  fadeBlackOverlay.JumpTo(1);
  fadeChooseYourClub.JumpTo(1);
  fadeHint.JumpTo(1);
}
function OnLateStart() {
  floatingClubArray.forEach((element, index) => {
    element._anims.float.Start(-1);
    element._anims.fade.GoTo(1);
  });
}
function Update() {}
function Stop() {
  fadeBlackOverlay.Reset();
  fadeChooseYourClub.Reset();
  fadeHint.Reset();
}
//___________________________Functions__________________________//

function OnTap() {
  if (hasTapped) {
    return;
  }
  hasTapped = true;
  fadeBlackOverlay.GoTo(0);
  fadeChooseYourClub.GoTo(0);
  fadeHint.GoTo(0);

  floatingClubArray.forEach((element, index) => {
    element._anims.fade.GoTo(0);
  });
}

//___________________________Animations_________________________//

const fadeBlackOverlay = new Animation(script.getSceneObject(), 1, (ratio) => {
  blackOverlayImage.mainPass.alphaRatio = ratio;
});

fadeBlackOverlay.OnEnd = function (ratio) {
  if (ratio === 0) {
    script.subScene.CallEnd(null);
  }
};
const fadeChooseYourClub = new Animation(script.getSceneObject(), 0.5, (ratio) => {
  chooseYourClubImage.mainPass.alphaRatio = ratio;
});

const fadeHint = new Animation(script.getSceneObject(), 0.5, (ratio) => {
  hintIntroImage.mainPass.alphaRatio = ratio;
  tapToStartImage.mainPass.alphaRatio = ratio;
});

//__________________________Classes_____________________________//
class FloatingClubLogo {
  constructor(obj, id) {
    this._obj = obj;
    this._id = id;
    this._transform = this._obj.getComponent("Component.ScreenTransform");
    this._image = this._obj.getComponent("Component.Image");
    this._baseCenter = this._transform.anchors.getCenter();

    // Each logo owns unique motion values so the group never shares the same rhythm.
    this._floatAmplitude = script.amplitude * randomRange(0.7, 1.3);
    this._floatDuration = script.duration * randomRange(0.8, 1.6);
    this._floatPhase = Math.random();
    this._floatStartOffset = Math.random();
    this._fadeDuration = script.fade * randomRange(0.5, 1.2);

    this._anims = {
      fade: null,
      float: null,
    };

    this.initAnimations();
    this.Reset();
  }

  initAnimations() {
    this._anims.fade = new Animation(script.getSceneObject(), this._fadeDuration, (ratio) => {
      this._image.mainPass.baseColor = new vec4(1, 1, 1, ratio);
    });

    this._anims.float = new Animation(
      script.getSceneObject(),
      this._floatDuration,
      (ratio) => {
        var offsetY = this._floatAmplitude * Math.sin((ratio + this._floatPhase) * Math.PI * 2);
        this._transform.anchors.setCenter(this._baseCenter.add(new vec2(0, offsetY)));
      },
      RepeatMode.Loop,
    );
  }

  Reset() {
    this._anims.fade.Reset();
    this._anims.float.Reset();
  }
}

function randomRange(min, max) {
  return min + Math.random() * (max - min);
}

function Instantiation() {
  floatingClubArray = [];
  script.floatingClub.forEach((element, index) => {
    const temp = new FloatingClubLogo(element, index);
    floatingClubArray.push(temp);
  });
}
