/**
 * Created by Ali on 2/10/2017.
 */

$(document).ready(function () {
    $('#countries_Table').dataTable({
        "ordering": false,
        "autoWidth": false,
        language: {
            "decimal": "",
            "emptyTable": "No data available in table",
            "info": "_START_ - _END_ of _TOTAL_",
            "infoEmpty": "",
            "infoFiltered": '<br>' + "",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "_MENU_",
            "loadingRecords": "Loading...",
            "processing": "Processing...",
            "search": "",
            "zeroRecords": "No matching records found",
            "paginate": {
                "first": "",
                "last": "",
                "next": '<i class="ion ion-arrow-right-b"></i>',
                "previous": '<i class="ion ion-arrow-left-b"></i>'
            }
        }
    })

    $('#countries_Table_filter input').attr("placeholder","Search here...");

    $('textarea').each(function () {
        this.addEventListener('keydown', autosize)
    });

    function autosize(){
        var el = this;
        setTimeout(function(){
            el.style.cssText = 'height:auto; padding:7px 0 5px';
            // for box-sizing other than "content-box" use:
            // el.style.cssText = '-moz-box-sizing:content-box';
            el.style.cssText = 'height:' + el.scrollHeight + 'px';
        },0);
    }


    ////////////////////////////////////////////////////////////////////// Add degree
    $(document).on('click','.add-degree',function (e) {
        var newDegree = $(
            '<div class="row degree parent">' +
            '<div class="col-xs-12 col-md-6 english">' +
            '<span></span>' +
            '<input class="degree-name google-input" type="text" placeholder="Add degree"> ' +
            '<textarea class="google-input" placeholder="Degree description" rows="1"></textarea>' +
            '<input class="degree-weight google-input" type="text" VALUE="0">' +
            '</div> <div class="col-xs-12 col-md-6 arabic">' +
            '<span></span> ' +
            '<input class="degree-name google-input" type="text" placeholder="إضافة درجة"> ' +
            '<textarea class="google-input" placeholder="وصف الدرجة" rows="1"></textarea> ' +
            '<input class="degree-weight google-input" type="text" VALUE="0"> ' +
            '</div> ' +
            '<ul class="actions">' +
            '<li class="edit"><a href="#"><i class="ion ion-android-done"></i></a></li> ' +
            '<li class="delete"><a href="#"><i class="ion ion-android-close"></i></a></li> ' +
            '</ul> ' +
            '</div>'
        )
        $(this).closest('.add-degree-row').before(newDegree);
        $('textarea').each(function () {
            this.addEventListener('keydown', autosize)
        });
        e.preventDefault();
    })




    ////////////////////////////////////////////////////////////////////// Save & Edit Degree
    $(document).on('click','.edit',function (e) {
        var inputs =  $(this.closest('.degree')).find('.google-input');
        if ($(this).find('i').hasClass('ion-android-done')){
            $(this).find('i').removeClass('ion-android-done').addClass('ion-edit');
            inputs.prop('disabled',true).addClass('inactive');
            $(this.closest('.degree')).addClass('inactive');
        } else {
            $(this).find('i').removeClass('ion-edit').addClass('ion-android-done');
            inputs.prop('disabled',false);
            $(this.closest('.degree')).removeClass('inactive');
        }

        e.preventDefault();
    })



    ////////////////////////////////////////////////////////////////////// Delete Degree
    $(document).on('click','.delete',function (e) {
        $(this.closest('.parent')).remove();
        e.preventDefault();
    })





    ////////////////////////////////////////////////////////////////////// Add Practice
    $(document).on('click','.add-practice',function (e) {
        var newPractice = $(
            '<div class="row practice parent">' +
            '<div class="row">' +
            '<div class="col-xs-12 col-md-6">' +
            '<input class="google-input" type="text" placeholder="Add practice">' +
            '</div>' +
            '<div class="col-xs-12 col-md-6">' +
            '<input class="google-input right-input" type="text" placeholder="إضافة ممارسة"> ' +
            '</div> ' +
            '<ul class="actions">' +
            '<li class="delete"><a href="#"><i class="ion ion-android-close"></i></a></li> ' +
            '</ul> ' +
            '</div> ' +
            '<div class="col-xs-12 add-degree-row"> ' +
            '<a href="#" class="add-degree">New degree</a>' +
            '<a href="#" class="add-degree arabic">درجة جديدة</a>' +
            '</div> ' +
            '</div>'
        )

        $(this).closest('.add-practice-row').before(newPractice);

        $('textarea').each(function () {
            this.addEventListener('keydown', autosize)
        });

        e.preventDefault();
    })



    ////////////////////////////////////////////////////////////////////// Add Indicator
    $(document).on('click','.new-indicator',function (e) {
        var newIndicator = $(
            '<div class="row indicator parent"> ' +
            '<div class="row"> ' +
            '<div class="col-xs-12 col-md-6"> ' +
            '<input class="google-input" type="text" placeholder="Add indicator"> ' +
            '</div> ' +
            '<div class="col-xs-12 col-md-6"> ' +
            '<input class="google-input right-input" type="text" placeholder="إضافة مؤشر"> ' +
            '</div> ' +
            '<ul class="actions">' +
            '<li class="delete"><a href="#"><i class="ion ion-android-close"></i></a></li> ' +
            '</ul> ' +
            '</div> ' +
            '<div class="col-xs-12 add-practice-row"> ' +
            '<a href="#" class="add-practice">New Practice</a> ' +
            '<a href="#" class="add-practice arabic">ممارسة جديدة</a> ' +
            '</div> ' +
            '</div>'
        )

        $(this).closest('.new-indicator-row').before(newIndicator);

        $('textarea').each(function () {
            this.addEventListener('keydown', autosize)
        });

        e.preventDefault();

    })



    ////////////////////////////////////////////////////////////////////// Add criteria
    $(document).on('click','.new-criteria',function (e) {
        var newCriteria = $(
            '<div class="row criteria active parent"> ' +
            '<div class="row"> ' +
            '<div class="col-xs-12 col-md-6"> ' +
            '<input class="google-input" type="text" placeholder="Criteria name"> ' +
            '</div> ' +
            '<div class="col-xs-12 col-md-6"> ' +
            '<input class="google-input right-input" type="text" placeholder="إسم المعيار"> ' +
            '</div> ' +
            '<ul class="actions">' +
            '<li class="delete"><a href="#"><i class="ion ion-android-close"></i></a></li> ' +
            '</ul> ' +
            '</div> ' +
            '<div class="row text-center new-indicator-row"> ' +
            '<a href="#" class="new-indicator">New Indicator</a> ' +
            '</div> ' +
            '</div> '
        )

        $(this).closest('.new-criteria-row').before(newCriteria);

        $('textarea').each(function () {
            this.addEventListener('keydown', autosize)
        });

        e.preventDefault();
    })

    // $(document).on('click','.save-criteria',function (e) {
    //     $(this).closest('.criteria').removeClass('active')
    //     e.preventDefault();
    // })

    $('#add_country').on('click',function () {
        $('#add_country_link').fadeOut('fast',function () {
            $('.new-country-input').fadeIn('fast')
            $('#add_country_done').fadeIn('fast')
        })
    })

    $('#add_country_done').on('click',function () {
        var country_id = $('#countries_Table tbody tr').length + 1;
        var newArabicCountry = $("#arabic_new_country").val()
        var newEnglishCountry = $("#english_new_country").val()
        var newRow = $('<tr> <td class="text-center" scope="row">' + country_id + '</td> <td>'+ newEnglishCountry +'<span class="arabic-country-name">'+ newArabicCountry +'</span></td> <td class="text-center"> <ul> <a href="#" data-target="quality-member/146"><i class="glyphicon glyphicon-trash my-tooltip"title="delete"></i></a></li> </ul> </td> </tr>')

        $('#countries_Table tbody').append(newRow)
    })

})