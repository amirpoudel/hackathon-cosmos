import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'items',
    path: '/itemlist',
    icon: icon('ic_user'),
  },
  {
    title: 'menu',
    path: '/menu',
    icon: icon('ic_menu'),
  },
  {
    title: 'orders',
    path: '/order',
    icon: icon('ic_order'),
  },
  {
    title: 'table',
    path: '/table',
    icon: icon('ic_table'),
  },
  {
    title: 'login',
    path: '/login',
    icon: icon('ic_lock'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic_disabled'),
  },
];

export default navConfig;
