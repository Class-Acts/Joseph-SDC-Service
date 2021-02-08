//creates a function that find the lowest key among a given chance array that exceeds a random roll of Math.random(). Chance array represents an approximated distribution of chances for questions, answers, votes, and reports.
let chance = () => {
  return (chances) => {
    let dice = Math.random();
    for (let i = 0; i < chances.length; i++) {
      if (dice < chances[i]) {
        return i;
      }
    }
  };
};

let rInt = (min, max) => {
  return Math.floor(Math.random() * (max + 1 - min) + min);
},

let convertDate = function(str) {
  let splitDates = str.split(' ');
  let year = splitDates[3];
  let day = splitDates[2];
  let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let month = months.indexOf(splitDates[1]) + 1;
  if (month < 10) {
    month = '0' + month;
  }
  let newDate = `${year}-${month}-${day}`;
  return newDate;
}

module.exports = {
  questionChance: chance({.05, .15, .3, .5, .7, .85, .95, 1}),
  answerChance: chance({.15, .55, .7, .85, 1}),
  voteChance: chance({.6, 1}),
  reportChance: chance({.7, 1}),
  rInt: rInt,
  convertDate: convertDate
};
