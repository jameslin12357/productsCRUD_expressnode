// make 20000 records
var faker = require('faker');
// myscript.js
// This example uses Node 8's async/await syntax.

const oracledb = require('oracledb');
const jsStringEscape = require('js-string-escape')
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

const mypw = 'LBSPWD'  // set mypw to the hr schema password

    async function run() {

        let connection;

        try {
            connection = await oracledb.getConnection({
                user: "LBSUSER2",
                password: mypw,
                connectString: "localhost/ORCL"
            });
            for (var i = 0; i < 20000; i++) {
                var name = faker.commerce.productName();
                var price = faker.commerce.price();
                var country = faker.address.country();
                var material = faker.commerce.productMaterial();
                var company = faker.company.companyName();
                var color = faker.commerce.color();
                var reg = new RegExp('\'', "g");
                name = name.replace(reg, ' ');
                price = price.replace(reg, ' ');
                country = country.replace(reg, ' ');
                material = material.replace(reg, ' ');
                company = company.replace(reg, ' ');
                color = color.replace(reg, ' ');

                console.log(name + '/' + price + '/' + country + '/' + material + '/' + company + '/' + color);
                await connection.execute(
                    `begin insert into product (name, price, country, material, company, color) values ('${name}','${price}', '${country}', '${material}', '${company}', '${color}');commit;end;`
                    //            // bind value for :id
                );
            }


       //     const result = await connection.execute(
       //         `SELECT manager_id, department_id, department_name
       //FROM departments
       //WHERE manager_id = :id`,
       //         [103],  // bind value for :id
       //     );
       //     console.log(result.rows);

        } catch (err) {
            console.error(err);
        } finally {
            if (connection) {
                try {
                    await connection.close();
                } catch (err) {
                    console.error(err);
                }
            }
        }
    }

run();