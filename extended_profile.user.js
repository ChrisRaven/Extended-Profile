// ==UserScript==
// @name         Extended Profile
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Extened User Profile in EyeWire
// @author       Krzysztof Kruk
// @match        https://*.eyewire.org/*
// @exclude      https://*.eyewire.org/1.0/*
// @downloadURL  https://raw.githubusercontent.com/ChrisRaven/EyeWire-Extended-Profile/master/extended_profile.user.js

// ==/UserScript==

/*jshint esversion: 6 */
/*globals $, account, tomni, THREE */ 

let LOCAL = false;
let serverPath = '';
if (LOCAL) {
  console.log('%c--== TURN OFF "LOCAL" BEFORE RELEASING!!! ==--', "color: red; font-style: italic; font-weight: bold;");
  serverPath = 'http://localhost/ep/';
}
else {
  serverPath = 'https://ewstats.feedia.co/';
}

// source: http://designwithpc.com/Plugins/ddSlick
(function(e){e.fn.ddslick=function(l){if(c[l]){return c[l].apply(this,Array.prototype.slice.call(arguments,1))}else{if(typeof l==="object"||!l){return c.init.apply(this,arguments)}else{e.error("Method "+l+" does not exists.")}}};var c={},d={data:[],keepJSONItemsOnTop:false,width:260,height:null,background:"#eee",selectText:"",defaultSelectedIndex:null,truncateDescription:true,imagePosition:"left",showSelectedHTML:true,clickOffToClose:true,embedCSS:true,onSelected:function(){}},i='<div class="dd-select"><input class="dd-selected-value" type="hidden" /><a class="dd-selected"></a><span class="dd-pointer dd-pointer-down"></span></div>',a='<ul class="dd-options"></ul>',b='<style id="css-ddslick" type="text/css">.dd-select{ border-radius:2px; border:solid 1px #ccc; position:relative; cursor:pointer;}.dd-desc { color:#aaa; display:block; overflow: hidden; font-weight:normal; line-height: 1.4em; }.dd-selected{ overflow:hidden; display:block; padding:10px; font-weight:bold;}.dd-pointer{ width:0; height:0; position:absolute; right:10px; top:50%; margin-top:-3px;}.dd-pointer-down{ border:solid 5px transparent; border-top:solid 5px #000; }.dd-pointer-up{border:solid 5px transparent !important; border-bottom:solid 5px #000 !important; margin-top:-8px;}.dd-options{ border:solid 1px #ccc; border-top:none; list-style:none; box-shadow:0px 1px 5px #ddd; display:none; position:absolute; z-index:2000; margin:0; padding:0;background:#fff; overflow:auto;}.dd-option{ padding:10px; display:block; border-bottom:solid 1px #ddd; overflow:hidden; text-decoration:none; color:#333; cursor:pointer;-webkit-transition: all 0.25s ease-in-out; -moz-transition: all 0.25s ease-in-out;-o-transition: all 0.25s ease-in-out;-ms-transition: all 0.25s ease-in-out; }.dd-options > li:last-child > .dd-option{ border-bottom:none;}.dd-option:hover{ background:#f3f3f3; color:#000;}.dd-selected-description-truncated { text-overflow: ellipsis; white-space:nowrap; }.dd-option-selected { background:#f6f6f6; }.dd-option-image, .dd-selected-image { vertical-align:middle; float:left; margin-right:5px; max-width:64px;}.dd-image-right { float:right; margin-right:15px; margin-left:5px;}.dd-container{ position:relative;}​ .dd-selected-text { font-weight:bold}​</style>';c.init=function(l){var l=e.extend({},d,l);if(e("#css-ddslick").length<=0&&l.embedCSS){e(b).appendTo("head")}return this.each(function(){var p=e(this),q=p.data("ddslick");if(!q){var n=[],o=l.data;p.find("option").each(function(){var w=e(this),v=w.data();n.push({text:e.trim(w.text()),value:w.val(),selected:w.is(":selected"),description:v.description,imageSrc:v.imagesrc})});if(l.keepJSONItemsOnTop){e.merge(l.data,n)}else{l.data=e.merge(n,l.data)}var m=p,s=e('<div id="'+p.attr("id")+'"></div>');p.replaceWith(s);p=s;p.addClass("dd-container").append(i).append(a);var n=p.find(".dd-select"),u=p.find(".dd-options");u.css({width:l.width});n.css({width:l.width,background:l.background});p.css({width:l.width});if(l.height!=null){u.css({height:l.height,overflow:"auto"})}e.each(l.data,function(v,w){if(w.selected){l.defaultSelectedIndex=v}u.append('<li><a class="dd-option">'+(w.value?' <input class="dd-option-value" type="hidden" value="'+w.value+'" />':"")+(w.imageSrc?' <img class="dd-option-image'+(l.imagePosition=="right"?" dd-image-right":"")+'" src="'+w.imageSrc+'" />':"")+(w.text?' <label class="dd-option-text">'+w.text+"</label>":"")+(w.description?' <small class="dd-option-description dd-desc">'+w.description+"</small>":"")+"</a></li>")});var t={settings:l,original:m,selectedIndex:-1,selectedItem:null,selectedData:null};p.data("ddslick",t);if(l.selectText.length>0&&l.defaultSelectedIndex==null){p.find(".dd-selected").html(l.selectText)}else{var r=(l.defaultSelectedIndex!=null&&l.defaultSelectedIndex>=0&&l.defaultSelectedIndex<l.data.length)?l.defaultSelectedIndex:0;j(p,r)}p.find(".dd-select").on("click.ddslick",function(){f(p)});p.find(".dd-option").on("click.ddslick",function(){j(p,e(this).closest("li").index())});if(l.clickOffToClose){u.addClass("dd-click-off-close");p.on("click.ddslick",function(v){v.stopPropagation()});e("body").on("click",function(){e(".dd-click-off-close").slideUp(50).siblings(".dd-select").find(".dd-pointer").removeClass("dd-pointer-up")})}}})};c.select=function(l){return this.each(function(){if(l.index!==undefined){j(e(this),l.index)}})};c.open=function(){return this.each(function(){var m=e(this),l=m.data("ddslick");if(l){f(m)}})};c.close=function(){return this.each(function(){var m=e(this),l=m.data("ddslick");if(l){k(m)}})};c.destroy=function(){return this.each(function(){var n=e(this),m=n.data("ddslick");if(m){var l=m.original;n.removeData("ddslick").unbind(".ddslick").replaceWith(l)}})};function j(q,s){var u=q.data("ddslick");var r=q.find(".dd-selected"),n=r.siblings(".dd-selected-value"),v=q.find(".dd-options"),l=r.siblings(".dd-pointer"),p=q.find(".dd-option").eq(s),m=p.closest("li"),o=u.settings,t=u.settings.data[s];q.find(".dd-option").removeClass("dd-option-selected");p.addClass("dd-option-selected");u.selectedIndex=s;u.selectedItem=m;u.selectedData=t;if(o.showSelectedHTML){r.html((t.imageSrc?'<img class="dd-selected-image'+(o.imagePosition=="right"?" dd-image-right":"")+'" src="'+t.imageSrc+'" />':"")+(t.text?'<label class="dd-selected-text">'+t.text+"</label>":"")+(t.description?'<small class="dd-selected-description dd-desc'+(o.truncateDescription?" dd-selected-description-truncated":"")+'" >'+t.description+"</small>":""))}else{r.html(t.text)}n.val(t.value);u.original.val(t.value);q.data("ddslick",u);k(q);g(q);if(typeof o.onSelected=="function"){o.onSelected.call(this,u)}}function f(p){var o=p.find(".dd-select"),m=o.siblings(".dd-options"),l=o.find(".dd-pointer"),n=m.is(":visible");e(".dd-click-off-close").not(m).slideUp(50);e(".dd-pointer").removeClass("dd-pointer-up");if(n){m.slideUp("fast");l.removeClass("dd-pointer-up")}else{m.slideDown("fast");l.addClass("dd-pointer-up")}h(p)}function k(l){l.find(".dd-options").slideUp(50);l.find(".dd-pointer").removeClass("dd-pointer-up").removeClass("dd-pointer-up")}function g(o){var n=o.find(".dd-select").css("height");var m=o.find(".dd-selected-description");var l=o.find(".dd-selected-image");if(m.length<=0&&l.length>0){o.find(".dd-selected-text").css("lineHeight",n)}}function h(l){l.find(".dd-option").each(function(){var p=e(this);var n=p.css("height");var o=p.find(".dd-option-description");var m=l.find(".dd-option-image");if(o.length<=0&&m.length>0){p.find(".dd-option-text").css("lineHeight",n)}})}})(jQuery);


// source: https://github.com/antimatter15/rgb-lab
// the following functions are based off of the pseudocode
// found on www.easyrgb.com

function lab2rgb(lab){
  var y = (lab[0] + 16) / 116,
      x = lab[1] / 500 + y,
      z = y - lab[2] / 200,
      r, g, b;

  x = 0.95047 * ((x * x * x > 0.008856) ? x * x * x : (x - 16/116) / 7.787);
  y = 1.00000 * ((y * y * y > 0.008856) ? y * y * y : (y - 16/116) / 7.787);
  z = 1.08883 * ((z * z * z > 0.008856) ? z * z * z : (z - 16/116) / 7.787);

  r = x *  3.2406 + y * -1.5372 + z * -0.4986;
  g = x * -0.9689 + y *  1.8758 + z *  0.0415;
  b = x *  0.0557 + y * -0.2040 + z *  1.0570;

  r = (r > 0.0031308) ? (1.055 * Math.pow(r, 1/2.4) - 0.055) : 12.92 * r;
  g = (g > 0.0031308) ? (1.055 * Math.pow(g, 1/2.4) - 0.055) : 12.92 * g;
  b = (b > 0.0031308) ? (1.055 * Math.pow(b, 1/2.4) - 0.055) : 12.92 * b;

  return [Math.max(0, Math.min(1, r)) * 255, 
          Math.max(0, Math.min(1, g)) * 255, 
          Math.max(0, Math.min(1, b)) * 255]
}


function rgb2lab(rgb){
  var r = rgb[0] / 255,
      g = rgb[1] / 255,
      b = rgb[2] / 255,
      x, y, z;

  r = (r > 0.04045) ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
  g = (g > 0.04045) ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
  b = (b > 0.04045) ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

  x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
  y = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 1.00000;
  z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;

  x = (x > 0.008856) ? Math.pow(x, 1/3) : (7.787 * x) + 16/116;
  y = (y > 0.008856) ? Math.pow(y, 1/3) : (7.787 * y) + 16/116;
  z = (z > 0.008856) ? Math.pow(z, 1/3) : (7.787 * z) + 16/116;

  return [(116 * y) - 16, 500 * (x - y), 200 * (y - z)]
}

// calculate the perceptual distance between colors in CIELAB
// https://github.com/THEjoezack/ColorMine/blob/master/ColorMine/ColorSpaces/Comparisons/Cie94Comparison.cs

function deltaE(labA, labB){
  var deltaL = labA[0] - labB[0];
  var deltaA = labA[1] - labB[1];
  var deltaB = labA[2] - labB[2];
  var c1 = Math.sqrt(labA[1] * labA[1] + labA[2] * labA[2]);
  var c2 = Math.sqrt(labB[1] * labB[1] + labB[2] * labB[2]);
  var deltaC = c1 - c2;
  var deltaH = deltaA * deltaA + deltaB * deltaB - deltaC * deltaC;
  deltaH = deltaH < 0 ? 0 : Math.sqrt(deltaH);
  var sc = 1.0 + 0.045 * c1;
  var sh = 1.0 + 0.015 * c1;
  var deltaLKlsl = deltaL / (1.0);
  var deltaCkcsc = deltaC / (sc);
  var deltaHkhsh = deltaH / (sh);
  var i = deltaLKlsl * deltaLKlsl + deltaCkcsc * deltaCkcsc + deltaHkhsh * deltaHkhsh;
  return i < 0 ? 0 : Math.sqrt(i);
}
// END: rgb-lab


(function() {
  'use strict';
  'esversion: 6';

  let K = {
    gid: function (id) {
      return document.getElementById(id);
    },

    qS: function (sel) {
      return document.querySelector(sel);
    },

    qSa: function (sel) {
      return document.querySelectorAll(sel);
    },


    addCSSFile: function (path) {
      $("head").append('<link href="' + path + '" rel="stylesheet" type="text/css">');
    },

    
    // Source: https://stackoverflow.com/a/6805461
    injectJS: function (text, sURL) {
      let
        tgt,
        scriptNode = document.createElement('script');

      scriptNode.type = "text/javascript";
      if (text) {
        scriptNode.textContent = text;
      }
      if (sURL) {
        scriptNode.src = sURL;
      }

      tgt = document.getElementsByTagName('head')[0] || document.body || document.documentElement;
      tgt.appendChild(scriptNode);
    },

    // localStorage
    ls: {
      get: function (key) {
        let item = localStorage.getItem(account.account.uid + '-ews-' + key);
        if (item) {
          if (item === 'true') {
            return true;
          }
          if (item === 'false') {
            return false;
          }
        }

        return item;
      },

      set: function (key, val) {
        localStorage.setItem(account.account.uid + '-ews-' + key, val);
      },

      remove: function (key) {
        localStorage.removeItem(account.account.uid + '-ews-' + key);
      }
    }
  };

  let initiated = false;
  let profileOpened = false;
  let profileOpened2 = false; // to prevent from second gathering of the data when a profile is closed
  let ownProfile = false;
  let avatarExists = false;
  let imageChanged = false;
  let classList = [];
  let customUserColors = [];

  K.injectJS('', serverPath + 'flags/flags.json');


  // source: https://stackoverflow.com/a/7394787
  function decodeHtml(html) {
    let txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  }

  function initExtendedProfile() {
    flags.forEach(function (el) {el.imageSrc = serverPath + 'flags/' + el.imageSrc;});

    K.gid('profileBadges').remove();

    K.gid('profilePicture').innerHTML = `
      <img id="profile-picture-img" width=100 height=100 src="` + serverPath + `avatars/0.png">
      <div id="ews-ep-delete-avatar">❌</div>
      <input type="button" id="ews-ep-save" class="disabled-save-button" value="Save" disabled>`;
    K.gid('profileBiographicData').innerHTML = `
      <input id="ews-ep-contact-email-input" placeholder="contact e-mail">
      <textarea id="ews-ep-notes-input" placeholder="notes"></textarea>
      <div id="ews-ep-contact-email-div" placeholder="contact e-mail"></div>
      <div id="ews-ep-notes-div" placeholder="notes"></div>`;

    let pu = K.gid('profUsername');
    let edit = document.createElement('div');
    edit.id = 'ews-ep-edit-username';
    edit.innerHTML = '✒️';
    edit.addEventListener('click', function () {
      usernameColorSelection();
    });

    pu.parentNode.insertBefore(edit, pu.nextSibling);
    


    $('#profile-picture-img, #ews-ep-delete-avatar').hover(
      function () {
        if (ownProfile && avatarExists) {
          K.gid('ews-ep-delete-avatar').style.display = 'block';
        }
      },
      function () {
        if (ownProfile && avatarExists) {
          K.gid('ews-ep-delete-avatar').style.display = 'none';
        }
      }
    );

    K.gid('ews-ep-delete-avatar').addEventListener('click', function () {
      if (ownProfile) {
        K.gid('profile-picture-img').src = serverPath + 'avatars/0.png';
        K.gid('profile-picture-img-input').value = '';
        this.style.display = 'none';
        imageChanged = true;
        avatarExists = false;
        enableSaveButton();
      }
    });

    K.gid('ews-ep-contact-email-input').addEventListener('input', enableSaveButton);
    K.gid('ews-ep-notes-input').addEventListener('input', enableSaveButton);

    K.gid('ews-ep-save').addEventListener('click', function () {
      let data = new FormData();

      data.append('uid', account.account.uid);
      data.append('uname', K.gid('profUsername').innerHTML);

      data.append('email', K.gid('ews-ep-contact-email-input').value);
      data.append('notes', K.gid('ews-ep-notes-input').value);

      data.append('flag1', K.qS('#ews-ep-flag1 .dd-selected-value').value);
      data.append('flag2', K.qS('#ews-ep-flag2 .dd-selected-value').value);
      data.append('flag3', K.qS('#ews-ep-flag3 .dd-selected-value').value);

      if (imageChanged) {
        if (avatarExists) {
          data.append('delete_avatar', 0);
          data.append('avatar', K.gid('profile-picture-img-input').files[0], 'avatar.png');
        }
        else {
          data.append('delete_avatar', 1);
        }
      }
      else {
        data.append('delete_avatar', !avatarExists);
      }

      // source: https://stackoverflow.com/a/10899796
      $.ajax({
        data: data,
        type: 'POST',
        contentType: false,
        processData: false,
        url: serverPath + 'ep_save_user_settings.php',
        xhrFields: { // source: https://stackoverflow.com/a/47993517
          withCredentials: true
        }
      }).done(function (data) {
        disableSaveButton();
      });
    });
  }

  function prepareProfile() {
    if (K.gid('ews-ep-contact-email-input')) {
      K.gid('ews-ep-contact-email-input').value = '';
    }
    if (K.gid('ews-ep-notes-input')) {
      K.gid('ews-ep-notes-input').value = '';
    }
    if (K.gid('ews-ep-contact-email-div')) {
      K.gid('ews-ep-contact-email-div').innerHTML = '';
    }
    if (K.gid('ews-ep-notes-div')) {
      K.gid('ews-ep-notes-div').innerHTML = '';
    }
    if (K.gid('profile-picture-img')) {
      K.gid('profile-picture-img').src = serverPath + 'avatars/0.png';
    }
    if (K.gid('ews-ep-flag1')) {
      K.gid('ews-ep-flag1').style.display = 'none';
    }
    if (K.gid('ews-ep-flag2')) {
      K.gid('ews-ep-flag2').style.display = 'none';
    }
    if (K.gid('ews-ep-flag3')) {
      K.gid('ews-ep-flag3').style.display = 'none';
    }
  }

  function addFlag(id, data, container) {
    let flag = document.createElement('div');
    flag.id = 'ews-ep-flag' + id;
    let elem = data['flag' + id] || 0;

    container.appendChild(flag);

    if (ownProfile) {
      flags.forEach(function (el) {
        el.selected = el.value == elem;
      });

      $(flag).ddslick({
        data: flags,
        height: 300,
        width: 300,
        onSelected: function () {
          enableSaveButton();
        }
      });
      // the defaultSelectedIndex option triggers onSelected() method, so we have to disable the Save button again
      disableSaveButton();
    }
    else {
      let sel;

      for (let el of flags) {
        if (el.value == elem) {
          sel = el;
          break;
        }
      }

      if (sel.value !== '0') {
        flag.innerHTML = `
          <img src="` + sel.imageSrc + `"
            alt = "` + sel.text + `"
            title = "` + sel.text + `">`;
      }
      else {
        flag.innerHTML = '';
      }
    }
  }

  function addFlags(data) {
    let container = document.createElement('div');
    container.id = 'flags-container';
    let ref = K.gid('profileJoinedDate');
    ref.parentNode.insertBefore(container, ref.nextSibling);

    addFlag(1, data, container);
    addFlag(2, data, container);
    addFlag(3, data, container);
  }

  function manageAvatar(data, uname) {
    if (+data.has_avatar) { // to int
      K.gid('profile-picture-img').src = serverPath + 'avatars/' + uname + '.png';
      avatarExists = true;
      return;
    }
    // serves both no avatar and a new profile
    K.gid('profile-picture-img').src = serverPath + 'avatars/0.png';
    avatarExists = false;
  }

  function enableSaveButton() {
    K.gid('ews-ep-save').disabled = false;
    K.gid('ews-ep-save').classList.remove('disabled-save-button');
  }

  function disableSaveButton() {
    K.gid('ews-ep-save').disabled = true;
    K.gid('ews-ep-save').classList.add('disabled-save-button');
  }

  function initUsernameColorSelection() {
    let background = document.createElement('div');
    background.id = 'username-color-background';
    background.classList.add('attention-overlay',  'appear', 'glass');
    document.body.append(background);

    let popup = document.createElement('div');
    popup.id = "username-color-select";
    document.body.appendChild(popup);

    let close = document.createElement('div');
    close.id = 'username-color-select-close';
    popup.appendChild(close);
    close.addEventListener('click', function () {
      popup.remove();
      background.remove();
    });

    return popup;
  }

  function addTestChat(uname, popup) {
    let testChat = document.createElement('div');
    testChat.id = 'test-chat';

    let unameHtml = '';
    if (customUserColors && customUserColors[uname]) {
      unameHtml = customUserColors[uname];
    }
    else {
      for (let i = 0; i < uname.length; i++) {
        unameHtml += '<span class="uname-' + i + '">' + uname.charAt(i) + '</span>';
      }
    }
    
    testChat.innerHTML = `
      <div class="chatMsg">
        <span class="actualText dialogNobody"> ` + uname + ` earned 2000 points</span>
      </div>
      <div class="chatMsg">
        <span class="dialogNobody tc-timestamp">12:00&nbsp;</span>
        <span class="userEnc">&lt;</span>
        <span class="userName" style="color: rgb(150, 102, 255);">` + unameHtml + `</span>
        <span class="userEnc">&gt;</span>
        <span class="dialogNobody"></span><span class="actualText tc-msg-text">
          <span> hi all!</span>
        </span>
      </div>
      <div class="chatMsg">
        <span class="actualText dialogNobody"> ` + uname + ` trailblazed a cube!</span>
      </div>
    `;

    popup.appendChild(testChat);
  }

  function addCheckboxesForLetters(uname, popup) {
    let table = document.createElement('table');
    table.id = 'username-spreaded';
    let html = '<tr>';
    for (let i = 0; i < uname.length; i++) {
      html += '<td>' + uname.charAt(i) + '</td>';
    }
    html += `
      <td>&nbsp;</td>
      <td>&nbsp</td>
      <td>&nbsp;</td>
      `;
    html += '</tr><tr>';
    for (let i = 0; i < uname.length; i++) {
      html += '<td><input type="checkbox" class="ews-ep-letter-checkbox" data-classname="uname-' + i + '"></td>';
    }
    html += `
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td id="ews-ep-select-all-wrapper">
        <label>
          <input type="checkbox" id="ews-ep-select-all">select all
        </label>
      </td>
      `;
    html += '</tr>';
    table.innerHTML = html;

    popup.appendChild(table);
  }

  function addColorSelectors(popup) {
    let textColorSelector = document.createElement('input');
    textColorSelector.id = 'text-color-selector';
    textColorSelector.type = 'text';

    popup.appendChild(textColorSelector);

    let glowColorSelector = document.createElement('input');
    glowColorSelector.id = 'glow-color-selector';
    glowColorSelector.type = 'text';

    popup.appendChild(glowColorSelector);

    $(textColorSelector).spectrum({
      flat: true,
      showButtons: false,
      color: '1de61d',
      containerClassName: 'text-color-selector',
      move: applyColorAndStyleChanges
    });
    $(glowColorSelector).spectrum({
      flat: true,
      showButtons: false,
      color: '1de61d',
      containerClassName: 'glow-color-selector',
      move: applyColorAndStyleChanges
    });
  }

  function addStyleCheckboxes(popup) {
    let checkboxContainer = document.createElement('div');
    checkboxContainer.id = 'checkbox-container';
    checkboxContainer.innerHTML = `
      <label><input type="checkbox" id="checkbox-italic"><i>italic</i></input></label>
      <label><input type="checkbox" id="checkbox-bold"><b>bold</b></input></label>
      <label><input type="checkbox" id="checkbox-underline"><u>underline</u></input></label>
      <label><input type="checkbox" id="checkbox-strikethrough"><s>strikethrough</s></input></label>
      <label id="checkbox-glow-label"><input type="checkbox" id="checkbox-glow">glow</input></label>
    `;
    
    popup.appendChild(checkboxContainer);
  }

  function addLabels(popup) {
    let textSelectionLabel = document.createElement('span');
    textSelectionLabel.innerHTML = 'text color';
    textSelectionLabel.id = 'text-selection-label';

    let glowSelectionLabel = document.createElement('span');
    glowSelectionLabel.innerHTML = 'glow color';
    glowSelectionLabel.id = 'glow-selection-label';

    let forbiddenColorLabel = document.createElement('span');
    forbiddenColorLabel.innerHTML = 'forbidden color';
    forbiddenColorLabel.id = 'forbidden-color-label';

    popup.appendChild(textSelectionLabel);
    popup.appendChild(glowSelectionLabel);
    popup.appendChild(forbiddenColorLabel);
  }

  function addSaveButton(popup) {
    let btn = document.createElement('div');
    btn.id = 'save-colors-button';
    btn.innerHTML = 'save';
    btn.addEventListener('click', saveColors);

    popup.appendChild(btn);
  }

  function saveColors() {
    let uname = K.gid('profUsername').innerHTML;
    let copy = K.qS('#test-chat .userName').cloneNode(true);
    copy.childNodes.forEach((el) => {
      el.removeAttribute('data-styles');
    });

    let data = new FormData();
    data.append('uid', account.account.uid);
    data.append('uname', uname);
    data.append('settings', copy.innerHTML);

    $.ajax({
      data: data,
      type: 'POST',
      contentType: false,
      processData: false,
      url: serverPath + 'ep_save_user_color_settings.php',
      xhrFields: { // source: https://stackoverflow.com/a/47993517
        withCredentials: true
      }
    }).done(function (data) {
      K.gid('save-colors-button').classList.add('disabled-save-button');
      K.gid('save-colors-button').disabled = true;
      if (customUserColors) {
        customUserColors[uname] = copy.innerHTML;
      }
    });
  }

  function usernameColorSelection() {
    let uname = K.gid('profUsername').innerHTML;
    let popup = initUsernameColorSelection();

    addTestChat(uname, popup);
    addCheckboxesForLetters(uname, popup);
    addColorSelectors(popup);
    addStyleCheckboxes(popup);
    addLabels(popup);
    addSaveButton(popup);

    K.gid('ews-ep-select-all').addEventListener('change', function () {
      if(this.checked) {
        K.qSa('#username-spreaded .ews-ep-letter-checkbox').forEach((el) => {
          el.checked = true;
          classList.push(el.dataset.classname)
        });
      }
      else {
        K.qSa('#username-spreaded .ews-ep-letter-checkbox').forEach((el) => el.checked = false);
        classList = [];
      }
    });

    $('#username-spreaded .ews-ep-letter-checkbox').change(() => {
      classList = [];
      K.qSa('#username-spreaded .ews-ep-letter-checkbox').forEach(function (el) {
        if (el.checked) {
          classList.push(el.dataset.classname);
        }
        setSettings();
      });
      K.gid('ews-ep-select-all').checked = classList.length === K.gid('profUsername').innerHTML.length;
    });

    $('#checkbox-container').on('change', 'input', applyColorAndStyleChanges);
  }

  function setSettings() {
    if (!classList.length) {
      K.gid('checkbox-italic').checked = false;
      K.gid('checkbox-bold').checked = false;
      K.gid('checkbox-underline').checked = false;
      K.gid('checkbox-strikethrough').checked = false;
      K.gid('checkbox-glow').checked = false;
      $('#text-color-selector').spectrum('set', '1de61d');
      $('#glow-color-selector').spectrum('set', '1de61d');
      return;
    }

    let el = K.qS('.' + classList[0]);

    K.gid('checkbox-italic').checked = el.style.italic === 'italic';
    K.gid('checkbox-bold').checked = el.style.fontWeight === 'bold';
    K.gid('checkbox-underline').checked = el.style.textDecoration === 'underline';
    K.gid('checkbox-strikethrough').checked = el.classList.contains('text-strikethrough');
    // getComputedStyle in case a letted wasn't colored before and will inherit base color from ascendants
    $('#text-color-selector').spectrum('set', getComputedStyle(el).color);

    let shadow = el.style.textShadow;
    if (shadow && shadow !== 'none') {
      K.gid('checkbox-glow').checked = true;
      // the format of the text-shadow here is: rgb(rr, gg, bb) 0px 0px 7px
     $('#glow-color-selector').spectrum('set', shadow.split(')')[0] + ')');
    }
    else {
      K.gid('checkbox-glow').checked = false;
    }
  }

  function applyColorAndStyleChanges() {      
    let italic = K.gid('checkbox-italic').checked;
    let bold = K.gid('checkbox-bold').checked;
    let underline = K.gid('checkbox-underline').checked;
    let strikethrough = K.gid('checkbox-strikethrough').checked;
    let glow = K.gid('checkbox-glow').checked;
    let textColor = $('#text-color-selector').spectrum('get');
    let glowColor = $('#glow-color-selector').spectrum('get');
    /*
    let reservedColors = {
      default: '1de61d',   // rgb(29, 230, 29)
      scout: '00b8ff',     // rgb(0, 184, 255)
      // scythe: '00b8ff', // rgb(0, 184, 255)
      mentor: 'd5adce',    // rgb(213, 173, 206)
      moderator: '6666ff', // rgb(102, 102, 255)
      mystic: '9666ff',    // rgb(150, 102, 255)
      admin: 'dfdf14',     // rgb(223, 223, 20)
      grimm: '000,         // rgb(0, 0, 0)
      Nseraf: '696a7b'     // rgb((105, 106, 123)
    }*/

    // in CIELAB space (https://en.wikipedia.org/wiki/CIELAB_color_space)
    let reservedColors = {
      // there's no such group as "default", so I'm leaving it here just for the color values
      // default: [80.14783217045628, -77.72548575680094, 73.69816827919921],
      scout: [70.5254974631601, -13.923437183557152, -45.71775192481917],
      // since scythe is the same color as scout (sans the glowing), I'm commenting this out
      // scythe: [70.5254974631601, -13.923437183557152, -45.71775192481917],
      mentor: [75.13263087436285, 20.084198102724717, -11.217251348605451],
      moderator: [51.32172454825418, 43.621491694107064, -76.29774276503942],
      mystic: [55.28468559471632, 52.40983129152854, -69.68464801996],
      admin: [86.26273746976763, -19.275603628821248, 83.49274432242515],
      grimm: [0, 0, 0],
      Nseraf: [45.277931693482074, 3.3728263255821678, -9.565504027747028]
    }

    let arr = textColor.toRgb();
    let hexTextColor = textColor.toHexString();
    let selectedColor = [arr.r, arr.g, arr.b];
    let selectedColorLab = rgb2lab(selectedColor);
    let hexGlowColor = glowColor.toHexString();


    let roles = account.roles;
    if (K.gid('profUsername').innerHTML === 'Nseraf') {
      roles.Nseraf = true;
    }

    let deltas = {};
    Object.entries(reservedColors).forEach(([key, value]) => deltas[key] = deltaE(value, selectedColorLab));
    let isColorAllowed = Object.entries(deltas).every(([key, value]) => value > 20 || roles[key]);

    if (!isColorAllowed) {
      K.gid('forbidden-color-label').style.display = 'block';
      K.gid('save-colors-button').classList.add('disabled-save-button');
      K.gid('save-colors-button').disabled = true;
      return;
    }
    K.gid('forbidden-color-label').style.display = 'none';
    K.gid('save-colors-button').classList.remove('disabled-save-button');
    K.gid('save-colors-button').disabled = false;

    classList.forEach((el) => applyToSingleLetter(el, {
      italic: italic,
      bold: bold,
      underline: underline,
      strikethrough: strikethrough,
      glow: glow,
      textColor: hexTextColor,
      glowColor: hexGlowColor
    }));
  }

  function applyToSingleLetter(el, style) {
    el = K.qS('.' + el);

    el.style.fontStyle = style.italic ? 'italic' : 'normal';
    el.style.fontWeight = style.bold ? 'bold' : 'normal';
    el.style.textDecoration = style.underline ? 'underline' : 'none';
    el.classList.toggle('text-strikethrough', style.strikethrough); // source: http://www.toxicdrums.com/html-underline-and-line-through.html
    el.style.color = style.textColor;
    el.style.textShadow = style.glow ? style.glowColor + ' 0px 0px 7px' : 'none';

    el.dataset.styles = JSON.stringify(style);
  }

  function extendOwnProfile() {
    let uname = K.gid('profUsername').innerHTML;

    K.gid('ews-ep-contact-email-input').style.display = 'block';
    K.gid('ews-ep-notes-input').style.display = 'block';
    K.gid('ews-ep-contact-email-div').style.display = 'none';
    K.gid('ews-ep-notes-div').style.display = 'none';
    K.gid('ews-ep-save').style.display = 'inline-block';
    K.gid('ews-ep-edit-username').style.display = 'inline-block';
    K.gid('profile-picture-img').classList.add('clickable-element');
    K.gid('ews-ep-delete-avatar').classList.add('clickable-element');

    $('#profile-picture-img').wrap('<label for="profile-picture-img-input" id="profile-picture-img-label"></label>');
    let input = document.createElement('input');
    input.type = 'file';
    input.id = 'profile-picture-img-input';
    input.style.display = 'none';
    input.addEventListener('change', function () {
      let _this = this;

      if (this.files && this.files[0]) {
        let reader = new FileReader();

        reader.onload = function(e) {
          if (['image/gif', 'image/jpeg', 'image/png', 'image/bmp'].indexOf(_this.files[0].type) === -1) {
            return alert('It\'s not an image');
          }
          K.gid('profile-picture-img').src = e.target.result;
        }
    
        reader.readAsDataURL(this.files[0]);
        avatarExists = true;
        imageChanged = true;
        enableSaveButton();
      }
    });
    K.gid('profile-picture-img-label').append(input);


    $.ajax({
      data: { uname: uname },
      url: serverPath + 'ep_get_user_settings.php'
    }).done(function (data) {
      data = JSON.parse(data);
      K.gid('ews-ep-contact-email-input').value = data.uname ? decodeHtml(data.contact) : '';
      K.gid('ews-ep-notes-input').value = data.uname ? decodeHtml(data.notes) : '';

      manageAvatar(data, uname);
      addFlags(data);
    });

    imageChanged = false;
    disableSaveButton();
  }

  function extendOtherProfile() {
    let
      uname = K.gid('profUsername').innerHTML;

    K.gid('ews-ep-contact-email-input').style.display = 'none';
    K.gid('ews-ep-notes-input').style.display = 'none';
    K.gid('ews-ep-contact-email-div').style.display = 'block';
    K.gid('ews-ep-notes-div').style.display = 'block';
    K.gid('ews-ep-save').style.display = 'none';
    K.gid('ews-ep-edit-username').style.display = 'none';
    K.gid('profile-picture-img').classList.remove('clickable-element');

    $('#profile-picture-img').unwrap();
    if (K.gid('profile-picture-img-input')) {
      K.gid('profile-picture-img-input').remove();
    }

    $.ajax({
      data: { uname:  uname},
      url: serverPath + 'ep_get_user_settings.php',
    }).done(function (data) {
      data = JSON.parse(data);
      if (!data.uname) {
        K.gid('ews-ep-contact-email-div').innerHTML = '';
        K.gid('ews-ep-notes-div').innerHTML = "<i>This user doesn't use the Extended Profile script</i>";
        return;
      }

      K.gid('ews-ep-contact-email-div').innerHTML = data.contact;
      K.gid('ews-ep-notes-div').innerHTML = data.notes;

      manageAvatar(data, uname);
      addFlags(data);
    })
  }

    
  function main() {
    if (LOCAL) {
      K.addCSSFile('http://127.0.0.1:8887/styles.css');
      K.addCSSFile('http://127.0.0.1:8887/spectrum.css');
      K.injectJS(null, 'http://localhost/ep/spectrum.js');
    }
    else {
      K.addCSSFile('https://chrisraven.github.io/EyeWire-Extended-Profile/styles.css?v=1');
      K.addCSSFile('https://chrisraven.github.io/EyeWire-Extended-Profile/spectrum.css');
      K.injectJS(null, 'https://chrisraven.github.io/EyeWire-Extended-Profile/spectrum.js');
    }
    

    $.ajax({
      data: {
        uid: account.account.uid
      },
      method: 'get',
      url: serverPath + 'ep_get_other_users_color_settings.php',
      xhrFields: { // source: https://stackoverflow.com/a/47993517
        withCredentials: true
      }
    }).done(function (data) {
      customUserColors = JSON.parse(data);
      $(".chatMsgContainer").on("DOMNodeInserted", ".chatMsg", function() {
        let username = this.getElementsByClassName('userName')[0];
        if (username) {
          let name = username.innerHTML;
          let newColors = customUserColors[name];
          if (newColors) {
            username.innerHTML = newColors;
          }
        }
      });
    });

    let observer = new MutationObserver(function (mutations) {

      mutations.forEach(function (mutation) {
        if (mutation.target.classList.contains('attention-display')) {
          let intv = setInterval(function () {
            if (!K.gid('profUsername').textContent.length) {
              return;
            }
            
            clearInterval(intv);
            if (profileOpened) {
              return;
            }

            profileOpened = true;
            
            // the observer changes are triggered 8 times in a row,
            // so we have to wait at least 9 x 50ms to clear the profileOpened var
            setTimeout(function () {
              profileOpened = false;
            }, 500);


            if (profileOpened2) {
              profileOpened2 = false;
              return;
            }
            profileOpened2 = true;
            // we have to turn off observing for a bit, to make the changes without
            // triggering the obverver and falling into an endless loop...
            observer.disconnect();

            if (!initiated) {
              initExtendedProfile();
              initiated = true;
            }

            prepareProfile();
            if (document.getElementById('profUsername').textContent === account.account.username) {
              ownProfile = true;
              extendOwnProfile();
            }
            else {
              ownProfile = false;
              extendOtherProfile();
            }

            // ... end then turn it on again
            observer.observe(K.gid('profileContainer'), {attributes: true});
          }, 50);
        }
      });
    });
    
    observer.observe(K.gid('profileContainer'), {attributes: true});
  }

  
  let intv = setInterval(function () {
    if (typeof account === 'undefined' || !account.account.uid) {
      return;
    }
    clearInterval(intv);

    main();
  }, 100);

})();

