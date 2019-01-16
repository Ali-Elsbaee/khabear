/**
 * Created by Ali on 12/21/2016.
 * 01012537756
 */

$(document).ready(function () {

    var body = $('body'),
        container = $('#container'),
        secondaryNav = $('#secondary-nav'),
        sideBar = $('#side-bar'),
        rightSide = $('#right-side'),
        footer = $('footer'),
        content = $('#content'),

        msgBox = $('#msg-box'),

        sideBarHiddenElements = sideBar.find('p')
            .add(sideBar.find('.arrow'))
            .add(sideBar.find('.requests a'))
            .add(sideBar.find('.logo img:nth-of-type(2)')),

        sideBarShowenElements = sideBar.find('.requests .ion'),

        sideBarCloseBtn = $('#side-bar-close'),
        sideBarOpenBtn = $('#side-bar-open'),
        rightSideToggleBtn = $('#toggle-btn'),

        resizeFunctionAvailable = true;

        $('.noti-counter')
            .add('.activity').corner()

    $('.member-statistics-icon').corner('round 35px')


    function fitContent() {
        sideBar.find('#side-bar-container').css('height',(window.innerHeight) - 81 + 'px');
        var window_Width = window.innerWidth;
        if (window_Width < 1366) {
            if (window_Width < 768) {
                closeRightSide();
            } else {
                openRightSide();
            }
            closeSideBar();
        } else {
            openSideBar();
            openRightSide();
        }
    }

    fitContent();

    $(window).resize(function () {
        sideBar.find('#side-bar-container').css('height',(window.innerHeight) - 81 + 'px');
        if (resizeFunctionAvailable) fitContent();
    })

    sideBarCloseBtn.on('click',function () {
        closeSideBar();
    })

    sideBarOpenBtn.on('click',function () {
        openSideBar();
    })

    $('#side-bar #side-bar-container a').on('click',function () {
        openSideBar();
    })

    function closeSideBar() {
        resizeFunctionAvailable = false;
        sideBarCloseBtn.hide();
        sideBarHiddenElements.hide();
        body.removeClass('expand-left');
        body.addClass('shrink-left');
        sideBarOpenBtn.show();
        sideBar.attr('data-expand','false');
        $('.nested-list').slideUp();
        $('.side-bar-nested-list-btn').attr('data-expand','false');
    }

    function openSideBar() {
        sideBarOpenBtn.hide();
        sideBarShowenElements.show();
        body.removeClass('shrink-left');
        body.addClass('expand-left');
        sideBarCloseBtn.show();
        sideBarHiddenElements.show();
        sideBar.attr('data-expand','true');
    }

    rightSideToggleBtn.on('click',function () {
        if (rightSide.attr('data-expand') == 'true') {
            closeRightSide();
        } else {
            if (window.innerWidth < 1366) {
                closeSideBar();
            }
            openRightSide()
        }
    });

    function closeRightSide() {
        body.removeClass('expand-right');
        body.addClass('shrink-right');
        rightSide.attr('data-expand','false');
    }

    function openRightSide() {
        body.removeClass('shrink-right');
        body.addClass('expand-right');
        rightSide.attr('data-expand','true');
    }

    $('.side-bar-nested-list-btn').on('click', function () {
        if ($(this).attr('data-expand') == 'true') {
            $(this).next('.nested-list').slideUp('fast');
            $(this).attr('data-expand','false');
        } else {
            $(this).next('.nested-list').slideDown('fast');
            $(this).attr('data-expand','true');
        }
    })

    // sideBar.find('.mCustomScrollBox').append("" +
    //     "<div class='logout-settings'>" +
    //         "<li>" +
    //             "<a href=''>" +
    //             "<div class='menu-icon'><i class='ion ion-android-settings'></i></div>" +
    //             "<p>Settings</p></a>" +
    //         "</li>" +
    //         "<li>" +
    //             "<a href='http://127.0.0.1/khabear_system2/public/logout'>" +
    //             "<div class='menu-icon'><i class='ion ion-android-exit'></i></div>" +
    //             "<p>Signout</p></a>" +
    //         "</li>" +
    //     "</div>"
    // );

    if (content.find('div').first().hasClass('add-assessment')) {
        sideBar.find('#add-assessmrnt-link').addClass('active');
    } else if (content.find('div').first().hasClass('view-assessment')) {
        sideBar.find('#assessment-link').addClass('active');
    } else if(content.find('div').first().hasClass('add-quality-member')) {
        sideBar.find('#add-member-link').addClass('active');
    } else {
        sideBar.find('#dashboard-link').addClass('active');
    }

    $('.friend').on('click',function () {
        msgBox.css('right','0')
    })

    $('#back').on('click',function () {
        closeMsgBox();
    })

    function openMsgBox(name) {
        msgBox.css('right','0');
    }

    function closeMsgBox() {
        msgBox.css('right','-100%');
    }

})