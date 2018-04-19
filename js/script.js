$(document).ready(function () {

    SC.initialize({
        client_id: 'ggX0UomnLs0VmW7qZnCzw'
        // redirect_uri: 'http://example.com/callback'
    });

   var searchesValues = [];
    var tracks = [];
   var page_size = 6;

    $('#search-btn').click( function() {
        var searchValue = $('#search').val();
        if (!searchValue) {
            return;
        }

        function search(searchValue) {
            return Promise(function (res, rej) {

                SC.get('/tracks', {
                    q: searchValue,
                    limit: page_size,
                    linked_partitioning: 1
                }).then(function (tracks) {

                    searchesValues = searchesValues.filter(function (val) {
                        return val.name !== searchValue;
                    });
                    searchesValues.push({name: searchValue});

                    tracks = []; //empty previous tracks
                    tracks.collection.map(function (track) {
                        tracks.push({
                            title: track.title,
                            url: track.artwork_url,
                            premaLink: track.permalink_url
                        });
                    });
                    res();
                }).catch(function (error) {
                    alert('Error: ' + error.message);
                });

            });
        }
    });

//json response
        var url = 'https://api.soundcloud.com/tracks?client_id=ggX0UomnLs0VmW7qZnCzw';
        $.getJSON(url, function (tracks) {
            $(tracks).each(function (track) {
                console.log(track.title);
            })
        });

// // error handler
//     SC.get('/tracks/1').catch(function (error) {
//         alert('Error: ' + error.message);
//     });


// soundcloud player widget
        var track_url = 'http://soundcloud.com/forss/flickermood';
        SC.oEmbed(track_url, {auto_play: true}).then(function (oEmbed) {
            // console.log('oEmbed response: ', oEmbed);
        });


// // find all sounds of buskers licensed under 'creative commons share alike'
//     SC.get('/tracks', {
//         q: 'buskers', license: 'cc-by-sa'
//     }).then(function (tracks) {
//         console.log(tracks);
//     });

        // var page_size = 6;
// pagination
//     $("#getList").click(function () {
//         var searchQuery = $('#query').val();
//         // var page_size = 6;
//     // var page_size = 6;
//     SC.get('/tracks', {q:searchQuery,limit: page_size}).then(function (tracks) {
//         $(tracks).each(function (index, track) {
//             $('ul').append($('<li></li>').html(track.title + ' - ' + track.genre));
//         });
//     });
//     });
//
//     $("#next").click(function () {
//         var searchQuery = $('#query').val();
//     SC.get('/tracks', {
//         q:searchQuery,
//         limit: page_size,
//         linked_partitioning: 1,
//         offset: 6
//     }).then(function (tracks) {
//         $(tracks).each(function (index, track) {
//             // var url = track.next_herf;
//             $('ul').append($('<li></li>').html(track.title + ' - ' + track.genre));
//         });
//     });
//     });
        //
        // SC.get('/tracks/1').catch(function (error) {
        //     alert('Error: ' + error.message);
        // });

// Getting tracks

        //
        // $("#getList").click(function () {
        //     var searchQuery = $('#query').val();
        //     var page_size = 6;

        // var date = new Date();
        // var currentDate = date.toLocaleDateString('zh-Hans-CN');

        // SC.get('/tracks', {
        //         q: searchQuery,
        //         // created_at:[{ to : currentDate + "00:00:01" }],
        //         limit: page_size
        //         // linked_partitioning: 1,
        //         // offset: 10
        //     }
        // ).then(function (tracks) {
        //     $(tracks).each(function (index, track) {
        //         $('ul').append($('<li></li>').html(track.title + ' - ' + track.genre));
        //     });

        // }).catch(function (error) {
        //     alert('Error: ' + error.message);
        // });
// ;
        // ).then(function (res) {
        //     for (var i = 0; i < res.length; i++) {
        //         $("ul").append("<li>" + res[i].title + "</li>")
        //     }

// });
// });

//
// $(function () {
//     $("#sortable").sortable();
//
// });

//("<li>" +"<img src='" + res.collection[i].artwork_url +"'>"+ res.collection[i].title+ "</li>")
//+"<img src='" + res[i].artwork_url +"'>"


// Play audio
        $("#embedTrack").click(function () {
            var player = $("#player");
            SC.oEmbed('https://soundcloud.com/mureed-abbas-shah/sami-meri-waar-by-qb-umair', {
                maxheight: 200
            }, function (res) {
                $("#player").html(res.html);
            });
        });


// $('#next').button({icons: {primary: "ui-icon-circle-plus"}});

// $( ".next" ).button({
//     classes: {
//         "ui-button": "highlight"
//     },
//     icon: "ui-icon-gear",
//     iconPosition: "end"
// });
//     var searchQuery = $('#query').val();
//     var page_size = 6;
        var nextBatch = null;
        // $("#getList").click(function () {
        // var searchQuery = $('#query').val();
        // var page_size = 6;
        //     SC.get('/tracks', {
        //         q: searchQuery,
        //         limit: page_size,
        //         linked_partitioning: 1
        //     }).then(function (tracksResponse) {
        //         $(tracksResponse).each(function (index, value) {
        //             $(value).each(function (index, track){
        //             $('ul').append($('<li></li>').html(track.title + ' - ' + track.genre));
        //         });
        //         });
        //
        //         console.log(tracksResponse);
        //         nextBatch = tracksResponse.next_href;
        //     }).catch(function (error) {
        //         alert('Error: ' + error.message);
        //     });
        //
        // });

        $("#next").click(function () {
            // clearPrevResults();
            $.ajax({
                url: nextBatch, success: function (result) {
                    console.log(result);
                    nextBatch = result.next_href;
                }
            });
            // }).catch(function (error) {
            //     alert('Error: ' + error.message);
            //
            // });

        });
    });