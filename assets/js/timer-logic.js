//A variable to set count to how many times pomodoro and break functions run
var count = 0;

//code block to run timer
$("#startPomodoroTimer").on("click", function(evt){
  evt.preventDefault();
  //variables added inside the on click function, because otherwise user values display as NaN in the timer
  var workMinutes = parseInt($("#pomodoroTimer").val());
  var shortBreak = parseInt($("#shortBreak").val());
  var longBreak = parseInt($("#longBreak").val());
  var timeDisplay = $("#countdownTimer");
  var nextText = $("#whatsNext");
  var workDuration = moment.duration(workMinutes, 'minutes');
  var shortBreakDuration = moment.duration(shortBreak, 'minutes');
  var longBreakDuration = moment.duration(longBreak, 'minutes');
  var interval = 1000;
  var pomodoroInterval;

  function displayTime(duration, text) {
    var minutes = duration.minutes();
    var seconds = duration.seconds();
    timeDisplay.text((minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds));
    nextText.text(text);
  }

  //function to start pomodoros
  function startPomodoroInterval(){
  pomodoroInterval = setInterval(function(){
    workDuration = moment.duration(workDuration.asMilliseconds() - interval, 'milliseconds');
    if (workDuration.asMilliseconds() < 0) {
      clearInterval(pomodoroInterval);
      shortBreakStart();
    } else {
      displayTime(workDuration, "Short Break ("+shortBreak+" min)");
    }
  }, interval);
  }

  function shortBreakStart(){
    shortBreakInterval = setInterval(function(){
      shortBreakDuration = moment.duration(shortBreakDuration.asMilliseconds() - interval, 'milliseconds');
      if (shortBreakDuration.asMilliseconds() < 0) {
        clearInterval(shortBreakInterval);
        count++;
        if (count < 3) {
          startPomodoroInterval();
        } else {
          longBreakStart();
          displayTime(shortBreakDuration, "Work block ("+workMinutes+" min)");
        }
      }
    }, interval);
  }

  function longBreakStart(){
    longBreakInterval = setInterval(function(){
      longBreakDuration = moment.duration(longBreakDuration.asMilliseconds() - interval, 'milliseconds');
      if (longBreakDuration.asMilliseconds() < 0) {
        clearInterval(longBreakInterval);
        startPomodoroInterval();
      } else {
        displayTime(longBreakDuration, "Work block ("+workMinutes+" min)");
      }
    }, interval);
  }
});
