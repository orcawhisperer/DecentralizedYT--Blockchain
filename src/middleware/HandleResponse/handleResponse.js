export function handleResponse(response) {
   if (response) {
      console.log(response)
      return response
   } else {
      return Promise.reject("err: data not loaded ")
   }
}
