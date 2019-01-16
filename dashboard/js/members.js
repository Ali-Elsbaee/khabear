/**
 * Created by Ali on 12/1/2016.
 */

var lang_obj = {};
function change_lang(lang) {
    if (lang == 'en') {
        $('html').attr('lang', 'en');
        $('title').text('Khabear | Quality Members');
        $('body').removeClass('rtl');
        $('h1:not(nav h1)').text('Quality Team Members');
        $('thead th:nth-of-type(1)').text('ID');
        $('thead th:nth-of-type(2)').text('Name');
        $('thead th:nth-of-type(3)').text('Username');
        $('thead th:nth-of-type(4)').text('E-mail');
        $('thead th:nth-of-type(5)').text('Statue');
        $('thead th:nth-of-type(6)').text('Permissions');
        $('thead th:nth-of-type(7)').text('Reports');
        $('thead th:nth-of-type(8)').text('Actions');
        $('#permissions-icon').attr('title','Member Permissions');
        $('#reports-icon').attr('title','Member Reports');
        $('#edit-icon').attr('title','Edit Member');
        $('#msg-icon').attr('title','Send Message');
        $('#delete-icon').attr('title','Remove Member');
        lang_obj = {
            "decimal":        "",
            "emptyTable":     "No data available in table",
            "info":           "_START_ - _END_ of _TOTAL_",
            "infoEmpty":      "",
            "infoFiltered":   '<br>' + "",
            "infoPostFix":    "",
            "thousands":      ",",
            "lengthMenu":     "_MENU_",
            "loadingRecords": "Loading...",
            "processing":     "Processing...",
            "search":         "",
            "zeroRecords":    "No matching records found",
            "paginate": {
                "first":      "",
                "last":       "",
                "next": '<i class="ion ion-arrow-right-b"></i>',
                "previous": '<i class="ion ion-arrow-left-b"></i>'
            }
        };
    } else {
        $('html').attr('lang', 'ar');
        $('title').text('خبير | أعضاء فريق الجودة');
        $('body').addClass('rtl');
        $('h1').text('أعضاء فريق الجودة');
        $('thead th:nth-of-type(1)').text('الإسم');
        $('thead th:nth-of-type(2)').text('إسم المستخدم');
        $('thead th:nth-of-type(3)').text('البريد الإلكتروني');
        $('thead th:nth-of-type(4)').text('الحالة');
        $('thead th:nth-of-type(5)').text('الصلاحيات');
        $('thead th:nth-of-type(6)').text('التقارير');
        $('thead th:nth-of-type(7)').text('روابط سريعة');
        $('#permissions-icon').attr('title','صلاحيات العضو');
        $('#reports-icon').attr('title','تقارير العضو');
        $('#edit-icon').attr('title','تعديل بيانات العضو');
        $('#msg-icon').attr('title','مراسلة العضو');
        $('#delete-icon').attr('title','حذف العضو');
        lang_obj = {
            "decimal":        "",
            "emptyTable":     "لا يوجد أعضاء",
            "info":           "معروض _START_ إلى _END_ من إجمالي _TOTAL_ عضو",
            "infoEmpty":      "",
            "infoFiltered":   "(filtered from _MAX_ total entries)",
            "infoPostFix":    "",
            "thousands":      ",",
            "lengthMenu":     "عرض _MENU_",
            "loadingRecords": "جاري التحميل...",
            "processing":     "برجاء الانتظار",
            "search":         "بحث: ",
            "zeroRecords":    "لا يوجد بيانات مطابقة",
            "paginate": {
                "first":      "الأولى",
                "last":       "الأخيرة",
                "next":       "التالي",
                "previous":   "السابقة"
            }
        };
    }
}

$(document).ready(function () {

    change_lang('en')

    $('#membersTable').dataTable({
        "ordering": false,
        "language" : lang_obj
    });

    $('#membersTable_filter input').attr("placeholder","Search here...");

})

