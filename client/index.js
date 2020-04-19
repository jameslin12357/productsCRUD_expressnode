//一般直接写在一个js文件中
var layer, form, table, selected;
layui.use(['layer', 'form', 'table'], function () {
    layer = layui.layer;
    form = layui.form;
    table = layui.table;
    //layer.msg('Hello World');
    //第一个实例
    table.render({
        id: 'test',
        elem: '#demo',
        toolbar: "#tb",
        limits: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 500, 1000, 5000, 10000]
        , height: 500
        , url: 'http://localhost:3000/productspag' //数据接口
        , page: true //开启分页
        , cols: [[ //表头
            { field: 'PRODUCTID', title: '产品ID', width: 80, sort: true, fixed: 'left', width: '11.11%' }
            , { field: 'NAME', title: '名称', width: 80, sort: true, width: '11.11%'}
            , { field: 'PRICE', title: '价格', width: 80, sort: true, width: '11.11%' }
            , { field: 'COUNTRY', title: '产地', width: 80, sort: true, width: '11.11%' }
            , { field: 'MATERIAL', title: '材质', width: 177, sort: true, width: '11.11%' }
            , { field: 'COMPANY', title: '厂家', width: 80, sort: true, width: '11.11%' }
            , { field: 'COLOR', title: '颜色', width: 80, sort: true, width: '11.11%' }
            , { field: 'CREATE_DATE', title: '创建日期', width: 80, sort: true, width: '11.11%' },
            { fixed: 'right', width: '11.11%', align: 'center', toolbar: '#tb2' }

        ]]
    });
    table.on('toolbar(test)', function (obj) {
        //console.log(obj);
        //var checkStatus = table.checkStatus(obj.config.id);
        switch (obj.event) {
            case 'create':
                var content = `<form class="layui-form layui-form-pane formCreate" action="" onsubmit="event.preventDefault();createProductPost(this);"> 
  <div class="layui-form-item">
                    <label class="layui-form-label">名称</label>
                    <div class="layui-input-block">
                      <input type="text" name="name"  placeholder="请输入" autocomplete="off" class="layui-input">
                    </div>
                  </div>
 <div class="layui-form-item">
                    <label class="layui-form-label">价格</label>
                    <div class="layui-input-block">
                      <input type="text" name="name"  placeholder="请输入" autocomplete="off" class="layui-input">
                    </div>
                  </div>
<div class="layui-form-item">
    <label class="layui-form-label">产地</label>
    <div id="selectCountryEdit" class="layui-input-block"><select><option value="">请选择产地</option></select></div></div>
<div class="layui-form-item">
    <label class="layui-form-label">材质</label>
    <div id="selectMaterialEdit" class="layui-input-block"><select><option value="">请选择材质</option></select></div></div>
<div class="layui-form-item">
    <label class="layui-form-label">厂家</label>
    <div id="selectCompanyEdit" class="layui-input-block"><select><option value="">请选择厂家</option></select></div></div>
<div class="layui-form-item">
    <label class="layui-form-label">颜色</label>
    <div id="selectColorEdit" class="layui-input-block"><select><option value="">请选择颜色</option></select></div></div>
                  





<div class="layui-form-item flex jcc tac">

   <button type="submit" class="layui-btn layui-btn-normal fr">提交</button>
</div></form>`;
                layer.open({
                    btn: '',
                    area: ['550px', '500px'],
                    resize: false,
                    shade: 0,
                    title: "新建产品",
                    content: content
                });
                form.render();
                $.ajax({
                    type: "get",
                    url: `http://localhost:3000/countries`,
                    dataType: "json",
                    success: function (d) {
                        var select = `<select lay-search=""><option value=""`;
                        //if (`${data["COUNTRY"]}` === "null") {
                        //    select += `selected`;
                        //}
                        select += `>请选择产地</option>`
                        var option, value;
                        d.data.forEach(function (c) {
                            if (c["COUNTRY"] !== "null") {
                                option = c["COUNTRY"];
                                value = c["COUNTRY"];
                                select += `<option value="${value}"`
                                //if (`${data["COUNTRY"]}` === value) {
                                //    select += `selected`;
                                //}
                                select += `>${option}</option >`;
                            }

                        });
                        select += "</select>";
                        document.getElementById('selectCountryEdit').innerHTML = select;
                        form.render();
                        //                 var dd = document.getElementsByTagName('dd');
                        //for (var i = 0; i < dd.length; i++) {
                        //    var value = dd[i].getAttribute('lay-value');
                        //    if (value === countySelected) {
                        //        dd[i].click();
                        //        break;
                        //    }
                        //}
                    },
                    error: function () {
                        console.log('error');
                    }
                });
                $.ajax({
                    type: "get",
                    url: `http://localhost:3000/materials`,
                    dataType: "json",
                    success: function (d) {
                        var select = `<select lay-search=""><option value=""`;
                        //if (`${data["MATERIAL"]}` === "null") {
                        //    select += `selected`;
                        //}
                        select += `>请选择材质</option>`
                        var option, value;
                        d.data.forEach(function (c) {
                            if (c["MATERIAL"] !== "null") {
                                option = c["MATERIAL"];
                                value = c["MATERIAL"];
                                select += `<option value="${value}"`
                                //if (`${data["MATERIAL"]}` === value) {
                                //    select += `selected`;
                                //}
                                select += `>${option}</option >`;
                            }

                        });
                        select += "</select>";
                        document.getElementById('selectMaterialEdit').innerHTML = select;
                        form.render();
                        //                 var dd = document.getElementsByTagName('dd');
                        //for (var i = 0; i < dd.length; i++) {
                        //    var value = dd[i].getAttribute('lay-value');
                        //    if (value === countySelected) {
                        //        dd[i].click();
                        //        break;
                        //    }
                        //}
                    },
                    error: function () {
                        console.log('error');
                    }
                });
                $.ajax({
                    type: "get",
                    url: `http://localhost:3000/companies`,
                    dataType: "json",
                    success: function (d) {
                        var select = `<select lay-search=""><option value=""`;
                        //if (`${data["COMPANY"]}` === "null") {
                        //    select += `selected`;
                        //}
                        select += `>请选择厂家</option>`
                        var option, value;
                        d.data.forEach(function (c) {
                            if (c["COMPANY"] !== "null") {
                                option = c["COMPANY"];
                                value = c["COMPANY"];
                                select += `<option value="${value}"`
                                //if (`${data["COMPANY"]}` === value) {
                                //    select += `selected`;
                                //}
                                select += `>${option}</option >`;
                            }

                        });
                        select += "</select>";
                        document.getElementById('selectCompanyEdit').innerHTML = select;
                        form.render();
                        //                 var dd = document.getElementsByTagName('dd');
                        //for (var i = 0; i < dd.length; i++) {
                        //    var value = dd[i].getAttribute('lay-value');
                        //    if (value === countySelected) {
                        //        dd[i].click();
                        //        break;
                        //    }
                        //}
                    },
                    error: function () {
                        console.log('error');
                    }
                });
                $.ajax({
                    type: "get",
                    url: `http://localhost:3000/colors`,
                    dataType: "json",
                    success: function (d) {
                        var select = `<select lay-search=""><option value=""`;
                        //if (`${data["COLOR"]}` === "null") {
                        //    select += `selected`;
                        //}
                        select += `>请选择颜色</option>`
                        var option, value;
                        d.data.forEach(function (c) {
                            if (c["COLOR"] !== "null") {
                                option = c["COLOR"];
                                value = c["COLOR"];
                                select += `<option value="${value}"`
                                //if (`${data["COLOR"]}` === value) {
                                //    select += `selected`;
                                //}
                                select += `>${option}</option >`;
                            }

                        });
                        select += "</select>";
                        document.getElementById('selectColorEdit').innerHTML = select;
                        form.render();
                        //                 var dd = document.getElementsByTagName('dd');
                        //for (var i = 0; i < dd.length; i++) {
                        //    var value = dd[i].getAttribute('lay-value');
                        //    if (value === countySelected) {
                        //        dd[i].click();
                        //        break;
                        //    }
                        //}
                    },
                    error: function () {
                        console.log('error');
                    }
                });
                break;
            //case 'delete':
            //    layer.msg('删除');
            //    break;
            //case 'update':
            //    layer.msg('编辑');
            //    break;
        };
    });
    //监听工具条 
    table.on('tool(test)', function (obj) { //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
        var tr = obj.tr; //获得当前行 tr 的 DOM 对象（如果有的话）
        selected = data;
        if (layEvent === 'detail') { //查看
            layer.open({
                title: '产品详情'

                , content: `<div>
                    <p><span>产品ID:</span><span>${data["PRODUCTID"]}</span></p>
                <p><span>名称:</span> <span>${data["NAME"]}</span></p>
                <p><span>价格:</span> <span>${data["PRICE"]}</span></p>
                <p><span>产地:</span> <span>${data["COUNTRY"]}</span></p>
                <p><span>材质:</span> <span>${data["MATERIAL"]}</span></p>
                <p><span>厂家:</span> <span>${data["COMPANY"]}</span></p>
                <p><span>颜色:</span> <span>${data["COLOR"]}</span></p>
                <p><span>创建日期:</span> <span>${data["CREATE_DATE"]}</span></p>
                            </div >`,
                btn: '',
                shade: 0,
                resize: false
            });

            console.log(data);
            //do somehing
        } else if (layEvent === 'edit') { //删除
            console.log(data);

            layer.open({
                btn: '',
                area: ['550px', '500px'],

                resize: false,
                shade: 0,
                title: "编辑产品",
                content: `<form class="layui-form layui-form-pane formEdit" action=""  onsubmit="event.preventDefault();editProductPost(this);">
                   <div class="layui-form-item">
                    <label class="layui-form-label">名称</label>
                    <div class="layui-input-block">
                      <input type="text" name="name"  placeholder="请输入" autocomplete="off" class="layui-input"  value="${data["NAME"]}">
                    </div>
                  </div>
 <div class="layui-form-item">
                    <label class="layui-form-label">价格</label>
                    <div class="layui-input-block">
                      <input type="text" name="name"  placeholder="请输入" autocomplete="off" class="layui-input"  value="${data["PRICE"]}">
                    </div>
                  </div>
<div class="layui-form-item">
    <label class="layui-form-label">产地</label>
    <div id="selectCountryEdit" class="layui-input-block"><select><option value="">请选择产地</option></select></div></div>
<div class="layui-form-item">
    <label class="layui-form-label">材质</label>
    <div id="selectMaterialEdit" class="layui-input-block"><select><option value="">请选择材质</option></select></div></div>
<div class="layui-form-item">
    <label class="layui-form-label">厂家</label>
    <div id="selectCompanyEdit" class="layui-input-block"><select><option value="">请选择厂家</option></select></div></div>
<div class="layui-form-item">
    <label class="layui-form-label">颜色</label>
    <div id="selectColorEdit" class="layui-input-block"><select><option value="">请选择颜色</option></select></div></div>
                  





<div class="layui-form-item flex jcc tac">

   <button type="submit" class="layui-btn layui-btn-normal fr">提交</button>
</div></form>`
            });
            form.render();
            $.ajax({
                type: "get",
                url: `http://localhost:3000/countries`,
                dataType: "json",
                success: function (d) {
                    var select = `<select lay-search=""><option value=""`;
                    if (`${data["COUNTRY"]}` === "null") {
                        select += `selected`;
                    }
                    select += `>请选择产地</option>`
                    var option, value;
                    d.data.forEach(function (c) {
                        if (c["COUNTRY"] !== "null") {
                            option = c["COUNTRY"];
                            value = c["COUNTRY"];
                            select += `<option value="${value}"`
                            if (`${data["COUNTRY"]}` === value) {
                                select += `selected`;
                            }
                            select += `>${option}</option >`;
                        }
                       
                    });
                    select += "</select>";
                    document.getElementById('selectCountryEdit').innerHTML = select;
                    form.render();
                    //                 var dd = document.getElementsByTagName('dd');
                    //for (var i = 0; i < dd.length; i++) {
                    //    var value = dd[i].getAttribute('lay-value');
                    //    if (value === countySelected) {
                    //        dd[i].click();
                    //        break;
                    //    }
                    //}
                },
                error: function () {
                    console.log('error');
                }
            });
            $.ajax({
                type: "get",
                url: `http://localhost:3000/materials`,
                dataType: "json",
                success: function (d) {
                    var select = `<select lay-search=""><option value=""`;
                    if (`${data["MATERIAL"]}` === "null") {
                        select += `selected`;
                    }
                    select += `>请选择材质</option>`
                    var option, value;
                    d.data.forEach(function (c) {
                        if (c["MATERIAL"] !== "null") {
                            option = c["MATERIAL"];
                            value = c["MATERIAL"];
                            select += `<option value="${value}"`
                            if (`${data["MATERIAL"]}` === value) {
                                select += `selected`;
                            }
                            select += `>${option}</option >`;
                        }

                    });
                    select += "</select>";
                    document.getElementById('selectMaterialEdit').innerHTML = select;
                    form.render();
                    //                 var dd = document.getElementsByTagName('dd');
                    //for (var i = 0; i < dd.length; i++) {
                    //    var value = dd[i].getAttribute('lay-value');
                    //    if (value === countySelected) {
                    //        dd[i].click();
                    //        break;
                    //    }
                    //}
                },
                error: function () {
                    console.log('error');
                }
            });
            $.ajax({
                type: "get",
                url: `http://localhost:3000/companies`,
                dataType: "json",
                success: function (d) {
                    var select = `<select lay-search=""><option value=""`;
                    if (`${data["COMPANY"]}` === "null") {
                        select += `selected`;
                    }
                    select += `>请选择厂家</option>`
                    var option, value;
                    d.data.forEach(function (c) {
                        if (c["COMPANY"] !== "null") {
                            option = c["COMPANY"];
                            value = c["COMPANY"];
                            select += `<option value="${value}"`
                            if (`${data["COMPANY"]}` === value) {
                                select += `selected`;
                            }
                            select += `>${option}</option >`;
                        }

                    });
                    select += "</select>";
                    document.getElementById('selectCompanyEdit').innerHTML = select;
                    form.render();
                    //                 var dd = document.getElementsByTagName('dd');
                    //for (var i = 0; i < dd.length; i++) {
                    //    var value = dd[i].getAttribute('lay-value');
                    //    if (value === countySelected) {
                    //        dd[i].click();
                    //        break;
                    //    }
                    //}
                },
                error: function () {
                    console.log('error');
                }
            });
            $.ajax({
                type: "get",
                url: `http://localhost:3000/colors`,
                dataType: "json",
                success: function (d) {
                    var select = `<select lay-search=""><option value=""`;
                    if (`${data["COLOR"]}` === "null") {
                        select += `selected`;
                    }
                    select += `>请选择颜色</option>`
                    var option, value;
                    d.data.forEach(function (c) {
                        if (c["COLOR"] !== "null") {
                            option = c["COLOR"];
                            value = c["COLOR"];
                            select += `<option value="${value}"`
                            if (`${data["COLOR"]}` === value) {
                                select += `selected`;
                            }
                            select += `>${option}</option >`;
                        }

                    });
                    select += "</select>";
                    document.getElementById('selectColorEdit').innerHTML = select;
                    form.render();
                    //                 var dd = document.getElementsByTagName('dd');
                    //for (var i = 0; i < dd.length; i++) {
                    //    var value = dd[i].getAttribute('lay-value');
                    //    if (value === countySelected) {
                    //        dd[i].click();
                    //        break;
                    //    }
                    //}
                },
                error: function () {
                    console.log('error');
                }
            });
            //layer.confirm('真的删除行么', function (index) {
            //    obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
            //    layer.close(index);
            //    //向服务端发送删除指令
            //});
        } else if (layEvent === 'delete') { //编辑
            layer.open({
                btn: '',
                shade: 0,
                title: "删除产品",
                content: `<div><div class="mb-5">确定删除产品?</div><div class="tac"><button type="submit" class="layui-btn layui-btn-danger" onclick="deleteProductPost(this);">删除</button></div></div>`
            });
        }
    });
    form.render();
});


function createProductPost(e) {
    var errors = document.getElementsByClassName("clRedError");
    for (var i = 0; i < errors.length; i++) {
        errors[i].remove();
    }
    var inputs = e.getElementsByTagName('input');
    var selects = e.getElementsByTagName('select');
    var name = inputs[0].value;
    var price = inputs[1].value;
    var country = selects[0].options[selects[0].selectedIndex].value;
    var material = selects[1].options[selects[1].selectedIndex].value;
    var company = selects[2].options[selects[2].selectedIndex].value;
    var color = selects[3].options[selects[3].selectedIndex].value;
    //if (bounds === "null") {
    //    bounds = "";
    //}
    //var shape = bounds;
    //shape = shape.replace(new RegExp("\\[\\[", "g"), '((');
    //shape = shape.replace(new RegExp("\\,", "g"), ' ');

    //shape = shape.replace(new RegExp("\\]\\ \\[", "g"), ',');
    //var first = shape.split(' ')[0].slice(2);
    //var second = shape.split(' ')[1].slice(0, shape.split(' ')[1].indexOf(','));
    //shape = shape.replace(new RegExp("\\]\\]", "g"), `,${first} ${second}))`);
    console.log(selected);
    //var PRODUCTID = selected["PRODUCTID"];
    $.ajax({
        type: "post",
        url: `http://localhost:3000/CreateProduct`,
        data: { "name": name, price: price, country: country, "material": material, "company": company, "color": color },

        dataType: "json",
        success: function (data) {
            if (data.count === -1) {
                var div = document.createElement('div');
                div.classList.add("clRedError");
                data.data.forEach(function (error) {
                    div.innerHTML += `<p class="mb-5">${error}</p>`;
                })
                e.appendChild(div);
            } else {
                table.reload('test', {
                });
                layer.closeAll();
                layer.msg("产品已创建");
            }
        },
        error: function (item, err) {
            console.log(err);
        }
    });
}



function editProductPost(e) {
    var errors = document.getElementsByClassName("clRedError");
    for (var i = 0; i < errors.length; i++) {
        errors[i].remove();
    }
    var inputs = e.getElementsByTagName('input');
    var selects = e.getElementsByTagName('select');
    var name = inputs[0].value;
    var price = inputs[1].value;
    var country = selects[0].options[selects[0].selectedIndex].value;
    var material = selects[1].options[selects[1].selectedIndex].value;
    var company = selects[2].options[selects[2].selectedIndex].value;
    var color = selects[3].options[selects[3].selectedIndex].value;
    //if (bounds === "null") {
    //    bounds = "";
    //}
    //var shape = bounds;
    //shape = shape.replace(new RegExp("\\[\\[", "g"), '((');
    //shape = shape.replace(new RegExp("\\,", "g"), ' ');

    //shape = shape.replace(new RegExp("\\]\\ \\[", "g"), ',');
    //var first = shape.split(' ')[0].slice(2);
    //var second = shape.split(' ')[1].slice(0, shape.split(' ')[1].indexOf(','));
    //shape = shape.replace(new RegExp("\\]\\]", "g"), `,${first} ${second}))`);
    console.log(selected);
    var PRODUCTID = selected["PRODUCTID"];
    $.ajax({
        type: "post",
        url: `http://localhost:3000/EditProduct?PRODUCTID=${PRODUCTID}`,
        data: { "name": name, "price": price, "country": country, "material": material, "company": company, "color": color },

        dataType: "json",
        success: function (data) {
            if (data.count !== 1) {
                var div = document.createElement('div');
                div.classList.add("clRedError");
                data.forEach(function (error) {
                    div.innerHTML += `<p class="mb-5">${error}</p>`;
                })
                e.appendChild(div);
            } else {
                table.reload('test', {
                });
                layer.closeAll();
                layer.msg("产品已编辑");
            }
        },
        error: function (item, err) {
            console.log(err);
        }
    });
}


function deleteProductPost(e) {
    var PRODUCTID = selected['PRODUCTID'];
    $.ajax({
        type: "post",
        url: `http://localhost:3000/DeleteProduct?PRODUCTID=${PRODUCTID}`,
        dataType: "json",
        success: function (data) {
            if (data.count !== 1) {
                layer.msg('请先删除子元素');
            } else {
                table.reload('test', {
                });
                layer.closeAll();
                layer.msg("产品已删除");
            }
        },
        error: function (item, err) {
            layer.msg('请先删除子元素');
        }
    });
}


$.ajax({
    type: "get",
    url: `http://localhost:3000/countries`,
    dataType: "json",
    success: function (data) {
        var select = `<select lay-search="" id="selectCountry"><option value="">请选择产地</option>`;
        var option, value;
        data.data.forEach(function (c) {
            option = c["COUNTRY"];
            //value = c["COUNTY_ID"];
            select += `<option value="${option}">${option}</option>`;
        });
        select += '</select>';
        document.getElementById('selectCountries').innerHTML = select;
        form.render();
    },
    error: function () {
        console.log('error');
    }
});

$.ajax({
    type: "get",
    url: `http://localhost:3000/materials`,
    dataType: "json",
    success: function (data) {
        var select = `<select lay-search="" id="selectMaterial"><option value="">请选择材质</option>`;
        var option, value;
        data.data.forEach(function (c) {
            option = c["MATERIAL"];
            //value = c["COUNTY_ID"];
            select += `<option value="${option}">${option}</option>`;
        });
        select += '</select>';
        document.getElementById('selectMaterials').innerHTML = select;
        form.render();
    },
    error: function () {
        console.log('error');
    }
});

$.ajax({
    type: "get",
    url: `http://localhost:3000/companies`,
    dataType: "json",
    success: function (data) {
        var select = `<select lay-search="" id="selectCompany"><option value="">请选择公司</option>`;
        var option, value;
        data.data.forEach(function (c) {
            option = c["COMPANY"];
            //value = c["COUNTY_ID"];
            select += `<option value="${option}">${option}</option>`;
        });
        select += '</select>';
        document.getElementById('selectCompanies').innerHTML = select;
        form.render();
    },
    error: function () {
        console.log('error');
    }
});

$.ajax({
    type: "get",
    url: `http://localhost:3000/colors`,
    dataType: "json",
    success: function (data) {
        var select = `<select lay-search="" id="selectColor"><option value="">请选择颜色</option>`;
        var option, value;
        data.data.forEach(function (c) {
            option = c["COLOR"];
            //value = c["COUNTY_ID"];
            select += `<option value="${option}">${option}</option>`;
        });
        select += '</select>';
        document.getElementById('selectColors').innerHTML = select;
        form.render();
    },
    error: function () {
        console.log('error');
    }
});

var buttonSearchProduct = document.getElementById('buttonSearchProduct');
buttonSearchProduct.addEventListener('click', function (e) {
    var pricelow = document.getElementById('pricelow').value;
    var pricehigh = document.getElementById('pricehigh').value;
    var selectCountry = document.getElementById('selectCountry');
    var country = selectCountry.options[selectCountry.selectedIndex].value;
    var selectMaterial = document.getElementById('selectMaterial');
    var material = selectMaterial.options[selectMaterial.selectedIndex].value;
    var selectCompany = document.getElementById('selectCompany');
    var company = selectCompany.options[selectCompany.selectedIndex].value;
    var selectColor = document.getElementById('selectColor');
    var color = selectColor.options[selectColor.selectedIndex].value;
    var name = document.getElementById('inputName').value;
    table.reload('test', {
        url: `http://localhost:3000/filterproducts?pl=${pricelow}&ph=${pricehigh}&country=${country}&material=${material}&company=${company}&color=${color}&name=${name}`
        ,page: {
            curr: 1 //重新从第 1 页开始
        }
    });

});

//setTimeout(function () { form.render(); }, 3000);
