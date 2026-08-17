//@input SceneObject subSceneParent
//@input bool useFrontBack = true;

var director = null;

script.createEvent("OnStartEvent").bind(OnStart);

function OnStart() {
  director = new global.Director(script, script.subSceneParent, script.useFrontBack, OnSceneEnded);
}

//global.touchSystem.touchBlocking = true
function OnSceneEnded(sceneName, params) {
  switch (sceneName) {
    case "Main":
      director.GoToScene("Outro", false, false);
      break;
    case "Outro":
      director.GoToScene("Main", false, false);
      break;
  }
}

//script.subScene.CallEnd(null);
