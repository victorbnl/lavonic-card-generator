function init() {
    // Get canvas and drawing context
    let canvas = document.getElementById("result")
    var ctx = canvas.getContext('2d')

    // Draw card background
    var background = document.getElementById("identity_card_image")
    ctx.drawImage(background, 0, 0)

    // Security code
    document.getElementById("security_code").innerText = "00000"
}

function generate() {
    // Get values
    let name = document.getElementById("name").value
    let coordinates = document.getElementById("coordinates").value
    let birth_place = document.getElementById("birth_place").value
    let birth_date = document.getElementById("birth_date").value
    let department = document.getElementById("department").value
    let expiration_date = document.getElementById("expiration_date").value
    let picture_file = document.getElementById("picture").files[0]

    // Read picture
    let picture_reader = new FileReader()
    picture_reader.readAsDataURL(picture_file)
    picture_reader.onloadend = (picture_e) => {

        let picture = new Image()
        picture.crossOrigin = "anonymous";
        picture.src = picture_e.target.result
        picture.onload = (ev) => {

            // Get canvas and drawing context
            let canvas = document.getElementById("result")
            var ctx = canvas.getContext('2d')

            // Draw card background
            var background = document.getElementById("identity_card_image")
            ctx.drawImage(background, 0, 0)

            // Draw text informations
            var cascadiaMonoFont = new FontFace('Cascadia Mono', 'url(assets/fonts/CascadiaMono.ttf)');
            cascadiaMonoFont.load().then(function(font) {
                document.fonts.add(font);
                ctx.font = "20px Cascadia Mono"
                ctx.fillText(name, 339, 136)
                ctx.fillText(coordinates, 450, 175)
                ctx.fillText(birth_place, 463, 215)
                ctx.fillText(birth_date, 463, 253)
                ctx.fillText(department, 396, 288)
                ctx.fillText(expiration_date, 460, 327)
            });

            // Draw picture
            ctx.drawImage(picture, 43, 119, 191, 233)

            // Security code
            document.getElementById("security_code").innerText = getRandomArbitrary(10000, 99999)
        }
    }
}

function save() {
    // Get canvas
    let canvas = document.getElementById("result")

    // Export image
    let img = canvas.toDataURL()

    // Redirect to the image download
    var link = document.createElement('a')
    link.download = 'carte_d\'identité.png'
    link.href = img
    link.click()
}

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}