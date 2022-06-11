import customersAPI from "../api/customerApi.js";
let infoUserString = localStorage.getItem("userInfo");

let infoUser = JSON.parse(infoUserString);

let idUser = infoUser.idUser;

let userNameV = infoUser.username;

const changeBtn = document.querySelector(".change");
console.log(changeBtn);

console.log(idUser);
const nameR = document.querySelector(".name");
const emailR = document.querySelector(".email");
const addressR = document.querySelector(".address_customer");
const phoneR = document.querySelector(".phone");
const sexR = document.querySelector(".sex");

const getCustomer = async () => {
    try {
        const result = await customersAPI.getCustomerById(idUser);
        console.log(result);
        nameR.value = result[0].name;
        emailR.value = result[0].email;
        addressR.value = result[0].addressCustomer;
        phoneR.value = result[0].phone;
        sexR.value = result[0].sex;

    } catch (error) {
        console.log(error);
    }
};

getCustomer();

const change = async (userName,address, email, phone,sex,name) => {
    try {
        const customer = {
            idRole:2,
            username: userName,
            addressCustomer:address,
            email:email,
            phone:phone,
            sex:sex,
            name:name
        };
        const result = await customersAPI.change(customer,idUser);
        console.log(result.status);
        if (result.status == true) {
            window.location.href = "index.html";
            alert("Đổi thông tin thành công");
            
        }
        
    } catch (e) {
        console.log(e);
    }
};

changeBtn.addEventListener("click", () => {
    const nameV = nameR.value;
    const emailV = emailR.value;
    const addressV = addressR.value;
    const phoneV = phoneR.value;
    const sexV = sexR.value;
    change( userNameV,addressV,emailV,phoneV,sexV,nameV);
});