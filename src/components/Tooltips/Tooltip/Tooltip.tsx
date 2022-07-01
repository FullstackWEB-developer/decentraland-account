import * as React from 'react'
import { t } from 'dcl-dapps/dist/modules/translation/utils'
import { Button } from 'dcl-ui'
import './Tooltip.css'

interface Props {
  className: string
  children: React.ReactNode
}

const Tooltip: React.FC<Props> = ({ children }) => {
  const [isHidden, setHidden] = React.useState(false)
  const handleGotit = () => setHidden(true)
  return (
    <div className={isHidden ? 'Tooltip tooltip-hidden' : 'Tooltip'}>
      <div className="tooltip-content">
        {children}
        <Button basic onClick={handleGotit}>
          {t('tooltip.button')}
        </Button>
      </div>
    </div>
  )
}

export default Tooltip
