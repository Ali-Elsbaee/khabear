/**
 * Created by Ali on 1/2/2017.
 */
// $('#finish').click(function(){
//     $('<input type="checkbox" name="terms" value="IUT" id="IUT" required> I understand that !!<br>').insertBefore($('#finish'));
// });
$(document).ready(function () {
    $('.tree').treegrid({
        expanderExpandedClass: 'ion ion-minus',
        expanderCollapsedClass: 'ion ion-plus'
    });

    $(function () {
        $('#finish').popover({
            content: $("#popover-content").html(),
            html: true,
            placement: 'top',
            trigger: 'manual'
        })
    });

    $('body').on('click','.close-popover', function () {
        $(this).parents('.popover').popover('hide');
    });

    $('#finish').on('click',function () {
        $('#finish').popover('show');
    });

    $('.toggle-panel').on('click',function () {
        toggleExercise($(this));
    });

    $('.practice-name').on('click',function () {
        $(this).siblings('.toggle-panel').click()
    });

    function toggleExercise(btn) {
        if (btn.parent('.panel-heading').next('.panel-body').attr('data-expanded') === 'true') {
            btn
                .parent('.panel-heading').next('.panel-body').slideUp('fast')
                .attr('data-expanded','false');
            btn
                .removeClass('ion-android-cancel')
                .addClass('ion-android-arrow-dropdown-circle')
                .tooltipster('content', 'Open Details');
        } else {
            btn
                .parent('.panel-heading').next('.panel-body').slideDown('fast')
                .attr('data-expanded','true');
            btn
                .removeClass('ion-android-arrow-dropdown-circle')
                .addClass('ion-android-cancel')
                .tooltipster('content', 'Close Details');
        }
    }

    $('.browse').click(function () {
        $(this).parents('div').next('input').click();
    });

    $('.upload-more').click(function () {
        $(this).siblings('input').click();
    });

    $(document).bind('dragover', function (e) {
        var dropZone = $('#dropzone'),
            timeout = window.dropZoneTimeout;
        if (!timeout) {
            dropZone.addClass('in');
        } else {
            clearTimeout(timeout);
        }
        var found = false,
            node = e.target;
        do {
            if (node === dropZone[0]) {
                found = true;
                break;
            }
            node = node.parentNode;
        } while (node != null);
        if (found) {
            dropZone.addClass('hover');
        } else {
            dropZone.removeClass('hover');
        }
        window.dropZoneTimeout = setTimeout(function () {
            window.dropZoneTimeout = null;
            dropZone.removeClass('in hover');
        }, 100);
    });

    $(function () {
        $('#dropzone').fileupload({
            url: 'server/php/',
            dataType: 'json',
            autoUpload: true,
            acceptFileTypes: /(\.|\/)(gif|jpe?g|png|)$/i,
            dropZone: $('#dropzone'),
            disableImageResize: /Android(?!.*Chrome)|Opera/
                .test(window.navigator.userAgent),
            previewMaxWidth: 60,
            previewMaxHeight: 36,
            maxFileSize: 10000000000

        }).on('fileuploadadd', function (e, data) {
            $('#uploaded + .upload-more').hide();
            $('#uploaded').hide(0,function () {
                $('#ready_upload').hide(0,function () {
                    $('#uploading').css('display','flex')
                });
            })

            data.context = $('<div/>').appendTo('#uploading');
            $.each(data.files, function (index, file) {
                var node = $('<p/>')
                    .append($('<span/>').text(file.name));
                node.appendTo(data.context);
            });
        }).on('fileuploadprocessalways', function (e, data) {
            var index = data.index,
                file = data.files[index],
                node = $(data.context.children()[index]);
            if (file.preview) {
                node
                    .prepend(file.preview);
            }
            if (file.error) {
                node
                // .append('<br>')
                    .append($('<span class="text-danger"/>').text(file.error));
            }
            if (index + 1 === data.files.length) {
                data.context.find('button')
                    .text('Upload')
                    .prop('disabled', !!data.files.error);
            }
        }).on('fileuploadprogressall', function (e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);
            $('#progress .bar').css(
                'width',
                progress + '%'
            );
            $('.uploading-progress p').text(progress + '%')
        }).on('fileuploaddone', function (e, data) {

            $.each(data.result.files, function (index, file) {
                var thumb = $('<img/>')
                    .css('background-image','url('+ file.url +')')

                var node = $('<li/>')
                    .append(thumb)
                    .append($('<p/>').text(file.name));
                node.prependTo($('#uploaded'));
                if (file.url) {
                    var link = $('<a>')
                        .attr('target', '_blank')
                        .prop('href', file.url);
                    $(data.context.children()[index])
                        .wrap(link);
                } else if (file.error) {
                    var error = $('<span class="text-danger"/>').text(file.error);
                    $(data.context.children()[index])
                    // .append('<br>')
                        .append(error);
                }
            });

            $('#uploading > div:not(.uploading-progress)').remove();

            $('#ready_upload').hide(0,function () {
                $('#uploading').hide(0,function () {
                    $('#uploaded').css('display','flex');
                    $('#uploaded + .upload-more').show();
                    $('#uploaded').mCustomScrollbar("destroy");
                    $('#uploaded').mCustomScrollbar({
                        axis: 'x',
                        scrollbarPosition: "inside",
                        option: {
                            advanced:{
                                updateOnContentResize: true,
                                updateOnSelectorChange: true
                            }
                        }
                    });
                });
            })
        }).on('fileuploadfail', function (e, data) {
            $.each(data.files, function (index) {
                var error = $('<span class="text-danger"/>').text('File upload failed.');
                $(data.context.children()[index])
                // .append('<br>')
                    .append(error);
            });
        })
    });

});