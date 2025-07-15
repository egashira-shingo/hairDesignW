document.addEventListener('DOMContentLoaded', () => {
    // スムーズスクロール
    const smoothScrollTrigger = document.querySelectorAll('a[href^="#"]');
    for (let i = 0; i < smoothScrollTrigger.length; i++) {
        smoothScrollTrigger[i].addEventListener('click', (e) => {
            e.preventDefault(); // デフォルトのアンカーリンク挙動をキャンセル
            const href = e.currentTarget.getAttribute('href');
            const targetElement = document.getElementById(href.replace('#', ''));
            
            if (targetElement) {
                const headerOffset = document.querySelector('.header').offsetHeight; // ヘッダーの高さ
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset - 20; // ヘッダーの高さ+少し余白を引く
    
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // スマホメニューが開いていたら閉じる
                if (window.innerWidth <= 768) { // CSSのブレイクポイントと合わせる
                    const nav = document.querySelector('.nav');
                    const hamburgerButton = document.querySelector('.hamburger-menu-button');
                    if (nav.classList.contains('is-open')) {
                        nav.classList.remove('is-open');
                        hamburgerButton.classList.remove('is-open');
                        hamburgerButton.setAttribute('aria-expanded', 'false');
                    }
                }
            }
        });
    }

    // ハンバーガーメニュー
    const hamburgerButton = document.querySelector('.hamburger-menu-button');
    const nav = document.querySelector('.nav');

    if (hamburgerButton && nav) {
        hamburgerButton.addEventListener('click', () => {
            const isOpen = nav.classList.toggle('is-open'); // is-openクラスをトグル
            hamburgerButton.classList.toggle('is-open', isOpen); // ボタンにもクラスを適用してアイコン変化
            hamburgerButton.setAttribute('aria-expanded', isOpen); // アクセシビリティ属性更新
        });
    }

    // ウィンドウサイズ変更時にメニューを閉じる（PC表示になったら非表示に）
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) { // PCサイズになったら
            nav.classList.remove('is-open');
            hamburgerButton.classList.remove('is-open');
            hamburgerButton.setAttribute('aria-expanded', 'false');
        }
    });

    // スクロール時のフッター表示制御
    const footer = document.querySelector('.footer');
    if (footer) {
        const handleFooterVisibility = () => {
            // 少しでもスクロールしたらフッターを表示
            if (window.scrollY > 100) {
                footer.classList.add('is-visible');
            } else {
                footer.classList.remove('is-visible');
            }
        };

        // ページ読み込み時とスクロール時にチェック
        handleFooterVisibility();
        window.addEventListener('scroll', handleFooterVisibility);
    }

});