//@input SceneObject parent

//@input SceneObject background
//@input SceneObject commercialText
//@input SceneObject finalMessage

//@ui {"widget":"separator"}
//@ui {"widget":"label", "label":"ARSENAL "}
//@input Asset.Texture arsenalBackground
//@input Asset.Texture arsenalCommercialText
//@input Asset.Texture arsenalFinalMessage

//@ui {"widget":"separator"}
//@ui {"widget":"label", "label":"BAYERN "}
//@input Asset.Texture bayernBackground
//@input Asset.Texture bayernCommercialText
//@input Asset.Texture bayernFinalMessage

//@ui {"widget":"separator"}
//@ui {"widget":"label", "label":"BVB "}
//@input Asset.Texture bvbBackground
//@input Asset.Texture bvbCommercialText
//@input Asset.Texture bvbFinalMessage

//@ui {"widget":"separator"}
//@ui {"widget":"label", "label":"FCB "}
//@input Asset.Texture fcbBackground
//@input Asset.Texture fcbCommercialText
//@input Asset.Texture fcbFinalMessage

//@ui {"widget":"separator"}
//@ui {"widget":"label", "label":"LFC "}
//@input Asset.Texture lfcBackground
//@input Asset.Texture lfcCommercialText
//@input Asset.Texture lfcFinalMessage

//@ui {"widget":"separator"}
//@ui {"widget":"label", "label":"MAN CITY "}
//@input Asset.Texture manCityBackground
//@input Asset.Texture manCityCommercialText
//@input Asset.Texture manCityFinalMessage

//@ui {"widget":"separator"}
//@ui {"widget":"label", "label":"MAN U "}
//@input Asset.Texture manUBackground
//@input Asset.Texture manUCommercialText
//@input Asset.Texture manUFinalMessage

//@ui {"widget":"separator"}
//@ui {"widget":"label", "label":"MILANO "}
//@input Asset.Texture milanoUBackground
//@input Asset.Texture milanoUCommercialText
//@input Asset.Texture milanoUFinalMessage

//@ui {"widget":"separator"}
//@ui {"widget":"label", "label":"PSG "}
//@input Asset.Texture psgUBackground
//@input Asset.Texture psgUCommercialText
//@input Asset.Texture psgUFinalMessage

//@ui {"widget":"separator"}
//@ui {"widget":"label", "label":"REAL "}
//@input Asset.Texture realBackground
//@input Asset.Texture realCommercialText
//@input Asset.Texture realFinalMessage

//_________________________Director Setup_________________________//
script.subScene = new global.SubScene(script, script.parent);
script.subScene.OnStart = Start;
script.subScene.OnLateStart = OnLateStart;
script.subScene.OnStop = Stop;
script.subScene.SetUpdate(Update);
//__________________________Variables_____________________________//

const backgroundImage = script.background.getComponent("Component.Image");
const commercialTextImage = script.commercialText.getComponent("Component.Image");
const finalMessageImage = script.finalMessage.getComponent("Component.Image");

const outroElements = [backgroundImage, commercialTextImage, finalMessageImage];

const backgroundTextures = [
  script.arsenalBackground,
  script.bayernBackground,
  script.bvbBackground,
  script.fcbBackground,
  script.lfcBackground,
  script.manCityBackground,
  script.manUBackground,
  script.milanoUBackground,
  script.psgUBackground,
  script.realBackground,
];
const commercialTextTextures = [
  script.arsenalCommercialText,
  script.bayernCommercialText,
  script.bvbCommercialText,
  script.fcbCommercialText,
  script.lfcCommercialText,
  script.manCityCommercialText,
  script.manUCommercialText,
  script.milanoUCommercialText,
  script.psgUCommercialText,
  script.realCommercialText,
];
const finalMessageTextures = [
  script.arsenalFinalMessage,
  script.bayernFinalMessage,
  script.bvbFinalMessage,
  script.fcbFinalMessage,
  script.lfcFinalMessage,
  script.manCityFinalMessage,
  script.manUFinalMessage,
  script.milanoUFinalMessage,
  script.psgUFinalMessage,
  script.realFinalMessage,
];

//________Caller________//
//________Listener________//
//________DelayEvent________//

//_________________________Director_Functions_____________________//
function Start() {}
function OnLateStart() {
  fadeOutro.GoTo(1);
  setOutroTextures();
}
function Update() {}

function Stop() {
  fadeOutro.Reset();
}

//___________________________Functions__________________________//

function setOutroTextures() {
  print("global.matchingClubId: " + global.matchingClubId);
  if (global.matchingClubId < 0) return;
  backgroundImage.mainPass.baseTex = backgroundTextures[global.matchingClubId];
  commercialTextImage.mainPass.baseTex = commercialTextTextures[global.matchingClubId];
  finalMessageImage.mainPass.baseTex = finalMessageTextures[global.matchingClubId];
}

//___________________________Animations_________________________//

const fadeOutro = new Animation(script.getSceneObject(), 0.5, (ratio) => {
  outroElements.forEach((element) => {
    element.mainPass.baseColor = new vec4(1, 1, 1, ratio);
  });
});
