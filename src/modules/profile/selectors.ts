import { getData as getProfiles } from 'dcl-dapps/dist/modules/profile/selectors'
import { getAddress } from 'dcl-dapps/dist/modules/wallet/selectors'
import { createSelector } from 'reselect'

export const getProfileAvatar = createSelector(
  getAddress,
  getProfiles,
  (address, profiles) => {
    const profile = address && address in profiles ? profiles[address] : null
    return profile && profile.avatars.length > 0 ? profile.avatars[0] : null
  }
)
