document.querySelector('button').onclick = function() {
    const nameOrId = document.querySelector('input').value
    if (nameOrId == '') {
        return;
    }
    let endpoint = "http://127.0.0.1:3000/results/id"
    if (isNaN(parseInt(nameOrId))) {
        endpoint = "http://127.0.0.1:3000/results/name"
    }
    fetch(`${endpoint}/${nameOrId}`)
        .then(response => response.json())
        .then(data => {
            let tbody = document.querySelector('tbody')
            tbody.innerHTML = ''
            if (Array.isArray(data)) {
                if (data.length == 0) {
                    alert('لا يوجد بيانات')
                    return;
                }
                data.forEach((val) => {
                    let score = (val.grade/410 * 100)
                    tbody.innerHTML += `
                    <tr>
                        <td>${val.id}</td>
                        <td>${val.name}</td>
                        <td>${val.grade}</td>
                        <td>${score.toFixed(2)}%</td>
                    `
                })
            }else if (data.id){
                    let score = (data.grade/410 * 100);
                    tbody.innerHTML += `
                    <tr>
                        <td>${data.id}</td>
                        <td>${data.name}</td>
                        <td>${data.grade}</td>
                        <td>${score.toFixed(2)}%</td>
                    `
            }else{
                alert('لا يوجد بيانات')
            }
        }).catch(err => {
            alert('عفوا حدث خطأ ما')
            console.log(err)
        });
}