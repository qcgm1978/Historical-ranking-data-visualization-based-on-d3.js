$(() => {
    let url = 'http://en.wikipedia.org/w/api.php?action=query&generator=search&gsrnamespace=0&gsrlimit=1&prop=pageimages|extracts&exintro=&exsentences=1&gsrsearch=Albert%20Einstein&format=json';
    // url = './example.json'
    // fetch(url, { 'mode': 'no-cors' }).then(data => {
    //     return data.json()
    // }).then(json => {
    //     debugger
    //     })
    $.ajax({
        // request type ( GET or POST )
        type: "GET",

        // the URL to which the request is sent
        url,
        data: {
            format: 'json'
        },
        dataType: 'jsonp',
        // data to be sent to the server
        // data: { action: 'query', format: 'json', lgname: 'foo', lgpassword: 'foobar' },

        // The type of data that you're expecting back from the server
        // dataType: 'json',

        // Function to be called if the request succeeds
        success: function (jsondata) {
        },
        error(err) {
            debugger
        }
    }).then(jsondata => {
        const date = /\d{2}\s.+\d{4}/.exec(Object.values(jsondata.query.pages)[0].extract)[0].replace(/&#160/g, '').split(';– ')
        debugger
    })
})