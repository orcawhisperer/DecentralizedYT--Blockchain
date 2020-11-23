export function handleResponse(response) {
   if (response) {
      return response
   } else {
      return Promise.reject("err: data not loaded ")
   }
}
