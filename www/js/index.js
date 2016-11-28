/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var jxcoreLoaded = false,
    localDb;
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
        jxcore.isReady(function() {
            jxcore('app.js').loadMainFile(function(ret, err) {
                console.log('jxcore loaded');
                // give some time for DB initialization
                setTimeout(function () {
                    jxcoreLoaded = true;
                    localDb = new PouchDB('http://localhost:8080/dbs/LocalDB')
                }, 20000);
            });
        });
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

function queryDb () {
    if (!jxcoreLoaded) {
        alert("jxcore not loaded - please wait");
        return;
    }
    console.log('TestDb execute query');
    localDb.query('testdoc', {
        limit: 100,
        include_docs: true
    }).then(function (result) {
        console.log('TestDb got result ' + result.rows.length);
    }).catch(function (err) {
        console.log('TestDb got error ' + err);
    });
}

setTimeout(queryDb, 30000);


app.initialize();