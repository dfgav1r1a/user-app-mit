import {faker} from '@faker-js/faker';

//faker data
const firstName = faker.name.firstName();
const lastName = faker.name.lastName();
const date = faker.date.past(20, new Date());

const name = faker.name.findName(firstName, lastName);
const email = faker.internet.email (firstName, lastName);
const username = faker.internet.userName(firstName, lastName);
const password = faker.internet.password();
const phone = faker.phone.number();
const streetaddress = faker.address.streetAddress();
const citystatezip = faker.address.cityName() + ', ' + faker.address.stateAbbr() + ", " + faker.address.zipCode();
const avatar = faker.internet.avatar();
const dob = faker.date.birthdate();

//object to store user data

const user = {
    name,
    dob,
    email,
    username,
    password,
    phone,
    streetaddress,
    citystatezip,
    avatar
};

function add() {
//superagent to manage low level HTTP calls
const url = 'http://localhost:3000/add-user.html';
superagent.post(url)
        .send(user)
        .end((err, res) => {
            if (err) {
                console.log(err);
            } else {
                console.log(res);
                if (res.statusCode === 200) {
                    document.getElementById('status').innerHTML = `
                        <b>${res.body}</b>`;
                }
            };
        });
};









