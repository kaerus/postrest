/* 
 * Copyright (c) 2015 RestfulDesign (restfuldesign.com),
 * created by Anders Elo <anders @ restfuldesign com>.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

exports.session = function (db) {
    "use strict";

    var path = "/_session/";

    return {
        "get": function (database) {
            database = database ||  "";

            return db.get(path + database);
        },
        "login": function (options) {
            options = options || {};

            var host = db.connection.host ||  {};

            var data = {
                username: options.username || host.username ||  "",
                password: options.password || host.password ||  "",
                database: options.database || db._database ||  "",
                schema: options.schema ||  db._schema ||  ""
            };

            return db.post(path, data);
        },
        "logout": function (database) {
            database = database || "";
            return db.delete(path + database);
        }
    }
};