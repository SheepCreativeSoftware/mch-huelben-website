// Todo: get Navlinks from DB
const naviLinks = [
    {
        active: false,
        href: '/',
        name: 'Home',
    },
    {
        active: true,
        href: 'start',
        name: 'Start',
    },
];
const getNavLinks = () => {
    return naviLinks;
};
export { getNavLinks };
