const toggleSideBar = () => {
   return {
      type: "TOGGLE_SIDEBAR",
   }
}

const setData = (key, value) => {
   return {
      type: "SET_DATA",
      key: key,
      value: value,
   }
}

export const commonActions = {
   toggleSideBar,
   setData,
}
