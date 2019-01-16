/**
 * Created by Ali on 12/21/2016.
 * 01012537756
 */


$(document).ready(function () {


    /* Does your browser support geolocation? */
    // if ("geolocation" in navigator) {
    //     /* Where in the world are you? */
    //     navigator.geolocation.getCurrentPosition(function(position) {
    //         loadWeather(position.coords.latitude+','+position.coords.longitude); //load weather using your lat/lng coordinates
    //     });
    //
    //     loadWeather('Seattle',''); //@params location, woeid
    //
    //     function loadWeather(location, woeid) {
    //         $.simpleWeather({
    //             location: location,
    //             woeid: woeid,
    //             unit: 'f',
    //             success: function(weather) {
    //                 html = '<span><i class="icon-'+weather.code+'"></i>' + weather.alt.temp + '&deg;C</span>';
    //                 // html += '<ul><li>'+weather.city+', '+weather.region+'</li>';
    //                 // html += '<li class="currently">'+weather.currently+'</li>';
    //                 // html += '<li>'+weather.alt.temp+'&deg;C</li></ul>';
    //
    //                 $("#weather").html(html);
    //             },
    //             error: function(error) {
    //                 navigator.geolocation.getCurrentPosition(function(position) {
    //                     loadWeather(position.coords.latitude+','+position.coords.longitude); //load weather using your lat/lng coordinates
    //                 });
    //             }
    //         });
    //     }
    // }


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

        sideBarShowenElements = sideBar.find('.requests .requests-icon'),

        sideBarCloseBtn = $('#side-bar-close'),
        sideBarOpenBtn = $('#side-bar-open'),
        rightSideToggleBtn = $('#toggle-btn'),

        trigger = $('#side-bar-container a').add('#membersTable a');




    /*************************************
     *
     *
     * Statistics in main nav
     *
     *
     * **********************************/
    $(".dial").knob({
        'min':0,
        'max':2000,
        'readOnly': true,
        'thickness': 0.08,
        'width': 110,
        'height': 110,
        'bgColor': 'rgba(255,255,255,0.25)',
        'fgColor': '#E16759',
        'inputColor': '#fff'
    });




    /*************************************
     *
     *
     * Tooltip
     *
     *
     * **********************************/
    $('.my-tooltip').each(function () {
        $(this).tooltipster({
            animation: 'fade',
            delay: 0,
            theme: 'tooltipster-shadow',
            side: ['right', 'left', 'top', 'bottom']
        });
    })




    /*************************************
     *
     *
     * Calendar
     *
     *
     * **********************************/
    $(function () {
        var today = new Date(),
            dd = today.getDate(),
            mm = today.getMonth(),
            yyyy = today.getFullYear(),
            months = ['January', 'March','April','May','June','July','August','September','October','November','December']


        if(dd<10) {
            dd='0'+dd
        }

        today = dd+' '+months[mm]+' '+yyyy;
        $('#date-weather p').text(today)
    })


    $('a').click(function(e) {
        e.preventDefault();
    });




    /*************************************
     *
     *
     * Charts
     *
     *
     * **********************************/
    $('.myChart').each(function () {
        var ctx = this;
        var data = {
            labels: ["1", "2", "3", "4", "5", "6", "7"],
            datasets: [
                {
                    label: 'Experts',
                    fill: true,
                    lineTension: 0.1,
                    backgroundColor: "rgba(75,192,192,0.4)",
                    borderColor: "rgba(75,192,192,1)",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "rgba(75,192,192,1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(75,192,192,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [0, 4, 2, 5, 4, 7, 10],
                    spanGaps: true,
                }
            ]
        };
        var myChart = new Chart(ctx, {
            type: 'line',
            label: 'Experts',
            borderColor : 'rgba(31,181,173)',
            data: data,
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                },
                legend: {
                    display: false
                }
            }
        });
    })



    /*************************************
     *
     *
     * Custom scroll bar
     *
     *
     * **********************************/
    $('.my-scroll').mCustomScrollbar({
        axis: 'y',
        scrollbarPosition: "inside",
        autoHideScrollbar: true,
        theme:"minimal-dark"
    });





    /*************************************
     *
     *
     * Side Bar
     *
     *
     * **********************************/
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
        $('#side-bar .my-tooltip').each(function () {
            $(this).tooltipster('enable');
        })

        if (window.innerWidth >= 768) {
            sideBarCloseBtn.fadeOut(100);
            sideBarHiddenElements.animate({
                'opacity': '0'
            },130,function () {
                sideBarHiddenElements.hide();
                body.removeClass('expand-left');
                body.addClass('shrink-left');
                sideBarOpenBtn.fadeIn(100);

            });
        } else {
            body.removeClass('expand-left');
            body.addClass('shrink-left');
            sideBarOpenBtn.fadeIn();
        }
        sideBar.attr('data-expand','false');
        $('.nested-list').slideUp();
        $('.side-bar-nested-list-btn').attr('data-expand','false');
    }


    function openSideBar() {
        $('#side-bar .my-tooltip').each(function () {
            $(this).tooltipster('disable');
        })

        if (window.innerWidth < 1366) {
            closeRightSide();
        }
        sideBarOpenBtn.fadeOut('fast');
        sideBarShowenElements.fadeOut('fast');
        body.removeClass('shrink-left');
        body.addClass('expand-left');
        setTimeout(function () {
            sideBarCloseBtn.fadeIn('fast');
            sideBarHiddenElements.show();
            sideBarHiddenElements.animate({
                'opacity': '1'
            },100);
        },250)
        sideBar.attr('data-expand','true');
    }

    $('.side-bar-nested-list-btn').on('click', function () {
        if ($(this).attr('data-expand') == 'true') {
            $(this).next('.nested-list').slideUp('fast');
            $(this).attr('data-expand','false')
                .removeClass('expanded')
        } else {
            $(this).next('.nested-list').slideDown('fast');
            $(this).attr('data-expand','true')
                .addClass('expanded')
        }
    })


    /*************************************
     *
     *
     * Toggle Right Side
     *
     *
     * **********************************/
    rightSideToggleBtn.on('click',function () {
        if (rightSide.attr('data-expand') == 'true') {
            closeRightSide();
        } else {
            if (window.innerWidth < 1366) {
                closeSideBar();
            }
            openRightSide()
        }
    })

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




    /*************************************
     *
     *
     * Fit content on scroll & resize
     *
     *
     * **********************************/
    function fitContent() {
        var top = (window.innerWidth < 768)? ((($(window).scrollTop() < 450)) ? 450 - $(window).scrollTop() : 0) : ((($(window).scrollTop() < 290)) ? 290 - $(window).scrollTop() : 0);
        secondaryNav.css('top',top + 'px')
        sideBar.css('top',top + 'px')
        rightSide.css('top',top + 'px')
        rightSide.css('height', (window.innerHeight - 81) + 'px')
        sideBar.find('#side-bar-container').css('height',(window.innerHeight) - 81 + 'px');
        content.css('min-height',window.innerHeight - 130 + 'px')
        var window_Width = window.innerWidth;
        if (window_Width < 1366) {
            if (window_Width < 768) {
                $('.inbox-icon').popover('disable')
                closeSideBar();
                closeRightSide();
            } else {
                openSideBar();
            }
        } else {
            openSideBar();
            openRightSide();
        }
    }


    $(window).scroll(function () {
        var top = (window.innerWidth < 768)? ((($(window).scrollTop() < 450)) ? 450 - $(window).scrollTop() : 0) : ((($(window).scrollTop() < 290)) ? 290 - $(window).scrollTop() : 0);
        secondaryNav.css('top',top + 'px')
        sideBar.css('top',top + 'px')
        rightSide.css('top',top + 'px')
        if ($(window).scrollTop() > 290) {
            $('#mini_profile_info').css({'visibility':'visible','opacity':'1'})
        } else {
            $('#mini_profile_info').css({'visibility':'hidden','opacity':'0'})
        }
    })


    $(window).resize(function () {
        fitContent();
    })

    fitContent();



    /*************************************
     *
     *
     * Add active class to sidebar
     *
     *
     * **********************************/
    $(function () {
        if (content.find('div').first().hasClass('add-assessment')) {
            sideBar.find('#add-assessmrnt-link').addClass('active');
        } else if (content.find('div').first().hasClass('view-assessment')) {
            sideBar.find('#assessment-link').addClass('active');
        } else if (content.find('div').first().hasClass('add-quality-member')) {
            sideBar.find('#add-member-link').addClass('active');
        } else if (content.find('div').first().hasClass('members-index')) {
            sideBar.find('#members-link').addClass('active');
        } else {
            sideBar.find('#dashboard-link').addClass('active');
        }
    })



    /*************************************
     *
     *
     * Inbox & Chat
     *
     *
     * **********************************/
    $(function () {
        $('.inbox-icon').popover({
            content: $("#inbox-content").html(),
            html: true,
            placement: 'bottom',
        }).on('shown.bs.popover', function () {
            $(this).next('.popover').find('.panel-body').mCustomScrollbar({
                axis: 'y',
                scrollbarPosition: "inside",
                autoHideScrollbar: true,
                theme:"minimal-dark"
            });
        })
    })

    $('body').on('click','.friend',function () {
        if (window.innerWidth > 767) openMsgBox()
    })

    $('#close-msg-box').on('click',function () {
        closeMsgBox();
    })
    
    function openMsgBox() {
        msgBox.fadeIn('fast')
    }

    function closeMsgBox() {
        msgBox.fadeOut('fast')
    }




    /*************************************
     *
     *
     * Add System
     *
     *
     * **********************************/
    $('#open-add-sys').on('click',function () {
        $('#add-sys-menu').fadeIn('fast');
    })

    $('#close-add-sys').on('click',function () {
        $('#add-sys-menu').fadeOut('fast');
    })




    /*************************************
     *
     *
     * Cover changing
     *
     *
     * **********************************/
    $(function () {
        $('#upload-cover').fileupload({
            url: 'server/php/',
            dataType: 'json',
            autoUpload: true,
            acceptFileTypes: /(\.|\/)(jpe?g|png|)$/i,
            disableImageResize: /Android(?!.*Chrome)|Opera/
                .test(window.navigator.userAgent),

        }).on('fileuploadadd', function (e, data) {

        }).on('fileuploadprocessalways', function (e, data) {

        }).on('fileuploaddone', function (e, data) {
            $.each(data.result.files, function (index, file) {
                $('.main-nav').css('background-image','url("' + file.url + '")')
            });
        }).on('fileuploadfail', function (e, data) {
            alert('failed to upload cover picture')
        });
    });


    /*************************************
     *
     *
     * Change Profile
     *
     *
     * **********************************/
    $(function () {
        $('#upload-profile').fileupload({
            url: 'server/php/',
            dataType: 'json',
            autoUpload: true,
            acceptFileTypes: /(\.|\/)(jpe?g|png|)$/i,
            disableImageResize: /Android(?!.*Chrome)|Opera/
                .test(window.navigator.userAgent),

        }).on('fileuploadadd', function (e, data) {

        }).on('fileuploadprocessalways', function (e, data) {

        }).on('fileuploaddone', function (e, data) {
            $.each(data.result.files, function (index, file) {
                $('#profile-pic').css('background-image','url("' + file.url + '")')
            });
        }).on('fileuploadfail', function (e, data) {
            alert('failed to upload cover picture')
        });
    });




    /*************************************
     *
     *
     * Function to Remove an assessment
     *
     *
     * **********************************/





    /*************************************
     *
     *
     * Edit Member Profile
     *
     *
     * **********************************/
    $('.edit-member').on('click',function () {
        var input = $(this)
            .closest('tr')
            .find('input');

        if ($(this).attr('data-editing') == 'edit') {
            input
                .prop('disabled', false);

            $(this)
                .empty().text('Save')
                .prepend($('<i class="glyphicon glyphicon-check"/>'))

            $(this)
                .attr('data-editing','save');
        } else {
            input
                .prop('disabled', true);

            $(this)
                .empty().text('Edit')
                .prepend($('<i class="glyphicon glyphicon-edit"/>'))

            $(this)
                .attr('data-editing','edit');

            $(this).closest('form').submit()
        }
    })

})

