import { baseApi } from "@/redux/api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: `/orders?page=${page}&limit=${limit}`,
        method: 'GET',
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ _id }) => ({ type: 'order', id: _id })),
              'orderList',
            ]
          : ['orderList'],
    }),
    createOrder: builder.mutation({
      query: (newOrder) => ({
        url: '/orders',
        method: 'POST',
        body: newOrder,
      }),
      invalidatesTags: ['orderList'],
    }),
    updateOrder: builder.mutation({
      query: ({ id, ...updatedOrder }) => ({
        url: `/orders/${id}`,
        method: 'PATCH',
        body: updatedOrder,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'order', id }],
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'order', id }],
    }),
    getOrder: builder.query({
      query: (orderNumber) => ({
        url: `/orders/${orderNumber}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'order', id }],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
  useGetOrderQuery,
} = orderApi;
export default orderApi;
