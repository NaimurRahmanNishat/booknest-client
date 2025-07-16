/* eslint-disable @typescript-eslint/no-explicit-any */
import { getBaseUrl } from '@/utils/getBaseUrl ';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface ContactRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactResponse {
  success: boolean;
  message: string;
  data?: any;
}


const contactApi = createApi({
  reducerPath: 'contactApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/contact`,
    credentials: 'include',
  }),
  tagTypes: ['Contact'],
  endpoints: (builder) => ({
    createContact: builder.mutation<ContactResponse, ContactRequest>({
      query: (contactData) => ({
        url: '/create-contact',
        method: 'POST',
        body: contactData,
      }),
      invalidatesTags: ['Contact'],
    }),
  }),
});

export const { useCreateContactMutation } = contactApi;

export default contactApi;