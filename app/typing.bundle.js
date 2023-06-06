let settingsIsToggled = true;

$('.cta-for-popup-2').click(function() {
    //grab the accuracy and the speed
    const speed = score.value;
    const accuracy = a.value;
    $.post('store-score.php', { speed, accuracy }, (data, status) => {
        if (status == 'success') {
            window.location.href = './certificate_issuer';
        } else {
            console.log('There was an error in the request!');
        }
    })
})

$('.print-detailed-report').click(function() {
    window.print();
})

function toggleSettings() {

    if (settingsIsToggled) {
        $('.settings-list').slideToggle(500, function() {
            $('h1.side-settings-title svg').css('transform', 'none');
            $('.home-button').css('padding', '20px 0');
            $('.home-button').css('justify-content', 'center');
            $('.home-button span').hide();
            $('.save-changes').fadeOut(100, function() {
                $('h1.side-settings-title span').hide();
                $('h1.side-settings-title').css('padding', '10px 5px');
                $('.side-settings').css('padding', '0');
                $('.side-settings').animate({ width: '3em' }, function() {
                    $('.app-body').animate({ width: 'calc(100vw-3em)' })

                })
            });
            settingsIsToggled = false;
        });
    } else {
        $('h1.side-settings-title svg').css('transform', 'rotate(180deg)');
        $('.home-button').css('padding', '20px');
        $('.home-button').css('justify-content', 'unset');
        $('.home-button span').show();
        $('.side-settings').animate({ width: '300px' }, function() {
            if (visualViewport.width > 1300) {
                $('.app-body').animate({ width: '100vw-300px' })
            }
            $('.settings-list').slideToggle(500);
            $('.side-settings').css('padding', '20px');
            $('h1.side-settings-title').css('padding', '0');
            $('h1.side-settings-title span').fadeIn(100, function() {
                $('.save-changes').fadeIn(100);
            });
        });
        settingsIsToggled = true;
    }
}

toggleSettings();

$('h1.side-settings-title svg').click(toggleSettings)

//handling the extended report

$('.detail-report-link').click(function() {
    //get all typing information and use this to inner html the data into the detailed report
    document.querySelector('.total-typed-content').innerHTML = sentence + '...[end]';
    document.querySelector('.popup-content-2 .speed').innerHTML = score.value;
    document.querySelector('.popup-content-2 .accuracy').innerHTML = a.value;
    document.querySelector('.popup-content-2 .characters').innerHTML = sentence.split(' ').join('').length;
    troubleRec.sort()

    function findMostFrequent(arr) {
        return arr
            .reduce((acc, cur, ind, arr) => {
                if (arr.indexOf(cur) === ind) {
                    return [...acc, [cur, 1]];
                } else {
                    acc[acc.indexOf(acc.find(e => e[0] === cur))] = [
                        cur,
                        acc[acc.indexOf(acc.find(e => e[0] === cur))][1] + 1
                    ];
                    return acc;
                }
            }, [])
            .sort((a, b) => b[1] - a[1])
            .filter((cur, ind, arr) => cur[1] === arr[0][1])
            .map(cur => cur[0]);
    }

    let troubleletter = findMostFrequent(troubleRec);

    if (troubleletter.length == 1) {
        document.querySelector('.popup-content-2 .trouble-letter').innerHTML = troubleletter[0].toUpperCase();
    } else if (troubleletter < 1) {
        document.querySelector('.popup-content-2 .trouble-letter').innerHTML = 'You made no mistakes.'
    } else {
        document.querySelector('.popup-content-2 .trouble-letter').innerHTML = 'Hard to tell.'
    }

    //handling the comment
    let comment;

    if (score.value < 40) {
        comment = 'Your speed is below average and ';
    } else if (score.value >= 40 && score.value < 80) {
        comment = 'Your speed is above average and ';
    } else if (score.value > 80) {
        comment = 'Your are a professional typist and ';
    }

    if (a.value < 50) {
        comment += 'your accuracy is too low!';
    } else if (a.value > 50 && a.value < 80) {
        comment += 'your accuracy is average but still has room for improvement!'
    } else if (a.value > 80 && a.value < 90) {
        comment += 'your accuracy is good!';
    } else if (a.value > 90 && a.value < 100) {
        comment += 'you are a sharp shooter!';
    } else if (a.value == 100) {
        comment += 'your accuracy is perfect!';
    }

    document.querySelector('.popup-content-2 .conclusion').innerHTML = comment;

    $('.popup-content').slideUp(100, function() {
        $('.overlay-2').fadeIn(500, function() {
            $('.popup-content-2').slideDown(100);
        });
    });

})