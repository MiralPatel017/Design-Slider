let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');
let carouselDom = document.getElementById('carousel');
let listItemDom = document.querySelector('.carousel .list');
let thumbnailDom = document.querySelector('.carousel .thumbnail');

nextDom.onclick = function () {
    showSlider('next');
};

prevDom.onclick = function () {
    showSlider('prev');
};

let timeRunning = 3000;
let runTimeOut;

let timeAutoNext = 5000;
let runAutoRun = setTimeout(() => {
    nextDom.click();
}, timeAutoNext);

function resetAutoRun() {
    clearTimeout(runAutoRun);
    runAutoRun = setTimeout(() => {
        nextDom.click();
    }, timeAutoNext);
}

function showSlider(type) {
    let itemSlider = document.querySelectorAll('.carousel .list .item');
    let itemThumbnail = document.querySelectorAll('.carousel .thumbnail .item');

    if (type === 'next') {
        // Move the first item to the end
        listItemDom.appendChild(itemSlider[0]);
        thumbnailDom.appendChild(itemThumbnail[0]);
        carouselDom.classList.add('next');
    } else {
        // Move the last item to the start
        let lastSliderItem = itemSlider[itemSlider.length - 1];
        let lastThumbnailItem = itemThumbnail[itemThumbnail.length - 1];

        listItemDom.prepend(lastSliderItem);
        thumbnailDom.prepend(lastThumbnailItem);
        carouselDom.classList.add('prev');
    }

    // Reset animation state
    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        carouselDom.classList.remove('next');
        carouselDom.classList.remove('prev');
    }, timeRunning);

    // Reset auto-run
    resetAutoRun();
}

// Stop auto rotation on hover over .carousel .list .item .content
let contentElements = document.querySelectorAll('.carousel .list .item .content');
contentElements.forEach(content => {
    content.addEventListener('mouseenter', () => {
        clearTimeout(runAutoRun);
    });

    content.addEventListener('mouseleave', () => {
        resetAutoRun();
    });
});
