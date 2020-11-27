import { Button, Icon } from '@blueprintjs/core'
import { lang, MoreOptions } from 'botpress/shared'
import React, { FC, useState } from 'react'

import AgentIcon from '../../shared/components/AgentIcon'
import style from '../../style.scss'

import { IAgent } from './../../../../types'

type Props = {
  setOnline: (online) => {}
  loading: boolean
} & Partial<IAgent>

const AgentProfile: FC<Props> = ({ setOnline, online, loading }) => {
  const [showingOption, setShowingOption] = useState(false)

  const optionsItems = [
    {
      label: lang.tr(`module.hitlnext.agent.${online ? 'getOffline' : 'getOnline'}`),
      action: () => {
        setOnline(!online)
      }
    }
  ]

  return (
    <div className={style.agentBtnWrapper}>
      <MoreOptions
        element={
          <Button className={style.agentBtn} onClick={() => setShowingOption(true)} loading={loading} minimal={true}>
            <AgentIcon online={online} />
            <span className={style.agentBtnText}>
              {online ? lang.tr('module.hitlnext.agent.online') : lang.tr('module.hitlnext.agent.offline')}
            </span>
            <Icon icon="chevron-down"></Icon>
          </Button>
        }
        show={showingOption}
        onToggle={() => setShowingOption(false)}
        items={optionsItems}
      />
    </div>
  )
}

export default AgentProfile