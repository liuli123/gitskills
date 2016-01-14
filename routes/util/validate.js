exports.valiUserName =
    function(username) { return /^[a-zA-Z0-9\u4e00-\u9fa5][a-zA-Z0-9_\u4E00-\u9FA5]{1,25}$/.test(username); }

    exports.valiPassword =
        function(usn) { if (usn==null||usn.length >= 21 || usn.length < 6){
          return false
        }else{
          return true;
        } };

        exports.valiPhone = function(phone) {
  return /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
      .test(phone);
}
