import React from 'react'
import { t } from 'dcl-dapps/dist/modules/translation/utils'
import { AvatarFace, Button, Header, Icon } from 'dcl-ui'
import { Props } from './AccountHeader.types'
import './AccountHeader.css'
import { config } from '../../../config'

const BUILDER_URL = config.get('BUILDER_URL')!
const EXPLORER_URL = config.get('EXPLORER_URL')!

const AccountHeader = (props: Props) => {
  const { avatar, onOpenEditProfileAvatarModal } = props
  const hasName = !!avatar?.name

  return (
    <Header size="large" className="AccountHeader">
      <AvatarFace size="large" avatar={avatar || undefined} />
      <div className="profile-text">
        <div className="profile-name">
          {avatar ? avatar.name : t('global.guest')}
        </div>
        {avatar && (
          <div
            onClick={onOpenEditProfileAvatarModal}
            className="profile-description"
          >
            {avatar.description
              ? avatar.description
              : t('account_header.actions.set_description')}
            <Icon
              className="profile-description-edit-icon"
              size="small"
              name="pencil"
            />
          </div>
        )}
      </div>
      <div className="actions">
        <Button
          primary
          inverted
          href={`${BUILDER_URL}/${hasName ? 'names' : 'claim-name'}`}
          target="_blank"
        >
          {hasName
            ? t('account_header.actions.change_alias')
            : t('account_header.actions.get_a_name')}
        </Button>
        <Button
          primary
          inverted
          href={`${EXPLORER_URL}/?OPEN_AVATAR_EDITOR`}
          target="_blank"
        >
          {t('account_header.actions.edit_avatar')}
        </Button>
      </div>
    </Header>
  )
}

export default React.memo(AccountHeader)
