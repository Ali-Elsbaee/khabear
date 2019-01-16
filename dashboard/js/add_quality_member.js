/**
 * Created by Ali on 12/2/2016.
 */

var country_name, assessment_name, field_name, standards_name;
var permissions=[];
var e;
function change_lang(lang) {
    if (lang == 'en') {
        $('html').attr('lang','en');
        $('title').text('Khabear | Add quality member');
        $('body').removeClass('rtl');
        $('h1:not(nav h1)').text('Add Quality Member');
        $('#username').attr('placeholder','Username');
        $('#email').attr('placeholder','E-mail');
        $('#password').attr('placeholder','Password');
        $('#confirm_password').attr('placeholder','Confirm Password');
        $('#select_permissions_open_btn').text("Select Member's Permissions");
        country_name = 'Assessment';
        assessment_name = 'Fields';
        field_name = 'Field';
        standards_name = 'Standards';
        $('#add_permit_btn button').text('Add permission');
        $('#permissions_table_title').text('Permissions');

        $('#permissions_table thead th:nth-of-type(1)').text(assessment_name);
        $('#permissions_table thead th:nth-of-type(2)').text(field_name);
        $('#permissions_table thead th:nth-of-type(3)').text("Delete");
        $('#add_member_btn').text('Add member');
        $('#recently-added-members h2').text('Recently Added Members');
        $('#recently-added-members th:nth-of-type(1)').text('Username');
        $('#recently-added-members th:nth-of-type(2)').text('E-mail');
        $('#recently-added-members th:nth-of-type(3)').text('Permissions');
        $('#recently-added-members th:nth-of-type(4)').text('Edit');
        $('#recently-added-members th:nth-of-type(5)').text('Delete');
    } else {
        $('html').attr('lang','ar');
        $('title').text('خبير | إضافة عضو جودة');
        $('body').addClass('rtl');
        $('h1').text('إضافة عضو فريق جودة');
        $('#username').attr('placeholder','إسم المستخدم');
        $('#email').attr('placeholder','البريد الإلكتروني');
        $('#password').attr('placeholder','كلمة المرور');
        $('#confirm_password').attr('placeholder','تأكيد كلمة المرور');
        $('#select_permissions_open_btn').text('تحديد الصلاحيات');
        country_name = 'الدولة';
        assessment_name = 'التقييم';
        field_name = 'المجالات';
        standards_name = 'المعايير';
        $('#add_permit_btn button').text('إضافة الصلاحية');
        $('#permissions_table_title').text('الصلاحيات');
        $('#permissions_table thead th:first-of-type').text(country_name);
        $('#permissions_table thead th:nth-of-type(2)').text(assessment_name);
        $('#permissions_table thead th:nth-of-type(3)').text(field_name);
        $('#permissions_table thead th:nth-of-type(4)').text(standards_name);
        $('#permissions_table thead th:nth-of-type(5)').text("حذف");
        $('#add_member_btn').text('إضافة العضو');
        $('#recently-added-members h2').text('الأعضاء المُضافون');
        $('#recently-added-members th:nth-of-type(1)').text('إسم المستخدم');
        $('#recently-added-members th:nth-of-type(2)').text('البريد الإلكتروني');
        $('#recently-added-members th:nth-of-type(3)').text('الصلاحيات');
        $('#recently-added-members th:nth-of-type(4)').text('تعديل');
        $('#recently-added-members th:nth-of-type(5)').text('حذف');
    }
}

var obj = {};

// var obj = [{
//     "id":1,
//     "name":"Dubai",
//     "ordernumber":1,
//     "created_at":null,
//     "updated_at":null,
//     "assessments":[{
//         "id":1,
//         "name":"\u062a\u0642\u064a\u064a\u0645 \u062f\u0628\u064a \u0627\u0644\u0639\u0627\u0644\u0645\u064a",
//         "country_id":1,
//         "langauge":1,
//         "orderNumber":1,
//         "created_at":null,
//         "updated_at":null,
//         "domains":[{
//             "id":1,
//             "name":"\u0627\u0644\u062a\u0639\u0644\u064a\u0645 \u0648 \u0627\u0644\u062a\u0639\u0644\u0645",
//             "assessment_id":1,
//             "order_num":1,
//             "created_at":null,
//             "updated_at":null
//         }]
//     },
//         {
//             "id":2,
//             "name":"Dubai Second Assessments",
//             "country_id":1,
//             "langauge":1,
//             "orderNumber":2,
//             "created_at":null,
//             "updated_at":null,
//             "domains":[]
//         }]
// }]

function loadDoc() {

    $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1/kh/1/public/en/PMWTS',
        data: { '_token': $('meta[name=_token]').attr('content')
        },
        dataType: 'text',
        success: function (data) {
            var json = JSON.stringify(eval("(" + data + ")"));
            obj = jQuery.parseJSON(json);
//console.log(obj);
        }
    });
}
//     $.ajax({
//         type: 'GET',
//         url: 'http://dev.khabear.com/khabear_system/public/GetAssessments/org',
//
//         dataType: 'text',
//         success: function (data) {
//             var json = JSON.stringify(eval("(" + data + ")"));
//             obj = jQuery.parseJSON(json);
//         }
//     });
// }
$(document).ready(function () {
    change_lang('en');
    loadDoc();
});

function show_permissions() {
    $('#additional_member_data').collapse('show');
    $('#country').fadeIn('fast');
}

var country_id, assessment_id, field_id, standard_id;

function add_country() {
    $('#country select').empty();
    $('#country select').append($('<option selected disabled></option>')
        .text(country_name))
    for (var i in obj) {
        $('#country select')
            .append($('<option  data-country="'+i+'" value="'+obj[i]['country']['id']+'"></option>')
                .text(obj[i]['country']['name']));
    }
}

function show_assessment(select) {
   var obj_id = select[select.selectedIndex].getAttribute("data-country");
  // alert(country_id);
  //  console.log(obj[country_id]['assessments']);
    $('#assessment select').empty();
    $('#assessment select').append($("<option selected disabled>" + assessment_name + "</option>"));
    $('#fields select').empty();
    $('#fields select').append($("<option selected disabled>" + field_name + "</option>"));
    $('#standards select').empty();
    $('#standards select').append($("<option selected disabled>" + standards_name + "</option>"));
    for (var i in obj) {
        $('#assessment select')
            .append($('<option data-assessment="'+i+'" value="'+obj[i]['id']+'"></option>')
                .text(obj[i]['name']));
    }
}

function show_fields(select) {

    var obj_id = select[select.selectedIndex].getAttribute("data-assessment");
    assessment_id = select[select.selectedIndex].value;
//    console.log(assessment_id);
    $('#fields select').empty();
    $('#fields select').append($("<option selected disabled>" + field_name + "</option>"));
    $('#standards select').empty();
    $('#standards select').append($("<option selected disabled>" + standards_name + "</option>"));
    for (var i in obj[obj_id]['criterias']) {
        $('#fields select')
            .append($('<option data-criteria="'+i+'" data-assessment="'+obj_id+'" value="'+obj[obj_id]['criterias'][i]['id']+'"></option>')
                .text(obj[obj_id]['criterias'][i]['name']));
    }
}

function show_standards(select) {
    var obj_criteria_id = select[select.selectedIndex].getAttribute("data-criteria");
    var obj_id=select[select.selectedIndex].getAttribute("data-assessment");
   // console.log(obj[obj_id]['criterias'][obj_criteria_id]['indicators']);
    field_id = select[select.selectedIndex].value;
    $('#standards select').empty();
    $('#standards select').append($("<option selected disabled>" + standards_name + "</option>"));
    for (var i in obj[obj_id]['criterias'][obj_criteria_id]['indicators']) {
        $('#standards select')
            .append($('<option value="'+obj[obj_id]['criterias'][obj_criteria_id]['indicators'][i]['id']+'"></option>')
                .text(obj[obj_id]['criterias'][obj_criteria_id]['indicators'][i]['name']));
    }
}

function add_permit() {
    var selector = document.getElementById('assessmentt');
    var data = selector[selector.selectedIndex].getAttribute("data-assessment");
    var selector2 = document.getElementById('countryy');
    var data2 = selector2[selector2.selectedIndex].getAttribute("data-country");
    permissions.push({assessment_id: obj[data2]['pivot']['id'], domain_id: obj[data2]['criterias'][data]['id']});

    $('#permissions_table').fadeIn('fast');
    $('#permissions_table tbody').append($('<tr class="hidden-row"></tr>'));
    $('#permissions_table tbody tr:last-of-type').append($('<td scope="row"></td>').text(obj[data2]['name']));
    $('#permissions_table tbody tr:last-of-type').append($('<td></td>').text(obj[data2]['criterias'][data]['name']));
    $('#permissions_table tbody tr:last-of-type').append($('<td></td>').text(obj[data2]['criterias'][data]['name']));
    // $('#permissions_table tbody tr:last-of-type').append($('<td></td>').text(obj[country_id - 1]['assessments'][assessment_id - 1]['domains'][field_id - 1]['criteria'][standard_id - 1]['name']));
    $('#permissions_table tbody tr:last-of-type').append($('<td><a href="#"><i class="glyphicon glyphicon-trash"></i></a></td>'));
    $('#permissions_table tbody > tr:last-of-type').fadeIn('fast', function () {
        $('#permissions_table tbody > tr:last-of-type').removeClass('hidden-row');
        $('#assessmentt option[data-domain="'+ data +'"').remove();
    });
    data = '';
    dataa = '';
}

function add_member() {
    if(my_validation()) {
        $.ajax({
            url: "",
            type: 'POST',
            headers: {
                'X-CSRF-Token': $('meta[name=_token]').attr('content')
            },
            data: {
                username: $('#username').val(),
                email: $('#email').val(),
                password: $('#password').val(),
                status:'QualityMember',
                permissions:permissions
            },
            success: function (data) {
                permissions=[];
                $('#recently-added-members').fadeIn('fast');
                $('#recently-added-members tbody').append($('<tr></tr>'));
                $('#recently-added-members tbody tr:last-of-type').append($('<td></td>').text($('#username').val()));
                $('#recently-added-members tbody tr:last-of-type').append($('<td></td>').text($('#email').val()));
                $('#recently-added-members tbody tr:last-of-type').append($('<td><a href="#"><i class="ion ion-key"></i></a></td>'));
                $('#recently-added-members tbody tr:last-of-type').append($('<td><a href="#"><i class="ion ion-ios-settings-strong"></i></a></td>'));
                $('#recently-added-members tbody tr:last-of-type').append($('<td class="text-center"><a href="#"><i class="glyphicon glyphicon-trash"></i></a></td>'));
                $('#recently-added-members tbody tr:last-of-type').fadeIn('fast', function () {
                    $('#recently-added-members tbody tr:last-of-type').removeClass('hidden-row');
                    setTimeout(function () {
                        $('#additional_member_data').collapse('hide');
                    }, 500)
                });
            },
            error:function (s){
            }
        });
    }
}

function my_validation() {
    if (!($('#username').val())) {
        alert('Please enter username.');
        return false;
    } else if (!($('#email').val())) {
        alert('Please enter E-mail.');
        return false;
    } else if (!($('#password').val())) {
        alert('Please enter Password.');
        return false;
    } else if (!($('#confirm_password').val())) {
        alert('Please enter Password Confirmation.');
        return false;
    } else if (($('#password').val()) !== ($('#confirm_password').val())) {
        alert('Passwords do not match.');
        return false;
    } else if ($('#countryy option:selected').val() == 'Assessment') {
        alert('Please enter Password Confirmation.');
        return false;
    } else if ($('#assessmentt option:selected').val() == 'Fields') {
        alert('Please enter Password Confirmation.');
        return false;
    } else {
        return true;
    }
}

$('#additional_member_data').on('hidden.bs.collapse', function () {
    $('#assessment select').empty();
    $('#assessment select').append($("<option selected disabled>" + assessment_name + "</option>"));
    $('#assessment').fadeOut();
    $('#fields select').empty();
    $('#fields select').append($("<option selected disabled>" + field_name + "</option>"));
    $('#fields').fadeOut();
    $('#standards select').empty();
    $('#standards select').append($("<option selected disabled>" + standards_name + "</option>"));
    $('#standards').fadeOut();
    $('#username').val('');
    $('#email').val('');
    $('#password').val('');
    $('#confirm_password').val('');
    $('#permissions_table').fadeOut()
    $('#permissions_table tbody').empty();
    $('#add_permit_btn').fadeOut();
});