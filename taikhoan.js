
function checkDangKyTaiKhoan() {

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var repass = document.getElementById('repass').value;

    document.getElementById("emailError").innerHTML = "";
    document.getElementById("passwordError").innerHTML = "";
    document.getElementById("RePassError").innerHTML = "";

    var flag = true; 
        var atposition = email.indexOf("@");
        var dotposition = email.lastIndexOf(".");
        if (atposition < 1 || dotposition < (atposition + 2) || (dotposition + 2) >= email.length) {
            flag = false;
            document.getElementById("emailError").style.color = "red";
            document.getElementById("emailError").style.display = "block";
            document.getElementById("emailError").style.margin = "10px";
            document.getElementById("emailError").innerHTML="Vui lòng kiểm tra lại email!";
    } else {
        for (var TK in localStorage){ 
            var x = JSON.parse(localStorage.getItem(TK));
            if(x == null)
                break;
            if(email == x.em) {
                flag = false;
                document.getElementById("emailError").innerHTML="email đã tồn tại!";
                document.getElementById("emailError").style.color = "red";
                document.getElementById("emailError").style.display = "block";
                document.getElementById("emailError").style.margin = "10px";
            }
        }
    }

    if(password.length < 6)
    {
        flag = false;
        document.getElementById("passwordError").innerHTML="Vui lòng kiểm tra lại Pass (Lớn hơn hoặc bằng 6 kí tự)!";
        document.getElementById("passwordError").style.color = "red";
        document.getElementById("passwordError").style.display = "block";
        document.getElementById("passwordError").style.margin = "10px";
    }

    if(repass != password) {
        flag = false;
        document.getElementById("RePassError").innerHTML="Mật khẩu không khớp!";
        document.getElementById("RePassError").style.color = "red";
        document.getElementById("RePassError").style.display = "block";
        document.getElementById("RePassError").style.margin = "10px";
    }

    if(!flag)
        return false;

    //Tạo đối tượng
    let taiKhoan = {
        em: email,
        matKhau: password,
    }
    localStorage.setItem("Tài khoản" + email, JSON.stringify(taiKhoan));
    localStorage.setItem("new", email);
    window.location = 'index.html';
}

function checkDangNhap() {

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    document.getElementById("emailError").innerHTML = "";
    document.getElementById("passwordError").innerHTML = "";

    var flag = true;
    var TK = JSON.parse(localStorage.getItem("Tài khoản" + email));

    if (TK == null) {
        flag = false;
        document.getElementById("emailError").innerHTML="Email không hợp lệ!";
        document.getElementById("emailError").style.color = "red";
        document.getElementById("emailError").style.display = "block";
        document.getElementById("emailError").style.margin = "10px";
        return flag;
    }

    if(password != TK.matKhau) {
        flag = false;
        document.getElementById("passwordError").innerHTML="Mật khẩu không khớp!";
        document.getElementById("passwordError").style.color = "red";
        document.getElementById("passwordError").style.display = "block";
        document.getElementById("passwordError").style.margin = "10px";
    }

    if(!flag)
    return false;
    localStorage.setItem("new", email);
    window.location = './index.html';
}

function trangThai()
{
    var taiKhoan =localStorage.getItem("new");
    if(taiKhoan != "null")
    {
        document.getElementById("dangnhap").style.display="none";
        document.getElementById("dangky").style.display="none";
        document.getElementById("taiKhoan").innerHTML=taiKhoan;
        document.getElementById("taiKhoan").style.display="block";
        document.getElementById("dangxuat").style.display="block";

    }
    else
    {
        document.getElementById("dangnhap").style.display="block";
        document.getElementById("dangky").style.display="block";
        document.getElementById("taiKhoan").style.display="none";
        document.getElementById("taiKhoan").innerHTML="";
        document.getElementById("dangxuat").style.display="none";
    }
}

function dangXuat()
{
    localStorage.setItem("new", null);
    location.reload();
}

function load() {
    table = `
        <tr>
            <th>STT</th>
            <th>Email</th>
        </tr>`
        var vt = 0;
        for (var key in localStorage) {
           if(key!="new")
           {
            var taiKhoan = JSON.parse(localStorage.getItem(key));
            if(taiKhoan == null)
                break;
            table += `
                <tr>
                    <td>${++vt}</td>
                    <td>${taiKhoan.em}</td>
                </tr>`
            table += `
                <tr>
                    <td></td>
                    <td></td>
                </tr>`
           }
            
        }

    document.getElementById('table').innerHTML = table;
}

function xoaToanBo() {
    localStorage.setItem("new", null);
	window.localStorage.clear();
    location.reload();
}