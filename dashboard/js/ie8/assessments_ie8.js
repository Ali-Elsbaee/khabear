/**
 * Created by Shadow on 12/11/2016.
 */
function remv($id,$cid,row) {

    if (r == true) {
        var url = "http://dev.khabear.com/khabear_system/public/RemAs";

        $.ajax({
            url: url,
            type: 'POST',
            headers: {
                'X-CSRF-Token': $('meta[name=_token]').attr('content')
            },
            data: {id:$id,Aid:$cid},
            success: function(data) {
                if(data=="Done")
                {
                    var tr = row.closest('tr')
                    $("#AssTab").find(tr).fadeOut('fast');
                }
                else
                {
                    alert('Something went wrong')
                }
            }
            });
    } else {
    }
}


$(document).ready(function () {


})