/* ========================================
   スクロールアニメーション
   要素が画面内に入ったときに一度だけ表示状態へ切り替える
======================================== */
const revealElements = document.querySelectorAll('.content-section, .skill-card, .work-card, .music-card, .about-container');

/* ========================================
    ナビゲーションのスムーズスクロール
    リンク先セクションの見出しが画面中央より少し上に来るように、
   ブラウザ標準の瞬間移動を止めてから滑らかに移動する
======================================== */
const navigationLinks = document.querySelectorAll('.site-nav a[href^="#"]');

navigationLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
        // 通常のアンカー移動を止め、下のスクロール処理を使う
        event.preventDefault();

        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        // 対応するセクションがないリンクでは何もしない
        if (!targetSection) return;

        // セクション内の見出しを取得し、見つからない場合はセクション自体を使う
        const targetHeading = targetSection.querySelector('.section-title') || targetSection;

        // 見出しの中心を画面中央より100px上に置くためのスクロール位置を計算する
        const headingPosition = targetHeading.getBoundingClientRect();
        const headingCenter = headingPosition.top + window.scrollY + headingPosition.height / 2;
        const upwardOffset = 100;
        const scrollPosition = headingCenter - window.innerHeight / 2 + upwardOffset;

        // 計算した位置まで滑らかにスクロールする
        window.scrollTo({
            top: Math.max(0, scrollPosition),
            behavior: 'smooth',
        });
    });
});

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
    });
}, {
    threshold: 0.15
});

revealElements.forEach((element) => {
    element.classList.add('reveal');
    revealObserver.observe(element);
});

/* ========================================
   音楽再生中のCDアニメーション
   audio が再生中かどうかを監視して、カードに is-playing クラスを付ける
   CSS 側でそのクラスが付いたときだけ CD を回転させる
======================================== */
const musicCards = document.querySelectorAll('.music-card');

musicCards.forEach((card) => {
    const audio = card.querySelector('audio');

    if (!audio) return;

    const updatePlayingState = (isPlaying) => {
        card.classList.toggle('is-playing', isPlaying);
    };

    audio.addEventListener('play', () => updatePlayingState(true));
    audio.addEventListener('pause', () => updatePlayingState(false));
    audio.addEventListener('ended', () => updatePlayingState(false));
});
