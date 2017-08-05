'use strict';

(function () {
  var profileId = document.querySelector('#profile-id') || null;
  var profileUsername = document.querySelector('#profile-username') || null;
  var profileRepos = document.querySelector('#profile-repos') || null;
  var displayName = document.querySelectorAll('.display-name');
  var apiUrl = appUrl + '/api/:id';

  function displayPrivateNavLinks() {
    var navbarElements = document.querySelectorAll('header nav li');
    for (var elem of navbarElements) {
      elem.classList.remove('hide');
    }
    document.querySelector('#login-link').classList.add('hide');
  }

  function updateHtmlElement (data, element, userProperty) {
    element.innerHTML = data[userProperty];
    displayPrivateNavLinks();
  }

  ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function (data) {
    var userObject = JSON.parse(data);

    if (userObject.displayName !== null) {
      for (var elem of displayName) {
        updateHtmlElement(userObject, elem, 'displayName');
      }
    } else {
      updateHtmlElement(userObject, displayName, 'username');
    }

    if (profileId !== null) {
      updateHtmlElement(userObject, profileId, 'id');
    }

    if (profileUsername !== null) {
      updateHtmlElement(userObject, profileUsername, 'username');
    }

    if (profileRepos !== null) {
      updateHtmlElement(userObject, profileRepos, 'publicRepos');
    }

  }));
})();
