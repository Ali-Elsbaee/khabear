

function subm($id) {


        var x = document.forms.namedItem($id);
        var comment=x.elements.namedItem('comment').value;
        var  indicator_id=x.elements.namedItem('indicator_id').value;
        var assessment_id=x.elements.namedItem('assessment_id').value;
var practice=x.elements.namedItem('practice').value;

    var url = "http://127.0.0.1/khabear_system/public/ar";
  //  alert(url);
    $.ajax({
        url: url,
        type: 'post',
        headers: {
            'X-CSRF-Token': $('meta[name=_token]').attr('content')
        },
        data: {
            orgassessment_id:assessment_id,
            indicator:indicator_id,
            practice_id: practice,
        comments:comment
        },
        success: function(data){
console.log(data);
alert("Thank you");
        },
        error:function (da) {
            alert(da);
            console.log(da);
        }
    });
  //  alert("sdsd");
}