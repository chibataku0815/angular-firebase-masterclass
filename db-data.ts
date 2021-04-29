export const USER: any = {
  1: {
    id: 1,
    name: 'Reina Oyanagi',
    email: 'reina-oyanagi@hi-ho.ne.jp',
    accountType: 0,
    trade: [
      {
        orderId: 1,
        orderPrice: 100,
        orderDate: '2020-10-21 10:00:00',
        orderType: 0,
        result: 0,
      },
      {
        orderId: 2,
        orderPrice: 200,
        orderDate: '2020-10-21 10:10:00',
        orderType: 1,
        result: 1000,
      },
    ],
    cash: 5000,
  },
};

export function findUserById(uId: number) {
  return USER[uId];
}
