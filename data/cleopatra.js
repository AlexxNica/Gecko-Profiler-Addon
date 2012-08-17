/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Initial Developer of the Original Code is
 * Mozilla Foundation.
 * Portions created by the Initial Developer are Copyright (C) 2011
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *   Benoit Girard <bgirard@mozilla.com>
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */
 
function get_profile_desktop() {
    self.port.emit("getprofile", "test");
    document.defaultView.postMessage(JSON.stringify({task: "importFromAddonStart"}), "*");
}

function get_profile_start() {
    self.port.emit("adbstart", "test");
    document.defaultView.postMessage(JSON.stringify({task: "importFromAddonStart"}), "*");
}

function get_profile_adb(args) {
    self.port.emit("adbpull", args);
  console.log('get_profile_adb', args);
    document.defaultView.postMessage(JSON.stringify({task: "importFromAddonStart"}), "*");
}


function get_profile_libs() {
    self.port.emit("adblibs", "test");
    document.defaultView.postMessage(JSON.stringify({task: "importFromAddonStart"}), "*");
}

function get_profile_importpackage(fileName) {
    self.port.emit("importpackage", fileName);
    document.defaultView.postMessage(JSON.stringify({task: "importFromAddonStart"}), "*");
}

self.port.on("getprofile_progress", function(e) {
    document.defaultView.postMessage(JSON.stringify({task: "importFromAddonProgress", progress: e.progress, action: e.action}), "*");
});

self.port.on("getprofile", function(val) {
    if (window.unsafeWindow && unsafeWindow.loadProfile)
      unsafeWindow.importFromAddonFinish(val);
    else
      document.defaultView.postMessage(JSON.stringify({task: "importFromAddonFinish", rawProfile: val}), "*");
});

self.port.on("get_profile_desktop", function(val) {
    get_profile_desktop();
});
self.port.on("get_profile_adb", function(val) {
    get_profile_adb(val);
});
self.port.on("get_profile_start", function(val) {
    get_profile_start();
});
self.port.on("get_profile_libs", function(val) {
    get_profile_libs();
});
self.port.on("get_profile_importpackage", function(fileName) {
    get_profile_importpackage(fileName);
});
