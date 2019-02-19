// The h-index is an index that attempts to measure both the productivity and citation impact of the published body of work of a scientist or scholar.
// Google Scholar Citations provide a simple way for authors to keep track of citations to their articles.
$(() => {
    const getScientist = name => {
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
            success: function (jsondata) {// debugger
            },
            error(jqXHR, textStatus, errorThrown) {
                debugger
            }
        }).then(jsondata => {
            const person = Object.values(jsondata.query.pages)[0]
            const date = /\d{2}\s.+\d{4}/.exec(person.extract)[0].replace(/&#160/g, '').split(';– ')
            const name = person.title

            return date
        }
        ).then(result => {
            var data = d3.csvParse(result);
            draw(data);
        }
        )
    }
    const getBornDate = names => {
        return wtf.fetch(names, 'en', {
            'Api-User-Agent': 'spencermountain@gmail.com'
        }).then((docList) => {
            let allLinks = docList.map(doc => {
                let date = null
                const infobox = doc.infobox(0)
                const name = doc.options.title || (infobox.get('name') || infobox.get('birth_name')).data.text
                try {
                    date = infobox.get('birth_date').data.text
                } catch (err) {
                    date = null
                }
                return {
                    name,
                    date
                }
            });
            return (allLinks);
        }
        )
    }
    const requestData = _ => {
        $.ajax({
            // request type ( GET or POST )
            type: "GET",

            // the URL to which the request is sent
            url: './researchers.csv'
        }).then(result => {
            let data = d3.csvParse(result);
            const len = data.length
            const requestNames = data.reduce((acc, item) => acc.concat([item.name]), [])
            getBornDate(requestNames.slice(0, len)).then(names => {
                const barData = names.map((item, i) => {
                    const currentItem = data.find(it => it.name === item.name)
                    const date = new Date(item.date);
                    const month = date.getMonth() + 1;
                    const day = date.getDate();
                    const formatDate = `${date.getFullYear()}-${month >= 10 ? month : ('0' + month)}-${day >= 10 ? day : '0' + day} ${date.getHours()}:${date.getMinutes()}`
                    return {
                        type: '',
                        value: 0,
                        name: item.name,
                        ...currentItem,
                        date: formatDate
                    };
                });
                localStorage.barData = JSON.stringify(barData)
                draw(barData)
            }
            )


        })
    }
    // requestData()
    draw(JSON.parse(localStorage.barData))
})
