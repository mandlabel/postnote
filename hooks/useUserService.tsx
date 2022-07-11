import { useContext } from 'react';

import { UserContext } from '../utils/UserContext';

const useUserService = () => {
  return useContext(UserContext)
}

export default useUserService
