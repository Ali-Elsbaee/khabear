/**
 * Created by Ali on 2/10/2017.
 */

$(document).ready(function () {

    var layer = function (order) {
            this.order = order;
            this.element =
                '<div class="row layer">' +
                '<div class="col-xs-12 col-sm-9 col-md-8 col-lg-6">' +
                '<input type="text" title="" class="input" placeholder="إسم المستوى '+ this.order + '">' +
                '</div>' +
                '</div>';
        },
        grade = function (order) {
            this.order = order;
            this.element =
                '<div class="row grade">'+
                '<div class="col-xs-7 col-sm-8 col-md-8 col-lg-3">'+
                '<input type="text" title="" class="input grade-name" placeholder="إسم الدرجة '+ this.order + '">' +
                '</div>'+
                '<div class="col-xs-5 col-sm-4 col-md-4 col-lg-3 ">'+
                '<input type="text" title="" class="input grade-value" placeholder="قيمة الدرجة '+ this.order + '">' +
                '</div>'+
                '</div>'
        },
        maleOrder = ["0","الأول","الثاني","الثالث","الرابع","الخامس","السادس","السابع","الثامن","التاسع"],
        femaleOrder = ["0","الأولى","الثانية","الثالثة","الرابعة","الخامسة","السادسة","السابعة","الثامنة","التاسعة"],
        layersCount = 2,
        gradesCount = 2,
        data = {};


    //----------------------------------------------------------------------------
    //------------------------------------------ customizing layers number & names
    //----------------------------------------------------------------------------
    $('#layers_number').on('change',function () {
        var newLayersCount = $(this).find('option:selected').val();
        if (newLayersCount > layersCount) {
            while (layersCount < newLayersCount) {
                var newLayer = new layer(maleOrder[layersCount]);
                $('#grade_layer').before(newLayer.element);
                layersCount++;
            }
        } else if (newLayersCount < layersCount) {
            while (layersCount > newLayersCount) {
                $('#layers').find('.layer:last-of-type').prev('.layer').remove();
                layersCount--;
            }
        }
    });


    //----------------------------------------------------------------------------
    //------------------------------------------ customizing Grades number & names
    //----------------------------------------------------------------------------
    $('#grades_number').on('change',function () {
        var newGradesCount = $(this).find('option:selected').val();
        if (newGradesCount > gradesCount) {
            while (gradesCount < newGradesCount) {
                var newGrade = new grade(femaleOrder[gradesCount+1]);
                $('#grades').append(newGrade.element);
                gradesCount++;
            }
        } else if (newGradesCount < gradesCount) {
            while (gradesCount > newGradesCount) {
                $('#grades').find('.grade:last-of-type').remove();
                gradesCount--;
            }
        }
    });




    var contentGrade = function (name,order) {
            this.name = name;
            this.order = order;
            this.element =
                '<div class="content-grade">'+
                '<label>'+ this.name +'</label>'+
                '<textarea title="" class="input" data-layerOrder="'+ this.order +'" rows="2" placeholder="وصف درجة '+ this.name +'"></textarea>'+
                '</div>'
        },
        contentLayer = function (name,order) {
            this.name = name;
            this.order = order;
            this.element =
                '<div class="col-xs-12 content-layer">'+
                '<input type="text" title="" data-layerOrder="'+ this.order +'" class="input" placeholder="إسم ال'+ this.name +'">'+
                '<button class="add-btn"><i class="ion ion-plus-round"></i>إضافة '+ this.name +'</button>'+
                '</div>'
        },
        layersNames = [],
        gradesNames = [],
        contentCounts = [null];



    //----------------------------------------------------------------------------
    //----------------------------------------------- Save layers and grades names
    //----------------------------------------------------------------------------
    function saveBasicInfo() {
        var layersNamesInputs = $('#layers').find('input'),
            layersGradesInputs = $('#grades').find('.grade');
        for (var i = 0; i < layersCount; i++) {
            layersNames.push(layersNamesInputs[i].value);
            contentCounts.push(0);
        }
        for (var j = 0; j < gradesCount; j++) {
            gradesNames.push([$(layersGradesInputs[j]).find('.grade-name')[0].value,$(layersGradesInputs[j]).find('.grade-value')[0].value]);
        }

        data.name = $('#assessmentName').val();
        data.country = $('#assessmentCountry').find('option:selected').text();
        data.specialization = $('#specialization').find('option:selected').text();
        data.layersCount = layersCount;
        data.layersNames = layersNames;
        data.gradesCount = gradesCount;
        data.gradesNames = gradesNames;

        //////////////////////////////////////////////////////////////////////////// Start Ajax POST function here
        return true;
    }



    //----------------------------------------------------------------------------
    //------------------------------------------------------ Build Assessment Form
    //----------------------------------------------------------------------------
    function buildAssessment(LayerOrder,parent) {
        var loopEnd = LayerOrder || 1,
            instance = BuildGradesContent();
        for (var i = (layersCount - 1); i >= loopEnd; i--) {
            var newLayerObj = new contentLayer(layersNames[i-1],i),
                newLayer = $($.parseHTML(newLayerObj.element));
            newLayer.append(instance);
            instance = newLayer;
        }
        parent.append(instance);
    }

    function BuildGradesContent() {
        var GradesWrapper = $('<div class="col-xs-12 content-grades"></div>');
        for (var i = 0; i < gradesCount; i++) {
            var newGradeObj = new contentGrade(gradesNames[i][0],layersCount);
            GradesWrapper.append(newGradeObj.element);
        }
        return GradesWrapper;
    }


    $('#save_basic_info').on('click',function () {
        if (saveBasicInfo()) {
            buildAssessment(null,$('#content_layers'));
            $('#basic_assessment_info').slideUp();
            $('#assessment_content').slideDown();
        }
    });


    $(document).on('click','.add-btn',function () {
        buildAssessment($(this).prev('.input').attr('data-layerOrder'),$(this).parent('.content-layer').parent('.content-layer'));
    });







    //----------------------------------------------------------------------------
    //---------------------------------------------------- Save Assessment content
    //----------------------------------------------------------------------------
    var assessment = {};
    $('#save_assessment_content').on('click',function () {
        var layerOrder,
            value,
            inputs = $('#content_layers').find('.input');
        for (var i = 0; i < inputs.length; i++) {
            layerOrder = parseInt($(inputs[i]).attr('data-layerOrder'));
            value = inputs[i].value;
            setObjVal(layerOrder,value);
        }

        data.content = assessment;
        //////////////////////////////////////////////////////////////////////////// Start Ajax POST function here
    });


    function setObjVal(layerOrder,value) {
        var obj = assessment;
        for (var i = 1; i < layerOrder; i++) {
            if (!obj[contentCounts[i]]) obj[contentCounts[i]] = {};
            obj = obj[contentCounts[i]];
        }
        contentCounts[layerOrder]++;
        for (var j = (layerOrder+1); j <= layersCount; j++) {
            contentCounts[j] = 0;
        }
        obj[contentCounts[layerOrder]] = { 0: value };
    }
});
