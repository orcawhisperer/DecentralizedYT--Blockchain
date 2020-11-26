const setUpUser = async () => {
   if (window.ethereum) {
      const accounts = await window.ethereum.enable()
      return accounts
   } else {
      const err = { error: "Web3 not available" }
      return err
      // The user doesn't have Metamask installed.
   }
}

export const userServiceActions = {
   setUpUser: setUpUser,
}
