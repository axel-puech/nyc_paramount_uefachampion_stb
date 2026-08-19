//@input SceneObject parent

//@input Component.VFXComponent vfxConfettis

//@ui {"widget":"separator"}
//@ui {"widget":"label", "label":"ARSENAL "}

//@input vec4 arsenalColor1 {"widget":"color"}
//@input vec4 arsenalColor2 {"widget":"color"}
//@input vec4 arsenalColor3 {"widget":"color"}

//@ui {"widget":"separator"}
//@ui {"widget":"label", "label":"BAYERN "}

//@input vec4 bayernColor1 {"widget":"color"}
//@input vec4 bayernColor2 {"widget":"color"}
//@input vec4 bayernColor3 {"widget":"color"}

//@ui {"widget":"separator"}
//@ui {"widget":"label", "label":"BVB "}

//@input vec4 bvbColor1 {"widget":"color"}
//@input vec4 bvbColor2 {"widget":"color"}
//@input vec4 bvbColor3 {"widget":"color"}

//@ui {"widget":"separator"}
//@ui {"widget":"label", "label":"FCB "}

//@input vec4 fcbColor1 {"widget":"color"}
//@input vec4 fcbColor2 {"widget":"color"}
//@input vec4 fcbColor3 {"widget":"color"}

//@ui {"widget":"separator"}
//@ui {"widget":"label", "label":"LFC "}

//@input vec4 lfcColor1 {"widget":"color"}
//@input vec4 lfcColor2 {"widget":"color"}
//@input vec4 lfcColor3 {"widget":"color"}

//@ui {"widget":"separator"}
//@ui {"widget":"label", "label":"MAN CITY "}

//@input vec4 manCityColor1 {"widget":"color"}
//@input vec4 manCityColor2 {"widget":"color"}
//@input vec4 manCityColor3 {"widget":"color"}

//@ui {"widget":"separator"}
//@ui {"widget":"label", "label":"MAN U "}

//@input vec4 manUColor1 {"widget":"color"}
//@input vec4 manUColor2 {"widget":"color"}
//@input vec4 manUColor3 {"widget":"color"}

//@ui {"widget":"separator"}
//@ui {"widget":"label", "label":"MILANO "}

//@input vec4 milanoColor1 {"widget":"color"}
//@input vec4 milanoColor2 {"widget":"color"}
//@input vec4 milanoColor3 {"widget":"color"}

//@ui {"widget":"separator"}
//@ui {"widget":"label", "label":"PSG "}

//@input vec4 psgColor1 {"widget":"color"}
//@input vec4 psgColor2 {"widget":"color"}
//@input vec4 psgColor3 {"widget":"color"}

//@ui {"widget":"separator"}
//@ui {"widget":"label", "label":"REAL "}

//@input vec4 realColor1 {"widget":"color"}
//@input vec4 realColor2 {"widget":"color"}
//@input vec4 realColor3 {"widget":"color"}

//_________________________Director Setup_________________________//
script.subScene = new global.SubScene(script, script.parent);
script.subScene.OnStart = Start;
script.subScene.OnLateStart = OnLateStart;
script.subScene.OnStop = Stop;
script.subScene.SetUpdate(Update);
//__________________________Variables_____________________________//

const colorArray = {
  arsenal: {
    color1: script.arsenalColor1,
    color2: script.arsenalColor2,
    color3: script.arsenalColor3,
  },
  bayern: {
    color1: script.bayernColor1,
    color2: script.bayernColor2,
    color3: script.bayernColor3,
  },
  bvb: {
    color1: script.bvbColor1,
    color2: script.bvbColor2,
    color3: script.bvbColor3,
  },
  fcb: {
    color1: script.fcbColor1,
    color2: script.fcbColor2,
    color3: script.fcbColor3,
  },
  lfc: {
    color1: script.lfcColor1,
    color2: script.lfcColor2,
    color3: script.lfcColor3,
  },
  manCity: {
    color1: script.manCityColor1,
    color2: script.manCityColor2,
    color3: script.manCityColor3,
  },
  manU: {
    color1: script.manUColor1,
    color2: script.manUColor2,
    color3: script.manUColor3,
  },
  milano: {
    color1: script.milanoColor1,
    color2: script.milanoColor2,
    color3: script.milanoColor3,
  },
  psg: {
    color1: script.psgColor1,
    color2: script.psgColor2,
    color3: script.psgColor3,
  },
  real: {
    color1: script.realColor1,
    color2: script.realColor2,
    color3: script.realColor3,
  },
};

const clubKeysById = ["arsenal", "bayern", "bvb", "fcb", "lfc", "manCity", "manU", "milano", "psg", "real"];

//________Caller________//
//________Listener________//
//________DelayEvent________//

//_________________________Director_Functions_____________________//
function Start() {}
function OnLateStart() {
  setConfettisColor();
  script.vfxConfettis.asset.properties["killParticles"] = 1;
  animSpawnAmount.GoTo(0.2);
}
function Update() {}

function Stop() {
  script.vfxConfettis.asset.properties["killParticles"] = 1;
  animSpawnAmount.Reset();
}
//___________________________Functions__________________________//

function setConfettisColor() {
  const clubKey = clubKeysById[global.matchingClubId];
  const clubColors = colorArray[clubKey];

  if (!clubColors) return;

  script.vfxConfettis.asset.properties["colorA"] = clubColors.color1;
  script.vfxConfettis.asset.properties["colorB"] = clubColors.color2;
  script.vfxConfettis.asset.properties["colorC"] = clubColors.color3;
}

//___________________________Animations_________________________//

const animSpawnAmount = new Animation(script.getSceneObject(), 1, (ratio) => {
  script.vfxConfettis.asset.properties["spawnAmount"] = ratio;
});

animSpawnAmount.OnStart = function (ratio) {
  script.vfxConfettis.asset.properties["killParticles"] = 0;
};
