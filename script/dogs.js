let data = [
    {
        id:1,
        cat:"https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZG9nfGVufDB8fDB8fHww"
    },
    {
        id:2,
        cat:"https://flipfit-cdn.akamaized.net/product-items/1734878405819-490351580ORA1V1.thumb.webp"
    },
    {
        id:3,
        cat:"https://media.hswstatic.com/eyJidWNrZXQiOiJjb250ZW50Lmhzd3N0YXRpYy5jb20iLCJrZXkiOiJnaWZcL3B1Zy5qcGciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjQwMH19fQ=="
    },
    {
        id:4,
        cat:"https://i.ytimg.com/vi/Vp7nW2SP6H8/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDO2NDUjRyvSRoo-p3JlSMJ3t0tZw"
    },
    {
        id:5,
        cat:"https://t3.ftcdn.net/jpg/02/41/29/52/360_F_241295223_bIfEF64ZYw15rETnhigRBNQL0qFYbe92.jpg"
    },
    {
        id:6,
        cat:"https://hgtvhome.sndimg.com/content/dam/images/hgtv/fullset/2022/6/16/1/shutterstock_1862856634.jpg.rend.hgtvcom.616.411.85.suffix/1655430860853.webp"
    },
    {
        id:7,
        cat:"https://www.pdinsurance.co.nz/wp-content/uploads/2023/05/Chihuahua-Dog-Profile.jpg"
    },
    {
        id:8,
        cat:"https://t3.ftcdn.net/jpg/05/97/88/52/360_F_597885224_1EDH2VALOcQsMkiTLJQY38JqijxYV5cd.jpg"
    },
    {
        id:9,
        cat:"https://www.outsideonline.com/wp-content/uploads/2023/03/Funny_Dog_H.jpg"
    },
]
let sound = new Audio;

let lockBoard = false;
let true_sound = "https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-112294/zapsplat_multimedia_game_sound_coin_collect_bonus_win_113262.mp3"
let wrong_sound = "https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-112294/zapsplat_multimedia_alert_ui_synth_app_notification_dry_notify_error_001_114198.mp3"
let win = "https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-epic-stock-media/esm_game_win_horns_sound_fx_arcade_synth_musical_chord_bling_electronic_casino_kids_mobile_positive_achievement_score.mp3"
let board = document.querySelector(".board")
let arr2 = data;
data = arr2.concat(data)
for (let i = data.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [data[i], data[j]] = [data[j], data[i]];
}
for (let i = 0; i < data.length; i++) {
    let element = document.createElement("div")
    element.setAttribute("index", i + 1)
    element.setAttribute("element-id", data[i].id)
    element.className = "flip-emoji"
    let inner = document.createElement("div")
    inner.className = "flip-emoji-inner"
    let front = document.createElement("div")
    front.className = "flip-emoji-front"
    let back = document.createElement("div")
    back.className = "flip-emoji-back"
    back.style.backgroundImage = "url(" +data[i].cat + ")"
    inner.append(back)
    inner.append(front)
    element.append(inner)
    board.append(element)
}
let active_one = 0;
let active_two = 0;
let index1 = 0
let index2 = 0

let flip_cards = document.querySelectorAll(".flip-emoji")
flip_cards.forEach((el) => {
    el.addEventListener("click", () => {
        if (lockBoard) {
            return
        };

        if (el.getAttribute("index") != index1 && el.getAttribute("index") != index2) {
            if (!el.classList.contains("win")) {
                if (active_one == 0) {
                    active_one = el.getAttribute("element-id")
                    index1 = el.getAttribute("index")
                } else {
                    active_two = el.getAttribute("element-id")
                    index2 = el.getAttribute("index")
                    lockBoard = true;
                    checkGame()
                }
                el.querySelector(".flip-emoji-inner").style.transform = 'rotateY(180deg)'
            }
        }
    })
})



function checkGame() {
    setTimeout(() => {
        if (active_one == active_two) {
            document.querySelectorAll(".flip-emoji")[index1 - 1].classList.add("win")
            document.querySelectorAll(".flip-emoji")[index2 - 1].classList.add("win")
            sound.src = true_sound
        } else {
            document.querySelectorAll(".flip-emoji")[index1 - 1].querySelector(".flip-emoji-inner").style.transform = 'rotateY(0deg)'
            document.querySelectorAll(".flip-emoji")[index2 - 1].querySelector(".flip-emoji-inner").style.transform = 'rotateY(0deg)'
            sound.src = wrong_sound

        }
        sound.play()
        active_one = 0
        active_two = 0
        index1 = 0;
        index2 = 0;
        lockBoard = false;
        checkWin()
    }, 500);
}

function checkWin() {
    let count = 0
    document.querySelectorAll(".flip-emoji").forEach(el => {
        if (el.classList.contains("win")) {
            count++
        }
    })

    if (count == data.length) {
        document.querySelector(".play_again").style.transform = "scale(1)"
        sound.src = win
        sound.play()
    }

}