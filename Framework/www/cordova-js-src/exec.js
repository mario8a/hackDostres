/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

<<<<<<< HEAD
/**
 * Execute a cordova command.  It is up to the native side whether this action
 * is synchronous or asynchronous.  The native side can return:
 *      Synchronous: PluginResult object as a JSON string
 *      Asynchronous: Empty string ""
 * If async, the native side will cordova.callbackSuccess or cordova.callbackError,
 * depending upon the result of the action.
 *
 * @param {Function} success    The success callback
 * @param {Function} fail       The fail callback
 * @param {String} service      The name of the service to use
 * @param {String} action       Action to be run in cordova
 * @param {String[]} [args]     Zero or more arguments to pass to the method
 */
var cordova = require('cordova'),
    nativeApiProvider = require('cordova/android/nativeapiprovider'),
    utils = require('cordova/utils'),
    base64 = require('cordova/base64'),
    channel = require('cordova/channel'),
    jsToNativeModes = {
        PROMPT: 0,
        JS_OBJECT: 1
    },
    nativeToJsModes = {
        // Polls for messages using the JS->Native bridge.
        POLLING: 0,
        // For LOAD_URL to be viable, it would need to have a work-around for
        // the bug where the soft-keyboard gets dismissed when a message is sent.
        LOAD_URL: 1,
        // For the ONLINE_EVENT to be viable, it would need to intercept all event
        // listeners (both through addEventListener and window.ononline) as well
        // as set the navigator property itself.
        ONLINE_EVENT: 2,
        EVAL_BRIDGE: 3
    },
    jsToNativeBridgeMode,  // Set lazily.
    nativeToJsBridgeMode = nativeToJsModes.EVAL_BRIDGE,
    pollEnabled = false,
    bridgeSecret = -1;

var messagesFromNative = [];
var isProcessing = false;
var resolvedPromise = typeof Promise == 'undefined' ? null : Promise.resolve();
var nextTick = resolvedPromise ? function(fn) { resolvedPromise.then(fn); } : function(fn) { setTimeout(fn); };

function androidExec(success, fail, service, action, args) {
    if (bridgeSecret < 0) {
        // If we ever catch this firing, we'll need to queue up exec()s
        // and fire them once we get a secret. For now, I don't think
        // it's possible for exec() to be called since plugins are parsed but
        // not run until until after onNativeReady.
        throw new Error('exec() called without bridgeSecret');
    }
    // Set default bridge modes if they have not already been set.
    // By default, we use the failsafe, since addJavascriptInterface breaks too often
    if (jsToNativeBridgeMode === undefined) {
        androidExec.setJsToNativeBridgeMode(jsToNativeModes.JS_OBJECT);
    }

    // If args is not provided, default to an empty array
    args = args || [];

    // Process any ArrayBuffers in the args into a string.
    for (var i = 0; i < args.length; i++) {
        if (utils.typeName(args[i]) == 'ArrayBuffer') {
            args[i] = base64.fromArrayBuffer(args[i]);
        }
    }

    var callbackId = service + cordova.callbackId++,
        argsJson = JSON.stringify(args);
    if (success || fail) {
        cordova.callbacks[callbackId] = {success:success, fail:fail};
    }

    var msgs = nativeApiProvider.get().exec(bridgeSecret, service, action, callbackId, argsJson);
    // If argsJson was received by Java as null, try again with the PROMPT bridge mode.
    // This happens in rare circumstances, such as when certain Unicode characters are passed over the bridge on a Galaxy S2.  See CB-2666.
    if (jsToNativeBridgeMode == jsToNativeModes.JS_OBJECT && msgs === "@Null arguments.") {
        androidExec.setJsToNativeBridgeMode(jsToNativeModes.PROMPT);
        androidExec(success, fail, service, action, args);
        androidExec.setJsToNativeBridgeMode(jsToNativeModes.JS_OBJECT);
    } else if (msgs) {
        messagesFromNative.push(msgs);
        // Always process async to avoid exceptions messing up stack.
        nextTick(processMessages);
    }
}

androidExec.init = function() {
    bridgeSecret = +prompt('', 'gap_init:' + nativeToJsBridgeMode);
    channel.onNativeReady.fire();
};

function pollOnceFromOnlineEvent() {
    pollOnce(true);
}

function pollOnce(opt_fromOnlineEvent) {
    if (bridgeSecret < 0) {
        // This can happen when the NativeToJsMessageQueue resets the online state on page transitions.
        // We know there's nothing to retrieve, so no need to poll.
        return;
    }
    var msgs = nativeApiProvider.get().retrieveJsMessages(bridgeSecret, !!opt_fromOnlineEvent);
    if (msgs) {
        messagesFromNative.push(msgs);
        // Process sync since we know we're already top-of-stack.
        processMessages();
    }
}

function pollingTimerFunc() {
    if (pollEnabled) {
        pollOnce();
        setTimeout(pollingTimerFunc, 50);
    }
}

function hookOnlineApis() {
    function proxyEvent(e) {
        cordova.fireWindowEvent(e.type);
    }
    // The network module takes care of firing online and offline events.
    // It currently fires them only on document though, so we bridge them
    // to window here (while first listening for exec()-releated online/offline
    // events).
    window.addEventListener('online', pollOnceFromOnlineEvent, false);
    window.addEventListener('offline', pollOnceFromOnlineEvent, false);
    cordova.addWindowEventHandler('online');
    cordova.addWindowEventHandler('offline');
    document.addEventListener('online', proxyEvent, false);
    document.addEventListener('offline', proxyEvent, false);
}

hookOnlineApis();

androidExec.jsToNativeModes = jsToNativeModes;
androidExec.nativeToJsModes = nativeToJsModes;

androidExec.setJsToNativeBridgeMode = function(mode) {
    if (mode == jsToNativeModes.JS_OBJECT && !window._cordovaNative) {
        mode = jsToNativeModes.PROMPT;
    }
    nativeApiProvider.setPreferPrompt(mode == jsToNativeModes.PROMPT);
    jsToNativeBridgeMode = mode;
};

androidExec.setNativeToJsBridgeMode = function(mode) {
    if (mode == nativeToJsBridgeMode) {
        return;
    }
    if (nativeToJsBridgeMode == nativeToJsModes.POLLING) {
        pollEnabled = false;
    }

    nativeToJsBridgeMode = mode;
    // Tell the native side to switch modes.
    // Otherwise, it will be set by androidExec.init()
    if (bridgeSecret >= 0) {
        nativeApiProvider.get().setNativeToJsBridgeMode(bridgeSecret, mode);
    }

    if (mode == nativeToJsModes.POLLING) {
        pollEnabled = true;
        setTimeout(pollingTimerFunc, 1);
    }
};

function buildPayload(payload, message) {
    var payloadKind = message.charAt(0);
    if (payloadKind == 's') {
        payload.push(message.slice(1));
    } else if (payloadKind == 't') {
        payload.push(true);
    } else if (payloadKind == 'f') {
        payload.push(false);
    } else if (payloadKind == 'N') {
        payload.push(null);
    } else if (payloadKind == 'n') {
        payload.push(+message.slice(1));
    } else if (payloadKind == 'A') {
        var data = message.slice(1);
        payload.push(base64.toArrayBuffer(data));
    } else if (payloadKind == 'S') {
        payload.push(window.atob(message.slice(1)));
    } else if (payloadKind == 'M') {
        var multipartMessages = message.slice(1);
        while (multipartMessages !== "") {
            var spaceIdx = multipartMessages.indexOf(' ');
            var msgLen = +multipartMessages.slice(0, spaceIdx);
            var multipartMessage = multipartMessages.substr(spaceIdx + 1, msgLen);
            multipartMessages = multipartMessages.slice(spaceIdx + msgLen + 1);
            buildPayload(payload, multipartMessage);
        }
    } else {
        payload.push(JSON.parse(message));
    }
}

// Processes a single message, as encoded by NativeToJsMessageQueue.java.
function processMessage(message) {
    var firstChar = message.charAt(0);
    if (firstChar == 'J') {
        // This is deprecated on the .java side. It doesn't work with CSP enabled.
        eval(message.slice(1));
    } else if (firstChar == 'S' || firstChar == 'F') {
        var success = firstChar == 'S';
        var keepCallback = message.charAt(1) == '1';
        var spaceIdx = message.indexOf(' ', 2);
        var status = +message.slice(2, spaceIdx);
        var nextSpaceIdx = message.indexOf(' ', spaceIdx + 1);
        var callbackId = message.slice(spaceIdx + 1, nextSpaceIdx);
        var payloadMessage = message.slice(nextSpaceIdx + 1);
        var payload = [];
        buildPayload(payload, payloadMessage);
        cordova.callbackFromNative(callbackId, success, status, payload, keepCallback);
    } else {
        console.log("processMessage failed: invalid message: " + JSON.stringify(message));
    }
}

function processMessages() {
    // Check for the reentrant case.
    if (isProcessing) {
        return;
    }
    if (messagesFromNative.length === 0) {
        return;
    }
    isProcessing = true;
    try {
        var msg = popMessageFromQueue();
        // The Java side can send a * message to indicate that it
        // still has messages waiting to be retrieved.
        if (msg == '*' && messagesFromNative.length === 0) {
            nextTick(pollOnce);
            return;
        }
        processMessage(msg);
    } finally {
        isProcessing = false;
        if (messagesFromNative.length > 0) {
            nextTick(processMessages);
        }
    }
}

function popMessageFromQueue() {
    var messageBatch = messagesFromNative.shift();
    if (messageBatch == '*') {
        return '*';
    }

    var spaceIdx = messageBatch.indexOf(' ');
    var msgLen = +messageBatch.slice(0, spaceIdx);
    var message = messageBatch.substr(spaceIdx + 1, msgLen);
    messageBatch = messageBatch.slice(spaceIdx + msgLen + 1);
    if (messageBatch) {
        messagesFromNative.unshift(messageBatch);
    }
    return message;
}

module.exports = androidExec;
=======
/*global require, module, atob, document */

/**
 * Creates a gap bridge iframe used to notify the native code about queued
 * commands.
 */
var cordova = require('cordova'),
    utils = require('cordova/utils'),
    base64 = require('cordova/base64'),
    execIframe,
    commandQueue = [], // Contains pending JS->Native messages.
    isInContextOfEvalJs = 0,
    failSafeTimerId = 0;

function massageArgsJsToNative(args) {
    if (!args || utils.typeName(args) != 'Array') {
        return args;
    }
    var ret = [];
    args.forEach(function(arg, i) {
        if (utils.typeName(arg) == 'ArrayBuffer') {
            ret.push({
                'CDVType': 'ArrayBuffer',
                'data': base64.fromArrayBuffer(arg)
            });
        } else {
            ret.push(arg);
        }
    });
    return ret;
}

function massageMessageNativeToJs(message) {
    if (message.CDVType == 'ArrayBuffer') {
        var stringToArrayBuffer = function(str) {
            var ret = new Uint8Array(str.length);
            for (var i = 0; i < str.length; i++) {
                ret[i] = str.charCodeAt(i);
            }
            return ret.buffer;
        };
        var base64ToArrayBuffer = function(b64) {
            return stringToArrayBuffer(atob(b64));
        };
        message = base64ToArrayBuffer(message.data);
    }
    return message;
}

function convertMessageToArgsNativeToJs(message) {
    var args = [];
    if (!message || !message.hasOwnProperty('CDVType')) {
        args.push(message);
    } else if (message.CDVType == 'MultiPart') {
        message.messages.forEach(function(e) {
            args.push(massageMessageNativeToJs(e));
        });
    } else {
        args.push(massageMessageNativeToJs(message));
    }
    return args;
}

function iOSExec() {

    var successCallback, failCallback, service, action, actionArgs;
    var callbackId = null;
    if (typeof arguments[0] !== 'string') {
        // FORMAT ONE
        successCallback = arguments[0];
        failCallback = arguments[1];
        service = arguments[2];
        action = arguments[3];
        actionArgs = arguments[4];

        // Since we need to maintain backwards compatibility, we have to pass
        // an invalid callbackId even if no callback was provided since plugins
        // will be expecting it. The Cordova.exec() implementation allocates
        // an invalid callbackId and passes it even if no callbacks were given.
        callbackId = 'INVALID';
    } else {
        throw new Error('The old format of this exec call has been removed (deprecated since 2.1). Change to: ' +
            'cordova.exec(null, null, \'Service\', \'action\', [ arg1, arg2 ]);'
        );
    }

    // If actionArgs is not provided, default to an empty array
    actionArgs = actionArgs || [];

    // Register the callbacks and add the callbackId to the positional
    // arguments if given.
    if (successCallback || failCallback) {
        callbackId = service + cordova.callbackId++;
        cordova.callbacks[callbackId] =
            {success:successCallback, fail:failCallback};
    }

    actionArgs = massageArgsJsToNative(actionArgs);

    var command = [callbackId, service, action, actionArgs];

    // Stringify and queue the command. We stringify to command now to
    // effectively clone the command arguments in case they are mutated before
    // the command is executed.
    commandQueue.push(JSON.stringify(command));

    // If we're in the context of a stringByEvaluatingJavaScriptFromString call,
    // then the queue will be flushed when it returns; no need for a poke.
    // Also, if there is already a command in the queue, then we've already
    // poked the native side, so there is no reason to do so again.
    if (!isInContextOfEvalJs && commandQueue.length == 1) {
        pokeNative();
    }
}

// CB-10530
function proxyChanged() {
    var cexec = cordovaExec();
       
    return (execProxy !== cexec && // proxy objects are different
            iOSExec !== cexec      // proxy object is not the current iOSExec
            );
}

// CB-10106
function handleBridgeChange() {
    if (proxyChanged()) {
        var commandString = commandQueue.shift();
        while(commandString) {
            var command = JSON.parse(commandString);
            var callbackId = command[0];
            var service = command[1];
            var action = command[2];
            var actionArgs = command[3];
            var callbacks = cordova.callbacks[callbackId] || {};
            
            execProxy(callbacks.success, callbacks.fail, service, action, actionArgs);
            
            commandString = commandQueue.shift();
        };
        return true;
    }
    
    return false;
}

function pokeNative() {
    // CB-5488 - Don't attempt to create iframe before document.body is available.
    if (!document.body) {
        setTimeout(pokeNative);
        return;
    }
    
    // Check if they've removed it from the DOM, and put it back if so.
    if (execIframe && execIframe.contentWindow) {
        execIframe.contentWindow.location = 'gap://ready';
    } else {
        execIframe = document.createElement('iframe');
        execIframe.style.display = 'none';
        execIframe.src = 'gap://ready';
        document.body.appendChild(execIframe);
    }
    // Use a timer to protect against iframe being unloaded during the poke (CB-7735).
    // This makes the bridge ~ 7% slower, but works around the poke getting lost
    // when the iframe is removed from the DOM.
    // An onunload listener could be used in the case where the iframe has just been
    // created, but since unload events fire only once, it doesn't work in the normal
    // case of iframe reuse (where unload will have already fired due to the attempted
    // navigation of the page).
    failSafeTimerId = setTimeout(function() {
        if (commandQueue.length) {
            // CB-10106 - flush the queue on bridge change
            if (!handleBridgeChange()) {
                pokeNative();
             }
        }
    }, 50); // Making this > 0 improves performance (marginally) in the normal case (where it doesn't fire).
}

iOSExec.nativeFetchMessages = function() {
    // Stop listing for window detatch once native side confirms poke.
    if (failSafeTimerId) {
        clearTimeout(failSafeTimerId);
        failSafeTimerId = 0;
    }
    // Each entry in commandQueue is a JSON string already.
    if (!commandQueue.length) {
        return '';
    }
    var json = '[' + commandQueue.join(',') + ']';
    commandQueue.length = 0;
    return json;
};

iOSExec.nativeCallback = function(callbackId, status, message, keepCallback, debug) {
    return iOSExec.nativeEvalAndFetch(function() {
        var success = status === 0 || status === 1;
        var args = convertMessageToArgsNativeToJs(message);
        function nc2() {
            cordova.callbackFromNative(callbackId, success, status, args, keepCallback);
        }
        setTimeout(nc2, 0);
    });
};

iOSExec.nativeEvalAndFetch = function(func) {
    // This shouldn't be nested, but better to be safe.
    isInContextOfEvalJs++;
    try {
        func();
        return iOSExec.nativeFetchMessages();
    } finally {
        isInContextOfEvalJs--;
    }
};

// Proxy the exec for bridge changes. See CB-10106

function cordovaExec() {
    var cexec = require('cordova/exec');
    var cexec_valid = (typeof cexec.nativeFetchMessages === 'function') && (typeof cexec.nativeEvalAndFetch === 'function') && (typeof cexec.nativeCallback === 'function');
    return (cexec_valid && execProxy !== cexec)? cexec : iOSExec;
}

function execProxy() {
    cordovaExec().apply(null, arguments);
};

execProxy.nativeFetchMessages = function() {
    return cordovaExec().nativeFetchMessages.apply(null, arguments);
};

execProxy.nativeEvalAndFetch = function() {
    return cordovaExec().nativeEvalAndFetch.apply(null, arguments);
};

execProxy.nativeCallback = function() {
    return cordovaExec().nativeCallback.apply(null, arguments);
};

module.exports = execProxy;
>>>>>>> cba3f73e4da7f7da5e14bb922f43dcb9b82e5156
