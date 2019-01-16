/**
 * Created by Ali on 1/2/2017.
 */

$(document).ready(function () {
    $('.toggle-panel').on('click',function () {
        toggleExercise($(this));
    })

    function toggleExercise(btn) {
        if (btn.parent('.panel-heading').next('.panel-body').attr('data-expanded') == 'true') {
            btn.parent('.panel-heading').next('.panel-body').slideUp('fast');
            btn.removeClass('ion-close-circled').addClass('ion-android-arrow-dropdown-circle');
            btn.parent('.panel-heading').next('.panel-body').attr('data-expanded','false');
        } else {
            btn.parent('.panel-heading').next('.panel-body').slideDown('fast');
            btn.removeClass('ion-close-circled').addClass('ion-close-circled');
            btn.parent('.panel-heading').next('.panel-body').attr('data-expanded','true');
        }
    }

})