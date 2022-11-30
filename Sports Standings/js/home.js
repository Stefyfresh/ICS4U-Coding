//Adapted from Bulma
document.addEventListener('DOMContentLoaded', () => {

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  
    // Add a click event on each of them
    $navbarBurgers.forEach( el => {
      el.addEventListener('click', () => {
  
        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);
  
        // Toggle the "is-active" class on the "navbar-burger"
        el.classList.toggle('is-active');

        // Toggle is-hidden on the dropdown
        $target.classList.toggle('is-hidden');

      });
    });
  
  });

  function firstTimeInit() {
    if (localStorage.matches == undefined) {
    console.log("Data has been loaded from a saved state in code.");

        localStorage.setItem('matches', `[{"type":0,"id":1,"semiID":0,"red":{"teams":[6859,4152,914],"totalScore":7,"autoScore":2,"teleopScore":5,"foulPoints":0,"rankingPoints":0},"blue":{"teams":[8764,5031,6864],"totalScore":25,"autoScore":6,"teleopScore":15,"foulPoints":4,"rankingPoints":2},"video":"https://youtu.be/Da80gCoyuUE"},{"type":0,"id":3,"semiID":0,"red":{"teams":[5036,4252,865],"totalScore":22,"autoScore":6,"teleopScore":16,"foulPoints":0,"rankingPoints":0},"blue":{"teams":[2706,4039,2013],"totalScore":88,"autoScore":20,"teleopScore":22,"foulPoints":46,"rankingPoints":3},"video":"https://youtu.be/1VAskX8bHho"},{"type":0,"id":4,"semiID":0,"red":{"teams":[1360,3560,4152],"totalScore":13,"autoScore":2,"teleopScore":3,"foulPoints":8,"rankingPoints":0},"blue":{"teams":[6135,8764,1246],"totalScore":22,"autoScore":6,"teleopScore":16,"foulPoints":0,"rankingPoints":2},"video":"https://youtu.be/Xk9xD-yhRzM"},{"type":0,"id":5,"semiID":0,"red":{"teams":[4039,865,7480],"totalScore":91,"autoScore":18,"teleopScore":69,"foulPoints":4,"rankingPoints":4},"blue":{"teams":[914,6864,2013],"totalScore":6,"autoScore":6,"teleopScore":0,"foulPoints":0,"rankingPoints":0},"video":"https://youtu.be/u7k_2ndAcqw"},{"type":1,"id":1,"semiID":1,"red":{"teams":[7480,4039,4252],"totalScore":78,"autoScore":14,"teleopScore":60,"foulPoints":4,"rankingPoints":0},"blue":{"teams":[4152,5031,2706],"totalScore":18,"autoScore":10,"teleopScore":8,"foulPoints":0,"rankingPoints":0},"video":"https://youtu.be/o4FDH2BO_dY"},{"type":0,"id":6,"semiID":0,"red":{"teams":[4252,6865,6859],"totalScore":12,"autoScore":4,"teleopScore":8,"foulPoints":0,"rankingPoints":0},"blue":{"teams":[2706,5036,5031],"totalScore":35,"autoScore":10,"teleopScore":17,"foulPoints":8,"rankingPoints":2},"video":"https://youtu.be/juo_AF40xCY"},{"type":0,"id":2,"semiID":0,"red":{"teams":[1246,1360,6865],"totalScore":25,"autoScore":2,"teleopScore":15,"foulPoints":8,"rankingPoints":0},"blue":{"teams":[3560,6135,7480],"totalScore":35,"autoScore":12,"teleopScore":19,"foulPoints":4,"rankingPoints":2},"video":"https://youtu.be/-kUlD4nbX6M"},{"type":2,"id":1,"semiID":0,"red":{"teams":[7480,4039,4252],"totalScore":82,"autoScore":22,"teleopScore":56,"foulPoints":4,"rankingPoints":0},"blue":{"teams":[5036,865,2013],"totalScore":46,"autoScore":14,"teleopScore":32,"foulPoints":0,"rankingPoints":0},"video":"https://youtu.be/l1SfeGJb7Co"},{"type":1,"id":1,"semiID":2,"red":{"teams":[5036,865,2013],"totalScore":41,"autoScore":14,"teleopScore":27,"foulPoints":0,"rankingPoints":0},"blue":{"teams":[6135,1360,914],"totalScore":48,"autoScore":18,"teleopScore":30,"foulPoints":0,"rankingPoints":0},"video":"https://youtu.be/7Vmps-kKyms"},{"type":2,"id":2,"semiID":0,"red":{"teams":[7480,4039,4252],"totalScore":68,"autoScore":34,"teleopScore":34,"foulPoints":0,"rankingPoints":0},"blue":{"teams":[5036,865,2013],"totalScore":54,"autoScore":14,"teleopScore":32,"foulPoints":8,"rankingPoints":0},"video":"https://youtu.be/DawnDNOHNDk"}]`);
    }
  }

  firstTimeInit();