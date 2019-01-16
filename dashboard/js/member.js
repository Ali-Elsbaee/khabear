/**
 * Created by Ali on 12/2/2016.
 */

function change_lang(lang) {
    if (lang == 'en'){
        $('html').attr('lang','en');
        $('title').text('Khabear | Quality Team Member');
        $('body').removeClass('rtl');
        $('h1:not(nav h1)').text('Quality Member');
        $('#members_details tr:nth-of-type(1) th').text('Name');
        $('#members_details tr:nth-of-type(2) th').text('Username');
        $('#members_details tr:nth-of-type(3) th').text('E-mail');
        $('#members_details tr:nth-of-type(4) th').text('Password');
        $('#members_details tr:nth-of-type(5) th').text('Phone number');
        $('#members_details tr:nth-of-type(6) th').text('Country');
        $('#members_details tr:nth-of-type(7) th').text('Status');
        $('#permissions_title h2').text('Permissions');
        $('#permissions_table th:nth-of-type(1)').text('Country');
        $('#permissions_table th:nth-of-type(2)').text('Assessment');
        $('#permissions_table th:nth-of-type(3)').text('Field');
        $('#permissions_table th:nth-of-type(4)').text('Delete');
    } else {
        $('html').attr('lang','ar');
        $('title').text('خبير | عضو فريق الجودة');
        $('body').addClass('rtl');
        $('h1').text('عضو فريق الجودة');
        $('#members_details tr:nth-of-type(1) th').text('الإسم');
        $('#members_details tr:nth-of-type(2) th').text('إسم المستخدم');
        $('#members_details tr:nth-of-type(3) th').text('كلمة المرور');
        $('#members_details tr:nth-of-type(4) th').text('البريد الإلكتروني');
        $('#members_details tr:nth-of-type(5) th').text('الحالة');
        $('#members_details tr:nth-of-type(6) th').text('التقارير');
        $('#permissions_title h2').text('الصلاحيات');
        $('#permissions_table th:nth-of-type(1)').text('الدولة');
        $('#permissions_table th:nth-of-type(2)').text('التقييم');
        $('#permissions_table th:nth-of-type(3)').text('المجال');
        $('#permissions_table th:nth-of-type(4)').text('حذف');
    }
}

$(document).ready(function () {
    change_lang('en');
})


// ////////////////////////Added By Mustafa////////////////////////
// function edit($row) {
//
//         var tr = $row.closest('td#edit ');
//
//
//        $('table').find(tr).replaceWith('<td id="save">  <input class="col-lg-12" onclick="save(this)" style="color:#515151;border: white;background-color: whitesmoke;" type="submit" value="Save">  </td> ');
//     var input= $row.closest('#input');
//     console.log(input);
//     $('table').find(input).text('s');
// }
// function save($row) {
//
//     var tr = $row.closest('td#save ');
//
//     $('table').find(tr).replaceWith('    <td id="edit">  <input class="col-lg-12" onclick="edit(this)" style="color:#515151;border: white;background-color: whitesmoke;" type="submit" value="edit">  </td> ');
//
// }