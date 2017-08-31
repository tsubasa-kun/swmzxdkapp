import index from './pages/index/index.vue';
import amountIndex from './pages/amountIndex/amountIndex.vue';
import reason from './pages/reason/reason.vue';
import member from './pages/member/member.vue';
import addMember from './pages/addMember/addMember.vue';
import editMember from './pages/editMember/editMember.vue';
import amountInfoIndex from './pages/amountInfoIndex/amountInfoIndex.vue';
import reasonInfo from './pages/reasonInfo/reasonInfo.vue';
import memberInfo from './pages/memberInfo/memberInfo.vue';

export default {
    routes: [
        {
            path: '/',
            component: index
        },
        {
            path: '/amountIndex',
            component: amountIndex
        },
        {
            path: '/reason',
            component: reason
        },
        {
            path: '/member',
            component: member
        },
        {
            path: '/addMember',
            component: addMember
        },
        {
            path: '/editMember',
            component: editMember
        },
        {
            path: '/amountInfoIndex',
            component: amountInfoIndex
        },
        {
            path: '/reasonInfo',
            component: reasonInfo
        },
        {
            path: '/memberInfo',
            component: memberInfo
        }
    ]
};