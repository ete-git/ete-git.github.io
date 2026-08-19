// スクロールアニメーションを有効にする要素
const revealElements = document.querySelectorAll('.content-section, .skill-card, .application-card, .music-card, .about-container');

// ナビゲーションのページ内リンクを取得する
const navigationLinks = document.querySelectorAll('.site-nav a[href^="#"]');

navigationLinks.forEach((link) => {
    // クリック時のイベントを設定
    link.addEventListener('click', (event) => {
        // クリック時に通常のリンク遷移を防ぐ
        event.preventDefault();

        // リンク先のセクションを取得
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        // セクションがなければ何もせず終了
        if (!targetSection) return;

        // セクション内の見出しを取得し、見つからない場合はセクション自体を使う
        const targetHeading = targetSection.querySelector('.section-title') || targetSection;

        // 見出しの中心を基準にスクロール位置を計算する
        const headingPosition = targetHeading.getBoundingClientRect();
        const headingCenter = headingPosition.top + window.scrollY + headingPosition.height / 2;

        // 見出しが少し上に来るように設定
        const upwardOffset = 100;
        
        const scrollPosition = headingCenter - window.innerHeight / 2 + upwardOffset;

        // 計算した位置まで滑らかにスクロールする
        window.scrollTo({
            top: Math.max(0, scrollPosition),
            behavior: 'smooth',
        });
    });
});

// 要素が画面内に入ったときに表示状態へ切り替える監視を設定する
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

// 音楽カードを取得し、再生状態を監視する
const musicCards = document.querySelectorAll('.music-card');

musicCards.forEach((card) => {
    // カード内のaudio要素を取得
    const audio = card.querySelector('audio');

    // audioがない場合は終了
    if (!audio) return;

    // 再生状態を更新する関数
    const updatePlayingState = (isPlaying) => {
        card.classList.toggle('is-playing', isPlaying);
    };

    // 再生中はtrue、一時停止または再生終了時はfalseを渡す
    audio.addEventListener('play', () => updatePlayingState(true));
    audio.addEventListener('pause', () => updatePlayingState(false));
    audio.addEventListener('ended', () => updatePlayingState(false));
});
