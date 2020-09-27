// 路由备份
import Layout from '@/layout'
import RouterView from '@/components/RouterView'
import { loadCommonComponent } from '../utils/loadCommonComponent'

export const marketing = {
  path: '',
  component: Layout,
  name: 'marketing',
  meta: { title: '营销管理', icon: 'attract', pathAuthName: '/marketingMng' },
  children: [
    {
      path: '/activity',
      component: RouterView,
      redirect: '/activity/plans',
      name: 'activity',
      meta: { title: '活动提报', pathAuthName: '/marketingMng/proposal' },
      children: [
        {
          path: '/activity/plans',
          name: '/activity/plans',
          component: () => import('@/views/activity/index'),
          meta: { keepAlive: true, title: '方案列表', pathAuthName: '/marketingMng/proposal/planList' }
        },
        {
          path: '/activity/editPlan/:id',
          name: '/activity/editPlan',
          component: () => import('@/views/activity/editPlan'),
          hidden: true,
          meta: { title: '查看方案', activeMenu: '/activity/plans', pathAuthName: '/marketingMng/proposal/planList' },
          children: [
            {
              path: '/activity/editPlan/:id/:bizId',
              component: loadCommonComponent('allowanceDetail'),
              props: 'brandx',
              meta: { title: '补贴详情', pathAuthName: '/marketingMng/proposal/planList' }
            }
          ]
        },
        {
          path: '/activity/allowances',
          name: '/activity/allowances',
          component: () => import('@/views/activity/allowances'),
          meta: { keepAlive: true, title: '补贴列表', pathAuthName: '/marketingMng/proposal/subsidies' }
        },
        {
          path: '/activity/editRushBuy',
          name: '/activity/editRushBuy',
          component: () => import('@/views/activity/rushBuy'),
          meta: { title: '编辑秒杀活动', pathAuthName: '/marketingMng/proposal/subsidies' },
          hidden: true
        },
        {
          path: '/activity/fullReduce/editFullReduce',
          name: '/activity/fullReduce/editFullReduce',
          component: () => import('@/views/activity/fullReduce/editFullReduce'),
          meta: { title: '编辑满减活动', pathAuthName: '/marketingMng/proposal/subsidies' },
          hidden: true
        },
        {
          path: '/activity/apportion/editApportion',
          name: '/activity/apportion/editApportion',
          hidden: true,
          component: () => import('@/views/activity/apportion/editApportion'),
          meta: { title: '设置分摊', pathAuthName: '/marketingMng/proposal/subsidies' }
        },
        {
          path: '/activity/threshold/editThreshold',
          name: '/activity/threshold/editThreshold',
          hidden: true,
          component: () => import('@/views/activity/threshold/editThreshold'),
          meta: { title: '设置阈值', pathAuthName: '/marketingMng/proposal/subsidies' }
        },
        {
          path: '/activity/bindCode',
          name: '/activity/bindCode',
          hidden: true,
          component: () => import('@/views/activity/bindCode/bindCode'),
          meta: { title: '绑定活动ID', pathAuthName: '/marketingMng/proposal/subsidies' }
        },
        {
          path: '/activity/scheduleManage',
          name: '/activity/scheduleManage',
          component: RouterView,
          meta: { title: '档期管理', authName: 'schedule', pathAuthName: '/marketingMng/proposal/scheduleMng' },
          children: [
            {
              path: '/activity/scheduleManage',
              component: loadCommonComponent('activityScheduleMng'),
              props: 'brandx',
              meta: {
                keepAlive: true,
                title: '档期列表',
                activeMenu: '/activity/scheduleManage',
                pathAuthName: '/marketingMng/proposal/scheduleMng'
              },
              hidden: true
            },
            {
              path: '/activity/scheduleManage/edit/:id',
              component: loadCommonComponent('activityScheduleEdit'),
              props: 'brandx',
              meta: {
                title: '档期编辑',
                activeMenu: '/activity/scheduleManage',
                pathAuthName: '/marketingMng/proposal/scheduleMng'
              },
              hidden: true
            },
            {
              path: '/activity/scheduleManage/scheduleDashboard/:scheduleId',
              name: '/activity/scheduleManage/scheduleDashboard/:scheduleId',
              component: () => import('@/views/fundAccount/overview'),
              meta: {
                title: '资金大盘',
                activeMenu: '/activity/scheduleManage',
                pathAuthName: '/marketingMng/proposal/scheduleMng'
              },
              hidden: true,
              children: [
                {
                  path: '/activity/scheduleManage/scheduleDashboard/:scheduleId/:subjectId',
                  name: '/activity/scheduleManage/scheduleDashboard/:scheduleId/:subjectId',
                  component: () => import('@/views/fundAccount/activeDiscount'),
                  meta: { activeMenu: '/activity/scheduleManage', pathAuthName: '/marketingMng/proposal/scheduleMng' },
                  hidden: true
                }
              ]
            }
          ]
        }
      ]
    },
    {
      path: '/rushBuys',
      name: '/rushBuys',
      component: RouterView,
      redirect: '/rushBuys/list',
      children: [
        {
          name: '/rushBuys/list',
          path: '/rushBuys/list',
          component: () => import('@/views/activity/rushBuys'),
          meta: { keepAlive: true, title: '秒杀活动列表', pathAuthName: '/brandproposal/marketing/fullReduce' },
          hidden: true
        }
      ],
      meta: { title: '秒杀活动管理', pathAuthName: '/brandproposal/marketing/fullReduce' }
    },
    {
      path: '/fullReduces',
      name: '/fullReduces',
      component: RouterView,
      redirect: '/fullReduces/list',
      children: [
        {
          name: '/fullReduces/list',
          path: '/fullReduces/list',
          component: () => import('@/views/activity/fullReduces'),
          meta: { keepAlive: true, title: '满减活动列表', pathAuthName: '/brandproposal/marketing/fullReduce' },
          hidden: true
        }
      ],
      meta: { title: '满减活动管理', pathAuthName: '/brandproposal/marketing/fullReduce' }
    },

    {
      path: '/marketing/coupon',
      name: '/marketing/coupon',
      component: RouterView,
      redirect: '/marketing/coupon/activityList',
      meta: { title: '优惠券管理', pathAuthName: '/marketingMng/couponMng' },
      children: [
        {
          path: '/marketing/coupon/activityList',
          name: '/marketing/coupon/activityList',
          component: () => import('@/views/marketingMng/coupon/index'),
          hidden: true,
          meta: {
            keepAlive: true,
            title: '券活动列表',
            activeMenu: '/marketing/coupon',
            pathAuthName: '/marketingMng/couponMng'
          },
          children: [
            {
              path: '/marketing/coupon/activityList/:couponActivityCode',
              name: '/marketing/coupon/activityList/:couponActivityCode',
              component: () => import('@/views/marketingMng/coupon/viewDetail/activityDetail'),
              hidden: true,
              meta: { title: '券活动详情', activeMenu: '/marketing/coupon', pathAuthName: '/marketingMng/couponMng' }
            }
          ]
        },
        {
          path: '/marketing/couponList/:couponActivityCode',
          name: '/marketing/couponList',
          component: () => import('@/views/marketingMng/coupon/couponList'),
          meta: { title: '活动优惠券', activeMenu: '/marketing/coupon', pathAuthName: '/marketingMng/couponMng' },
          hidden: true,
          children: [
            {
              path: '/marketing/couponList/:couponActivityCode/:couponId',
              name: 'couponDetail',
              component: () => import('@/views/marketingMng/coupon/viewDetail/couponDetail'),
              hidden: true,
              meta: { title: '优惠券详情', activeMenu: '/marketing/coupon', pathAuthName: '/marketingMng/couponMng' }
            }
          ]
        },
        {
          path: '/marketing/coupon/platformCoupon',
          name: '/marketing/coupon/platformCoupon',
          component: () => import('@/views/marketingMng/coupon/createPlatformConpon/'),
          meta: { title: '新建全资券', activeMenu: '/marketing/coupon', pathAuthName: '/marketingMng/couponMng' },
          hidden: true
        }
      ]
    },
    {
      path: '/marketing/createCouponActivity/:couponActivityCode',
      name: '/marketing/createCouponActivity',
      component: () => import('@/views/marketingMng/coupon/createCouponActivity'),
      meta: { title: '创建优惠券', pathAuthName: '/marketingMng/couponMng' },
      hidden: true
    },
    {
      path: '/marketing/createCoupon',
      name: 'createCoupon',
      component: () => import('@/views/marketingMng/coupon/createCoupon/index'),
      meta: { title: '创建优惠券', pathAuthName: '/marketingMng/couponMng' },
      hidden: true
    },

    // 单品减运
    {
      path: '/marketing/fareReduce/list',
      component: () => import('@/views/marketingMng/fareReduce'),
      meta: { title: '单品减运', pathAuthName: '/marketingMng/deductFreight' },
      children: [
        {
          path: '/marketing/fareReduce/list',
          name: '/marketing/fareReduce/list',
          hidden: true,
          component: () => import('@/views/marketingMng/fareReduce/list'),
          meta: { title: '活动列表', icon: 'table', pathAuthName: '/marketingMng/deductFreight' },
          children: [
            {
              path: '/marketing/fareReduce/list/:promotionId',
              name: '/marketing/fareReduce/list/detail',
              hidden: true,
              component: () => import('@/views/marketingMng/fareReduce/detail'),
              meta: { title: '活动详情', icon: 'table', pathAuthName: '/marketingMng/deductFreight' }
            }
          ]
        },
        {
          path: '/marketing/fareReduce/create/:promotionId',
          name: '/marketing/fareReduce/create',
          hidden: true,
          component: () => import('@/views/marketingMng/fareReduce/create'),
          meta: { title: '新建', icon: 'table', pathAuthName: '/marketingMng/deductFreight' }
        }
      ]
    },
    // 超品周
    {
      path: '/marketing/superWeek',
      name: '/marketing/superWeek',
      component: () => import('@/views/marketingMng/superWeek/index'),
      meta: { title: '超品周商品', pathAuthName: '/marketingMng/brandWeek' }
    },
    // 大牌日历
    {
      path: '/bigBrand/calendar',
      name: 'bigBrandIndex',
      component: () => import('@/views/bigBrand/brandCalendar/index'),
      meta: { title: '大牌日历', pathAuthName: '/marketingMng/bigBrandCalendar' }
    },
    {
      path: '/bigBrand/edit',
      name: 'bigBrandEdit',
      component: () => import('@/views/bigBrand/brandCalendar/edit'),
      meta: {
        title: '编辑日历',
        icon: 'form',
        activeMenu: '/bigBrand/calendar',
        pathAuthName: '/marketingMng/bigBrandCalendar'
      },
      hidden: true
    },
    // 大牌抢券
    {
      path: '/bigBrand/grabCoupon',
      name: 'grabCoupon',
      redirect: { name: 'grabCouponList' },
      component: RouterView,
      meta: { title: '大牌抢券', pathAuthName: '/marketingMng/bigBrandGrabCoupon' },
      children: [
        {
          path: 'list',
          name: 'grabCouponList',
          component: () => import('@/views/bigBrand/grabCoupon/list'),
          meta: {
            keepAlive: true,
            title: '活动列表',
            activeMenu: '/bigBrand/grabCoupon/list',
            pathAuthName: '/marketingMng/bigBrandGrabCoupon'
          },
          hidden: true
        },
        {
          path: 'add',
          name: 'grabCouponCreate',
          component: () => import('@/views/bigBrand/grabCoupon/create'),
          meta: {
            title: '创建活动',
            activeMenu: '/bigBrand/grabCoupon',
            pathAuthName: '/marketingMng/bigBrandGrabCoupon'
          },
          hidden: true
        },
        {
          path: 'edit/:id',
          name: 'grabCouponEdit',
          component: () => import('@/views/bigBrand/grabCoupon/create'),
          meta: {
            title: '编辑活动',
            activeMenu: '/bigBrand/grabCoupon',
            pathAuthName: '/marketingMng/bigBrandGrabCoupon'
          },
          hidden: true
        },
        {
          path: 'detail/:id',
          name: 'grabCouponDetail',
          component: () => import('@/views/bigBrand/grabCoupon/detail'),
          meta: {
            title: '活动祥情',
            activeMenu: '/bigBrand/grabCoupon',
            pathAuthName: '/marketingMng/bigBrandGrabCoupon'
          },
          hidden: true
        }
      ]
    },
    // 天降红包
    {
      path: '/brand/activity/coupon',
      redirect: { path: '/brand/activity/coupon/list' },
      component: RouterView,
      meta: { title: '天降红包', pathAuthName: '/marketingMng/couponRain' },
      children: [
        {
          path: 'list',
          name: 'luckyCouponList',
          component: () => import('@/views/bigBrand/luckyCoupon'),
          meta: {
            title: '活动列表',
            keepAlive: true,
            activeMenu: '/brand/activity/coupon',
            pathAuthName: '/marketingMng/couponRain'
          },
          hidden: true
        },
        {
          path: 'create',
          name: 'luckyCouponCreate',
          component: () => import('@/views/bigBrand/luckyCoupon/create'),
          meta: {
            title: '新建活动',
            keepAlive: true,
            activeMenu: '/brand/activity/coupon',
            pathAuthName: '/marketingMng/couponRain'
          },
          hidden: true
        },
        {
          path: 'edit/:id',
          name: 'luckyCouponEdit',
          component: () => import('@/views/bigBrand/luckyCoupon/create'),
          meta: {
            title: '编辑活动',
            keepAlive: true,
            activeMenu: '/brand/activity/coupon',
            pathAuthName: '/marketingMng/couponRain'
          },
          hidden: true
        },
        {
          path: 'detail/:id',
          name: 'luckyCouponDetail',
          component: () => import('@/views/bigBrand/luckyCoupon/detail'),
          meta: {
            title: '查看活动',
            activeMenu: '/brand/activity/coupon',
            pathAuthName: '/marketingMng/couponRain'
          },
          hidden: true
        },
        {
          path: 'addTag',
          name: 'add-tag-user',
          component: () => import('@/views/bigBrand/luckyCoupon/addTagUser'),
          meta: {
            title: '添加用户标签',
            activeMenu: '/brand/activity/coupon',
            pathAuthName: '/marketingMng/couponRain'
          },
          hidden: true
        }
      ]
    }
  ]
}
