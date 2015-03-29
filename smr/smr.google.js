///<reference path="smr.ajax.js" />


/**
 * smr.google.js
 * googleのAPIを使う
 */
(function (smr, undefined) {



    var
        //shortenerAPIのurl
        SHORTENER_URL = "https://www.googleapis.com/urlshortener/v1/url?key=",

        //ajaxのデフォルトのerrorの時の関数
        DEFAULT_ERROR_FUNCTION = function error(text) { console.error(text); },

        window = smr.global,

        //JSON
        JSON = window.JSON,

        //APIのキー
        DEFAULT_API_KEYS = {
            short: "AIzaSyAY-kv1znRD6gmjEAlEfV2p4TFu3gTWfyc"
        };

    /*
      smr.google
    */
    var google = {

        /*
          短いURLを取得します
          
          @param params 次の形式で渡してください
                        {
                            //URLを指定
                            url : "",

                            //コールバック関数を指定
                            //関数の引数には短くなったURLが渡されます
                            callback: function (shortUrl) {},
                            
                            //errorの指定
                            //ajaxでerrorが発生したときの関数
                            //引数にはresponseTextが渡されます
                            //未指定の場合はこの関数になります
                            error: function (text) {console.error(text);},

                            //googleのAPIkeyを指定。
                            //未指定の場合このkeyになります
                            key: "AIzaSyAY-kv1znRD6gmjEAlEfV2p4TFu3gTWfyc",

                            //非同期か
                            //未指定でtrue
                            async: true,
                        }

        */
        getShortUrl: function getShortUrl(params) {
            var url = params.url || "";
            var callback = params.callback || function () { };
            var key = params.key || DEFAULT_API_KEYS.short;
            var async = (params.async === undefined) || params.async;

            return smr.ajax.load({
                url: SHORTENER_URL + key,
                success: function (data) {
                    return callback(data.id);
                },
                error: params.error || DEFAULT_ERROR_FUNCTION,
                async: async,
                encode: false,
                type: "post",
                charset: "utf-8",
                contentType: "application/json",
                data: JSON.stringify({ longUrl: url }),
                dataType: "json",
            });

        }
    };

    smr.definePackage("smr.google", google);


})(smr);