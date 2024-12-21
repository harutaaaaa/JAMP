// カーソル用のdivタグを取得してcursorに格納
var cursor = document.getElementById('cursor'); 

// カーソル用のdivタグをマウスに追従させる
document.addEventListener('mousemove', function (e) {
    cursor.style.transform = 'translate(' + e.clientX + 'px, ' + e.clientY + 'px)';
});

// リンクにホバーした時にクラス追加、離れたらクラス削除
var link = document.querySelectorAll('a');
for (var i = 0; i < link.length; i++) {
    link[i].addEventListener('mouseover', function (e) {
        cursor.classList.add('cursor--hover');
    });
    link[i].addEventListener('mouseout', function (e) {
        cursor.classList.remove('cursor--hover');   
    });
}

//ローディング画面
const loading = document.querySelector('#loading');
const disappear = document.querySelector('#disapper');

window.addEventListener('load', () => {
    loading.animate(
        {
            opacity: [1, 0],
            visibility: 'hidden',
        },
        {
            duration: 2000,
            delay: 3000,
            easing: 'ease',
            fill: 'forwards',
        }
    ).onfinish = () => {
        // アニメーション終了後に #loading を非表示にする
        loading.style.display = 'none';
    };

    disappear.animate(
        {
            opacity: [1, 0],
            visibility: 'hidden',
        },
        {
            duration: 2000,
            delay: 3000,
            easing: 'ease',
            fill: 'forwards',
        }
    ).onfinish = () => {
        // アニメーション終了後に #disapper を非表示にする
        disappear.style.display = 'none';
    };
});

// スライドショー用のJavaScript
let currentIndex = 0;  // 現在表示中の画像のインデックス
const images = document.querySelectorAll('.frame img');  // すべての画像を取得
const totalImages = images.length;  // 画像の総数

// 画像を切り替える関数
function changeImage() {
    // 現在の画像を非表示にする
    images[currentIndex].classList.remove('active');

    // 次の画像のインデックスを計算
    currentIndex = (currentIndex + 1) % totalImages;  // 循環させるために % 演算子を使用

    // 新しい画像を表示
    images[currentIndex].classList.add('active');
}

// 3秒ごとに画像を切り替える
setInterval(changeImage, 4200);

// 最初の画像を表示する
images[currentIndex].classList.add('active');

// アニメーションを遅延させる関数
const showText = (entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) { // 要素が画面内に入った場合
            const keyframes = {
                opacity: [0, 1],
                transform: ['translateY(50px)', 'translateY(0)'], // translate を修正
            };

            // アニメーションの設定に遅延を追加
            entry.target.animate(keyframes, {
                duration: 3000, // アニメーションの長さ
                delay: index * 1000, // 1秒ずつ遅延
                fill: 'forwards', // アニメーション終了後にスタイルを維持
                opacity:[0,1],
            });

            // 一度だけアニメーションを適用させるため監視を解除
            textObserver.unobserve(entry.target);
        }
    });
};

// IntersectionObserver の設定
const textObserver = new IntersectionObserver(showText, { threshold: 0.5 }); // 50%が画面内に入ったときに発火

// 各テキスト要素を監視
textObserver.observe(document.querySelector('.one'));
textObserver.observe(document.querySelector('.two'));
textObserver.observe(document.querySelector('.three'));
textObserver.observe(document.querySelector('.four'));
textObserver.observe(document.querySelector('.five'));
textObserver.observe(document.querySelector('.six'));

//blogの矢印横移動
let boxPosition = 0; // 初期位置

// 左右矢印の移動処理
document.querySelector('.Arrow.left').addEventListener('click', () => {
    moveBox('left');
});

document.querySelector('.Arrow.right').addEventListener('click', () => {
    moveBox('right');
});

// 移動するための関数
function moveBox(direction) {
    const boxContainer = document.querySelector('.Box-Container');
    const boxWidth = document.querySelector('.Box').offsetWidth + 10; // Boxの幅 + マージン
    const containerWidth = boxContainer.offsetWidth;
    const totalBoxes = document.querySelectorAll('.Box').length;

    // 最大位置を計算（画面内に収められる最大数）
    const maxPosition = totalBoxes - Math.floor(containerWidth / boxWidth);

    if (direction === 'right') {
        // 右に移動（最右のBoxに到達した場合は移動しない）
        if (boxPosition < maxPosition) {
            boxPosition++;
        }
    } else if (direction === 'left') {
        // 左に移動（最左のBoxに到達した場合は移動しない）
        if (boxPosition > 0) {
            boxPosition--;
        }
    }

    // スクロールするための位置設定
    boxContainer.style.transform = `translateX(-${boxWidth * boxPosition}px)`;

    // 矢印の表示/非表示を制御
    updateArrows(boxPosition, maxPosition);
}

// 矢印の表示/非表示を更新する関数
function updateArrows(position, maxPosition) {
    const leftArrow = document.querySelector('.Arrow.left');
    const rightArrow = document.querySelector('.Arrow.right');

    // 左矢印を表示/非表示
    if (position === 0) {
        leftArrow.classList.add('hidden');  // 左端に到達したら左矢印を非表示
    } else {
        leftArrow.classList.remove('hidden'); // 左矢印を表示
    }

    // 右矢印を表示/非表示
    if (position === maxPosition) {
        rightArrow.classList.add('hidden'); // 右端に到達したら右矢印を非表示
    } else {
        rightArrow.classList.remove('hidden'); // 右矢印を表示
    }
}

// ボタンを取得
const btn = document.getElementById('btn');

// 背景を変えたい要素を取得
const blogSection = document.querySelector('.blog');

// すべての .box 要素を取得
const boxes = document.querySelectorAll('.Box');

const Arrowes = document.querySelectorAll('.Arrow');

// 背景色や文字色を切り替えるためのフラグ
let isColorChanged = false;

// ボタンがクリックされた時の処理
btn.addEventListener('click', () => {
    if (isColorChanged) {
        // 色が変更されている場合、元の色に戻す
        blogSection.style.backgroundColor = '#4E454A'; // 元の色に戻す
        boxes.forEach(box => {
            box.style.color = '#F0EFE8'; // 元の文字色に戻す
        });
        Arrowes.forEach(Arrow => {
            Arrow.style.color = '#F0EFE8'; // 元の矢印の色に戻す
        });
    } else {
        // 色が変更されていない場合、新しい色に変更
        blogSection.style.backgroundColor = '#F0EFE8'; // 新しい背景色
        boxes.forEach(box => {
            box.style.color = '#000000'; // 新しい文字色
        });
        Arrowes.forEach(Arrow => {
            Arrow.style.color = '#000000'; // 新しい矢印の色
        });
    }

    // フラグを反転
    isColorChanged = !isColorChanged;
});

document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
      const answer = question.nextElementSibling;
      const toggle = question.querySelector('.faq-toggle');
  
      // 回答をトグル表示
      if (answer.style.display === 'block') {
        answer.style.display = 'none';
        toggle.textContent = '＋';
      } else {
        answer.style.display = 'block';
        toggle.textContent = 'ー';
      }
    });
  });

const photos = [
    'img/sea.png', // 最初の画像のパス
    'img/usj.jpg',
    'img/mountain.png',
    'img/young.jpg',
    'img/maruta.png',
];

let currentnumber = 0;

const circleElement = document.getElementById('slideshow-circle');

// 初期画像を設定
circleElement.style.backgroundImage = `url(${photos[currentnumber]})`;
circleElement.style.backgroundSize = 'cover'; // 画像を全面に表示
circleElement.style.backgroundPosition = 'center'; // 画像を中央揃え

// クリックイベントを追加
circleElement.addEventListener('click', () => {
    currentnumber = (currentnumber + 1) % photos.length; // 次の画像へ
    circleElement.style.backgroundImage = `url(${photos[currentnumber]})`;
});

