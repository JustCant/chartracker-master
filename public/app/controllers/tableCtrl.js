/*jshint esversion:6*/
angular.module('hpTracker')
.controller('tableCtrl', ['$scope', function($scope) {

  //Create char object and char arrays
  $scope.char = {};
  $scope.playerChars = [];
  $scope.enemyChars = [];
  $scope.localChars = [];

  //Grab inputs and associated popups
  const $charNameAdd = $('#charNameAdd');
  const $namePopup = $('#namePopup');
  const $charHpAdd = $('#charHpAdd');
  const $hpPopup = $('#hpPopup');
  const $hpPopup2 = $('#hpPopup2');

  //Hide popups by default
  $namePopup.hide();
  $hpPopup.hide();
  $hpPopup2.hide();

  if (localStorage.length === 0) {
    $scope.playerChars.push({"name":"Mario","hitPoints":"100","type":"hero","show":false,"popupShow":false,"id":'Mario'});
    $scope.enemyChars.push({"name":"King Bowser","hitPoints":"250","type":"enemy","show":false,"popupShow":false,"id":'Bowser'});
  }

  //If local storage has data populate columns
  if (localStorage.length > 0) {
    for (let j = 0; j < localStorage.length; j++) {
      let localChar = JSON.parse(localStorage.getItem(localStorage.key(j)));
      $scope.localChars.push(localChar);
      if (localChar.type === 'hero') {
          $scope.playerChars.push(localChar);
      } else if (localChar.type === 'enemy') {
          $scope.enemyChars.push(localChar);
      }//end inner if...else
    }//end for
  } else {
    console.log('Nothing in local Storage');
  }//end outer...else

  //Function which adds a char to the hero column
  $scope.addHero = function() {
    $scope.char.type = 'hero';
    $scope.char.show = false;
    $scope.char.popupShow = false;
    let d = new Date();
    let random = d.getTime();
    $scope.char.id = random;

    if (!$scope.char.name) {
      $namePopup.show();
      let namePopper = new Popper($charNameAdd, $namePopup, {
        placement: 'bottom'
      });
      return;
    } else if (!$scope.char.hitPoints) {
      $namePopup.hide();
      $hpPopup.show();
      let hpPopper = new Popper($charHpAdd, $hpPopup, {
        placement: 'bottom'
      });
    } else if (isNaN(parseInt($scope.char.hitPoints))) {
      $namePopup.hide();
      $hpPopup.hide();
      $hpPopup2.show();
      let hpPopper2 = new Popper($charHpAdd, $hpPopup2, {
        placement: 'bottom'
      });
    } else {
      $namePopup.hide();
      $hpPopup.hide();
      $hpPopup2.hide();
      $scope.playerChars.push($scope.char);
      localStorage.setItem(`${$scope.char.id}`, JSON.stringify($scope.char));
      $scope.localChars.push($scope.char);
      $scope.char = {};
    }//end if...else
  };//end addHero

  //Function which adds a char to the enemy column
  $scope.addEnemy = function() {
    $scope.char.type = 'enemy';
    $scope.char.show = false;
    $scope.char.popupShow = false;
    let enemyCounter = 0;
    let d = new Date();
    let random = d.getTime();
    $scope.char.id = random;

    if (!$scope.char.name) {
      $namePopup.show();
      let namePopper = new Popper($charNameAdd, $namePopup, {
        placement: 'bottom'
      });
      return;
    } else if (!$scope.char.hitPoints) {
      $namePopup.hide();
      $hpPopup.show();
      let hpPopper = new Popper($charHpAdd, $hpPopup, {
        placement: 'bottom'
      });
    } else if (isNaN(parseInt($scope.char.hitPoints))) {
      $namePopup.hide();
      $hpPopup.hide();
      $hpPopup2.show();
      let hpPopper2 = new Popper($charHpAdd, $hpPopup2, {
        placement: 'bottom'
      });
    } else {
      $namePopup.hide();
      $hpPopup.hide();
      $hpPopup2.hide();
      $scope.enemyChars.push($scope.char);
      localStorage.setItem(`${$scope.char.id}`, JSON.stringify($scope.char));
      $scope.localChars.push($scope.char);
      $scope.char = {};
    }//end if...else
  };//end addEnemy

  //Function which deletes a character
  $scope.delete = function(char, charArray) {
    if (charArray[0].type == 'hero') {
      let index = charArray.indexOf(char) + 1;
      let $tr = $('.pcRow')[index];
      $tr.remove();
      $scope.playerChars.splice(index - 1, 1);
    } else if (charArray[0].type == 'enemy'){
      let index = charArray.indexOf(char) + 1;
      let $tr = $('.enemyRow')[index];
      $tr.remove();
      $scope.enemyChars.splice(index - 1, 1);
    }//end if...else
    $namePopup.hide();
    localStorage.removeItem(`${char.id}`);
  };//end delete

  //Function which allows the user to edit the name and/or hp of a char
  $scope.edit = function(char, charArray) {
    char.hitPoints = parseInt(char.hitPoints);
    let index = charArray.indexOf(char);
    let $hpInput;
    let hpPopper3;

    //Make sure char name isn't blank
    if (char.name === '') {
      let $nameInput = $('.nameInput')[index];
      $namePopup.show();
      let namePopper = new Popper($nameInput, $namePopup, {
        placement: 'top'
      });
      return;
    }//end if

    $namePopup.hide();

    //Validate that input is a number
    if(isNaN(char.hitPoints)) {
      if (char.type === 'hero') {
        $hpInput = $('.heroHpInput')[index];
        let $heroHpPopup = $('.heroHpPopup')[index];
        hpPopper3 = new Popper($hpInput, $heroHpPopup, {
          placement: 'top'
        });
      } else if (char.type === 'enemy'){
        $hpInput = $('.enemyHpInput')[index];
        let $enemyHpPopup = $('.enemyHpPopup')[index];
        hpPopper3 = new Popper($hpInput, $enemyHpPopup, {
          placement: 'top'
        });
      }//end inner if...else
      char.popupShow = true;
    } else {
      char.popupShow = false;
      char.show = !char.show;
      localStorage.setItem(`${char.id}`, JSON.stringify(char));
    }//end outer if...else
  };//end edit

  //Function which increments the hp of a creature
  $scope.increment = function(char, number) {
    char.hitPoints = parseInt(char.hitPoints);
    char.hitPoints += number;
    localStorage.setItem(`${char.id}`, JSON.stringify(char));
  };//end increment

  //Function which decrements the hp of a creature
  $scope.decrement = function(char, number) {
    char.hitPoints = parseInt(char.hitPoints);
    char.hitPoints -= number;
    localStorage.setItem(`${char.id}`, JSON.stringify(char));
  };//end decrement

}]);//end controller
