/**
 * Created by Ali on 12/2/2016.
 */
var country_name, assessment_name, language ;
var obj;
function loadDoc() {
    $.ajax({
        type: 'GET',
        url: 'http://dev.khabear.com/khabear_system/public/GetAssessments',

        dataType: 'text',
        success: function (data) {
            var json = JSON.stringify(eval("(" + data + ")"));
            obj = jQuery.parseJSON(json);
            for(var i=0; i<obj.length; i++)
            {
                $('#country')
                    .append($('<option value="'+obj[i]['id']+'"></option>')
                        .text(obj[i]['name']));
            }
        }
    });
}

function change_lang(lang) {
    language = lang;
    if (lang == 'en') {
        $('html').attr('lang','en');
        // $('title').text('Khabear | Choose Assessments');
        $('body').removeClass('rtl');
        $('h1:not(nav h1)').text("Add Assessments");
        country_name = 'Country';
        assessment_name = 'Assessment';
        $('#duration_title').text('Assessment Duration');
        $('#start_date_label').text('Starts on: ');
        $('#end_date_label').text('Ends on: ');
        $('#add_assessment_btn').text('Add Assessment');
        $('#added_assessments h2').text('Added Assessments');
        $('#added_assessments th:nth-of-type(3)').text('Starting Date');
        $('#added_assessments th:nth-of-type(4)').text('Ending Date');
        $('#added_assessments th:nth-of-type(5)').text('delete');
    } else {
        $('html').attr('lang','ar');
        // $('title').text('خبير | تحديد تقييمات المؤسسة');
        $('body').addClass('rtl');
        $('h1').text("تحديد تقييمات المؤسسة");
        country_name = 'الدولة';
        assessment_name = 'التقييم';
        $('#duration_title').text('تحديد فترة التقييم');
        $('#start_date_label').text('يبدأ في: ');
        $('#end_date_label').text('وينتهي في: ');
        $('#add_assessment_btn').text('إضافة التقييم');
        $('#added_assessments h2').text('التقييمات المُضافة');
        $('#added_assessments th:nth-of-type(3)').text('تاريخ البداية');
        $('#added_assessments th:nth-of-type(4)').text('تاريخ النهاية');
        $('#added_assessments th:nth-of-type(5)').text('حذف');
    }
}

var start_date, end_date;
$(document).ready(function () {

    loadDoc();
    change_lang('en');
    $('#added_assessments th:nth-of-type(1)').text(country_name);
    $('#added_assessments th:nth-of-type(2)').text(assessment_name);
    $('#country').empty();
    $('#country').append($('<option selected disabled></option>')
        .text(country_name));
    $('#assessment').append($('<option selected disabled></option>')
        .text(assessment_name));

    //
    // $(".form_datetime").datetimepicker({
    //     format: "dd MM yyyy",
    //     language: language,
    //     todayBtn: true,
    //     todayHighlight: true,
    //     weekStart: 6,
    //     minView: 'month',
    //     autoclose: true
    // }).on('changeDate', function(e){
    //     ($(this).find('input').attr('id') == 'start_date') ? start_date = e.date.valueOf() : end_date = e.date.valueOf();
    // });
})

function set_assessments(country) {
    var e=country-1;
    $('#assessment').empty();
    $('#assessment').append($('<option disabled selected></option>')
        .text(assessment_name));
    for(var i=0; i<obj[e]['assessments'].length; i++)
    {
        $('#assessment').append($('<option value="'+obj[e]['assessments'][i]['id']+'"></option>')
            .text(obj[e]['assessments'][i]['name']));
    }
}

var added_assessments_counter = 0;
function add_assessment() {
    if (my_validation()) {
        var selector = document.getElementById('assessment');
        var value = selector[selector.selectedIndex].value;
        var s=($('#start_date').val())?($('#start_date').val()):('No date');
        var e=($('#end_date').val())?($('#end_date').val()):('No date');
        $('#added_assessments').show();

        var url = "http://dev.khabear.com/khabear_system/public/SetAssessments";
        $.ajax({
            url: url,
            type: 'POST',
            headers: {
                'X-CSRF-Token': $('meta[name=_token]').attr('content')
            },
            data: {a_id:value,
                Start_d:s,
                End_d:e},
            success: function(data){
                if (added_assessments_counter == 0) $('#added_assessments').show();
                $('#added_assessments #desktop_table').append($('<tr></tr>'));
                added_assessments_counter += 1;
                // $('#added_assessments #desktop_table tbody tr:last-of-type').append($('<td></td>').text(added_assessments_counter));
                $('#added_assessments #desktop_table tbody tr:last-of-type').append($('<td></td>').text($('#country option:selected').text()));
                $('#added_assessments #desktop_table tbody tr:last-of-type').append($('<td></td>').text($('#assessment option:selected').text()));
                $('#added_assessments #desktop_table tbody tr:last-of-type').append($('<td></td>').text(($('#start_date').val())?($('#start_date').val()):('No date')));
                $('#added_assessments #desktop_table tbody tr:last-of-type').append($('<td></td>').text(($('#end_date').val())?($('#end_date').val()):('No date')));
                $('#added_assessments #desktop_table tbody tr:last-of-type').append($('<td><a href="#" onclick=""><i class="ion ion-trash-b"></i></a></td>'));
                $('#added_assessments #desktop_table tbody tr:last-of-type').show();
            }
        });
    }
}

function my_validation() {
    if ($('#country option:selected').val() == 'Country') {
        alert('Please select a Country.');
        return false;
    } else if ($('#assessment option:selected').val() == 'Assessment') {
        alert('Please select an Assessment.');
        return false;
    } else if (!start_date) {
        alert('please set assessment start date');
        return false;
    } else if (!end_date) {
        alert('please set assessment end date');
        return false;
    } else if (end_date < start_date) {
        alert('End date must be after start date')
    } else {
        return true;
    }
}


