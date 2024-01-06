const scrollSmothToTarget = (anchorId) => {
    const targetElement = document.querySelector(anchorId);
    if (targetElement)
        targetElement.scrollIntoView({ behavior: 'smooth' });
};
const scrollTopButton = document.getElementById('top');
export {};
