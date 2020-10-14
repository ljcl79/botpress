import * as sdk from 'botpress/sdk'
import _ from 'lodash'

import { removeTrainingSession } from '../train-session-service'
import { NLUState } from '../typings'

export function getOnBotUnmount(state: NLUState) {
  return async (bp: typeof sdk, botId: string) => {
    if (!state.nluByBot[botId]) {
      return
    }

    const activeTrainSession: sdk.NLU.TrainingSession[] = _.chain(_.get(state.nluByBot[botId], 'trainSessions', {}))
      .values()
      .filter((trainSession: sdk.NLU.TrainingSession) => trainSession.status === 'training')
      .value()

    await Promise.map(activeTrainSession, async ts => {
      await state.broadcastCancelTraining(botId, ts.language)
      await removeTrainingSession(bp, botId, ts)
    })

    delete state.nluByBot[botId]
  }
}
