var express = require('express');
var router = express.Router();
const oracledb = require('oracledb');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/productspag', function (req, res, next) {
    var page = req.query.page;
    var limit = req.query.limit;
    var pageInt = Number(page);
    var rowsInt = Number(limit);
    var start = (pageInt * rowsInt) - rowsInt;
    var end = pageInt * rowsInt;
    //await connection.execute(
    //    `begin insert into lbs_building (objectid,building_id, name, type, address, source, county_id) values (lbs_building_seq.nextval, '${building_id}', '${name}', '${type}', '${address}', '${source}',  '${county_id}');commit;end;`
    //    //            // bind value for :id
    //);
    //var page = req.

    const mypw = "LBSPWD";

    async function run() {

        let connection;

        try {
            connection = await oracledb.getConnection({
                user: "LBSUSER2",
                password: mypw,
                connectString: "localhost/ORCL"

            });
            const result = await connection.execute(
                `SELECT *
  FROM (SELECT T.*, ROWNUM RN
          FROM (select * from product p order by p.NAME ) T) WHERE RN > ${start} AND RN <= ${end}`
            );
            const result2 = await connection.execute(
                `SELECT COUNT(*) AS TOTAL FROM product p`
            );
            var data = [];
            for (var i = 0; i < result.rows.length; i++) {
                var row = `{`;
                for (var j = 0; j < result.metaData.length; j++) {
                    if (j !== result.metaData.length - 1) {
                        row += `"${result.metaData[j]["name"]}":"${result.rows[i][j]}",`;

                    } else {
                        row += `"${result.metaData[j]["name"]}":"${result.rows[i][j]}"`;

                    }
                    //data.push(`{"${result.metaData[j]["name"]}":"${result.rows[i][j]}"}`);
                }
                row += `}`;
                row = JSON.parse(row);
                data.push(row);
            }
            console.log(data);
            //console.log(JSON.stringify(result));
            //console.log(JSON.stringify(result2));

            res.json({
                "code": 0,
                "msg": "",
                "count": result2.rows[0][0],
                "data": data
            } );
          

            //console.log('r ' + result);
            //console.log('r2' + result2);
        } catch (err) {
            console.error(err);
            console.log(bounds + ' ' + id);
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
});


router.get('/countries', function (req, res, next) {
    var page = req.query.page;
    var limit = req.query.limit;
    var pageInt = Number(page);
    var rowsInt = Number(limit);
    var start = (pageInt * rowsInt) - rowsInt;
    var end = pageInt * rowsInt;
    //await connection.execute(
    //    `begin insert into lbs_building (objectid,building_id, name, type, address, source, county_id) values (lbs_building_seq.nextval, '${building_id}', '${name}', '${type}', '${address}', '${source}',  '${county_id}');commit;end;`
    //    //            // bind value for :id
    //);
    //var page = req.

    const mypw = "LBSPWD";

    async function run() {

        let connection;

        try {
            connection = await oracledb.getConnection({
                user: "LBSUSER2",
                password: mypw,
                connectString: "localhost/ORCL"

            });
            const result = await connection.execute(
                `SELECT *
  FROM (SELECT T.*, ROWNUM RN
          FROM (select distinct p.COUNTRY from product p order by p.COUNTRY ) T)`
            );
            const result2 = await connection.execute(
                `SELECT COUNT(*) AS TOTAL FROM product p`
            );
            var data = [];
            for (var i = 0; i < result.rows.length; i++) {
                var row = `{`;
                for (var j = 0; j < result.metaData.length; j++) {
                    if (j !== result.metaData.length - 1) {
                        row += `"${result.metaData[j]["name"]}":"${result.rows[i][j]}",`;

                    } else {
                        row += `"${result.metaData[j]["name"]}":"${result.rows[i][j]}"`;

                    }
                    //data.push(`{"${result.metaData[j]["name"]}":"${result.rows[i][j]}"}`);
                }
                row += `}`;
                row = JSON.parse(row);
                data.push(row);
            }
            console.log(data);
            //console.log(JSON.stringify(result));
            //console.log(JSON.stringify(result2));

            res.json({
                "code": 0,
                "msg": "",
                "count": result2.rows[0][0],
                "data": data
            });


            //console.log('r ' + result);
            //console.log('r2' + result2);
        } catch (err) {
            console.error(err);
            console.log(bounds + ' ' + id);
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
});


router.get('/materials', function (req, res, next) {
    var page = req.query.page;
    var limit = req.query.limit;
    var pageInt = Number(page);
    var rowsInt = Number(limit);
    var start = (pageInt * rowsInt) - rowsInt;
    var end = pageInt * rowsInt;
    //await connection.execute(
    //    `begin insert into lbs_building (objectid,building_id, name, type, address, source, county_id) values (lbs_building_seq.nextval, '${building_id}', '${name}', '${type}', '${address}', '${source}',  '${county_id}');commit;end;`
    //    //            // bind value for :id
    //);
    //var page = req.

    const mypw = "LBSPWD";

    async function run() {

        let connection;

        try {
            connection = await oracledb.getConnection({
                user: "LBSUSER2",
                password: mypw,
                connectString: "localhost/ORCL"

            });
            const result = await connection.execute(
                `SELECT *
  FROM (SELECT T.*, ROWNUM RN
          FROM (select distinct p.MATERIAL from product p order by p.MATERIAL ) T)`
            );
            const result2 = await connection.execute(
                `SELECT COUNT(*) AS TOTAL FROM product p`
            );
            var data = [];
            for (var i = 0; i < result.rows.length; i++) {
                var row = `{`;
                for (var j = 0; j < result.metaData.length; j++) {
                    if (j !== result.metaData.length - 1) {
                        row += `"${result.metaData[j]["name"]}":"${result.rows[i][j]}",`;

                    } else {
                        row += `"${result.metaData[j]["name"]}":"${result.rows[i][j]}"`;

                    }
                    //data.push(`{"${result.metaData[j]["name"]}":"${result.rows[i][j]}"}`);
                }
                row += `}`;
                row = JSON.parse(row);
                data.push(row);
            }
            console.log(data);
            //console.log(JSON.stringify(result));
            //console.log(JSON.stringify(result2));

            res.json({
                "code": 0,
                "msg": "",
                "count": result2.rows[0][0],
                "data": data
            });


            //console.log('r ' + result);
            //console.log('r2' + result2);
        } catch (err) {
            console.error(err);
            console.log(bounds + ' ' + id);
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
});


router.get('/companies', function (req, res, next) {
    var page = req.query.page;
    var limit = req.query.limit;
    var pageInt = Number(page);
    var rowsInt = Number(limit);
    var start = (pageInt * rowsInt) - rowsInt;
    var end = pageInt * rowsInt;
    //await connection.execute(
    //    `begin insert into lbs_building (objectid,building_id, name, type, address, source, county_id) values (lbs_building_seq.nextval, '${building_id}', '${name}', '${type}', '${address}', '${source}',  '${county_id}');commit;end;`
    //    //            // bind value for :id
    //);
    //var page = req.

    const mypw = "LBSPWD";

    async function run() {

        let connection;

        try {
            connection = await oracledb.getConnection({
                user: "LBSUSER2",
                password: mypw,
                connectString: "localhost/ORCL"

            });
            const result = await connection.execute(
                `SELECT *
  FROM (SELECT T.*, ROWNUM RN
          FROM (select distinct p.COMPANY from product p order by p.COMPANY ) T)`
            );
            const result2 = await connection.execute(
                `SELECT COUNT(*) AS TOTAL FROM product p`
            );
            var data = [];
            for (var i = 0; i < result.rows.length; i++) {
                var row = `{`;
                for (var j = 0; j < result.metaData.length; j++) {
                    if (j !== result.metaData.length - 1) {
                        row += `"${result.metaData[j]["name"]}":"${result.rows[i][j]}",`;

                    } else {
                        row += `"${result.metaData[j]["name"]}":"${result.rows[i][j]}"`;

                    }
                    //data.push(`{"${result.metaData[j]["name"]}":"${result.rows[i][j]}"}`);
                }
                row += `}`;
                row = JSON.parse(row);
                data.push(row);
            }
            console.log(data);
            //console.log(JSON.stringify(result));
            //console.log(JSON.stringify(result2));

            res.json({
                "code": 0,
                "msg": "",
                "count": result2.rows[0][0],
                "data": data
            });


            //console.log('r ' + result);
            //console.log('r2' + result2);
        } catch (err) {
            console.error(err);
            console.log(bounds + ' ' + id);
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
});


router.get('/colors', function (req, res, next) {
    var page = req.query.page;
    var limit = req.query.limit;
    var pageInt = Number(page);
    var rowsInt = Number(limit);
    var start = (pageInt * rowsInt) - rowsInt;
    var end = pageInt * rowsInt;
    //await connection.execute(
    //    `begin insert into lbs_building (objectid,building_id, name, type, address, source, county_id) values (lbs_building_seq.nextval, '${building_id}', '${name}', '${type}', '${address}', '${source}',  '${county_id}');commit;end;`
    //    //            // bind value for :id
    //);
    //var page = req.

    const mypw = "LBSPWD";

    async function run() {

        let connection;

        try {
            connection = await oracledb.getConnection({
                user: "LBSUSER2",
                password: mypw,
                connectString: "localhost/ORCL"

            });
            const result = await connection.execute(
                `SELECT *
  FROM (SELECT T.*, ROWNUM RN
          FROM (select distinct p.COLOR from product p order by p.COLOR ) T)`
            );
            const result2 = await connection.execute(
                `SELECT COUNT(*) AS TOTAL FROM product p`
            );
            var data = [];
            for (var i = 0; i < result.rows.length; i++) {
                var row = `{`;
                for (var j = 0; j < result.metaData.length; j++) {
                    if (j !== result.metaData.length - 1) {
                        row += `"${result.metaData[j]["name"]}":"${result.rows[i][j]}",`;

                    } else {
                        row += `"${result.metaData[j]["name"]}":"${result.rows[i][j]}"`;

                    }
                    //data.push(`{"${result.metaData[j]["name"]}":"${result.rows[i][j]}"}`);
                }
                row += `}`;
                row = JSON.parse(row);
                data.push(row);
            }
            console.log(data);
            //console.log(JSON.stringify(result));
            //console.log(JSON.stringify(result2));

            res.json({
                "code": 0,
                "msg": "",
                "count": result2.rows[0][0],
                "data": data
            });


            //console.log('r ' + result);
            //console.log('r2' + result2);
        } catch (err) {
            console.error(err);
            console.log(bounds + ' ' + id);
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
});


router.get('/filterproducts', function (req, res, next) {
    var page = req.query.page;
    var limit = req.query.limit;
    var pageInt = Number(page);
    var rowsInt = Number(limit);
    var start = (pageInt * rowsInt) - rowsInt;
    var end = pageInt * rowsInt;
    var pricelow = req.query.pl;
    var pricehigh = req.query.ph;
    var country = req.query.country;
    var material = req.query.material;
    var company = req.query.company;
    var color = req.query.color;
    var name = req.query.name;
    //await connection.execute(
    //    `begin insert into lbs_building (objectid,building_id, name, type, address, source, county_id) values (lbs_building_seq.nextval, '${building_id}', '${name}', '${type}', '${address}', '${source}',  '${county_id}');commit;end;`
    //    //            // bind value for :id
    //);
    //var page = req.

    const mypw = "LBSPWD";

    async function run() {

        let connection;

        try {
            connection = await oracledb.getConnection({
                user: "LBSUSER2",
                password: mypw,
                connectString: "localhost/ORCL"

            });
            var sql = `SELECT *
  FROM (SELECT T.*, ROWNUM RN
          FROM (select p.* from product p where p.country like '%${country}%' and p.material like '%${material}%' and p.company like '%${company}%' and p.color like '%${color}%' and p.name like '%${name}%' `;
            var sql2 = `SELECT COUNT(*) AS TOTAL FROM product p where p.country like '%${country}%' and p.material like '%${material}%' and p.company like '%${company}%' and p.color like '%${color}%' and p.name like '%${name}%'`;
            if (pricelow !== '' && pricehigh !== '') {
                sql += `and price >= ${pricelow} and price <= ${pricehigh} `;
                sql2 += `and price >= ${pricelow} and price <= ${pricehigh} `;
            }
            sql += `order by p.NAME ) T) WHERE RN > ${start} AND RN <= ${end}`;
            //if (country !== '') {
            //    where += `country`
            //}
            console.log(sql);

            const result = await connection.execute(
                sql
            );
            const result2 = await connection.execute(
                sql2
            );
            var data = [];
            for (var i = 0; i < result.rows.length; i++) {
                var row = `{`;
                for (var j = 0; j < result.metaData.length; j++) {
                    if (j !== result.metaData.length - 1) {
                        row += `"${result.metaData[j]["name"]}":"${result.rows[i][j]}",`;

                    } else {
                        row += `"${result.metaData[j]["name"]}":"${result.rows[i][j]}"`;

                    }
                    //data.push(`{"${result.metaData[j]["name"]}":"${result.rows[i][j]}"}`);
                }
                row += `}`;
                row = JSON.parse(row);
                data.push(row);
            }
            console.log(data);
            //console.log(JSON.stringify(result));
            //console.log(JSON.stringify(result2));

            res.json({
                "code": 0,
                "msg": "",
                "count": result2.rows[0][0],
                "data": data
            });


            //console.log('r ' + result);
            //console.log('r2' + result2);
        } catch (err) {
            console.error(err);
            console.log(bounds + ' ' + id);
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
});

router.post('/CreateProduct', function (req, res, next) {
    var body = req.body;
    var name = body.name;
    var price = body.price;
    var country = body.country;
    var material = body.material;
    var company = body.company;
    var color = body.color;
    const mypw = "LBSPWD";

    async function run() {

        let connection;

        try {
            connection = await oracledb.getConnection({
                user: "LBSUSER2",
                password: mypw,
                connectString: "localhost/ORCL"

            });
            var errors = [];
            if (name.length === 0) {
                errors.push("名称不能为空")
            }
            if (price.length === 0) {
                errors.push("价格不能为空")
            }
            if (country.length === 0) {
                errors.push("产地不能为空")
            }
            if (material.length === 0) {
                errors.push("材质不能为空")
            }
            if (company.length === 0) {
                errors.push("厂家不能为空")
            }
            if (color.length === 0) {
                errors.push("颜色不能为空")
            }
            if (errors.length !== 0) {
                res.json({
                    "code": 0,
                    "msg": "",
                    "count": -1,
                    "data": errors
                });
            } else {
                var sql = `BEGIN INSERT INTO product (name,price,country,material,company,color) VALUES('${name}','${price}','${country}','${material}','${company}','${color}');commit;end;`;
                const result = await connection.execute(
                    sql
                );
                var data = [];
                res.json({
                    "code": 0,
                    "msg": "",
                    "count": 1,
                    "data": data
                });
            }
           
            //          var sql = `SELECT *
            //FROM (SELECT T.*, ROWNUM RN
            //        FROM (select p.* from product p where p.country like '%${country}%' and p.material like '%${material}%' and p.company like '%${company}%' and p.color like '%${color}%' and p.name like '%${name}%' `;
            //          var sql2 = `SELECT COUNT(*) AS TOTAL FROM product p where p.country like '%${country}%' and p.material like '%${material}%' and p.company like '%${company}%' and p.color like '%${color}%' and p.name like '%${name}%'`;
            //          if (pricelow !== '' && pricehigh !== '') {
            //              sql += `and price >= ${pricelow} and price <= ${pricehigh} `;
            //              sql2 += `and price >= ${pricelow} and price <= ${pricehigh} `;
            //          }
            //          sql += `order by p.NAME ) T) WHERE RN > ${start} AND RN <= ${end}`;
            //          //if (country !== '') {
            //          //    where += `country`
            //          //}
            //          console.log(sql);

            //          const result = await connection.execute(
            //              sql
            //          );
            //          const result2 = await connection.execute(
            //              sql2
            //          );
            //for (var i = 0; i < result.rows.length; i++) {
            //    var row = `{`;
            //    for (var j = 0; j < result.metaData.length; j++) {
            //        if (j !== result.metaData.length - 1) {
            //            row += `"${result.metaData[j]["name"]}":"${result.rows[i][j]}",`;

            //        } else {
            //            row += `"${result.metaData[j]["name"]}":"${result.rows[i][j]}"`;

            //        }
            //        //data.push(`{"${result.metaData[j]["name"]}":"${result.rows[i][j]}"}`);
            //    }
            //    row += `}`;
            //    row = JSON.parse(row);
            //    data.push(row);
            //}
            //console.log(data);
            //console.log(JSON.stringify(result));
            //console.log(JSON.stringify(result2));

            


            //console.log('r ' + result);
            //console.log('r2' + result2);
        } catch (err) {
            console.error(err);
            console.log(bounds + ' ' + id);
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
});

router.post('/EditProduct', function (req, res, next) {
    var body = req.body;
    var name = body.name;
    var price = body.price;
    var country = body.country;
    var material = body.material;
    var company = body.company;
    var color = body.color;
    var PRODUCTID = req.query.PRODUCTID;
    const mypw = "LBSPWD";

    async function run() {

        let connection;

        try {
            connection = await oracledb.getConnection({
                user: "LBSUSER2",
                password: mypw,
                connectString: "localhost/ORCL"

            });
            var sql = `BEGIN UPDATE product SET name = '${name}', price = '${price}', country = '${country}', material = '${material}', company = '${company}', color = '${color}' where productid = '${PRODUCTID}';commit;end;`;
            const result = await connection.execute(
                sql
            );
  //          var sql = `SELECT *
  //FROM (SELECT T.*, ROWNUM RN
  //        FROM (select p.* from product p where p.country like '%${country}%' and p.material like '%${material}%' and p.company like '%${company}%' and p.color like '%${color}%' and p.name like '%${name}%' `;
  //          var sql2 = `SELECT COUNT(*) AS TOTAL FROM product p where p.country like '%${country}%' and p.material like '%${material}%' and p.company like '%${company}%' and p.color like '%${color}%' and p.name like '%${name}%'`;
  //          if (pricelow !== '' && pricehigh !== '') {
  //              sql += `and price >= ${pricelow} and price <= ${pricehigh} `;
  //              sql2 += `and price >= ${pricelow} and price <= ${pricehigh} `;
  //          }
  //          sql += `order by p.NAME ) T) WHERE RN > ${start} AND RN <= ${end}`;
  //          //if (country !== '') {
  //          //    where += `country`
  //          //}
  //          console.log(sql);

  //          const result = await connection.execute(
  //              sql
  //          );
  //          const result2 = await connection.execute(
  //              sql2
  //          );
            var data = [];
            //for (var i = 0; i < result.rows.length; i++) {
            //    var row = `{`;
            //    for (var j = 0; j < result.metaData.length; j++) {
            //        if (j !== result.metaData.length - 1) {
            //            row += `"${result.metaData[j]["name"]}":"${result.rows[i][j]}",`;

            //        } else {
            //            row += `"${result.metaData[j]["name"]}":"${result.rows[i][j]}"`;

            //        }
            //        //data.push(`{"${result.metaData[j]["name"]}":"${result.rows[i][j]}"}`);
            //    }
            //    row += `}`;
            //    row = JSON.parse(row);
            //    data.push(row);
            //}
            //console.log(data);
            //console.log(JSON.stringify(result));
            //console.log(JSON.stringify(result2));

            res.json({
                "code": 0,
                "msg": "",
                "count": 1,
                "data": data
            });


            //console.log('r ' + result);
            //console.log('r2' + result2);
        } catch (err) {
            console.error(err);
            console.log(bounds + ' ' + id);
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
});


router.post('/DeleteProduct', function (req, res, next) {
    var PRODUCTID = req.query.PRODUCTID;
    const mypw = "LBSPWD";

    async function run() {

        let connection;

        try {
            connection = await oracledb.getConnection({
                user: "LBSUSER2",
                password: mypw,
                connectString: "localhost/ORCL"

            });
            var sql = `BEGIN DELETE FROM product where productid = '${PRODUCTID}';commit;end;`;
            const result = await connection.execute(
                sql
            );
            //          var sql = `SELECT *
            //FROM (SELECT T.*, ROWNUM RN
            //        FROM (select p.* from product p where p.country like '%${country}%' and p.material like '%${material}%' and p.company like '%${company}%' and p.color like '%${color}%' and p.name like '%${name}%' `;
            //          var sql2 = `SELECT COUNT(*) AS TOTAL FROM product p where p.country like '%${country}%' and p.material like '%${material}%' and p.company like '%${company}%' and p.color like '%${color}%' and p.name like '%${name}%'`;
            //          if (pricelow !== '' && pricehigh !== '') {
            //              sql += `and price >= ${pricelow} and price <= ${pricehigh} `;
            //              sql2 += `and price >= ${pricelow} and price <= ${pricehigh} `;
            //          }
            //          sql += `order by p.NAME ) T) WHERE RN > ${start} AND RN <= ${end}`;
            //          //if (country !== '') {
            //          //    where += `country`
            //          //}
            //          console.log(sql);

            //          const result = await connection.execute(
            //              sql
            //          );
            //          const result2 = await connection.execute(
            //              sql2
            //          );
            var data = [];
            //for (var i = 0; i < result.rows.length; i++) {
            //    var row = `{`;
            //    for (var j = 0; j < result.metaData.length; j++) {
            //        if (j !== result.metaData.length - 1) {
            //            row += `"${result.metaData[j]["name"]}":"${result.rows[i][j]}",`;

            //        } else {
            //            row += `"${result.metaData[j]["name"]}":"${result.rows[i][j]}"`;

            //        }
            //        //data.push(`{"${result.metaData[j]["name"]}":"${result.rows[i][j]}"}`);
            //    }
            //    row += `}`;
            //    row = JSON.parse(row);
            //    data.push(row);
            //}
            //console.log(data);
            //console.log(JSON.stringify(result));
            //console.log(JSON.stringify(result2));

            res.json({
                "code": 0,
                "msg": "",
                "count": 1,
                "data": data
            });


            //console.log('r ' + result);
            //console.log('r2' + result2);
        } catch (err) {
            console.error(err);
            console.log(bounds + ' ' + id);
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
});

module.exports = router;
