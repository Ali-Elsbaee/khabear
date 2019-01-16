/**
 * Created by Shadow on 12/11/2016.
 */



$(document).ready(function () {

    $('#AssTab').dataTable({
        "ordering": false,
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
    });

    $('#AssTab_filter input').attr("placeholder","Search here...");

})