$(() => {
    let url = 'http://en.wikipedia.org/w/api.php';
    url='https://en.wikipedia.org/api/rest_v1/page/summary/Albert Einstein'
    // url = './example.csv'
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
            action: 'query',
            generator: 'search',
            gsrnamespace: 0,
            gsrlimit: 1,
            prop: 'pageimages| extracts | categories | info',
            exintro: '',
            exsentences: 1,
            srsearch: 'Albert Einstein',
            srwhat:'title',
            format: 'json'
        },
        dataType: 'json',
        // data to be sent to the server
        // data: { action: 'query', format: 'json', lgname: 'foo', lgpassword: 'foobar' },

        // The type of data that you're expecting back from the server
        // dataType: 'json',

        // Function to be called if the request succeeds
        success: function (jsondata) {
            debugger
        },
        error( jqXHR, textStatus,errorThrown) {
            debugger
        }
    }).then(jsondata => {
        const person = Object.values(jsondata.query.pages)[0]
        const date = /\d{2}\s.+\d{4}/.exec(person.extract)[0].replace(/&#160/g, '').split(';– ')
        const name = person.title

        return date
    }).then(result => {
        var data = d3.csvParse(result);
        draw(data);
    })
})