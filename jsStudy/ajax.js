import qs from 'qs'
const request = (options = {
    url: '',
    methods: 'GET',
    success: function() {},
    error: function() {},
    data: {}
}) => {
    let xhr = new XMLHttpRequest()
    xhr.open(options.methods, options.methods === 'POST' ? options.url : options.url + '?' + qs.stringify(data), true)
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                options.success(xhr.response)
            } else {
                options.error()
            }
        }
    }
    xhr.send(options.methods === 'POST' ? data : null)
}

request({
    url: '',
    methods: 'GET',
    success: function(e) {
        console.log(e)
    },
    error: function(e) {
        console.log(e)
    }
})