// Todo: get Navlinks from DB
const naviLinks = [
    {
        active: false,
        href: 'start',
        name: 'Start',
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
