// The h-index is an index that attempts to measure both the productivity and citation impact of the published body of work of a scientist or scholar.
// Google Scholar Citations provide a simple way for authors to keep track of citations to their articles.
$(()=>{
    const getScientist = name=>{
        let url = 'http://en.wikipedia.org/w/api.php';
        url = 'https://en.wikipedia.org/api/rest_v1/page/summary/Albert Einstein'
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
                srwhat: 'title',
                format: 'json'
            },
            dataType: 'json',
            // data to be sent to the server
            // data: { action: 'query', format: 'json', lgname: 'foo', lgpassword: 'foobar' },

            // The type of data that you're expecting back from the server
            // dataType: 'json',

            // Function to be called if the request succeeds
            success: function(jsondata) {// debugger
            },
            error(jqXHR, textStatus, errorThrown) {
                debugger
            }
        }).then(jsondata=>{
            const person = Object.values(jsondata.query.pages)[0]
            const date = /\d{2}\s.+\d{4}/.exec(person.extract)[0].replace(/&#160/g, '').split(';– ')
            const name = person.title

            return date
        }
        ).then(result=>{
            var data = d3.csvParse(result);
            draw(data);
        }
        )
    }
    $.ajax({
        // request type ( GET or POST )
        type: "GET",

        // the URL to which the request is sent
        url: './researchers.csv'
    }).then(result=>{
        $('#inputfile').attr('hidden', true);
        let data = d3.csvParse(result);
        const requestNames = data.reduce((acc,item)=>acc.concat([item.name]), [])
        getBornDate(requestNames.slice(0,10)).then(names=>{
            draw(data.map((item,i)=>({
            ...item,
            date:names[i]
            })))
        })
        //         draw(data);
    }
    )
    const getBornDate = names=>{
       return wtf.fetch(names, 'en', {
            'Api-User-Agent': 'spencermountain@gmail.com'
        }).then((docList)=>{
            let allLinks = docList.map(doc=>{
                return doc.infobox(0).get('birth_date').data.text
            }
            );
            return (allLinks);
        }
        )
    }

}
)
