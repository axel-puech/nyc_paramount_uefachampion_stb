//@input SceneObject parent

//@input SceneObject background
//@input SceneObject clubLogo
//@input SceneObject clubText
//@input SceneObject yourClubIs

//@ui {"widget":"separator"}
//@ui {"widget":"label", "label":"CLUB 1 "}
//@input Asset.Texture club1Background
//@input Asset.Texture club1Logo
//@input Asset.Texture club1Text

//@input vec4 club1Color1 {"widget":"color"}
//@input vec4 club1Color2 {"widget":"color"}
//@input vec4 club1Color3 {"widget":"color"}

//@ui {"widget":"separator"}
//@ui {"widget":"label", "label":"CLUB 2 "}
//@input Asset.Texture club2Background
//@input Asset.Texture club2Logo
//@input Asset.Texture club2Text
//@input vec4 club2Color1 {"widget":"color"}
//@input vec4 club2Color2 {"widget":"color"}
//@input vec4 club2Color3 {"widget":"color"}

//@ui {"widget":"separator"}
//@ui {"widget":"label", "label":"CLUB 3 "}
//@input Asset.Texture club3Background
//@input Asset.Texture club3Logo
//@input Asset.Texture club3Text
//@input vec4 club3Color1 {"widget":"color"}
//@input vec4 club3Color2 {"widget":"color"}
//@input vec4 club3Color3 {"widget":"color"}

//_________________________Director Setup_________________________//
script.subScene = new global.SubScene(script, script.parent);
script.subScene.OnStart = Start;
script.subScene.OnLateStart = OnLateStart;
script.subScene.OnStop = Stop;
script.subScene.SetUpdate(Update);
//__________________________Variables_____________________________//

const backgroundImage = script.background.getComponent("Component.Image");
const clubLogoImage = script.clubLogo.getComponent("Component.Image");
const clubTextImage = script.clubText.getComponent("Component.Image");
const yourClubIsImage = script.yourClubIs.getComponent("Component.Image");

const outroElements = [backgroundImage, clubLogoImage, clubTextImage, yourClubIsImage];

const backgroundTextures = [script.club1Background, script.club2Background, script.club3Background];
const clubLogoTextures = [script.club1Logo, script.club2Logo, script.club3Logo];
const clubTextTextures = [script.club1Text, script.club2Text, script.club3Text];

//________Caller________//
//________Listener________//
//________DelayEvent________//

//_________________________Director_Functions_____________________//
function Start() {
  setOutroTextures();
}
function OnLateStart() {
  fadeOutro.GoTo(1);
}
function Update() {}

function Stop() {
  fadeOutro.Reset();
}

//___________________________Functions__________________________//

function setOutroTextures() {
  if (global.matchingClubId < 0) return;
  backgroundImage.mainPass.baseTex = backgroundTextures[global.matchingClubId];
  clubTextImage.mainPass.baseTex = clubTextTextures[global.matchingClubId];
  clubLogoImage.mainPass.baseTex = clubLogoTextures[global.matchingClubId];
}

//___________________________Animations_________________________//

const fadeOutro = new Animation(script.getSceneObject(), 0.5, (ratio) => {
  outroElements.forEach((element) => {
    element.mainPass.baseColor = new vec4(1, 1, 1, ratio);
  });
});
