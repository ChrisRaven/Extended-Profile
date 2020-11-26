// ==UserScript==
// @name         Extended Profile
// @namespace    http://tampermonkey.net/
// @version      2.0.0.0
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
  serverPath = 'https://ewstats.heliohost.us/';
}

// source: http://designwithpc.com/Plugins/ddSlick
(function(e){e.fn.ddslick=function(l){if(c[l]){return c[l].apply(this,Array.prototype.slice.call(arguments,1))}else{if(typeof l==="object"||!l){return c.init.apply(this,arguments)}else{e.error("Method "+l+" does not exists.")}}};var c={},d={data:[],keepJSONItemsOnTop:false,width:260,height:null,background:"#eee",selectText:"",defaultSelectedIndex:null,truncateDescription:true,imagePosition:"left",showSelectedHTML:true,clickOffToClose:true,embedCSS:true,onSelected:function(){}},i='<div class="dd-select"><input class="dd-selected-value" type="hidden" /><a class="dd-selected"></a><span class="dd-pointer dd-pointer-down"></span></div>',a='<ul class="dd-options"></ul>',b='<style id="css-ddslick" type="text/css">.dd-select{ border-radius:2px; border:solid 1px #ccc; position:relative; cursor:pointer;}.dd-desc { color:#aaa; display:block; overflow: hidden; font-weight:normal; line-height: 1.4em; }.dd-selected{ overflow:hidden; display:block; padding:10px; font-weight:bold;}.dd-pointer{ width:0; height:0; position:absolute; right:10px; top:50%; margin-top:-3px;}.dd-pointer-down{ border:solid 5px transparent; border-top:solid 5px #000; }.dd-pointer-up{border:solid 5px transparent !important; border-bottom:solid 5px #000 !important; margin-top:-8px;}.dd-options{ border:solid 1px #ccc; border-top:none; list-style:none; box-shadow:0px 1px 5px #ddd; display:none; position:absolute; z-index:2000; margin:0; padding:0;background:#fff; overflow:auto;}.dd-option{ padding:10px; display:block; border-bottom:solid 1px #ddd; overflow:hidden; text-decoration:none; color:#333; cursor:pointer;-webkit-transition: all 0.25s ease-in-out; -moz-transition: all 0.25s ease-in-out;-o-transition: all 0.25s ease-in-out;-ms-transition: all 0.25s ease-in-out; }.dd-options > li:last-child > .dd-option{ border-bottom:none;}.dd-option:hover{ background:#f3f3f3; color:#000;}.dd-selected-description-truncated { text-overflow: ellipsis; white-space:nowrap; }.dd-option-selected { background:#f6f6f6; }.dd-option-image, .dd-selected-image { vertical-align:middle; float:left; margin-right:5px; max-width:64px;}.dd-image-right { float:right; margin-right:15px; margin-left:5px;}.dd-container{ position:relative;}​ .dd-selected-text { font-weight:bold}​</style>';c.init=function(l){var l=e.extend({},d,l);if(e("#css-ddslick").length<=0&&l.embedCSS){e(b).appendTo("head")}return this.each(function(){var p=e(this),q=p.data("ddslick");if(!q){var n=[],o=l.data;p.find("option").each(function(){var w=e(this),v=w.data();n.push({text:e.trim(w.text()),value:w.val(),selected:w.is(":selected"),description:v.description,imageSrc:v.imagesrc})});if(l.keepJSONItemsOnTop){e.merge(l.data,n)}else{l.data=e.merge(n,l.data)}var m=p,s=e('<div id="'+p.attr("id")+'"></div>');p.replaceWith(s);p=s;p.addClass("dd-container").append(i).append(a);var n=p.find(".dd-select"),u=p.find(".dd-options");u.css({width:l.width});n.css({width:l.width,background:l.background});p.css({width:l.width});if(l.height!=null){u.css({height:l.height,overflow:"auto"})}e.each(l.data,function(v,w){if(w.selected){l.defaultSelectedIndex=v}u.append('<li><a class="dd-option">'+(w.value?' <input class="dd-option-value" type="hidden" value="'+w.value+'" />':"")+(w.imageSrc?' <img class="dd-option-image'+(l.imagePosition=="right"?" dd-image-right":"")+'" src="'+w.imageSrc+'" />':"")+(w.text?' <label class="dd-option-text">'+w.text+"</label>":"")+(w.description?' <small class="dd-option-description dd-desc">'+w.description+"</small>":"")+"</a></li>")});var t={settings:l,original:m,selectedIndex:-1,selectedItem:null,selectedData:null};p.data("ddslick",t);if(l.selectText.length>0&&l.defaultSelectedIndex==null){p.find(".dd-selected").html(l.selectText)}else{var r=(l.defaultSelectedIndex!=null&&l.defaultSelectedIndex>=0&&l.defaultSelectedIndex<l.data.length)?l.defaultSelectedIndex:0;j(p,r)}p.find(".dd-select").on("click.ddslick",function(){f(p)});p.find(".dd-option").on("click.ddslick",function(){j(p,e(this).closest("li").index())});if(l.clickOffToClose){u.addClass("dd-click-off-close");p.on("click.ddslick",function(v){v.stopPropagation()});e("body").on("click",function(){e(".dd-click-off-close").slideUp(50).siblings(".dd-select").find(".dd-pointer").removeClass("dd-pointer-up")})}}})};c.select=function(l){return this.each(function(){if(l.index!==undefined){j(e(this),l.index)}})};c.open=function(){return this.each(function(){var m=e(this),l=m.data("ddslick");if(l){f(m)}})};c.close=function(){return this.each(function(){var m=e(this),l=m.data("ddslick");if(l){k(m)}})};c.destroy=function(){return this.each(function(){var n=e(this),m=n.data("ddslick");if(m){var l=m.original;n.removeData("ddslick").unbind(".ddslick").replaceWith(l)}})};function j(q,s){var u=q.data("ddslick");var r=q.find(".dd-selected"),n=r.siblings(".dd-selected-value"),v=q.find(".dd-options"),l=r.siblings(".dd-pointer"),p=q.find(".dd-option").eq(s),m=p.closest("li"),o=u.settings,t=u.settings.data[s];q.find(".dd-option").removeClass("dd-option-selected");p.addClass("dd-option-selected");u.selectedIndex=s;u.selectedItem=m;u.selectedData=t;if(o.showSelectedHTML){r.html((t.imageSrc?'<img class="dd-selected-image'+(o.imagePosition=="right"?" dd-image-right":"")+'" src="'+t.imageSrc+'" />':"")+(t.text?'<label class="dd-selected-text">'+t.text+"</label>":"")+(t.description?'<small class="dd-selected-description dd-desc'+(o.truncateDescription?" dd-selected-description-truncated":"")+'" >'+t.description+"</small>":""))}else{r.html(t.text)}n.val(t.value);u.original.val(t.value);q.data("ddslick",u);k(q);g(q);if(typeof o.onSelected=="function"){o.onSelected.call(this,u)}}function f(p){var o=p.find(".dd-select"),m=o.siblings(".dd-options"),l=o.find(".dd-pointer"),n=m.is(":visible");e(".dd-click-off-close").not(m).slideUp(50);e(".dd-pointer").removeClass("dd-pointer-up");if(n){m.slideUp("fast");l.removeClass("dd-pointer-up")}else{m.slideDown("fast");l.addClass("dd-pointer-up")}h(p)}function k(l){l.find(".dd-options").slideUp(50);l.find(".dd-pointer").removeClass("dd-pointer-up").removeClass("dd-pointer-up")}function g(o){var n=o.find(".dd-select").css("height");var m=o.find(".dd-selected-description");var l=o.find(".dd-selected-image");if(m.length<=0&&l.length>0){o.find(".dd-selected-text").css("lineHeight",n)}}function h(l){l.find(".dd-option").each(function(){var p=e(this);var n=p.css("height");var o=p.find(".dd-option-description");var m=l.find(".dd-option-image");if(o.length<=0&&m.length>0){p.find(".dd-option-text").css("lineHeight",n)}})}})(jQuery);



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
  let ownProfile = false;
  let avatarType = 0; // 0 = no avatar; 1 = built-in; 2 = custom
  let avatarName = ''; // name of the selected built-in avatar

  K.injectJS('', serverPath + 'flags/flags.json');
  K.injectJS('', serverPath + 'avatars/built-ins/avatars.json');


  // source: https://stackoverflow.com/a/7394787
  function decodeHtml(html) {
    let txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  }

  // source: https://stackoverflow.com/a/29182327
  function getName(path) {
    return path.replace(/^.*[\\\/]/, '');
  }

  function prepareAvatars() {
      let container = document.createElement('div');
      container.id = 'avatar-dropdown';
      container.style.display = 'none';

      let html = '';
      let altText;
      html += '<div id="built-in-avatar-default" alt="default avatar will be used" title="default avatar will be used">[none]</div>';
      avatars.forEach((el) => {
        altText = el.split('.')[0].replace(/-/gi, ' ').replace('avatar', '');
        html += `<img
          id="built-in-avatar-` + el + `"
          src="` + serverPath + `/avatars/built-ins/` + el + `"
          class="built-in-avatar"
          width=100
          height=100
          alt="` + altText + `"
          title="` + altText + `"
        >`;
      });
      html += '<div id="avatar-custom" alt="click to select a picture from your disk" title="click to select a picture from your disk">[custom]</div>';

      container.innerHTML = html;
      K.gid('profilePicture').appendChild(container);

      $('#avatar-dropdown').on('click', 'img', function () {
        K.gid('profile-picture-img').src = this.src;
        this.parentElement.style.display = 'none';
        avatarType = 1;
        avatarName = getName(this.src);
        enableSaveButton();
      });

      K.gid('built-in-avatar-default').addEventListener('click', function () {
        avatarType = 0;
        K.gid('avatar-dropdown').style.display = 'none';
        K.gid('profile-picture-img').src = serverPath + 'avatars/default-avatar.png';
        enableSaveButton();
      });
  }

  function initExtendedProfile() {
    flags.forEach((el) => el.imageSrc = serverPath + 'flags/' + el.imageSrc);

    let img = K.gid('profilePicture');
    img.innerHTML = `
      <img id="profile-picture-img" width=100 height=100 src="` + serverPath + `avatars/default-avatar.png">
      <input type="button" id="ews-ep-save" class="disabled-save-button" value="Save" disabled>`;
    K.gid('profileBiographicData').innerHTML = `
    <input id="ews-ep-contact-email-input" placeholder="contact e-mail">
    <textarea id="ews-ep-notes-input" placeholder="notes"></textarea>
    <div id="ews-ep-contact-email-div" placeholder="contact e-mail"></div>
    <div id="ews-ep-notes-div" placeholder="notes"></div>`;

    img.parentElement.insertBefore(img, K.gid('profUsername').nextElementSibling);

    K.gid('ews-ep-contact-email-input').addEventListener('input', enableSaveButton);
    K.gid('ews-ep-notes-input').addEventListener('input', enableSaveButton);

    prepareAvatars();

    K.gid('ews-ep-save').addEventListener('click', function () {
      let data = new FormData();

      data.append('uid', account.account.uid);
      data.append('uname', K.gid('profUsername').innerHTML);

      data.append('email', K.gid('ews-ep-contact-email-input').value);
      data.append('notes', K.gid('ews-ep-notes-input').value);

      data.append('flag1', K.qS('#ews-ep-flag1 .dd-selected-value').value);
      data.append('flag2', K.qS('#ews-ep-flag2 .dd-selected-value').value);
      data.append('flag3', K.qS('#ews-ep-flag3 .dd-selected-value').value);

      data.append('avatarType', avatarType);

      if (avatarType === 2) {
        data.append('avatar', K.gid('profile-picture-img-input').files[0], 'avatar.png');
      }
      else if (avatarType === 1) {
        data.append('avatarName', avatarName);
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
      K.gid('profile-picture-img').src = serverPath + 'avatars/default-avatar.png';
    }
    /*if (K.gid('ews-ep-flag1')) {
      K.gid('ews-ep-flag1').style.display = 'none';
    }
    if (K.gid('ews-ep-flag2')) {
      K.gid('ews-ep-flag2').style.display = 'none';
    }
    if (K.gid('ews-ep-flag3')) {
      K.gid('ews-ep-flag3').style.display = 'none';
    }*/
  }

  function addFlag(id, data, container) {
    let flag = K.gid('ews-ep-flag' + id);

    if (!flag) {
      flag = document.createElement('div');
      flag.id = 'ews-ep-flag' + id;
      container.appendChild(flag);
    }

    let elem = data['flag' + id] || 0;

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

      $(flag).ddslick('destroy');

      for (let el of flags) {
        if (el.value == elem) {
          sel = el;
          break;
        }
      }

      if (sel.value !== 0) {
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
    let container = K.gid('flags-container');

    if (!K.gid('flags-container')) {
      container = document.createElement('div');
      container.id = 'flags-container';
      let ref = K.gid('profileJoinedDate');
      ref.parentNode.insertBefore(container, ref.nextSibling);
    }

    addFlag(1, data, container);
    addFlag(2, data, container);
    addFlag(3, data, container);
  }

  function manageAvatar(data, uname) {
    if (data.avatarType) {
      switch (data.avatarType) {
        case '0':
          K.gid('profile-picture-img').src = serverPath + 'avatars/default-avatar.png';
          break;
        case '1':
          K.gid('profile-picture-img').src = serverPath + 'avatars/built-ins/' + data.avatarName;
          break;
        case '2':
          K.gid('profile-picture-img').src = serverPath + 'avatars/' + uname + '.png';
          break;
      }
      return;
    }

    K.gid('profile-picture-img').src = serverPath + 'avatars/default-avatar.png';
  }

  function enableSaveButton() {
    K.gid('ews-ep-save').disabled = false;
    K.gid('ews-ep-save').classList.remove('disabled-save-button');
  }

  function disableSaveButton() {
    K.gid('ews-ep-save').disabled = true;
    K.gid('ews-ep-save').classList.add('disabled-save-button');
  }

  function dropdown() {
    let dd = K.gid('avatar-dropdown');
    if ($(dd).parents('.own-profile').length) {
      if (dd.style.display === 'none') {
        dd.style.display = 'block';
      }
      else {
        dd.style.display = 'none';
      }
    }
  }

  function extendOwnProfile() {
    let uname = K.gid('profUsername').innerHTML;

    K.gid('ews-ep-contact-email-input').style.display = 'block';
    K.gid('ews-ep-notes-input').style.display = 'block';
    K.gid('ews-ep-contact-email-div').style.display = 'none';
    K.gid('ews-ep-notes-div').style.display = 'none';
    K.gid('ews-ep-save').style.display = 'inline-block';
    K.gid('profile-picture-img').classList.add('clickable-element');

    K.qS('#profile-picture-img').addEventListener('click', dropdown);
    if (K.gid('profile-picture-img-input')) {
      K.gid('profile-picture-img-input').value = null;
    }

    if (!K.gid('profile-picture-img-label')) {
      $('#avatar-custom').wrap('<label for="profile-picture-img-input" id="profile-picture-img-label"></label>');
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
            K.gid('avatar-dropdown').style.display = 'none';
          }
      
          reader.readAsDataURL(this.files[0]);
          avatarType = 2;
          enableSaveButton();
        }
      });
      K.gid('profile-picture-img-label').append(input);
    }


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
    K.gid('profile-picture-img').classList.remove('clickable-element');

    $.ajax({
      data: { uname:  uname},
      url: serverPath + 'ep_get_user_settings.php',
    }).done(function (data) {
      data = JSON.parse(data);

      addFlags(data);

      if (!data.uname) {
        K.gid('ews-ep-contact-email-div').innerHTML = '';
        K.gid('ews-ep-notes-div').innerHTML = "<i>This user doesn't use the Extended Profile script</i>";
        return;
      }

      K.gid('ews-ep-contact-email-div').innerHTML = data.contact ? data.contact : '';
      K.gid('ews-ep-notes-div').innerHTML = data.notes ? data.notes : '';

      manageAvatar(data, uname);
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
        uid: account.account.uid,
        uname: account.account.username
      },
      method: 'POST',
      url: serverPath + 'ep_init.php',
      xhrFields: { // source: https://stackoverflow.com/a/47993517
        withCredentials: true
      }
    }).done(function (data) {});

    let observer = new MutationObserver(function (mutations) {

      mutations.forEach(function (mutation) {
        if (mutation.target.classList.contains('attention-display')) {
          let intv = setInterval(function () {
            if (!K.gid('profUsername').textContent.length) {
              profileOpened = false;
              return;
            }
            
            clearInterval(intv);
            if (profileOpened) {
              return;
            }

            profileOpened = true;

            // we have to turn off observing for a bit, to make the changes without
            // triggering the obverver and falling into an endless loop...
            observer.disconnect();

            if (!initiated) {
              initExtendedProfile();
              initiated = true;
            }

            prepareProfile();
            if (K.gid('profUsername').textContent === account.account.username) {
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

