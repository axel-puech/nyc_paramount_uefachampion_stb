//@input SceneObject parent
//@input SceneObject hintTap

//_________________________Director Setup_________________________//
script.subScene = new global.SubScene(script, script.parent);
script.subScene.OnStart = Start;
script.subScene.OnLateStart = OnLateStart;
script.subScene.OnStop = Stop;
script.subScene.SetUpdate(Update);

//__________________________Variables_____________________________//

global.currentRound = null;

var scores = {
  arsenal: 0,
  barcelona: 0,
  bayernMunich: 0,
  borussiaDortmund: 0,
  interMilan: 0,
  liverpool: 0,
  manchesterCity: 0,
  manchesterUnited: 0,
  psg: 0,
  realMadrid: 0,
};

const hintTapImage = script.hintTap.getComponent("Component.Image");
let firstAnswer = false;
global.matchingClubId = -1;

let currentQuestion = 0;

// Les index de l'outro sont définis dans Outro.js.
const clubOutroIds = {
  arsenal: 0,
  bayernMunich: 1,
  borussiaDortmund: 2,
  barcelona: 3,
  liverpool: 4,
  manchesterCity: 5,
  manchesterUnited: 6,
  interMilan: 7,
  psg: 8,
  realMadrid: 9,
};

// Index des réponses : A = 0, B = 1, C = 2.
const scoreRules = [
  { 0: ["arsenal"], 1: ["barcelona"], 2: ["borussiaDortmund"] },
  { 0: ["psg"], 1: ["borussiaDortmund"], 2: ["bayernMunich", "manchesterCity"] },
  { 0: ["interMilan"], 1: ["manchesterUnited"], 2: ["psg"] },
  { 0: ["liverpool"], 1: ["arsenal", "interMilan"], 2: ["manchesterUnited", "realMadrid"] },
  { 1: ["bayernMunich"] },
  { 0: ["liverpool"], 1: ["barcelona"], 2: ["manchesterCity", "realMadrid"] },
];
//________Caller________//

const gameEndCaller = script.subScene.CreateCaller("gameEndEvent");
//________Listener________//

const answerListener = script.subScene.CreateListener("AnswerEvent", OnAnswer);

//________DelayEvent________//

//_________________________Director_Functions_____________________//
function Start() {
  global.currentRound = 1;
}
function OnLateStart() {}
function Update() {}

function Stop() {
  firstAnswer = false;
  fadeHintTap.Reset();
  fadeHintTap.JumpTo(1);
  // global.matchingClubId = -1;
  currentQuestion = 0;

  scores = {
    arsenal: 0,
    barcelona: 0,
    bayernMunich: 0,
    borussiaDortmund: 0,
    interMilan: 0,
    liverpool: 0,
    manchesterCity: 0,
    manchesterUnited: 0,
    psg: 0,
    realMadrid: 0,
  };
}

//___________________________Functions__________________________//

function OnAnswer(answerId) {
  if (!firstAnswer) {
    fadeHintTap.GoTo(0);
    firstAnswer = true;
  }

  const clubsToScore = scoreRules[currentQuestion] && scoreRules[currentQuestion][answerId];
  if (clubsToScore) {
    clubsToScore.forEach((club) => {
      scores[club]++;
    });
  }

  print("Scores: " + JSON.stringify(scores));

  currentQuestion++;

  // Une fois les 6 réponses reçues, l'outro affiche le club au meilleur score.
  if (currentQuestion === global.numberRounds) {
    let matchingClub = "arsenal";
    gameEndCaller.Call();
    Object.keys(scores).forEach((club) => {
      if (scores[club] > scores[matchingClub]) {
        matchingClub = club;
      }
    });

    global.matchingClubId = clubOutroIds[matchingClub];
    print(" global.matchingClubId :" + global.matchingClubId);
    print("Matching club: " + matchingClub + " (score: " + scores[matchingClub] + ")");
  }
}

//___________________________Animations_________________________//

const fadeHintTap = new Animation(script.getSceneObject(), 0.5, (ratio) => {
  hintTapImage.mainPass.baseColor = new vec4(1, 1, 1, ratio);
});

// Arsenal: Q1A (Cultured) + Q4B (Understated/Cool)
// Barcelona: Q1B (Relaxed) + Q6B (Individualistic/I do me)
// Bayern Munich: Q2C (Organized/Plans) + Q5B (Always a step ahead)
// Borussia Dortmund: Q1C (Spontaneous/Friends) + Q2B (Funny/Memes)
// Inter Milan: Q3A (Chic/Intimate) + Q4B (Sophisticated/Cool)
// Liverpool: Q4A (Warm/Golden retriever) + Q6A (Communal/Good times)
// Manchester City: Q2C (Polished/Plans) + Q6C (Ambitious/Why settle)
// Manchester United: Q4C (Charismatic/Lion) + Q3B (Social/Big table)
// PSG: Q3C (Fashionable/Hottest spot) + Q2A (Dramatic/Chaos agent)
// Real Madrid: Q4C (Confident/Iconic) + Q6C (Excellence/Why settle)
