AccountKit_OnInteractive = function(){
  AccountKit.init({
      appId:226258321118983,
      state: document.getElementById('csrf_nonce').value,
      version:"v1.0"
    }
  )}

function loginCallback(response) {
  console.log(response);
  if (response.status === "PARTIALLY_AUTHENTICATED") {
    document.getElementById("code").value = response.code;
    document.getElementById("csrf_nonce").value = response.state;
    document.getElementById('mobile').value = document.getElementById("phone_num").value;
    document.getElementById("my_form").submit();
  }
  else if (response.status === "NOT_AUTHENTICATED") {
    // handle authentication failure
  }
  else if (response.status === "BAD_PARAMS") {
    // handle bad parameters
  }
}
// phone form submission handler
function phone_btn_onclick() {
  var country_code = document.getElementById("country_code").value;
  var ph_num = document.getElementById("phone_num").value;
  AccountKit.login('PHONE',
    {countryCode: country_code, phoneNumber: ph_num}, // will use default values if this is not specified
    loginCallback);
}


function updateID(element){
  document.getElementById('taskto_name').value = element.options[element.selectedIndex].text
}
